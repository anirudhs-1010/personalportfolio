'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Blurred, semi-transparent gradient background */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 0.95, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="backdrop-blur-md bg-gradient-to-r from-black/80 via-blue-900/60 to-purple-900/80 shadow-lg border-b border-blue-500/10"
      >
        <div className="container mx-auto px-4 py-5 flex justify-between items-center">
          {/* Animated gradient name */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent select-none drop-shadow-md"
          >
            Anirudh Sunil
          </motion.h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navLinks.map((link, idx) => (
                <motion.li key={link.href} whileHover={{ scale: 1.1 }}>
                  <a
                    href={link.href}
                    className="text-lg font-medium text-white px-2 py-1 relative transition-colors duration-200
                      before:absolute before:left-0 before:-bottom-1 before:w-0 before:h-0.5
                      before:bg-gradient-to-r before:from-blue-400 before:to-purple-500
                      before:rounded-full before:transition-all before:duration-300
                      hover:before:w-full hover:text-blue-300"
                    style={{ overflow: 'hidden' }}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded hover:bg-blue-800/30 transition"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-6 bg-white my-0.5 rounded transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block h-0.5 w-6 bg-white my-0.5 rounded transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-white my-0.5 rounded transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden px-4 pb-4"
          >
            <ul className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block text-lg font-medium text-white px-2 py-2 rounded hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </motion.div>
    </header>
  );
}
