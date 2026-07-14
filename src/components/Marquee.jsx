import React from 'react';
import { motion } from 'framer-motion';

const items = [
  'Kubernetes', '✦', 'AWS', '✦', 'Terraform', '✦', 'ArgoCD', '✦', 'Docker', '✦',
  'Prometheus', '✦', 'CI/CD', '✦', 'Zero-downtime deploys', '✦', 'Bash', '✦', 'GitOps', '✦',
];

// Seamless infinite horizontal ticker for extra ambient motion.
const Marquee = () => (
  <div className="relative w-full overflow-hidden border-y border-[color:var(--color-border)] bg-white/[0.02] py-4">
    <motion.div
      className="flex gap-6 whitespace-nowrap font-display text-sm md:text-base font-medium text-[#8ba3c7]"
      animate={{ x: ['0%', '-50%'] }}
      transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
    >
      {[...items, ...items].map((item, i) => (
        <span key={i} className={item === '✦' ? 'text-[#4a9ed9]' : ''}>{item}</span>
      ))}
    </motion.div>
  </div>
);

export default Marquee;
