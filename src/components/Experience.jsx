import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import BackgroundBlobs from './BackgroundBlobs';

const timeline = [
  {
    kind: 'work',
    emoji: '🛰️',
    color: '#4a9ed9',
    org: 'Cloudcontrol',
    role: 'Cloud DevOps Engineer',
    period: 'June 2022 – Present',
    tagline: 'End-to-end DevOps ownership for 5+ enterprise and banking clients across on-premise, air-gapped, and AWS environments.',
    bullets: [
      'Sole DevOps owner for 24×7 production systems across 5+ enterprise and banking clients — 99.9%+ uptime SLA, DR planning, and live failover procedures.',
      'Designed CI/CD & GitOps pipelines (GitHub Actions, GitLab CI/CD, Bitbucket, ArgoCD) for 15+ microservices with Nexus quality gates — zero rollback incidents over 12 months.',
      'Administered on-prem air-gapped and AWS EKS clusters (HPA, RBAC, PDB, Helm, network policies) plus Ubuntu/RHEL/CentOS servers.',
      'Provisioned AWS infrastructure (EC2, EKS, S3, VPC, IAM, RDS, Lambda, ECR) with Terraform modules, cost controls, and KMS encryption.',
      'Built Prometheus/Grafana SLI/SLO alerting — cut MTTD by 60% (18 min → 7 min); ELK/Graylog/OpenSearch pipelines with 90-day retention.',
      'Delivered zero critical VAPT findings across three regulated banking clients; remediated 12 CVEs.',
      'Authored Bash auto-remediation scripts — reduced on-call noise ~40%; onboarded 5+ dev/QA teams onto CI/CD workflows.',
    ],
  },
  {
    kind: 'work',
    emoji: '📚',
    color: '#22c55e',
    org: 'KTUNotes',
    role: 'Founder & Platform Engineer',
    period: 'June 2021 – June 2022',
    tagline: 'Conceived, built, and operated a production-grade e-learning platform for the KTU B.Tech student community — sole engineer, end-to-end.',
    bullets: [
      'Scaled platform to 572,000+ monthly unique visitors (Cloudflare-verified) — sustained 99%+ uptime through exam-season load spikes.',
      'Architected full AWS production infrastructure (EC2, Nginx, Redis, Ubuntu) from scratch with Docker, Kubernetes, and GitOps workflows.',
      'Built a real-time alert system via custom Bash pipelines reaching 70,000+ active Telegram subscribers.',
    ],
  },
  {
    kind: 'education',
    emoji: '🎓',
    color: '#a78bfa',
    org: 'APJ Abdul Kalam Technological University, Kerala',
    role: 'B.Tech, Electronics & Communication Engineering',
    period: '2015 – 2019',
    tagline: '',
    bullets: [],
  },
];

const TimelineCard = ({ entry, i }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [4, -4]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-4, 4]), { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <div className="relative pl-14 md:pl-20">
      {/* timeline rail */}
      <div className="absolute left-[19px] md:left-[27px] top-2 bottom-[-2.5rem] w-px bg-[color:var(--color-border)] last:hidden" />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: i * 0.1 }}
        className="absolute left-2.5 md:left-[14px] top-1 w-8 h-8 rounded-full flex items-center justify-center text-base z-10"
        style={{ background: `radial-gradient(circle at 30% 30%, ${entry.color}, ${entry.color}55)` }}
      >
        {entry.emoji}
      </motion.div>

      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: i * 0.1 }}
        className="glass rounded-3xl p-6 md:p-7 mb-10"
        data-cursor-hover
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
          <h3 className="text-lg font-bold text-white font-display">{entry.role}</h3>
          <span className="text-[11px] font-mono text-[#8ba3c7]">{entry.period}</span>
        </div>
        <div className="text-sm font-semibold mb-3" style={{ color: entry.color }}>{entry.org}</div>

        {entry.tagline && <p className="text-[13px] text-[#c8d6ea] italic leading-relaxed mb-4">{entry.tagline}</p>}

        {entry.bullets.length > 0 && (
          <ul className="flex flex-col gap-2">
            {entry.bullets.map((b, bi) => (
              <li key={bi} className="text-[13px] text-[#c8d6ea] leading-relaxed pl-4 relative">
                <span className="absolute left-0 top-[7px] w-1.5 h-1.5 rounded-full" style={{ background: entry.color }} />
                {b}
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="bg-[#0a1120] py-24 px-6 md:px-12 relative overflow-hidden">
      <BackgroundBlobs />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
          <div className="inline-block text-xs font-bold text-[#8ba3c7] uppercase tracking-widest mb-3 glass rounded-full px-3 py-1">// journey</div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white">Where I've been</h2>
        </motion.div>

        <div>
          {timeline.map((entry, i) => (
            <TimelineCard key={entry.org + entry.role} entry={entry} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
