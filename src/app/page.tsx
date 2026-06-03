"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { PlayCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Constants ────────────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const MARQUEE_TEXT =
  "BRANDED CONTENT · VIDEO PRODUCTION · BRAND STRATEGY · SOCIAL CAMPAIGNS · PHOTOGRAPHY · ANIMATION · IMMERSIVE EXPERIENCES · ";

const services = [
  {
    num: "01",
    title: "Story & Brand",
    lead: "Strategy that sounds like you.",
    body: "We dig into who you are and why it matters, then build the language and visuals to say it clearly. Every touchpoint becomes part of a coherent, compelling narrative.",
    tags: ["Brand strategy", "Visual identity", "Branded content", "Campaigns"],
  },
  {
    num: "02",
    title: "Motion & Film",
    lead: "Frames that move people.",
    body: "From concept to cut, we make films that earn attention rather than demand it. Craft-led production, purposeful direction, and post that never forgets the story.",
    tags: ["Video production", "Film & direction", "Animation", "Motion design"],
  },
  {
    num: "03",
    title: "Digital & Immersive",
    lead: "Experiences you step inside.",
    body: "Beyond the screen, into the room. We design environments, installations, and interactive worlds that blur the boundary between audience and story.",
    tags: ["Immersive", "Installations", "Web", "AR/social"],
  },
];

// Real Kissa projects (first 6 from the Canva portfolio)
const featuredProjects = [
  {
    name: "FYTURE",
    category: "Branding",
    href: "https://www.canva.com/d/TT5LBPgwQwxGJOZ",
    bg: "linear-gradient(160deg,#3A0F1E 0%,#1C0810 60%,#16100F)",
    accent: "#C4455E",
  },
  {
    name: "Tecfides",
    category: "Tech & Finance",
    href: "https://www.canva.com/d/uAp3r5ONIJyRW2t",
    bg: "linear-gradient(160deg,#1A2A3A 0%,#0F141A 60%,#16100F)",
    accent: "#4A7FA0",
  },
  {
    name: "Natura",
    category: "Wellness",
    href: "https://www.canva.com/d/5atF6nUAu2myTup",
    bg: "linear-gradient(160deg,#243010 0%,#101508 60%,#16100F)",
    accent: "#6A9A40",
  },
  {
    name: "Mezze",
    category: "Food & Beverage",
    href: "https://www.canva.com/d/4e8NxvP6rD4weV7",
    bg: "linear-gradient(160deg,#1E3A20 0%,#0F1A10 60%,#16100F)",
    accent: "#5A8A50",
  },
  {
    name: "Scribbles",
    category: "Branding",
    href: "https://www.canva.com/d/y4ZGuierNsuJMza",
    bg: "linear-gradient(160deg,#3A2010 0%,#18100F 60%,#16100F)",
    accent: "#B0703A",
  },
  {
    name: "Lyfsense",
    category: "Health",
    href: "https://www.canva.com/d/GqmEIxZ6C6ned0v",
    bg: "linear-gradient(160deg,#1E3828 0%,#0F1814 60%,#16100F)",
    accent: "#4A9A70",
  },
];

const testimonials = [
  {
    quote: "They didn't just make us a video. They found the story we'd been trying to tell for years.",
    name: "Wanjiku M.",
    role: "Brand Director",
    company: "TECFIDES",
    initials: "WM",
  },
  {
    quote: "the Kissa turns complex ideas into something you feel before you understand it. Our launch campaign exceeded every benchmark.",
    name: "Aditya R.",
    role: "Founder",
    company: "NATURA",
  },
  {
    quote: "11 out of 10. They built an entire world around our identity.",
    name: "Fatima A.",
    role: "Creative Director",
    company: "FYTURE",
  },
  {
    quote: "Professional, fearless, and genuinely fun. They anticipate what the story needs before you can ask.",
    name: "Samuel K.",
    role: "Founder",
    company: "LYFSENSE",
  },
];

const stats = [
  { value: 200, suffix: "M+", label: "Views earned across campaigns we've built." },
  { value: 55, suffix: "%", label: "Of first impressions are purely visual. We make it matter." },
  { value: 23, suffix: "+", label: "Brands retold — from startups to market leaders." },
  { value: 1, suffix: "", label: "Story per brand. Told right. That's the whole job." },
];

// ─── ClipReveal — text lines slide up from clip ───────────────────────────────

function ClipReveal({
  children,
  delay = 0,
  duration = 0.75,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ overflow: "hidden", ...style }}>
      <motion.div
        initial={{ y: "105%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration, ease, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── AnimCounter ──────────────────────────────────────────────────────────────

function AnimCounter({ value, suffix = "" }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTs: number | null = null;
    const duration = 1400;
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {displayed}
      {suffix}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Parallax for hero bg + showreel
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);
  const showreelY = useTransform(heroScroll, [0, 1], ["0%", "12%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

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
  function onPointerUp() {
    setDragging(false);
  }

  return (
    <>
      <Navbar />
      <main style={{ overflowX: "hidden" }}>

        {/* ══ 1. HERO ═══════════════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop: 120,
            paddingBottom: 80,
            overflow: "hidden",
          }}
        >
          {/* Parallax bg layer */}
          <motion.div
            style={{
              position: "absolute",
              inset: "-20%",
              background: `
                radial-gradient(ellipse 60% 50% at 90% 10%, rgba(173,19,53,0.14) 0%, transparent 60%),
                radial-gradient(ellipse 40% 40% at 10% 90%, rgba(173,19,53,0.04) 0%, transparent 60%),
                var(--ink)
              `,
              y: bgY,
            }}
          />

          <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.1 }}
            >
              <p className="k-eyebrow on-ink">Media art agency — Nairobi</p>
            </motion.div>

            {/* H1 — clip reveal line by line */}
            <h1
              style={{
                fontFamily: "var(--serif-display)",
                fontSize: "clamp(64px, 10vw, 118px)",
                lineHeight: 0.95,
                fontWeight: 700,
                letterSpacing: "-0.022em",
                marginTop: 22,
                marginBottom: 0,
                color: "var(--fg-on-ink)",
              }}
            >
              <ClipReveal delay={0.2}>
                <span>We make stories</span>
              </ClipReveal>
              <ClipReveal delay={0.35}>
                <span>
                  impossible{" "}
                  <em style={{ fontStyle: "italic", color: "var(--crimson)" }}>to</em>
                </span>
              </ClipReveal>
              <ClipReveal delay={0.5}>
                <em style={{ fontStyle: "italic", color: "var(--crimson)" }}>look away.</em>
              </ClipReveal>
            </h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.85, ease }}
              style={{
                fontFamily: "var(--sans)",
                fontSize: 18,
                color: "var(--fg-on-ink-2)",
                maxWidth: "46ch",
                marginTop: 32,
                lineHeight: 1.65,
              }}
            >
              the Kissa is a media art agency specialising in branded content, film, and
              immersive experiences. The name <em>kissa</em> means story — every project
              is one we make unforgettable.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0, ease }}
              style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 40 }}
            >
              <a href="mailto:hello@thekissa.co" className="btn btn-primary">
                Start your kissa
              </a>
              <a href="#work" className="btn btn-ghost on-ink">
                See the work
              </a>
            </motion.div>

            {/* Showreel — parallax offset */}
            <motion.div
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.15, ease }}
              style={{ marginTop: 72, maxWidth: 960, width: "100%", y: showreelY }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
                  borderRadius: 20,
                  background:
                    "linear-gradient(135deg, #1E2D35 0%, rgba(22,16,15,0.98) 60%, #16100F 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {/* Film-grain overlay via repeating gradient */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "repeat",
                    backgroundSize: "128px",
                    pointerEvents: "none",
                    opacity: 0.4,
                  }}
                />
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.3, ease }}
                >
                  <PlayCircle
                    size={68}
                    strokeWidth={1}
                    style={{ color: "rgba(244,239,233,0.4)" }}
                  />
                </motion.div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 14,
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--fg-on-ink-2)",
                }}
              >
                <span>SHOWREEL · 2026</span>
                <span>DIR. the Kissa</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ 2. MARQUEE STRIP ══════════════════════════════════════════════════ */}
        <section style={{ background: "#111109", padding: "18px 0", overflow: "hidden" }}>
          <div className="marquee-track">
            <div
              style={{
                fontFamily: "var(--sans)",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "rgba(244,239,233,0.35)",
                whiteSpace: "nowrap",
              }}
            >
              {MARQUEE_TEXT}{MARQUEE_TEXT}
            </div>
          </div>
        </section>

        {/* ══ 3. STATEMENT ══════════════════════════════════════════════════════ */}
        <section style={{ background: "var(--paper)", padding: "140px 0 120px" }}>
          <div className="wrap" style={{ maxWidth: 860, margin: "0 auto" }}>
            {/* Animated rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              style={{
                height: 1,
                background: "var(--ink)",
                transformOrigin: "left",
                marginBottom: 40,
              }}
            />

            <ClipReveal>
              <p className="k-eyebrow" style={{ marginBottom: 24 }}>What we believe</p>
            </ClipReveal>

            <ClipReveal delay={0.1}>
              <p
                style={{
                  fontFamily: "var(--serif-display)",
                  fontSize: "clamp(40px, 5.5vw, 72px)",
                  fontWeight: 700,
                  color: "var(--ink)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.012em",
                  margin: 0,
                }}
              >
                We don&apos;t make content.
              </p>
            </ClipReveal>
            <ClipReveal delay={0.2}>
              <p
                style={{
                  fontFamily: "var(--serif-display)",
                  fontStyle: "italic",
                  fontSize: "clamp(40px, 5.5vw, 72px)",
                  fontWeight: 700,
                  color: "var(--crimson)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.012em",
                  margin: 0,
                }}
              >
                We make kissa.
              </p>
            </ClipReveal>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35, ease }}
              className="k-body-l"
              style={{ color: "var(--fg2)", marginTop: 36, maxWidth: "62ch" }}
            >
              A campaign isn&apos;t a deliverable. It&apos;s a story told well enough that
              people can&apos;t scroll past — crafted in frames, light, and the cut between
              two shots. From startups to standouts, every brand has a kissa worth telling.
            </motion.p>
          </div>
        </section>

        {/* ══ 4. SERVICES ═══════════════════════════════════════════════════════ */}
        <section style={{ background: "var(--paper)", padding: "0 0 140px" }}>
          <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>
            {/* Section header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 48,
                alignItems: "end",
                borderTop: "1px solid var(--line)",
                paddingTop: 72,
                marginBottom: 80,
              }}
            >
              <div>
                <ClipReveal>
                  <h2
                    style={{
                      fontFamily: "var(--serif-display)",
                      fontSize: "clamp(36px, 4.5vw, 64px)",
                      fontWeight: 700,
                      color: "var(--ink)",
                      letterSpacing: "-0.012em",
                      lineHeight: 1.05,
                      margin: 0,
                    }}
                  >
                    Three ways
                  </h2>
                </ClipReveal>
                <ClipReveal delay={0.1}>
                  <h2
                    style={{
                      fontFamily: "var(--serif-display)",
                      fontSize: "clamp(36px, 4.5vw, 64px)",
                      fontWeight: 700,
                      color: "var(--ink)",
                      letterSpacing: "-0.012em",
                      lineHeight: 1.05,
                      margin: 0,
                    }}
                  >
                    we tell it.
                  </h2>
                </ClipReveal>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease }}
                className="k-body"
                style={{ color: "var(--fg2)", margin: 0 }}
              >
                One studio, end to end — from the first idea to the final frame. We don&apos;t
                hand off. We stay.
              </motion.p>
            </div>

            {/* Service pillars */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 32,
              }}
            >
              {services.map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease }}
                  style={{ borderTop: "1px solid var(--line)", paddingTop: 32 }}
                >
                  <p
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 12,
                      letterSpacing: "0.1em",
                      color: "var(--fg3)",
                      marginBottom: 16,
                      textTransform: "uppercase",
                    }}
                  >
                    {s.num}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--sans)",
                      fontSize: 22,
                      fontWeight: 700,
                      color: "var(--fg1)",
                      marginBottom: 10,
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--serif-display)",
                      fontStyle: "italic",
                      fontSize: 18,
                      color: "var(--crimson)",
                      marginBottom: 14,
                      lineHeight: 1.4,
                    }}
                  >
                    {s.lead}
                  </p>
                  <p className="k-body" style={{ color: "var(--fg2)", marginBottom: 24 }}>
                    {s.body}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: "var(--bone)",
                          color: "var(--fg3)",
                          border: "1px solid var(--line)",
                          borderRadius: 20,
                          fontSize: 12,
                          padding: "5px 12px",
                          fontFamily: "var(--sans)",
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
        <section id="work" style={{ background: "var(--ink)", padding: "120px 0 140px" }}>
          <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: 56,
              }}
            >
              <div>
                <ClipReveal>
                  <p className="k-eyebrow on-ink">Selected work</p>
                </ClipReveal>
                <ClipReveal delay={0.12}>
                  <h2
                    style={{
                      fontFamily: "var(--serif-display)",
                      fontSize: "clamp(36px, 5vw, 72px)",
                      fontWeight: 700,
                      color: "var(--fg-on-ink)",
                      letterSpacing: "-0.012em",
                      lineHeight: 1.05,
                      marginTop: 12,
                      marginBottom: 0,
                    }}
                  >
                    Our kissas.
                  </h2>
                </ClipReveal>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    color: "var(--fg-on-ink-2)",
                    userSelect: "none",
                  }}
                >
                  drag to explore →
                </span>
                <Link
                  href="/portfolio"
                  style={{
                    fontFamily: "var(--sans)",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--crimson)",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  View all work <ArrowUpRight size={14} />
                </Link>
              </div>
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
              display: "flex",
              gap: 18,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              paddingLeft: "max(24px, calc((100vw - 1100px) / 2))",
              paddingRight: 24,
              paddingBottom: 20,
              cursor: dragging ? "grabbing" : "grab",
              scrollbarWidth: "none",
            }}
          >
            {featuredProjects.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px -20%" }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.08, 0.3), ease }}
                style={{
                  flex: "0 0 360px",
                  scrollSnapAlign: "start",
                  borderRadius: 20,
                  overflow: "hidden",
                  aspectRatio: "9/12",
                  position: "relative",
                  background: p.bg,
                  cursor: dragging ? "grabbing" : "grab",
                  transition: "transform 0.25s ease-out, box-shadow 0.25s ease-out",
                  transform: hoveredCard === p.name ? "translateY(-8px)" : "translateY(0)",
                  boxShadow:
                    hoveredCard === p.name
                      ? "0 32px 64px rgba(0,0,0,0.65)"
                      : "0 8px 24px rgba(0,0,0,0.35)",
                }}
                onMouseEnter={() => setHoveredCard(p.name)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Texture overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      `radial-gradient(ellipse 80% 50% at 20% 20%, ${p.accent}22 0%, transparent 70%)`,
                    pointerEvents: "none",
                  }}
                />

                {/* Giant bg letter for character */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontFamily: "var(--serif-display)",
                    fontSize: "clamp(120px, 20vw, 200px)",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.04)",
                    lineHeight: 1,
                    letterSpacing: "-0.05em",
                    userSelect: "none",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                  }}
                >
                  {p.name[0]}
                </div>

                {/* Bottom overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(to top, rgba(22,16,15,${hoveredCard === p.name ? 0.9 : 0.75}) 0%, transparent 55%)`,
                    transition: "background 0.25s ease-out",
                  }}
                />

                {/* Card info */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "28px 24px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--serif-display)",
                      fontSize: 28,
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: 8,
                      lineHeight: 1.1,
                    }}
                  >
                    {p.name}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        color: "rgba(244,239,233,0.8)",
                        borderRadius: 20,
                        fontSize: 11,
                        padding: "4px 12px",
                        fontFamily: "var(--mono)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {p.category}
                    </span>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        color: hoveredCard === p.name ? "var(--crimson)" : "rgba(244,239,233,0.5)",
                        transition: "color 0.2s",
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none",
                      }}
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ 6. TESTIMONIALS ═══════════════════════════════════════════════════ */}
        <section style={{ background: "var(--bone)", padding: "140px 0" }}>
          <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>
            <ClipReveal>
              <p className="k-eyebrow" style={{ marginBottom: 20 }}>Clients</p>
            </ClipReveal>
            <ClipReveal delay={0.12}>
              <h2
                style={{
                  fontFamily: "var(--serif-display)",
                  fontSize: "clamp(36px, 5vw, 68px)",
                  fontWeight: 700,
                  color: "var(--ink)",
                  letterSpacing: "-0.012em",
                  lineHeight: 1.05,
                  marginTop: 0,
                  marginBottom: 72,
                }}
              >
                What our clients say.
              </h2>
            </ClipReveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 24,
              }}
            >
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease }}
                  style={{
                    background: "#ffffff",
                    borderRadius: 20,
                    padding: 40,
                    borderLeft: "3px solid var(--crimson)",
                    boxShadow: "0 2px 20px rgba(22,16,15,0.06)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--serif-display)",
                      fontStyle: "italic",
                      fontSize: 19,
                      color: "var(--fg1)",
                      lineHeight: 1.65,
                      marginBottom: 28,
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "var(--crimson)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontFamily: "var(--sans)",
                        fontWeight: 700,
                        fontSize: 13,
                        flexShrink: 0,
                      }}
                    >
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: 14, color: "var(--fg1)", margin: 0 }}>
                        {t.name}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: 11,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "var(--fg3)",
                          margin: "2px 0 0",
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
        <section style={{ background: "var(--ink)", padding: "140px 0" }}>
          <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ marginBottom: 80 }}>
              <ClipReveal>
                <h2
                  style={{
                    fontFamily: "var(--serif-display)",
                    fontSize: "clamp(40px, 5vw, 68px)",
                    fontWeight: 700,
                    color: "var(--fg-on-ink)",
                    letterSpacing: "-0.012em",
                    lineHeight: 1.1,
                    margin: 0,
                  }}
                >
                  Story is the strategy.
                </h2>
              </ClipReveal>
              <ClipReveal delay={0.12}>
                <h2
                  style={{
                    fontFamily: "var(--serif-display)",
                    fontStyle: "italic",
                    fontSize: "clamp(40px, 5vw, 68px)",
                    fontWeight: 700,
                    color: "var(--crimson)",
                    letterSpacing: "-0.012em",
                    lineHeight: 1.1,
                    margin: 0,
                  }}
                >
                  The numbers just agree.
                </h2>
              </ClipReveal>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 32,
              }}
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.value}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease }}
                  style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 32 }}
                >
                  <p
                    style={{
                      fontFamily: "var(--serif-display)",
                      fontSize: "clamp(40px, 5vw, 64px)",
                      fontWeight: 700,
                      color: "var(--fg-on-ink)",
                      lineHeight: 1,
                      marginBottom: 16,
                    }}
                  >
                    <AnimCounter value={s.value} suffix={s.suffix} />
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--sans)",
                      fontSize: 14,
                      color: "var(--fg-on-ink-2)",
                      lineHeight: 1.6,
                    }}
                  >
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 8. CTA BANNER ═════════════════════════════════════════════════════ */}
        <section
          style={{
            background: "var(--crimson)",
            padding: "140px 0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Big ghost letter bg */}
          <div
            style={{
              position: "absolute",
              right: "-5%",
              top: "50%",
              transform: "translateY(-50%)",
              fontFamily: "var(--serif-display)",
              fontSize: "clamp(200px, 30vw, 420px)",
              fontWeight: 700,
              color: "rgba(255,255,255,0.05)",
              lineHeight: 1,
              letterSpacing: "-0.05em",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            K
          </div>

          <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <ClipReveal>
              <p
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: 24,
                }}
              >
                Let&apos;s make something unforgettable
              </p>
            </ClipReveal>
            <ClipReveal delay={0.1}>
              <h2
                style={{
                  fontFamily: "var(--serif-display)",
                  fontSize: "clamp(52px, 8vw, 100px)",
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.022em",
                  lineHeight: 0.95,
                  marginBottom: 12,
                }}
              >
                Tell us your story.
              </h2>
            </ClipReveal>
            <ClipReveal delay={0.2}>
              <p
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: 19,
                  color: "rgba(255,255,255,0.65)",
                  marginBottom: 52,
                }}
              >
                We make sure nobody looks away.
              </p>
            </ClipReveal>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35, ease }}
              style={{ display: "flex", alignItems: "center", gap: 36, flexWrap: "wrap" }}
            >
              <a
                href="mailto:hello@thekissa.co"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "15px 30px",
                  background: "var(--ink)",
                  color: "#fff",
                  borderRadius: 10,
                  fontFamily: "var(--sans)",
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                  transition: "background 0.18s ease-out",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.background = "#2a0e18")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.background = "var(--ink)")
                }
              >
                Start your kissa <ArrowUpRight size={16} />
              </a>
              <a
                href="mailto:hello@thekissa.co"
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: 15,
                  color: "#fff",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.35)",
                  paddingBottom: 2,
                  transition: "border-color 0.18s ease-out",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.borderColor = "#fff")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(255,255,255,0.35)")
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
