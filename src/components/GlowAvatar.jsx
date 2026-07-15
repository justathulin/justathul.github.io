import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import avatar from '../assets/avatar.webp';
import devopsVideo from '../assets/devopsvideo.mp4';

// The real generated avatar photo, framed with a rotating gradient ring,
// a pulsing glow, subtle mouse-parallax tilt, and a live status dot.
// On hover, the photo cross-fades into a looping DevOps showreel clip.
const GlowAvatar = ({ size = 260, className = '' }) => {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 150, damping: 15 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const handleEnter = () => {
    setHovered(true);
    videoRef.current?.play();
  };
  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
    setHovered(false);
    videoRef.current?.pause();
  };

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
        style={{ background: 'radial-gradient(circle, rgba(74,158,217,0.45), transparent 70%)' }}
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* rotating gradient ring */}
      <motion.div
        className="absolute -inset-1.5 rounded-full"
        style={{ background: 'conic-gradient(from 0deg, #4a9ed9, #7dd3fc, #a78bfa, #4a9ed9)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      {/* photo with mouse-parallax tilt, cross-fades to a video on hover */}
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{ perspective: 700 }}
        className="absolute inset-[6px] rounded-full overflow-hidden"
      >
        <motion.img
          src={avatar}
          alt="Athul P S"
          style={{ rotateX, rotateY }}
          animate={{ opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 w-full h-full object-cover scale-[1.12]"
        />
        <motion.video
          ref={videoRef}
          src={devopsVideo}
          muted
          loop
          playsInline
          style={{ rotateX, rotateY }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 w-full h-full object-cover scale-[1.12]"
        />
      </div>

      {/* live status dot */}
      <motion.div
        className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-[#22c55e] border-2 border-[#0d1730] flex items-center justify-center"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
};

export default GlowAvatar;
