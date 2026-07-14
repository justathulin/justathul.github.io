import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Hand-illustrated anime-style avatar of Athul: spiked hair, mustache + goatee,
// blinking + cursor-tracking eyes, idle float, and a periodic wave.
const AnimeAvatar = ({ className = '', size = 260 }) => {
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
      setEyeOffset({ x: Math.max(-1, Math.min(1, dx)) * 3, y: Math.max(-1, Math.min(1, dy)) * 2.2 });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    const blinkLoop = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
    };
    const id = setInterval(blinkLoop, 3000 + Math.random() * 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const waveLoop = async () => {
      while (!cancelled) {
        await waveControls.start({ rotate: [0, -22, 6, -18, 0], transition: { duration: 1.5, ease: 'easeInOut' } });
        await new Promise((r) => setTimeout(r, 4500));
      }
    };
    waveLoop();
    return () => { cancelled = true; };
  }, [waveControls]);

  return (
    <motion.div
      ref={rootRef}
      className={className}
      style={{ width: size, height: size * 1.15 }}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 220 250" width="100%" height="100%">
        {/* soft backdrop */}
        <circle cx="110" cy="120" r="105" fill="url(#avatarGlow)" />
        <defs>
          <radialGradient id="avatarGlow" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#ff8a65" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#ff8a65" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* waving hand (peace sign), tucked behind shoulder */}
        <motion.g style={{ originX: '168px', originY: '188px' }} animate={waveControls}>
          <circle cx="172" cy="168" r="13" fill="#e8a575" />
          <rect x="166" y="146" width="7" height="20" rx="3.5" fill="#e8a575" />
          <rect x="176" y="148" width="7" height="18" rx="3.5" fill="#e8a575" />
        </motion.g>

        {/* shoulders / shirt */}
        <path d="M 46 250 Q 46 188 78 176 L 142 176 Q 174 188 174 250 Z" fill="#f6f7fb" stroke="#d7deee" strokeWidth="2" />
        {/* collar */}
        <path d="M 92 176 L 110 200 L 128 176 Z" fill="#5b8fc7" />
        <path d="M 92 176 L 104 182 L 110 200 Z" fill="#e9edf5" />
        <path d="M 128 176 L 116 182 L 110 200 Z" fill="#e9edf5" />

        {/* neck */}
        <rect x="98" y="150" width="24" height="30" rx="10" fill="#e8a575" />

        {/* ears */}
        <ellipse cx="62" cy="118" rx="9" ry="13" fill="#e8a575" />
        <ellipse cx="158" cy="118" rx="9" ry="13" fill="#e8a575" />

        {/* head */}
        <path d="M 110 34 C 146 34 160 62 158 96 C 156 128 140 150 110 150 C 80 150 64 128 62 96 C 60 62 74 34 110 34 Z" fill="#f0b686" />

        {/* eyebrows */}
        <path d="M 82 88 Q 92 80 104 86" stroke="#1c1c22" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        <path d="M 116 86 Q 128 80 138 88" stroke="#1c1c22" strokeWidth="4.5" fill="none" strokeLinecap="round" />

        {/* eyes (track cursor + blink) */}
        <motion.g animate={{ x: eyeOffset.x, y: eyeOffset.y }} transition={{ type: 'spring', stiffness: 120, damping: 12 }}>
          <ellipse cx="92" cy="102" rx="9" ry="10" fill="#fff" />
          <ellipse cx="128" cy="102" rx="9" ry="10" fill="#fff" />
          <motion.g animate={{ scaleY: blink ? 0.08 : 1 }} transition={{ duration: 0.1 }} style={{ originY: '102px' }}>
            <circle cx="92" cy="103" r="5" fill="#2b1b12" />
            <circle cx="128" cy="103" r="5" fill="#2b1b12" />
            <circle cx="94" cy="100.5" r="1.4" fill="#fff" />
            <circle cx="130" cy="100.5" r="1.4" fill="#fff" />
          </motion.g>
        </motion.g>

        {/* mustache */}
        <path
          d="M 84 122 Q 92 116 100 121 Q 110 125 120 121 Q 128 116 136 122 Q 128 128 110 128 Q 92 128 84 122 Z"
          fill="#1c1c22"
        />

        {/* mouth / smile */}
        <path d="M 100 133 Q 110 138 120 133" stroke="#8a4a3a" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />

        {/* goatee */}
        <path d="M 92 134 Q 96 150 110 154 Q 124 150 128 134 Q 118 144 110 144 Q 102 144 92 134 Z" fill="#1c1c22" />

        {/* hair — spiked pompadour */}
        <path
          d="M 58 92 C 52 66 62 30 92 24 C 88 14 100 8 108 16 C 112 6 128 8 128 20 C 138 10 152 20 146 34 C 158 32 164 48 152 58 C 162 62 160 80 148 82 C 156 94 148 108 134 100 C 138 78 128 60 110 58 C 92 60 82 78 86 100 C 72 108 64 94 58 92 Z"
          fill="#161616"
        />
        <path d="M 96 30 C 100 20 110 16 116 22 C 108 22 100 26 96 30 Z" fill="#3a3a3a" opacity="0.5" />
      </svg>
    </motion.div>
  );
};

export default AnimeAvatar;
