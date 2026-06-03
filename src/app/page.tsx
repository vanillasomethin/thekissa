"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Data ─────────────────────────────────────────────────────────────────────

const MARQUEE_TEXT =
  "BRANDED CONTENT · VIDEO PRODUCTION · BRAND STRATEGY · SOCIAL CAMPAIGNS · PHOTOGRAPHY · ANIMATION · IMMERSIVE EXPERIENCES · ";

const services = [
  {
    num:   "01",
    title: "Story & Brand",
    lead:  "Strategy that sounds like you.",
    body:  "We dig into who you are and why it matters, then build the language and visuals to say it clearly. Every touchpoint becomes part of a coherent, compelling narrative.",
    tags:  ["Brand strategy", "Visual identity", "Branded content", "Campaigns", "Social"],
  },
  {
    num:   "02",
    title: "Motion & Film",
    lead:  "Frames that move people.",
    body:  "From concept to cut, we make films that earn attention rather than demand it. Craft-led production, purposeful direction, and post that never forgets the story.",
    tags:  ["Video production", "Film & direction", "Animation", "Motion design", "Post"],
  },
  {
    num:   "03",
    title: "Digital & Immersive",
    lead:  "Experiences you step inside.",
    body:  "Beyond the screen, into the room. We design environments, installations, and interactive worlds that blur the boundary between audience and story.",
    tags:  ["Immersive", "Installations", "Web", "AR/social", "Creative direction"],
  },
];

const projects: { name: string; category: string; year: string; bg: string }[] = [
  { name: "ORÍTHYA",        category: "Branding + Film",   year: "2025", bg: "linear-gradient(160deg,#AD1335 0%,#4A1520 50%,#16100F)" },
  { name: "Lantern Year",   category: "Immersive",         year: "2025", bg: "linear-gradient(160deg,#2E5563 0%,#1E3D47 50%,#16100F)" },
  { name: "Maison Verre",   category: "Visual Identity",   year: "2024", bg: "linear-gradient(160deg,#B97D1E 0%,#7A4F10 50%,#16100F)" },
  { name: "The Long Night", category: "Film + Direction",  year: "2024", bg: "linear-gradient(160deg,#1E3D47 0%,#162830 50%,#16100F)" },
  { name: "Sundra",         category: "Brand + Web",       year: "2025", bg: "linear-gradient(160deg,#7A0E26 0%,#4A0818 50%,#16100F)" },
  { name: "Echo Bloom",     category: "Social Content",    year: "2026", bg: "linear-gradient(160deg,#2A3F5F 0%,#1A2840 50%,#16100F)" },
];

const testimonials = [
  {
    quote:    "They didn't just make us a video. They found the story we'd been trying to tell for years.",
    name:     "Luiza Becker",
    role:     "Brand Director",
    company:  "MAISON VERRE",
    initials: "LB",
  },
  {
    quote:    "the Kissa turns complex ideas into something you feel before you understand it. Our launch film hit 4 million views in a week.",
    name:     "Mateo Ruiz",
    role:     "Founder",
    company:  "SUNDRA",
    initials: "MR",
  },
  {
    quote:    "An 11 out of 10. They built the whole world around our brand.",
    name:     "Amie Schneider",
    role:     "Founder",
    company:  "LANTERN YEAR",
    initials: "AS",
  },
  {
    quote:    "Professional, fearless, and genuinely fun. They anticipate what the story needs before you can ask.",
    name:     "Carey Martell",
    role:     "Founder",
    company:  "ECHO BLOOM",
    initials: "CM",
  },
];

const stats = [
  { value: "0.5s",  desc: "The time you have to stop a scroll. Every frame counts." },
  { value: "200M+", desc: "Views earned for the brands we've told stories for." },
  { value: "55%",   desc: "Of first impressions are purely visual. We make it matter." },
  { value: "1",     desc: "Story per brand, told right. That's the whole job." },
];

// ─── Animation variants ────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.55, ease },
};

const heroWordVariants = {
  initial:  { opacity: 0, y: 30 },
  animate:  { opacity: 1, y: 0 },
};

// ─── Hero word-by-word component ─────────────────────────────────────────────

function AnimatedWords({
  text,
  style,
  staggerStart = 0,
}: {
  text: string;
  style?: React.CSSProperties;
  staggerStart?: number;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={heroWordVariants}
          custom={i}
          style={{ display: "inline-block", marginRight: "0.25em", ...style }}
          transition={{ duration: 0.5, delay: staggerStart + i * 0.08, ease }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging]     = useState(false);
  const [dragStart, setDragStart]   = useState({ x: 0, scrollLeft: 0 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  function onPointerDown(e: React.PointerEvent) {
    if (!carouselRef.current) return;
    setDragging(true);
    setDragStart({ x: e.pageX, scrollLeft: carouselRef.current.scrollLeft });
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragging || !carouselRef.current) return;
    carouselRef.current.scrollLeft = dragStart.scrollLeft - (e.pageX - dragStart.x);
  }
  function onPointerUp() { setDragging(false); }

  return (
    <>
      <Navbar />
      <main style={{ overflowX: "hidden" }}>

        {/* ══ 1. HERO ═══════════════════════════════════════════════════════════ */}
        <section
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 92% 8%, rgba(173,19,53,0.12) 0%, transparent 65%),
              var(--ink)
            `,
            paddingTop:    120,
            paddingBottom: 80,
            minHeight:     "100vh",
            display:       "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>

            {/* Eyebrow */}
            <motion.p
              className="k-eyebrow on-ink"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              Media art agency — Nairobi
            </motion.p>

            {/* H1 — word-by-word stagger */}
            <motion.h1
              initial="initial"
              animate="animate"
              style={{
                fontFamily:    "var(--serif-display)",
                fontSize:      "clamp(64px, 10vw, 120px)",
                lineHeight:    0.95,
                color:         "var(--fg-on-ink)",
                fontWeight:    700,
                letterSpacing: "-0.02em",
                marginTop:     24,
                marginBottom:  0,
              }}
            >
              <span style={{ display: "block" }}>
                <AnimatedWords text="We make stories" staggerStart={0.2} />
              </span>
              <span style={{ display: "block" }}>
                <AnimatedWords text="impossible to" staggerStart={0.52} />
                {" "}
                <motion.em
                  variants={heroWordVariants}
                  style={{ fontStyle: "italic", color: "var(--crimson)", display: "inline-block" }}
                  transition={{ duration: 0.5, delay: 0.52 + 2 * 0.08, ease }}
                >
                  look away
                </motion.em>
                <motion.span
                  variants={heroWordVariants}
                  style={{ display: "inline-block", marginLeft: "0.15em" }}
                  transition={{ duration: 0.5, delay: 0.52 + 3 * 0.08, ease }}
                >
                  from.
                </motion.span>
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease }}
              style={{
                fontFamily: "var(--sans)",
                fontSize:   18,
                color:      "var(--fg-on-ink-2)",
                maxWidth:   "46ch",
                marginTop:  28,
                lineHeight: 1.6,
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
              transition={{ duration: 0.6, delay: 1.05, ease }}
              style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 40 }}
            >
              <a href="mailto:hello@thekissa.co" className="btn btn-primary">Start your kissa</a>
              <a href="#work" className="btn btn-ghost on-ink">See the work</a>
            </motion.div>

            {/* Showreel placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease }}
              style={{ marginTop: 64, maxWidth: 960, width: "100%" }}
            >
              <div
                style={{
                  width:           "100%",
                  aspectRatio:     "16/9",
                  borderRadius:    20,
                  background:      "linear-gradient(135deg, #1E2D35 0%, #16100F 100%)",
                  display:         "flex",
                  alignItems:      "center",
                  justifyContent:  "center",
                  cursor:          "pointer",
                  position:        "relative",
                  overflow:        "hidden",
                }}
              >
                <PlayCircle
                  size={64}
                  strokeWidth={1.2}
                  style={{ color: "rgba(244,239,233,0.5)" }}
                />
              </div>
              {/* Credit row below showreel */}
              <div
                style={{
                  display:        "flex",
                  justifyContent: "space-between",
                  marginTop:      12,
                  fontFamily:     "var(--mono)",
                  fontSize:       11,
                  letterSpacing:  "0.14em",
                  textTransform:  "uppercase",
                  color:          "var(--fg-on-ink-2)",
                }}
              >
                <span>SHOWREEL · 2026</span>
                <span>01:06 — DIR. the Kissa</span>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ══ 2. MARQUEE STRIP ══════════════════════════════════════════════════ */}
        <section
          style={{
            background: "#111109",
            padding:    "20px 0",
            overflow:   "hidden",
          }}
        >
          <div className="marquee-track">
            <div
              style={{
                fontFamily:    "var(--sans)",
                fontSize:      11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight:    600,
                color:         "rgba(244,239,233,0.4)",
                whiteSpace:    "nowrap",
              }}
            >
              {MARQUEE_TEXT}{MARQUEE_TEXT}
            </div>
          </div>
        </section>

        {/* ══ 3. STATEMENT ══════════════════════════════════════════════════════ */}
        <section style={{ background: "var(--paper)", padding: "120px 0" }}>
          <div className="wrap" style={{ maxWidth: 860, margin: "0 auto" }}>
            <motion.p className="k-eyebrow" {...fadeUp}>What we believe</motion.p>

            <motion.h2
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.1, ease }}
              style={{
                fontFamily:    "var(--serif-display)",
                fontSize:      "clamp(40px, 5.5vw, 72px)",
                fontWeight:    700,
                color:         "var(--ink)",
                lineHeight:    1.05,
                marginTop:     20,
                marginBottom:  0,
                letterSpacing: "-0.01em",
              }}
            >
              We don&apos;t make content.
            </motion.h2>
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.18, ease }}
              style={{
                fontFamily:  "var(--serif-display)",
                fontStyle:   "italic",
                fontSize:    "clamp(40px, 5.5vw, 72px)",
                fontWeight:  700,
                color:       "var(--crimson)",
                lineHeight:  1.05,
                letterSpacing: "-0.01em",
                marginBottom: 0,
              }}
            >
              We make kissa.
            </motion.p>

            <motion.p
              className="k-body-l"
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.28, ease }}
              style={{ color: "var(--fg2)", marginTop: 32, maxWidth: "64ch" }}
            >
              A campaign isn&apos;t a deliverable. It&apos;s a story told well enough that
              people can&apos;t scroll past — crafted in frames, light, and the cut between
              two shots. From startups to standouts, every brand has a kissa worth telling.
            </motion.p>
          </div>
        </section>

        {/* ══ 4. SERVICES ═══════════════════════════════════════════════════════ */}
        <section style={{ background: "var(--paper)", padding: "0 0 120px" }}>
          <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>

            {/* 2-col header */}
            <div
              style={{
                display:             "grid",
                gridTemplateColumns: "1fr 1fr",
                gap:                 40,
                alignItems:          "end",
                marginBottom:        72,
                borderTop:           "1px solid var(--line)",
                paddingTop:          64,
              }}
            >
              <motion.h2
                {...fadeUp}
                style={{
                  fontFamily:    "var(--serif-display)",
                  fontSize:      "clamp(36px, 4.5vw, 64px)",
                  fontWeight:    700,
                  color:         "var(--ink)",
                  letterSpacing: "-0.01em",
                  lineHeight:    1.05,
                  margin:        0,
                }}
              >
                Three ways we tell it.
              </motion.h2>
              <motion.p
                className="k-body"
                {...fadeUp}
                transition={{ duration: 0.55, delay: 0.1, ease }}
                style={{ color: "var(--fg2)", margin: 0 }}
              >
                One studio, end to end — from the first idea to the final frame.
              </motion.p>
            </div>

            {/* Service pillars */}
            <div
              style={{
                display:             "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap:                 32,
              }}
            >
              {services.map((s, i) => (
                <motion.div
                  key={s.num}
                  {...fadeUp}
                  transition={{ duration: 0.55, delay: i * 0.12, ease }}
                  style={{ borderTop: "1px solid var(--line)", paddingTop: 28 }}
                >
                  <p
                    style={{
                      fontFamily:    "var(--mono)",
                      fontSize:      12,
                      letterSpacing: "0.1em",
                      color:         "var(--fg3)",
                      marginBottom:  12,
                      textTransform: "uppercase",
                    }}
                  >
                    {s.num}
                  </p>
                  <h3
                    style={{
                      fontFamily:   "var(--sans)",
                      fontSize:     22,
                      fontWeight:   700,
                      color:        "var(--fg1)",
                      marginBottom: 10,
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontFamily:   "var(--serif-display)",
                      fontStyle:    "italic",
                      fontSize:     18,
                      color:        "var(--crimson)",
                      marginBottom: 14,
                      lineHeight:   1.4,
                    }}
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
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background:   "#E8E8E8",
                          color:        "var(--fg3)",
                          borderRadius: 20,
                          fontSize:     13,
                          padding:      "5px 12px",
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
        <section id="work" style={{ background: "var(--ink)", padding: "120px 0" }}>
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
                  {...fadeUp}
                  transition={{ duration: 0.55, delay: 0.1, ease }}
                  style={{
                    fontFamily:    "var(--serif-display)",
                    fontSize:      "clamp(36px, 5vw, 72px)",
                    fontWeight:    700,
                    color:         "var(--fg-on-ink)",
                    letterSpacing: "-0.01em",
                    lineHeight:    1.05,
                    marginTop:     10,
                    marginBottom:  0,
                  }}
                >
                  Our unforgettable kissas.
                </motion.h2>
              </div>
              <p
                style={{
                  fontFamily:    "var(--mono)",
                  fontSize:      12,
                  letterSpacing: "0.1em",
                  color:         "var(--fg-on-ink-2)",
                  userSelect:    "none",
                  paddingBottom: 4,
                }}
              >
                drag to explore →
              </p>
            </div>
          </div>

          {/* Draggable carousel */}
          <div
            ref={carouselRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            style={{
              display:           "flex",
              gap:               20,
              overflowX:         "auto",
              scrollSnapType:    "x mandatory",
              paddingLeft:       "max(24px, calc((100vw - 1100px) / 2))",
              paddingRight:      24,
              paddingBottom:     20,
              cursor:            dragging ? "grabbing" : "grab",
              scrollbarWidth:    "none",
            }}
          >
            {projects.map((p) => (
              <div
                key={p.name}
                style={{
                  flex:           "0 0 380px",
                  scrollSnapAlign: "start",
                  transition:     "transform 0.2s ease-out, box-shadow 0.2s ease-out",
                  transform:      hoveredCard === p.name ? "translateY(-6px)" : "translateY(0)",
                  boxShadow:      hoveredCard === p.name
                    ? "0 24px 48px rgba(0,0,0,0.6)"
                    : "0 8px 24px rgba(0,0,0,0.3)",
                  borderRadius:   20,
                  overflow:       "hidden",
                  aspectRatio:    "9/12",
                  position:       "relative",
                  background:     p.bg,
                  cursor:         dragging ? "grabbing" : "grab",
                }}
                onMouseEnter={() => setHoveredCard(p.name)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Bottom overlay */}
                <div
                  style={{
                    position:      "absolute",
                    inset:         0,
                    background:    `linear-gradient(to top, rgba(22,16,15,${hoveredCard === p.name ? 0.85 : 0.7}) 0%, transparent 55%)`,
                    transition:    "background 0.2s ease-out",
                  }}
                />
                {/* Card info */}
                <div
                  style={{
                    position: "absolute",
                    bottom:   0,
                    left:     0,
                    right:    0,
                    padding:  "28px 24px",
                  }}
                >
                  <p
                    style={{
                      fontFamily:   "var(--serif-display)",
                      fontSize:     26,
                      fontWeight:   700,
                      color:        "#fff",
                      marginBottom: 10,
                      lineHeight:   1.1,
                    }}
                  >
                    {p.name}
                  </p>
                  <span
                    style={{
                      background:    "rgba(255,255,255,0.12)",
                      color:         "rgba(244,239,233,0.85)",
                      borderRadius:  20,
                      fontSize:      12,
                      padding:       "4px 12px",
                      fontFamily:    "var(--sans)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {p.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ 6. TESTIMONIALS ═══════════════════════════════════════════════════ */}
        <section style={{ background: "#F4EFE9", padding: "120px 0" }}>
          <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>
            <motion.p className="k-eyebrow" {...fadeUp}>Clients</motion.p>
            <motion.h2
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.1, ease }}
              style={{
                fontFamily:    "var(--serif-display)",
                fontSize:      "clamp(36px, 5vw, 68px)",
                fontWeight:    700,
                color:         "var(--ink)",
                letterSpacing: "-0.01em",
                lineHeight:    1.05,
                marginTop:     12,
                marginBottom:  56,
              }}
            >
              What our storytellers say.
            </motion.h2>

            <div
              style={{
                display:             "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap:                 24,
              }}
            >
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  {...fadeUp}
                  transition={{ duration: 0.55, delay: i * 0.1, ease }}
                  style={{
                    background:   "#ffffff",
                    borderRadius: 20,
                    padding:      36,
                    borderLeft:   "4px solid var(--crimson)",
                    boxShadow:    "var(--sh-2)",
                  }}
                >
                  <p
                    style={{
                      fontFamily:   "var(--serif-display)",
                      fontStyle:    "italic",
                      fontSize:     18,
                      color:        "var(--fg1)",
                      lineHeight:   1.6,
                      marginBottom: 28,
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width:          40,
                        height:         40,
                        borderRadius:   "50%",
                        background:     "var(--crimson)",
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
                      <p
                        style={{
                          fontFamily: "var(--sans)",
                          fontWeight: 700,
                          fontSize:   14,
                          color:      "var(--fg1)",
                          margin:     0,
                        }}
                      >
                        {t.name}
                      </p>
                      <p
                        style={{
                          fontFamily:    "var(--mono)",
                          fontSize:      11,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color:         "var(--fg3)",
                          margin:        "2px 0 0",
                        }}
                      >
                        {t.role} · {t.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 7. STATS ══════════════════════════════════════════════════════════ */}
        <section style={{ background: "var(--ink)", padding: "120px 0" }}>
          <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>
            <motion.h2
              {...fadeUp}
              style={{
                fontFamily:    "var(--serif-display)",
                fontSize:      "clamp(40px, 5vw, 68px)",
                fontWeight:    700,
                color:         "var(--fg-on-ink)",
                letterSpacing: "-0.01em",
                lineHeight:    1.1,
                maxWidth:      "28ch",
                marginBottom:  80,
              }}
            >
              Story is the strategy.{" "}
              <em style={{ fontStyle: "italic", color: "var(--crimson)" }}>
                The numbers just agree.
              </em>
            </motion.h2>

            <div
              style={{
                display:             "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap:                 32,
              }}
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.value}
                  {...fadeUp}
                  transition={{ duration: 0.55, delay: i * 0.1, ease }}
                  style={{
                    borderTop:   "1px solid rgba(255,255,255,0.1)",
                    paddingTop:  32,
                  }}
                >
                  <p
                    style={{
                      fontFamily:   "var(--serif-display)",
                      fontSize:     "clamp(40px, 5vw, 64px)",
                      fontWeight:   700,
                      color:        "var(--fg-on-ink)",
                      lineHeight:   1,
                      marginBottom: 16,
                    }}
                  >
                    {s.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--sans)",
                      fontSize:   14,
                      color:      "var(--fg-on-ink-2)",
                      lineHeight: 1.55,
                    }}
                  >
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 8. CTA BANNER ═════════════════════════════════════════════════════ */}
        <section style={{ background: "var(--crimson)", padding: "120px 0" }}>
          <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>
            <motion.p
              className="k-eyebrow"
              {...fadeUp}
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              Let&apos;s make something unforgettable
            </motion.p>
            <motion.h2
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.1, ease }}
              style={{
                fontFamily:    "var(--serif-display)",
                fontSize:      "clamp(48px, 7vw, 84px)",
                fontWeight:    700,
                color:         "#ffffff",
                letterSpacing: "-0.02em",
                lineHeight:    1,
                marginTop:     20,
                marginBottom:  20,
              }}
            >
              Tell us your story.
            </motion.h2>
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.18, ease }}
              style={{
                fontFamily:  "var(--sans)",
                fontSize:    18,
                color:       "rgba(255,255,255,0.7)",
                marginBottom: 48,
              }}
            >
              We make sure nobody looks away.
            </motion.p>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.26, ease }}
              style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}
            >
              <a
                href="mailto:hello@thekissa.co"
                style={{
                  display:         "inline-flex",
                  alignItems:      "center",
                  padding:         "14px 28px",
                  background:      "var(--ink)",
                  color:           "#fff",
                  borderRadius:    8,
                  fontFamily:      "var(--sans)",
                  fontWeight:      600,
                  fontSize:        15,
                  textDecoration:  "none",
                  letterSpacing:   "0.01em",
                  transition:      "background 0.18s ease-out",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.background = "#2a0e18")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.background = "var(--ink)")
                }
              >
                Start your kissa →
              </a>
              <a
                href="mailto:hello@thekissa.co"
                style={{
                  fontFamily:     "var(--sans)",
                  fontSize:       15,
                  color:          "#fff",
                  textDecoration: "none",
                  borderBottom:   "1px solid transparent",
                  transition:     "border-color 0.18s ease-out",
                  paddingBottom:  2,
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.borderColor = "#fff")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.borderColor = "transparent")
                }
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
