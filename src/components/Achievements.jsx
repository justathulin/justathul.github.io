import React from 'react';
import { motion } from 'framer-motion';
import CountUp from './CountUp';

const spark = (points) => {
  const w = 100, h = 28;
  const step = w / (points.length - 1);
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * step},${h - p * h}`).join(' ');
};

const achievements = [
  { to: 99.9, decimals: 1, suffix: '%', label: 'uptime_sla', desc: 'Sustained across 5+ enterprise Kubernetes deployments', trend: [0.6, 0.7, 0.65, 0.8, 0.9, 0.95, 0.99] },
  { to: 60, suffix: '%', label: 'mttd_reduction', desc: 'Detection cut from 18 min to 7 min via Prometheus/Grafana', trend: [0.9, 0.8, 0.7, 0.55, 0.45, 0.35, 0.3] },
  { to: 0, suffix: '', label: 'rollback_incidents', desc: 'Immutable Docker + GitOps/ArgoCD — 12 months straight', trend: [0.3, 0.2, 0.15, 0.1, 0.05, 0.02, 0.01] },
  { to: 40, suffix: '%', label: 'oncall_noise_cut', desc: 'Bash auto-remediation for OOM, disk, and cert expiry', trend: [0.9, 0.75, 0.65, 0.55, 0.5, 0.45, 0.4] },
  { to: 0, suffix: '', label: 'critical_vapt_findings', desc: '12 CVEs fixed across 3 banking clients', trend: [0.5, 0.4, 0.3, 0.2, 0.1, 0.05, 0.01] },
  { to: 572, suffix: 'K', label: 'monthly_visitors', desc: 'KTUNotes platform at peak — Cloudflare-verified', trend: [0.2, 0.3, 0.45, 0.55, 0.7, 0.85, 0.98] },
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } } };

const Achievements = () => {
  return (
    <section id="achievements" className="bg-[#0a0e14] py-24 px-6 md:px-12 font-mono border-t border-[#1f2b3a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="text-xs text-[#6b7d8f] mb-2 tracking-widest uppercase">// metrics</div>
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">$ grafana --dashboard slo</h2>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((a) => (
            <motion.div
              key={a.label}
              variants={item}
              whileHover={{ y: -5, borderColor: 'rgba(57,217,138,0.5)' }}
              className="bg-[#0d1117] border border-[#1f2b3a] rounded-lg p-5 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#39d98a] animate-pulse" />
                <span className="text-[9px] text-[#6b7d8f] uppercase tracking-wider">live</span>
              </div>
              <CountUp to={a.to} decimals={a.decimals || 0} suffix={a.suffix} className="text-2xl font-bold text-white block mb-1" />
              <div className="text-[11px] text-[#39d98a] mb-3">{a.label}</div>

              <svg viewBox="0 0 100 28" className="w-full h-7 mb-3" preserveAspectRatio="none">
                <motion.path
                  d={spark(a.trend)}
                  fill="none"
                  stroke="#39d98a"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.8 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              </svg>

              <div className="text-[11px] text-[#6b7d8f] font-sans leading-relaxed">{a.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
