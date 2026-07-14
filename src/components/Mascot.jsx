import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

// A friendly floating astronaut mascot: blinking + cursor-tracking eyes,
// idle float loop, and a periodic wave. Pure SVG, no external assets.
const Mascot = ({ className = '', size = 260 }) => {
  const rootRef = useRef(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const waveControls = useAnimation();

  useEffect(() => {
    const handleMove = (e) => {
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth / 2);
      const dy = (e.clientY - cy) / (window.innerHeight / 2);
      setEyeOffset({ x: Math.max(-1, Math.min(1, dx)) * 3.2, y: Math.max(-1, Math.min(1, dy)) * 2.4 });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    const blinkLoop = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
    };
    const id = setInterval(blinkLoop, 3200 + Math.random() * 1800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const waveLoop = async () => {
      while (!cancelled) {
        await waveControls.start({ rotate: [0, -18, 4, -14, 0], transition: { duration: 1.4, ease: 'easeInOut' } });
        await new Promise((r) => setTimeout(r, 4200));
      }
    };
    waveLoop();
    return () => { cancelled = true; };
  }, [waveControls]);

  return (
    <motion.div
      ref={rootRef}
      className={className}
      style={{ width: size, height: size * 1.18 }}
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 220 260" width="100%" height="100%">
        {/* thruster glow */}
        <motion.ellipse
          cx="110" cy="232" rx="26" ry="10" fill="#ffd166"
          animate={{ opacity: [0.3, 0.7, 0.3], ry: [8, 12, 8] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* backpack */}
        <rect x="70" y="120" width="80" height="70" rx="18" fill="#c9d3ea" />

        {/* left arm (static, resting) */}
        <rect x="52" y="140" width="26" height="62" rx="13" fill="#f4f6fb" transform="rotate(8 65 150)" />

        {/* body suit */}
        <rect x="62" y="118" width="96" height="92" rx="34" fill="#f4f6fb" stroke="#d7deee" strokeWidth="3" />

        {/* chest panel */}
        <rect x="88" y="150" width="44" height="30" rx="8" fill="#2a2f6b" />
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={98 + i * 12}
            cy="165"
            r="3.4"
            fill={['#ff8a65', '#ffd166', '#6fe3b4'][i]}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.35, ease: 'easeInOut' }}
          />
        ))}

        {/* right arm — waves */}
        <motion.g style={{ originX: '154px', originY: '138px' }} animate={waveControls}>
          <rect x="142" y="100" width="24" height="60" rx="12" fill="#f4f6fb" stroke="#d7deee" strokeWidth="2" />
        </motion.g>

        {/* neck */}
        <rect x="94" y="98" width="32" height="26" rx="10" fill="#e3e8f5" />

        {/* helmet */}
        <circle cx="110" cy="64" r="54" fill="#f4f6fb" stroke="#d7deee" strokeWidth="3" />
        {/* visor */}
        <ellipse cx="110" cy="66" rx="40" ry="34" fill="#2a2f6b" />
        <ellipse cx="94" cy="52" rx="10" ry="6" fill="#ffffff" opacity="0.18" />

        {/* eyes (track cursor) */}
        <motion.g animate={{ x: eyeOffset.x, y: eyeOffset.y }} transition={{ type: 'spring', stiffness: 120, damping: 12 }}>
          <circle cx="94" cy="66" r="8" fill="#ffffff" />
          <circle cx="126" cy="66" r="8" fill="#ffffff" />
          <motion.circle cx="94" cy="66" r="4" fill="#2a2f6b" animate={{ scaleY: blink ? 0.1 : 1 }} transition={{ duration: 0.1 }} />
          <motion.circle cx="126" cy="66" r="4" fill="#2a2f6b" animate={{ scaleY: blink ? 0.1 : 1 }} transition={{ duration: 0.1 }} />
        </motion.g>

        {/* smile */}
        <path d="M 100 84 Q 110 90 120 84" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />

        {/* helmet antenna */}
        <line x1="150" y1="30" x2="162" y2="14" stroke="#d7deee" strokeWidth="3" strokeLinecap="round" />
        <motion.circle
          cx="162" cy="14" r="4.5" fill="#ff8a65"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </motion.div>
  );
};

export default Mascot;
