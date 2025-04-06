'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
const skillsList = [
  'C++', 'Java', 'HTML', 'CSS', 'Kubernetes', 'AWS', 'SQL', 'Burp Suite', 'OWASP ZAP', 'DirBuster'
];
const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    message: '',
  });
  const [file, setFile] = useState(null);

  const handleFocus = (e) => {
    e.target.parentNode.classList.add('focus');
    e.target.parentNode.classList.add('not-empty');
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && !value.trim()) {
      e.target.parentNode.classList.remove('not-empty');
    }
    e.target.parentNode.classList.remove('focus');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    } catch (error) {
      console.error('Error sending form data to Discord:', error);
      alert('An error occurred while submitting the form. Please try again later.');
    }
  };

  return (
    <section className="bg-gray-800 min-h-screen w-full">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-blue-400">Contact</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-300 sm:text-xl">
          Thank you for your interest. Please fill out this form to get in contact with me!
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* First Name and Last Name input fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="conInp-wrap">
              <input
                className="contact-input shadow-sm bg-gray-700 border border-blue-400 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                autoComplete="off"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="First Name"
                required
              />
              <label className='text-blue-400'>First Name</label>
            </div>
            <div className="conInp-wrap">
              <input
                className="contact-input shadow-sm bg-gray-700 border border-blue-400 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                autoComplete="off"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Last Name"
                required
              />
              <label className='text-blue-400'>Last Name</label>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-blue-400">
              Your message
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              className="block p-2.5 w-full text-sm text-white bg-gray-700 rounded-lg shadow-sm border border-blue-400 focus:ring-blue-500 min-h-[250px] focus:border-blue-500"
              placeholder="Leave a comment..."
              value={formData.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            ></textarea>
          </div>
          {/* Attachment input field and Submit button */}
          <div className='flex justify-center sm:justify-between gap-10 items-center flex-wrap'>
            <div>
              <label htmlFor="attachment" className="block mb-2 text-sm font-medium text-blue-400">
                Attachment
              </label>
              <div className="w-[250px] h-[70px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700 cursor-pointer flex items-center justify-center transition-all">
                <p className='text-xl font-medium text-white'>Attachment</p>
                <input
                  type="file"
                  id="attachment"
                  name="attachment"
                  onChange={handleFileChange}
                  className='opacity-0 w-[250px] h-[70px] absolute cursor-pointer'
                />
              </div>
            </div>
            {/* Submit button */}
            <div>
              <label htmlFor="submit" className="block mb-2 text-sm font-medium text-blue-400">
                Send Message
              </label>
              <button
                type="submit"
                className="w-[250px] h-[70px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

function SkillsMarquee() {
  return (
    <div className="whitespace-nowrap">
      <motion.div
        className="inline-block animate-marquee"
        initial={{ x: '0%' }}
        animate={{ x: '-100%' }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: 'linear'
        }}
      >
        {skillsList.map((skill, index) => (
          <span
            key={index}
            className="inline-block mx-8 text-xl font-semibold text-blue-400 bg-gray-700 px-4 py-2 rounded-xl shadow-md"
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
}



function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="container mx-auto py-8 px-4 flex flex-col md:flex-row justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'
        >
          Anirudh Sunil
        </motion.h1>
        <nav className="mt-4 md:mt-0">
          <ul className="flex space-x-6">
            <motion.li whileHover={{ scale: 1.1 }}>
              <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <a href="#experience" className="hover:text-blue-400 transition-colors">Experience</a>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <a href="#skills" className="hover:text-blue-400 transition-colors">Skills</a>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
            </motion.li>
          </ul>
        </nav>
      </header>

      <section id="hero" className="container mx-auto py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Software Developer</h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Creating innovative solutions with experiences in backend development, cloud technologies, hardware, and AI.
          </p>
          <motion.a
            href="#projects"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 py-3 px-8 rounded-full text-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.a>
        </motion.div>
      </section>

      <section id="about" className="container mx-auto py-16 px-4">
        <h3 className="text-3xl font-bold mb-12 text-center">About Me</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <motion.div
            className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-blue-400 shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/me.jpg"
              alt="Anirudh Sunil"
              layout="fill"
              objectFit="cover"
              priority
            />
          </motion.div>
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-lg mb-4">
              I'm a passionate software engineer with experience in cloud technologies and hardware integration. 
              My journey in tech has equipped me with a diverse skill set spanning from backend development to 
              cloud infrastructure management.
            </p>
            <p className="text-lg mb-4">
              With a strong foundation in computer science and hands-on experience through internships,
              I bring a unique perspective to solving complex technical challenges.
            </p>
            <div className="flex gap-4 mt-6">
              <motion.a
                href="/AnirudhSunil_Resume (5).pdf"
                className="bg-white text-gray-900 py-2 px-6 rounded-full font-medium hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
              </motion.a>
              <motion.a
                href="#contact"
                className="bg-transparent border border-white py-2 px-6 rounded-full font-medium hover:bg-white hover:text-gray-900 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="experience" className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-12 text-center">Work Experience</h3>
          <div className="space-y-12">
            <motion.div
              className="bg-gray-700 rounded-xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-blue-400">Cloud Engineering Intern</h4>
                  <p className="text-gray-300">Prancer.io</p>
                </div>
                <p className="text-gray-400">Summer 2022</p>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Developed and maintained cloud infrastructure using AWS services</li>
                <li>Implemented CI/CD pipelines for automated deployment</li>
                <li>Collaborated with cross-functional teams to optimize cloud resources</li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-gray-700 rounded-xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-blue-400">Software and Systems Development Intern </h4>
                  <p className="text-gray-300">Trydan Tech</p>
                </div>
                <p className="text-gray-400">Summer 2024</p>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Assisted in designing and testing hardware components</li>
                <li>Developed firmware for embedded systems</li>
                <li>Created documentation for hardware integration processes</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="projects" className="container mx-auto py-16 px-4">
        <h3 className="text-3xl font-bold mb-12 text-center">Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            className="bg-gray-700 rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            <div className="h-48 bg-gray-600 relative">
              <Image
                src="/project3.png"
                alt="PoseMindAI"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold mb-2 text-blue-400">PoseMind AI: Contextual Yoga Recommender</h4>
              <p className="text-gray-300 mb-4">
              Developed a contextual Yoga Pose recommender app using Firestore, Vector Search, Langchain, and Gemini to deliver personalized pose
suggestions based on user input. Implemented vector search and AI-generated embeddings to enable natural language querying and efficient retrieval of yoga pose
recommendations. Designed and deployed a user-friendly web application with AI capabilities, integrating text, images, and audio for an enhanced user
experience.
              </p>
              <div className="flex gap-4">
                <a href="https://github.com/anirudhs1010/Posemind-ai" className="text-blue-400 hover:text-blue-300 transition-colors">View Code</a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-700 rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            <div className="h-48 bg-gray-600 relative">
              <Image
                src="/project1.png"
                alt="Medicina.ai"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold mb-2 text-blue-400">Medicina.ai</h4>
              <p className="text-gray-300 mb-4">
              Designed web app with Python and Flask to update heart disease risk using linear regression on user input data.
              Stores data in SQL database for login data and local user data and continuously updates visual chart to display user risk for diabetes and
heart disease.
Implemented LLM chatbot feature using Gemini API for real-time communication with user.
              </p>
              <div className="flex gap-4">
                <a href="https://github.com/anirudhs1010/Medicina.ai" className="text-blue-400 hover:text-blue-300 transition-colors">View Code</a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-700 rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            <div className="h-48 bg-gray-600 relative">
              <Image
                src="/project2.png"
                alt="Web Application"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold mb-2 text-blue-400">Quantitative Analysis of Protein Structure</h4>
              <p className="text-gray-300 mb-4">
                Worked with Chad Rienstra Lab to develop an automated tool to compare experimental and simualted
                SSNMR EmRe protein data with ZNCC scores using Python and Bash scripts.
              </p>
              <div className="flex gap-4">
                
                <a href="https://docs.google.com/document/d/15-mZL5BjQpqe3oDXLElNLAAKJvVx7FYJ/edit?usp=sharing&ouid=114213458967344171946&rtpof=true&sd=true" className="text-blue-400 hover:text-blue-300 transition-colors">View Report</a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="skills" className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-12 text-center">Skills</h3>
          <div className='flex flex-row w-full overflow-x-hidden '>
          <SkillsMarquee />
          <SkillsMarquee />
          </div>

        </div>
      </section>

      <section id="contact" className="container mx-auto py-16 px-4">
        <h3 className="text-3xl font-bold mb-12 text-center"></h3>
        <ContactForm/>
      </section>

      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <motion.a href="https://github.com/anirudhs1010" whileHover={{ scale: 1.2 }} className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 1.2651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </motion.a>
            <motion.a href="https://www.linkedin.com/in/anirudh-sunil-a9890720a/" whileHover={{ scale: 1.2 }} className="text-gray-400 hover:text-white">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </motion.a>
          </div>
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Anirudh Sunil. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;

