import React from 'react';
import { motion } from 'framer-motion';
import CountUp from './CountUp';
import BackgroundBlobs from './BackgroundBlobs';

const achievements = [
  { emoji: '🛡️', to: 99.9, decimals: 1, suffix: '%', label: 'Uptime SLA', desc: 'Sustained across 5+ enterprise Kubernetes deployments', color: '#22c55e' },
  { emoji: '⚡', to: 60, suffix: '%', label: 'Faster incident detection', desc: 'Cut from 18 min to 7 min via Prometheus/Grafana', color: '#7dd3fc' },
  { emoji: '🎯', to: 0, suffix: '', label: 'Rollback incidents', desc: 'Immutable Docker + GitOps/ArgoCD — 12 months straight', color: '#4a9ed9' },
  { emoji: '🔕', to: 40, suffix: '%', label: 'Less on-call noise', desc: 'Bash auto-remediation for OOM, disk, and cert expiry', color: '#a78bfa' },
  { emoji: '🔐', to: 0, suffix: '', label: 'Critical VAPT findings', desc: '12 CVEs fixed across 3 banking clients', color: '#f472b6' },
  { emoji: '📈', to: 572, suffix: 'K', label: 'Monthly visitors', desc: 'KTUNotes platform at peak — Cloudflare-verified', color: '#22c55e' },
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const item = {
  hidden: { opacity: 0, y: 24, scale: 0.9, rotateX: -55 },
  visible: { opacity: 1, y: 0, scale: 1, rotateX: 0, transition: { type: 'spring', stiffness: 200, damping: 18 } },
};

const Achievements = () => {
  return (
    <section id="achievements" className="bg-[#0a1120] py-24 px-6 md:px-12 relative overflow-hidden">
      <BackgroundBlobs />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
          <div className="inline-block text-xs font-bold text-[#8ba3c7] uppercase tracking-widest mb-3 glass rounded-full px-3 py-1">// wins</div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white">Trophy shelf</h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          style={{ perspective: 1000 }}
        >
          {achievements.map((a) => (
            <motion.div
              key={a.label}
              variants={item}
              whileHover={{ y: -6, rotateX: -4, rotateY: 4 }}
              style={{ transformPerspective: 800 }}
              className="glass rounded-3xl p-5 relative overflow-hidden"
            >
              <div className="text-3xl mb-2">{a.emoji}</div>
              <CountUp to={a.to} decimals={a.decimals || 0} suffix={a.suffix} className="text-2xl font-bold font-display block mb-1" style={{ color: a.color }} />
              <div className="text-[12px] font-bold text-white mb-1.5">{a.label}</div>
              <div className="text-[11px] text-[#8ba3c7] leading-relaxed">{a.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
