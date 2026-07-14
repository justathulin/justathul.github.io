import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLines = [
  { text: 'booting athul-os v5.0.0 ...', delay: 0 },
  { text: '[ OK ] mounted /dev/kubernetes', delay: 0.28 },
  { text: '[ OK ] started cloud-infra.service (aws)', delay: 0.5 },
  { text: '[ OK ] started ci-cd.service (argocd)', delay: 0.72 },
  { text: '[ OK ] started observability.service (prometheus)', delay: 0.94 },
  { text: '[ OK ] 0 critical alerts', delay: 1.16 },
];

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
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
          className="fixed inset-0 w-full h-screen bg-[#0a0e14] z-[100000] flex flex-col items-center justify-center font-mono terminal-grid"
        >
          <div className="w-[90%] max-w-md">
            <div className="flex items-center gap-1.5 mb-4 opacity-60">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f0605a]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#f5b642]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#39d98a]" />
              <span className="text-[10px] text-[#6b7d8f] ml-3 tracking-widest">athul@prod:~$</span>
            </div>

            <div className="flex flex-col gap-2 text-xs sm:text-sm">
              {bootLines.map((line) => (
                <motion.div
                  key={line.text}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: line.delay, duration: 0.3 }}
                  className={line.text.startsWith('[ OK ]') ? 'text-[#39d98a]' : 'text-[#6b7d8f]'}
                >
                  {line.text.startsWith('[ OK ]') ? (
                    <>
                      <span className="text-[#39d98a] font-bold">[ OK ]</span>
                      <span className="text-[#c9d1d9]">{line.text.slice(6)}</span>
                    </>
                  ) : (
                    line.text
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.3 }}
              className="mt-5 pt-4 border-t border-[#1f2b3a] flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#39d98a] animate-pulse" />
              <span className="text-[#39d98a] text-xs sm:text-sm font-bold tracking-wide">ALL SYSTEMS OPERATIONAL</span>
              <span className="w-2 h-4 bg-[#39d98a] animate-blink ml-1" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
