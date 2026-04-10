'use client';

import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { socials } from '../data/socials';

const initialState = { name: '', email: '', subject: '', message: '' };

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<string[]>([]);

  const isValid = useMemo(() => {
    return (
      form.name.trim().length > 1 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
      form.subject.trim().length > 4 &&
      form.message.trim().length > 14
    );
  }, [form]);

  const handleChange = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setStatus('idle');
    setErrors([]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors: string[] = [];

    if (!form.name.trim()) validationErrors.push('Please enter your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) validationErrors.push('Please enter a valid email.');
    if (form.subject.trim().length < 5) validationErrors.push('Subject should be at least 5 characters.');
    if (form.message.trim().length < 15) validationErrors.push('Message should be at least 15 characters.');

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setStatus('error');
      return;
    }

    setStatus('success');
    setForm(initialState);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={handleSubmit} className="space-y-6 rpg-card p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-gray-200">
            <span>Name</span>
            <input
              value={form.name}
              onChange={handleChange('name')}
              placeholder="Your name"
              className="rpg-input"
            />
          </label>
          <label className="space-y-2 text-sm text-gray-200">
            <span>Email</span>
            <input
              value={form.email}
              onChange={handleChange('email')}
              placeholder="you@example.com"
              type="email"
              className="rpg-input"
            />
          </label>
        </div>
        <label className="space-y-2 text-sm text-gray-200">
          <span>Subject</span>
          <input
            value={form.subject}
            onChange={handleChange('subject')}
            placeholder="Project inquiry or quick hello"
            className="rpg-input"
          />
        </label>
        <label className="space-y-2 text-sm text-gray-200">
          <span>Message</span>
          <textarea
            value={form.message}
            onChange={handleChange('message')}
            placeholder="Tell me about your project, timeline, or collaboration goals..."
            rows={6}
            className="rpg-input"
          />
        </label>
        {status === 'error' && (
          <div className="rounded-3xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-200">
            <p className="font-semibold">Please fix the following:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        {status === 'success' && (
          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
            Thanks for reaching out — your message has been noted. I’ll follow up soon.
          </div>
        )}
        <motion.button
          type="submit"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="rpg-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/50 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={!isValid}
        >
          Send message
        </motion.button>
      </form>
      <aside className="rpg-card p-8">
        <p className="text-sm uppercase tracking-[0.28em] text-purple/80">Alternate contact</p>
        <div className="mt-6 space-y-6 text-sm text-gray-300">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-gray-500">Email</p>
            <a href={`mailto:${socials.email}`} className="mt-2 block text-base text-white transition hover:text-purple">
              {socials.email}
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-gray-500">GitHub</p>
            <a href={socials.github} target="_blank" rel="noreferrer" className="mt-2 block text-base text-white transition hover:text-purple">
              {socials.github}
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-gray-500">LinkedIn</p>
            <a href={socials.linkedin} target="_blank" rel="noreferrer" className="mt-2 block text-base text-white transition hover:text-purple">
              {socials.linkedin}
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
