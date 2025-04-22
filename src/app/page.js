'use client';

import About from './comp/about';
import CertificationCards from './comp/certificate';
import ContactForms from './comp/contact';
import Footer from './comp/footer';
import Header from './comp/header';
import Hero from './comp/hero';
import Projects from './comp/projects';
import Skills from './comp/skills';
import Experience from './comp/work';






function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white font-montserrat ">
      <Header/>
      <Hero/>
      <About/>
      <Experience />
      <Projects />

      <Skills/>

      <CertificationCards/>
      
      <ContactForms/>
      
      

      <Footer/>
    </div>
  );
}

export default Home;

