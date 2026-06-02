"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, AtSign, Globe, Link2, MessageCircle, CheckCircle2, Send, Clock } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormState = {
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
};

const inquiryTypes = ["General", "Project", "Partnership", "Press"];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/kissamedia",
    icon: <AtSign size={20} />,
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com/kissamedia",
    icon: <MessageCircle size={20} />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/kissamedia",
    icon: <Link2 size={20} />,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@kissamedia",
    icon: <Globe size={20} />,
  },
];

// ─── Input shared style ───────────────────────────────────────────────────────

const inputClass =
  "bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F5F5F5] placeholder:text-[#F5F5F5]/25 focus:outline-none focus:border-[#FFD700]/50 transition-colors w-full";

const labelClass = "text-xs font-bold tracking-widest uppercase text-[#F5F5F5]/45 mb-1.5 block";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="bg-[#0A0A0A] text-[#F5F5F5] overflow-x-hidden min-h-screen">
      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        {/* Orbs */}
        <motion.div
          className="absolute rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: "#FFD700", width: 560, height: 560, left: "-15%", top: "-20%" }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: "#FF3CAC", width: 440, height: 440, right: "-8%", top: "5%" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <p className="text-xs font-bold tracking-widest uppercase text-[#FFD700] mb-4">
            Get in Touch
          </p>
          <h1 className="text-6xl md:text-7xl font-black leading-none tracking-tight mb-6">
            <span className="gradient-text">Let&apos;s Create Together</span>
          </h1>
          <p className="text-lg text-[#F5F5F5]/65 leading-relaxed max-w-xl mx-auto">
            Got a project in mind, a brand to build, or just a wild idea? We want to hear it. Drop
            us a message and let&apos;s figure out what we can make together.
          </p>
        </motion.div>
      </section>

      {/* ── 2. Two-column: Form + Details ──────────────────────────────── */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* ── Left: Contact Form ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl font-black mb-7 tracking-tight">Send a Message</h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#1A1A1A] rounded-2xl border border-[#FFD700]/25 p-10 text-center"
              >
                <CheckCircle2 size={48} className="text-[#FFD700] mx-auto mb-4" />
                <h3 className="text-2xl font-black mb-2">Message received!</h3>
                <p className="text-[#F5F5F5]/55 text-sm leading-relaxed max-w-xs mx-auto">
                  We typically respond within one business day. Looking forward to the
                  conversation.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-8 flex flex-col gap-5"
              >
                {/* Name */}
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={inputClass}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+254 700 000 000"
                    className={inputClass}
                  />
                </div>

                {/* Inquiry Type */}
                <div>
                  <label htmlFor="inquiryType" className={labelClass}>
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    required
                    value={form.inquiryType}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="" disabled>
                      Select an inquiry type
                    </option>
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, idea, or question..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="mt-1 flex items-center justify-center gap-2 w-full py-4 rounded-full font-black text-sm text-[#0A0A0A] transition-opacity hover:opacity-85 active:scale-95"
                  style={{
                    background:
                      "linear-gradient(135deg, #FFD700 0%, #FF6B35 60%, #FF3CAC 100%)",
                  }}
                >
                  <Send size={15} />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* ── Right: Contact Details + Social ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h2 className="text-2xl font-black mb-7 tracking-tight">Contact Details</h2>

              <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-8 flex flex-col gap-6">
                {/* Email */}
                <a
                  href="mailto:hello@kissamedia.co"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFD700]/20 transition-colors">
                    <Mail size={18} className="text-[#FFD700]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase text-[#F5F5F5]/40 mb-0.5">
                      Email
                    </p>
                    <p className="text-[#F5F5F5] text-sm font-semibold group-hover:text-[#FFD700] transition-colors">
                      hello@kissamedia.co
                    </p>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+254700000000"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#FF6B35]/10 border border-[#FF6B35]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF6B35]/20 transition-colors">
                    <Phone size={18} className="text-[#FF6B35]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase text-[#F5F5F5]/40 mb-0.5">
                      Phone
                    </p>
                    <p className="text-[#F5F5F5] text-sm font-semibold group-hover:text-[#FFD700] transition-colors">
                      +254 700 000 000
                    </p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#FF3CAC]/10 border border-[#FF3CAC]/20 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-[#FF3CAC]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase text-[#F5F5F5]/40 mb-0.5">
                      Location
                    </p>
                    <p className="text-[#F5F5F5] text-sm font-semibold">Nairobi, Kenya</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-[#F5F5F5]/50" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase text-[#F5F5F5]/40 mb-0.5">
                      Studio Hours
                    </p>
                    <p className="text-[#F5F5F5] text-sm font-semibold">Mon – Fri, 9am – 6pm EAT</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase text-[#F5F5F5]/40 mb-4">
                Follow Us
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-11 h-11 rounded-xl bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-[#F5F5F5]/50 hover:text-[#FFD700] hover:border-[#FFD700]/30 hover:bg-[#FFD700]/5 transition-all"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. Map Placeholder ──────────────────────────────────────────── */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full aspect-[16/5] rounded-3xl bg-[#111111] border border-white/5 flex flex-col items-center justify-center gap-3 relative overflow-hidden"
        >
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(#F5F5F5 1px, transparent 1px), linear-gradient(90deg, #F5F5F5 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Pin icon with glow */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#FF3CAC] blur-xl opacity-40 scale-150" />
              <MapPin
                size={40}
                className="text-[#FF3CAC] relative z-10"
                strokeWidth={1.5}
              />
            </div>
          </motion.div>

          <p className="text-[#F5F5F5]/60 text-sm font-semibold tracking-wide relative z-10">
            Nairobi, Kenya
          </p>
          <p className="text-[#F5F5F5]/25 text-xs relative z-10">
            Map embed coming soon
          </p>
        </motion.div>
      </section>
    </main>
  );
}
