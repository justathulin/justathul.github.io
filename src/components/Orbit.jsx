import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent, useMotionValue, useTransform } from 'framer-motion';
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

const skillContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const skillCard = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 220, damping: 20 } },
};

const stations = [
  {
    icon: '☁️',
    title: 'Cloud & Infrastructure',
    desc: 'Provisioning and managing AWS (EC2, EKS, S3, VPC, IAM, RDS, Lambda) with Terraform for multi-environment IaC — cost-controlled, compliance-tagged, and audit-ready.',
    tags: ['AWS', 'Terraform', 'Ansible'],
    color: '#fdba74',
    className: 'md:absolute md:top-[10px] md:right-[5%] lg:right-[10%]',
  },
  {
    icon: '🔁',
    title: 'CI/CD & GitOps',
    desc: 'Building immutable Docker pipelines across GitHub Actions, GitLab CI/CD, Bitbucket, and ArgoCD for 15+ microservices — zero rollback incidents over 12 months.',
    tags: ['GitHub Actions', 'GitLab CI', 'ArgoCD'],
    color: '#22c55e',
    className: 'md:absolute md:top-[440px] md:left-[5%] lg:left-[10%]',
  },
  {
    icon: '☸️',
    title: 'Kubernetes & Containers',
    desc: 'Operating production Kubernetes clusters — on-prem air-gapped and EKS — with HPA, RBAC, PDB, Helm, and network policies. 99.9%+ SLA across 5+ deployments.',
    tags: ['Kubernetes', 'Docker', 'Helm'],
    color: '#f97316',
    className: 'md:absolute md:top-[700px] md:right-[5%] lg:right-[15%]',
  },
  {
    icon: '📊',
    title: 'Observability & Security',
    desc: 'Prometheus/Grafana SLI/SLO alerting, ELK + Graylog audit pipelines, VAPT remediation — zero critical findings across three banking audits.',
    tags: ['Prometheus', 'Grafana', 'ELK Stack'],
    color: '#fbbf24',
    className: 'md:absolute md:top-[1050px] md:left-[15%] lg:left-[25%]',
  },
];

const Station = ({ station, pathLength, containerRef }) => {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });

  useMotionValueEvent(pathLength, 'change', (latest) => {
    if (!ref.current || !containerRef.current) return;
    const cardRect = ref.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const triggerY = cardRect.top - containerRect.top + 50;
    const lineTipY = latest * containerRect.height;
    if (lineTipY >= triggerY && !isActive) setIsActive(true);
    else if (lineTipY < triggerY && isActive) setIsActive(false);
  });

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className={`w-72 sm:w-80 rounded-3xl glass z-10 transition-colors duration-500 ${station.className}`}
      style={{
        borderColor: isActive ? station.color : undefined,
        boxShadow: isActive ? `0 20px 50px ${station.color}33` : 'none',
        rotateX,
        rotateY,
        transformPerspective: 900,
      }}
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            className="w-11 h-11 rounded-full flex items-center justify-center text-xl shrink-0"
            style={{ background: `radial-gradient(circle at 30% 30%, ${station.color}, ${station.color}55)` }}
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
          >
            {station.icon}
          </motion.div>
          <h3 className="text-lg font-bold text-white font-display">{station.title}</h3>
        </div>
        <p className="text-[13px] leading-relaxed text-[var(--color-text-soft)] mb-4">{station.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {station.tags.map((t) => (
            <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--color-text)]">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Orbit = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start center', 'end center'] });
  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });
  const [showStack, setShowStack] = useState(false);

  return (
    <section id="orbit" className="bg-[var(--color-bg)] pt-24 pb-20 px-6 md:px-12 relative overflow-hidden">
      <BackgroundBlobs />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
          <div className="inline-block text-xs font-bold text-[var(--color-muted)] uppercase tracking-widest mb-3 glass rounded-full px-3 py-1">// skills</div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-3">My orbit of expertise</h2>
          <p className="text-[var(--color-muted)] text-sm md:text-base max-w-lg">Combining Linux mastery, container orchestration, and automation to build resilient systems that never sleep.</p>
        </motion.div>

        <div ref={containerRef} className="relative md:h-[1300px]">
          <svg className="hidden md:block absolute top-0 left-0 w-full h-[1300px] pointer-events-none z-0" viewBox="0 0 1000 1300" preserveAspectRatio="none">
            <path d="M 650,150 C 400,250 200,350 300,550 C 400,750 750,700 700,900 C 650,1100 400,1100 300,1150" fill="none" stroke="rgba(251, 146, 60,0.18)" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" />
            <mask id="orbit-mask">
              <motion.path d="M 650,150 C 400,250 200,350 300,550 C 400,750 750,700 700,900 C 650,1100 400,1100 300,1150" fill="none" stroke="white" strokeWidth="16" style={{ pathLength }} />
            </mask>
            <path d="M 650,150 C 400,250 200,350 300,550 C 400,750 750,700 700,900 C 650,1100 400,1100 300,1150" fill="none" stroke="var(--color-accent-2)" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" mask="url(#orbit-mask)" />
          </svg>
          <svg className="md:hidden absolute top-0 left-[50%] -translate-x-1/2 w-4 h-full pointer-events-none z-0" viewBox="0 0 4 100" preserveAspectRatio="none">
            <path d="M 2,0 L 2,100" fill="none" stroke="rgba(251, 146, 60,0.18)" strokeWidth="3" strokeDasharray="2 6" vectorEffect="non-scaling-stroke" />
            <mask id="orbit-mask-mobile">
              <motion.path d="M 2,0 L 2,100" fill="none" stroke="white" strokeWidth="3" style={{ pathLength }} vectorEffect="non-scaling-stroke" />
            </mask>
            <path d="M 2,0 L 2,100" fill="none" stroke="var(--color-accent-2)" strokeWidth="3" strokeDasharray="2 6" mask="url(#orbit-mask-mobile)" vectorEffect="non-scaling-stroke" />
          </svg>

          <div className="flex flex-col gap-6 items-center md:block relative z-10 pt-2 md:pt-0 pb-6 md:pb-0">
            {stations.map((s) => (
              <Station key={s.title} station={s} pathLength={pathLength} containerRef={containerRef} />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-4 md:mt-10">
          <button
            type="button"
            onClick={() => setShowStack((v) => !v)}
            data-cursor-hover
            className="text-xs font-bold text-[var(--color-muted)] hover:text-white glass rounded-full px-4 py-2 transition-colors"
          >
            {showStack ? 'Hide full tech stack ↑' : 'See full tech stack ↓'}
          </button>
        </div>

        <AnimatePresence>
          {showStack && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <motion.div
                variants={skillContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
              >
                {skillGroups.map((g) => (
                  <motion.div key={g.category} variants={skillCard} className="glass rounded-3xl p-5">
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
                          className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--color-text-soft)] hover:border-white/30 hover:text-white transition-colors"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Orbit;
