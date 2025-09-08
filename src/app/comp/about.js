import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="container mx-auto py-20 px-4">
      {/* Gradient headline */}
      <h3 className="text-3xl md:text-4xl font-extrabold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
        About Me
      </h3>
      <div className="flex flex-col md:flex-row items-center justify-center gap-16">
        {/* Animated Profile Image with gradient border and glow */}
        <motion.div
          className="relative w-64 h-64 rounded-full shadow-2xl bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-400 p-1"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="rounded-full overflow-hidden w-full h-full bg-gray-900">
            <Image
              src="/me.jpg"
              alt="Anirudh Sunil"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-full"
              priority
            />
          </div>
          {/* Subtle animated glow */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            animate={{ boxShadow: "0 0 40px 8px rgba(99,102,241,0.25)" }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 2,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Animated Text Content */}
        <motion.div
          className="max-w-xl text-center md:text-left"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <p className="text-lg md:text-xl mb-5 text-gray-100 font-medium">
            I&apos;m a <span className="text-blue-400 font-semibold">passionate software engineer</span> specializing in <span className="text-purple-400 font-semibold">AI</span> and <span className="text-pink-400 font-semibold">security</span>. Currently, I am pursuing a Bachelor of Science in Mathematics and Computer Science at UIUC.
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center md:justify-start space-x-6 mb-6">
            <motion.a
              href="https://github.com/anirudhs1010"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 1.2651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/anirudh-sunil-a9890720a/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </motion.a>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">
            <motion.a
              href="/AnirudhS_Resume.pdf"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-8 rounded-full font-semibold shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
            >
              Download Resume
            </motion.a>
            <motion.a
              href="#contact"
              className="bg-transparent border-2 border-blue-400 py-2 px-8 rounded-full font-semibold text-blue-300 hover:bg-blue-500 hover:text-white transition-all duration-200 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
            >
              Get In Touch
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
