import React, { useState } from 'react';
import { motion } from 'framer-motion';

const fields = [
  { id: 'firstName', label: 'first_name', type: 'text' },
  { id: 'lastName', label: 'last_name', type: 'text' },
  { id: 'email', label: 'email', type: 'email' },
];

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
    <section id="contact" className="bg-[#0a0e14] py-24 px-6 md:px-12 font-mono border-t border-[#1f2b3a]">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-8">
          <div className="text-xs text-[#6b7d8f] mb-2 tracking-widest uppercase">// contact</div>
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">$ ./send-message.sh</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="bg-[#0d1117] border border-[#1f2b3a] rounded-lg overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1f2b3a] bg-[#10161f]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f0605a]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#f5b642]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#39d98a]" />
            <span className="text-[11px] text-[#6b7d8f] ml-3">send-message.sh</span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-5 text-sm">
            {fields.map((f, i) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-2"
              >
                <span className="text-[#39d98a] shrink-0">{'>'} {f.label} =</span>
                <input
                  type={f.type}
                  id={f.id}
                  value={formData[f.id]}
                  onChange={handleChange}
                  required
                  className="flex-1 bg-transparent border-b border-[#1f2b3a] focus:border-[#39d98a] outline-none text-[#c9d1d9] py-1 min-w-0"
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.24 }}
              className="flex items-start gap-2"
            >
              <span className="text-[#39d98a] shrink-0 pt-1">{'>'} message =</span>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="flex-1 bg-transparent border-b border-[#1f2b3a] focus:border-[#39d98a] outline-none text-[#c9d1d9] py-1 resize-none min-w-0"
              />
            </motion.div>

            <motion.label
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-start gap-2.5 text-[11px] text-[#8b9bab] font-sans mt-1"
            >
              <input
                type="checkbox"
                id="permission"
                checked={formData.permission}
                onChange={handleChange}
                className="mt-0.5 w-3.5 h-3.5"
                style={{ accentColor: '#39d98a' }}
              />
              I give permission to contact me at this email address.
            </motion.label>

            <motion.button
              type="submit"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.36 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-cursor-hover
              className="mt-2 self-start px-6 py-2.5 rounded bg-[#39d98a] text-[#05130c] font-bold text-xs hover:bg-[#4ee89b] transition-colors"
            >
              $ ./send --confirm
            </motion.button>

            <p className="text-[11px] text-[#6b7d8f] font-sans mt-1">
              routes directly to <span className="text-[#39d98a]">athuldevopz@gmail.com</span> · Thrissur, Kerala — open to relocation
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
