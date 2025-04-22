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
            I&apos;m a <span className="text-blue-400 font-semibold">passionate software engineer</span> with experience in <span className="text-purple-400 font-semibold">cloud technologies</span> and <span className="text-pink-400 font-semibold">hardware integration</span>. My journey in tech has equipped me with a diverse skill set spanning from backend development to cloud infrastructure management.
          </p>
          <p className="text-lg md:text-xl mb-6 text-gray-200">
            With a strong foundation in computer science and hands-on experience through internships, I bring a unique perspective to solving complex technical challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">
            <motion.a
              href="/AnirudhSunil_Resume.pdf"
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
