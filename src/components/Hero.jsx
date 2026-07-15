import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import GlowAvatar from './GlowAvatar';
import MagneticButton from './MagneticButton';
import BackgroundBlobs from './BackgroundBlobs';
import Cube3D from './Cube3D';
import devopsVideo from '../assets/devopsvideo.mp4';

const HeroScene = lazy(() => import('./HeroScene'));

const roles = ['Cloud DevOps Engineer', 'Kubernetes Wrangler', 'Uptime Guardian', '24×7 Incident Responder'];
const orbitCubes = [44, 36, 50, 38, 42];

const CubeOrbit = () => (
  <motion.div
    className="absolute w-[320px] h-[320px] md:w-[380px] md:h-[380px]"
    animate={{ rotate: 360 }}
    transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
  >
    {orbitCubes.map((cubeSize, i) => {
      const angle = (360 / orbitCubes.length) * i;
      const radius = 170;
      return (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ transform: `rotate(${angle}deg) translate(${radius}px)` }}
        >
          <Cube3D size={cubeSize} />
        </div>
      );
    })}
  </motion.div>
);

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
      <span className="inline-block w-[3px] h-[0.85em] bg-[#fdba74] ml-1 align-middle" style={{ animation: 'blink 1s step-end infinite' }} />
    </span>
  );
};

const Hero = () => {
  const clock = useMissionClock();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mx}px ${my}px, rgba(249,115,22,0.15), transparent 80%)`;

  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [enable3D, setEnable3D] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isSmall = window.innerWidth < 768;
    setEnable3D(!isTouch && !isSmall);
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try to autoplay with sound first. Browsers block this unless the
    // visitor already has high "media engagement" with the site, so we
    // fall back to muted autoplay (always allowed) if it's rejected.
    video.muted = false;
    video.play()
      .then(() => setMuted(false))
      .catch(() => {
        video.muted = true;
        setMuted(true);
        video.play().catch(() => {});
      });

    const syncMuted = () => setMuted(video.muted);
    video.addEventListener('volumechange', syncMuted);
    return () => video.removeEventListener('volumechange', syncMuted);
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (!video.muted) video.play().catch(() => {});
  };

  return (
    <section
      id="home"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - rect.left);
        my.set(e.clientY - rect.top);
      }}
      className="relative w-full min-h-screen overflow-hidden bg-[#0d0a08] flex items-center pt-28 pb-16"
    >
      <video
        ref={videoRef}
        src={devopsVideo}
        autoPlay
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0a08]/70 via-[#0d0a08]/80 to-[#0d0a08]" />

      <motion.button
        type="button"
        onClick={toggleSound}
        data-cursor-hover
        aria-label={muted ? 'Unmute background video' : 'Mute background video'}
        animate={muted ? { scale: [1, 1.06, 1] } : { scale: 1 }}
        transition={{ duration: 1.6, repeat: muted ? Infinity : 0, ease: 'easeInOut' }}
        className={`absolute top-24 right-6 z-30 flex items-center gap-2 pl-3 pr-4 py-2 rounded-full font-bold text-xs transition-colors ${
          muted
            ? 'bg-gradient-to-r from-[#f97316] to-[#fbbf24] text-white shadow-[0_8px_24px_rgba(249,115,22,0.45)]'
            : 'glass text-white/90 hover:text-white'
        }`}
      >
        {muted ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
        {muted ? 'Tap for sound' : 'Sound on'}
      </motion.button>
      <BackgroundBlobs />
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background: spotlight }} />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#a89787] mb-6 glass rounded-full px-3.5 py-1.5"
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
            className="text-[#a89787] text-sm md:text-base mb-9 max-w-md leading-relaxed"
          >
            Keeping production alive — 24×7. 5+ years of Kubernetes, AWS, CI/CD, and zero-downtime deployments for enterprise and banking clients.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-row items-center gap-4 flex-wrap"
          >
            <MagneticButton href="#projects" data-cursor-hover className="px-6 py-3 text-sm rounded-full bg-gradient-to-r from-[#f97316] to-[#fbbf24] text-white font-bold inline-block text-center shadow-[0_8px_30px_rgba(249,115,22,0.35)]">
              See my work →
            </MagneticButton>
            <MagneticButton href="#contact" data-cursor-hover className="px-6 py-3 text-sm rounded-full glass text-white font-bold inline-block text-center hover:border-[#fdba74]">
              Say hello
            </MagneticButton>
          </motion.div>
        </div>

        <div className="relative flex items-center justify-center h-[380px] md:h-[420px]" style={{ perspective: 1200 }}>
          {enable3D ? (
            <Suspense fallback={<CubeOrbit />}>
              <HeroScene reduceMotion={reduceMotion} particleCount={900} />
            </Suspense>
          ) : (
            <CubeOrbit />
          )}

          <GlowAvatar size={220} className="relative z-10" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
