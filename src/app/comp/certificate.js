import { motion } from "framer-motion";

const certifications = [
  {
    title: "CodePath",
    issuer: "CodePath",
    date: "Jan 2025",
    badgeUrl: "/codepath_org_logo.jpg",
    verifyUrl: "https://www.certmetrics.com/amazon/public/verification.aspx", 
  },
  {
    title: "AI4ALL",
    issuer: "AI4ALL",
    date: "Jan 2025",
    badgeUrl: "/ai4all-logo.png",
    verifyUrl: "https://www.yourverificationlink.com", 
  },
  
];

export default function CertificationCards() {
  return (
    <section className="my-12">
      <h4 className="text-2xl font-bold mb-6 text-blue-400 text-center">Certifications</h4>
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
            <span className="text-gray-500 text-xs text-center">Issued: {cert.date}</span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
