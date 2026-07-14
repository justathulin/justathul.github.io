import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Mascot from './Mascot';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 w-full h-screen bg-[#1b1547] z-[100000] flex flex-col items-center justify-center overflow-hidden starfield"
        >
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white"
              style={{ left: `${(i * 41) % 100}%`, top: `${(i * 29) % 100}%` }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
            />
          ))}

          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <Mascot size={160} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="font-display font-bold text-xl text-white mt-2 tracking-tight"
          >
            Hey, I'm Athul <span className="text-[#ffd166]">👋</span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
