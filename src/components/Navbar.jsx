import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'orbit', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Wins' },
  { id: 'certifications', label: 'Badges' },
];

const drawerVariants = {
  hidden: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
};

const Navbar = ({ onOpenFreelance }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="nav-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-0 w-full z-50 px-4 font-display"
    >
      <div
        className={`max-w-5xl mx-auto flex justify-between items-center rounded-full px-5 py-2.5 transition-all duration-500 ${
          isScrolled || isOpen ? 'glass shadow-[0_8px_30px_rgba(0,0,0,0.3)]' : 'bg-white/[0.03] border border-transparent'
        }`}
      >
        <a href="#home" className="flex items-center gap-2 text-white font-bold text-lg shrink-0">
          <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-3)] flex items-center justify-center text-xs text-white font-black">J</span>
          justathul
        </a>

        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="px-2.5 py-1.5 text-[13px] font-semibold text-[var(--color-muted)] hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <motion.a
            href="/Athul-PS-Resume.pdf"
            download
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Download resume"
            title="Download resume"
            className="flex items-center gap-1.5 pl-3 pr-3.5 py-1.5 text-sm font-bold rounded-full glass text-white hover:border-[var(--color-border-hover)] whitespace-nowrap"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Resume
          </motion.a>
          <motion.button
            type="button"
            onClick={onOpenFreelance}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="px-3.5 py-1.5 text-sm font-bold rounded-full glass text-white hover:border-[var(--color-border-hover)] whitespace-nowrap"
          >
            Freelance
          </motion.button>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="px-4 py-1.5 text-sm font-bold rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-3)] text-white whitespace-nowrap"
          >
            Say hi ✨
          </motion.a>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white p-1" aria-label="Toggle navigation">
          <motion.svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" animate={{ rotate: isOpen ? 90 : 0 }}>
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </motion.svg>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="lg:hidden relative z-50 max-w-5xl mx-auto mt-2 bg-[var(--color-bg-2)] border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-xl"
          >
            <div className="flex flex-col px-6 py-5 gap-1">
              {navLinks.map((link) => (
                <motion.a
                  key={link.id}
                  variants={linkVariants}
                  href={`#${link.id}`}
                  onClick={() => setIsOpen(false)}
                  className="text-white font-semibold text-base py-2.5 border-b border-white/10"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                variants={linkVariants}
                href="/Athul-PS-Resume.pdf"
                download
                onClick={() => setIsOpen(false)}
                className="mt-3 text-center px-4 py-2.5 rounded-full glass text-white font-bold"
              >
                Resume ↓
              </motion.a>
              <motion.button
                type="button"
                variants={linkVariants}
                onClick={() => {
                  setIsOpen(false);
                  onOpenFreelance();
                }}
                className="mt-2 text-center px-4 py-2.5 rounded-full glass text-white font-bold"
              >
                Freelance
              </motion.button>
              <motion.a
                variants={linkVariants}
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-2 text-center px-4 py-2.5 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-3)] text-white font-bold"
              >
                Say hi ✨
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
