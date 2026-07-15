import React from 'react';
import { motion } from 'framer-motion';
import BackgroundBlobs from './BackgroundBlobs';

const roles = [
  {
    company: 'Cloudcontrol',
    title: 'Cloud DevOps Engineer',
    period: 'June 2022 – Present',
    color: '#f97316',
    summary: 'End-to-end DevOps ownership for 5+ enterprise and banking clients across on-premise, air-gapped, and AWS environments.',
    bullets: [
      { label: 'Production Availability', text: 'Sole DevOps owner for 24×7 production systems across 5+ enterprise and banking clients; maintained 99.9%+ uptime SLA on Kubernetes deployments; led DR planning, runbook authorship, and live failover/switchover procedures.' },
      { label: 'CI/CD & GitOps', text: 'Designed and maintained GitHub Actions, GitLab CI/CD, Bitbucket, and ArgoCD pipelines for 15+ containerised microservices; integrated Nexus with quality gates and vulnerability scanning; Blue/Green and Canary strategies achieved zero rollback incidents over 12 months.' },
      { label: 'Kubernetes & Containers', text: 'Administered on-prem air-gapped and AWS EKS clusters — HPA, RBAC, PDB, Helm charts, network policies, and node pool lifecycle management; managed Ubuntu, RHEL, and CentOS servers with kernel tuning, iptables, LVM, Nginx, and HAProxy.' },
      { label: 'Cloud & IaC', text: 'Provisioned and managed EC2, EKS, S3, VPC, IAM, RDS, Lambda, and ECR on AWS; engineered Terraform modules with remote state and multi-environment support; enforced cost controls, compliance tagging, and KMS-based encryption policies.' },
      { label: 'Observability & Incident Response', text: 'Implemented Prometheus/Grafana SLI/SLO alerting — reduced MTTD by 60% (18 min → 7 min); built ELK Stack, Graylog, and OpenSearch log pipelines with audit-compliant 90-day retention; owned on-call response and post-incident analysis.' },
      { label: 'DevSecOps & VAPT', text: 'Delivered zero critical VAPT findings across three regulated banking clients; triaged and remediated 12 CVEs; hardened Nginx, HAProxy, IAM, and VPC configurations; integrated security scanning directly into CI/CD pipelines.' },
      { label: 'Automation & Self-Healing', text: 'Authored Bash auto-remediation scripts for OOM, disk saturation, and cert expiry — reduced on-call noise by ~40%; managed MongoDB replica sets with automated backup/restore; maintained ECR/Nexus pruning to control artifact storage costs.' },
      { label: 'Team Enablement', text: 'Onboarded 5+ dev/QA teams across distributed locations onto CI/CD workflows; delivered runbooks, DR plans, postmortems, and deployment documentation for client-facing engagements.' },
    ],
  },
  {
    company: 'KTUNotes',
    title: 'Founder & Platform Engineer',
    period: 'June 2021 – June 2022',
    color: '#fbbf24',
    summary: 'Conceived, built, and operated a production-grade e-learning platform for the KTU B.Tech student community — sole engineer with end-to-end ownership of product, infrastructure, CI/CD, scaling, and operations.',
    bullets: [
      { label: 'Scale', text: 'Scaled the platform to 572,000+ monthly unique visitors (Cloudflare-verified) as the sole infrastructure owner — comparable to mid-tier commercial platforms, managed without a dedicated ops team or cloud budget; sustained 99%+ uptime through exam-season load spikes.' },
      { label: 'Infrastructure from Scratch', text: 'Architected full AWS production infrastructure (EC2, Nginx, Redis, Ubuntu); implemented Redis caching, Nginx performance tuning, and Git-based CI/CD pipelines; deployed Docker containers, Kubernetes orchestration, and GitOps workflows directly on live production.' },
      { label: 'Community at Scale', text: 'Built a real-time alert system via custom Bash pipelines reaching 70,000+ active Telegram subscribers — full product ownership across infrastructure, automation, and community engagement.' },
    ],
  },
];

const RoleCard = ({ role, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay: i * 0.1 }}
    className="relative pl-8 md:pl-12"
  >
    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full" style={{ background: role.color, boxShadow: `0 0 0 4px ${role.color}33` }} />
    {i !== roles.length - 1 && <div className="absolute left-[5px] top-5 bottom-[-3.5rem] w-px bg-white/10" />}

    <div className="glass rounded-3xl p-6 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
        <h3 className="text-lg md:text-xl font-bold text-white font-display">{role.title}</h3>
        <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: role.color }}>{role.period}</span>
      </div>
      <p className="text-[13px] text-[#e8dcc8] leading-relaxed mb-5">{role.summary}</p>

      <ul className="flex flex-col gap-2.5">
        {role.bullets.map((b) => (
          <li key={b.label} className="flex gap-2.5 text-[12px] text-[#a89787] leading-relaxed">
            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: role.color }} />
            {b.text}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const Experience = () => {
  return (
    <section id="experience" className="bg-[#0d0a08] py-24 px-6 md:px-12 relative overflow-hidden">
      <BackgroundBlobs />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
          <div className="inline-block text-xs font-bold text-[#a89787] uppercase tracking-widest mb-3 glass rounded-full px-3 py-1">// deployment log</div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-2">Where I've shipped</h2>
          <p className="text-[#a89787] text-sm md:text-base">5+ years, zero downtime excuses.</p>
        </motion.div>

        <div className="flex flex-col gap-14">
          {roles.map((role, i) => (
            <RoleCard key={role.company} role={role} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
