import React from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import AnimeAvatar from './AnimeAvatar';

const skillPlanets = [
  { icon: '☸️', label: 'Kubernetes', color: '#6fc8ff' },
  { icon: '☁️', label: 'AWS', color: '#ffd166' },
  { icon: '🧱', label: 'Terraform', color: '#ff8a65' },
  { icon: '🔁', label: 'ArgoCD', color: '#6fe3b4' },
  { icon: '📊', label: 'Prometheus', color: '#f28ce0' },
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } };
const planet = { hidden: { opacity: 0, scale: 0.4, y: 20 }, visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 240, damping: 16 } } };

const About = () => {
  return (
    <section id="about" className="bg-[#1b1547] py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr] gap-12 items-center">
        <Reveal direction="left" className="flex justify-center md:justify-start">
          <motion.div animate={{ rotate: [0, 3, 0, -3, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
            <AnimeAvatar size={180} />
          </motion.div>
        </Reveal>

        <div>
          <Reveal delay={0.1}>
            <div className="inline-block text-xs font-bold text-[#b3a8e0] uppercase tracking-widest mb-3 bg-white/5 border border-[#3c3184] rounded-full px-3 py-1">
              // about me
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-5">A little about me</h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-[#241d5c] border-2 border-[#3c3184] rounded-3xl p-6 md:p-8 mb-8 shadow-[0_16px_40px_rgba(0,0,0,0.3)]">
              <p className="text-[#e7e3fa] text-sm md:text-base leading-relaxed">
                Hi, I'm <strong className="text-white">Athul P S</strong> — a Cloud DevOps Engineer based in Thrissur, Kerala. I spend my days (and plenty of nights) keeping production systems alive, secure, and blazing fast for enterprise and banking clients across AWS, on-premise, and air-gapped Kubernetes environments. When something breaks at 3am, I'm the one who gets paged — and I've made peace with that. 🛰️
              </p>
            </div>
          </Reveal>

          <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="flex flex-wrap gap-4">
            {skillPlanets.map((s) => (
              <motion.div
                key={s.label}
                variants={planet}
                whileHover={{ y: -8, scale: 1.08 }}
                data-cursor-hover
                className="flex flex-col items-center gap-1.5 cursor-pointer"
              >
                <div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl shadow-[0_8px_20px_rgba(0,0,0,0.3)]"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${s.color}, ${s.color}55)` }}
                >
                  {s.icon}
                </div>
                <span className="text-[11px] font-semibold text-[#b3a8e0]">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
