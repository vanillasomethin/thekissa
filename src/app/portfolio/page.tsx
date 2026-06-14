"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUpRight, Upload } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { PortfolioMediaManifest, PortfolioMediaEntry } from "@/lib/portfolioMedia";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS = [
  { slug: "fyture",            name: "FYTURE",            category: "Branding",           canvaUrl: "https://www.canva.com/d/TT5LBPgwQwxGJOZ", bg: "linear-gradient(145deg,#3A0F1E 0%,#1C0810 70%)", accent: "#C4455E", light: false , cover: "/portfolio/fyture.png"},
  { slug: "mezze",             name: "Mezze",             category: "Food & Beverage",     canvaUrl: "https://www.canva.com/d/4e8NxvP6rD4weV7", bg: "linear-gradient(145deg,#1E3A20 0%,#0F1A10 70%)", accent: "#5A9A60", light: false , cover: "/portfolio/mezze.png"},
  { slug: "vs",                name: "VS",                category: "Branding",           canvaUrl: "https://www.canva.com/d/lzVUP4x-0_j4Giu", bg: "linear-gradient(145deg,#2A2010 0%,#10100F 70%)", accent: "#B08A40", light: false , cover: "/portfolio/vs.png"},
  { slug: "tecfides",          name: "Tecfides",          category: "Tech & Finance",      canvaUrl: "https://www.canva.com/d/uAp3r5ONIJyRW2t", bg: "linear-gradient(145deg,#1A2A3A 0%,#0F141A 70%)", accent: "#4A7FA0", light: false , cover: "/portfolio/tecfides.png"},
  { slug: "natura",            name: "Natura",            category: "Wellness & Lifestyle",canvaUrl: "https://www.canva.com/d/5atF6nUAu2myTup", bg: "linear-gradient(145deg,#243010 0%,#101508 70%)", accent: "#7AAA40", light: false , cover: "/portfolio/natura.png"},
  { slug: "hearing-ear-care",  name: "Hearing Ear Care",  category: "Health",              canvaUrl: "https://www.canva.com/d/_XDPj1ASuUmRVy9", bg: "linear-gradient(145deg,#142030 0%,#0A1018 70%)", accent: "#4A90C0", light: false , cover: "/portfolio/hearing-ear-care.png"},
  { slug: "asbc",              name: "ASBC",              category: "Tech & Finance",      canvaUrl: "https://www.canva.com/d/exxmAdW_9dBXBMu", bg: "linear-gradient(145deg,#1E2440 0%,#0F1218 70%)", accent: "#5060B0", light: false , cover: "/portfolio/asbc.png"},
  { slug: "scribbles",         name: "Scribbles",         category: "Branding",           canvaUrl: "https://www.canva.com/d/y4ZGuierNsuJMza", bg: "linear-gradient(145deg,#3A2010 0%,#18100F 70%)", accent: "#C07040", light: false , cover: "/portfolio/scribbles.png"},
  { slug: "kere-pedals",       name: "Kere Pedals",       category: "Branding",           canvaUrl: "https://www.canva.com/d/QyGODGlg6dG5SDF", bg: "linear-gradient(145deg,#20103A 0%,#100F18 70%)", accent: "#7050C0", light: false , cover: "/portfolio/kere-pedals.png"},
  { slug: "hyderabadi-dhaba",  name: "Hyderabadi Dhaba",  category: "Food & Beverage",     canvaUrl: "https://www.canva.com/d/MI7BarHBxPEkBaS", bg: "linear-gradient(145deg,#3A2010 0%,#180E08 70%)", accent: "#C07030", light: false , cover: "/portfolio/hyderabadi-dhaba.png"},
  { slug: "travel-now",        name: "Travel Now",        category: "Wellness & Lifestyle",canvaUrl: "https://www.canva.com/d/c_eEfVej9so5gqu", bg: "linear-gradient(145deg,#10283A 0%,#081018 70%)", accent: "#3080B0", light: false , cover: "/portfolio/travel-now.png"},
  { slug: "gurukripa",         name: "Gurukripa",         category: "Food & Beverage",     canvaUrl: "https://www.canva.com/d/dhxLE02h2RJJRJE", bg: "linear-gradient(145deg,#3A2015 0%,#180F0A 70%)", accent: "#C08050", light: false , cover: "/portfolio/gurukripa.png"},
  { slug: "lyfsense",          name: "Lyfsense",          category: "Health",              canvaUrl: "https://www.canva.com/d/GqmEIxZ6C6ned0v", bg: "linear-gradient(145deg,#1E3828 0%,#0F1814 70%)", accent: "#50B080", light: false , cover: "/portfolio/lyfsense.png"},
  { slug: "chocolate-dairies", name: "Chocolate Dairies", category: "Food & Beverage",     canvaUrl: "https://www.canva.com/d/pbq3mWpSOb8pdlK", bg: "linear-gradient(145deg,#3A1810 0%,#180C08 70%)", accent: "#A05030", light: false , cover: "/portfolio/chocolate-dairies.png"},
  { slug: "pranik",            name: "Pranik",            category: "Health",              canvaUrl: "https://www.canva.com/d/9-FsZ9v_Njndj88", bg: "linear-gradient(145deg,#204020 0%,#0F1A10 70%)", accent: "#60A060", light: false , cover: "/portfolio/pranik.png"},
  { slug: "armario",           name: "Armario",           category: "Branding",           canvaUrl: "https://www.canva.com/d/ZO04RqVk5EkiRCs", bg: "linear-gradient(145deg,#40201A 0%,#18100F 70%)", accent: "#B06050", light: false , cover: "/portfolio/armario.png"},
  { slug: "espoir-cube",       name: "Espoir Cube",       category: "Branding",           canvaUrl: "https://www.canva.com/d/psdC61XxI9NI2Zu", bg: "linear-gradient(145deg,#2A2040 0%,#100F18 70%)", accent: "#8070B0", light: false , cover: "/portfolio/espoir-cube.png"},
  { slug: "dip-n-melt",        name: "Dip n Melt",        category: "Food & Beverage",     canvaUrl: "https://www.canva.com/d/GvzfZGfDu3pj4ln", bg: "linear-gradient(145deg,#3A280A 0%,#181008 70%)", accent: "#B09040", light: false , cover: "/portfolio/dip-n-melt.png"},
  { slug: "alive",             name: "Alive",             category: "Wellness & Lifestyle",canvaUrl: "https://www.canva.com/d/YX8nZA1NEv7FyP6", bg: "linear-gradient(145deg,#10381A 0%,#0A1810 70%)", accent: "#40B060", light: false , cover: "/portfolio/alive.png"},
  { slug: "sorbete",           name: "Sorbete",           category: "Food & Beverage",     canvaUrl: "https://www.canva.com/d/h0dM5G2nJ8Txp5m", bg: "linear-gradient(145deg,#402015 0%,#180D08 70%)", accent: "#C06040", light: false , cover: "/portfolio/sorbete.jpg"},
  { slug: "eqmed",             name: "EQMed",             category: "Health",              canvaUrl: "https://www.canva.com/d/yUQQzCWSNc8-yO8", bg: "linear-gradient(145deg,#10243A 0%,#081018 70%)", accent: "#4070A0", light: false , cover: "/portfolio/eqmed.png"},
  { slug: "hayatibb",          name: "Hayatibb",          category: "Health",              canvaUrl: "https://www.canva.com/d/Zj2mWu5_8FKn9iM", bg: "linear-gradient(145deg,#2A2A10 0%,#10100A 70%)", accent: "#A0A040", light: false , cover: "/portfolio/hayatibb.png"},
  { slug: "tmed",              name: "Tmed",              category: "Tech & Finance",      canvaUrl: "https://www.canva.com/d/zRQbUcH4o-74Giq", bg: "linear-gradient(145deg,#1E2840 0%,#0F1418 70%)", accent: "#4860A0", light: false , cover: "/portfolio/tmed.png"},
];

const DESCRIPTIONS: Record<string, string> = {
  "fyture": "A bold identity system built for a brand stepping confidently into tomorrow — clean type, sharp contrast, and a mark designed to scale across digital and print.",
  "mezze": "Warm, appetite-driven branding for a Mediterranean food concept — earthy tones and inviting typography that bring the menu to life before the first bite.",
  "vs": "A refined, minimal brand identity balancing structure and personality — versatile across packaging, signage, and digital touchpoints.",
  "tecfides": "A confident tech & finance identity — precise grids, a trustworthy palette, and a mark built to feel secure and modern.",
  "natura": "An organic, nature-forward identity for a wellness brand — soft greens, natural textures, and a calm, grounded visual language.",
  "hearing-ear-care": "A clear, approachable healthcare identity — friendly typography and a calming palette designed to put patients at ease.",
  "asbc": "A structured, professional identity for a finance-led brand — disciplined grids and a confident colour story.",
  "scribbles": "A playful, hand-drawn brand world — loose marker textures and energetic typography for a creative, expressive identity.",
  "kere-pedals": "A vibrant identity for a cycling brand — dynamic colour and movement-led graphics that capture momentum.",
  "hyderabadi-dhaba": "A rich, flavour-forward identity for a regional restaurant — warm spice tones and bold signage-ready typography.",
  "travel-now": "A fresh, adventure-driven travel brand identity — open skies, clean iconography, and a sense of movement.",
  "gurukripa": "A heritage-rooted food brand identity — warm, traditional tones paired with modern packaging structure.",
  "lyfsense": "A clean, modern health-tech identity — calming greens and clear typography built for trust at a glance.",
  "chocolate-dairies": "An indulgent, premium identity for a chocolate & dairy brand — rich tones and elegant packaging-led design.",
  "pranik": "A grounded, natural healthcare identity — soft greens and approachable typography for everyday wellness.",
  "armario": "A warm, tactile identity for a lifestyle/furniture brand — earthy palette and considered, editorial layouts.",
  "espoir-cube": "A bold, structured identity built around geometry and contrast — confident branding for a forward-thinking studio.",
  "dip-n-melt": "A playful, indulgent identity for a dessert brand — golden tones and a fun, craveable visual language.",
  "alive": "An energetic wellness identity — vibrant greens and motion-led graphics that feel fresh and active.",
  "sorbete": "A bright, refreshing identity for a frozen treats brand — punchy colour and a cooling, summery feel.",
  "eqmed": "A precise, clinical identity for a healthcare brand — cool tones and clean typography that signal expertise.",
  "hayatibb": "A warm, trustworthy healthcare identity — approachable colour and clear, friendly typography.",
  "tmed": "A sharp, modern tech & finance identity — structured layouts and a confident, professional palette.",
};

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
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [media, setMedia] = useState<PortfolioMediaManifest>({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    setIsAdmin(new URLSearchParams(window.location.search).get("admin") === "1");
    fetch("/api/portfolio/media")
      .then((r) => r.json())
      .then((data) => setMedia(data?.media ?? {}))
      .catch(() => {});
  }, []);

  async function handleUpload(slug: string, file: File) {
    setUploadError(null);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("slug", slug);
    try {
      const res = await fetch("/api/portfolio/upload", { method: "POST", body: formData });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setUploadError(body?.error || `Upload failed (${res.status})`);
        return;
      }
      const data = await res.json();
      setMedia((prev) => ({ ...prev, [slug]: { url: data.url, type: data.type } }));
    } catch {
      setUploadError("Upload failed — network error");
    }
  }


  const filtered =
    selected === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === selected);

  return (
    <>
      <Navbar />

      {/* Upload error toast */}
      <AnimatePresence>
        {uploadError && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease }}
            style={{
              position: "fixed",
              top: 20,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 9998,
              background: "#c0392b",
              color: "#fff",
              fontFamily: "var(--sans)",
              fontSize: 13,
              fontWeight: 600,
              padding: "10px 18px",
              borderRadius: 8,
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            {uploadError}
            <button
              onClick={() => setUploadError(null)}
              style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 14, lineHeight: 1, padding: 0 }}
              aria-label="Dismiss"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
                fontFamily: "var(--sans)",
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
                      fontFamily: "var(--sans)",
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
                      fontFamily: "var(--sans)",
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
            {isAdmin && (
              <div
                style={{
                  background: "var(--bone)",
                  border: "1px solid var(--line)",
                  borderRadius: 12,
                  padding: "14px 20px",
                  marginBottom: 32,
                }}
              >
                <p style={{ fontFamily: "var(--sans)", fontSize: 14, color: "var(--fg2)", margin: 0 }}>
                  Admin mode — hover a project card below to upload its image or video (from Canva export, etc).
                </p>
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
                {filtered.map((project, i) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    index={i}
                    media={media[project.slug]}
                    isAdmin={isAdmin}
                    onUpload={(file) => handleUpload(project.slug, file)}
                    onOpen={() => setOpenSlug(project.slug)}
                  />
                ))}
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
              fontFamily: "var(--sans)",
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
                  fontFamily: "var(--sans)",
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

      {/* ── Project detail modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {openSlug && (() => {
          const project = PROJECTS.find((p) => p.slug === openSlug);
          if (!project) return null;
          return (
            <motion.div
              key="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpenSlug(null)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 9990,
                background: "rgba(10,6,5,0.78)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 24,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.97 }}
                transition={{ duration: 0.3, ease }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  overflow: "hidden",
                  maxWidth: 760,
                  width: "100%",
                  maxHeight: "88vh",
                  overflowY: "auto",
                }}
              >
                <div style={{ aspectRatio: "16/10", position: "relative", background: project.bg }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={(media[project.slug]?.url) || project.cover}
                    alt={project.name}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "28px 32px 36px" }}>
                  <div
                    style={{
                      fontFamily: "var(--sans)", fontSize: 11, fontWeight: 600,
                      textTransform: "uppercase", letterSpacing: "0.14em",
                      color: "var(--fg3)", marginBottom: 10,
                    }}
                  >
                    {project.category}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--sans)", fontWeight: 700,
                      fontSize: "clamp(28px, 4vw, 40px)", color: "var(--fg1)",
                      margin: "0 0 16px", letterSpacing: "-0.015em",
                    }}
                  >
                    {project.name}
                  </h3>
                  <p style={{ fontFamily: "var(--sans)", fontSize: 15, lineHeight: 1.7, color: "var(--fg2)", margin: 0 }}>
                    {DESCRIPTIONS[project.slug] || "A bespoke brand identity crafted by the Kissa team."}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      <Footer />
    </>
  );
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  media,
  isAdmin,
  onUpload,
  onOpen,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  media?: PortfolioMediaEntry;
  isAdmin?: boolean;
  onUpload?: (file: File) => void;
  onOpen?: () => void;
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
        {/* Uploaded thumbnail/video when available */}
        {media && media.type === "video" && (
          <video
            src={media.url}
            autoPlay
            muted
            loop
            playsInline
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
        {media && media.type === "image" && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={media.url}
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
        {!media && project.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.cover}
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
        {isAdmin && (
          <label
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 5,
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: 100,
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              fontFamily: "var(--sans)",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.2s ease-out",
            }}
          >
            <Upload size={12} /> Upload
            <input
              type="file"
              accept="image/*,video/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && onUpload) onUpload(file);
              }}
            />
          </label>
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
            fontFamily: "var(--sans)",
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
              fontFamily: "var(--sans)",
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
            onClick={() => onOpen?.()}
            style={{
              fontFamily: "var(--sans)",
              fontSize: "clamp(20px, 3vw, 26px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {project.name}
            <ArrowUpRight size={18} style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.2s" }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
