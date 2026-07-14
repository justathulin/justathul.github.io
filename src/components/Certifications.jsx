import React from 'react';
import { motion } from 'framer-motion';

const certifications = [
  { badge: 'HCP TF', name: 'HashiCorp Certified: Terraform Associate (004)', issuer: 'HashiCorp' },
  { badge: 'AWS CCP', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services' },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 160, damping: 18 } },
};

const Certifications = () => {
  return (
    <section id="certifications" className="bg-[#0b1120] py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-mono text-xs text-[#ff2a2a] tracking-widest uppercase mb-2">// credentials</div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#e8eef7] tracking-tight">Certifications</h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col gap-3 mt-12"
        >
          {certifications.map((c) => (
            <motion.div
              key={c.name}
              variants={item}
              whileHover={{ x: 6, borderColor: 'rgba(255,42,42,0.35)' }}
              className="bg-[#1a2540] border border-[#1e2e4a] rounded-xl px-6 py-5 flex items-center gap-5"
            >
              <div className="w-12 h-12 rounded-lg bg-[#ff2a2a1a] border border-[#ff2a2a40] flex items-center justify-center font-mono text-[10px] font-bold text-[#ff2a2a] text-center leading-tight shrink-0 whitespace-pre-line">
                {c.badge.replace(' ', '\n')}
              </div>
              <div>
                <div className="text-[15px] font-semibold text-[#e8eef7]">{c.name}</div>
                <div className="font-mono text-xs text-[#7a8ba6] mt-1">{c.issuer}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
