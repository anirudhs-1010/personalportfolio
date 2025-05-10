import { useEffect, useState } from "react";

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

  // Generate CSRF token on component mount
  useEffect(() => {
    const token = Math.random().toString(36).substring(2);
    setCsrfToken(token);
  }, []);

  // Rate limiting
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const RATE_LIMIT_MS = 60000; // 1 minute

  const validateName = (name) => {
    if (!name.trim()) {
      return 'Name is required';
    }
    if (!/^[a-zA-Z\s]*$/.test(name)) {
      return 'Name should only contain letters and spaces';
    }
    if (name.length > 100) {
      return 'Name is too long';
    }
    return '';
  };

  const validateEmail = (email) => {
    if (!email.trim()) {
      return 'Email is required';
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    if (email.length > 254) {
      return 'Email is too long';
    }
    // Check for @everyone.com and similar patterns
    if (email.toLowerCase().includes('@everyone.com') || 
        email.toLowerCase().includes('@here.com') ||
        email.toLowerCase().includes('@discord.com')) {
      return 'Invalid email address';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = '';
    
    if (name === 'name') {
      error = validateName(value);
    } else if (name === 'email') {
      error = validateEmail(value);
    }
    
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
      // Send to your backend API instead of directly to Discord
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
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
      alert('An error occurred while submitting the form. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-3xl shadow-2xl max-w-2xl mx-auto p-8 md:p-12 bg-[#172030]">
      <h2 className="mb-2 text-4xl tracking-tight font-extrabold text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
        Contact
      </h2>
      <p className="mb-8 font-light text-center text-gray-300 sm:text-lg">
        Thank you for your interest. Please fill out this form to get in contact with me!
      </p>
      <form onSubmit={handleSubmit} className="space-y-7">
        <input type="hidden" name="csrf_token" value={csrfToken} />
        <div>
          <label className="block mb-2 text-sm font-medium text-blue-400" htmlFor="name">
            Name
          </label>
          <input
            className={`shadow-sm bg-gray-800 border ${
              errors.name ? 'border-red-500' : 'border-blue-400'
            } text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition`}
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
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-blue-400" htmlFor="email">
            Email
          </label>
          <input
            className={`shadow-sm bg-gray-800 border ${
              errors.email ? 'border-red-500' : 'border-blue-400'
            } text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition`}
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
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`w-full sm:w-[180px] h-[56px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold text-white shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
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
    <section id="contact" className="container mx-auto py-20 px-4">
      <ContactForm />
    </section>
  );
}
