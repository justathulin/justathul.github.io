import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import avatar from '../assets/avatar.webp';

// The real generated avatar photo, framed with a rotating gradient ring,
// a pulsing glow, subtle mouse-parallax tilt, and a live status dot.
const GlowAvatar = ({ size = 260, className = '' }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 150, damping: 15 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size, perspective: 900 }}
      animate={{ y: [0, -14, 0], rotateY: [-8, 8, -8], rotateX: [3, -3, 3] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* pulsing glow */}
      <motion.div
        className="absolute -inset-4 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.45), transparent 70%)' }}
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* rotating gradient ring */}
      <motion.div
        className="absolute -inset-1.5 rounded-full"
        style={{ background: 'conic-gradient(from 0deg, #f97316, #fdba74, #fbbf24, #f97316)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      {/* photo with mouse-parallax tilt */}
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ perspective: 700 }}
        className="absolute inset-[6px] rounded-full overflow-hidden"
      >
        <motion.img
          src={avatar}
          alt="Athul P S"
          style={{ rotateX, rotateY }}
          className="w-full h-full object-cover scale-[1.12]"
        />
      </div>

      {/* live status dot */}
      <motion.div
        className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-[#22c55e] border-2 border-[#1a120a] flex items-center justify-center"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
};

export default GlowAvatar;
