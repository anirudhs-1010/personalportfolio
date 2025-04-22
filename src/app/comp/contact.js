import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    message: '',
  });
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const discordWebhookUrl = 'https://discord.com/api/webhooks/1357970533727211631/L6B6c3UhZ39XIcuL5j3x9af41vOIuOPmML9jEE581sGWIm12aqZgqZ6I3PFHDAqfmQsK';

    const formDataDiscord = new FormData();
    formDataDiscord.append(
      'content',
      `New form submission:\nName: ${formData.firstName} ${formData.lastName}\nMessage: ${formData.message}`
    );

    if (file) {
      formDataDiscord.append('file', file);
    }

    try {
      const response = await fetch(discordWebhookUrl, {
        method: 'POST',
        body: formDataDiscord,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert('Form submitted successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        message: '',
      });
      setFile(null);
      setFileName('');
    } catch (error) {
      console.error('Error sending form data to Discord:', error);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-blue-400" htmlFor="firstName">
              First Name
            </label>
            <input
              className="shadow-sm bg-gray-800 border border-blue-400 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition"
              autoComplete="off"
              name="firstName"
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-blue-400" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="shadow-sm bg-gray-800 border border-blue-400 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition"
              autoComplete="off"
              name="lastName"
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-blue-400">
            Your message
          </label>
          <textarea
            id="message"
            name="message"
            rows="6"
            className="block p-3 w-full text-sm text-white bg-gray-800 rounded-lg shadow-sm border border-blue-400 focus:ring-blue-500 focus:border-blue-500 min-h-[150px] transition"
            placeholder="Looking forward to hearing from you..."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="flex flex-col sm:flex-row gap-5 items-center justify-between">
          <div className="w-full sm:w-auto">
            <label htmlFor="attachment" className="block mb-2 text-sm font-medium text-blue-400">
              Attachment
            </label>
            <div className="relative w-full sm:w-[220px] h-[56px]">
              <input
                type="file"
                id="attachment"
                name="attachment"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
              />
              <div className="flex items-center justify-center w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all cursor-pointer">
                <span className="text-white text-base font-medium">
                  {fileName ? (
                    <span className="truncate max-w-[140px] inline-block align-middle">{fileName}</span>
                  ) : (
                    "Choose File"
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-auto flex flex-col items-center">
            <label htmlFor="submit" className="block mb-2 text-sm font-medium text-blue-400">
              Send Message
            </label>
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
        </div>
      </form>
    </section>
  );
};

export default function ContactForms() {
  return (
    <section id="contact" className="container mx-auto py-20 px-4  ">
      <ContactForm />
    </section>
  );
}
