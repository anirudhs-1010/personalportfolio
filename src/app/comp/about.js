import Image from 'next/image';
export default function About() {
  return <section id="about" className="intro shell">
    <div className="intro-copy">
      <h1>Hey, I’m<br /><em>Anirudh.</em></h1>

      <p className="intro-note">I’m finishing my bachelor’s in Math+CS at the University of Illinois Urbana-Champaign, graduating December 2026. My work spans distributed systems, research, and tools that make complex ideas easier to understand.</p>
      <div className="intro-actions"><a className="button" href="#projects">Explore my work <span aria-hidden="true">↘</span></a><a className="text-link" href="/MyResumeAS.pdf">View résumé ↗</a></div>
      <div className="social-links"><a href="https://github.com/anirudhs1010" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/anirudh-sunil" target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
    </div>
    <figure className="portrait"><div className="portrait-image"><Image src="/me.jpg" alt="Anirudh Sunil" fill sizes="(max-width: 700px) 80vw, 340px" priority /></div></figure>
  </section>;
}
