import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import CountUp from './CountUp';

const projects = [
  {
    icon: 'KTU',
    title: 'KTUNotes',
    role: 'Founder & Platform Engineer · 2021–2022',
    desc: 'Solo-built and scaled a high-traffic e-learning platform for KTU B.Tech students. Reached 572,000+ monthly unique visitors (Cloudflare-verified) as sole engineer — comparable to mid-tier commercial platforms.',
    tags: ['AWS EC2', 'Nginx', 'Redis', 'Docker', 'Kubernetes', 'Bash', 'GitOps', 'Telegram Bot'],
    stats: [
      { to: 572, suffix: 'K+', label: 'Monthly visitors' },
      { to: 99, suffix: '%+', label: 'Uptime' },
      { to: 70, suffix: 'K+', label: 'Telegram subs' },
    ],
    link: { label: 'Live', href: 'https://ktunotes.in' },
  },
  {
    icon: 'ENT',
    title: 'Enterprise Banking DevOps',
    role: 'Cloud DevOps Engineer · Cloudcontrol · 2022–Present',
    desc: 'End-to-end DevOps ownership for 5+ enterprise and banking clients across on-premise, air-gapped, and AWS Kubernetes environments — 24×7 production availability with banking-grade security compliance.',
    tags: ['AWS EKS', 'ArgoCD', 'Terraform', 'Prometheus', 'ELK Stack', 'VAPT', 'GitLab CI', 'Air-gapped K8s'],
    stats: [
      { to: 99.9, decimals: 1, suffix: '%', label: 'Uptime SLA' },
      { to: 0, suffix: '', label: 'VAPT findings' },
      { to: 15, suffix: '+', label: 'Microservices' },
    ],
    link: { label: 'Private', href: null },
  },
];

const TiltCard = ({ project }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });

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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#1a2540] border border-[#1e2e4a] rounded-2xl p-7 hover:border-[#ff2a2a66] transition-colors duration-300"
      data-cursor-hover
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-[10px] bg-[#ff2a2a1f] text-[#ff2a2a] flex items-center justify-center font-mono text-[11px] font-bold">
          {project.icon}
        </div>
        {project.link.href ? (
          <a href={project.link.href} target="_blank" rel="noreferrer" className="font-mono text-[11px] font-bold text-[#ff2a2a] border border-[#ff2a2a4d] px-3 py-1 rounded-full hover:bg-[#ff2a2a] hover:text-white transition-all">
            {project.link.label} ↗
          </a>
        ) : (
          <span className="font-mono text-[11px] font-bold text-[#7a8ba6] border border-[#1e2e4a] px-3 py-1 rounded-full opacity-60">
            {project.link.label}
          </span>
        )}
      </div>
      <h3 className="text-lg font-bold text-[#e8eef7] mb-1 tracking-tight">{project.title}</h3>
      <p className="font-mono text-[11px] text-[#7a8ba6] mb-3">{project.role}</p>
      <p className="text-[13px] text-[#7a8ba6] leading-relaxed mb-4">{project.desc}</p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((t) => (
          <span key={t} className="text-[11px] font-medium text-[#7a8ba6] bg-white/5 border border-[#1e2e4a] px-2.5 py-1 rounded-full">{t}</span>
        ))}
      </div>
      <div className="flex gap-5 border-t border-[#1e2e4a] pt-4">
        {project.stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-0.5">
            <CountUp to={s.to} decimals={s.decimals || 0} suffix={s.suffix} className="font-mono text-lg font-bold text-[#ff2a2a]" />
            <span className="text-[11px] text-[#7a8ba6]">{s.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="bg-[#0b1120] py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="font-mono text-xs text-[#ff2a2a] tracking-widest uppercase mb-2">// projects</div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#e8eef7] tracking-tight mb-2">Featured Projects</h2>
          <p className="text-sm text-[#7a8ba6]">Things I built and operate — real traffic, real stakes.</p>
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
          className="bg-[#1a2540] border border-[#1e2e4a] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <span className="inline-block font-mono text-[11px] font-bold text-[#ff2a2a] bg-[#ff2a2a1a] border border-[#ff2a2a40] px-3.5 py-1 rounded-full mb-2.5">careerlook.in</span>
            <h3 className="text-xl font-bold text-[#e8eef7] mb-1.5">View my full career profile</h3>
            <p className="text-[13px] text-[#7a8ba6] max-w-md">Detailed work history, endorsements, and verified experience on Careerlook.</p>
          </div>
          <motion.a
            href="https://careerlook.in"
            target="_blank"
            rel="noreferrer"
            whileHover={{ x: 4 }}
            data-cursor-hover
            className="flex items-center gap-2.5 bg-[#ff2a2a] text-white font-mono text-sm font-bold px-7 py-3 rounded-full whitespace-nowrap hover:bg-[#cc1f1f] transition-colors"
          >
            Visit Profile
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
