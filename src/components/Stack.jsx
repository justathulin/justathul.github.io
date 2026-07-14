import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';

const services = [
  {
    id: 'svc-cloud-infra',
    title: 'Cloud & Infrastructure',
    desc: 'Provisioning and managing AWS (EC2, EKS, S3, VPC, IAM, RDS, Lambda) with Terraform for multi-environment IaC — cost-controlled, compliance-tagged, and audit-ready.',
    tags: ['aws', 'terraform', 'ansible'],
    className: 'md:absolute md:top-[10px] md:right-[5%] lg:right-[10%]',
  },
  {
    id: 'svc-cicd',
    title: 'CI/CD & GitOps',
    desc: 'Building immutable Docker pipelines across GitHub Actions, GitLab CI/CD, Bitbucket, and ArgoCD for 15+ microservices — zero rollback incidents over 12 months of Blue/Green and Canary deployments.',
    tags: ['github-actions', 'gitlab-ci', 'argocd'],
    className: 'md:absolute md:top-[440px] md:left-[5%] lg:left-[10%]',
  },
  {
    id: 'svc-k8s',
    title: 'Kubernetes & Containers',
    desc: 'Operating production Kubernetes clusters — on-prem air-gapped and EKS — with HPA, RBAC, PDB, Helm, and network policies. 99.9%+ SLA across 5+ enterprise deployments.',
    tags: ['kubernetes', 'docker', 'helm'],
    className: 'md:absolute md:top-[700px] md:right-[5%] lg:right-[15%]',
  },
  {
    id: 'svc-observability',
    title: 'Observability & Security',
    desc: 'Prometheus/Grafana SLI/SLO alerting, ELK + Graylog audit pipelines, VAPT remediation — zero critical findings across three banking audits with 12 CVEs resolved.',
    tags: ['prometheus', 'grafana', 'elk-stack'],
    className: 'md:absolute md:top-[1050px] md:left-[15%] lg:left-[25%]',
  },
];

const packages = [
  { category: 'cloud & iac', pkgs: ['aws-ec2', 'aws-eks', 'aws-s3', 'vpc', 'iam', 'rds', 'lambda', 'terraform', 'ansible'] },
  { category: 'ci/cd & gitops', pkgs: ['github-actions', 'gitlab-ci', 'bitbucket', 'argocd', 'nexus', 'blue-green', 'canary'] },
  { category: 'containers & k8s', pkgs: ['kubernetes', 'docker', 'helm', 'hpa', 'rbac', 'air-gapped'] },
  { category: 'linux administration', pkgs: ['ubuntu', 'rhel', 'centos', 'nginx', 'haproxy', 'systemd', 'iptables'] },
  { category: 'observability', pkgs: ['prometheus', 'grafana', 'elk-stack', 'graylog', 'opensearch'] },
  { category: 'devsecops', pkgs: ['vapt', 'cve-triage', 'iam-least-priv', 'tls-ssl', 'secrets-mgmt'] },
  { category: 'databases & storage', pkgs: ['mongodb', 'redis', 's3-lifecycle', 'ecr-pruning'] },
  { category: 'scripting & automation', pkgs: ['bash', 'auto-remediation', 'ansible-playbooks', 'telegram-bots'] },
];

const ServiceNode = ({ service, pathLength, containerRef }) => {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useMotionValueEvent(pathLength, 'change', (latest) => {
    if (!ref.current || !containerRef.current) return;
    const cardRect = ref.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const cardTopRelativeToContainer = cardRect.top - containerRect.top;
    const containerHeight = containerRect.height;
    const triggerY = cardTopRelativeToContainer + 50;
    const lineTipY = latest * containerHeight;

    if (lineTipY >= triggerY && !isActive) setIsActive(true);
    else if (lineTipY < triggerY && isActive) setIsActive(false);
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className={`w-72 sm:w-80 rounded-lg border font-mono transition-colors duration-500 z-10 ${service.className} ${
        isActive ? 'border-[#39d98a] bg-[#0d1117] shadow-[0_0_40px_rgba(57,217,138,0.15)]' : 'border-[#1f2b3a] bg-[#0d1117]'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1f2b3a]">
        <span className="text-[10px] text-[#6b7d8f]">{service.id}</span>
        <span className="flex items-center gap-1.5">
          <motion.span
            className="w-1.5 h-1.5 rounded-full"
            animate={{ backgroundColor: isActive ? '#39d98a' : '#3a4a5c' }}
          />
          <span className={`text-[9px] font-bold uppercase tracking-wider ${isActive ? 'text-[#39d98a]' : 'text-[#3a4a5c]'}`}>
            {isActive ? 'active' : 'idle'}
          </span>
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-base font-bold text-white mb-2 tracking-tight">{service.title}</h3>
        <p className="text-[12px] leading-relaxed text-[#8b9bab] font-sans mb-4">{service.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {service.tags.map((t) => (
            <span key={t} className="text-[10px] px-2 py-1 rounded bg-[#39d98a0d] border border-[#39d98a33] text-[#39d98a]">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Stack = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start center', 'end center'] });
  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  return (
    <section id="stack" className="bg-[#0a0e14] pt-24 pb-20 px-6 md:px-12 font-mono terminal-grid">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-xs text-[#6b7d8f] mb-2 tracking-widest uppercase">// stack</div>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 tracking-tight">$ systemctl status --all</h2>
          <p className="text-[#8b9bab] font-sans text-sm md:text-base max-w-lg">Combining Linux mastery, container orchestration, and automation to create resilient systems that never sleep.</p>
        </motion.div>

        <div ref={containerRef} className="relative md:h-[1300px]">
          <svg className="hidden md:block absolute top-0 left-0 w-full h-[1300px] pointer-events-none z-0" viewBox="0 0 1000 1300" preserveAspectRatio="none">
            <path d="M 650,150 C 400,250 200,350 300,550 C 400,750 750,700 700,900 C 650,1100 400,1100 300,1150" fill="none" stroke="#1f2b3a" strokeWidth="1.5" strokeDasharray="4 6" />
            <mask id="path-mask">
              <motion.path d="M 650,150 C 400,250 200,350 300,550 C 400,750 750,700 700,900 C 650,1100 400,1100 300,1150" fill="none" stroke="white" strokeWidth="16" style={{ pathLength }} />
            </mask>
            <path d="M 650,150 C 400,250 200,350 300,550 C 400,750 750,700 700,900 C 650,1100 400,1100 300,1150" fill="none" stroke="#39d98a" strokeWidth="1.5" strokeDasharray="4 6" mask="url(#path-mask)" />
          </svg>
          <svg className="md:hidden absolute top-0 left-[50%] -translate-x-1/2 w-4 h-full pointer-events-none z-0" viewBox="0 0 4 100" preserveAspectRatio="none">
            <path d="M 2,0 L 2,100" fill="none" stroke="#1f2b3a" strokeWidth="3" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
            <mask id="path-mask-mobile">
              <motion.path d="M 2,0 L 2,100" fill="none" stroke="white" strokeWidth="3" style={{ pathLength }} vectorEffect="non-scaling-stroke" />
            </mask>
            <path d="M 2,0 L 2,100" fill="none" stroke="#39d98a" strokeWidth="3" strokeDasharray="3 5" mask="url(#path-mask-mobile)" vectorEffect="non-scaling-stroke" />
          </svg>

          <div className="flex flex-col gap-6 items-center md:block relative z-10 pt-2 md:pt-0 pb-6 md:pb-0">
            {services.map((s) => (
              <ServiceNode key={s.id} service={s} pathLength={pathLength} containerRef={containerRef} />
            ))}
          </div>
        </div>

        {/* Package listing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 bg-[#0d1117] border border-[#1f2b3a] rounded-lg overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1f2b3a] bg-[#10161f]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f0605a]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#f5b642]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#39d98a]" />
            <span className="text-[11px] text-[#6b7d8f] ml-3">$ dpkg --list</span>
          </div>
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {packages.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.06, duration: 0.4 }}
              >
                <div className="text-[11px] text-[#39d98a] mb-2 uppercase tracking-wider">## {group.category}</div>
                <div className="flex flex-wrap gap-1.5">
                  {group.pkgs.map((p) => (
                    <span key={p} className="text-[11px] px-2 py-1 rounded bg-[#161d27] text-[#8b9bab] border border-[#1f2b3a] hover:border-[#39d98a55] hover:text-[#39d98a] transition-colors" data-cursor-hover>
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

export default Stack;
