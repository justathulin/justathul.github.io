import React from 'react';
import { motion } from 'framer-motion';

const DIRECTIONS = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { y: 0, x: 40 },
  right: { y: 0, x: -40 },
};

// Shared scroll-reveal wrapper so every section animates in consistently.
const Reveal = ({ children, direction = 'up', delay = 0, duration = 0.7, className = '', once = true, ...rest }) => {
  const offset = DIRECTIONS[direction] || DIRECTIONS.up;

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
