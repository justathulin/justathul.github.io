import React from 'react';
import { motion } from 'framer-motion';
import BackgroundBlobs from './BackgroundBlobs';

const certifications = [
  { emoji: '🧱', name: 'HashiCorp Certified: Terraform Associate (004)', issuer: 'HashiCorp', color: '#a78bfa' },
  { emoji: '☁️', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', color: '#7dd3fc' },
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.14 } } };
const item = { hidden: { opacity: 0, scale: 0.7, rotate: -6 }, visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 200, damping: 16 } } };

const Certifications = () => {
  return (
    <section id="certifications" className="bg-[#0a1120] py-24 px-6 md:px-12 relative overflow-hidden">
      <BackgroundBlobs />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
          <div className="inline-block text-xs font-bold text-[#8ba3c7] uppercase tracking-widest mb-3 glass rounded-full px-3 py-1">// badges</div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white">Badge collection</h2>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="flex flex-wrap gap-6">
          {certifications.map((c) => (
            <motion.div
              key={c.name}
              variants={item}
              whileHover={{ y: -8, rotate: 2, scale: 1.03 }}
              data-cursor-hover
              className="flex items-center gap-4 glass rounded-3xl px-6 py-5 max-w-sm"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shrink-0"
                style={{ background: `radial-gradient(circle at 30% 30%, ${c.color}, ${c.color}55)` }}
              >
                {c.emoji}
              </div>
              <div>
                <div className="text-sm font-bold text-white leading-snug">{c.name}</div>
                <div className="text-[11px] text-[#8ba3c7] mt-1">{c.issuer}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
