import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const titleWords = ["Hi,", "I'm", "Athul", "P", "S"];

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Hero = () => {
  const canvasRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // Ambient particle / grid-line / node network background, ported to canvas.
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [], gridLines = [], nodes = [], raf;
    const ACCENT = 'rgba(255,42,42,';

    const rand = (a, b) => Math.random() * (b - a) + a;

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = rand(0, W); this.y = rand(0, H);
        this.r = rand(1, 2.5); this.vx = rand(-0.3, 0.3); this.vy = rand(-0.6, -0.15);
        this.life = rand(0.004, 0.008); this.a = 0; this.alpha = rand(0.1, 0.6);
      }
      update() {
        this.x += this.vx; this.y += this.vy; this.a += this.life;
        this.alpha = Math.sin(this.a) * 0.5;
        if (this.y < -10 || this.alpha < 0.01) this.reset();
      }
      draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = ACCENT + this.alpha + ')'; ctx.fill();
      }
    }

    class GridLine {
      constructor(vertical) {
        this.v = vertical;
        this.pos = vertical ? rand(0, W) : rand(0, H);
        this.alpha = rand(0.03, 0.08);
        this.speed = rand(0.2, 0.6) * (Math.random() < 0.5 ? 1 : -1);
      }
      update() {
        this.pos += this.speed;
        if (this.v) { if (this.pos > W) this.pos = 0; if (this.pos < 0) this.pos = W; }
        else { if (this.pos > H) this.pos = 0; if (this.pos < 0) this.pos = H; }
      }
      draw() {
        ctx.beginPath();
        ctx.strokeStyle = ACCENT + this.alpha + ')';
        ctx.lineWidth = 0.5;
        if (this.v) { ctx.moveTo(this.pos, 0); ctx.lineTo(this.pos, H); }
        else { ctx.moveTo(0, this.pos); ctx.lineTo(W, this.pos); }
        ctx.stroke();
      }
    }

    class Node {
      constructor() { this.reset(); }
      reset() {
        this.x = rand(0, W); this.y = rand(0, H);
        this.r = rand(3, 6); this.pulse = rand(0, Math.PI * 2); this.speed = rand(0.01, 0.03);
        this.alpha = rand(0.1, 0.4);
      }
      update() { this.pulse += this.speed; this.alpha = 0.15 + Math.sin(this.pulse) * 0.2; }
      draw() {
        ctx.save(); ctx.translate(this.x, this.y);
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (Math.PI / 3) * i - Math.PI / 6;
          i === 0 ? ctx.moveTo(Math.cos(a) * this.r, Math.sin(a) * this.r) : ctx.lineTo(Math.cos(a) * this.r, Math.sin(a) * this.r);
        }
        ctx.closePath();
        ctx.strokeStyle = ACCENT + this.alpha + ')'; ctx.lineWidth = 0.8; ctx.stroke();
        ctx.restore();
      }
    }

    const initParticles = () => {
      particles = Array.from({ length: 100 }, () => new Particle());
      gridLines = [
        ...Array.from({ length: 8 }, () => new GridLine(true)),
        ...Array.from({ length: 6 }, () => new GridLine(false)),
      ];
      nodes = Array.from({ length: 24 }, () => new Node());
    };

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const drawBg = () => {
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, '#0b1120'); g.addColorStop(0.5, '#140a0a'); g.addColorStop(1, '#0b1120');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = ACCENT + (0.12 * (1 - d / 110)) + ')';
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      raf = requestAnimationFrame(animate);
      drawBg();
      gridLines.forEach((l) => { l.update(); l.draw(); });
      nodes.forEach((n) => { n.update(); n.draw(); });
      drawConnections();
      particles.forEach((p) => { p.update(); p.draw(); });
    };

    resize();
    animate();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-10 pointer-events-none" />

      <div className="absolute inset-0 z-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-center md:justify-between items-start text-left w-full h-full pt-28 md:pt-[12%]">
        <div className="flex flex-col items-start text-left max-w-lg lg:max-w-xl w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#ff5555] mb-5"
          >
            <span className="w-8 h-px bg-[#ff5555]" />
            Cloud DevOps Engineer
          </motion.div>

          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-black mb-5 tracking-tight leading-[1.05] flex flex-wrap gap-x-3">
            {titleWords.map((word, i) => (
              <motion.span
                key={word + i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                className={i === 2 || i === 3 || i === 4 ? 'text-[#ff2a2a]' : ''}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-white/80 text-sm md:text-base lg:text-lg font-medium mb-8 max-w-sm md:max-w-md leading-relaxed"
          >
            Keeping production alive — 24×7. 5+ years of Kubernetes, AWS, CI/CD, and zero-downtime deployments for enterprise and banking clients.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-row items-center gap-4 w-full"
          >
            <MagneticButton
              href="#achievements"
              className="px-6 py-2.5 md:px-7 md:py-3 text-xs md:text-sm rounded-full bg-white text-black font-bold shadow-lg inline-block text-center"
              data-cursor-hover
            >
              View My Work
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="px-6 py-2.5 md:px-7 md:py-3 text-xs md:text-sm rounded-full bg-black/10 border border-white text-white font-bold backdrop-blur-md inline-block text-center"
              data-cursor-hover
            >
              Contact Me
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6, type: 'spring' }}
          className="mt-12 md:mt-2 flex flex-col items-center justify-center gap-2 cursor-pointer group self-start md:self-auto"
          onClick={() => setIsMuted((m) => !m)}
          data-cursor-hover
        >
          <motion.div
            animate={{ boxShadow: isMuted ? '0 0 0 0 rgba(255,42,42,0)' : ['0 0 0 0 rgba(255,42,42,0.4)', '0 0 0 14px rgba(255,42,42,0)'] }}
            transition={{ duration: 1.6, repeat: isMuted ? 0 : Infinity, ease: 'easeOut' }}
            className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex justify-center items-center group-hover:scale-105 group-hover:bg-white group-hover:border-white transition-all duration-300"
          >
            {isMuted ? (
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l-2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3l4.5 3.75V5.25z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28-.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
            )}
          </motion.div>
          <span className="text-white text-[9px] md:text-[11px] font-extrabold tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity mt-1">
            {isMuted ? 'Unmute Reel' : 'Mute Sound'}
          </span>
        </motion.div>
      </div>

      <motion.div
        className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg className="w-5 h-5 text-white opacity-70" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
