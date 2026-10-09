import React from 'react';
import { motion } from 'framer-motion';

const DIRECTIONS = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { y: 0, x: 40 },
  right: { y: 0, x: -40 },
};

const EASE = [0.22, 1, 0.36, 1];

// Shared scroll-reveal wrapper. `variant` picks the motion language
// (slide/scale/blur/clip) so different sections don't all animate identically.
const Reveal = ({ children, direction = 'up', variant = 'slide', delay = 0, duration = 0.7, className = '', once = true, ...rest }) => {
  const offset = DIRECTIONS[direction] || DIRECTIONS.up;

  const variants = {
    slide: {
      initial: { opacity: 0, x: offset.x, y: offset.y },
      whileInView: { opacity: 1, x: 0, y: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.86, y: offset.y * 0.5 },
      whileInView: { opacity: 1, scale: 1, y: 0 },
    },
    blur: {
      initial: { opacity: 0, filter: 'blur(14px)', y: 16 },
      whileInView: { opacity: 1, filter: 'blur(0px)', y: 0 },
    },
    clip: {
      initial: { opacity: 0, clipPath: 'inset(0 0 100% 0)', y: 10 },
      whileInView: { opacity: 1, clipPath: 'inset(0 0 0% 0)', y: 0 },
    },
  };

  const v = variants[variant] || variants.slide;

  return (
    <motion.div
      initial={v.initial}
      whileInView={v.whileInView}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
