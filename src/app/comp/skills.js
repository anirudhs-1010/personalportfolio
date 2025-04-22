import { motion } from "framer-motion";


const skillsList = [
  'C++', 'Java', 'HTML', 'CSS', 'Kubernetes', 'AWS', 'SQL', 'Burp Suite', 'OWASP ZAP', 'DirBuster'
];
function SkillsMarquee() {
  return (
    <div className="whitespace-nowrap">
      <motion.div
        className="inline-block animate-marquee"
        initial={{ x: '0%' }}
        animate={{ x: '-100%' }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: 'linear'
        }}
      >
        {skillsList.map((skill, index) => (
          <span
            key={index}
            className="inline-block mx-8 text-xl font-semibold text-blue-400 bg-gray-700 px-4 py-2 rounded-xl shadow-md"
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  
  return (
    <section id="skills" className="bg-gray-800 py-16">
            <div className="container mx-auto px-4">
              <h3 className="text-3xl font-bold mb-12 text-center">Skills</h3>
              <div className='flex flex-row w-full overflow-x-hidden '>
              <SkillsMarquee />
              <SkillsMarquee />
              </div>
    
            </div>
          </section>
  )
}