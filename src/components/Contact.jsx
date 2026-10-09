import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlowAvatar from './GlowAvatar';
import BackgroundBlobs from './BackgroundBlobs';
import Reveal from './Reveal';

const Contact = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '', permission: false });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.permission) {
      alert('Please confirm the contact permission checkbox.');
      return;
    }
    const mailto = `mailto:hi@justathul.com?subject=${encodeURIComponent(
      `Portfolio Enquiry from ${formData.firstName} ${formData.lastName}`
    )}&body=${encodeURIComponent(`${formData.message}\n\nFrom: ${formData.email}`)}`;
    window.location.href = mailto;
  };

  return (
    <section id="contact" className="bg-[var(--color-bg-2)] py-24 px-6 md:px-12 relative overflow-hidden">
      <BackgroundBlobs palette={['#f472b6', '#2dd4bf', '#818cf8']} />
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="mb-8 text-center">
          <Reveal variant="scale">
            <div className="inline-block text-xs font-bold font-mono text-[var(--color-highlight)] uppercase tracking-widest mb-3 glass px-3 py-1" style={{ borderColor: 'rgba(244,114,182,0.3)' }}>[ 07 / CONTACT ]</div>
          </Reveal>
          <Reveal variant="clip" delay={0.1}>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-3">Let's talk</h2>
          </Reveal>
          <Reveal variant="blur" delay={0.2}>
            <p className="text-[var(--color-muted)] text-sm md:text-base">I read every message — promise.</p>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="glass rounded-[2rem] p-6 md:p-10 relative shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
        >
          <div className="hidden md:block absolute -top-14 right-8">
            <GlowAvatar size={100} />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text" id="firstName" value={formData.firstName} onChange={handleChange} required
                placeholder="First name"
                className="bg-white/5 border border-[color:var(--color-border)] focus:border-[var(--color-highlight)] rounded-lg px-4 py-3 text-white placeholder-[var(--color-text-faint)] outline-none transition-colors"
              />
              <input
                type="text" id="lastName" value={formData.lastName} onChange={handleChange} required
                placeholder="Last name"
                className="bg-white/5 border border-[color:var(--color-border)] focus:border-[var(--color-highlight)] rounded-lg px-4 py-3 text-white placeholder-[var(--color-text-faint)] outline-none transition-colors"
              />
            </div>
            <input
              type="email" id="email" value={formData.email} onChange={handleChange} required
              placeholder="you@example.com"
              className="bg-white/5 border border-[color:var(--color-border)] focus:border-[var(--color-highlight)] rounded-lg px-4 py-3 text-white placeholder-[var(--color-text-faint)] outline-none transition-colors"
            />
            <textarea
              id="message" value={formData.message} onChange={handleChange} required rows={4}
              placeholder="What's on your mind?"
              className="bg-white/5 border border-[color:var(--color-border)] focus:border-[var(--color-highlight)] rounded-lg px-4 py-3 text-white placeholder-[var(--color-text-faint)] outline-none transition-colors resize-none"
            />

            <label className="flex items-start gap-2.5 text-[12px] text-[var(--color-text-soft)]">
              <input
                type="checkbox" id="permission" checked={formData.permission} onChange={handleChange}
                className="mt-0.5 w-4 h-4" style={{ accentColor: '#f472b6' }}
              />
              I give permission to contact me at this email address.
            </label>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              data-cursor-hover
              className="self-start px-7 py-3 rounded-lg bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-highlight)] text-black font-bold text-sm shadow-[0_8px_24px_rgba(244,114,182,0.35)]"
            >
              Send message
            </motion.button>

            <p className="text-[11px] text-[var(--color-text-faint)] mt-1">
              routes to hi@justathul.com · +91 96058 85554 · Thrissur, Kerala — open to relocation ·{' '}
              <a href="https://linkedin.com/in/justathul" target="_blank" rel="noreferrer" className="underline hover:text-[var(--color-accent-2)]">
                linkedin.com/in/justathul
              </a>
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
