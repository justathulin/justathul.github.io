import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundBlobs from './BackgroundBlobs';
import MagneticButton from './MagneticButton';

const services = [
  {
    icon: '☁️',
    title: 'Cloud Infrastructure Management',
    desc: 'AWS setup and ongoing management — EC2, EKS, S3, VPC, IAM — with cost control, security hardening, and migrations from other providers or on-prem.',
    color: '#f97316',
  },
  {
    icon: '🌐',
    title: 'WordPress Website Deployment',
    desc: 'Server provisioning, Nginx/Apache configuration, SSL, caching, and performance tuning for WordPress sites — plus staging setups and automated backups.',
    color: '#fbbf24',
  },
  {
    icon: '📊',
    title: 'Alerting & Monitoring Setup',
    desc: 'Prometheus/Grafana dashboards and SLI/SLO alerting so you know about incidents before your customers do — tuned to cut noise, not just add alerts.',
    color: '#fdba74',
  },
  {
    icon: '🗂️',
    title: 'Log Management',
    desc: 'Centralized logging with ELK Stack, Graylog, or OpenSearch — searchable, audit-compliant retention policies, built for fast root-cause analysis.',
    color: '#22c55e',
  },
  {
    icon: '🔁',
    title: 'CI/CD Pipeline Setup',
    desc: 'GitHub Actions, GitLab CI/CD, or ArgoCD pipelines with quality gates and vulnerability scanning — Blue/Green and Canary deployments, zero-downtime releases.',
    color: '#f97316',
  },
  {
    icon: '☸️',
    title: 'Kubernetes Setup & Administration',
    desc: 'Cluster provisioning (EKS or on-prem), Helm charts, autoscaling, RBAC, and network policies — production-grade from day one.',
    color: '#fbbf24',
  },
  {
    icon: '🔐',
    title: 'Security Hardening (DevSecOps)',
    desc: 'VAPT remediation, CVE triage, IAM least-privilege, and Nginx/HAProxy hardening — built for regulated environments like banking and finance.',
    color: '#fdba74',
  },
  {
    icon: '⚙️',
    title: 'Automation & Scripting',
    desc: 'Bash and Ansible automation for backups, self-healing, and repetitive ops work — so your team stops doing the same manual fix every week.',
    color: '#22c55e',
  },
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const card = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 220, damping: 20 } },
};

const Services = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative min-h-full flex items-start justify-center px-4 py-16 md:py-24"
          >
            <div className="relative w-full max-w-6xl glass rounded-3xl px-6 py-14 md:px-12 md:py-20 overflow-hidden">
              <BackgroundBlobs />

              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-5 right-5 z-20 w-9 h-9 flex items-center justify-center rounded-full glass text-white hover:border-[var(--color-border-hover)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="relative z-10">
                <div className="mb-14">
                  <div className="inline-block text-xs font-bold text-[var(--color-muted)] uppercase tracking-widest mb-3 glass rounded-full px-3 py-1">// freelance</div>
                  <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-2">Services I offer</h2>
                  <p className="text-[var(--color-muted)] text-sm md:text-base max-w-lg">Open to full-time roles — and available for freelance or contract DevOps work on the side, from a single WordPress deploy to full production infrastructure.</p>
                </div>

                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
                >
                  {services.map((s) => (
                    <motion.div
                      key={s.title}
                      variants={card}
                      whileHover={{ y: -6 }}
                      data-cursor-hover
                      className="glass rounded-3xl p-6 transition-colors duration-300"
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                        style={{ background: `radial-gradient(circle at 30% 30%, ${s.color}, ${s.color}44)` }}
                      >
                        {s.icon}
                      </div>
                      <h3 className="text-sm font-bold text-white mb-2 leading-snug">{s.title}</h3>
                      <p className="text-[12px] text-[var(--color-muted)] leading-relaxed">{s.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="flex justify-center">
                  <MagneticButton href="#contact" onClick={onClose} data-cursor-hover className="px-6 py-3 text-sm rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-3)] text-white font-bold inline-block text-center shadow-[0_8px_30px_rgba(249,115,22,0.35)]">
                    Get a quote →
                  </MagneticButton>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Services;
