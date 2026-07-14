import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = ['Home', 'About', 'Expertise', 'Skills', 'Projects', 'Achievements', 'Certifications', 'Contact'];

const drawerVariants = {
  hidden: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const linkVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
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
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isOpen
          ? 'bg-[#ff2a2a] py-4'
          : isScrolled
            ? 'bg-white/70 backdrop-blur-xl py-3 border-b border-gray-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)]'
            : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a
          href="#home"
          className={`text-2xl font-black tracking-tight font-mono transition-colors duration-500 ${
            isOpen || !isScrolled ? 'text-white' : 'text-gray-900'
          }`}
        >
          athul<span className="text-[#ff2a2a]">.</span>
        </a>

        <div className="hidden md:flex space-x-7 lg:space-x-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`font-semibold text-sm tracking-wide relative group transition-colors duration-500 ${
                isScrolled ? 'text-gray-600 hover:text-gray-950' : 'text-white/80 hover:text-white'
              }`}
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#ff2a2a] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className={`inline-block px-6 py-2.5 rounded-full text-sm font-black transition-colors duration-500 ${
              isScrolled
                ? 'bg-gray-900 text-white hover:bg-[#ff2a2a]'
                : 'bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black backdrop-blur-md'
            }`}
          >
            Hire Me
          </motion.a>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`focus:outline-none p-2 transition-colors duration-500 ${isOpen || !isScrolled ? 'text-white' : 'text-gray-900'}`}
            aria-label="Toggle navigation drawer menu"
          >
            <motion.svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </motion.svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden absolute top-full left-0 w-full bg-[#ff2a2a] shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <motion.a
                  key={link}
                  variants={linkVariants}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-black font-extrabold text-base border-b border-white/10 pb-2.5 transition-colors"
                >
                  {link}
                </motion.a>
              ))}
              <motion.div variants={linkVariants} className="pt-2">
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-block px-6 py-3 rounded-full bg-white text-[#ff2a2a] font-black hover:bg-gray-950 hover:text-white transition-all duration-300 w-full text-center shadow-xl"
                >
                  Hire Me
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
