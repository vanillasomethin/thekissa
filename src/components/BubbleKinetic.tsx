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
    gsap.to(el, {
      rotateY: x * 18,
      rotateX: -y * 12,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1,0.6)",
    });
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ transformStyle: "preserve-3d", ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}

// ─── Scroll-bursting bubble field ─────────────────────────────────────────────
// Bubbles shoot in from off-screen on scroll entrance
export function BurstBubbles({ count = 6 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !containerRef.current) return;
    const bubbles = containerRef.current.querySelectorAll<HTMLElement>(".burst-bubble");

    gsap.fromTo(
      bubbles,
      {
        scale: 0,
        opacity: 0,
        rotate: () => gsap.utils.random(-45, 45),
        x: () => gsap.utils.random(-300, 300),
        y: () => gsap.utils.random(-200, 200),
      },
      {
        scale: 1,
        opacity: 1,
        rotate: () => gsap.utils.random(-15, 15),
        x: 0,
        y: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [reduce]);

  const configs = [
    { size: 180, x: "8%",  y: "5%",  fill: "rgba(255,255,255,0.08)", stroke: "none" },
    { size: 120, x: "72%", y: "3%",  fill: "none", stroke: "rgba(255,255,255,0.25)" },
    { size: 90,  x: "52%", y: "60%", fill: "rgba(255,255,255,0.05)", stroke: "rgba(255,255,255,0.15)" },
    { size: 60,  x: "85%", y: "55%", fill: "none", stroke: "rgba(255,255,255,0.2)" },
    { size: 50,  x: "20%", y: "68%", fill: "rgba(255,255,255,0.06)", stroke: "none" },
    { size: 40,  x: "40%", y: "15%", fill: "none", stroke: "rgba(255,255,255,0.15)" },
  ].slice(0, count);

  return (
    <div ref={containerRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {configs.map((c, i) => (
        <div
          key={i}
          className="burst-bubble"
          style={{
            position: "absolute",
            left: c.x,
            top: c.y,
          }}
        >
          <svg
            viewBox="0 0 220 200"
            width={c.size}
            height={c.size}
            fill={c.fill}
            stroke={c.stroke}
            strokeWidth={2}
            strokeLinejoin="round"
          >
            <path d={BUBBLE_PATH} />
          </svg>
        </div>
      ))}
    </div>
  );
}

// ─── Horizontal scroll typewriter words with bubble icons ─────────────────────
const WORDS = [
  "STORY",
  "FILM",
  "BRAND",
  "MOTION",
  "IDENTITY",
  "EXPERIENCE",
  "DIRECTION",
  "WORLD",
];

export function KineticWordReel() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-38%"]);

  return (
    <section
      ref={ref}
      style={{
        background: "#0a0a0a",
        padding: "80px 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <motion.div
        style={{ x: reduce ? 0 : x, display: "flex", alignItems: "center", gap: 40, whiteSpace: "nowrap" }}
      >
        {[...WORDS, ...WORDS].map((w, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 28, flexShrink: 0 }}>
            <span
              style={{
                fontFamily: "var(--serif-display)",
                fontSize: "clamp(64px, 9vw, 120px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1,
                color: i % 3 === 0 ? "#ffffff" : "transparent",
                WebkitTextStroke: i % 3 === 0 ? "0" : "1.5px rgba(255,255,255,0.45)",
              }}
            >
              {w}
            </span>
            <svg
              viewBox="0 0 220 200"
              width={44}
              height={44}
              fill={i % 2 === 0 ? "rgba(255,255,255,0.12)" : "none"}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth={2}
              strokeLinejoin="round"
              style={{ flexShrink: 0 }}
            >
              <path d={BUBBLE_PATH} />
            </svg>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── Big reveal: staggered 3D-perspective bubbles forming a grid ──────────────
export function BubbleGrid() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || !containerRef.current) return;
    const items = containerRef.current.querySelectorAll<HTMLElement>(".bg-item");

    gsap.fromTo(
      items,
      { opacity: 0, scale: 0.4, rotateY: -80, z: -200 },
      {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        z: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: { each: 0.07, from: "center" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        clearProps: "rotateY,z",
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [reduce]);

  const items = [
    { label: "23+", sub: "Brands", size: 200, filled: true },
    { label: "200M+", sub: "Views", size: 160, filled: false },
    { label: "55%", sub: "Visual", size: 140, filled: true },
    { label: "1", sub: "Story", size: 110, filled: false },
    { label: "5★", sub: "Avg rating", size: 130, filled: true },
    { label: "6+", sub: "Markets", size: 150, filled: false },
  ];

  return (
    <section
      style={{
        background: "#111111",
        padding: "120px 0",
        overflow: "hidden",
      }}
    >
      <div
        className="wrap"
        style={{ maxWidth: 1100, margin: "0 auto", perspective: "1200px" }}
      >
        <div
          ref={containerRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 40,
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-item"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                transformStyle: "preserve-3d",
              }}
            >
              <div style={{ position: "relative", display: "inline-block" }}>
                <svg
                  viewBox="0 0 220 200"
                  width={item.size}
                  height={item.size}
                  fill={item.filled ? "rgba(255,255,255,0.07)" : "none"}
                  stroke={item.filled ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.3)"}
                  strokeWidth={2}
                  strokeLinejoin="round"
                >
                  <path d={BUBBLE_PATH} />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    top: "40%",
                    left: "58%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--serif-display)",
                      fontSize: `clamp(${Math.round(item.size * 0.18)}px, ${item.size * 0.025}vw, ${Math.round(item.size * 0.28)}px)`,
                      fontWeight: 700,
                      color: "#ffffff",
                      lineHeight: 1,
                      margin: 0,
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 10,
                      color: "rgba(255,255,255,0.55)",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      margin: "5px 0 0",
                    }}
                  >
                    {item.sub}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Responsive: 2 cols on mobile */}
        <style>{`
          @media (max-width: 700px) {
            .bubble-grid-inner { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

// ─── Single large kinetic bubble with text inside, mouse-tracking ─────────────
export function HeroBubbleMagnetic({
  size = 340,
  text,
  sub,
}: {
  size?: number;
  text: string;
  sub: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    gsap.to(ref.current, {
      x: dx * 22,
      y: dy * 14,
      rotateY: dx * 20,
      rotateX: -dy * 14,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 700,
    });
  }

  function onLeave() {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        display: "inline-block",
        transformStyle: "preserve-3d",
        cursor: "default",
        position: "relative",
      }}
    >
      <svg
        viewBox="0 0 220 200"
        width={size}
        height={size}
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth={1.5}
        strokeLinejoin="round"
        style={{
          filter: "drop-shadow(0 0 40px rgba(255,255,255,0.08))",
          display: "block",
        }}
      >
        <path d={BUBBLE_PATH} />
      </svg>
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "58%",
          transform: "translate(-50%, -50%) translateZ(30px)",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            fontFamily: "var(--serif-display)",
            fontSize: `${Math.round(size * 0.17)}px`,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1,
            margin: 0,
            letterSpacing: "-0.025em",
          }}
        >
          {text}
        </p>
        <p
          style={{
            fontFamily: "var(--mono)",
            fontSize: Math.round(size * 0.046),
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            margin: "8px 0 0",
          }}
        >
          {sub}
        </p>
      </div>
    </div>
  );
}
