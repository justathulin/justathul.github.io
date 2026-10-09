import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { id: 'home', num: '00', label: 'Home' },
  { id: 'about', num: '01', label: 'About' },
  { id: 'orbit', num: '02', label: 'Skills' },
  { id: 'projects', num: '03', label: 'Projects' },
  { id: 'achievements', num: '04', label: 'Wins' },
  { id: 'certifications', num: '05', label: 'Badges' },
  { id: 'contact', num: '06', label: 'Contact' },
];

const drawerVariants = {
  hidden: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
};

const iconLinks = [
  {
    href: 'https://linkedin.com/in/justathul',
    label: 'LinkedIn profile',
    external: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.114 20.452H3.558V9h3.556v11.452z" />
      </svg>
    ),
  },
  {
    href: '/Athul-PS-Resume.pdf',
    label: 'Download resume',
    download: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

const useActiveSection = () => {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const ids = navLinks.map((l) => l.id);
    const onScroll = () => {
      const probe = window.scrollY + window.innerHeight * 0.35;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probe) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return active;
};

const Navbar = ({ onOpenFreelance }) => {
  const [isOpen, setIsOpen] = useState(false);
  const active = useActiveSection();

  return (
    <>
      {/* Desktop: fixed left rail */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-20 z-50 flex-col items-center justify-between py-6 bg-[var(--color-bg-2)] border-r border-[color:var(--color-border)]">
        <a href="#home" aria-label="Home" className="w-9 h-9 rounded-md bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-3)] flex items-center justify-center text-sm text-black font-black font-display">
          J
        </a>

        <div className="flex flex-col items-center gap-5">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                title={link.label}
                className="group flex flex-col items-center gap-1"
              >
                <span
                  className="font-mono text-[11px] font-bold transition-colors"
                  style={{ color: isActive ? 'var(--color-accent)' : 'var(--color-text-faint)' }}
                >
                  {link.num}
                </span>
                <span
                  className="w-1 h-1 rounded-full transition-all"
                  style={{
                    background: isActive ? 'var(--color-accent)' : 'var(--color-text-faint)',
                    boxShadow: isActive ? '0 0 8px 2px var(--color-accent)' : 'none',
                    transform: isActive ? 'scale(1.8)' : 'scale(1)',
                  }}
                />
              </a>
            );
          })}
        </div>

        <div className="flex flex-col items-center gap-2">
          {iconLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noreferrer' : undefined}
              download={l.download || undefined}
              aria-label={l.label}
              title={l.label}
              data-cursor-hover
              className="w-9 h-9 flex items-center justify-center rounded-md glass text-white hover:border-[var(--color-border-hover)]"
            >
              {l.icon}
            </a>
          ))}
          <button
            type="button"
            onClick={onOpenFreelance}
            aria-label="Freelance services"
            title="Freelance services"
            data-cursor-hover
            className="w-9 h-9 flex items-center justify-center rounded-md glass text-white hover:border-[var(--color-border-hover)] text-sm"
          >
            $
          </button>
        </div>
      </nav>

      {/* Mobile: slim top bar + drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="nav-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="md:hidden fixed inset-0 z-40 bg-black/70"
          />
        )}
      </AnimatePresence>

      <div className="md:hidden fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-3 bg-[var(--color-bg-2)] border-b border-[color:var(--color-border)] font-display">
        <a href="#home" className="flex items-center gap-2 text-white font-bold text-base">
          <span className="w-7 h-7 rounded-md bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-3)] flex items-center justify-center text-xs text-black font-black">J</span>
          justathul
        </a>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white p-1" aria-label="Toggle navigation">
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
            className="md:hidden fixed top-[57px] left-0 w-full z-50 bg-[var(--color-bg-2)] border-b border-[color:var(--color-border)] overflow-hidden"
          >
            <div className="flex flex-col px-6 py-5 gap-1">
              {navLinks.filter((l) => l.id !== 'home').map((link) => (
                <motion.a
                  key={link.id}
                  variants={linkVariants}
                  href={`#${link.id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-white font-semibold text-base py-2.5 border-b border-white/10"
                >
                  <span className="font-mono text-xs text-[var(--color-accent)]">{link.num}</span>
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                variants={linkVariants}
                href="https://linkedin.com/in/justathul"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
                className="mt-3 text-center px-4 py-2.5 rounded-md glass text-white font-bold"
              >
                LinkedIn
              </motion.a>
              <motion.a
                variants={linkVariants}
                href="/Athul-PS-Resume.pdf"
                download
                onClick={() => setIsOpen(false)}
                className="mt-2 text-center px-4 py-2.5 rounded-md glass text-white font-bold"
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
                className="mt-2 text-center px-4 py-2.5 rounded-md glass text-white font-bold"
              >
                Freelance
              </motion.button>
              <motion.a
                variants={linkVariants}
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-2 text-center px-4 py-2.5 rounded-md bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-3)] text-black font-bold"
              >
                Say hi ✨
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
