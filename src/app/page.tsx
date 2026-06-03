"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingCalculator from "@/components/PricingCalculator";

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects = [
  { name: "ORÍTHYA",        category: "Branding + Film",            year: "2025", bg: "linear-gradient(150deg,#AD1335,#16100F)" },
  { name: "Lantern Year",   category: "Immersive + Installation",   year: "2025", bg: "linear-gradient(150deg,#2E5563,#16100F)" },
  { name: "Maison Verre",   category: "Visual Identity + Motion",   year: "2024", bg: "linear-gradient(150deg,#B97D1E,#16100F)" },
  { name: "The Long Night", category: "Film + Direction",           year: "2024", bg: "linear-gradient(150deg,#1E3D47,#16100F)" },
  { name: "Sundra",         category: "Brand + Web",                year: "2025", bg: "linear-gradient(150deg,#7A0E26,#16100F)" },
  { name: "Echo Bloom",     category: "Social + Content",           year: "2026", bg: "linear-gradient(150deg,#355a5f,#16100F)" },
];

const testimonials = [
  {
    quote:    "They didn't just make us a video. They found the story we'd been trying to tell for years.",
    name:     "Luiza Becker",
    role:     "Brand Director",
    company:  "Maison Verre",
    initials: "LB",
    avatarBg: "#AD1335",
    borderColor: "var(--crimson)",
  },
  {
    quote:    "the Kissa turns complex ideas into something you feel before you understand it. Our launch film hit 4 million views in a week.",
    name:     "Mateo Ruiz",
    role:     "Founder",
    company:  "Sundra",
    initials: "MR",
    avatarBg: "#2E5563",
    borderColor: "var(--crimson-bright)",
  },
  {
    quote:    "An 11 out of 10. They built the whole world around our brand.",
    name:     "Amie Schneider",
    role:     "Founder",
    company:  "Lantern Year",
    initials: "AS",
    avatarBg: "#2A3F5F",
    borderColor: "var(--accent-cool)",
  },
  {
    quote:    "Professional, fearless, and genuinely fun. They anticipate what the story needs before you can ask.",
    name:     "Carey Martell",
    role:     "Founder",
    company:  "Echo Bloom",
    initials: "CM",
    avatarBg: "#355a5f",
    borderColor: "var(--crimson)",
  },
];

const stats = [
  { value: "0.5s",  desc: "The time you have to stop a scroll. We make every frame count." },
  { value: "200M+", desc: "Views earned for the brands we've told stories for." },
  { value: "55%",   desc: "Of first impressions are purely visual. So we make it matter." },
  { value: "1",     desc: "Story per brand, told right. That's the whole job." },
];

const services = [
  {
    num:  "01",
    title: "Story & Brand",
    lead:  "Strategy that sounds like you.",
    body:  "We dig into who you are and why it matters, then build the language and visuals to say it clearly. Every touchpoint becomes part of a coherent, compelling narrative.",
    tags:  ["Brand strategy", "Visual identity", "Branded content", "Campaigns", "Social"],
  },
  {
    num:  "02",
    title: "Motion & Film",
    lead:  "Frames that move people.",
    body:  "From concept to cut, we make films that earn attention rather than demand it. Craft-led production, purposeful direction, and post that never forgets the story.",
    tags:  ["Video production", "Film & direction", "Animation", "Motion design", "Post"],
  },
  {
    num:  "03",
    title: "Digital & Immersive",
    lead:  "Experiences you step inside.",
    body:  "Beyond the screen, into the room. We design environments, installations, and interactive worlds that blur the boundary between audience and story.",
    tags:  ["Immersive", "Installations", "Web", "AR/social", "Creative direction"],
  },
];

const MARQUEE_TEXT =
  "BRANDED CONTENT · VIDEO PRODUCTION · BRAND STRATEGY · SOCIAL CAMPAIGNS · PHOTOGRAPHY · ANIMATION · IMMERSIVE EXPERIENCES · ";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fadeUp = {
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging]   = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });

  function onMouseDown(e: React.MouseEvent) {
    if (!carouselRef.current) return;
    setDragging(true);
    setDragStart({ x: e.pageX, scrollLeft: carouselRef.current.scrollLeft });
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!dragging || !carouselRef.current) return;
    carouselRef.current.scrollLeft = dragStart.scrollLeft - (e.pageX - dragStart.x);
  }
  function onMouseUp() { setDragging(false); }

  return (
    <>
      <Navbar />
      <main style={{ overflowX: "hidden" }}>

        {/* ══ 1. HERO ═══════════════════════════════════════════════════════════ */}
        <section
          style={{
            background: `
              radial-gradient(ellipse 60% 60% at 90% 10%, rgba(173,19,53,0.18) 0%, transparent 70%),
              radial-gradient(ellipse 50% 50% at 10% 90%, rgba(173,19,53,0.12) 0%, transparent 65%),
              var(--ink)
            `,
            paddingTop:    160,
            paddingBottom: 80,
          }}
        >
          <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>

            {/* Eyebrow */}
            <motion.p
              className="k-eyebrow on-ink"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="pa" aria-hidden>▶</span>
              {" "}Media art agency
            </motion.p>

            {/* H1 */}
            <motion.h1
              className="k-display"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              style={{
                color:      "var(--fg-on-ink)",
                fontSize:   "clamp(52px, 8vw, 96px)",
                lineHeight: 1.05,
                marginTop:  20,
                marginBottom: 0,
              }}
            >
              We make stories
              <br />
              impossible to
              <br />
              <em style={{ fontStyle: "italic", color: "var(--crimson)" }}>look away</em>{" "}
              from.
            </motion.h1>

            {/* Sub */}
            <motion.p
              className="k-body-l"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26 }}
              style={{
                color:     "var(--fg-on-ink-2)",
                maxWidth:  "52ch",
                marginTop: 28,
              }}
            >
              the Kissa is your creative partner for branded content, film, and immersive
              experiences. The name kissa means story — every project is one we make
              unforgettable.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 40 }}
            >
              <a href="#pricing" className="btn btn-primary">Start your kissa →</a>
              <a href="#work"    className="btn btn-ghost on-ink">See the work</a>
            </motion.div>

            {/* Video reel */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                marginTop:    64,
                maxWidth:     900,
                width:        "100%",
                aspectRatio:  "16/9",
                borderRadius: 20,
                background:   "linear-gradient(160deg, #1E3D47 0%, var(--ink) 100%)",
                display:      "flex",
                flexDirection: "column",
                alignItems:   "center",
                justifyContent: "center",
                cursor:       "pointer",
              }}
            >
              <PlayCircle size={64} style={{ color: "rgba(244,239,233,0.6)" }} strokeWidth={1.2} />
              <p
                className="k-credit"
                style={{ color: "var(--fg-on-ink-2)", marginTop: 20, letterSpacing: "0.12em" }}
              >
                SHOWREEL · 2026 — 01:06 SELECTED WORK
              </p>
            </motion.div>

          </div>
        </section>

        {/* ══ 2. MARQUEE ════════════════════════════════════════════════════════ */}
        <section style={{ background: "var(--bone)", padding: "28px 0", overflow: "hidden" }}>
          <div className="marquee-track">
            <div
              style={{
                fontFamily:     "var(--sans)",
                fontSize:       13,
                letterSpacing:  "0.2em",
                textTransform:  "uppercase",
                fontWeight:     600,
                color:          "var(--crimson)",
                whiteSpace:     "nowrap",
              }}
            >
              {MARQUEE_TEXT}{MARQUEE_TEXT}
            </div>
          </div>
        </section>

        {/* ══ 3. STATEMENT ══════════════════════════════════════════════════════ */}
        <section style={{ background: "var(--paper)", padding: "96px 0" }}>
          <div className="wrap" style={{ maxWidth: 820, margin: "0 auto" }}>
            <motion.p className="k-eyebrow" {...fadeUp}>What we believe</motion.p>
            <motion.h2
              className="k-h2"
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: "var(--serif-display)", marginTop: 16 }}
            >
              We don&apos;t make content. We make{" "}
              <span className="italic-crimson">kissa.</span>
            </motion.h2>
            <motion.p
              className="k-body-l"
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ color: "var(--fg2)", marginTop: 24, maxWidth: "64ch" }}
            >
              A campaign isn&apos;t a deliverable. It&apos;s a story told well enough that
              people can&apos;t scroll past. We craft it in frames, in light, in the cut
              between two shots.
            </motion.p>
          </div>
        </section>

        {/* ══ 4. SERVICES ═══════════════════════════════════════════════════════ */}
        <section style={{ background: "var(--paper)", padding: "0 0 96px" }}>
          <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>

            {/* 2-col header */}
            <div
              style={{
                display:             "grid",
                gridTemplateColumns: "1fr 1fr",
                gap:                 40,
                alignItems:          "end",
                marginBottom:        64,
              }}
            >
              <motion.h2
                className="k-h2"
                {...fadeUp}
                style={{ fontFamily: "var(--serif-display)" }}
              >
                What we do
              </motion.h2>
              <motion.p
                className="k-body"
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ color: "var(--fg2)" }}
              >
                Three disciplines, one commitment: every project is a story worth telling —
                and we make sure it lands.
              </motion.p>
            </div>

            {/* Service pillars */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}>
              {services.map((s, i) => (
                <motion.div
                  key={s.num}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  style={{ borderTop: "1px solid var(--line)" }}
                >
                  <p
                    className="k-credit"
                    style={{
                      color:        "var(--fg3)",
                      marginTop:    24,
                      marginBottom: 8,
                      fontFamily:   "var(--mono)",
                    }}
                  >
                    {s.num}
                  </p>
                  <h3 className="k-h3" style={{ marginBottom: 8 }}>{s.title}</h3>
                  <p
                    className="italic-crimson"
                    style={{ fontSize: 15, marginBottom: 12 }}
                  >
                    {s.lead}
                  </p>
                  <p
                    className="k-body"
                    style={{ color: "var(--fg2)", marginBottom: 20 }}
                  >
                    {s.body}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {s.tags.map(tag => (
                      <span
                        key={tag}
                        style={{
                          background:   "var(--accent-soft)",
                          color:        "var(--fg3)",
                          borderRadius: 20,
                          fontSize:     15,
                          padding:      "4px 12px",
                          fontFamily:   "var(--sans)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 5. SELECTED WORK ══════════════════════════════════════════════════ */}
        <section id="work" style={{ background: "var(--ink)", padding: "96px 0" }}>
          <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div
              style={{
                display:        "flex",
                justifyContent: "space-between",
                alignItems:     "flex-end",
                marginBottom:   48,
              }}
            >
              <div>
                <motion.p className="k-eyebrow on-ink" {...fadeUp}>Selected work</motion.p>
                <motion.h2
                  className="k-h2"
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    color:      "var(--fg-on-ink)",
                    fontFamily: "var(--serif-display)",
                    marginTop:  8,
                  }}
                >
                  Stories we&apos;ve told
                </motion.h2>
              </div>
              <p
                style={{
                  fontFamily:    "var(--mono)",
                  fontSize:      12,
                  letterSpacing: "0.08em",
                  color:         "var(--fg-on-ink-2)",
                  userSelect:    "none",
                }}
              >
                DRAG →
              </p>
            </div>
          </div>

          {/* Draggable carousel */}
          <div
            ref={carouselRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            style={{
              display:      "flex",
              gap:          20,
              overflowX:    "auto",
              paddingLeft:  "max(24px, calc((100vw - 1100px) / 2))",
              paddingRight: 24,
              paddingBottom: 8,
              cursor:       dragging ? "grabbing" : "grab",
              scrollbarWidth: "none",
            }}
          >
            {projects.map((p) => (
              <div key={p.name} style={{ flex: "0 0 340px" }}>
                <div
                  style={{
                    width:        340,
                    aspectRatio:  "340/440",
                    borderRadius: 16,
                    overflow:     "hidden",
                    position:     "relative",
                    background:   p.bg,
                  }}
                >
                  {/* Hover overlay */}
                  <div
                    style={{
                      position:       "absolute",
                      inset:          0,
                      background:     "rgba(22,16,15,0.72)",
                      display:        "flex",
                      flexDirection:  "column",
                      justifyContent: "flex-end",
                      padding:        28,
                      opacity:        0,
                      transition:     "opacity 0.3s ease",
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "0")}
                  >
                    <p
                      style={{
                        fontFamily:   "var(--serif-display)",
                        fontSize:     24,
                        color:        "var(--fg-on-ink)",
                        marginBottom: 12,
                      }}
                    >
                      {p.name}
                    </p>
                    <span
                      style={{
                        background:   "rgba(173,19,53,0.3)",
                        color:        "var(--fg-on-ink)",
                        borderRadius: 20,
                        fontSize:     13,
                        padding:      "4px 12px",
                        width:        "fit-content",
                        fontFamily:   "var(--sans)",
                      }}
                    >
                      {p.category}
                    </span>
                  </div>
                </div>
                <p
                  style={{
                    color:      "var(--fg-on-ink)",
                    fontFamily: "var(--sans)",
                    fontWeight: 700,
                    marginTop:  14,
                    fontSize:   15,
                  }}
                >
                  {p.name}
                </p>
                <p
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize:   12,
                    color:      "var(--fg-on-ink-2)",
                    marginTop:  4,
                  }}
                >
                  {p.year}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ 6. TESTIMONIALS ═══════════════════════════════════════════════════ */}
        <section style={{ background: "var(--paper)", padding: "96px 0" }}>
          <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>
            <motion.p className="k-eyebrow" {...fadeUp}>Client stories</motion.p>
            <motion.h2
              className="k-h2"
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: "var(--serif-display)", marginTop: 12, marginBottom: 48 }}
            >
              What our storytellers say.
            </motion.h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}>
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background:   "#ffffff",
                    borderRadius: 16,
                    padding:      32,
                    borderLeft:   `4px solid ${t.borderColor}`,
                    boxShadow:    "var(--sh-1)",
                  }}
                >
                  <p
                    style={{
                      fontFamily:   "var(--serif-display)",
                      fontStyle:    "italic",
                      fontSize:     17,
                      color:        "var(--fg1)",
                      lineHeight:   1.55,
                      marginBottom: 24,
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width:          38,
                        height:         38,
                        borderRadius:   "50%",
                        background:     t.avatarBg,
                        display:        "flex",
                        alignItems:     "center",
                        justifyContent: "center",
                        color:          "#fff",
                        fontFamily:     "var(--sans)",
                        fontWeight:     700,
                        fontSize:       13,
                        flexShrink:     0,
                      }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: 14, color: "var(--fg1)" }}>
                        {t.name}
                      </p>
                      <p
                        style={{
                          fontFamily:    "var(--mono)",
                          fontSize:      11,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color:         "var(--fg3)",
                        }}
                      >
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 7. STATS ══════════════════════════════════════════════════════════ */}
        <section style={{ background: "var(--ink)", padding: "96px 0" }}>
          <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>
            <motion.h2
              className="k-h2"
              {...fadeUp}
              style={{
                fontFamily:   "var(--serif-display)",
                color:        "var(--fg-on-ink)",
                maxWidth:     "18ch",
                marginBottom: 64,
              }}
            >
              Story is the strategy. The numbers just agree.
            </motion.h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }}>
              {stats.map((s, i) => (
                <motion.div
                  key={s.value}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 28 }}
                >
                  <p
                    style={{
                      fontFamily:   "var(--serif-display)",
                      fontSize:     "clamp(32px, 4vw, 56px)",
                      color:        "var(--fg-on-ink)",
                      fontWeight:   700,
                      marginBottom: 14,
                      lineHeight:   1,
                    }}
                  >
                    {s.value}
                  </p>
                  <p style={{ color: "var(--fg-on-ink-2)", fontSize: 14, lineHeight: 1.55 }}>
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 8. PRICING CALCULATOR ═════════════════════════════════════════════ */}
        <section id="pricing" style={{ background: "var(--bone)", padding: "96px 0" }}>
          <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>
            <motion.p className="k-eyebrow" {...fadeUp}>Transparent pricing</motion.p>
            <motion.h2
              className="k-h2"
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: "var(--serif-display)", marginTop: 12, marginBottom: 48 }}
            >
              Estimate your project.
            </motion.h2>
            <PricingCalculator />
          </div>
        </section>

        {/* ══ 9. CTA BANNER ═════════════════════════════════════════════════════ */}
        <section
          style={{
            background: `
              radial-gradient(ellipse 55% 55% at 80% 20%, rgba(173,19,53,0.16) 0%, transparent 70%),
              var(--ink)
            `,
            padding: "96px 0",
          }}
        >
          <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>
            <motion.p className="k-eyebrow on-ink" {...fadeUp}>
              Let&apos;s make something unforgettable
            </motion.p>
            <motion.h2
              className="k-h2"
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "var(--serif-display)",
                color:      "var(--fg-on-ink)",
                fontSize:   "clamp(36px, 5vw, 72px)",
                maxWidth:   "18ch",
                marginTop:  16,
                marginBottom: 40,
                lineHeight: 1.1,
              }}
            >
              Tell us your{" "}
              <em style={{ fontStyle: "italic", color: "var(--crimson)" }}>story.</em>
              {" "}We&apos;ll make sure nobody looks away.
            </motion.h2>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}
            >
              <a href="#pricing" className="btn btn-primary">Start your kissa →</a>
              <a
                href="mailto:hello@thekissa.co"
                style={{ color: "var(--fg-on-ink-2)", fontFamily: "var(--sans)", fontSize: 15 }}
              >
                hello@thekissa.co
              </a>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
