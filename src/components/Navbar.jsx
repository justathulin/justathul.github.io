import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = ['home', 'about', 'stack', 'projects', 'achievements', 'certifications', 'contact'];

const drawerVariants = {
  hidden: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const linkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
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
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full z-50 font-mono transition-all duration-500 border-b ${
        isScrolled || isOpen ? 'bg-[#0a0e14]/90 backdrop-blur-md border-[#1f2b3a]' : 'bg-[#0a0e14]/40 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center h-14">
        <a href="#home" className="flex items-center gap-3 shrink-0">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f0605a]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#f5b642]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#39d98a]" />
          </span>
          <span className="text-sm text-[#c9d1d9] font-bold tracking-tight">athul<span className="text-[#39d98a]">@</span>prod<span className="text-[#6b7d8f]">:~$</span></span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className="px-3 py-1.5 text-xs text-[#6b7d8f] hover:text-[#39d98a] hover:bg-[#39d98a0d] rounded transition-colors duration-200"
            >
              ./{link}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-1.5 text-xs font-bold rounded border border-[#39d98a55] text-[#39d98a] hover:bg-[#39d98a] hover:text-[#05130c] transition-colors duration-200"
          >
            $ hire --me
          </motion.a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#c9d1d9] p-2"
          aria-label="Toggle navigation"
        >
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
            className="md:hidden bg-[#0a0e14] border-t border-[#1f2b3a] overflow-hidden"
          >
            <div className="flex flex-col px-6 py-5">
              {navLinks.map((link) => (
                <motion.a
                  key={link}
                  variants={linkVariants}
                  href={`#${link}`}
                  onClick={() => setIsOpen(false)}
                  className="text-[#c9d1d9] hover:text-[#39d98a] font-bold text-sm py-2.5 border-b border-[#1f2b3a]"
                >
                  <span className="text-[#39d98a]">./</span>{link}
                </motion.a>
              ))}
              <motion.a
                variants={linkVariants}
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-4 text-center px-4 py-2.5 rounded border border-[#39d98a55] text-[#39d98a] font-bold text-sm"
              >
                $ hire --me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
