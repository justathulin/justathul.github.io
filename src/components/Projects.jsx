import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import CountUp from './CountUp';

const projects = [
  {
    hash: 'a3f9c21',
    branch: 'main',
    status: 'LIVE',
    title: 'KTUNotes',
    role: 'Founder & Platform Engineer · 2021–2022',
    desc: 'Solo-built and scaled a high-traffic e-learning platform for KTU B.Tech students. Reached 572,000+ monthly unique visitors (Cloudflare-verified) as sole engineer.',
    tags: ['aws-ec2', 'nginx', 'redis', 'docker', 'kubernetes', 'bash', 'gitops'],
    stats: [
      { to: 572, suffix: 'K+', label: 'monthly_visitors' },
      { to: 99, suffix: '%+', label: 'uptime' },
      { to: 70, suffix: 'K+', label: 'telegram_subs' },
    ],
    link: 'https://ktunotes.in',
  },
  {
    hash: 'e771bd4',
    branch: 'prod',
    status: 'PRIVATE',
    title: 'Enterprise Banking DevOps',
    role: 'Cloud DevOps Engineer · Cloudcontrol · 2022–Present',
    desc: 'End-to-end DevOps ownership for 5+ enterprise and banking clients across on-premise, air-gapped, and AWS Kubernetes environments — 24×7 availability.',
    tags: ['aws-eks', 'argocd', 'terraform', 'prometheus', 'elk-stack', 'vapt'],
    stats: [
      { to: 99.9, decimals: 1, suffix: '%', label: 'uptime_sla' },
      { to: 0, suffix: '', label: 'vapt_findings' },
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
      className="bg-[#0d1117] border border-[#1f2b3a] rounded-lg overflow-hidden font-mono hover:border-[#39d98a55] transition-colors duration-300"
      data-cursor-hover
    >
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#1f2b3a] bg-[#10161f]">
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-[#f5b642]">#{project.hash}</span>
          <span className="text-[#6b7d8f]">[{project.branch}]</span>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${project.status === 'LIVE' ? 'bg-[#39d98a1a] text-[#39d98a]' : 'bg-[#6b7d8f1a] text-[#6b7d8f]'}`}>
          {project.status}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-1 tracking-tight">{project.title}</h3>
        <p className="text-[11px] text-[#6b7d8f] mb-3">{project.role}</p>
        <p className="text-[13px] text-[#8b9bab] font-sans leading-relaxed mb-4">{project.desc}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((t) => (
            <span key={t} className="text-[10px] text-[#39d98a] bg-[#39d98a0d] border border-[#39d98a33] px-2 py-1 rounded">{t}</span>
          ))}
        </div>

        <div className="flex gap-6 border-t border-[#1f2b3a] pt-4 mb-4">
          {project.stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-0.5">
              <CountUp to={s.to} decimals={s.decimals || 0} suffix={s.suffix} className="text-lg font-bold text-[#39d98a]" />
              <span className="text-[10px] text-[#6b7d8f]">{s.label}</span>
            </div>
          ))}
        </div>

        {project.link ? (
          <a href={project.link} target="_blank" rel="noreferrer" className="text-xs text-[#39d98a] hover:underline">
            $ open --url {project.link.replace('https://', '')}
          </a>
        ) : (
          <span className="text-xs text-[#6b7d8f]">$ access denied · private repo</span>
        )}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="bg-[#0a0e14] py-24 px-6 md:px-12 font-mono">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-xs text-[#6b7d8f] mb-2 tracking-widest uppercase">// projects</div>
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight mb-2">$ git log --deployments</h2>
          <p className="text-[#8b9bab] font-sans text-sm">Things I built and operate — real traffic, real stakes.</p>
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
          whileHover={{ borderColor: 'rgba(57,217,138,0.4)' }}
          className="bg-[#0d1117] border border-[#1f2b3a] rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <span className="inline-block text-[11px] font-bold text-[#39d98a] bg-[#39d98a1a] border border-[#39d98a40] px-3 py-1 rounded mb-2.5">careerlook.in</span>
            <h3 className="text-lg font-bold text-white mb-1.5">View my full career profile</h3>
            <p className="text-[13px] text-[#8b9bab] font-sans max-w-md">Detailed work history, endorsements, and verified experience on Careerlook.</p>
          </div>
          <motion.a
            href="https://careerlook.in"
            target="_blank"
            rel="noreferrer"
            whileHover={{ x: 4 }}
            data-cursor-hover
            className="flex items-center gap-2.5 bg-[#39d98a] text-[#05130c] text-sm font-bold px-6 py-3 rounded whitespace-nowrap"
          >
            $ visit --profile
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
