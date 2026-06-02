"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Palette,
  Video,
  Zap,
  Share2,
  Camera,
  Play,
  CheckCircle,
  ArrowRight,
  Search,
  Lightbulb,
  Hammer,
  Truck,
} from "lucide-react";

export const metadata = {
  title: "Services — Kissa Media Arts Agency",
  description:
    "Graphic design, video production, branding, social media, photography, and animation services from Kissa Media Arts Agency.",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: Palette,
    title: "Graphic Design",
    desc: "Visuals that stop the scroll and stay in memory. From logos to full print campaigns.",
    price: "$500",
    color: "#FFD700",
    features: ["Logo design", "Print materials", "Brand assets", "Social graphics"],
  },
  {
    icon: Video,
    title: "Video Production",
    desc: "Cinematic storytelling for brands that demand attention — from storyboard to final cut.",
    price: "$1,200",
    color: "#FF6B35",
    features: ["Commercials", "Documentaries", "Social content", "Music videos"],
  },
  {
    icon: Zap,
    title: "Branding",
    desc: "A brand that feels inevitable. We build the strategy, voice, and look from the ground up.",
    price: "$800",
    color: "#FF3CAC",
    features: ["Brand strategy", "Visual identity", "Brand guidelines", "Naming"],
  },
  {
    icon: Share2,
    title: "Social Media",
    desc: "Consistent, compelling content that builds communities and converts followers to fans.",
    price: "$400/mo",
    color: "#FFD700",
    features: ["Content creation", "Strategy", "Analytics", "Community management"],
  },
  {
    icon: Camera,
    title: "Photography",
    desc: "Every frame tells your brand's story. We shoot products, people, and everything in between.",
    price: "$600",
    color: "#FF6B35",
    features: ["Product photography", "Lifestyle", "Event coverage", "Portrait"],
  },
  {
    icon: Play,
    title: "Animation",
    desc: "Motion that brings ideas to life — from sleek motion graphics to full 2D animated stories.",
    price: "$900",
    color: "#FF3CAC",
    features: ["Motion graphics", "2D animation", "Explainer videos", "Intros & outros"],
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    icon: Search,
    title: "Discovery",
    desc: "We dive deep into your brand, audience, and goals before a single pixel is placed.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Concept",
    desc: "Ideas are born, challenged, refined, and sharpened into a clear creative direction.",
  },
  {
    number: "03",
    icon: Hammer,
    title: "Creation",
    desc: "Our team executes with precision and boldness — delivering work that exceeds the brief.",
  },
  {
    number: "04",
    icon: Truck,
    title: "Delivery",
    desc: "Final assets handed over on time, with revisions included and your satisfaction guaranteed.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

// ─── Service Card ──────────────────────────────────────────────────────────────

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const Icon = service.icon;
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={index}
      className="card-hover group flex flex-col rounded-2xl p-6 border border-white/5"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      {/* Icon */}
      <div
        className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ backgroundColor: service.color + "22" }}
      >
        <Icon size={24} style={{ color: service.color }} />
      </div>

      {/* Title + desc */}
      <h3 className="mb-2 text-xl font-bold text-white">{service.title}</h3>
      <p className="mb-4 text-sm leading-relaxed" style={{ color: "#9A9A9A" }}>
        {service.desc}
      </p>

      {/* Features */}
      <ul className="mb-6 flex-1 space-y-2">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-white/70">
            <CheckCircle size={14} style={{ color: service.color, flexShrink: 0 }} />
            {f}
          </li>
        ))}
      </ul>

      {/* Pricing + CTA */}
      <div className="mt-auto flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest" style={{ color: "#9A9A9A" }}>
          From{" "}
          <span className="text-base font-bold" style={{ color: service.color }}>
            {service.price}
          </span>
        </span>
        <a
          href="#quote"
          className="flex items-center gap-1 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 hover:gap-2"
          style={{
            backgroundColor: service.color + "22",
            color: service.color,
            border: `1px solid ${service.color}44`,
          }}
        >
          Get Quote <ArrowRight size={12} />
        </a>
      </div>
    </motion.div>
  );
}

// ─── Process Step ──────────────────────────────────────────────────────────────

function ProcessStep({
  step,
  index,
  total,
}: {
  step: (typeof PROCESS_STEPS)[0];
  index: number;
  total: number;
}) {
  const Icon = step.icon;
  const colors = ["#FFD700", "#FF6B35", "#FF3CAC", "#FFD700"];
  const color = colors[index % colors.length];

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      custom={index}
      className="relative flex flex-col items-center text-center md:flex-1"
    >
      {/* Connector line (desktop) */}
      {index < total - 1 && (
        <div
          className="absolute left-1/2 top-8 hidden h-px w-full translate-x-8 md:block"
          style={{ backgroundColor: "#2A2A2A" }}
        />
      )}

      {/* Badge */}
      <div
        className="relative z-10 mb-4 flex h-16 w-16 flex-col items-center justify-center rounded-full border-2"
        style={{
          borderColor: color,
          backgroundColor: color + "18",
        }}
      >
        <Icon size={22} style={{ color }} />
        <span
          className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-black"
          style={{ backgroundColor: color, color: "#0A0A0A" }}
        >
          {index + 1}
        </span>
      </div>

      <h4 className="mb-2 font-bold text-white">{step.title}</h4>
      <p className="text-sm leading-relaxed" style={{ color: "#9A9A9A" }}>
        {step.desc}
      </p>
    </motion.div>
  );
}

// ─── Quote Form ────────────────────────────────────────────────────────────────

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  description: "",
  budget: "",
  timeline: "",
};

function QuoteForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quote request submitted:", form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 rounded-2xl py-16 text-center"
        style={{ backgroundColor: "#1A1A1A" }}
      >
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: "#FFD70022" }}
        >
          <CheckCircle size={32} style={{ color: "#FFD700" }} />
        </div>
        <h3 className="text-2xl font-bold text-white">We&apos;ve Got Your Request!</h3>
        <p style={{ color: "#9A9A9A" }}>
          Our team will be in touch within 24 hours to talk through your project.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-2 text-sm underline"
          style={{ color: "#FFD700" }}
        >
          Submit another request
        </button>
      </motion.div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#141414] px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#FFD700]/60 focus:outline-none focus:ring-1 focus:ring-[#FFD700]/30 transition";
  const labelClass = "mb-1 block text-xs font-semibold uppercase tracking-widest text-white/50";

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-white/5 p-8 md:p-10"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className={labelClass}>Name *</label>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+254 700 000 000"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Company</label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Your company name"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Service *</label>
          <select
            required
            name="service"
            value={form.service}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="" disabled>
              Select a service
            </option>
            {SERVICES.map((s) => (
              <option key={s.title} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Budget Range *</label>
          <select
            required
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="" disabled>
              Select budget
            </option>
            <option value="under-1k">Under $1,000</option>
            <option value="1k-5k">$1,000 – $5,000</option>
            <option value="5k-20k">$5,000 – $20,000</option>
            <option value="20k+">$20,000+</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Timeline *</label>
          <select
            required
            name="timeline"
            value={form.timeline}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="" disabled>
              Select timeline
            </option>
            <option value="asap">ASAP (rush)</option>
            <option value="2-weeks">Within 2 weeks</option>
            <option value="1-month">Within 1 month</option>
            <option value="1-3-months">1–3 months</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Project Description *</label>
          <textarea
            required
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us about your project, goals, and any references you love…"
            className={inputClass + " resize-none"}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 rounded-full px-8 py-4 font-bold text-black shadow-lg transition"
          style={{
            background: "linear-gradient(135deg, #FFD700, #FF6B35, #FF3CAC)",
          }}
        >
          Send Request <ArrowRight size={18} />
        </motion.button>
      </div>
    </motion.form>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#0A0A0A" }}>
      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-32 text-center">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 -top-40"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,215,0,0.12) 0%, transparent 70%)",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.3em]"
          style={{ color: "#FF6B35" }}
        >
          Creative Services
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="gradient-text mb-6 text-5xl font-black leading-none md:text-7xl"
        >
          What We Create
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl text-base leading-relaxed md:text-lg"
          style={{ color: "#9A9A9A" }}
        >
          From a single logo to a full brand universe — Kissa delivers creative work that
          commands attention, earns loyalty, and moves culture.
        </motion.p>
      </section>

      {/* ── Services Grid ── */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* ── Process ── */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          {/* Heading */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: "#FF3CAC" }}
            >
              How We Work
            </p>
            <h2 className="text-4xl font-black text-white md:text-5xl">Our Process</h2>
          </motion.div>

          {/* Steps */}
          <div className="flex flex-col gap-12 md:flex-row md:gap-0">
            {PROCESS_STEPS.map((step, i) => (
              <ProcessStep key={step.title} step={step} index={i} total={PROCESS_STEPS.length} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote Form ── */}
      <section id="quote" className="px-6 pb-32">
        <div className="mx-auto max-w-3xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: "#FFD700" }}
            >
              Let&apos;s Talk
            </p>
            <h2 className="mb-4 text-4xl font-black text-white md:text-5xl">
              Start Your Project
            </h2>
            <p style={{ color: "#9A9A9A" }}>
              Fill in the details below and we&apos;ll get back to you within 24 hours with a
              tailored proposal.
            </p>
          </motion.div>

          <QuoteForm />
        </div>
      </section>
    </main>
  );
}
