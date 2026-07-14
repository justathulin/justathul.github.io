import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'orbit', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Wins' },
  { id: 'certifications', label: 'Badges' },
  { id: 'contact', label: 'Contact' },
];

const drawerVariants = {
  hidden: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-0 w-full z-50 px-4 font-display"
    >
      <div
        className={`max-w-5xl mx-auto flex justify-between items-center rounded-full px-5 py-2.5 transition-all duration-500 ${
          isScrolled || isOpen ? 'bg-[#241d5c]/90 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-[#3c3184]' : 'bg-[#241d5c]/50 border border-transparent'
        }`}
      >
        <a href="#home" className="flex items-center gap-2 text-white font-bold text-lg shrink-0">
          <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#ff8a65] to-[#ffd166] flex items-center justify-center text-sm">🚀</span>
          athul
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="px-3.5 py-1.5 text-sm font-semibold text-[#b3a8e0] hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="hidden md:inline-block px-4 py-1.5 text-sm font-bold rounded-full bg-[#ff8a65] text-[#1b1547]"
        >
          Say hi ✨
        </motion.a>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-1" aria-label="Toggle navigation">
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
            className="md:hidden max-w-5xl mx-auto mt-2 bg-[#241d5c] border border-[#3c3184] rounded-3xl overflow-hidden shadow-xl"
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
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-3 text-center px-4 py-2.5 rounded-full bg-[#ff8a65] text-[#1b1547] font-bold"
              >
                Say hi ✨
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
