const experiences = [
  {
    title: "Software Development Engineer Intern",
    company: "Amazon",
    companyUrl: "https://www.amazon.com",
    logo: "/zon.jpg",
    date: "May 2026 - August 2026",
    bullets: [
      "Built a distributed Java Remote Strategy Service handling∼9K TPS with a 120 ms production latency SLA for recommendation widgets on Amazon Sports & Outdoors product pages.",
      "Architected a modular strategy framework supporting N strategy IDs per implementation, reducing new strategy integration to 1 annotated class with automatic runtime discovery.",
      "Migrated the service to AWS Fargate, provisioning 8+ production infrastructure components including CloudAuth, PrivateLink, autoscaling, load balancing, and monitoring.",
      "Resolved 20+ dependency, authentication, and build issues from previous iteration for successful production deployment."
    ]
  },
  {
    title: "Research Assistant",
    company: "University of Chicago",
    companyUrl: "https://www.uchicago.edu",
    logo: "/uchicago.jpg",
    date: "Jan. 2026 - May 2026",
    bullets: [
      "Improved scientific artifact discoverability and reproducibility for Trovi by integrating research artifacts for 10K users.",
      "Normalized metadata and wrote concise summaries to enhance data accessibility and utility for 100+ JSON requests.",
      "Refined search and analytics for coverage and trends to support the Chameleon project with 5 GitHub open-source contributions."
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
    subtitle: <>YC S20 · <strong>Acquired by HubSpot</strong></>,
    bullets: [
      "Implemented Salesflow email integration with TypeScript to optimize customer outreach by 87%.",
      "Integrated CRM system with React, Postgres, and SQL to simulate sales team interactions with Redis server for authentication, improving data management."
    ]
  },

];

export default function Experience() {
  return <section id="experience" className="section shell"><div className="section-heading"><p className="eyebrow">02 / Experience</p><h2>Where I’ve worked.</h2></div><div className="experience-list">{experiences.map(exp => <article className="experience" key={exp.company}><div className="experience-meta"><p>{exp.date}</p>{exp.subtitle && <span>{exp.subtitle}</span>}</div><div><a className="company" href={exp.companyUrl} target="_blank" rel="noreferrer">{exp.company}</a><h3>{exp.title}</h3><ul>{exp.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></div></article>)}</div></section>;
}
