"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2, Send } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const featuredCollaborators = [
  {
    id: "vanilla",
    name: "Vanilla",
    tagline: "Architecture & Spatial Design",
    description:
      "Vanilla brings architectural vision to life — designing spaces that speak. Their mastery of form, material, and atmosphere transforms built environments into experiences that resonate long after you leave.",
    projects: ["The Form & Function Exhibition", "Spatial Branding for Vault Gallery"],
    accent: "#FFD700",
    accentBg: "rgba(255,215,0,0.08)",
    accentBorder: "rgba(255,215,0,0.25)",
    logoGradient: "from-yellow-400 to-yellow-600",
    initials: "VN",
  },
  {
    id: "somethin",
    name: "Somethin",
    tagline: "Architecture & Urban Design",
    description:
      "Somethin turns cities into canvases. Through bold urban interventions and community-driven design, they create environments where identity, culture, and architecture converge into something unforgettable.",
    projects: ["Urban Identity Series", "The Nairobi Blueprint"],
    accent: "#FF6B35",
    accentBg: "rgba(255,107,53,0.08)",
    accentBorder: "rgba(255,107,53,0.25)",
    logoGradient: "from-orange-400 to-orange-600",
    initials: "SM",
  },
];

const jointProjects = [
  {
    name: "The Form & Function Exhibition",
    collaborator: "Kissa × Vanilla",
    description:
      "A landmark exhibition exploring the dialogue between visual identity and architectural space. Kissa led all visual communications; Vanilla designed the spatial experience.",
    bg: "from-yellow-500/40 to-yellow-800/60",
    tag: "#FFD700",
    tagBg: "rgba(255,215,0,0.15)",
  },
  {
    name: "Spatial Branding for Vault Gallery",
    collaborator: "Kissa × Vanilla",
    description:
      "End-to-end brand identity and environmental graphics for Nairobi's most anticipated contemporary art space. Every surface tells the brand story.",
    bg: "from-yellow-400/30 to-zinc-900/80",
    tag: "#FFD700",
    tagBg: "rgba(255,215,0,0.15)",
  },
  {
    name: "Urban Identity Series",
    collaborator: "Kissa × Somethin",
    description:
      "A photographic and graphic series documenting and reinterpreting the visual identity of Nairobi's evolving urban landscape — murals, signage, and spatial wayfinding.",
    bg: "from-orange-500/40 to-orange-900/60",
    tag: "#FF6B35",
    tagBg: "rgba(255,107,53,0.15)",
  },
  {
    name: "The Nairobi Blueprint",
    collaborator: "Kissa × Somethin",
    description:
      "A speculative design project reimagining key urban zones of Nairobi through the combined lens of graphic storytelling and architectural vision.",
    bg: "from-orange-400/30 to-zinc-900/80",
    tag: "#FF6B35",
    tagBg: "rgba(255,107,53,0.15)",
  },
];

const collaborationTypes = [
  "Branding & Identity",
  "Spatial Branding",
  "Video Production",
  "Photography",
  "Exhibition Design",
  "Social Media Campaign",
  "Other",
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function CollaboratorCard({
  collab,
  delay,
}: {
  collab: (typeof featuredCollaborators)[number];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay }}
      className="flex flex-col rounded-3xl overflow-hidden border"
      style={{
        background: collab.accentBg,
        borderColor: collab.accentBorder,
      }}
    >
      {/* Logo placeholder */}
      <div
        className={`w-full aspect-[2/1] bg-gradient-to-br ${collab.logoGradient} flex items-center justify-center`}
      >
        <span className="text-[#0A0A0A] text-5xl font-black tracking-tight">
          {collab.initials}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-8 gap-5">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: collab.accent }}>
            {collab.tagline}
          </p>
          <h3 className="text-3xl font-black text-[#F5F5F5]">{collab.name}</h3>
        </div>

        <p className="text-[#F5F5F5]/65 leading-relaxed text-sm">{collab.description}</p>

        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-[#F5F5F5]/40 mb-3">
            Joint Projects
          </p>
          <ul className="flex flex-col gap-2">
            {collab.projects.map((project) => (
              <li key={project} className="flex items-start gap-2 text-sm text-[#F5F5F5]/80">
                <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: collab.accent }} />
                {project}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto">
          <button
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all hover:opacity-80 active:scale-95"
            style={{ background: collab.accent, color: "#0A0A0A" }}
          >
            View Projects <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof jointProjects)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/5 card-hover flex flex-col"
    >
      {/* Placeholder image */}
      <div className={`w-full aspect-video bg-gradient-to-br ${project.bg}`} />

      {/* Content */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <span
          className="inline-block text-xs font-bold px-3 py-1 rounded-full w-fit"
          style={{ color: project.tag, background: project.tagBg }}
        >
          {project.collaborator}
        </span>
        <h4 className="font-black text-[#F5F5F5] text-base leading-snug">{project.name}</h4>
        <p className="text-[#F5F5F5]/55 text-sm leading-relaxed flex-1">{project.description}</p>
      </div>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function CollaboratorsPage() {
  const [form, setForm] = useState({
    name: "",
    organization: "",
    collaborationType: "",
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
      <section className="relative pt-32 pb-24 px-6 text-center overflow-hidden">
        {/* Background orbs */}
        <motion.div
          className="absolute rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: "#FFD700", width: 500, height: 500, left: "-10%", top: "-20%" }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: "#FF6B35", width: 400, height: 400, right: "-5%", top: "10%" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <p className="text-xs font-bold tracking-widest uppercase text-[#FFD700] mb-4">
            Partners & Collaborators
          </p>
          <h1 className="text-6xl md:text-7xl font-black leading-none tracking-tight mb-6">
            <span className="gradient-text">Creative Alliances</span>
          </h1>
          <p className="text-lg text-[#F5F5F5]/65 leading-relaxed max-w-xl mx-auto">
            We believe the most powerful creative work is born when distinct disciplines collide.
            Kissa builds deep, long-term partnerships with studios and firms who share our obsession
            with craft, intention, and impact.
          </p>
        </motion.div>
      </section>

      {/* ── 2. Featured Collaborators ───────────────────────────────────── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-black mb-12 tracking-tight"
        >
          Featured Collaborators
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredCollaborators.map((collab, i) => (
            <CollaboratorCard key={collab.id} collab={collab} delay={i * 0.15} />
          ))}
        </div>
      </section>

      {/* ── 3. Joint Projects Grid ──────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-black mb-12 tracking-tight"
          >
            Joint Projects
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {jointProjects.map((project, i) => (
              <ProjectCard key={project.name} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Collaboration Philosophy ─────────────────────────────────── */}
      <section className="py-28 px-6 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-bold tracking-widest uppercase text-[#FF3CAC] mb-8">
            Our Philosophy
          </p>
          <blockquote className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-8">
            &ldquo;Great work happens at the{" "}
            <span className="gradient-text">intersection of disciplines.</span>&rdquo;
          </blockquote>
          <p className="text-[#F5F5F5]/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Kissa does not collaborate for the sake of it. Every partnership we enter is built on
            genuine creative alignment — a shared hunger to push past the obvious and make something
            that stands apart. When a brand strategist sits beside an architect, when a filmmaker
            shares a brief with a spatial designer, the unexpected becomes possible. That is where
            we choose to work.
          </p>
        </motion.div>
      </section>

      {/* ── 5. Become a Collaborator ────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#111111] border-y border-white/5">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="text-xs font-bold tracking-widest uppercase text-[#FFD700] mb-3">
              Work With Us
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Become a Collaborator
            </h2>
            <p className="text-[#F5F5F5]/55 text-sm leading-relaxed">
              We&apos;re always open to conversations with studios, firms, and creatives who want to
              build something together. Tell us about yourself.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#1A1A1A] rounded-2xl border border-[#FFD700]/30 p-10 text-center"
            >
              <CheckCircle2 size={48} className="text-[#FFD700] mx-auto mb-4" />
              <h3 className="text-2xl font-black mb-2">Message sent!</h3>
              <p className="text-[#F5F5F5]/55 text-sm">
                We&apos;ll be in touch soon to explore how we can work together.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              onSubmit={handleSubmit}
              className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-8 flex flex-col gap-5"
            >
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold tracking-widest uppercase text-[#F5F5F5]/50">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F5F5F5] placeholder:text-[#F5F5F5]/25 focus:outline-none focus:border-[#FFD700]/50 transition-colors"
                />
              </div>

              {/* Organization */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold tracking-widest uppercase text-[#F5F5F5]/50">
                  Organization
                </label>
                <input
                  type="text"
                  name="organization"
                  required
                  value={form.organization}
                  onChange={handleChange}
                  placeholder="Your studio, firm, or company"
                  className="bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F5F5F5] placeholder:text-[#F5F5F5]/25 focus:outline-none focus:border-[#FFD700]/50 transition-colors"
                />
              </div>

              {/* Collaboration Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold tracking-widest uppercase text-[#F5F5F5]/50">
                  Collaboration Type
                </label>
                <select
                  name="collaborationType"
                  required
                  value={form.collaborationType}
                  onChange={handleChange}
                  className="bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F5F5F5] focus:outline-none focus:border-[#FFD700]/50 transition-colors appearance-none"
                >
                  <option value="" disabled>
                    Select a type
                  </option>
                  {collaborationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold tracking-widest uppercase text-[#F5F5F5]/50">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your work and what you have in mind..."
                  className="bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F5F5F5] placeholder:text-[#F5F5F5]/25 focus:outline-none focus:border-[#FFD700]/50 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 flex items-center justify-center gap-2 w-full py-4 rounded-full font-black text-sm text-[#0A0A0A] transition-opacity hover:opacity-85 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #FFD700 0%, #FF6B35 60%, #FF3CAC 100%)",
                }}
              >
                <Send size={15} />
                Send Message
              </button>
            </motion.form>
          )}
        </div>
      </section>
    </main>
  );
}
