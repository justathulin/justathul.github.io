import React from 'react';
import { motion } from 'framer-motion';
import CountUp from './CountUp';

const achievements = [
  { to: 99.9, decimals: 1, suffix: '%', label: 'Uptime SLA', desc: 'Sustained across 5+ enterprise Kubernetes deployments' },
  { to: 60, suffix: '%', label: 'MTTD Reduction', desc: 'Detection cut from 18 min to 7 min via Prometheus/Grafana' },
  { to: 0, suffix: '', label: 'Rollback Incidents', desc: 'Immutable Docker + GitOps/ArgoCD — 12 months straight' },
  { to: 40, suffix: '%', label: 'On-call Noise Cut', desc: 'Bash auto-remediation for OOM, disk, and cert expiry' },
  { to: 0, suffix: '', label: 'Critical VAPT Findings', desc: '12 CVEs fixed across 3 banking clients' },
  { to: 572, suffix: 'K', label: 'Monthly Visitors', desc: 'KTUNotes platform at peak — Cloudflare-verified' },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } },
};

const Achievements = () => {
  return (
    <section id="achievements" className="bg-[#0f1829] py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="font-mono text-xs text-[#ff2a2a] tracking-widest uppercase mb-2">// metrics</div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#e8eef7] tracking-tight">Key Achievements</h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {achievements.map((a) => (
            <motion.div
              key={a.label}
              variants={item}
              whileHover={{ y: -6, borderColor: 'rgba(255,42,42,0.5)' }}
              className="relative bg-[#1a2540] border border-[#1e2e4a] rounded-2xl p-6 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#ff2a2a]" />
              <CountUp to={a.to} decimals={a.decimals || 0} suffix={a.suffix} className="font-mono text-3xl font-bold text-[#ff2a2a] block mb-1.5" />
              <div className="text-sm font-semibold text-[#e8eef7] mb-1">{a.label}</div>
              <div className="text-xs text-[#7a8ba6] leading-relaxed">{a.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
