import { motion } from "framer-motion";
import Image from "next/image";

const experiences = [
  {
    title: "Research Assistant",
    company: "University of Chicago",
    companyUrl: "https://www.uchicago.edu",
    logo: "/uchicago.jpg",
    date: "Jan. 2026 - May 2026",
    bullets: [
      "Improve scientific artifact discoverability and reproducibility for Trovi by discovering, evaluating, and integrating research artifacts",
      "Normalize metadata and write concise summaries to enhance data accessibility and utility",
      "Engage with authors, refine curation tools, and analyze coverage and trends to support the Chameleon project"
    ]
  },
  {
    title: "Data Analyst Intern",
    company: "National Center for Supercomputing Applications",
    companyUrl: "https://ncsa.illinois.edu",
    logo: "/ncsa-logo.png",
    date: "Aug. 2025 - Dec. 2025",
    bullets: [
      "Preprocessed geospatial and socioeconomic feature data for the Amazon in Brazil, enhancing data quality for analysis.",
      "Conducted data modeling, analysis, and predictive assessments to provide insights for decision-making processes.",
      "Created maps and other data visualizations with Python, facilitating better understanding of complex data sets.",
      "Assisted in the development, training, validation, and testing of machine learning algorithms, improving model accuracy."
    ]
  },
  {
    title: "Software Engineer Intern",
    company: "Warmly",
    companyUrl: "https://warmly.ai",
    logo: "/warmly.png",
    date: "Jun. 2025 - Aug. 2025",
    subtitle: "YC S20",
    bullets: [
      "Implemented Salesflow email integration with TypeScript to optimize customer outreach by 87%.",
      "Integrated CRM system with React, Postgres, and SQL to simulate sales team interactions with Redis server for authentication, improving data management."
    ]
  },
  {
    title: "Software Engineer Intern - Cloud Security",
    company: "Prancer Enterprises",
    companyUrl: "https://prancer.io",
    logo: "/prancer_io_logo.jpg",
    date: "Jun. 2022 - Aug. 2022",
    bullets: [
      "Configured AWS S3 buckets to organize layout, improving data access efficiency by 130%.",
      "Reconfigured Kubernetes pods to optimize resource allocation, enhancing the performance of clusters and nodes.",
      "Established secure connections to regulate SQL databases, successfully preventing 10 injection attacks.",
      "Utilized Shift Left Security tools (Burp Suite, OWASP ZAP, DirBuster) to secure websites and reduce vulnerabilities."
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
                    {exp.subtitle && (
                      <div className="flex items-center gap-2 mt-1">
                        <Image
                          src="/YClogo.png"
                          alt="Y Combinator"
                          width={16}
                          height={16}
                          className="object-contain"
                        />
                        <p className="text-sm text-gray-400">{exp.subtitle}</p>
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-gray-400 mt-2 md:mt-0 md:text-right">{exp.date}</p>
                </div>
                {exp.bullets && (
                  <ul className="list-disc list-inside space-y-2 text-gray-200 pl-2">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
