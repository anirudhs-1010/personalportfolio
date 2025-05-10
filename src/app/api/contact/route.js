import { NextResponse } from 'next/server';

// Store rate limiting data in memory (consider using Redis in production)
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5; // 5 requests per hour per IP

export async function POST(request) {
  try {
    // Get client IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
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
    
    // Validate CSRF token
    const csrfToken = request.headers.get('x-csrf-token');
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

    // Validate name
    if (!/^[a-zA-Z\s]{1,100}$/.test(name)) {
      return NextResponse.json(
        { error: 'Invalid name format' },
        { status: 400 }
      );
    }

    // Validate email
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
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

    const emailLower = email.toLowerCase();
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
        content: `New form submission:\nName: ${name}\nEmail: ${email}`,
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