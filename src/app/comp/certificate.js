const certifications = [
  {
    title: "SPIN Internship Recognition",
    issuer: "National Center for Supercomputing Applications",
    date: "Issued: May 20, 2026",
    badgeUrl: "/ncsa-logo.png",
    verifyUrl: "/Anirudh Sunil_NCSA Recognition Letter_AY 2025-26.pdf",
  },
  {
    title: "Section Leader",
    issuer: "CodeInPlace",
    date: "Issued: June 30, 2025",
    badgeUrl: "/badge.svg",
    verifyUrl: "https://digitalcredential.stanford.edu/check/B3B501C94C95F464F81EF6ECB29755931C6B950A045D717210009DA74423FC8FZXliMUU2eXRTTzVZTVNwcDVxUHBkZThIYllob2ZEK3JOcmlDQVlNRktuSnpzbVV5", 
  },
  {
    title: "Cybersecurity (CYB102)",
    issuer: "CodePath",
    date: "Issued: August 19, 2025",
    badgeUrl: "/codepath_org_logo.jpg",
    verifyUrl: "/CYB102.pdf", 
  },
  {
    title: "Technical Interview Prep (TIP 102)",
    issuer: "CodePath",
    date: "Issued: August 20, 2025",
    badgeUrl: "/codepath_org_logo.jpg",
    verifyUrl: "/TIP102.pdf", 
  },
  {
    title: "Ignite 2025",
    issuer: "AI4ALL",
    date: "Completed: November 4, 2025",
    badgeUrl: "/ai4all-logo.png",
    verifyUrl: "/Anirudh Sunil Summer 2025 AI4ALL Ignite Program Completion Certificate.pdf", 
  },
  
  {
    title: "Certificate of Achievement",
    issuer: "ICPC",
    date: "Issued: November 4, 2023",
    badgeUrl: "/icpc.png",
    verifyUrl: "/2024-ICPC North Central NA RC-Anirudh Sunil-PLACE.pdf", 
  },
  {
    title: "USACO Gold",
    issuer: "USA Computing Olympiad",
    badgeUrl: "/logo-usaco.png",
    verifyUrl: "/usaco.png", 
  },
  {
    title: "Breath of Purity - 2nd Place winner",
    issuer: "FrontierHacks",
    badgeUrl: "frontierhacks.png",
    verifyUrl: "https://devpost.com/software/a-breath-of-purity-t7fd8u", 
  }
  
];

export default function CertificationCards() {
  return <section className="section shell" id="recognition"><div className="section-heading"><p className="eyebrow">03 / Recognition</p><h2>Along the way.</h2></div><div className="recognition-list">{certifications.map(cert => <a href={cert.verifyUrl} key={cert.title} target="_blank" rel="noreferrer"><span><strong>{cert.title}</strong><small>{cert.issuer}</small></span><span className="recognition-date">{cert.date}</span></a>)}</div></section>;
}
