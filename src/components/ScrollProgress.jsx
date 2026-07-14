import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#4a9ed9] via-[#7dd3fc] to-[#a78bfa] origin-left z-[9999]"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
