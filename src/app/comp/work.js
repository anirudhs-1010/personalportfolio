import { motion } from "framer-motion";
import Image from "next/image";

const experiences = [
  {
    title: "Cloud Engineering Intern",
    company: "Prancer.io",
    companyUrl: "https://prancer.io",
    logo: "/prancer_io_logo.jpg",
    date: "Summer 2022",
    bullets: [
      "Developed and maintained cloud infrastructure using AWS services.",
      "Implemented CI/CD pipelines for automated deployment.",
      "Collaborated with cross-functional teams to optimize cloud resources.",
    ],
  },
  {
    title: "Software and Systems Development Intern",
    company: "Trydan Tech",
    companyUrl: "https://trydantech.com",
    logo: "/trdtech.jpg",
    date: "Summer 2024",
    bullets: [
      "Assisted in designing and testing hardware components.",
      "Developed firmware for embedded systems.",
      "Created documentation for hardware integration processes.",
    ],
  },
  
];

export default function Experience() {
  return (
    <section id="experience" className=" py-20">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl md:text-4xl font-extrabold mb-14 text-center text-white">
          Work Experience
        </h3>
        <div className="space-y-10 max-w-3xl mx-auto">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.title + exp.company}
              className="bg-[#1a233a] rounded-xl p-8 shadow-lg flex flex-col md:flex-row items-start gap-6 border border-[#223056]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {/* Company Logo */}
              <div className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-[#223056] flex items-center justify-center shadow">
                <Image
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
              {/* Experience Content */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-300">{exp.title}</h4>
                    <a 
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 font-medium hover:text-blue-300 transition-colors"
                    >
                      {exp.company}
                    </a>
                  </div>
                  <p className="text-sm font-semibold text-gray-400 mt-2 md:mt-0 md:text-right">{exp.date}</p>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-200 pl-2">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
