import React from 'react';
import { motion } from 'framer-motion';

const certifications = [
  { id: 'terraform-associate', name: 'HashiCorp Certified: Terraform Associate (004)', issuer: 'HashiCorp' },
  { id: 'aws-ccp', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services' },
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 160, damping: 18 } } };

const Certifications = () => {
  return (
    <section id="certifications" className="bg-[#0a0e14] py-24 px-6 md:px-12 font-mono">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="text-xs text-[#6b7d8f] mb-2 tracking-widest uppercase">// credentials</div>
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight mb-10">$ ci-checks --verified</h2>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="bg-[#0d1117] border border-[#1f2b3a] rounded-lg overflow-hidden">
          {certifications.map((c, i) => (
            <motion.div
              key={c.id}
              variants={item}
              whileHover={{ backgroundColor: 'rgba(57,217,138,0.04)' }}
              className={`flex items-center gap-4 px-6 py-5 ${i > 0 ? 'border-t border-[#1f2b3a]' : ''}`}
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#39d98a1a] text-[#39d98a] shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white truncate">{c.name}</div>
                <div className="text-[11px] text-[#6b7d8f] mt-0.5">{c.issuer}</div>
              </div>
              <span className="text-[10px] font-bold text-[#39d98a] bg-[#39d98a1a] px-2.5 py-1 rounded shrink-0">PASSED</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
