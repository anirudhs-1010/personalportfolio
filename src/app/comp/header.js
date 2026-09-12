"use client";
import { useState } from 'react';
const links = [['Work', '#projects'], ['Experience', '#experience'], ['Contact', '#contact'], ['Résumé ↗', '/MyResumeAS.pdf']];
export default function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <a className="wordmark" href="#about">Anirudh Sunil<span className="accent">.</span></a>
    <button className="menu-toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
    <nav id="main-nav" aria-label="Main navigation" className={open ? 'navigation is-open' : 'navigation'}>{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav>
  </header>;
}
