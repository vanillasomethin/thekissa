"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CATEGORIES = [
  "All",
  "Branding",
  "Film & Video",
  "Photography",
  "Social",
  "Web & Digital",
  "Animation",
] as const;

type Category = (typeof CATEGORIES)[number];

interface Project {
  id: number;
  title: string;
  client: string;
  category: string;
  gradient: string;
}

const PROJECTS: Project[] = [
  { id: 1,  title: "ORÍTHYA",               client: "Pulse Corp",         category: "Branding",      gradient: "linear-gradient(135deg, #AD1335, #16100F)" },
  { id: 2,  title: "Bloom Festival",         client: "Bloom Events",       category: "Social",        gradient: "linear-gradient(135deg, #1E3D47, #16100F)" },
  { id: 3,  title: "Nexus Launch Film",      client: "Nexus Technologies", category: "Film & Video",  gradient: "linear-gradient(135deg, #2E5563, #16100F)" },
  { id: 4,  title: "Kova Coffee ID",         client: "Kova Coffee",        category: "Branding",      gradient: "linear-gradient(135deg, #7A0E26, #16100F)" },
  { id: 5,  title: "Urban Flow Series",      client: "Urban Flow",         category: "Photography",   gradient: "linear-gradient(135deg, #4A4140, #16100F)" },
  { id: 6,  title: "Vanilla × Somethin",     client: "Vanilla & Somethin", category: "Web & Digital", gradient: "linear-gradient(135deg, #2A3F5F, #16100F)" },
  { id: 7,  title: "Midnight Glow",          client: "Midnight Labs",      category: "Animation",     gradient: "linear-gradient(135deg, #241A18, #355a5f)" },
  { id: 8,  title: "Soko Market Rebrand",    client: "Soko Market",        category: "Branding",      gradient: "linear-gradient(135deg, #AD1335, #7A0E26)" },
  { id: 9,  title: "Verde Restaurant",       client: "Verde Group",        category: "Social",        gradient: "linear-gradient(135deg, #1E3D47, #2E5563)" },
  { id: 10, title: "Apex Sports Campaign",   client: "Apex Sports",        category: "Film & Video",  gradient: "linear-gradient(135deg, #4A4140, #16100F)" },
  { id: 11, title: "Nomad Coffee Packaging", client: "Nomad Coffee",       category: "Branding",      gradient: "linear-gradient(135deg, #B97D1E, #16100F)" },
  { id: 12, title: "Cityscape Series",       client: "Metro Council",      category: "Photography",   gradient: "linear-gradient(135deg, #241A18, #4A4140)" },
];

const TESTIMONIALS = [
  {
    name: "Amara Osei",
    initials: "AO",
    company: "Pulse Corp",
    quote:
      "Kissa Media completely transformed our brand identity. The rebrand resonated instantly with our audience — we saw a 40% uplift in brand recognition within three months.",
  },
  {
    name: "Sofia Reyes",
    initials: "SR",
    company: "Bloom Events",
    quote:
      "The social campaign they crafted for Bloom Festival was electric. Every asset felt intentional, on-brand, and genuinely exciting. Our ticket sales exceeded expectations.",
  },
  {
    name: "James Thornton",
    initials: "JT",
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
      className="group relative overflow-hidden cursor-pointer"
      style={{
        background: "#fff",
        borderRadius: "var(--r-lg)",
        border: "1px solid var(--line)",
        boxShadow: "var(--sh-1)",
      }}
    >
      {/* Image area */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "16/9", background: project.gradient }}
      >
        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to top, rgba(22,16,15,0.88) 0%, transparent 65%)",
          }}
        >
          <span
            className="text-white text-sm font-semibold flex items-center gap-2"
            style={{ fontFamily: "var(--sans)" }}
          >
            View case study →
          </span>
        </div>
      </div>

      {/* Card footer */}
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <p
            className="font-bold leading-snug truncate"
            style={{
              fontFamily: "var(--sans)",
              fontSize: "17px",
              color: "var(--fg1)",
            }}
          >
            {project.title}
          </p>
          <p
            className="mt-0.5 truncate"
            style={{
              fontFamily: "var(--mono)",
              fontSize: "13px",
              color: "var(--fg3)",
            }}
          >
            {project.client}
          </p>
        </div>
        <span
          className="shrink-0 whitespace-nowrap"
          style={{
            background: "var(--bone)",
            color: "var(--crimson)",
            borderRadius: "20px",
            fontSize: "13px",
            padding: "4px 12px",
            fontFamily: "var(--sans)",
            fontWeight: 500,
          }}
        >
          {project.category}
        </span>
      </div>
    </motion.div>
  );
}

export default function PortfolioPage() {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section
          className="relative flex flex-col items-center justify-center text-center overflow-hidden px-6"
          style={{
            background: "var(--ink)",
            paddingTop: "140px",
            paddingBottom: "100px",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="k-eyebrow mb-4"
            style={{ color: "var(--fg-on-ink-2)" }}
          >
            Selected work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{
              fontFamily: "var(--serif-display)",
              fontSize: "clamp(48px, 7vw, 84px)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Our unforgettable{" "}
            <em
              className="italic-crimson"
              style={{ fontStyle: "italic" }}
            >
              kissas.
            </em>
          </motion.h1>
        </section>

        {/* ── Filter Bar ── */}
        <div
          className="sticky top-0 z-30 px-6 py-4"
          style={{
            background: "var(--paper)",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div
            className="wrap flex flex-wrap gap-2 justify-center mx-auto"
            style={{ maxWidth: "1200px" }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: "14px",
                  fontWeight: 600,
                  borderRadius: "999px",
                  padding: "6px 18px",
                  border:
                    active === cat
                      ? "1.5px solid var(--crimson)"
                      : "1.5px solid var(--line-strong)",
                  background:
                    active === cat ? "var(--crimson)" : "transparent",
                  color:
                    active === cat ? "#fff" : "var(--fg2)",
                  cursor: "pointer",
                  transition: "all 0.18s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Portfolio Grid ── */}
        <section
          style={{
            background: "var(--paper)",
            paddingTop: "96px",
            paddingBottom: "96px",
          }}
        >
          <div className="px-6 mx-auto" style={{ maxWidth: "1200px" }}>
            <motion.div
              layout
              className="grid gap-6"
              style={{
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
              }}
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </AnimatePresence>
            </motion.div>
            {filtered.length === 0 && (
              <p
                className="text-center py-20"
                style={{
                  color: "var(--fg3)",
                  fontFamily: "var(--sans)",
                }}
              >
                No projects in this category yet.
              </p>
            )}
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section
          style={{
            background: "var(--bone)",
            paddingTop: "96px",
            paddingBottom: "96px",
          }}
        >
          <div className="px-6 mx-auto" style={{ maxWidth: "1200px" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <p
                className="k-eyebrow mb-4"
                style={{ color: "var(--fg3)", justifyContent: "center" }}
              >
                Testimonials
              </p>
              <h2
                className="k-h2"
                style={{ color: "var(--fg1)" }}
              >
                What our storytellers say.
              </h2>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  style={{
                    background: "#fff",
                    borderRadius: "var(--r-md)",
                    borderLeft: "4px solid var(--crimson)",
                    padding: "28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    boxShadow: "var(--sh-1)",
                  }}
                >
                  <blockquote
                    style={{
                      fontFamily: "var(--serif-display)",
                      fontStyle: "italic",
                      fontSize: "16px",
                      lineHeight: 1.65,
                      color: "var(--fg2)",
                      flex: 1,
                      margin: 0,
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div
                    className="flex items-center gap-3 pt-4"
                    style={{ borderTop: "1px solid var(--line)" }}
                  >
                    <div
                      className="flex items-center justify-center shrink-0"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "var(--crimson)",
                        color: "#fff",
                        fontFamily: "var(--sans)",
                        fontWeight: 700,
                        fontSize: "14px",
                      }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--sans)",
                          fontWeight: 700,
                          fontSize: "14px",
                          color: "var(--fg1)",
                        }}
                      >
                        {t.name}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: "12px",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "var(--fg3)",
                        }}
                      >
                        {t.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="text-center px-6"
          style={{
            background: "var(--ink)",
            paddingTop: "96px",
            paddingBottom: "96px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto"
            style={{ maxWidth: "640px" }}
          >
            <h2
              style={{
                fontFamily: "var(--serif-display)",
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 900,
                color: "#fff",
                marginBottom: "32px",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              Have a project in mind?
            </h2>
            <a
              href="/contact"
              className="btn btn-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              Start a conversation →
            </a>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
