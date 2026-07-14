import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent, useMotionValue, useTransform } from 'framer-motion';
import BackgroundBlobs from './BackgroundBlobs';

const stations = [
  {
    icon: '☁️',
    title: 'Cloud & Infrastructure',
    desc: 'Provisioning and managing AWS (EC2, EKS, S3, VPC, IAM, RDS, Lambda) with Terraform for multi-environment IaC — cost-controlled, compliance-tagged, and audit-ready.',
    tags: ['AWS', 'Terraform', 'Ansible'],
    color: '#7dd3fc',
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
    color: '#4a9ed9',
    className: 'md:absolute md:top-[700px] md:right-[5%] lg:right-[15%]',
  },
  {
    icon: '📊',
    title: 'Observability & Security',
    desc: 'Prometheus/Grafana SLI/SLO alerting, ELK + Graylog audit pipelines, VAPT remediation — zero critical findings across three banking audits.',
    tags: ['Prometheus', 'Grafana', 'ELK Stack'],
    color: '#a78bfa',
    className: 'md:absolute md:top-[1050px] md:left-[15%] lg:left-[25%]',
  },
];

const packages = [
  { category: 'Cloud & IaC', pkgs: ['AWS EC2', 'EKS', 'S3', 'VPC', 'IAM', 'RDS', 'Lambda', 'Terraform'] },
  { category: 'CI/CD & GitOps', pkgs: ['GitHub Actions', 'GitLab CI', 'Bitbucket', 'ArgoCD', 'Canary'] },
  { category: 'Containers & K8s', pkgs: ['Kubernetes', 'Docker', 'Helm', 'HPA', 'RBAC'] },
  { category: 'Linux Admin', pkgs: ['Ubuntu', 'RHEL', 'Nginx', 'HAProxy', 'systemd'] },
  { category: 'Observability', pkgs: ['Prometheus', 'Grafana', 'ELK', 'Graylog'] },
  { category: 'DevSecOps', pkgs: ['VAPT', 'CVE Triage', 'TLS/SSL', 'Secrets Mgmt'] },
  { category: 'Databases', pkgs: ['MongoDB', 'Redis', 'S3 Lifecycle'] },
  { category: 'Automation', pkgs: ['Bash', 'Ansible', 'Telegram Bots'] },
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
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-xl shrink-0"
            style={{ background: `radial-gradient(circle at 30% 30%, ${station.color}, ${station.color}55)` }}
          >
            {station.icon}
          </div>
          <h3 className="text-lg font-bold text-white font-display">{station.title}</h3>
        </div>
        <p className="text-[13px] leading-relaxed text-[#c8d6ea] mb-4">{station.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {station.tags.map((t) => (
            <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#eaf1fb]">{t}</span>
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

  return (
    <section id="orbit" className="bg-[#0a1120] pt-24 pb-20 px-6 md:px-12 relative overflow-hidden">
      <BackgroundBlobs />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
          <div className="inline-block text-xs font-bold text-[#8ba3c7] uppercase tracking-widest mb-3 glass rounded-full px-3 py-1">// skills</div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-3">My orbit of expertise</h2>
          <p className="text-[#8ba3c7] text-sm md:text-base max-w-lg">Combining Linux mastery, container orchestration, and automation to build resilient systems that never sleep.</p>
        </motion.div>

        <div ref={containerRef} className="relative md:h-[1300px]">
          <svg className="hidden md:block absolute top-0 left-0 w-full h-[1300px] pointer-events-none z-0" viewBox="0 0 1000 1300" preserveAspectRatio="none">
            <path d="M 650,150 C 400,250 200,350 300,550 C 400,750 750,700 700,900 C 650,1100 400,1100 300,1150" fill="none" stroke="rgba(122,168,217,0.18)" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" />
            <mask id="orbit-mask">
              <motion.path d="M 650,150 C 400,250 200,350 300,550 C 400,750 750,700 700,900 C 650,1100 400,1100 300,1150" fill="none" stroke="white" strokeWidth="16" style={{ pathLength }} />
            </mask>
            <path d="M 650,150 C 400,250 200,350 300,550 C 400,750 750,700 700,900 C 650,1100 400,1100 300,1150" fill="none" stroke="#7dd3fc" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" mask="url(#orbit-mask)" />
          </svg>
          <svg className="md:hidden absolute top-0 left-[50%] -translate-x-1/2 w-4 h-full pointer-events-none z-0" viewBox="0 0 4 100" preserveAspectRatio="none">
            <path d="M 2,0 L 2,100" fill="none" stroke="rgba(122,168,217,0.18)" strokeWidth="3" strokeDasharray="2 6" vectorEffect="non-scaling-stroke" />
            <mask id="orbit-mask-mobile">
              <motion.path d="M 2,0 L 2,100" fill="none" stroke="white" strokeWidth="3" style={{ pathLength }} vectorEffect="non-scaling-stroke" />
            </mask>
            <path d="M 2,0 L 2,100" fill="none" stroke="#7dd3fc" strokeWidth="3" strokeDasharray="2 6" mask="url(#orbit-mask-mobile)" vectorEffect="non-scaling-stroke" />
          </svg>

          <div className="flex flex-col gap-6 items-center md:block relative z-10 pt-2 md:pt-0 pb-6 md:pb-0">
            {stations.map((s) => (
              <Station key={s.title} station={s} pathLength={pathLength} containerRef={containerRef} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 glass rounded-3xl p-6 md:p-8"
        >
          <div className="text-sm font-bold text-white font-display mb-5">📡 Full toolbelt</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packages.map((group, gi) => (
              <motion.div key={group.category} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: gi * 0.06 }}>
                <div className="text-[11px] font-bold text-[#7dd3fc] mb-2 uppercase tracking-wider">{group.category}</div>
                <div className="flex flex-wrap gap-1.5">
                  {group.pkgs.map((p) => (
                    <span key={p} className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-[#c8d6ea] border border-white/10 hover:border-[#7dd3fc88] hover:text-white transition-colors" data-cursor-hover>
                      {p}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Orbit;
