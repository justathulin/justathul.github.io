import React from 'react';
import { motion } from 'framer-motion';
import CountUp from './CountUp';
import BackgroundBlobs from './BackgroundBlobs';
import Reveal from './Reveal';

const achievements = [
  { emoji: '🛡️', to: 99.9, decimals: 1, suffix: '%', label: 'Uptime SLA', desc: 'Sustained across 5+ enterprise Kubernetes deployments', color: '#34d399' },
  { emoji: '⚡', to: 60, suffix: '%', label: 'Faster incident detection', desc: 'Cut from 18 min to 7 min via Prometheus/Grafana', color: '#818cf8' },
  { emoji: '🎯', to: 0, suffix: '', label: 'Rollback incidents', desc: 'Immutable Docker + GitOps/ArgoCD — 12 months straight', color: '#2dd4bf' },
  { emoji: '🔕', to: 40, suffix: '%', label: 'Less on-call noise', desc: 'Bash auto-remediation for OOM, disk, and cert expiry', color: '#fbbf24' },
  { emoji: '🔐', to: 0, suffix: '', label: 'Critical VAPT findings', desc: '12 CVEs fixed across 3 banking clients', color: '#f472b6' },
  { emoji: '📈', to: 500, suffix: 'K+', label: 'Monthly visitors', desc: 'KTUNotes platform at peak — Cloudflare-verified', color: '#34d399' },
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 220, damping: 20 } },
};

const Achievements = () => {
  return (
    <section id="achievements" className="bg-[var(--color-bg-2)] py-24 px-6 md:px-12 relative overflow-hidden">
      <BackgroundBlobs palette={['#f472b6', '#34d399', '#818cf8']} />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-10">
          <Reveal variant="blur">
            <div className="inline-block text-xs font-bold font-mono text-[var(--color-accent)] uppercase tracking-widest mb-3 glass px-3 py-1">[ 05 / WINS ]</div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white">Trophy shelf</h2>
          </Reveal>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="glass flex flex-wrap"
        >
          {achievements.map((a, i) => (
            <motion.div
              key={a.label}
              variants={item}
              className="flex-1 min-w-[160px] px-6 py-7 relative border-[color:var(--color-border)]"
              style={{
                borderTopWidth: 2,
                borderTopColor: a.color,
                borderLeftWidth: i % 3 === 0 ? 0 : 1,
                borderLeftStyle: 'solid',
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl">{a.emoji}</span>
                <CountUp to={a.to} decimals={a.decimals || 0} suffix={a.suffix} className="text-2xl font-bold font-mono" style={{ color: a.color }} />
              </div>
              <div className="text-[12px] font-bold text-white mb-1.5">{a.label}</div>
              <div className="text-[11px] text-[var(--color-muted)] leading-relaxed">{a.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
