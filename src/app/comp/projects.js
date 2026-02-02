import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

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
      { label: "View Website", url: "https://rankdgame.vercel.app/" }
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
    title: "PoseMind AI: Contextual Yoga Recommender",
    image: "/project3.png",
    alt: "PoseMindAI",
    description: `Developed a contextual Yoga Pose recommender app using Firestore, Vector Search, Langchain, and Gemini to deliver personalized pose
suggestions based on user input. Implemented vector search and AI-generated embeddings to enable natural language querying and efficient retrieval of yoga pose
recommendations. Designed and deployed a user-friendly web application with AI capabilities, integrating text, images, and audio for an enhanced user
experience.`,
    links: [
      { label: "View Code", url: "https://github.com/anirudhs1010/Posemind-ai" }
    ],
  },
  {
    title: "Medicina.ai",
    image: "/project1.png",
    alt: "Medicina.ai",
    description: `Designed web app with Python and Flask to update heart disease risk using linear regression on user input data.
Stores data in SQL database for login data and local user data and continuously updates visual chart to display user risk for diabetes and
heart disease.
Implemented LLM chatbot feature using Gemini API for real-time communication with user.`,
    links: [
      { label: "View Code", url: "https://github.com/anirudhs1010/Medicina.ai" }
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

const ProjectCard = ({ project, idx }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (project.images && project.images.length > 1) {
      const interval = setInterval(() => {
        setDirection(1);
        setCurrentImageIndex((prevIndex) => 
          prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000); // Changed to 4 seconds

      return () => clearInterval(interval);
    }
  }, [project.images]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 1
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 1
    })
  };

  return (
    <motion.div
      key={project.title}
      className="bg-[#1a233a] rounded-2xl overflow-hidden shadow-lg border border-[#223056] flex flex-col hover:shadow-2xl transition-shadow"
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="h-48 bg-gray-700 relative overflow-hidden">
        {project.images ? (
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentImageIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                duration: 0.5
              }}
              className="absolute inset-0"
            >
              <Image
                src={project.images[currentImageIndex].src}
                alt={project.images[currentImageIndex].alt}
                fill
                style={{ objectFit: "cover" }}
                className="transition-all duration-500"
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <Image
            src={project.image}
            alt={project.alt}
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-300"
          />
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h4 className="text-lg font-bold mb-2 text-blue-300">{project.title}</h4>
        <p className="text-gray-300 mb-4 text-sm">{project.description}</p>
        <div className="flex gap-4 mt-auto">
          {project.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-200 font-medium transition-colors underline underline-offset-2"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  return (
    <section id="projects" className="container mx-auto py-20 px-4 ">
      <h3 className="text-3xl md:text-4xl font-extrabold mb-14 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
        Projects
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projectList.map((project, idx) => (
          <ProjectCard key={project.title} project={project} idx={idx} />
        ))}
      </div>
    </section>
  );
}
