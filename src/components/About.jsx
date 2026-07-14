import React from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';

const skillIcons = [
  { label: 'Kubernetes', tag: 'K8s' },
  { label: 'Cloud', tag: 'AWS' },
  { label: 'Terraform', tag: 'TF' },
  { label: 'ArgoCD', tag: 'CD' },
  { label: 'Prometheus', tag: 'OBS' },
];

const iconContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const iconItem = {
  hidden: { opacity: 0, scale: 0.4, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 16 } },
};

const About = () => {
  return (
    <section id="about" className="bg-[#ff2a2a] pt-20 pb-40 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start">

        {/* Left Side: ID Badge */}
        <div className="flex flex-col items-center w-full md:w-[350px] shrink-0 mt-12 md:mt-0">
          <div className="relative flex justify-center w-full">
            <div className="absolute -top-32 left-1/2 w-3 h-40 bg-black transform -translate-x-1/2 shadow-inner z-0" />
            <div className="absolute -top-6 left-1/2 w-6 h-12 bg-gray-300 rounded border border-gray-400 transform -translate-x-1/2 z-10 shadow-[0_2px_10px_rgba(0,0,0,0.3)]" />

            <motion.div
              initial={{ y: -320, opacity: 0, rotate: -8 }}
              whileInView={{ y: 0, opacity: 1, rotate: -3 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ type: 'spring', stiffness: 120, damping: 11, mass: 0.9 }}
              whileHover={{ rotate: 0, transition: { duration: 0.4 } }}
              className="bg-gray-900 w-full max-w-[280px] rounded-2xl p-3 shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative z-20"
            >
              <div className="absolute -top-3 left-1/2 w-16 h-6 bg-gray-900 rounded-t-xl transform -translate-x-1/2 flex justify-center items-center">
                <div className="w-8 h-2 bg-black/30 rounded-full shadow-inner" />
              </div>
              <div className="w-full aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-[#1a2540] to-[#0b1120] border-2 border-transparent flex flex-col items-center justify-center gap-2">
                <svg width="72" height="72" viewBox="0 0 172 172" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="86" cy="95" rx="34" ry="36" fill="#C8956B" />
                  <path d="M54 88 Q52 60 86 52 Q120 60 118 88 Q110 68 86 65 Q62 68 54 88Z" fill="#1A1008" />
                  <path d="M70 65 Q72 42 86 38 Q100 42 102 65 Q94 52 86 50 Q78 52 70 65Z" fill="#1A1008" />
                  <ellipse cx="72" cy="91" rx="7" ry="6" fill="white" />
                  <ellipse cx="100" cy="91" rx="7" ry="6" fill="white" />
                  <ellipse cx="72" cy="92" rx="4.5" ry="5" fill="#2C1810" />
                  <ellipse cx="100" cy="92" rx="4.5" ry="5" fill="#2C1810" />
                  <rect x="72" y="118" width="28" height="22" rx="4" fill="#C8956B" />
                  <path d="M60 138 Q86 128 112 138 L120 172 L40 172 Z" fill="#F0F4FF" />
                </svg>
                <span className="font-mono text-xs text-[#ff5555] font-bold">ATHUL P S</span>
                <span className="text-[10px] text-gray-400">DevOps Engineer</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Info Content */}
        <div className="flex-1 text-white mt-8 md:mt-0 relative z-20">
          <Reveal direction="left" delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">Hello!</h2>
          </Reveal>
          <Reveal direction="left" delay={0.2}>
            <p className="text-lg font-bold mb-12 leading-relaxed max-w-3xl text-red-50">
              Hi, my name is <span className="text-black text-xl font-black mx-1 tracking-wide uppercase">Athul P S</span>, a Cloud DevOps Engineer based in Thrissur, Kerala — dedicated to keeping production systems alive, secure, and blazing fast for enterprise and banking clients across AWS, on-premise, and air-gapped Kubernetes environments.
            </p>
          </Reveal>

          <motion.div
            variants={iconContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex items-center gap-8 mt-8 flex-wrap"
          >
            {skillIcons.map((s) => (
              <motion.div
                key={s.tag}
                variants={iconItem}
                whileHover={{ scale: 1.12, y: -6 }}
                className="flex flex-col items-center gap-2 cursor-pointer"
                data-cursor-hover
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-black/15 border border-white/20 flex items-center justify-center font-mono text-xs md:text-sm font-bold text-white drop-shadow-2xl">
                  {s.tag}
                </div>
                <span className="text-[11px] font-bold text-white/80">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Torn paper divider at bottom */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-30 transform translate-y-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20 fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z" />
        </svg>
      </div>

      {/* Decorative floating stars */}
      <motion.div
        className="absolute top-10 right-10 md:right-20 text-black opacity-30"
        animate={{ opacity: [0.2, 0.4, 0.2], rotate: [0, 15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z" /></svg>
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-4 md:left-20 text-black opacity-30"
        animate={{ opacity: [0.2, 0.4, 0.2], rotate: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z" /></svg>
      </motion.div>
    </section>
  );
};

export default About;
