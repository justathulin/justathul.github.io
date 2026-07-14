import React from 'react';
import { motion } from 'framer-motion';
import Mascot from './Mascot';

const nameChars = 'athul.'.split('');
const charVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

const Footer = () => {
  return (
    <footer className="bg-[#1b1547] border-t border-[#3c3184] pt-16 pb-10 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-4">
          <Mascot size={100} />
        </div>

        <div className="w-full flex justify-center items-center overflow-hidden mb-6">
          <h2 className="text-[13vw] md:text-[9vw] leading-none font-display font-extrabold tracking-tight select-none w-full text-center flex justify-center">
            {nameChars.map((c, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={charVariants}
                className={`inline-block ${c === '.' ? 'text-[#ffd166]' : 'text-[#2b2270]'}`}
              >
                {c}
              </motion.span>
            ))}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end border-t border-[#3c3184] pt-6 text-sm">
          <div className="flex flex-col gap-2">
            <a href="#contact" className="text-white font-bold hover:text-[#ffd166]">Say hi ✨</a>
            <p className="text-[#8478b8] text-xs">© {new Date().getFullYear()} Athul P S · Cloud DevOps Engineer</p>
          </div>
          <div className="flex flex-col gap-1 md:items-center text-[#c9c2e8]">
            <a href="mailto:hi@justathul.com" className="hover:text-[#ffd166]">hi@justathul.com</a>
          </div>
          <div className="flex flex-col gap-1 md:items-end text-[#c9c2e8]">
            <a href="https://linkedin.com/in/justathul" target="_blank" rel="noreferrer" className="hover:text-[#ffd166]">LinkedIn</a>
            <a href="https://careerlook.in" target="_blank" rel="noreferrer" className="hover:text-[#ffd166] mt-1">Careerlook</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
