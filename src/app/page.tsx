"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BurstBubbles, KineticWordReel, BubbleGrid, Card3D } from "@/components/BubbleKinetic";

// ─── Constants ────────────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const MARQUEE_TEXT =
  "BRANDED CONTENT · VIDEO PRODUCTION · BRAND STRATEGY · SOCIAL CAMPAIGNS · PHOTOGRAPHY · ANIMATION · IMMERSIVE EXPERIENCES · ";

const CLIENT_LOGOS = [
  "FYTURE", "TECFIDES", "NATURA", "MEZZE", "SCRIBBLES", "LYFSENSE",
  "FYTURE", "TECFIDES", "NATURA", "MEZZE", "SCRIBBLES", "LYFSENSE",
];

const services = [
  {
    num: "01",
    title: "Story & Brand",
    headline: "Strategic, fearless, and built to last.",
    body: "We dig into who you are and why it matters, then build the language and visuals to say it clearly. Every touchpoint becomes part of a coherent, compelling narrative.",
    tags: ["Brand strategy", "Visual identity", "Branded content", "Campaigns", "Copywriting"],
  },
  {
    num: "02",
    title: "Motion & Film",
    headline: "Frames that move people.",
    body: "From concept to cut, we make films that earn attention rather than demand it. Craft-led production, purposeful direction, and post that never forgets the story.",
    tags: ["Video production", "Film & direction", "Animation", "Motion design", "Creative direction"],
  },
  {
    num: "03",
    title: "Digital & Immersive",
    headline: "Experiences you step inside.",
    body: "Beyond the screen, into the room. We design environments, installations, and interactive worlds that blur the boundary between audience and story.",
    tags: ["Immersive", "Installations", "Web", "AR/social", "Brand activation"],
  },
];

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

// ─── Kissa bubble SVG ─────────────────────────────────────────────────────────
const BUBBLE_PATH =
  "M 68,0 L 196,0 Q 220,0 220,24 L 220,176 Q 220,200 196,200 L 68,200 Q 40,200 40,176 L 40,135 L 0,115 L 40,78 L 40,24 Q 40,0 68,0 Z";

function KissaBubble({
  size = 200,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 3,
  style,
}: {
  size?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 220 200"
      width={size}
      height={size}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      style={style}
    >
      <path d={BUBBLE_PATH} />
    </svg>
  );
}

// ─── ClipReveal ───────────────────────────────────────────────────────────────
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
  const reduce = useReducedMotion();
  return (
    <div style={{ overflow: "hidden", ...style }}>
      <motion.div
        initial={reduce ? false : { y: "105%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-5%" }}
        transition={reduce ? { duration: 0 } : { duration, ease, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── ServiceVisual — animated bubble illustration per service tab ──────────────
function ServiceVisual({ index }: { index: number }) {
  const visuals = [
    // Story & Brand
    <div key={0} style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <KissaBubble size={260} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.35)" strokeWidth={1.5} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-44%, -46%)", textAlign: "center", pointerEvents: "none" }}>
        <p style={{ fontFamily: "var(--sans)", fontSize: "clamp(48px,6vw,72px)", fontWeight: 700, color: "var(--fg-on-ink)", lineHeight: 1, margin: 0 }}>01</p>
        <p style={{ fontFamily: "var(--sans)", fontSize: 10, color: "var(--fg-on-ink-2)", letterSpacing: "0.14em", textTransform: "uppercase", margin: "6px 0 0" }}>Story</p>
      </div>
      <KissaBubble size={110} fill="rgba(255,255,255,0.08)" stroke="none" style={{ position: "absolute", top: "8%", right: "10%" }} />
      <KissaBubble size={72} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={1.5} style={{ position: "absolute", bottom: "12%", left: "8%" }} />
    </div>,
    // Motion & Film
    <div key={1} style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <KissaBubble size={220} fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.4)" strokeWidth={2} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-44%, -46%)", textAlign: "center", pointerEvents: "none" }}>
        <p style={{ fontFamily: "var(--sans)", fontSize: "clamp(48px,6vw,72px)", fontWeight: 700, color: "var(--fg-on-ink)", lineHeight: 1, margin: 0 }}>02</p>
        <p style={{ fontFamily: "var(--sans)", fontSize: 10, color: "var(--fg-on-ink-2)", letterSpacing: "0.14em", textTransform: "uppercase", margin: "6px 0 0" }}>Motion</p>
      </div>
      <KissaBubble size={140} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" strokeWidth={1.5} style={{ position: "absolute", bottom: "5%", right: "5%" }} />
      <KissaBubble size={60} fill="rgba(255,255,255,0.1)" stroke="none" style={{ position: "absolute", top: "10%", left: "12%" }} />
    </div>,
    // Digital & Immersive
    <div key={2} style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <KissaBubble size={180} fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.5)" strokeWidth={1} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-44%, -46%)", textAlign: "center", pointerEvents: "none" }}>
        <p style={{ fontFamily: "var(--sans)", fontSize: "clamp(48px,6vw,72px)", fontWeight: 700, color: "var(--fg-on-ink)", lineHeight: 1, margin: 0 }}>03</p>
        <p style={{ fontFamily: "var(--sans)", fontSize: 10, color: "var(--fg-on-ink-2)", letterSpacing: "0.14em", textTransform: "uppercase", margin: "6px 0 0" }}>Digital</p>
      </div>
      <KissaBubble size={90} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={2} style={{ position: "absolute", top: "5%", right: "8%" }} />
      <KissaBubble size={50} fill="rgba(255,255,255,0.12)" stroke="none" style={{ position: "absolute", bottom: "15%", left: "5%" }} />
      <KissaBubble size={50} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} style={{ position: "absolute", top: "20%", left: "0%" }} />
    </div>,
  ];
  return visuals[index] ?? visuals[0];
}

// ─── ServicesTabbed ───────────────────────────────────────────────────────────
function ServicesTabbed() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section style={{ background: "var(--ink)", padding: "120px 0 140px" }}>
      <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 72 }}>
          <ClipReveal>
            <p style={{ fontFamily: "var(--sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 16 }}>
              What we do
            </p>
          </ClipReveal>
          <ClipReveal delay={0.1}>
            <h2 style={{ fontFamily: "var(--sans)", fontSize: "clamp(36px,5vw,68px)", fontWeight: 700, color: "var(--fg-on-ink)", letterSpacing: "-0.014em", lineHeight: 1.0, margin: 0 }}>
              Three ways we tell it.
            </h2>
          </ClipReveal>
        </div>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: 2, marginBottom: 56, borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 0 }}>
          {services.map((s, i) => (
            <button
              key={s.num}
              onClick={() => setActive(i)}
              style={{
                fontFamily: "var(--sans)",
                fontWeight: 600,
                fontSize: 15,
                color: active === i ? "#fff" : "rgba(255,255,255,0.38)",
                background: "none",
                border: "none",
                borderBottom: active === i ? "2px solid #fff" : "2px solid transparent",
                cursor: "pointer",
                padding: "0 0 20px",
                marginRight: 40,
                letterSpacing: "0.01em",
                transition: "color 0.2s ease, border-color 0.2s ease",
              }}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
            className="services-grid"
          >
            {/* Left: visual */}
            <div style={{ position: "relative", height: 420, background: "rgba(255,255,255,0.03)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
              <ServiceVisual index={active} />
            </div>

            {/* Right: content */}
            <div>
              <p style={{ fontFamily: "var(--sans)", fontSize: 12, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 20 }}>
                {services[active].num}
              </p>
              <h3 style={{ fontFamily: "var(--sans)", fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 700, color: "var(--fg-on-ink)", lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 16 }}>
                {services[active].headline}
              </h3>
              <p style={{ fontFamily: "var(--sans)", fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 32, maxWidth: "50ch" }}>
                {services[active].body}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {services[active].tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: "rgb(28,28,28)",
                      color: "rgba(255,255,255,0.75)",
                      borderRadius: "4.25rem",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "8px 16px",
                      fontFamily: "var(--sans)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Progress indicators */}
              <div style={{ display: "flex", gap: 8, marginTop: 48 }}>
                {services.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    style={{
                      height: 14,
                      width: active === i ? 40 : 14,
                      borderRadius: "0.625rem",
                      background: active === i ? "#fff" : "rgba(255,255,255,0)",
                      border: "1px solid rgba(255,255,255,0.35)",
                      cursor: "pointer",
                      transition: "width 0.3s ease, background 0.3s ease",
                      padding: 0,
                    }}
                    aria-label={`Tab ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── TestimonialsSlider ───────────────────────────────────────────────────────
function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);
  const reduce = useReducedMotion();
  const total = testimonials.length;

  function prev() { setCurrent((c) => (c - 1 + total) % total); }
  function next() { setCurrent((c) => (c + 1) % total); }

  const t = testimonials[current];

  return (
    <section style={{ background: "rgb(28,28,28)", padding: "140px 0" }}>
      <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <ClipReveal>
          <h2 style={{ fontFamily: "var(--sans)", fontSize: "clamp(36px,5vw,68px)", fontWeight: 700, color: "var(--fg-on-ink)", letterSpacing: "-0.012em", lineHeight: 1.05, marginTop: 0, marginBottom: 72 }}>
            What our clients say.
          </h2>
        </ClipReveal>

        {/* Slider */}
        <div style={{ position: "relative" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={reduce ? false : { opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              transition={{ duration: 0.45, ease }}
            >
              <div
                style={{
                  display: "flex",
                  background: "rgb(28,28,28)",
                  borderRadius: 20,
                  overflow: "hidden",
                  maxWidth: 1100,
                }}
                className="testimonial-card"
              >
                {/* Left: client info */}
                <div
                  style={{
                    width: "34%",
                    flexShrink: 0,
                    padding: "72px 40px 72px 64px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  className="testimonial-left"
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--sans)",
                      fontWeight: 700,
                      fontSize: 22,
                      color: "#fff",
                      marginBottom: 64,
                    }}
                  >
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: 18, color: "#fff", margin: "0 0 8px" }}>{t.name}</p>
                    <p style={{ fontFamily: "var(--sans)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)", margin: 0 }}>
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>

                {/* Right: quote */}
                <div
                  style={{
                    flex: 1,
                    background: "rgb(21,21,21)",
                    borderRadius: 20,
                    padding: "80px 64px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  className="testimonial-right"
                >
                  <p style={{ fontFamily: "var(--serif-display)", fontStyle: "italic", fontSize: "clamp(18px,1.8vw,22px)", color: "rgba(255,255,255,0.85)", lineHeight: 1.7, margin: 0 }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 40 }}>
            <button
              onClick={prev}
              style={{
                width: 70,
                height: 56,
                borderRadius: "0.625rem",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.25)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.8)",
                transition: "background 0.18s ease, border-color 0.18s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
              aria-label="Previous"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={next}
              style={{
                width: 70,
                height: 56,
                borderRadius: "0.625rem",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.25)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.8)",
                transition: "background 0.18s ease, border-color 0.18s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
              aria-label="Next"
            >
              <ArrowRight size={18} />
            </button>
            <div style={{ display: "flex", gap: 8, marginLeft: 8 }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: i === current ? 40 : 14,
                    height: 14,
                    borderRadius: "0.625rem",
                    background: i === current ? "#ffffff" : "transparent",
                    border: "1px solid rgba(255,255,255,0.3)",
                    cursor: "pointer",
                    transition: "width 0.3s ease, background 0.3s ease",
                    padding: 0,
                  }}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
            <span style={{ fontFamily: "var(--sans)", fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", marginLeft: "auto" }}>
              {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .testimonial-card { flex-direction: column !important; }
          .testimonial-left { width: 100% !important; padding: 40px 32px 32px !important; }
          .testimonial-right { padding: 32px !important; }
        }
      `}</style>
    </section>
  );
}

// ─── ClientLogosStrip ─────────────────────────────────────────────────────────
function ClientLogosStrip() {
  return (
    <section style={{ background: "rgb(18,18,18)", padding: "60px 0", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "marquee 28s linear infinite",
        }}
      >
        {CLIENT_LOGOS.map((name, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 24,
              fontFamily: "var(--sans)",
              fontWeight: 700,
              fontSize: "clamp(20px,2.5vw,30px)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              marginRight: 24,
              userSelect: "none",
            }}
          >
            {i > 0 && <span style={{ opacity: 0.3, fontWeight: 400 }}>/</span>}
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);

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
          ref={heroRef}
          style={{
            position: "relative",
            minHeight: "100vh",
            overflow: "hidden",
            background: "var(--ink)",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Parallax bg layer */}
          <motion.div
            style={{
              position: "absolute",
              inset: "-20%",
              background: "var(--ink)",
              y: bgY,
              zIndex: 0,
            }}
          />

          {/* Iridescent bubble — sole chromatic event (OFF+BRAND pattern) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            style={{
              position: "absolute",
              right: "-8%",
              top: "50%",
              transform: "translateY(-50%)",
              width: "clamp(380px, 44vw, 680px)",
              height: "clamp(380px, 44vw, 680px)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            {/* Iridescent gradient fills the Kissa speech bubble shape */}
            <svg
              viewBox="0 0 220 200"
              width="100%"
              height="100%"
              style={{ display: "block", filter: "blur(0px)" }}
            >
              <defs>
                <linearGradient id="iridescent-fill" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(25, 0.5, 0.5)">
                  <stop offset="0%"   stopColor="#FACB0E" />
                  <stop offset="28%"  stopColor="#F06BA8" />
                  <stop offset="62%"  stopColor="#78BAE6" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
                </linearGradient>
                <radialGradient id="iridescent-inner" cx="38%" cy="32%" r="60%">
                  <stop offset="0%"   stopColor="rgba(255,255,255,0.22)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
              </defs>
              <path
                d="M 68,0 L 196,0 Q 220,0 220,24 L 220,176 Q 220,200 196,200 L 68,200 Q 40,200 40,176 L 40,135 L 0,115 L 40,78 L 40,24 Q 40,0 68,0 Z"
                fill="url(#iridescent-fill)"
              />
              <path
                d="M 68,0 L 196,0 Q 220,0 220,24 L 220,176 Q 220,200 196,200 L 68,200 Q 40,200 40,176 L 40,135 L 0,115 L 40,78 L 40,24 Q 40,0 68,0 Z"
                fill="url(#iridescent-inner)"
              />
            </svg>
          </motion.div>

          {/* Concentric circle ornament — structural depth */}
          <div style={{ position: "absolute", right: "6%", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", zIndex: 0 }}>
            {[600, 480, 360].map((r, i) => (
              <div key={r} style={{
                position: "absolute",
                width: r, height: r,
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                border: `1px solid rgba(255,255,255,${0.04 - i * 0.01})`,
              }} />
            ))}
          </div>

          {/* Hero content — text left column */}
          <div
            className="wrap"
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              width: "100%",
              position: "relative",
              zIndex: 1,
              paddingTop: 120,
              paddingBottom: 80,
            }}
          >
            <div style={{ maxWidth: "55%" }}>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease, delay: 0.1 }}>
                <p style={{
                  fontFamily: "var(--sans)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: 28,
                }}>Media art agency</p>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.2 }}
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: "clamp(60px, 7.5vw, 110px)",
                  lineHeight: 0.95,
                  fontWeight: 700,
                  letterSpacing: "-0.022em",
                  margin: 0,
                  color: "var(--fg-on-ink)",
                }}
              >
                We make stories
                <br />
                impossible to
                <br />
                <em style={{ fontStyle: "italic" }}>look away.</em>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.7, ease }}
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: 18,
                  color: "var(--fg-on-ink-2)",
                  maxWidth: "44ch",
                  marginTop: 32,
                  lineHeight: 1.65,
                }}
              >
                the Kissa is a media art agency specialising in branded content, film, and
                immersive experiences. The name <em>kissa</em> means story. Every project
                is one we make unforgettable.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9, ease }}
                style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 40 }}
              >
                <a href="mailto:hello@thekissa.com" className="btn btn-primary">Start your kissa</a>
                <a href="#work" className="btn btn-ghost on-ink">See the work</a>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator — bottom right */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            style={{
              position: "absolute",
              bottom: 36,
              right: 48,
              fontFamily: "var(--sans)",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              zIndex: 1,
            }}
          >
            <span>Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 1, height: 28, background: "rgba(255,255,255,0.25)" }}
            />
          </motion.div>

          <style>{`
            @media (max-width: 680px) {
              .hero-text-col { max-width: 100% !important; }
            }
          `}</style>
        </section>

        {/* ══ 2. MARQUEE STRIP ══════════════════════════════════════════════════ */}
        <section style={{ background: "#111109", padding: "18px 0", overflow: "hidden" }}>
          <div className="marquee-track">
            <div style={{ fontFamily: "var(--sans)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, color: "rgba(244,239,233,0.35)", whiteSpace: "nowrap" }}>
              {MARQUEE_TEXT}{MARQUEE_TEXT}
            </div>
          </div>
        </section>

        {/* ══ 2b. KINETIC WORD REEL ═════════════════════════════════════════════ */}
        <KineticWordReel />

        {/* ══ 3. STATEMENT ══════════════════════════════════════════════════════ */}
        <section style={{ background: "var(--ink)", padding: "120px 0 100px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="wrap" style={{ maxWidth: 860, margin: "0 auto" }}>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              style={{ height: 1, background: "rgba(255,255,255,0.12)", transformOrigin: "left", marginBottom: 40 }}
            />
            <ClipReveal delay={0.0}>
              <p style={{ fontFamily: "var(--sans)", fontSize: "clamp(40px, 5.5vw, 72px)", fontWeight: 700, color: "var(--fg-on-ink)", lineHeight: 1.05, letterSpacing: "-0.012em", margin: 0 }}>
                We don&apos;t make content.
              </p>
            </ClipReveal>
            <ClipReveal delay={0.2}>
              <p style={{ fontFamily: "var(--sans)", fontStyle: "italic", fontSize: "clamp(40px, 5.5vw, 72px)", fontWeight: 700, color: "var(--fg-on-ink)", lineHeight: 1.05, letterSpacing: "-0.012em", margin: 0 }}>
                We make kissa.
              </p>
            </ClipReveal>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35, ease }}
              className="k-body-l"
              style={{ color: "var(--fg-on-ink-2)", marginTop: 36, maxWidth: "62ch" }}
            >
              A campaign isn&apos;t a deliverable. It&apos;s a story told well enough that
              people can&apos;t scroll past — crafted in frames, light, and the cut between
              two shots. From startups to standouts, every brand has a kissa worth telling.
            </motion.p>
          </div>
        </section>

        {/* ══ 4. SERVICES — tabbed ══════════════════════════════════════════════ */}
        <ServicesTabbed />

        {/* ══ 5. SELECTED WORK ══════════════════════════════════════════════════ */}
        <section id="work" style={{ background: "rgb(18,18,18)", padding: "120px 0 140px" }}>
          <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56 }}>
              <div>
                <ClipReveal>
                  <h2 style={{ fontFamily: "var(--sans)", fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 700, color: "var(--fg-on-ink)", letterSpacing: "-0.012em", lineHeight: 1.05, marginBottom: 0 }}>
                    Our maddest hits.
                  </h2>
                </ClipReveal>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
                <span style={{ fontFamily: "var(--sans)", fontSize: 11, letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)", userSelect: "none" }}>
                  drag to explore →
                </span>
                <Link href="/portfolio" style={{ fontFamily: "var(--sans)", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.7)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
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
                  boxShadow: hoveredCard === p.name ? "0 32px 64px rgba(0,0,0,0.28)" : "0 4px 20px rgba(0,0,0,0.1)",
                }}
                onMouseEnter={() => setHoveredCard(p.name)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse 80% 50% at 20% 20%, ${p.accent}22 0%, transparent 70%)`, pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontFamily: "var(--sans)", fontSize: "clamp(120px, 20vw, 200px)", fontWeight: 700, color: "rgba(0,0,0,0.08)", lineHeight: 1, letterSpacing: "-0.05em", userSelect: "none", whiteSpace: "nowrap", pointerEvents: "none" }}>
                  {p.name[0]}
                </div>
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(0,0,0,${hoveredCard === p.name ? 0.82 : 0.65}) 0%, transparent 55%)`, transition: "background 0.25s ease-out" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 24px" }}>
                  <p style={{ fontFamily: "var(--sans)", fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 12, lineHeight: 1.1 }}>{p.name}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ background: "rgba(0,0,0,0.35)", color: "rgba(255,255,255,0.85)", borderRadius: "4.25rem", fontSize: 10, fontWeight: 600, padding: "6px 14px", fontFamily: "var(--sans)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      {p.category}
                    </span>
                    <a href={p.href} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: hoveredCard === p.name ? "#ffffff" : "rgba(255,255,255,0.5)", transition: "color 0.2s", display: "flex", alignItems: "center", textDecoration: "none" }}>
                      <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ 6. CLIENT LOGOS STRIP (MAD pattern) ══════════════════════════════ */}
        <ClientLogosStrip />

        {/* ══ 7. TESTIMONIALS — slideshow (MAD pattern) ════════════════════════ */}
        <TestimonialsSlider />

        {/* ══ 8. STATS — 3D bubble grid ═════════════════════════════════════════ */}
        <BubbleGrid />

        {/* ══ 9. CTA BANNER ═════════════════════════════════════════════════════ */}
        <section style={{ background: "var(--ink)", padding: "140px 0", position: "relative", overflow: "hidden" }}>
          <BurstBubbles count={4} />
          <div style={{ position: "absolute", right: "-5%", top: "50%", transform: "translateY(-50%)", fontFamily: "var(--sans)", fontSize: "clamp(200px, 30vw, 420px)", fontWeight: 700, color: "rgba(255,255,255,0.05)", lineHeight: 1, letterSpacing: "-0.05em", userSelect: "none", pointerEvents: "none" }}>K</div>

          <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <ClipReveal>
              <p style={{ fontFamily: "var(--sans)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 24 }}>
                Let&apos;s make something unforgettable
              </p>
            </ClipReveal>
            <ClipReveal delay={0.1}>
              <h2 style={{ fontFamily: "var(--sans)", fontSize: "clamp(52px, 8vw, 100px)", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.022em", lineHeight: 0.95, marginBottom: 12 }}>
                Tell us your story.
              </h2>
            </ClipReveal>
            <ClipReveal delay={0.2}>
              <p style={{ fontFamily: "var(--sans)", fontSize: 19, color: "rgba(255,255,255,0.65)", marginBottom: 52 }}>
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
                href="mailto:hello@thekissa.com"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 30px", background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: 10, fontFamily: "var(--sans)", fontWeight: 600, fontSize: 15, textDecoration: "none", letterSpacing: "0.01em", transition: "background 0.18s ease-out" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#333")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#1a1a1a")}
              >
                Start your kissa <ArrowUpRight size={16} />
              </a>
              <a
                href="mailto:hello@thekissa.com"
                style={{ fontFamily: "var(--sans)", fontSize: 15, color: "#fff", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.35)", paddingBottom: 2, transition: "border-color 0.18s ease-out" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "#fff")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.35)")}
              >
                hello@thekissa.com
              </a>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
