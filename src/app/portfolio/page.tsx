"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Link2 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { CanvaDesign } from "@/lib/canva";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS = [
  { slug: "fyture",            name: "FYTURE",            category: "Branding",           canvaUrl: "https://www.canva.com/d/TT5LBPgwQwxGJOZ", bg: "linear-gradient(145deg,#3A0F1E 0%,#1C0810 70%)", accent: "#C4455E", light: false },
  { slug: "mezze",             name: "Mezze",             category: "Food & Beverage",     canvaUrl: "https://www.canva.com/d/4e8NxvP6rD4weV7", bg: "linear-gradient(145deg,#1E3A20 0%,#0F1A10 70%)", accent: "#5A9A60", light: false },
  { slug: "vs",                name: "VS",                category: "Branding",           canvaUrl: "https://www.canva.com/d/lzVUP4x-0_j4Giu", bg: "linear-gradient(145deg,#2A2010 0%,#10100F 70%)", accent: "#B08A40", light: false },
  { slug: "tecfides",          name: "Tecfides",          category: "Tech & Finance",      canvaUrl: "https://www.canva.com/d/uAp3r5ONIJyRW2t", bg: "linear-gradient(145deg,#1A2A3A 0%,#0F141A 70%)", accent: "#4A7FA0", light: false },
  { slug: "natura",            name: "Natura",            category: "Wellness & Lifestyle",canvaUrl: "https://www.canva.com/d/5atF6nUAu2myTup", bg: "linear-gradient(145deg,#243010 0%,#101508 70%)", accent: "#7AAA40", light: false },
  { slug: "hearing-ear-care",  name: "Hearing Ear Care",  category: "Health",              canvaUrl: "https://www.canva.com/d/_XDPj1ASuUmRVy9", bg: "linear-gradient(145deg,#142030 0%,#0A1018 70%)", accent: "#4A90C0", light: false },
  { slug: "asbc",              name: "ASBC",              category: "Tech & Finance",      canvaUrl: "https://www.canva.com/d/exxmAdW_9dBXBMu", bg: "linear-gradient(145deg,#1E2440 0%,#0F1218 70%)", accent: "#5060B0", light: false },
  { slug: "scribbles",         name: "Scribbles",         category: "Branding",           canvaUrl: "https://www.canva.com/d/y4ZGuierNsuJMza", bg: "linear-gradient(145deg,#3A2010 0%,#18100F 70%)", accent: "#C07040", light: false },
  { slug: "kere-pedals",       name: "Kere Pedals",       category: "Branding",           canvaUrl: "https://www.canva.com/d/QyGODGlg6dG5SDF", bg: "linear-gradient(145deg,#20103A 0%,#100F18 70%)", accent: "#7050C0", light: false },
  { slug: "hyderabadi-dhaba",  name: "Hyderabadi Dhaba",  category: "Food & Beverage",     canvaUrl: "https://www.canva.com/d/MI7BarHBxPEkBaS", bg: "linear-gradient(145deg,#3A2010 0%,#180E08 70%)", accent: "#C07030", light: false },
  { slug: "travel-now",        name: "Travel Now",        category: "Wellness & Lifestyle",canvaUrl: "https://www.canva.com/d/c_eEfVej9so5gqu", bg: "linear-gradient(145deg,#10283A 0%,#081018 70%)", accent: "#3080B0", light: false },
  { slug: "gurukripa",         name: "Gurukripa",         category: "Food & Beverage",     canvaUrl: "https://www.canva.com/d/dhxLE02h2RJJRJE", bg: "linear-gradient(145deg,#3A2015 0%,#180F0A 70%)", accent: "#C08050", light: false },
  { slug: "lyfsense",          name: "Lyfsense",          category: "Health",              canvaUrl: "https://www.canva.com/d/GqmEIxZ6C6ned0v", bg: "linear-gradient(145deg,#1E3828 0%,#0F1814 70%)", accent: "#50B080", light: false },
  { slug: "chocolate-dairies", name: "Chocolate Dairies", category: "Food & Beverage",     canvaUrl: "https://www.canva.com/d/pbq3mWpSOb8pdlK", bg: "linear-gradient(145deg,#3A1810 0%,#180C08 70%)", accent: "#A05030", light: false },
  { slug: "pranik",            name: "Pranik",            category: "Health",              canvaUrl: "https://www.canva.com/d/9-FsZ9v_Njndj88", bg: "linear-gradient(145deg,#204020 0%,#0F1A10 70%)", accent: "#60A060", light: false },
  { slug: "armario",           name: "Armario",           category: "Branding",           canvaUrl: "https://www.canva.com/d/ZO04RqVk5EkiRCs", bg: "linear-gradient(145deg,#40201A 0%,#18100F 70%)", accent: "#B06050", light: false },
  { slug: "espoir-cube",       name: "Espoir Cube",       category: "Branding",           canvaUrl: "https://www.canva.com/d/psdC61XxI9NI2Zu", bg: "linear-gradient(145deg,#2A2040 0%,#100F18 70%)", accent: "#8070B0", light: false },
  { slug: "dip-n-melt",        name: "Dip n Melt",        category: "Food & Beverage",     canvaUrl: "https://www.canva.com/d/GvzfZGfDu3pj4ln", bg: "linear-gradient(145deg,#3A280A 0%,#181008 70%)", accent: "#B09040", light: false },
  { slug: "alive",             name: "Alive",             category: "Wellness & Lifestyle",canvaUrl: "https://www.canva.com/d/YX8nZA1NEv7FyP6", bg: "linear-gradient(145deg,#10381A 0%,#0A1810 70%)", accent: "#40B060", light: false },
  { slug: "sorbete",           name: "Sorbete",           category: "Food & Beverage",     canvaUrl: "https://www.canva.com/d/h0dM5G2nJ8Txp5m", bg: "linear-gradient(145deg,#402015 0%,#180D08 70%)", accent: "#C06040", light: false },
  { slug: "eqmed",             name: "EQMed",             category: "Health",              canvaUrl: "https://www.canva.com/d/yUQQzCWSNc8-yO8", bg: "linear-gradient(145deg,#10243A 0%,#081018 70%)", accent: "#4070A0", light: false },
  { slug: "hayatibb",          name: "Hayatibb",          category: "Health",              canvaUrl: "https://www.canva.com/d/Zj2mWu5_8FKn9iM", bg: "linear-gradient(145deg,#2A2A10 0%,#10100A 70%)", accent: "#A0A040", light: false },
  { slug: "tmed",              name: "Tmed",              category: "Tech & Finance",      canvaUrl: "https://www.canva.com/d/zRQbUcH4o-74Giq", bg: "linear-gradient(145deg,#1E2840 0%,#0F1418 70%)", accent: "#4860A0", light: false },
];

const ALL_CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── ClipReveal ───────────────────────────────────────────────────────────────

function ClipReveal({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  return (
    <div style={{ overflow: "hidden", ...style }}>
      <motion.div
        initial={reduce ? false : { y: "105%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-5%" }}
        transition={reduce ? { duration: 0 } : { duration: 0.75, ease, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const [selected, setSelected] = useState("All");
  const [canvaDesigns, setCanvaDesigns] = useState<CanvaDesign[]>([]);
  const [canvaAuthenticated, setCanvaAuthenticated] = useState(false);
  const [canvaError, setCanvaError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/canva/portfolio")
      .then((r) => r.json())
      .then((data) => {
        if (data?.error === "unauthenticated") return;
        if (data?.error) {
          setCanvaAuthenticated(true);
          setCanvaError(JSON.stringify(data, null, 2));
          return;
        }
        if (data?.designs) {
          setCanvaDesigns(data.designs);
          setCanvaAuthenticated(true);
        }
      })
      .catch((e) => setCanvaError(e.message));
  }, []);

  const filtered =
    selected === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === selected);

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section style={{ background: "var(--ink)", paddingTop: 160, paddingBottom: 100 }}>
          <div className="wrap">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <span
                className="k-eyebrow on-ink"
                style={{ marginBottom: 20, display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                <span className="pa" /> Selected work
              </span>
            </motion.div>

            <h1
              style={{
                fontFamily: "var(--serif-display)",
                fontWeight: 700,
                fontSize: "clamp(56px, 8vw, 96px)",
                lineHeight: 0.97,
                letterSpacing: "-0.018em",
                color: "#fff",
                margin: "16px 0 0",
              }}
            >
              <ClipReveal delay={0.15}>
                <span>Our</span>
              </ClipReveal>
              <ClipReveal delay={0.28}>
                <em style={{ fontStyle: "italic", color: "var(--crimson)" }}>kissas.</em>
              </ClipReveal>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease }}
              style={{
                fontFamily: "var(--sans)",
                fontSize: "clamp(16px, 2vw, 18px)",
                lineHeight: 1.65,
                color: "var(--fg-on-ink-2)",
                marginTop: 28,
                maxWidth: "48ch",
              }}
            >
              Every project is a story. Here are ours — told in frames, light, and motion.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease }}
              style={{
                display: "flex",
                gap: 48,
                marginTop: 56,
                borderTop: "1px solid rgba(255,255,255,0.08)",
                paddingTop: 40,
                flexWrap: "wrap",
              }}
            >
              {[
                { val: "23", label: "Projects delivered" },
                { val: "5", label: "Industry verticals" },
                { val: "2+", label: "Years of kissa" },
              ].map((s) => (
                <div key={s.val}>
                  <p
                    style={{
                      fontFamily: "var(--serif-display)",
                      fontSize: 40,
                      fontWeight: 700,
                      color: "#fff",
                      lineHeight: 1,
                      marginBottom: 6,
                    }}
                  >
                    {s.val}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--fg-on-ink-2)",
                    }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Filter Bar ────────────────────────────────────────────────────── */}
        <div
          style={{
            background: "var(--paper)",
            position: "sticky",
            top: 0,
            zIndex: 40,
            borderBottom: "1px solid var(--line)",
            padding: "14px 0",
          }}
        >
          <div className="wrap" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {ALL_CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setSelected(cat)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                style={{
                  padding: "8px 18px",
                  borderRadius: "var(--r-pill)",
                  border: "1.5px solid",
                  borderColor: selected === cat ? "var(--crimson)" : "var(--line-strong)",
                  background: selected === cat ? "var(--crimson)" : "transparent",
                  color: selected === cat ? "#fff" : "var(--fg2)",
                  fontFamily: "var(--sans)",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.18s, border-color 0.18s, color 0.18s",
                  whiteSpace: "nowrap",
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── Portfolio Grid ─────────────────────────────────────────────────── */}
        <section style={{ background: "var(--paper)", padding: "80px 0 120px" }}>
          <div className="wrap">
            {canvaError && (
              <pre style={{ background: "#1a0a0a", color: "#ff6b6b", padding: 16, borderRadius: 8, fontSize: 12, overflowX: "auto", marginBottom: 24 }}>
                {canvaError}
              </pre>
            )}
            {!canvaAuthenticated && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "var(--bone)",
                  border: "1px solid var(--line)",
                  borderRadius: 12,
                  padding: "14px 20px",
                  marginBottom: 32,
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <p style={{ fontFamily: "var(--sans)", fontSize: 14, color: "var(--fg2)", margin: 0 }}>
                  Connect Canva to load real project thumbnails.
                </p>
                <a
                  href="/api/auth/canva"
                  className="btn btn-primary"
                  style={{ padding: "10px 20px", fontSize: 14 }}
                >
                  <Link2 size={14} /> Connect Canva
                </a>
              </div>
            )}
            <motion.div
              layout
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: 20,
              }}
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => {
                  const canvaDesign = canvaDesigns.find(
                    (d) => d.name.toLowerCase() === project.name.toLowerCase()
                  );
                  return (
                    <ProjectCard
                      key={project.slug}
                      project={project}
                      index={i}
                      thumbnail={canvaDesign?.thumbnail?.url}
                    />
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "80px 0", color: "var(--fg3)" }}>
                <p style={{ fontFamily: "var(--sans)", fontSize: 16 }}>
                  No projects in this category yet.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section
          style={{
            background: "var(--ink)",
            padding: "120px 0",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              fontFamily: "var(--serif-display)",
              fontSize: "clamp(200px,28vw,380px)",
              fontWeight: 700,
              color: "rgba(255,255,255,0.03)",
              lineHeight: 1,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            K
          </div>
          <div className="wrap" style={{ maxWidth: 720, position: "relative", zIndex: 1 }}>
            <ClipReveal>
              <h2
                style={{
                  fontFamily: "var(--serif-display)",
                  fontWeight: 700,
                  fontSize: "clamp(36px, 5vw, 60px)",
                  color: "#fff",
                  margin: "0 0 40px",
                  lineHeight: 1.1,
                }}
              >
                Have a project in mind?
              </h2>
            </ClipReveal>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
            >
              <Link
                href="/contact"
                className="btn btn-primary"
                style={{ fontSize: 16, padding: "16px 32px" }}
              >
                Start a conversation →
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  thumbnail,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  thumbnail?: string;
}) {
  const [hovered, setHovered] = useState(false);

  // Extract first letter and abbreviation for the card graphic
  const initials = project.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.35, delay: Math.min(index * 0.05, 0.25) },
        y: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.05, 0.25) },
      }}
      style={{
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        background: "#fff",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 24px 48px rgba(22,16,15,0.18)"
          : "0 2px 12px rgba(22,16,15,0.06)",
        transition: "transform 0.25s ease-out, box-shadow 0.25s ease-out",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Visual area */}
      <div
        style={{
          aspectRatio: "4/3",
          background: project.bg,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Real thumbnail when available */}
        {thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnail}
            alt={project.name}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: hovered ? 0.9 : 0.8,
              transition: "opacity 0.3s ease-out",
            }}
          />
        )}
        {/* Accent radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 70% 60% at 25% 25%, ${project.accent}30 0%, transparent 65%)`,
            pointerEvents: "none",
          }}
        />

        {/* Giant background initial — brand character */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "var(--serif-display)",
            fontSize: "clamp(80px, 14vw, 160px)",
            fontWeight: 700,
            color: "rgba(255,255,255,0.055)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            userSelect: "none",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            transition: "opacity 0.3s",
            opacity: hovered ? 0.04 : 0.055,
          }}
        >
          {initials}
        </div>

        {/* Horizontal rule lines — design grid feel */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to bottom, transparent calc(33% - 0.5px), rgba(255,255,255,0.04) calc(33% - 0.5px), rgba(255,255,255,0.04) calc(33% + 0.5px), transparent calc(33% + 0.5px)), linear-gradient(to bottom, transparent calc(66% - 0.5px), rgba(255,255,255,0.03) calc(66% - 0.5px), rgba(255,255,255,0.03) calc(66% + 0.5px), transparent calc(66% + 0.5px))",
            pointerEvents: "none",
          }}
        />

        {/* Accent bar — top left */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            width: hovered ? 32 : 20,
            height: 3,
            background: project.accent,
            borderRadius: 2,
            transition: "width 0.3s ease-out",
          }}
        />

        {/* Bottom gradient + info */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "65%",
            background: `linear-gradient(to top, rgba(10,6,5,${hovered ? 0.92 : 0.8}) 0%, transparent 100%)`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "0 20px 20px",
            transition: "background 0.25s ease-out",
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              fontWeight: 500,
              color: "rgba(255,255,255,0.55)",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              marginBottom: 8,
            }}
          >
            {project.category}
          </div>
          <div
            style={{
              fontFamily: "var(--serif-display)",
              fontSize: "clamp(20px, 3vw, 26px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
            }}
          >
            {project.name}
          </div>
          <motion.a
            href={project.canvaUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              marginTop: 12,
              fontFamily: "var(--sans)",
              fontSize: 13,
              fontWeight: 600,
              color: "rgba(255,255,255,0.85)",
              textDecoration: "none",
            }}
          >
            View on Canva <ArrowUpRight size={13} />
          </motion.a>
        </div>
      </div>

      {/* Bottom meta */}
      <div
        style={{
          background: "#fff",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: "var(--sans)",
            fontWeight: 700,
            fontSize: 15,
            color: "var(--fg1)",
            letterSpacing: "-0.005em",
          }}
        >
          {project.name}
        </span>
        <a
          href={project.canvaUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          aria-label={`View ${project.name} on Canva`}
          style={{
            color: hovered ? "var(--crimson)" : "var(--fg3)",
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            transition: "color 0.2s",
          }}
        >
          <ArrowUpRight size={16} />
        </a>
      </div>
    </motion.div>
  );
}
