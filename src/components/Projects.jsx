import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import CountUp from './CountUp';
import BackgroundBlobs from './BackgroundBlobs';

const projects = [
  {
    emoji: '📚',
    status: 'LIVE',
    color: '#22c55e',
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
      className="glass rounded-3xl overflow-hidden transition-colors duration-300"
      data-cursor-hover
    >
      <div className="p-6 md:p-7">
        <div className="flex items-center justify-between mb-4">
          <motion.div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: `radial-gradient(circle at 30% 30%, ${project.color}, ${project.color}44)` }}
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
          >
            {project.emoji}
          </motion.div>
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{ background: `${project.color}22`, color: project.color }}
          >
            {project.status}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white font-display mb-1">{project.title}</h3>
        <p className="text-[11px] text-[var(--color-muted)] mb-3">{project.role}</p>
        <p className="text-[13px] text-[var(--color-text-soft)] leading-relaxed mb-4">{project.desc}</p>

        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((t) => (
              <span key={t} className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--color-text)]">{t}</span>
            ))}
          </div>
        )}

        {project.stats.length > 0 && (
          <div className="flex gap-6 border-t border-white/10 pt-4 mb-4">
            {project.stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-0.5">
                <CountUp to={s.to} decimals={s.decimals || 0} suffix={s.suffix} className="text-lg font-bold" style={{ color: project.color }} />
                <span className="text-[10px] text-[var(--color-muted)]">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {project.link ? (
          <a href={project.link} target="_blank" rel="noreferrer" className="text-xs font-bold hover:underline" style={{ color: project.color }}>
            Visit site →
          </a>
        ) : (
          <span className="text-xs text-[var(--color-muted)]">🔒 private engagement</span>
        )}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="bg-[var(--color-bg)] py-24 px-6 md:px-12 relative overflow-hidden">
      <BackgroundBlobs />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
          <div className="inline-block text-xs font-bold text-[var(--color-muted)] uppercase tracking-widest mb-3 glass rounded-full px-3 py-1">// missions</div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-2">Things I've launched</h2>
          <p className="text-[var(--color-muted)] text-sm md:text-base">Real traffic, real stakes, real 3am pages.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <TiltCard key={p.title} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
