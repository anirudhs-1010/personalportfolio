import { motion } from "framer-motion";

const certifications = [
  {
    title: "Section Leader",
    issuer: "CodeInPlace",
    date: "Issued: June 30, 2025",
    badgeUrl: "/badge.svg",
    verifyUrl: "https://digitalcredential.stanford.edu/check/B3B501C94C95F464F81EF6ECB29755931C6B950A045D717210009DA74423FC8FZXliMUU2eXRTTzVZTVNwcDVxUHBkZThIYllob2ZEK3JOcmlDQVlNRktuSnpzbVV5", 
  },
  {
    title: "Cybersecurity (CY102)",
    issuer: "CodePath",
    date: "Status: In progress",
    badgeUrl: "/codepath_org_logo.jpg",
    verifyUrl: "/Cybersecurity.png", 
  },
  {
    title: "Technical Interview Prep (TIP 102)",
    issuer: "CodePath",
    date: "Status: In progress",
    badgeUrl: "/codepath_org_logo.jpg",
    verifyUrl: "/TIP.png", 
  },
  {
    title: "Ignite 2025",
    issuer: "AI4ALL",
    date: "Status: In progress",
    badgeUrl: "/ai4all-logo.png",
    verifyUrl: "/AI4ALL.jpeg", 
  },
  
  {
    title: "Intro to Machine Learning",
    issuer: "Kaggle",
    date: "Issued: March 9, 2024",
    badgeUrl: "/Kaggle.png",
    verifyUrl: "https://www.kaggle.com/learn/certification/anirudhs10/intro-to-machine-learning", 
  },
  {
    title: "Certificate of Acheivement",
    issuer: "ICPC",
    date: "Issued: November 4, 2023",
    badgeUrl: "/icpc.png",
    verifyUrl: "/2024-ICPC North Central NA RC-Anirudh Sunil-PLACE.pdf", 
  },
  {
    title: "USACO Silver",
    issuer: "USA Computing Olympiad",
    badgeUrl: "/logo-usaco.png",
    verifyUrl: "/usaco.png", 
  },
  {
    title: "Cybersecurity",
    issuer: "Google",
    date: "Issued: July 7, 2023",
    badgeUrl: "/Google.png",
    verifyUrl: "https://coursera.org/share/4dc869a406a5e8333ba0fbf186fadcb3", 
  },
  {
    title: "IT Automation with Python",
    issuer: "Google",
    date: "Issued: June 14, 2022",
    badgeUrl: "/Google.png",
    verifyUrl: "https://coursera.org/share/041038d781b2f3c041343186f889e078", 
  },{
    title: "Breath of Purity - 2nd Place winner",
    issuer: "FrontierHacks",
    badgeUrl: "frontierhacks.png",
    verifyUrl: "https://devpost.com/software/a-breath-of-purity-t7fd8u", 
  }
  
];

export default function CertificationCards() {
  return (
    <section className="my-12">
      <h4 className="text-2xl font-bold mb-6 text-blue-400 text-center">Certificates/Awards</h4>
      <div className="flex flex-wrap justify-center gap-8">
        {certifications.map((cert, idx) => (
          <motion.a
            key={idx}
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.06, boxShadow: "0 8px 32px rgba(59,130,246,0.2)" }}
            className="bg-gray-700 rounded-xl p-6 shadow-md flex flex-col items-center w-64 transition-transform"
          >
            <div className="w-16 h-16 mb-4 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
              <img
                src={cert.badgeUrl}
                alt={`${cert.title} badge`}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-lg font-semibold text-white mb-2 text-center">{cert.title}</span>
            <span className="text-gray-400 text-sm mb-1 text-center">{cert.issuer}</span>
            <span className="text-gray-500 text-xs text-center">{cert.date}</span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
