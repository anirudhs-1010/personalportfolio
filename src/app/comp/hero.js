import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

// AutoCarousel with dark overlay for readability
function AutoCarousel() {
  const images = ["/mecs1.jpeg", "/mecs2.jpeg"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={images[currentIndex]}
            alt={`Background slide ${currentIndex + 1}`}
            fill
            style={{ objectFit: "cover" }}
            className="z-0"
            priority
          />
          {/* Overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center min-h-[80vh] text-center overflow-hidden bg-black"
      aria-label="Hero section with animated background"
    >
      {/* Animated background carousel */}
      <AutoCarousel />

      {/* Foreground content */}
      <div className="relative z-20 w-full max-w-3xl mx-auto px-4 py-24 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-6">
            Software Developer
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-medium drop-shadow">
            Creating innovative solutions with experience in backend development, cloud technologies, hardware, and AI. 
            Seeking internships as an undergraduate student at UIUC.
          </p>
          <motion.a
            href="#projects"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 py-3 px-8 rounded-full text-lg font-semibold text-white shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            aria-label="View my work"
          >
            View My Work
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
