import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const roles = ['Cloud DevOps Engineer', 'Kubernetes Operator', 'AWS Infrastructure', 'Incident Responder'];

const useUptime = () => {
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
    const speed = deleting ? 35 : 65;
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) setText(current.slice(0, text.length + 1));
        else setTimeout(() => setDeleting(true), 1200);
      } else {
        if (text.length > 0) setText(current.slice(0, text.length - 1));
        else { setDeleting(false); setIndex((i) => (i + 1) % roles.length); }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, index]);

  return (
    <span className="text-[#39d98a]">
      {text}
      <span className="inline-block w-[2px] h-[0.9em] bg-[#39d98a] ml-1 animate-blink align-middle" />
    </span>
  );
};

const Hero = () => {
  const canvasRef = useRef(null);
  const uptime = useUptime();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [], gridLines = [], nodes = [], raf;
    const ACCENT = 'rgba(57,217,138,';

    const rand = (a, b) => Math.random() * (b - a) + a;

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = rand(0, W); this.y = rand(0, H);
        this.r = rand(1, 2.2); this.vx = rand(-0.25, 0.25); this.vy = rand(-0.5, -0.12);
        this.life = rand(0.004, 0.008); this.a = 0; this.alpha = rand(0.1, 0.5);
      }
      update() {
        this.x += this.vx; this.y += this.vy; this.a += this.life;
        this.alpha = Math.sin(this.a) * 0.45;
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
        this.alpha = rand(0.025, 0.06);
        this.speed = rand(0.15, 0.5) * (Math.random() < 0.5 ? 1 : -1);
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
        this.r = rand(2.5, 5); this.pulse = rand(0, Math.PI * 2); this.speed = rand(0.008, 0.025);
        this.alpha = rand(0.08, 0.35);
      }
      update() { this.pulse += this.speed; this.alpha = 0.12 + Math.sin(this.pulse) * 0.18; }
      draw() {
        ctx.save(); ctx.translate(this.x, this.y);
        ctx.beginPath(); ctx.rect(-this.r, -this.r, this.r * 2, this.r * 2);
        ctx.strokeStyle = ACCENT + this.alpha + ')'; ctx.lineWidth = 0.8; ctx.stroke();
        ctx.restore();
      }
    }

    const initParticles = () => {
      particles = Array.from({ length: 90 }, () => new Particle());
      gridLines = [
        ...Array.from({ length: 7 }, () => new GridLine(true)),
        ...Array.from({ length: 5 }, () => new GridLine(false)),
      ];
      nodes = Array.from({ length: 22 }, () => new Node());
    };

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = ACCENT + (0.1 * (1 - d / 100)) + ')';
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      raf = requestAnimationFrame(animate);
      ctx.fillStyle = '#0a0e14';
      ctx.fillRect(0, 0, W, H);
      gridLines.forEach((l) => { l.update(); l.draw(); });
      nodes.forEach((n) => { n.update(); n.draw(); });
      drawConnections();
      particles.forEach((p) => { p.update(); p.draw(); });
    };

    resize();
    animate();
    window.addEventListener('resize', resize);
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-[#0a0e14]">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1400] via-[#0a0e1440] to-[#0a0e14] z-10 pointer-events-none" />

      <div className="absolute inset-0 z-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center items-start text-left w-full h-full font-mono">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-[11px] text-[#6b7d8f] mb-6 border border-[#1f2b3a] rounded-full px-3 py-1.5 bg-[#0d1117]/60"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#39d98a] animate-pulse" />
          all systems operational · uptime {uptime}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#c9d1d9] mb-3 tracking-tight leading-[1.15]"
        >
          <span className="text-[#6b7d8f]">$</span> whoami
          <br />
          <span className="text-white">Athul P S</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-2xl font-semibold mb-6 h-8"
        >
          <TypedRole />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-[#8b9bab] text-sm md:text-base font-sans mb-9 max-w-lg leading-relaxed"
        >
          Keeping production alive — 24×7. 5+ years of Kubernetes, AWS, CI/CD, and zero-downtime deployments for enterprise and banking clients.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-row items-center gap-4 flex-wrap"
        >
          <MagneticButton
            href="#projects"
            data-cursor-hover
            className="px-6 py-3 text-xs md:text-sm rounded bg-[#39d98a] text-[#05130c] font-bold inline-block text-center"
          >
            $ view-work --all
          </MagneticButton>
          <MagneticButton
            href="#contact"
            data-cursor-hover
            className="px-6 py-3 text-xs md:text-sm rounded border border-[#2a3b4f] text-[#c9d1d9] font-bold inline-block text-center hover:border-[#39d98a55]"
          >
            $ contact --me
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none items-center gap-2 font-mono text-[10px] text-[#6b7d8f] tracking-widest uppercase"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        scroll to inspect
        <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
