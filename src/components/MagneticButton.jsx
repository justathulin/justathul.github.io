import React, { useRef } from 'react';
import { motion } from 'framer-motion';

// Wraps a link/button and nudges it toward the cursor within its bounds.
const MagneticButton = ({ as: Tag = 'a', className = '', children, ...rest }) => {
  const ref = useRef(null);
  const MotionTag = motion[Tag] || motion.a;

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    el.style.setProperty('--mx', `${relX * 0.35}px`);
    el.style.setProperty('--my', `${relY * 0.35}px`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--mx', '0px');
    el.style.setProperty('--my', '0px');
  };

  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transform: 'translate(var(--mx, 0px), var(--my, 0px))', transition: 'transform 0.15s ease-out' }}
      whileTap={{ scale: 0.94 }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

export default MagneticButton;
