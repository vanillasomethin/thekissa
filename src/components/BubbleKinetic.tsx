"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ease = [0.22, 1, 0.36, 1] as const;
// Brand bubble: portrait, large corner radii, sharp left-pointing tail
const BUBBLE_PATH =
  "M 95,0 L 205,0 Q 260,0 260,55 L 260,245 Q 260,300 205,300 L 95,300 Q 40,300 40,245 L 40,210 L 0,188 L 40,165 L 40,55 Q 40,0 95,0 Z";
const BUBBLE_VIEWBOX = "0 0 260 300";

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
          <svg viewBox={BUBBLE_VIEWBOX} width={c.size} height={Math.round(c.size * 300/260)} fill={c.fill} stroke={c.stroke} strokeWidth={1.5} strokeLinejoin="round">
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

// ─── Stats grid — MAD 2×2 large cards ────────────────────────────────────────
const STATS = [
  { value: "23+",   label: "Brands launched",        sub: "across 6 markets" },
  { value: "200M+", label: "Views generated",         sub: "organic & paid" },
  { value: "55%",   label: "First-impression lift",   sub: "average across clients" },
  { value: "6+",    label: "Markets served",          sub: "Nairobi · Dubai · London" },
];

export function BubbleGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !containerRef.current) return;
    const cards = containerRef.current.querySelectorAll<HTMLElement>(".stat-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "expo.out",
        stagger: { each: 0.12, from: "start" },
        scrollTrigger: { trigger: containerRef.current, start: "top 72%", toggleActions: "play none none none" },
      }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [reduce]);

  return (
    <section className="section-pad-lg" style={{ background: "#000000", padding: "100px 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 50px" }}>
        <div
          ref={containerRef}
          className="grid-stats"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 5,
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className="stat-card"
              style={{
                background: "rgb(28,28,28)",
                borderRadius: 20,
                padding: "53px 47px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                minHeight: 280,
              }}
            >
              <p style={{
                fontFamily: "var(--sans)",
                fontSize: "clamp(52px, 6vw, 80px)",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1,
                margin: "0 0 12px",
                letterSpacing: "-0.03em",
              }}>
                {s.value}
              </p>
              <p style={{
                fontFamily: "var(--sans)",
                fontSize: 15,
                fontWeight: 600,
                color: "rgba(255,255,255,0.8)",
                margin: "0 0 6px",
              }}>
                {s.label}
              </p>
              <p style={{
                fontFamily: "var(--sans)",
                fontSize: 13,
                color: "rgba(255,255,255,0.35)",
                margin: 0,
              }}>
                {s.sub}
              </p>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 600px) {
            .stat-card { min-height: 200px !important; padding: 32px 28px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
