"use client";
import { useCallback, useEffect, useState } from "react";

// Generate a stable form ID that won't change between server and client
const generateStableId = () => {
  // Use a fixed timestamp for the current day
  const today = new Date();
  const timestamp = Math.floor(today.setHours(0, 0, 0, 0) / 1000);
  return `form_${timestamp}_${process.env.NODE_ENV}`;
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [nonce, setNonce] = useState('');
  const [formId] = useState(() => generateStableId());

  // Generate CSRF token and nonce on component mount
  useEffect(() => {
    const token = Math.random().toString(36).substring(2);
    const nonceValue = Math.random().toString(36).substring(2);
    setCsrfToken(token);
    setNonce(nonceValue);

    // Add form protection
    const protectForm = () => {
      const form = document.querySelector(`form[data-form-id="${formId}"]`);
      if (form) {
        // Prevent form attribute modification
        try {
          Object.defineProperty(form, 'action', {
            get: () => '/api/contact',
            configurable: false
          });
          Object.defineProperty(form, 'method', {
            get: () => 'POST',
            configurable: false
          });
        } catch (error) {
          console.warn('Form protection could not be applied:', error);
        }
      }
    };

    protectForm();
    // Re-apply protection periodically
    const interval = setInterval(protectForm, 1000);
    return () => clearInterval(interval);
  }, [formId]);

  // Rate limiting
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const RATE_LIMIT_MS = 60000; // 1 minute

  const sanitizeInput = (input) => {
    return input
      .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove on* event handlers
      .trim();
  };

  const validateName = (name) => {
    const sanitizedName = sanitizeInput(name);
    if (!sanitizedName) {
      return 'Name is required';
    }
    if (!/^[a-zA-Z\s]{1,100}$/.test(sanitizedName)) {
      return 'Name should only contain letters and spaces';
    }
    if (sanitizedName.length > 100) {
      return 'Name is too long';
    }
    return '';
  };

  const validateEmail = (email) => {
    const sanitizedEmail = sanitizeInput(email);
    if (!sanitizedEmail) {
      return 'Email is required';
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return 'Please enter a valid email address';
    }
    if (sanitizedEmail.length > 254) {
      return 'Email is too long';
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
      return 'Invalid email address';
    }

    // Check for common TLD variations
    const blockedTLDs = ['.con', '.org', '.net', '.io', '.app', '.dev', '.xyz', '.online', '.site', '.website'];
    if (blockedTLDs.some(tld => emailLower.endsWith(tld))) {
      return 'Invalid email address';
    }

    return '';
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    setFormData((prevData) => ({ ...prevData, [name]: sanitizedValue }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  }, []);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    let error = '';
    
    if (name === 'name') {
      error = validateName(value);
    } else if (name === 'email') {
      error = validateEmail(value);
    }
    
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent double submission
    if (loading) return;
    
    // Check rate limiting
    const now = Date.now();
    if (now - lastSubmissionTime < RATE_LIMIT_MS) {
      alert('Please wait a minute before submitting again.');
      return;
    }

    // Validate all fields
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    
    setErrors({
      name: nameError,
      email: emailError,
    });

    if (nameError || emailError) {
      return;
    }

    setLoading(true);

    try {
      // Generate a new nonce for this submission
      const submissionNonce = Math.random().toString(36).substring(2);
      setNonce(submissionNonce);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
          'X-Nonce': submissionNonce,
          'X-Requested-With': 'XMLHttpRequest',
          'X-Form-Submission': 'true',
          'X-Form-ID': formId
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          nonce: submissionNonce,
          formId: formId
        }),
        credentials: 'same-origin'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Network response was not ok');
      }

      setLastSubmissionTime(now);
      alert('Form submitted successfully!');
      setFormData({
        name: '',
        email: '',
      });
      setErrors({
        name: '',
        email: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(error.message || 'An error occurred while submitting the form. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-inner">
      <h2 className="contact-title">
        Let’s get in touch.
      </h2>
      <p className="contact-description">
        Have something in mind? Leave your name and email so I can get back to you.
      </p>
      <form 
        onSubmit={handleSubmit} 
        className="space-y-7"
        data-form-id={formId}
        autoComplete="off"
      >
        <input type="hidden" name="csrf_token" value={csrfToken} />
        <input type="hidden" name="nonce" value={nonce} />
        <input type="hidden" name="form_id" value={formId} />
        <div>
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            className={`form-input ${
              errors.name ? 'input-error' : ''
            }` }
            autoComplete="off"
            name="name"
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Your Name"
            required
            maxLength={100}
            pattern="[a-zA-Z\s]*"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-300">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className={`form-input ${
              errors.email ? 'input-error' : ''
            }` }
            autoComplete="off"
            name="email"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="your.email@example.com"
            required
            maxLength={254}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-300">{errors.email}</p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="button contact-submit"
          >
            {loading ? (
              <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default function ContactForms() {
  return (
    <section id="contact" className="section shell contact-section">
      <p className="eyebrow">04 / Contact</p>
      <ContactForm />
    </section>
  );
}
