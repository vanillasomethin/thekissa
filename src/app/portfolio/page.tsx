"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import type { Metadata } from "next";

// Metadata must be in a separate server component when using "use client",
// but we export it here for reference — actual metadata should be in a layout or
// a sibling server component. We'll define it as a const for documentation.
// export const metadata: Metadata = {
//   title: "Portfolio | Kissa Media Arts Agency",
//   description:
//     "Explore our work — branding, video, photography, social media, web design, and animation projects.",
// };

const CATEGORIES = [
  "All",
  "Branding",
  "Video",
  "Photography",
  "Social Media",
  "Web Design",
  "Animation",
] as const;

type Category = (typeof CATEGORIES)[number];

const CATEGORY_COLORS: Record<string, string> = {
  Branding: "bg-[#FFD700]",
  Video: "bg-[#FF3CAC]",
  Photography: "bg-[#FF6B35]",
  "Social Media": "bg-[#7C3AED]",
  "Web Design": "bg-[#06B6D4]",
  Animation: "bg-[#10B981]",
};

const CATEGORY_BADGE_COLORS: Record<string, string> = {
  Branding: "bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30",
  Video: "bg-[#FF3CAC]/20 text-[#FF3CAC] border-[#FF3CAC]/30",
  Photography: "bg-[#FF6B35]/20 text-[#FF6B35] border-[#FF6B35]/30",
  "Social Media": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Web Design": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  Animation: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

interface Project {
  id: number;
  title: string;
  category: string;
  client: string;
}

const PROJECTS: Project[] = [
  { id: 1, title: "Pulse Energy Rebrand", category: "Branding", client: "Pulse Corp" },
  { id: 2, title: "Bloom Festival Campaign", category: "Social Media", client: "Bloom Events" },
  { id: 3, title: "Nexus Tech Launch Film", category: "Video", client: "Nexus Technologies" },
  { id: 4, title: "Kova Coffee Visual ID", category: "Branding", client: "Kova Coffee" },
  { id: 5, title: "Urban Flow Photo Series", category: "Photography", client: "Urban Flow" },
  { id: 6, title: "Vanilla x Somethin Site", category: "Web Design", client: "Vanilla & Somethin Architects" },
  { id: 7, title: "Midnight Glow Animation", category: "Animation", client: "Midnight Labs" },
  { id: 8, title: "Soko Market Rebrand", category: "Branding", client: "Soko Market" },
  { id: 9, title: "Verde Restaurant Social", category: "Social Media", client: "Verde Group" },
  { id: 10, title: "Apex Sports Campaign", category: "Video", client: "Apex Sports" },
  { id: 11, title: "Nomad Coffee Packaging", category: "Branding", client: "Nomad Coffee" },
  { id: 12, title: "Cityscape Photo Series", category: "Photography", client: "Metro Council" },
];

interface Testimonial {
  name: string;
  company: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Amara Osei",
    company: "Pulse Corp",
    quote:
      "Kissa Media completely transformed our brand identity. The rebrand resonated instantly with our audience — we saw a 40% uplift in brand recognition within three months.",
  },
  {
    name: "Sofia Reyes",
    company: "Bloom Events",
    quote:
      "The social campaign they crafted for Bloom Festival was electric. Every asset felt intentional, on-brand, and genuinely exciting. Our ticket sales exceeded expectations.",
  },
  {
    name: "James Thornton",
    company: "Nexus Technologies",
    quote:
      "From concept to final cut, the Kissa team brought a cinematic quality to our product launch that we didn't think was achievable in our timeline. Absolutely world-class.",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl bg-[#111111] border border-white/5 cursor-pointer"
    >
      {/* Placeholder image */}
      <div className={`relative aspect-video w-full ${CATEGORY_COLORS[project.category] ?? "bg-[#1A1A1A]"} overflow-hidden`}>
        {/* Subtle noise overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjEiLz48L3N2Zz4=')]" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-3 p-4">
          <p className="text-white font-semibold text-center text-lg leading-tight">{project.title}</p>
          <span className="flex items-center gap-1 text-[#FFD700] text-sm font-medium">
            View Case Study <ArrowRight size={14} />
          </span>
        </div>
      </div>

      {/* Card footer */}
      <div className="p-4 flex items-center justify-between gap-2">
        <div>
          <p className="text-white font-medium text-sm leading-snug">{project.title}</p>
          <p className="text-white/40 text-xs mt-0.5">{project.client}</p>
        </div>
        <span
          className={`shrink-0 text-xs px-2.5 py-1 rounded-full border font-medium ${
            CATEGORY_BADGE_COLORS[project.category] ?? "bg-white/10 text-white/60 border-white/10"
          }`}
        >
          {project.category}
        </span>
      </div>
    </motion.div>
  );
}

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const filtered =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      {/* ── Page Hero ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        {/* Background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="w-[600px] h-[600px] rounded-full bg-[#FFD700]/5 blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mb-6">
            <span
              className="bg-gradient-to-r from-[#FFD700] via-[#FF6B35] to-[#FF3CAC] bg-clip-text text-transparent"
            >
              Our Work
            </span>
          </h1>
          <p className="text-white/60 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed">
            Every project tells a story. Here are ours.
          </p>
        </motion.div>
      </section>

      {/* ── Filter Bar ────────────────────────────────────────── */}
      <section className="px-6 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-[#FFD700] text-black border-[#FFD700]"
                    : "bg-transparent text-white/60 border-white/10 hover:border-[#FFD700]/40 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio Grid ────────────────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-white/30 py-20">No projects in this category yet.</p>
          )}
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="px-6 py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center"
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
              Client{" "}
              <span className="bg-gradient-to-r from-[#FFD700] to-[#FF6B35] bg-clip-text text-transparent">
                Voices
              </span>
            </h2>
            <p className="text-white/40 text-base max-w-md mx-auto">
              Relationships built on results, trust, and creative courage.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative bg-[#111111] border border-white/5 rounded-2xl p-7 flex flex-col gap-5"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} size={14} className="fill-[#FFD700] text-[#FFD700]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-white/70 text-sm leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FF3CAC] flex items-center justify-center text-black text-xs font-bold shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="px-6 py-28 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Glow accent */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#FF6B35]/10 blur-[100px] rounded-full"
            />

            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 relative z-10">
              Have a project{" "}
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#FF3CAC] bg-clip-text text-transparent">
                in mind?
              </span>
            </h2>
            <p className="text-white/50 text-base mb-10 relative z-10">
              Let&apos;s build something that stands out. Tell us about your vision.
            </p>

            <a
              href="/contact"
              className="relative z-10 inline-flex items-center gap-2 bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-bold px-8 py-4 rounded-full text-base transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-[#FFD700]/20"
            >
              Start a Conversation <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
