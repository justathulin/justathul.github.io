import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimeAvatar from './AnimeAvatar';
import MagneticButton from './MagneticButton';

const roles = ['Cloud DevOps Engineer', 'Kubernetes Wrangler', 'Uptime Guardian', '24×7 Incident Responder'];
const orbitIcons = ['☁️', '⚙️', '🛰️', '📦', '🐳'];

const useMissionClock = () => {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const h = String(Math.floor(elapsed / 3600)).padStart(2, '0');
  const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
  const s = String(elapsed % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
};

const TypedRole = () => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    const speed = deleting ? 30 : 60;
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) setText(current.slice(0, text.length + 1));
        else setTimeout(() => setDeleting(true), 1300);
      } else {
        if (text.length > 0) setText(current.slice(0, text.length - 1));
        else { setDeleting(false); setIndex((i) => (i + 1) % roles.length); }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, index]);

  return (
    <span className="text-[#ffd166]">
      {text}
      <span className="inline-block w-[3px] h-[0.85em] bg-[#ffd166] ml-1 align-middle" style={{ animation: 'blink 1s step-end infinite' }} />
    </span>
  );
};

const Hero = () => {
  const clock = useMissionClock();

  return (
    <section id="home" className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-[#1b1547] via-[#241a5e] to-[#1b1547] starfield flex items-center pt-28 pb-16">
      {/* twinkling stars */}
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white"
          style={{ width: 2 + (i % 3), height: 2 + (i % 3), left: `${(i * 37) % 100}%`, top: `${(i * 53) % 90}%` }}
          animate={{ opacity: [0.15, 0.9, 0.15] }}
          transition={{ duration: 2.5 + (i % 4), repeat: Infinity, delay: i * 0.15 }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#b3a8e0] mb-6 border border-[#3c3184] rounded-full px-3.5 py-1.5 bg-white/5"
          >
            🛰️ mission clock {clock}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 leading-[1.1]"
          >
            Hey, I'm Athul <span className="inline-block">👋</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display text-xl md:text-2xl font-bold mb-6 h-9"
          >
            <TypedRole />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-[#d9d3f2] text-sm md:text-base mb-9 max-w-md leading-relaxed"
          >
            Keeping production alive — 24×7. 5+ years of Kubernetes, AWS, CI/CD, and zero-downtime deployments for enterprise and banking clients.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-row items-center gap-4 flex-wrap"
          >
            <MagneticButton href="#projects" data-cursor-hover className="px-6 py-3 text-sm rounded-full bg-[#ff8a65] text-[#1b1547] font-bold inline-block text-center shadow-[0_8px_24px_rgba(255,138,101,0.35)]">
              See my work 🚀
            </MagneticButton>
            <MagneticButton href="#contact" data-cursor-hover className="px-6 py-3 text-sm rounded-full border-2 border-[#3c3184] text-white font-bold inline-block text-center hover:border-[#ffd166]">
              Say hello ✨
            </MagneticButton>
          </motion.div>
        </div>

        {/* Avatar + orbiting icons */}
        <div className="relative flex items-center justify-center h-[380px] md:h-[420px]">
          <motion.div
            className="absolute w-[320px] h-[320px] md:w-[380px] md:h-[380px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
          >
            {orbitIcons.map((icon, i) => {
              const angle = (360 / orbitIcons.length) * i;
              const radius = 170;
              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  style={{ transform: `rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg)` }}
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
                    className="text-3xl md:text-4xl -translate-x-1/2 -translate-y-1/2 drop-shadow-lg"
                  >
                    {icon}
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          <AnimeAvatar size={220} className="relative z-10" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
