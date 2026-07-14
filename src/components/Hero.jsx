import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import GlowAvatar from './GlowAvatar';
import MagneticButton from './MagneticButton';
import BackgroundBlobs from './BackgroundBlobs';
import Cube3D from './Cube3D';

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
    <span className="gradient-text animate-gradient-shift">
      {text}
      <span className="inline-block w-[3px] h-[0.85em] bg-[#7dd3fc] ml-1 align-middle" style={{ animation: 'blink 1s step-end infinite' }} />
    </span>
  );
};

const Hero = () => {
  const clock = useMissionClock();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mx}px ${my}px, rgba(74,158,217,0.15), transparent 80%)`;

  return (
    <section
      id="home"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - rect.left);
        my.set(e.clientY - rect.top);
      }}
      className="relative w-full min-h-screen overflow-hidden bg-[#0a1120] flex items-center pt-28 pb-16"
    >
      <BackgroundBlobs />
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background: spotlight }} />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#8ba3c7] mb-6 glass rounded-full px-3.5 py-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            available for work · uptime {clock}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-[1.1]"
          >
            Hey, I'm <span className="gradient-text animate-gradient-shift">Athul</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display text-xl md:text-2xl font-semibold mb-6 h-9"
          >
            <TypedRole />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-[#8ba3c7] text-sm md:text-base mb-9 max-w-md leading-relaxed"
          >
            Keeping production alive — 24×7. 5+ years of Kubernetes, AWS, CI/CD, and zero-downtime deployments for enterprise and banking clients.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-row items-center gap-4 flex-wrap"
          >
            <MagneticButton href="#projects" data-cursor-hover className="px-6 py-3 text-sm rounded-full bg-gradient-to-r from-[#4a9ed9] to-[#a78bfa] text-white font-bold inline-block text-center shadow-[0_8px_30px_rgba(74,158,217,0.35)]">
              See my work →
            </MagneticButton>
            <MagneticButton href="#contact" data-cursor-hover className="px-6 py-3 text-sm rounded-full glass text-white font-bold inline-block text-center hover:border-[#7dd3fc]">
              Say hello
            </MagneticButton>
          </motion.div>
        </div>

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

          <GlowAvatar size={220} className="relative z-10" />

          <motion.div
            className="absolute top-2 right-2 md:top-0 md:right-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Cube3D size={56} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
