import { motion } from "framer-motion";
import Image from "next/image";

const experiences = [
  {
    title: "Software Engineering Intern",
    company: "Warmly",
    companyUrl: "https://warmly.ai",
    logo: "/warmly.png",
    date: "June 2025-Current",
  },
  {
    title: "Software Engineering Intern",
    company: "Venu AI",
    companyUrl: "https://www.venu3d.com/",
    logo: "/venu3d_logo.jpeg",
    date: "May 2025 - June 2025",
    subtitle: "YC W21",
    bullets: [
      "Implemented authentication for user access to the dashboard feature, enhancing security and user experience",
      "Designed Toastify notification feature for CSV processing and email generation, improving user awareness and workflow efficiency"
    ],
  },
  
  {
    title: "Software and Systems Development Intern",
    company: "Trydan Tech",
    companyUrl: "https://trydantech.com",
    logo: "/trdtech.jpg",
    date: "Summer 2024",
    bullets: [
      "Leveraged CAN communication protocols in Python using cantools modules to collect data for the EV scooter division XSTRAD, ensuring accurate testing with Synchronous Reluctance motor via Raspberry Pi's SPI interface and 2CH CAN FD HAT, which improved data accuracy and testing efficiency",
      "Decoded bits from a DBC file and organized data in a CSV format, facilitating effective analysis and identification of correlations among parameters such as speed, temperature, and phase current, which enhanced data-driven decision-making",
      "Collaborated with peers to analyze 10,000 data points across 26 motor variables, improving code review and quality assurance practices through detailed analysis and teamwork, which led to enhanced software reliability and performance"
    ],
  },
  {
    title: "Software Engineering Intern - Cloud Security",
    company: "Prancer.io",
    companyUrl: "https://prancer.io",
    logo: "/prancer_io_logo.jpg",
    date: "Summer 2022",
    bullets: [
      "Debugged Amazon Web Services S3 buckets and permissions to organize configuration layout, improving data access efficiency",
      "Reconfigured Kubernetes pods to optimize resource allocation, enhancing the performance of pod clusters, containers, and nodes",
      "Established secure connections to regulate SQL databases, successfully preventing injection attacks and ensuring data integrity",
      "Utilized Shift Left Security tools such as Burp Suite proxy, OWASP ZAP, and DirBuster to secure websites, reducing vulnerabilities and enhancing security posture",
      "Enhanced understanding of infrastructure, cloud offerings, and DevOps as code concepts, leading to the development of more effective cloud security solutions"
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
