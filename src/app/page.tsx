"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import { BurstBubbles, KineticWordReel, BubbleGrid, Card3D } from "@/components/BubbleKinetic";

const BubbleScene3D = dynamic(() => import("@/components/BubbleScene3D"), {
  ssr: false,
});

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


// ─── Kissa bubble SVG path (speech bubble with left-pointing tail at mid-left) ─
// Matches brand mark: rounded rect, tail protrudes left at ~55% height
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

// ─── KissaBubbleSection — motion infographic between marquee and statement ────
function KissaBubbleSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-20, 40]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [12, -6]);

  const bubbles = [
    { label: "Story & Brand", x: "8%", y: "10%", size: 180, delay: 0, filled: true },
    { label: "Motion & Film", x: "62%", y: "5%", size: 140, delay: 0.15, filled: false },
    { label: "Digital & Immersive", x: "38%", y: "52%", size: 110, delay: 0.28, filled: false },
    { label: "", x: "78%", y: "48%", size: 80, delay: 0.38, filled: true },
    { label: "", x: "18%", y: "62%", size: 64, delay: 0.45, filled: false },
  ];

  return (
    <section
      ref={ref}
      style={{
        background: "var(--ink)",
        padding: "100px 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          className="bubble-section-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          {/* Left: large kinetic type */}
          <div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
            >
              <p
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: 20,
                }}
              >
                What we do
              </p>
              <h2
                style={{
                  fontFamily: "var(--serif-display)",
                  fontSize: "clamp(48px, 6vw, 80px)",
                  fontWeight: 700,
                  color: "var(--fg-on-ink)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.018em",
                  margin: "0 0 28px",
                }}
              >
                Three disciplines.
                <br />
                <em style={{ color: "var(--fg-on-ink)", fontStyle: "italic" }}>
                  One story.
                </em>
              </h2>
              <p
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: 16,
                  color: "var(--fg-on-ink-2)",
                  lineHeight: 1.7,
                  maxWidth: "42ch",
                  margin: "0 0 40px",
                }}
              >
                Brand strategy, film production, and digital experiences — working as one continuous creative act, not three separate deliverables.
              </p>

              {/* Three service pills with bubble icon */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "Story & Brand", desc: "Identity, strategy, voice" },
                  { label: "Motion & Film", desc: "Production, direction, post" },
                  { label: "Digital & Immersive", desc: "Web, AR, installations" },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={reduce ? false : { opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "12px 16px",
                      borderRadius: 12,
                      border: "1px solid rgba(255,255,255,0.07)",
                      background: "rgba(255,255,255,0.03)",
                    }}
                  >
                    <KissaBubble size={28} fill="#ffffff" stroke="none" />
                    <div>
                      <p style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: 14, color: "#fff", margin: 0 }}>
                        {s.label}
                      </p>
                      <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--fg-on-ink-2)", margin: 0, letterSpacing: "0.06em" }}>
                        {s.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: floating bubble illustration */}
          <div style={{ position: "relative", height: 440, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Large filled bubble — parallax */}
            <motion.div
              style={{ position: "absolute", top: "5%", left: "5%", y: reduce ? 0 : y1, rotate: reduce ? 0 : rotate1 }}
            >
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease, delay: 0.05 }}
              >
                <KissaBubble size={170} fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.6)" strokeWidth={1.5} />
              </motion.div>
            </motion.div>

            {/* Outline bubble — parallax counter */}
            <motion.div
              style={{ position: "absolute", bottom: "8%", right: "4%", y: reduce ? 0 : y2, rotate: reduce ? 0 : rotate2 }}
            >
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease, delay: 0.2 }}
              >
                <KissaBubble size={130} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={2.5} />
              </motion.div>
            </motion.div>

            {/* Centre bubble with number */}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.7, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease, delay: 0.1 }}
              style={{ position: "relative", zIndex: 2 }}
            >
              <div style={{ position: "relative", display: "inline-block" }}>
                <KissaBubble size={220} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.4)" strokeWidth={1.5} />
                <div style={{
                  position: "absolute",
                  top: "38%",
                  left: "52%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  pointerEvents: "none",
                }}>
                  <p style={{
                    fontFamily: "var(--serif-display)",
                    fontSize: "clamp(36px, 5vw, 56px)",
                    fontWeight: 700,
                    color: "var(--fg-on-ink)",
                    lineHeight: 1,
                    margin: 0,
                  }}>23+</p>
                  <p style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    color: "var(--fg-on-ink-2)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    margin: "6px 0 0",
                  }}>Brands</p>
                </div>
              </div>
            </motion.div>

            {/* Small accent bubbles */}
            {bubbles.slice(3).map((b, i) => (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.1, ease }}
                style={{ position: "absolute", left: b.x, top: b.y }}
              >
                <KissaBubble
                  size={b.size}
                  fill={b.filled ? "rgba(255,255,255,0.08)" : "none"}
                  stroke={b.filled ? "none" : "rgba(255,255,255,0.2)"}
                  strokeWidth={1.5}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 760px) {
          .bubble-section-grid { grid-template-columns: 1fr !important; }
          .bubble-illustration { display: none !important; }
        }
      `}</style>
    </section>
  );
}

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
  const reduce = useReducedMotion();
  return (
    <span style={{ display: "block", overflow: "hidden", ...style }}>
      <motion.span
        style={{ display: "block" }}
        initial={reduce ? false : { y: "105%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-5%" }}
        transition={reduce ? { duration: 0 } : { duration, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}


// ─── Illustration reel (scroll-driven horizontal pan) ────────────────────────
const REEL_ITEMS = [
  { src: "/illustrations/01-two-breakpoints.png",   label: "Two perspectives" },
  { src: "/illustrations/02-sort-by-purpose.png",   label: "Purpose-led thinking" },
  { src: "/illustrations/04-handoff-path.png",      label: "Seamless delivery" },
  { src: "/illustrations/05-information-well.png",  label: "Depth of research" },
  { src: "/illustrations/03-one-fish-many-uses.png", label: "One story, many forms" },
  { src: "/illustrations/08-trust-bridge.png",      label: "Building trust" },
];

function IllustrationReel() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-22%"]);

  return (
    <section ref={ref} style={{ background: "#f0f0f0", padding: "72px 0", overflow: "hidden" }}>
      <motion.div
        style={{
          display: "flex",
          gap: 20,
          paddingLeft: 48,
          x: reduce ? 0 : x,
        }}
      >
        {REEL_ITEMS.map((ill, i) => (
          <div
            key={i}
            style={{
              flex: "0 0 320px",
              borderRadius: 14,
              overflow: "hidden",
              background: "#ffffff",
              border: "1px solid #e0e0e0",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
              <Image
                src={ill.src}
                alt={ill.label}
                fill
                style={{ objectFit: "cover" }}
                sizes="320px"
              />
            </div>
            <div style={{ padding: "12px 16px" }}>
              <p style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--gray-500)",
                margin: 0,
              }}>
                {ill.label}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
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

  // Parallax for hero bg
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
            overflow: "hidden",
            background: "var(--ink)",
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

          {/* Burst bubbles — behind everything */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
            <BurstBubbles count={5} />
          </div>

          {/* Two-column grid: text left, 3D right */}
          <div
            className="wrap"
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              width: "100%",
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 0,
              alignItems: "center",
              minHeight: "100vh",
              paddingTop: 120,
              paddingBottom: 80,
            }}
          >
            {/* Left: text */}
            <div style={{ position: "relative", zIndex: 2 }}>
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: 0.1 }}
              >
                <p className="k-eyebrow on-ink">Media art agency</p>
              </motion.div>

              {/* H1 — single block reveal, no per-line overflow clipping */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.2 }}
                style={{
                  fontFamily: "var(--serif-display)",
                  fontSize: "clamp(52px, 7vw, 100px)",
                  lineHeight: 1.0,
                  fontWeight: 700,
                  letterSpacing: "-0.022em",
                  marginTop: 22,
                  marginBottom: 0,
                  color: "var(--fg-on-ink)",
                }}
              >
                We make stories
                <br />
                impossible to
                <br />
                <em style={{ fontStyle: "italic" }}>look away.</em>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.7, ease }}
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: 18,
                  color: "var(--fg-on-ink-2)",
                  maxWidth: "44ch",
                  marginTop: 28,
                  lineHeight: 1.65,
                }}
              >
                the Kissa is a media art agency specialising in branded content, film, and
                immersive experiences. The name <em>kissa</em> means story. Every project
                is one we make unforgettable.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9, ease }}
                style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 36 }}
              >
                <a href="mailto:hello@thekissa.com" className="btn btn-primary">
                  Start your kissa
                </a>
                <a href="#work" className="btn btn-ghost on-ink">
                  See the work
                </a>
              </motion.div>
            </div>

            {/* Right: 3D scene contained to this column */}
            <div
              style={{
                position: "relative",
                height: "100%",
                minHeight: 520,
                pointerEvents: "none",
              }}
            >
              <BubbleScene3D />
            </div>
          </div>

          {/* Mobile: stack vertically */}
          <style>{`
            @media (max-width: 760px) {
              .hero-grid { grid-template-columns: 1fr !important; }
              .hero-3d { display: none !important; }
            }
          `}</style>
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

        {/* ══ 2b. KINETIC WORD REEL ═════════════════════════════════════════════ */}
        <KineticWordReel />

        {/* ══ 2c. KISSA BUBBLE MOTION GRAPHIC ══════════════════════════════════ */}
        <KissaBubbleSection />

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

            <ClipReveal delay={0.0}>
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
                  color: "var(--ink)",
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

        {/* ══ 3b. ILLUSTRATIONS — how we think ═════════════════════════════════ */}
        <section style={{ background: "#f7f7f7", padding: "100px 0", overflow: "hidden" }}>
          <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>
            <ClipReveal>
              <h2
                style={{
                  fontFamily: "var(--serif-display)",
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 700,
                  color: "var(--ink)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.1,
                  marginBottom: 56,
                }}
              >
                How we think.
              </h2>
            </ClipReveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 24,
              }}
            >
              {[
                { src: "/illustrations/06-idea-press.png",          label: "Idea to execution" },
                { src: "/illustrations/07-content-fermentation.png", label: "Content that matures" },
                { src: "/illustrations/08-trust-bridge.png",         label: "Building trust" },
                { src: "/illustrations/03-one-fish-many-uses.png",   label: "One story, many forms" },
              ].map((ill, i) => (
                <motion.div
                  key={ill.src}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease }}
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    background: "#ffffff",
                    border: "1px solid var(--gray-200)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  }}
                >
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
                    <Image
                      src={ill.src}
                      alt={ill.label}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 600px) 100vw, 320px"
                    />
                  </div>
                  <div style={{ padding: "16px 20px" }}>
                    <p
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 11,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--fg3)",
                        margin: 0,
                      }}
                    >
                      {ill.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 4. SERVICES ═══════════════════════════════════════════════════════ */}
        <section style={{ background: "var(--paper)", padding: "0 0 140px" }}>
          <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>
            {/* Section header */}
            <div
              style={{
                borderTop: "1px solid var(--line)",
                paddingTop: 72,
                marginBottom: 80,
                maxWidth: 680,
              }}
            >
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
                  Three ways we tell it.
                </h2>
              </ClipReveal>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease }}
                className="k-body"
                style={{ color: "var(--fg2)", margin: "20px 0 0" }}
              >
                One studio, end to end. From the first idea to the final frame. We don&apos;t
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
                      color: "var(--fg2)",
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
                  <h2
                    style={{
                      fontFamily: "var(--serif-display)",
                      fontSize: "clamp(36px, 5vw, 72px)",
                      fontWeight: 700,
                      color: "var(--fg-on-ink)",
                      letterSpacing: "-0.012em",
                      lineHeight: 1.05,
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
                    color: "var(--fg-on-ink)",
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
                        color: hoveredCard === p.name ? "#ffffff" : "rgba(244,239,233,0.5)",
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
                >
                <Card3D
                  style={{
                    background: "#ffffff",
                    borderRadius: 20,
                    padding: 40,
                    border: "1px solid rgba(0,0,0,0.08)",
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
                        background: "var(--ink)",
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
                </Card3D>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 6b. ILLUSTRATION HORIZONTAL SCROLL ═══════════════════════════════ */}
        <IllustrationReel />

        {/* ══ 7. STATS — 3D bubble grid ═════════════════════════════════════════ */}
        <BubbleGrid />

        {/* ══ 8. CTA BANNER ═════════════════════════════════════════════════════ */}
        <section
          style={{
            background: "var(--ink)",
            padding: "140px 0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Burst bubbles bg */}
          <BurstBubbles count={4} />

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
                href="mailto:hello@thekissa.com"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "15px 30px",
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.2)",
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
                  ((e.currentTarget as HTMLAnchorElement).style.background = "#333333")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.background = "#1a1a1a")
                }
              >
                Start your kissa <ArrowUpRight size={16} />
              </a>
              <a
                href="mailto:hello@thekissa.com"
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
