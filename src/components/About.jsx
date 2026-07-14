import React from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';

const skillTags = ['kubernetes', 'aws', 'terraform', 'argocd', 'prometheus'];

const jsonLines = [
  { k: 'name', v: '"Athul P S"' },
  { k: 'role', v: '"Cloud DevOps Engineer"' },
  { k: 'location', v: '"Thrissur, Kerala, IN"' },
  { k: 'experience_years', v: '5' },
  { k: 'focus', v: '["aws", "kubernetes", "ci/cd", "observability"]' },
  { k: 'status', v: '"open_to_relocation"' },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const line = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const About = () => {
  return (
    <section id="about" className="bg-[#0a0e14] py-24 px-6 md:px-12 font-mono relative">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-xs text-[#6b7d8f] mb-2 tracking-widest uppercase">// about</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">$ cat about.json</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="bg-[#0d1117] border border-[#1f2b3a] rounded-lg overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1f2b3a] bg-[#10161f]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f0605a]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#f5b642]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#39d98a]" />
              <span className="text-[11px] text-[#6b7d8f] ml-3">about.json</span>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="p-6 md:p-8 text-xs md:text-sm leading-relaxed"
            >
              <div className="text-[#6b7d8f]">{'{'}</div>
              {jsonLines.map((l, i) => (
                <motion.div key={l.k} variants={line} className="pl-6">
                  <span className="text-[#7ee0ff]">"{l.k}"</span>
                  <span className="text-[#6b7d8f]">: </span>
                  <span className="text-[#f5b642]">{l.v}</span>
                  {i < jsonLines.length - 1 && <span className="text-[#6b7d8f]">,</span>}
                </motion.div>
              ))}
              <div className="text-[#6b7d8f]">{'}'}</div>
            </motion.div>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-8">
          <p className="text-[#8b9bab] font-sans text-sm md:text-base leading-relaxed max-w-2xl mb-6">
            Dedicated to keeping production systems alive, secure, and blazing fast for enterprise and banking clients across AWS, on-premise, and air-gapped Kubernetes environments.
          </p>
        </Reveal>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 flex-wrap text-xs"
        >
          <span className="text-[#6b7d8f] mr-1">$ ls ~/skills</span>
          {skillTags.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.08, type: 'spring', stiffness: 260, damping: 18 }}
              whileHover={{ y: -3, borderColor: 'rgba(57,217,138,0.6)' }}
              data-cursor-hover
              className="px-3 py-1.5 rounded border border-[#1f2b3a] bg-[#0d1117] text-[#39d98a]"
            >
              {s}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
