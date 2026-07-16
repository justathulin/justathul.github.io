import React from 'react';
import { motion } from 'framer-motion';
import GlowAvatar from './GlowAvatar';

const nameChars = 'justathul.'.split('');
const charVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

const Footer = () => {
  return (
    <footer className="bg-[var(--color-bg)] border-t border-[color:var(--color-border)] pt-16 pb-10 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-4">
          <GlowAvatar size={90} />
        </div>

        <div className="w-full flex justify-center items-center overflow-hidden mb-6">
          <h2 className="text-[8.5vw] md:text-[5.8vw] leading-none font-display font-bold tracking-tight select-none w-full text-center flex justify-center">
            {nameChars.map((c, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={charVariants}
                className={`inline-block ${c === '.' ? 'text-[var(--color-accent-2)]' : 'text-white/5'}`}
              >
                {c}
              </motion.span>
            ))}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end border-t border-[color:var(--color-border)] pt-6 text-sm">
          <div className="flex flex-col gap-2">
            <a href="#contact" className="text-white font-bold hover:text-[var(--color-accent-2)]">Say hi ✨</a>
            <p className="text-[var(--color-text-faint)] text-xs">© {new Date().getFullYear()} Athul P S · Cloud DevOps Engineer</p>
          </div>
          <div className="flex flex-col gap-1 md:items-center text-[var(--color-text-soft)]">
            <a href="mailto:hi@justathul.com" className="hover:text-[var(--color-accent-2)]">hi@justathul.com</a>
          </div>
          <div className="flex flex-col gap-1 md:items-end text-[var(--color-text-soft)]">
            <a href="https://linkedin.com/in/justathul" target="_blank" rel="noreferrer" className="hover:text-[var(--color-accent-2)]">LinkedIn</a>
            <a href="https://careerlook.in" target="_blank" rel="noreferrer" className="hover:text-[var(--color-accent-2)] mt-1">Careerlook</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
