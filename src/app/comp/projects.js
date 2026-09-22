"use client";
import Image from 'next/image';
import { useState } from 'react';

const projectList = [
  {
    title: "StackSnap",
    image: "/stacksnap.png",
    alt: "StackSnap Interactive Program Visualizer",
    description: `Built an AI-powered interactive debugger that visualizes Python code execution line-by-line. Engineered a custom execution engine using sys.settrace to capture real-time call stack frames and local variable data across multi-file projects. Integrated a context-aware AI assistant using LangChain and the Keywords AI API for intelligent debugging explanations.`,
    links: [
      { label: "View Devpost", url: "https://devpost.com/software/stacksnap" }
    ],
  },
  {
    title: "Rankd",
    images: [
      { src: "/RankdTitle.png", alt: "Rankd Title" },
      { src: "/Rankd2.png", alt: "Rankd Gameplay" },
      { src: "/Rankd3.png", alt: "Rankd Leaderboard" }
    ],
    description: `Built using Supabase, NextJS, and Tailwind. Used ELO algorithm to calculate rankings for companies and characters for leaderboard display. Currently has 150+ users and more than 500+ games played.`,
    links: [
      { label: "View Code", url: "https://github.com/anirudhs1010/rankd" }
    ],
  },
  {
    title: "LLMJudge",
    image: "/LLMBenchmark.png",
    alt: "LLMJudge",
    description: `Developed a web app with Firebase, TypeScript, and Tailwind CSS that benchmarks prompts and LLM outputs on length and tone. Evaluated Gemini 2.0 Flash output with Perplexity Sonar, R1-1776, and Llama 3 with API calls and optimized. Stored data for prior prompts and scores in CSV and visualized overall evaluation scores with bar chart.`,
    links: [
      { label: "View Report", url: "https://docs.google.com/document/d/1wrk6cF1x7S4MGi8fIVRtPpGYMdgBNww8AWKHi46GIoA/edit?usp=sharing" }
    ],
  },
  {
    title: "Quantitative Analysis of Protein Structure",
    image: "/project2.png",
    alt: "Protein Structure Analysis",
    description: `Worked with Chad Rienstra Lab to develop an automated tool to compare experimental and simulated
SSNMR EmRe protein data with ZNCC scores using Python and Bash scripts.`,
    links: [
      { label: "View Report", url: "https://docs.google.com/document/d/15-mZL5BjQpqe3oDXLElNLAAKJvVx7FYJ/edit?usp=sharing&ouid=114213458967344171946&rtpof=true&sd=true" }
    ],
  },
  // Add more projects here as needed
];

function ProjectCard({ project, idx }) {
  const [active, setActive] = useState(0);
  const images = project.images || [{ src: project.image, alt: project.alt }];
  return <article className="project">
    <div className="project-visual"><Image src={images[active].src} alt={images[active].alt} fill sizes="(max-width: 700px) 90vw, 50vw" />
    {images.length > 1 && <div className="image-controls" aria-label={`${project.title} screenshots`}>{images.map((img, i) => <button key={img.src} onClick={() => setActive(i)} aria-label={`Show ${img.alt}`} aria-pressed={active === i}>{String(i + 1).padStart(2, '0')}</button>)}</div>}</div>
    <div className="project-heading"><span className="index">{String(idx + 1).padStart(2, '0')}</span><h3>{project.title}</h3></div>
    <p>{project.description}</p><div className="project-links">{project.links.map(link => <a className="text-link" href={link.url} key={link.url} target="_blank" rel="noreferrer">{link.label}</a>)}</div>
  </article>;
}
export default function Projects() {
  return <section id="projects" className="section shell"><div className="section-heading"><p className="eyebrow">01 / Selected work</p><h2>Things I’ve built.</h2></div><div className="project-grid">{projectList.map((project, idx) => <ProjectCard key={project.title} project={project} idx={idx} />)}</div></section>;
}
