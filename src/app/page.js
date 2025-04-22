'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Header from './comp/header';
import Hero from './comp/hero';
import About from './comp/about';
import Experience from './comp/work';
import Projects from './comp/projects';
import Footer from './comp/footer';
import CertificationCards from './comp/certificate';
import ContactForms from './comp/contact';
import Skills from './comp/skills';






function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white font-montserrat ">
      <Header/>
      <Hero/>
      <About/>
      <Experience />
      <Projects />

      <Skills/>

      <ContactForms/>
      
      <CertificationCards/>

      


      <Footer/>
    </div>
  );
}

export default Home;

