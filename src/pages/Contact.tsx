import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle } from 'lucide-react';
import { Reveal } from '../components/Animations';

const socials = [
  { icon: Github, label: 'GitHub', handle: 'github.com', href: 'https://github.com/kundan424' },
  { icon: Linkedin, label: 'LinkedIn', handle: 'linkedin.com/in', href: 'https://www.linkedin.com/in/kundan-kumar-9455b42b1/' },
  { icon: Mail, label: 'Email', handle: 'kundankumar64355@gmail.com', href: 'mailto:kundankumar64355@gmail.com' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="w-full pt-24">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-8 pt-20 pb-16 border-b border-black/5">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.4em] text-zinc-400 uppercase mb-4">Open to Opportunities</p>
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.88]">GET IN<br />TOUCH</h1>
          <p className="text-sm text-zinc-500 mt-6 max-w-lg leading-relaxed">
            Whether it's a full-time role, freelance project, collaboration, or just a technical chat — I'm always open to interesting conversations.
          </p>
        </Reveal>
      </div>

      <section className="max-w-6xl mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left — info */}
        <div className="lg:col-span-4 flex flex-col gap-12">
          {/* Location */}
          <Reveal>
            <div className="flex items-start gap-4 border border-zinc-200 p-6 hover:border-black/30 transition-colors">
              <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-black tracking-widest uppercase mb-1">Location</p>
                <p className="text-sm text-zinc-500">Bilaspur, Chhattisgarh, India</p>
                <p className="text-[10px] text-zinc-400 mt-1">Open to Remote · Relocation</p>
              </div>
            </div>
          </Reveal>

          {/* Availability */}
          <Reveal delay={0.1}>
            <div className="border border-zinc-200 p-6 hover:border-black/30 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-2 h-2 rounded-full bg-emerald-500"
                />
                <p className="text-xs font-black tracking-widest uppercase">Available</p>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Open to internships, full-time roles, and freelance work starting mid-2027 (earlier for remote).
              </p>
            </div>
          </Reveal>

          {/* Socials */}
          <div className="space-y-3">
            {socials.map(({ icon: Icon, label, handle, href }, i) => (
              <Reveal key={label} delay={i * 0.08}>
                <motion.a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="flex items-center gap-4 border border-zinc-200 p-5 hover:border-black/40 hover:bg-black hover:text-white transition-colors group"
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] font-black tracking-widest uppercase text-zinc-400 group-hover:text-white/60">{label}</p>
                    <p className="text-sm font-medium">{handle}</p>
                  </div>
                </motion.a>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="lg:col-span-8">
          <Reveal delay={0.15}>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full min-h-[400px] border border-zinc-200 p-12 text-center"
              >
                <CheckCircle className="w-16 h-16 mb-6 text-emerald-500" />
                <h3 className="text-2xl font-black tracking-tight mb-2">Message Sent!</h3>
                <p className="text-sm text-zinc-500">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="mt-8 border border-black px-6 py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
                >
                  SEND ANOTHER
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField label="Your Name" name="name" value={form.name} onChange={handleChange} required />
                  <FormField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} required />
                </div>
                <FormField label="Subject" name="subject" value={form.subject} onChange={handleChange} required />
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black tracking-widest uppercase text-zinc-400">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={7}
                    placeholder="Tell me about your project or opportunity..."
                    className="border border-zinc-200 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none placeholder:text-zinc-300"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-black text-white py-4 text-xs font-black tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-zinc-800 transition-colors disabled:opacity-60"
                >
                  {loading ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}>
                      <Send className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <><Send className="w-4 h-4" /> SEND MESSAGE</>
                  )}
                </motion.button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}

function FormField({ label, name, value, onChange, type = 'text', required }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-black tracking-widest uppercase text-zinc-400">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="border border-zinc-200 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-zinc-300"
        placeholder={label}
      />
    </div>
  );
}
