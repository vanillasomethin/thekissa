"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ease = [0.22, 1, 0.36, 1] as const;
const BUBBLE_PATH =
  "M 68,0 L 196,0 Q 220,0 220,24 L 220,176 Q 220,200 196,200 L 68,200 Q 40,200 40,176 L 40,135 L 0,115 L 40,78 L 40,24 Q 40,0 68,0 Z";

// ─── Perspective-3D card wrapper ──────────────────────────────────────────────
export function Card3D({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, { rotateY: x * 14, rotateX: -y * 10, scale: 1.02, duration: 0.4, ease: "power2.out", transformPerspective: 900 });
  }

  function onLeave() {
    if (!ref.current) return;
    gsap.to(ref.current, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.6, ease: "elastic.out(1,0.6)" });
  }

  return (
    <div ref={ref} className={className} style={{ transformStyle: "preserve-3d", ...style }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

// ─── Decorative bubble field (hero / CTA background) ──────────────────────────
export function BurstBubbles({ count = 5 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !containerRef.current) return;
    const bubbles = containerRef.current.querySelectorAll<HTMLElement>(".burst-bubble");
    gsap.fromTo(
      bubbles,
      { scale: 0, opacity: 0, rotate: () => gsap.utils.random(-40, 40), x: () => gsap.utils.random(-200, 200), y: () => gsap.utils.random(-150, 150) },
      {
        scale: 1, opacity: 1, rotate: () => gsap.utils.random(-12, 12), x: 0, y: 0,
        duration: 1.1, ease: "expo.out", stagger: 0.07,
        scrollTrigger: { trigger: containerRef.current, start: "top 78%", toggleActions: "play none none reverse" },
      }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [reduce]);

  const configs = [
    { size: 160, x: "8%",  y: "8%",  fill: "rgba(255,255,255,0.06)", stroke: "none" },
    { size: 110, x: "74%", y: "5%",  fill: "none", stroke: "rgba(255,255,255,0.18)" },
    { size: 80,  x: "54%", y: "62%", fill: "rgba(255,255,255,0.04)", stroke: "rgba(255,255,255,0.12)" },
    { size: 55,  x: "86%", y: "52%", fill: "none", stroke: "rgba(255,255,255,0.16)" },
    { size: 44,  x: "22%", y: "70%", fill: "rgba(255,255,255,0.05)", stroke: "none" },
  ].slice(0, count);

  return (
    <div ref={containerRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {configs.map((c, i) => (
        <div key={i} className="burst-bubble" style={{ position: "absolute", left: c.x, top: c.y }}>
          <svg viewBox="0 0 220 200" width={c.size} height={c.size} fill={c.fill} stroke={c.stroke} strokeWidth={1.5} strokeLinejoin="round">
            <path d={BUBBLE_PATH} />
          </svg>
        </div>
      ))}
    </div>
  );
}

// ─── Kinetic word reel — scroll-driven, single font ───────────────────────────
const WORDS = ["STORY", "FILM", "BRAND", "MOTION", "IDENTITY", "EXPERIENCE", "DIRECTION", "WORLD"];

export function KineticWordReel() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);

  return (
    <section ref={ref} style={{ background: "#0a0a0a", padding: "68px 0", overflow: "hidden" }}>
      <motion.div style={{ x: reduce ? 0 : x, display: "flex", alignItems: "center", gap: 38, whiteSpace: "nowrap" }}>
        {[...WORDS, ...WORDS].map((w, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 24, flexShrink: 0 }}>
            <span style={{
              fontFamily: "var(--sans)",
              fontSize: "clamp(56px, 8vw, 108px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              color: i % 3 === 0 ? "#ffffff" : "transparent",
              WebkitTextStroke: i % 3 === 0 ? "0" : "1.5px rgba(255,255,255,0.35)",
            }}>
              {w}
            </span>
            {/* Minimal bullet separator — no extra bubble icons */}
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.2)", flexShrink: 0, display: "inline-block" }} />
          </div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── Stats grid — MAD style clean cards, no bubbles ───────────────────────────
const STATS = [
  { value: "23+",  label: "Brands launched" },
  { value: "200M+", label: "Views generated" },
  { value: "55%",  label: "First-impression lift" },
  { value: "6+",   label: "Markets served" },
];

export function BubbleGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !containerRef.current) return;
    const cards = containerRef.current.querySelectorAll<HTMLElement>(".stat-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: "expo.out",
        stagger: { each: 0.1, from: "start" },
        scrollTrigger: { trigger: containerRef.current, start: "top 72%", toggleActions: "play none none none" },
      }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [reduce]);

  return (
    <section style={{ background: "#000000", padding: "100px 0", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section label */}
        <p style={{
          fontFamily: "var(--sans)",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
          marginBottom: 50,
        }}>
          By the numbers
        </p>

        {/* 4-column stat grid */}
        <div
          ref={containerRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className="stat-card"
              style={{
                background: i % 2 === 0 ? "#1c1c1c" : "#000000",
                padding: "53px 38px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <p style={{
                fontFamily: "var(--sans)",
                fontSize: "clamp(40px, 4.5vw, 68px)",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1,
                margin: 0,
                letterSpacing: "-0.02em",
              }}>
                {s.value}
              </p>
              <p style={{
                fontFamily: "var(--sans)",
                fontSize: 14,
                fontWeight: 400,
                color: "rgba(255,255,255,0.45)",
                margin: 0,
                lineHeight: 1.4,
              }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 680px) {
            .stat-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
