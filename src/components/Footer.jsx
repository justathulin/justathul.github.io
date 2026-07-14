import React from 'react';
import { motion } from 'framer-motion';

const nameLetters = 'ATHUL'.split('');

const letterVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-[#d4d4d4] py-16 px-6 md:px-12 w-full font-mono text-[10px] md:text-xs tracking-widest flex flex-col justify-between min-h-[50vh]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full font-medium">
        <div className="flex flex-col gap-1">
          <p>Cloud DevOps Engineer</p>
          <p>Kubernetes · AWS · CI/CD</p>
          <p>Banking & Enterprise clients</p>
        </div>
        <div className="flex flex-col gap-1 md:items-center">
          <p>5+ years of experience</p>
          <a href="#achievements" className="underline hover:text-white transition-colors mt-1 underline-offset-4 decoration-1">View Achievements</a>
        </div>
        <div className="flex flex-col gap-1 md:items-end">
          <p>Thrissur, Kerala — Open to relocation</p>
          <p>{new Date().getFullYear()}</p>
        </div>
      </div>

      <div className="w-full flex justify-center items-center py-20 md:py-24 overflow-hidden">
        <h2 className="text-[18vw] md:text-[16vw] leading-none font-sans font-bold tracking-tighter uppercase select-none text-[#f4f4f4] w-full text-center flex justify-center">
          {nameLetters.map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={letterVariants}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full items-end font-medium">
        <div className="flex flex-col gap-6">
          <a href="#contact" className="underline hover:text-white transition-colors underline-offset-4 decoration-1 font-bold">Contact</a>
          <p className="text-white/60 font-mono text-[9px] md:text-[10px]">
            &copy; {new Date().getFullYear()} Athul P S | Cloud DevOps Engineer
          </p>
        </div>
        <div className="flex flex-col gap-1 md:items-center">
          <a href="mailto:hi@justathul.com" className="underline hover:text-white transition-colors underline-offset-4 decoration-1 lowercase">hi@justathul.com</a>
        </div>
        <div className="flex flex-col gap-1 md:items-end">
          <a href="https://linkedin.com/in/justathul" target="_blank" rel="noreferrer" className="underline hover:text-white transition-colors underline-offset-4 decoration-1">LinkedIn</a>
          <a href="https://careerlook.in" target="_blank" rel="noreferrer" className="underline hover:text-white transition-colors underline-offset-4 decoration-1 mt-1.5">Careerlook</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
