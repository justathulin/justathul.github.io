import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import BackgroundBlobs from './BackgroundBlobs';

const certifications = [
  { emoji: '🧱', name: 'HashiCorp Certified: Terraform Associate (004)', issuer: 'HashiCorp', year: '2025', color: '#fbbf24' },
  { emoji: '☁️', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', year: '2022', color: '#fdba74' },
];

const CertCard = ({ c, i }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 220, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 220, damping: 18 });

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
      initial={{ opacity: 0, rotateY: -90 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      data-cursor-hover
      className="flex items-center gap-4 glass rounded-3xl px-6 py-5 max-w-sm"
    >
      <motion.div
        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shrink-0"
        style={{ background: `radial-gradient(circle at 30% 30%, ${c.color}, ${c.color}55)` }}
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear' }}
      >
        {c.emoji}
      </motion.div>
      <div>
        <div className="text-sm font-bold text-white leading-snug">{c.name}</div>
        <div className="text-[11px] text-[#a89787] mt-1">{c.issuer} · {c.year}</div>
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  return (
    <section id="certifications" className="bg-[#0d0a08] py-24 px-6 md:px-12 relative overflow-hidden">
      <BackgroundBlobs />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
          <div className="inline-block text-xs font-bold text-[#a89787] uppercase tracking-widest mb-3 glass rounded-full px-3 py-1">// badges</div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white">Badge collection</h2>
        </motion.div>

        <div className="flex flex-wrap gap-6" style={{ perspective: 1000 }}>
          {certifications.map((c, i) => (
            <CertCard key={c.name} c={c} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
