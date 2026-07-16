import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlowAvatar from './GlowAvatar';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(() => !sessionStorage.getItem('ap_seen_intro'));

  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('ap_seen_intro', '1');
    }, 900);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 w-full h-screen bg-[var(--color-bg)] z-[100000] flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="absolute w-96 h-96 rounded-full bg-[var(--color-accent)] opacity-20 blur-3xl animate-blob" />

          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <GlowAvatar size={140} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="font-display font-bold text-xl text-white mt-6 tracking-tight"
          >
            Athul P S
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-3 h-[2px] w-32 bg-white/10 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-3)]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
