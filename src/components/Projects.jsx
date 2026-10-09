import React from 'react';
import { motion } from 'framer-motion';
import CountUp from './CountUp';
import BackgroundBlobs from './BackgroundBlobs';
import Reveal from './Reveal';

const projects = [
  {
    emoji: '📚',
    status: 'LIVE',
    color: '#34d399',
    title: 'KTUNotes',
    role: 'Founder & Platform Engineer · 2021–2022',
    desc: 'Solo-built and scaled a high-traffic e-learning platform for KTU B.Tech students. Reached 500,000+ monthly unique visitors (Cloudflare-verified) as sole engineer.',
    tags: ['AWS EC2', 'Nginx', 'Redis', 'Docker', 'Kubernetes', 'GitOps'],
    stats: [
      { to: 500, suffix: 'K+', label: 'visitors/mo' },
      { to: 99, suffix: '%+', label: 'uptime' },
      { to: 70, suffix: 'K+', label: 'subscribers' },
    ],
    link: 'https://ktunotes.in',
  },
  {
    emoji: '📲',
    status: 'LIVE',
    color: '#fbbf24',
    title: 'Careerlook',
    role: 'Founder & Creator · careerlook.in',
    desc: 'Every IT job in one place. A subscription bot that aggregates listings from direct hiring teams, company career pages, Naukri, LinkedIn, and Kerala IT parks (Technopark, Infopark, Cyberpark, KINFRA) — filtered by role and delivered instantly to WhatsApp or Telegram.',
    tags: ['WhatsApp Bot', 'Telegram Bot', 'Job Aggregation', 'Razorpay', 'Automation'],
    stats: [],
    link: 'https://careerlook.in',
  },
];

const ProjectRow = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative flex flex-col md:flex-row gap-5 md:gap-8 md:items-center py-8 border-b border-[color:var(--color-border)] transition-colors"
      data-cursor-hover
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] scale-y-0 group-hover:scale-y-100 transition-transform origin-top"
        style={{ background: project.color }}
      />

      <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-2 md:w-20 shrink-0 pl-4 md:pl-6">
        <span className="font-mono text-3xl md:text-4xl font-bold text-white/10 group-hover:text-white/20 transition-colors">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span
          className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-sm"
          style={{ background: `${project.color}1a`, color: project.color }}
        >
          {project.status}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{project.emoji}</span>
          <h3 className="text-lg md:text-xl font-bold text-white font-display">{project.title}</h3>
        </div>
        <p className="text-[11px] text-[var(--color-muted)] mb-3 font-mono">{project.role}</p>
        <p className="text-[13px] text-[var(--color-text-soft)] leading-relaxed mb-4 max-w-xl">{project.desc}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span key={t} className="text-[10px] px-2.5 py-1 rounded-sm bg-white/5 border border-white/10 text-[var(--color-text)]">{t}</span>
          ))}
        </div>
      </div>

      <div className="flex md:flex-col items-start gap-5 md:gap-3 md:w-40 shrink-0 pl-4 md:pl-0">
        {project.stats.length > 0 && (
          <div className="flex md:flex-col gap-4 md:gap-1.5">
            {project.stats.map((s) => (
              <div key={s.label} className="flex items-baseline md:items-center gap-1.5">
                <CountUp to={s.to} decimals={s.decimals || 0} suffix={s.suffix} className="text-sm font-bold font-mono" style={{ color: project.color }} />
                <span className="text-[10px] text-[var(--color-muted)]">{s.label}</span>
              </div>
            ))}
          </div>
        )}
        {project.link ? (
          <a href={project.link} target="_blank" rel="noreferrer" className="text-xs font-bold hover:underline whitespace-nowrap" style={{ color: project.color }}>
            Visit site →
          </a>
        ) : (
          <span className="text-xs text-[var(--color-muted)] whitespace-nowrap">🔒 private engagement</span>
        )}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="bg-[var(--color-bg)] py-24 px-6 md:px-12 relative overflow-hidden">
      <BackgroundBlobs palette={['#34d399', '#fbbf24', '#2dd4bf']} />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <Reveal variant="slide" direction="left">
            <div className="inline-block text-xs font-bold font-mono text-[var(--color-accent)] uppercase tracking-widest mb-3 glass px-3 py-1">[ 04 / PROJECTS ]</div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white">Things I've launched</h2>
          </Reveal>
          <Reveal variant="slide" direction="right" delay={0.1}>
            <p className="text-[var(--color-muted)] text-sm md:text-base md:text-right md:max-w-xs">Real traffic, real stakes, real 3am pages.</p>
          </Reveal>
        </div>

        <div className="border-t border-[color:var(--color-border)]">
          {projects.map((p, i) => (
            <ProjectRow key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
