import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

// AutoCarousel with dark overlay for readability
function AutoCarousel() {
  const images = ["/mecs1.jpeg", "/mecs2.jpeg"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Show first image during SSR to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={images[0]}
          alt="Background slide 1"
          fill
          style={{ objectFit: "cover" }}
          className="z-0"
          priority
        />
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10" />
      </div>
    );
  }

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

        </motion.div>
      </div>
    </section>
  );
}
