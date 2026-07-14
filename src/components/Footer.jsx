import React from 'react';
import { motion } from 'framer-motion';

const nameChars = 'athul.'.split('');

const charVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

const Footer = () => {
  return (
    <footer className="bg-[#0a0e14] border-t border-[#1f2b3a] text-[#6b7d8f] pt-14 pb-10 px-6 md:px-12 font-mono text-[11px]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#39d98a] animate-pulse" />
              <span className="text-[#39d98a]">operational</span>
            </div>
            <p>Cloud DevOps Engineer</p>
            <p>Kubernetes · AWS · CI/CD</p>
          </div>
          <div className="flex flex-col gap-1 md:items-center">
            <p>5+ years of experience</p>
            <a href="#achievements" className="text-[#39d98a] hover:underline">./view-achievements</a>
          </div>
          <div className="flex flex-col gap-1 md:items-end">
            <p>Thrissur, Kerala — open to relocation</p>
            <p>{new Date().getFullYear()}</p>
          </div>
        </div>

        <div className="w-full flex justify-center items-center py-16 overflow-hidden">
          <h2 className="text-[14vw] md:text-[10vw] leading-none font-sans font-bold tracking-tighter select-none text-[#161d27] w-full text-center flex justify-center">
            {nameChars.map((c, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={charVariants}
                className={`inline-block ${c === '.' ? 'text-[#39d98a]' : ''}`}
              >
                {c}
              </motion.span>
            ))}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end border-t border-[#1f2b3a] pt-6">
          <div className="flex flex-col gap-2">
            <a href="#contact" className="text-[#c9d1d9] font-bold hover:text-[#39d98a]">$ contact --me</a>
            <p className="text-[#3a4a5c]">© {new Date().getFullYear()} Athul P S · Cloud DevOps Engineer</p>
          </div>
          <div className="flex flex-col gap-1 md:items-center">
            <a href="mailto:hi@justathul.com" className="hover:text-[#39d98a]">hi@justathul.com</a>
          </div>
          <div className="flex flex-col gap-1 md:items-end">
            <a href="https://linkedin.com/in/justathul" target="_blank" rel="noreferrer" className="hover:text-[#39d98a]">linkedin</a>
            <a href="https://careerlook.in" target="_blank" rel="noreferrer" className="hover:text-[#39d98a] mt-1">careerlook</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
