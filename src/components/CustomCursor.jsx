import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target;
      setIsPointer(!!target.closest('a, button, input, textarea, [data-cursor-hover]'));
    };
    const down = () => setIsDown(true);
    const up = () => setIsDown(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, [visible, x, y]);

  return (
    <div className="hidden md:block" style={{ opacity: visible ? 1 : 0 }}>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--color-accent)] pointer-events-none z-[99999]"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: isDown ? 0.6 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-white/40 pointer-events-none z-[99998] mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isPointer ? 56 : 32,
          height: isPointer ? 56 : 32,
          opacity: isPointer ? 1 : 0.6,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
    </div>
  );
};

export default CustomCursor;
