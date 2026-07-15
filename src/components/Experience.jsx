import React from 'react';
import { motion } from 'framer-motion';
import BackgroundBlobs from './BackgroundBlobs';

const skillGroups = [
  { icon: '☁️', category: 'Cloud & IaC', color: '#f97316', skills: ['AWS EC2', 'EKS', 'S3', 'VPC', 'IAM', 'RDS', 'Lambda', 'ECR', 'CloudWatch', 'KMS', 'Terraform', 'Ansible', 'AWS CLI'] },
  { icon: '🔁', category: 'CI/CD & GitOps', color: '#22c55e', skills: ['GitHub Actions', 'GitLab CI/CD', 'Bitbucket Pipelines', 'ArgoCD', 'Nexus Repository', 'Blue/Green Deployments', 'Canary Deployments', 'Vulnerability Scanning', 'Quality Gates'] },
  { icon: '☸️', category: 'Containers & Kubernetes', color: '#fbbf24', skills: ['Docker', 'Kubernetes (EKS + on-prem)', 'Helm', 'HPA', 'RBAC', 'PDB', 'Network Policies', 'Cluster Lifecycle Mgmt'] },
  { icon: '🐧', category: 'Linux Administration', color: '#fdba74', skills: ['Ubuntu', 'RHEL', 'CentOS', 'Nginx', 'HAProxy', 'DNS', 'iptables', 'LVM', 'systemd', 'TLS/SSL', 'NFS', 'sFTP', 'Firewalls'] },
  { icon: '📊', category: 'Observability & Monitoring', color: '#f97316', skills: ['Prometheus', 'Grafana', 'ELK Stack', 'Graylog', 'OpenSearch', 'CloudWatch', 'SLI/SLO Alerting'] },
  { icon: '🗄️', category: 'Databases & Storage', color: '#22c55e', skills: ['MongoDB (Replica Sets)', 'Redis', 'S3 Lifecycle Mgmt', 'ECR/Nexus Pruning'] },
  { icon: '🔐', category: 'DevSecOps & Security', color: '#fbbf24', skills: ['VAPT Remediation', 'CVE Triage', 'IAM Least-Privilege', 'RBAC', 'Secrets Mgmt', 'VPC Segmentation', 'Pipeline Security Scanning'] },
  { icon: '⚙️', category: 'Scripting & Automation', color: '#fdba74', skills: ['Bash/Shell', 'Ansible Playbooks', 'systemd Services', 'Auto-Remediation Scripting'] },
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const card = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 220, damping: 20 } },
};

const Experience = () => {
  return (
    <section id="experience" className="bg-[#0d0a08] py-24 px-6 md:px-12 relative overflow-hidden">
      <BackgroundBlobs />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
          <div className="inline-block text-xs font-bold text-[#a89787] uppercase tracking-widest mb-3 glass rounded-full px-3 py-1">// tech stack</div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-2">Skills I've worked with</h2>
          <p className="text-[#a89787] text-sm md:text-base">The tools and technologies behind 5+ years of production work.</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {skillGroups.map((g) => (
            <motion.div key={g.category} variants={card} className="glass rounded-3xl p-5">
              <div className="flex items-center gap-2.5 mb-3">
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center text-base shrink-0"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${g.color}, ${g.color}55)` }}
                >
                  {g.icon}
                </span>
                <div className="text-[12px] font-bold text-white leading-tight">{g.category}</div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {g.skills.map((s) => (
                  <span
                    key={s}
                    data-cursor-hover
                    className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#e8dcc8] hover:border-white/30 hover:text-white transition-colors"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
