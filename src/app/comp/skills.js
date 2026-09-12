const groups = [
  ['Languages & web', ['C++', 'Java', 'HTML', 'CSS', 'SQL']],
  ['Infrastructure', ['Kubernetes', 'AWS']],
  ['Security', ['Burp Suite', 'OWASP ZAP', 'DirBuster']],
];
export default function Skills() {
  return <section id="skills" className="section shell"><div className="section-heading"><p className="eyebrow">03 / Toolkit</p><h2>Tools of the trade.</h2></div><div className="skills-grid">{groups.map(([title, skills]) => <div key={title}><h3>{title}</h3><p>{skills.join(' / ')}</p></div>)}</div></section>;
}
