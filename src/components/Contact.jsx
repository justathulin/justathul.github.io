import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimeAvatar from './AnimeAvatar';

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
    const mailto = `mailto:athuldevopz@gmail.com?subject=${encodeURIComponent(
      `Portfolio Enquiry from ${formData.firstName} ${formData.lastName}`
    )}&body=${encodeURIComponent(`${formData.message}\n\nFrom: ${formData.email}`)}`;
    window.location.href = mailto;
  };

  return (
    <section id="contact" className="bg-[#1b1547] py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-8 text-center">
          <div className="inline-block text-xs font-bold text-[#b3a8e0] uppercase tracking-widest mb-3 bg-white/5 border border-[#3c3184] rounded-full px-3 py-1">// contact</div>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-3">Send a transmission 📡</h2>
          <p className="text-[#c9c2e8] text-sm md:text-base">I read every message — promise.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="bg-[#241d5c] border-2 border-[#3c3184] rounded-[2rem] p-6 md:p-10 relative shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
        >
          <div className="hidden md:block absolute -top-16 right-8">
            <AnimeAvatar size={120} />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text" id="firstName" value={formData.firstName} onChange={handleChange} required
                placeholder="First name"
                className="bg-white/5 border-2 border-[#3c3184] focus:border-[#ffd166] rounded-2xl px-4 py-3 text-white placeholder-[#8478b8] outline-none transition-colors"
              />
              <input
                type="text" id="lastName" value={formData.lastName} onChange={handleChange} required
                placeholder="Last name"
                className="bg-white/5 border-2 border-[#3c3184] focus:border-[#ffd166] rounded-2xl px-4 py-3 text-white placeholder-[#8478b8] outline-none transition-colors"
              />
            </div>
            <input
              type="email" id="email" value={formData.email} onChange={handleChange} required
              placeholder="you@example.com"
              className="bg-white/5 border-2 border-[#3c3184] focus:border-[#ffd166] rounded-2xl px-4 py-3 text-white placeholder-[#8478b8] outline-none transition-colors"
            />
            <textarea
              id="message" value={formData.message} onChange={handleChange} required rows={4}
              placeholder="What's on your mind?"
              className="bg-white/5 border-2 border-[#3c3184] focus:border-[#ffd166] rounded-2xl px-4 py-3 text-white placeholder-[#8478b8] outline-none transition-colors resize-none"
            />

            <label className="flex items-start gap-2.5 text-[12px] text-[#c9c2e8]">
              <input
                type="checkbox" id="permission" checked={formData.permission} onChange={handleChange}
                className="mt-0.5 w-4 h-4" style={{ accentColor: '#ffd166' }}
              />
              I give permission to contact me at this email address.
            </label>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              data-cursor-hover
              className="self-start px-7 py-3 rounded-full bg-[#ff8a65] text-[#1b1547] font-bold text-sm shadow-[0_8px_24px_rgba(255,138,101,0.35)]"
            >
              Send transmission 🚀
            </motion.button>

            <p className="text-[11px] text-[#8478b8] mt-1">
              routes to athuldevopz@gmail.com · Thrissur, Kerala — open to relocation
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
