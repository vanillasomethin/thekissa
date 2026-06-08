"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BurstBubbles, KineticWordReel, BubbleGrid, Card3D } from "@/components/BubbleKinetic";

// ─── Constants ────────────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── ScribbleMark — scribble SVG that animates in on scroll ───────────────────
interface ScribbleMarkProps {
  src: string;
  size?: number;
  style?: React.CSSProperties;
  className?: string;
  rot?: number;
  delay?: number;
}
function ScribbleMark({ src, size = 80, style, className, rot = 0, delay = 0 }: ScribbleMarkProps) {
  const driftRef = useRef<HTMLDivElement>(null);
  const enterRef = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const outer = driftRef.current;
    const inner = enterRef.current;
    if (!outer || !inner) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        const { animate: animeAnimate } = require("animejs");
        // entrance on inner
        animeAnimate(inner, {
          opacity: [0, 1],
          scale: [0, 1],
          rotate: [`${rot - 35}deg`, `${rot}deg`],
          duration: 800,
          ease: "outExpo",
          delay,
        });
        // drift loop on outer — starts after entrance
        animeAnimate(outer, {
          translateY: [0, -10, 0],
          duration: 4200,
          ease: "inOutSine",
          loop: true,
          delay: delay + 1000,
        });
      }
    }, { threshold: 0.15 });
    obs.observe(outer);
    return () => obs.disconnect();
  }, [rot, delay]);

  return (
    <div
      ref={driftRef}
      className={className}
      style={{
        width: size,
        height: size,
        pointerEvents: "none",
        flexShrink: 0,
        willChange: "transform",
        ...style,
      }}
    >
      <div
        ref={enterRef}
        style={{
          width: "100%",
          height: "100%",
          opacity: 0,
          transform: `rotate(${rot - 35}deg) scale(0)`,
          filter: "invert(1)",
          mixBlendMode: "screen",
          willChange: "transform, opacity",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={size} height={size} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
      </div>
    </div>
  );
}

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
    headline: "Identity sharp enough to hold its own.",
    body: "We build from the inside out: the naming, the voice, the visual logic, the reason someone picks you over everyone else. Not style applied to a business — a business made legible through style.",
    tags: ["Brand strategy", "Visual identity", "Branded content", "Campaigns", "Copywriting"],
  },
  {
    num: "02",
    title: "Motion & Film",
    headline: "A minute that changes how they feel.",
    body: "We treat every frame as an argument. Our films don't explain the brand — they make you feel what the brand believes. Concept, direction, production, cut: all one continuous decision.",
    tags: ["Video production", "Film & direction", "Animation", "Motion design", "Creative direction"],
  },
  {
    num: "03",
    title: "Digital & Immersive",
    headline: "The room becomes the message.",
    body: "Screens are just the start. We build installations, activations, and environments where people stop being passive and become part of the work itself.",
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
    bg: "linear-gradient(160deg,#1a1a1a 0%,#0d0d0d 100%)",
    accent: "#ffffff",
    svgAssets: [
      "/projects/scribbles/s-04.svg",
      "/projects/scribbles/s-05.svg",
      "/projects/scribbles/s-10.svg",
      "/projects/scribbles/s-11.svg",
      "/projects/scribbles/s-38.svg",
      "/projects/scribbles/s-104.svg",
    ],
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
    quote: "They did not just make us a video. They found the story we had been trying to tell for years, and they told it with a clarity we could not have imagined.",
    name: "Priya S.",
    role: "Brand Director",
    company: "TECFIDES",
  },
  {
    quote: "the Kissa translates complexity into feeling. Before you understand what you have watched, you have already believed it. Our launch campaign surpassed every benchmark we set.",
    name: "Aditya R.",
    role: "Founder",
    company: "NATURA",
  },
  {
    quote: "They built an entire world around our identity — one that felt true to us in ways we had not yet articulated ourselves. That is a rare and remarkable thing.",
    name: "Meera K.",
    role: "Creative Director",
    company: "FYTURE",
  },
  {
    quote: "Professional, fearless, and genuinely joyful to work with. They sense what a story needs before you have found the words to ask for it.",
    name: "Rohan V.",
    role: "Founder",
    company: "LYFSENSE",
  },
];

// ─── Kissa bubble SVG — brand shape (portrait, large radii, sharp left tail) ──
const BUBBLE_PATH =
  "M 95,0 L 205,0 Q 260,0 260,55 L 260,245 Q 260,300 205,300 L 95,300 Q 40,300 40,245 L 40,210 L 0,188 L 40,165 L 40,55 Q 40,0 95,0 Z";
const BUBBLE_VB = "0 0 260 300";

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
  const h = Math.round(size * 300 / 260);
  return (
    <svg
      viewBox={BUBBLE_VB}
      width={size}
      height={h}
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

// ─── Hero cycling headlines ───────────────────────────────────────────────────
// Each line: max ~16 chars so it never wraps at any viewport at this font size
const HERO_LINES = [
  { l1: "We make work",       l2: "people remember." },
  { l1: "Brand. Film.",       l2: "Space. Story." },
  { l1: "A frame. A mark.",   l2: "A story that stays." },
];

// The longest/tallest phrase — used as invisible spacer to lock container height
const HERO_SPACER = { l1: "We make work", l2: "people remember." };

// Three distinct transition styles
const HERO_VARIANTS = [
  // 0 → clip-path wipe up
  {
    initial: { clipPath: "inset(100% 0% 0% 0%)" },
    animate: { clipPath: "inset(0% 0% 0% 0%)" },
    exit:    { clipPath: "inset(0% 0% 100% 0%)" },
    transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
  },
  // 1 → blur fade
  {
    initial: { opacity: 0, filter: "blur(10px)" },
    animate: { opacity: 1, filter: "blur(0px)"  },
    exit:    { opacity: 0, filter: "blur(10px)"  },
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  // 2 → slide up
  {
    initial: { opacity: 0, y: 28  },
    animate: { opacity: 1, y: 0   },
    exit:    { opacity: 0, y: -28 },
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
];

const H1_STYLE: React.CSSProperties = {
  fontFamily: "var(--sans)",
  fontSize: "clamp(40px, 5vw, 80px)",
  lineHeight: 1.08,
  fontWeight: 700,
  letterSpacing: "-0.02em",
  margin: 0,
  color: "var(--fg-on-ink)",
};

function HeroText() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % HERO_LINES.length), 4200);
    return () => clearInterval(t);
  }, []);

  const v = HERO_VARIANTS[idx % HERO_VARIANTS.length];
  const lines = HERO_LINES[idx];

  return (
    <div style={{ position: "relative" }}>
      {/* Invisible spacer — always in DOM, locks container to 2-line height */}
      <h1 aria-hidden style={{ ...H1_STYLE, visibility: "hidden", pointerEvents: "none", userSelect: "none" }}>
        {HERO_SPACER.l1}<br />{HERO_SPACER.l2}
      </h1>
      {/* Animated headline — sits over the spacer */}
      <AnimatePresence mode="wait">
        <motion.h1
          key={idx}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          initial={v.initial as any}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          animate={v.animate as any}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          exit={v.exit as any}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          transition={v.transition as any}
          style={{ ...H1_STYLE, position: "absolute", top: 0, left: 0, right: 0 }}
        >
          {lines.l1}<br />{lines.l2}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}

// ─── ScribbleServicePanel — scribble composition per service tab ──────────────
const SERVICE_COMPOSITIONS = [
  // 01 Story & Brand
  [
    { src: "/projects/scribbles/s-105.svg", size: 200, top: "8%",  left: "10%", rot: -8  },
    { src: "/projects/scribbles/s-11.svg",  size: 130, top: "44%", left: "50%", rot: 15  },
    { src: "/projects/scribbles/s-10.svg",  size: 56,  top: "12%", left: "64%", rot: -20 },
  ],
  // 02 Motion & Film
  [
    { src: "/projects/scribbles/s-04.svg",  size: 210, top: "6%",  left: "8%",  rot: 5   },
    { src: "/projects/scribbles/s-38.svg",  size: 140, top: "44%", left: "46%", rot: -12 },
  ],
  // 03 Digital & Immersive
  [
    { src: "/projects/scribbles/s-138.svg", size: 185, top: "10%", left: "10%", rot: 10  },
    { src: "/projects/scribbles/s-05.svg",  size: 120, top: "46%", left: "48%", rot: -18 },
    { src: "/projects/scribbles/s-104.svg", size: 64,  top: "8%",  left: "62%", rot: 25  },
  ],
];

function ScribbleServicePanel({ index, active }: { index: number; active: boolean }) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const triggered = useRef(false);
  const reduce = useReducedMotion();
  const comp = SERVICE_COMPOSITIONS[index] ?? SERVICE_COMPOSITIONS[0];

  useEffect(() => {
    if (!active || reduce) return;
    triggered.current = false;
  }, [index, active, reduce]);

  useEffect(() => {
    if (!active || triggered.current || reduce) return;
    triggered.current = true;
    const { animate: animeAnimate } = require("animejs");
    comp.forEach((item, i) => {
      const el = itemRefs.current[i];
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = `rotate(${item.rot - 30}deg) scale(0)`;
      animeAnimate(el, {
        opacity:  [0, 0.9],
        scale:    [0, 1],
        rotate:   [`${item.rot - 30}deg`, `${item.rot}deg`],
        duration: 700,
        ease:     "outExpo",
        delay:    60 + i * 110,
      });
    });
  }, [active, reduce, comp]);

  return (
    <div style={{ position: "relative", width: 320, height: 320, flexShrink: 0 }}>
      {comp.map((item, i) => (
        <div
          key={`${index}-${i}`}
          ref={el => { itemRefs.current[i] = el; }}
          style={{
            position:    "absolute",
            top:         item.top,
            left:        item.left,
            width:       item.size,
            height:      item.size,
            opacity:     0,
            transform:   `rotate(${item.rot - 30}deg) scale(0)`,
            filter:      "invert(1)",
            mixBlendMode:"screen",
            willChange:  "transform, opacity",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.src} alt="" width={item.size} height={item.size}
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
        </div>
      ))}
    </div>
  );
}

// ─── ServicesTabbed ───────────────────────────────────────────────────────────
function ServicesTabbed() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  const s = services[active];

  return (
    <section className="section-pad-xl" style={{ background: "var(--ink)", padding: "140px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="services-wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 50px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "center",
              minHeight: 480,
            }}
            className="services-grid"
          >
            {/* Left: illustration with ring */}
            <div className="service-illustration-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ScribbleServicePanel index={active} active={true} />
            </div>

            {/* Right: content */}
            <div style={{ paddingLeft: 16 }}>
              <motion.p
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}
                style={{ fontFamily: "var(--sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}
              >
                {s.num}
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05, ease }}
                style={{ fontFamily: "var(--sans)", fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.05, letterSpacing: "-0.015em", marginBottom: 24 }}
              >
                {s.headline}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1, ease }}
                style={{ fontFamily: "var(--sans)", fontSize: 17, color: "rgba(255,255,255,0.58)", lineHeight: 1.75, marginBottom: 36, maxWidth: "46ch" }}
              >
                {s.body}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.18, ease }}
                style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 52 }}
              >
                {s.tags.map((tag) => (
                  <span key={tag} style={{
                    background: "rgb(28,28,28)",
                    color: "rgba(255,255,255,0.72)",
                    borderRadius: 68,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "8px 18px",
                    fontFamily: "var(--sans)",
                  }}>
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* Dot navigation */}
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                {services.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    style={{
                      height: 13,
                      width: active === i ? 38 : 13,
                      borderRadius: 13,
                      background: active === i ? "#ffffff" : "transparent",
                      border: "1px solid rgba(255,255,255,0.35)",
                      cursor: "pointer",
                      transition: "width 0.3s ease, background 0.3s ease",
                      padding: 0,
                    }}
                    aria-label={`Service ${i + 1}: ${services[i].title}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .services-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
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
    <section className="section-pad-xl" style={{ background: "rgb(28,28,28)", padding: "140px 0" }}>
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
          <div className="testimonial-nav" style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 40 }}>
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

// ─── WorkListSection — pixel.melbourne-style list + floating cursor preview ───
interface Project {
  name: string;
  category: string;
  href: string;
  bg: string;
  accent: string;
  svgAssets?: string[];
}

function ProjectPreviewCard({ project }: { project: Project }) {
  if (project.svgAssets && project.svgAssets.length > 0) {
    const positions = [
      { top: "8%",  left: "10%",  rotate: "-12deg" },
      { top: "12%", right: "8%",  rotate: "8deg"   },
      { top: "40%", left: "5%",   rotate: "18deg"  },
      { top: "38%", right: "5%",  rotate: "-6deg"  },
    ];
    return (
      <>
        {project.svgAssets.slice(0, 4).map((src, si) => {
          const pos = positions[si] || positions[0];
          return (
            <img key={si} src={src} alt=""
              style={{ position: "absolute", width: 60, height: 60, filter: "invert(1)", opacity: 0.9, transform: `rotate(${pos.rotate})`, ...pos }} />
          );
        })}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 65%)" }} />
      </>
    );
  }
  return (
    <>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse 80% 50% at 25% 25%, ${project.accent}40 0%, transparent 70%)` }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "var(--sans)", fontSize: 110, fontWeight: 700, color: "rgba(0,0,0,0.1)", lineHeight: 1, userSelect: "none" }}>
        {project.name[0]}
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 65%)" }} />
    </>
  );
}

function WorkListSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);
  const smoothX = useSpring(mouseX, { damping: 22, stiffness: 200, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 22, stiffness: 200, mass: 0.5 });

  function onMouseMove(e: React.MouseEvent) {
    mouseX.set(e.clientX + 28);
    mouseY.set(e.clientY - 110);
  }

  return (
    <section
      id="work"
      onMouseMove={onMouseMove}
      style={{ background: "rgb(18,18,18)", padding: "120px 0 140px", position: "relative" }}
    >
      {/* Floating cursor preview */}
      {!reduce && (
        <motion.div
          style={{
            position: "fixed",
            left: smoothX,
            top: smoothY,
            width: 260,
            height: 320,
            borderRadius: 16,
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 9998,
          }}
        >
          <AnimatePresence mode="wait">
            {hovered !== null && (
              <motion.div
                key={hovered}
                initial={{ opacity: 0, scale: 0.88, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.88, rotate: 3 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "absolute", inset: 0, background: featuredProjects[hovered].bg, borderRadius: 16 }}
              >
                <ProjectPreviewCard project={featuredProjects[hovered] as Project} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "18px 20px" }}>
                  <p style={{ fontFamily: "var(--sans)", fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>{featuredProjects[hovered].name}</p>
                  <p style={{ fontFamily: "var(--sans)", fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>{featuredProjects[hovered].category}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div className="work-heading-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 72 }}>
          <ClipReveal>
            <h2 style={{ fontFamily: "var(--sans)", fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 700, color: "var(--fg-on-ink)", letterSpacing: "-0.012em", lineHeight: 1.05, marginBottom: 0 }}>
              Selected work.
            </h2>
          </ClipReveal>
          <Link href="/portfolio" style={{ fontFamily: "var(--sans)", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.7)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
            View all work <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Project rows */}
        <div>
          {(featuredProjects as Project[]).map((p, i) => (
            <motion.a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06, ease }}
              onHoverStart={() => !reduce && setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                padding: "32px 0",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                textDecoration: "none",
                cursor: reduce ? "pointer" : "none",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Hover fill bar */}
              <motion.div
                style={{
                  position: "absolute",
                  inset: "0 -8px",
                  background: "rgba(255,255,255,0.03)",
                  scaleX: 0,
                  transformOrigin: "left",
                  borderRadius: 4,
                }}
                animate={{ scaleX: hovered === i ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Number */}
              <span style={{ fontFamily: "var(--sans)", fontSize: 11, color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em", flexShrink: 0, width: 28, position: "relative" }}>
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Name */}
              <motion.span
                animate={{ x: hovered === i && !reduce ? 8 : 0, color: hovered === i ? "#ffffff" : "rgba(255,255,255,0.72)" }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: "clamp(26px, 3.5vw, 52px)",
                  fontWeight: 700,
                  flex: 1,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  position: "relative",
                  display: "block",
                }}
              >
                {p.name}
              </motion.span>

              {/* Category */}
              <span style={{
                fontFamily: "var(--sans)",
                fontSize: 11,
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                flexShrink: 0,
                position: "relative",
              }}>
                {p.category}
              </span>

              {/* Arrow */}
              <motion.div
                animate={{ x: hovered === i ? 0 : -6, opacity: hovered === i ? 1 : 0.3 }}
                transition={{ duration: 0.25, ease }}
                style={{ flexShrink: 0, position: "relative" }}
              >
                <ArrowUpRight size={18} color="#ffffff" />
              </motion.div>
            </motion.a>
          ))}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .work-heading-row { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
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

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);

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

          {/* Hero scribble accents */}
          <ScribbleMark src="/projects/scribbles/s-04.svg"  size={110} rot={-12} delay={800}
            style={{ position: "absolute", bottom: "12%", left: "4%", opacity: 0 }} className="hero-scribble" />
          <ScribbleMark src="/projects/scribbles/s-105.svg" size={80}  rot={18}  delay={1000}
            style={{ position: "absolute", top: "14%", right: "28%", opacity: 0 }} className="hero-scribble" />

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
            <div className="hero-content-col" style={{ maxWidth: "55%" }}>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease, delay: 0.1 }}>
                <p style={{
                  fontFamily: "var(--sans)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: 28,
                }}>A media art agency</p>
              </motion.div>

              <HeroText />

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.7, ease }}
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: 17,
                  color: "var(--fg-on-ink-2)",
                  maxWidth: "36ch",
                  marginTop: 28,
                  lineHeight: 1.6,
                }}
              >
                Brand, film, and space — built to last in memory.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9, ease }}
                style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 40 }}
              >
                <a href="mailto:hello@thekissa.com" className="btn btn-primary">Begin the story</a>
                <a href="#work" className="btn btn-ghost on-ink">See our work</a>
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
        <section className="section-pad-xl" style={{ background: "var(--ink)", padding: "120px 0 100px", borderTop: "1px solid rgba(255,255,255,0.08)", position: "relative", overflow: "hidden" }}>
          {/* Scribble accents — far edges */}
          <ScribbleMark src="/projects/scribbles/s-38.svg"  size={130} rot={-20} delay={200}
            style={{ position: "absolute", top: "8%",  right: "3%", opacity: 0 }} className="statement-scribble" />
          <ScribbleMark src="/projects/scribbles/s-11.svg"  size={90}  rot={12}  delay={350}
            style={{ position: "absolute", bottom: "6%", right: "8%", opacity: 0 }} className="statement-scribble" />
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
                Most work is forgettable.
              </p>
            </ClipReveal>
            <ClipReveal delay={0.2}>
              <p style={{ fontFamily: "var(--sans)", fontSize: "clamp(40px, 5.5vw, 72px)", fontWeight: 700, color: "var(--fg-on-ink)", lineHeight: 1.05, letterSpacing: "-0.012em", margin: 0 }}>
                Ours is not.
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
              We work with brands that have something genuine to say and help them
              say it in a way no one expected. In film, identity, space, and the
              moments between — we make work that earns its place in memory.
            </motion.p>
          </div>
        </section>

        {/* ══ 4. SERVICES — tabbed ══════════════════════════════════════════════ */}
        <ServicesTabbed />

        {/* ══ 5. SELECTED WORK ══════════════════════════════════════════════════ */}
        <WorkListSection />

        {/* ══ 6. CLIENT LOGOS STRIP (MAD pattern) ══════════════════════════════ */}
        <ClientLogosStrip />

        {/* ══ 7. TESTIMONIALS — slideshow (MAD pattern) ════════════════════════ */}
        <TestimonialsSlider />

        {/* ══ 8. STATS — 3D bubble grid ═════════════════════════════════════════ */}
        <BubbleGrid />

        {/* ══ 9. CTA BANNER — MAD bordered box ════════════════════════════════ */}
        <section className="section-pad-lg" style={{ background: "#000000", padding: "100px 0" }}>
          <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 50px" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="cta-inner"
              style={{
                border: "0.666px solid rgba(255,255,255,1)",
                borderRadius: 20,
                padding: "67px 60px",
                display: "flex",
                alignItems: "center",
                gap: 60,
                flexWrap: "wrap",
              }}
            >
              {/* Scribble + orbit cluster */}
              {/* Text + CTA */}
              <div style={{ flex: 1, minWidth: 280 }}>
                <h2 style={{
                  fontFamily: "var(--sans)",
                  fontSize: "clamp(28px, 4vw, 36px)",
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.15,
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}>
                  Something worth<br />making starts here.
                </h2>
                <p style={{ fontFamily: "var(--sans)", fontSize: 15, color: "rgba(255,255,255,0.55)", marginBottom: 36, lineHeight: 1.6 }}>
                  We take on work we believe in. If you have a project that deserves
                  real craft behind it, write to us.
                </p>
                <div className="cta-buttons" style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                  <a
                    href="mailto:hello@thekissa.com"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 30px", background: "#ffffff", color: "#000000", borderRadius: 68, fontFamily: "var(--sans)", fontWeight: 700, fontSize: 14, textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase", transition: "background 0.2s ease, transform 0.2s ease" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.88)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#ffffff"; (e.currentTarget as HTMLAnchorElement).style.transform = ""; }}
                  >
                    Begin the story <ArrowUpRight size={14} />
                  </a>
                  <a
                    href="mailto:hello@thekissa.com"
                    style={{ fontFamily: "var(--sans)", fontSize: 14, color: "rgba(255,255,255,0.55)", textDecoration: "none", letterSpacing: "0.02em", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#ffffff")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)")}
                  >
                    hello@thekissa.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
