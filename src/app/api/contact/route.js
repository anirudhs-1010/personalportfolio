import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';

// Store rate limiting data in memory (consider using Redis in production)
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5; // 5 requests per hour per IP

// Store used nonces (consider using Redis in production)
const usedNonces = new Set();
const NONCE_EXPIRY = 5 * 60 * 1000; // 5 minutes

// Store form IDs (consider using Redis in production)
const validFormIds = new Set();
const FORM_ID_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

// Clean up expired data periodically
setInterval(() => {
  const now = Date.now();
  // Clean up nonces
  for (const [nonce, timestamp] of usedNonces.entries()) {
    if (now - timestamp > NONCE_EXPIRY) {
      usedNonces.delete(nonce);
    }
  }
  // Clean up form IDs
  for (const [formId, timestamp] of validFormIds.entries()) {
    if (now - timestamp > FORM_ID_EXPIRY) {
      validFormIds.delete(formId);
    }
  }
}, 60000); // Clean up every minute

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove on* event handlers
    .trim();
};

export async function POST(request) {
  try {
    const headersList = headers();
    const cookieStore = cookies();
    
    // Validate required headers
    const requiredHeaders = [
      'x-csrf-token',
      'x-nonce',
      'x-requested-with',
      'x-form-submission',
      'x-form-id'
    ];

    for (const header of requiredHeaders) {
      if (!headersList.get(header)) {
        return NextResponse.json(
          { error: 'Invalid request headers' },
          { status: 403 }
        );
      }
    }

    // Validate X-Requested-With header
    if (headersList.get('x-requested-with') !== 'XMLHttpRequest') {
      return NextResponse.json(
        { error: 'Invalid request type' },
        { status: 403 }
      );
    }

    // Get client IP
    const ip = headersList.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit
    const now = Date.now();
    const userRequests = rateLimit.get(ip) || [];
    const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
    
    if (recentRequests.length >= MAX_REQUESTS) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    // Update rate limit
    recentRequests.push(now);
    rateLimit.set(ip, recentRequests);

    // Get request body
    const body = await request.json();
    
    // Validate form ID
    const formId = headersList.get('x-form-id');
    if (!formId || !validFormIds.has(formId)) {
      return NextResponse.json(
        { error: 'Invalid form session' },
        { status: 403 }
      );
    }

    // Validate nonce
    const nonce = headersList.get('x-nonce');
    if (!nonce || usedNonces.has(nonce)) {
      return NextResponse.json(
        { error: 'Invalid or expired request' },
        { status: 403 }
      );
    }
    
    // Store nonce with timestamp
    usedNonces.add(nonce);

    // Validate CSRF token
    const csrfToken = headersList.get('x-csrf-token');
    if (!csrfToken) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 403 }
      );
    }

    // Validate input
    const { name, email } = body;
    
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);

    // Validate name
    if (!/^[a-zA-Z\s]{1,100}$/.test(sanitizedName)) {
      return NextResponse.json(
        { error: 'Invalid name format' },
        { status: 400 }
      );
    }

    // Validate email
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check for @everyone and similar patterns
    const blockedPatterns = [
      '@everyone',
      '@here',
      '@discord',
      '@channel',
      '@role',
      '@admin',
      '@moderator',
      '@staff',
      '@support',
      '@help',
      '@system',
      '@bot',
      '@webhook',
      '@api',
      '@server',
      '@team',
      '@group',
      '@community',
      '@official',
      '@verified'
    ];

    const emailLower = sanitizedEmail.toLowerCase();
    if (blockedPatterns.some(pattern => emailLower.includes(pattern))) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check for common TLD variations
    const blockedTLDs = ['.con', '.org', '.net', '.io', '.app', '.dev', '.xyz', '.online', '.site', '.website'];
    if (blockedTLDs.some(tld => emailLower.endsWith(tld))) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send to Discord webhook
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!discordWebhookUrl) {
      console.error('Discord webhook URL not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const response = await fetch(discordWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `New form submission:\nName: ${sanitizedName}\nEmail: ${sanitizedEmail}`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send to Discord');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 