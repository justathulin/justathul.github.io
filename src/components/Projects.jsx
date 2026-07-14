import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import CountUp from './CountUp';

const projects = [
  {
    emoji: '📚',
    status: 'LIVE',
    color: '#6fe3b4',
    title: 'KTUNotes',
    role: 'Founder & Platform Engineer · 2021–2022',
    desc: 'Solo-built and scaled a high-traffic e-learning platform for KTU B.Tech students. Reached 572,000+ monthly unique visitors (Cloudflare-verified) as sole engineer.',
    tags: ['AWS EC2', 'Nginx', 'Redis', 'Docker', 'Kubernetes', 'GitOps'],
    stats: [
      { to: 572, suffix: 'K+', label: 'visitors/mo' },
      { to: 99, suffix: '%+', label: 'uptime' },
      { to: 70, suffix: 'K+', label: 'subscribers' },
    ],
    link: 'https://ktunotes.in',
  },
  {
    emoji: '🏦',
    status: 'PRIVATE',
    color: '#6fc8ff',
    title: 'Enterprise Banking DevOps',
    role: 'Cloud DevOps Engineer · Cloudcontrol · 2022–Present',
    desc: 'End-to-end DevOps ownership for 5+ enterprise and banking clients across on-premise, air-gapped, and AWS Kubernetes environments — 24×7 availability.',
    tags: ['AWS EKS', 'ArgoCD', 'Terraform', 'Prometheus', 'ELK Stack', 'VAPT'],
    stats: [
      { to: 99.9, decimals: 1, suffix: '%', label: 'uptime SLA' },
      { to: 0, suffix: '', label: 'VAPT findings' },
      { to: 15, suffix: '+', label: 'microservices' },
    ],
    link: null,
  },
];

const TiltCard = ({ project }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -6 }}
      className="bg-[#241d5c] border-2 border-[#3c3184] rounded-3xl overflow-hidden hover:border-opacity-80 transition-colors duration-300"
      data-cursor-hover
    >
      <div className="p-6 md:p-7">
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: `radial-gradient(circle at 30% 30%, ${project.color}, ${project.color}44)` }}
          >
            {project.emoji}
          </div>
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{ background: `${project.color}22`, color: project.color }}
          >
            {project.status}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white font-display mb-1">{project.title}</h3>
        <p className="text-[11px] text-[#b3a8e0] mb-3">{project.role}</p>
        <p className="text-[13px] text-[#c9c2e8] leading-relaxed mb-4">{project.desc}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((t) => (
            <span key={t} className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#e7e3fa]">{t}</span>
          ))}
        </div>

        <div className="flex gap-6 border-t border-white/10 pt-4 mb-4">
          {project.stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-0.5">
              <CountUp to={s.to} decimals={s.decimals || 0} suffix={s.suffix} className="text-lg font-bold" style={{ color: project.color }} />
              <span className="text-[10px] text-[#b3a8e0]">{s.label}</span>
            </div>
          ))}
        </div>

        {project.link ? (
          <a href={project.link} target="_blank" rel="noreferrer" className="text-xs font-bold hover:underline" style={{ color: project.color }}>
            Visit site →
          </a>
        ) : (
          <span className="text-xs text-[#b3a8e0]">🔒 private engagement</span>
        )}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="bg-[#1b1547] py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
          <div className="inline-block text-xs font-bold text-[#b3a8e0] uppercase tracking-widest mb-3 bg-white/5 border border-[#3c3184] rounded-full px-3 py-1">// missions</div>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-2">Things I've launched 🚀</h2>
          <p className="text-[#c9c2e8] text-sm md:text-base">Real traffic, real stakes, real 3am pages.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {projects.map((p) => (
            <TiltCard key={p.title} project={p} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          whileHover={{ scale: 1.01 }}
          className="bg-[#241d5c] border-2 border-[#3c3184] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <span className="inline-block text-[11px] font-bold text-[#1b1547] bg-[#ffd166] px-3 py-1 rounded-full mb-2.5">careerlook.in</span>
            <h3 className="text-lg font-bold text-white font-display mb-1.5">View my full career profile</h3>
            <p className="text-[13px] text-[#c9c2e8] max-w-md">Detailed work history, endorsements, and verified experience on Careerlook.</p>
          </div>
          <motion.a
            href="https://careerlook.in"
            target="_blank"
            rel="noreferrer"
            whileHover={{ x: 4 }}
            data-cursor-hover
            className="flex items-center gap-2.5 bg-[#ffd166] text-[#1b1547] text-sm font-bold px-6 py-3 rounded-full whitespace-nowrap"
          >
            Visit profile
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
