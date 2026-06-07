"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
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
  rot?: number;
  delay?: number;
}
function ScribbleMark({ src, size = 80, style, rot = 0, delay = 0 }: ScribbleMarkProps) {
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        const { animate: animeAnimate } = require("animejs");
        animeAnimate(el, {
          opacity:   [0, 1],
          scale:     [0, 1],
          rotate:    [`${rot - 35}deg`, `${rot}deg`],
          duration:  800,
          ease:      "outExpo",
          delay,
        });
        // slow drift after entrance
        animeAnimate(el, {
          translateY: [0, -8, 0],
          duration:   4000,
          ease:       "inOutSine",
          loop:       true,
          delay:      delay + 900,
        });
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [rot, delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: `rotate(${rot - 35}deg) scale(0)`,
        width: size,
        height: size,
        filter: "invert(1)",
        mixBlendMode: "screen",
        pointerEvents: "none",
        flexShrink: 0,
        ...style,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" width={size} height={size} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
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

// ─── CTA orbit mark — anime.js driven spinning rings ──────────────────────────
function CTAOrbitMark() {
  const outerRef = useRef<SVGGElement>(null);
  const innerRef = useRef<SVGGElement>(null);
  const dotRef   = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!outerRef.current || !innerRef.current || !dotRef.current) return;
    const { animate: animeAnimate } = require("animejs");
    animeAnimate(outerRef.current, { rotate: "360deg", duration: 12000, ease: "linear", loop: true });
    animeAnimate(innerRef.current, { rotate: "-360deg", duration: 7000, ease: "linear", loop: true });
    animeAnimate(dotRef.current, { rotate: "360deg", duration: 4500, ease: "linear", loop: true });
  }, []);

  const size = 160;
  const cx = size / 2, cy = size / 2;

  return (
    <div style={{ flexShrink: 0, width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} fill="none">
        {/* Outer static ring */}
        <circle cx={cx} cy={cy} r={70} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        {/* Outer spinning ring with dash */}
        <g ref={outerRef} style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <circle cx={cx} cy={cy} r={70} stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"
            strokeDasharray="14 8" strokeLinecap="round" />
        </g>
        {/* Inner ring counter-spin */}
        <g ref={innerRef} style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <circle cx={cx} cy={cy} r={46} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"
            strokeDasharray="6 10" strokeLinecap="round" />
        </g>
        {/* Orbiting dot */}
        <g ref={dotRef} style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <circle cx={cx} cy={cy - 70} r={5} fill="#ffffff" />
          <circle cx={cx} cy={cy + 46} r={3} fill="rgba(255,255,255,0.5)" />
        </g>
        {/* Centre cross */}
        <line x1={cx - 10} y1={cy} x2={cx + 10} y2={cy} stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1={cx} y1={cy - 10} x2={cx} y2={cy + 10} stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={3} fill="rgba(255,255,255,0.9)" />
      </svg>
    </div>
  );
}

// ─── Hero orbit mark — large, right-column background ornament ────────────────
function HeroOrbitMark() {
  const r1Ref = useRef<SVGGElement>(null);
  const r2Ref = useRef<SVGGElement>(null);
  const r3Ref = useRef<SVGGElement>(null);
  const dotRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!r1Ref.current) return;
    const { animate: animeAnimate } = require("animejs");
    animeAnimate(r1Ref.current, { rotate: "360deg",  duration: 28000, ease: "linear", loop: true });
    animeAnimate(r2Ref.current, { rotate: "-360deg", duration: 18000, ease: "linear", loop: true });
    animeAnimate(r3Ref.current, { rotate: "360deg",  duration: 10000, ease: "linear", loop: true });
    animeAnimate(dotRef.current, { rotate: "360deg", duration: 6000,  ease: "linear", loop: true });
  }, []);

  const size = 560, cx = 280, cy = 280;
  return (
    <div style={{ position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", zIndex: 0, opacity: 0.65 }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} fill="none">
        {/* Static ghost rings */}
        <circle cx={cx} cy={cy} r={240} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={170} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={100} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        {/* Animated rings */}
        <g ref={r1Ref} style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <circle cx={cx} cy={cy} r={240} stroke="rgba(255,255,255,0.18)" strokeWidth="1"
            strokeDasharray="36 18" strokeLinecap="round" />
        </g>
        <g ref={r2Ref} style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <circle cx={cx} cy={cy} r={170} stroke="rgba(255,255,255,0.12)" strokeWidth="1"
            strokeDasharray="20 16" strokeLinecap="round" />
        </g>
        <g ref={r3Ref} style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <circle cx={cx} cy={cy} r={100} stroke="rgba(255,255,255,0.1)" strokeWidth="1"
            strokeDasharray="10 18" strokeLinecap="round" />
        </g>
        {/* Orbiting dots */}
        <g ref={dotRef} style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <circle cx={cx} cy={cy - 240} r={6} fill="rgba(255,255,255,0.7)" />
          <circle cx={cx} cy={cy + 170} r={4} fill="rgba(255,255,255,0.4)" />
          <circle cx={cx + 100} cy={cy} r={3} fill="rgba(255,255,255,0.3)" />
        </g>
        {/* Centre */}
        <line x1={cx - 12} y1={cy} x2={cx + 12} y2={cy} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1={cx} y1={cy - 12} x2={cx} y2={cy + 12} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={4} fill="rgba(255,255,255,0.5)" />
      </svg>
    </div>
  );
}

// ─── Statement draw mark — stroke-dashoffset reveal on scroll ─────────────────
function StatementMark() {
  const c1Ref = useRef<SVGCircleElement>(null);
  const c2Ref = useRef<SVGCircleElement>(null);
  const lRef  = useRef<SVGLineElement>(null);
  const inView = useRef(false);

  useEffect(() => {
    const c1 = c1Ref.current, c2 = c2Ref.current, l = lRef.current;
    if (!c1 || !c2 || !l) return;
    const circ1 = 2 * Math.PI * 50;
    const circ2 = 2 * Math.PI * 30;
    const lineLen = 80;
    c1.style.strokeDasharray = String(circ1);
    c1.style.strokeDashoffset = String(circ1);
    c2.style.strokeDasharray = String(circ2);
    c2.style.strokeDashoffset = String(circ2);
    l.style.strokeDasharray = String(lineLen);
    l.style.strokeDashoffset = String(lineLen);

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !inView.current) {
        inView.current = true;
        const { animate: animeAnimate } = require("animejs");
        animeAnimate([c1, c2], { strokeDashoffset: [null, 0], duration: 1200, ease: "outQuart", delay: (_el: Element, i: number) => i * 180 });
        animeAnimate(l, { strokeDashoffset: [null, 0], duration: 900, ease: "outQuart", delay: 300 });
      }
    }, { threshold: 0.4 });
    obs.observe(c1.closest("div")!);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ width: 120, height: 120, flexShrink: 0 }}>
      <svg viewBox="0 0 120 120" width={120} height={120} fill="none">
        {/* Ghost */}
        <circle cx={60} cy={60} r={50} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        <circle cx={60} cy={60} r={30} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        {/* Draw-on circles */}
        <circle ref={c1Ref} cx={60} cy={60} r={50} stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" />
        <circle ref={c2Ref} cx={60} cy={60} r={30} stroke="rgba(255,255,255,0.28)" strokeWidth="1"   strokeLinecap="round" />
        {/* Diagonal draw-on line */}
        <line ref={lRef} x1={28} y1={28} x2={92} y2={92} stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Centre dot */}
        <circle cx={60} cy={60} r={3} fill="rgba(255,255,255,0.85)" />
      </svg>
    </div>
  );
}

// ─── Work draw mark — bracket + arc draw-on ───────────────────────────────────
function WorkMark() {
  const arcRef = useRef<SVGPathElement>(null);
  const b1Ref  = useRef<SVGPathElement>(null);
  const b2Ref  = useRef<SVGPathElement>(null);
  const inView = useRef(false);

  useEffect(() => {
    const arc = arcRef.current, b1 = b1Ref.current, b2 = b2Ref.current;
    if (!arc || !b1 || !b2) return;
    const arcLen = arc.getTotalLength();
    const b1Len  = b1.getTotalLength();
    const b2Len  = b2.getTotalLength();
    arc.style.strokeDasharray = String(arcLen);
    arc.style.strokeDashoffset = String(arcLen);
    b1.style.strokeDasharray = String(b1Len);
    b1.style.strokeDashoffset = String(b1Len);
    b2.style.strokeDasharray = String(b2Len);
    b2.style.strokeDashoffset = String(b2Len);

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !inView.current) {
        inView.current = true;
        const { animate: animeAnimate } = require("animejs");
        animeAnimate(arc, { strokeDashoffset: [null, 0], duration: 1000, ease: "outQuart" });
        animeAnimate([b1, b2], { strokeDashoffset: [null, 0], duration: 700, ease: "outQuart", delay: (_el: Element, i: number) => 250 + i * 100 });
      }
    }, { threshold: 0.4 });
    obs.observe(arc.closest("div")!);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ width: 72, height: 72, flexShrink: 0 }}>
      <svg viewBox="0 0 72 72" width={72} height={72} fill="none">
        {/* Ghost arc */}
        <path d="M 36,8 A 28,28 0 1,1 35.99,8" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        {/* Draw-on arc */}
        <path ref={arcRef} d="M 36,8 A 28,28 0 1,1 35.99,8" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Left bracket */}
        <path ref={b1Ref} d="M 22,22 L 14,36 L 22,50" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Right bracket */}
        <path ref={b2Ref} d="M 50,22 L 58,36 L 50,50" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx={36} cy={36} r={3} fill="rgba(255,255,255,0.8)" />
      </svg>
    </div>
  );
}

// ─── Service illustrations ─────────────────────────────────────────────────────

// 01 Story & Brand — open book with a speech bubble emerging from the pages
const IllustrationBrand = () => (
  <svg viewBox="0 0 280 280" width="100%" height="100%" fill="none">
    <defs>
      <linearGradient id="page-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
      </linearGradient>
    </defs>

    {/* Left book page */}
    <path d="M50,68 Q50,58 60,58 L132,58 L132,210 Q88,202 60,212 Q50,215 50,205 Z"
      fill="url(#page-grad)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Right book page */}
    <path d="M230,68 Q230,58 220,58 L148,58 L148,210 Q192,202 220,212 Q230,215 230,205 Z"
      fill="url(#page-grad)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Spine */}
    <line x1="140" y1="58" x2="140" y2="210" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

    {/* Text lines on left page */}
    <line x1="68" y1="90"  x2="124" y2="90"  stroke="rgba(255,255,255,0.35)" strokeWidth="2"   strokeLinecap="round" />
    <line x1="68" y1="106" x2="118" y2="106" stroke="rgba(255,255,255,0.2)"  strokeWidth="1.5" strokeLinecap="round" />
    <line x1="68" y1="119" x2="124" y2="119" stroke="rgba(255,255,255,0.2)"  strokeWidth="1.5" strokeLinecap="round" />
    <line x1="68" y1="132" x2="110" y2="132" stroke="rgba(255,255,255,0.2)"  strokeWidth="1.5" strokeLinecap="round" />
    <line x1="68" y1="152" x2="124" y2="152" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="68" y1="165" x2="100" y2="165" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />

    {/* Right page — identity / logo placeholder */}
    {/* Abstract mark: two intersecting lines + circle */}
    <circle cx="188" cy="108" r="28" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
    <circle cx="188" cy="108" r="14" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
    <line x1="170" y1="90" x2="206" y2="126" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="206" y1="90" x2="170" y2="126" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />

    {/* Right page text lines */}
    <line x1="156" y1="152" x2="220" y2="152" stroke="rgba(255,255,255,0.2)"  strokeWidth="1.5" strokeLinecap="round" />
    <line x1="156" y1="165" x2="210" y2="165" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="156" y1="178" x2="220" y2="178" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="156" y1="191" x2="195" y2="191" stroke="rgba(255,255,255,0.1)"  strokeWidth="1.5" strokeLinecap="round" />

    {/* Bookmark ribbon */}
    <path d="M210,58 L210,80 L203,72 L196,80 L196,58 Z" fill="rgba(255,255,255,0.6)" />

    {/* Floating accent dots */}
    <circle cx="42"  cy="50"  r="5" fill="rgba(255,255,255,0.18)" />
    <circle cx="242" cy="228" r="7" fill="rgba(255,255,255,0.12)" />
    <circle cx="28"  cy="180" r="3" fill="rgba(255,255,255,0.22)" />
  </svg>
);

// 02 Motion & Film — vintage cine camera in 3/4 view
const IllustrationFilm = () => (
  <svg viewBox="0 0 280 280" width="100%" height="100%" fill="none">
    <defs>
      <linearGradient id="cam-body" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.16)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
      </linearGradient>
    </defs>

    {/* Camera body */}
    <rect x="60" y="92" width="160" height="108" rx="14"
      fill="url(#cam-body)" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />

    {/* Top detail strip */}
    <rect x="60" y="92" width="160" height="22" rx="14"
      fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
    <rect x="74" y="114" width="132" height="1" stroke="none" fill="rgba(255,255,255,0.15)" />

    {/* Lens housing — large circle */}
    <circle cx="130" cy="158" r="44" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
    <circle cx="130" cy="158" r="33" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
    <circle cx="130" cy="158" r="20" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
    <circle cx="130" cy="158" r="7"  fill="rgba(255,255,255,0.85)" />
    {/* Lens highlight */}
    <circle cx="120" cy="148" r="4" fill="rgba(255,255,255,0.3)" />

    {/* Aperture blades suggestion */}
    <line x1="130" y1="125" x2="130" y2="114" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
    <line x1="130" y1="191" x2="130" y2="202" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
    <line x1="97"  y1="158" x2="86"  y2="158" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
    <line x1="163" y1="158" x2="174" y2="158" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />

    {/* Viewfinder */}
    <rect x="182" y="108" width="28" height="20" rx="4"
      fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
    <line x1="182" y1="118" x2="210" y2="118" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

    {/* Right-side film door detail */}
    <rect x="200" y="128" width="20" height="56" rx="6"
      fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
    <circle cx="210" cy="157" r="5" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

    {/* Shutter button */}
    <circle cx="76" cy="90" r="10" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
    <circle cx="76" cy="90" r="5"  fill="rgba(255,255,255,0.7)" />

    {/* Film strip emerging bottom */}
    <rect x="82"  y="200" width="14" height="38" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
    <rect x="106" y="200" width="14" height="38" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
    <rect x="130" y="200" width="14" height="38" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
    <rect x="88"  y="203" width="2"  height="6"  rx="1" fill="rgba(255,255,255,0.4)" />
    <rect x="112" y="203" width="2"  height="6"  rx="1" fill="rgba(255,255,255,0.4)" />
    <rect x="136" y="203" width="2"  height="6"  rx="1" fill="rgba(255,255,255,0.4)" />
    <rect x="88"  y="226" width="2"  height="6"  rx="1" fill="rgba(255,255,255,0.4)" />
    <rect x="112" y="226" width="2"  height="6"  rx="1" fill="rgba(255,255,255,0.4)" />
    <rect x="136" y="226" width="2"  height="6"  rx="1" fill="rgba(255,255,255,0.4)" />

    {/* REC badge */}
    <rect x="74" y="132" width="36" height="16" rx="4" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
    <circle cx="82" cy="140" r="3" fill="white" opacity="0.9" />
    <text x="90" y="140" dominantBaseline="middle" fontFamily="var(--sans)" fontSize="7" fontWeight="700" fill="rgba(255,255,255,0.8)" letterSpacing="0.08em">REC</text>

    {/* Floating dots */}
    <circle cx="44"  cy="110" r="4" fill="rgba(255,255,255,0.15)" />
    <circle cx="244" cy="96"  r="6" fill="rgba(255,255,255,0.1)"  />
    <circle cx="240" cy="230" r="3" fill="rgba(255,255,255,0.2)"  />
  </svg>
);

// 03 Digital & Immersive — browser window with layered UI cards
const IllustrationDigital = () => (
  <svg viewBox="0 0 280 280" width="100%" height="100%" fill="none">
    <defs>
      <linearGradient id="win-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
      </linearGradient>
    </defs>

    {/* Browser window */}
    <rect x="44" y="56" width="192" height="158" rx="12"
      fill="url(#win-grad)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />

    {/* Browser chrome bar */}
    <rect x="44" y="56" width="192" height="32" rx="12"
      fill="rgba(255,255,255,0.08)" />
    <rect x="44" y="76" width="192" height="12" fill="rgba(255,255,255,0.04)" />

    {/* Traffic lights */}
    <circle cx="64" cy="72" r="5" fill="rgba(255,255,255,0.55)" />
    <circle cx="80" cy="72" r="5" fill="rgba(255,255,255,0.3)"  />
    <circle cx="96" cy="72" r="5" fill="rgba(255,255,255,0.15)" />

    {/* URL bar */}
    <rect x="112" y="64" width="96" height="16" rx="8"
      fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
    <text x="160" y="72" textAnchor="middle" dominantBaseline="middle"
      fontFamily="var(--sans)" fontSize="6" fill="rgba(255,255,255,0.4)" letterSpacing="0.04em">thekissa.com</text>

    {/* Hero image area */}
    <rect x="52" y="96" width="172" height="58" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
    {/* Hero image content lines */}
    <rect x="62" y="108" width="80" height="10" rx="3" fill="rgba(255,255,255,0.2)" />
    <rect x="62" y="124" width="56" height="7"  rx="3" fill="rgba(255,255,255,0.1)" />
    <rect x="178" y="104" width="36" height="44" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
    {/* Mini kissa bubble in hero */}
    <path d="M181,108 L207,108 Q212,108 212,113 L212,138 Q212,143 207,143 L181,143 Q176,143 176,138 L176,132 L170,128 L176,124 L176,113 Q176,108 181,108 Z"
      fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />

    {/* Two card row */}
    <rect x="52"  y="162" width="80" height="44" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
    <rect x="140" y="162" width="84" height="44" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

    {/* Card 1 content */}
    <circle cx="66" cy="176" r="8" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
    <rect x="80" y="172" width="44" height="6"  rx="2" fill="rgba(255,255,255,0.2)" />
    <rect x="80" y="182" width="36" height="5"  rx="2" fill="rgba(255,255,255,0.1)" />
    <rect x="58" y="192" width="66" height="5"  rx="2" fill="rgba(255,255,255,0.08)" />
    <rect x="58" y="200" width="50" height="5"  rx="2" fill="rgba(255,255,255,0.06)" />

    {/* Card 2 content */}
    <rect x="148" y="170" width="68" height="6"  rx="2" fill="rgba(255,255,255,0.2)" />
    <rect x="148" y="180" width="52" height="5"  rx="2" fill="rgba(255,255,255,0.1)" />
    <rect x="148" y="192" width="60" height="5"  rx="2" fill="rgba(255,255,255,0.08)" />
    <rect x="148" y="200" width="40" height="12" rx="6" fill="rgba(255,255,255,0.18)" />
    <text x="168" y="206" textAnchor="middle" dominantBaseline="middle"
      fontFamily="var(--sans)" fontSize="5" fontWeight="700" fill="rgba(255,255,255,0.8)" letterSpacing="0.06em">VIEW</text>

    {/* Floating layers behind — depth */}
    <rect x="34" y="72" width="192" height="158" rx="12"
      fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    <rect x="24" y="88" width="192" height="158" rx="12"
      fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

    {/* Cursor */}
    <g transform="translate(192,148)">
      <path d="M0,0 L0,18 L4,14 L7,20 L9,19 L6,13 L11,13 Z"
        fill="white" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" opacity="0.85" />
    </g>

    {/* Floating dots */}
    <circle cx="36"  cy="56"  r="4" fill="rgba(255,255,255,0.15)" />
    <circle cx="250" cy="200" r="6" fill="rgba(255,255,255,0.1)"  />
    <circle cx="246" cy="64"  r="3" fill="rgba(255,255,255,0.2)"  />
  </svg>
);

function ServiceIllustration({ index, active }: { index: number; active: boolean }) {
  const ringRef = useRef<SVGCircleElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ringRef.current || !active) return;
    const circ = 2 * Math.PI * 145;
    ringRef.current.style.strokeDasharray = String(circ);
    ringRef.current.style.strokeDashoffset = String(circ);
    const { animate: animeAnimate } = require("animejs");
    animeAnimate(ringRef.current, {
      strokeDashoffset: [circ, 0],
      duration: 1100,
      ease: "outQuart",
      delay: 80,
    });
  }, [active, reduce]);

  return (
    <div style={{ position: "relative", width: 340, height: 340, flexShrink: 0 }}>
      {/* Animated ring */}
      <svg viewBox="0 0 320 320" width={340} height={340} fill="none" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <circle
          ref={ringRef}
          cx="160" cy="160" r="145"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1.5"
          strokeDasharray={`${2 * Math.PI * 145}`}
          strokeDashoffset={active ? 0 : `${2 * Math.PI * 145}`}
          style={{ transition: reduce ? "none" : undefined }}
        />
        {/* Tick marks on ring */}
        {[0, 90, 180, 270].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const r = 145;
          const x1 = 160 + (r - 8) * Math.cos(rad);
          const y1 = 160 + (r - 8) * Math.sin(rad);
          const x2 = 160 + (r + 8) * Math.cos(rad);
          const y2 = 160 + (r + 8) * Math.sin(rad);
          return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />;
        })}
        {/* Service number at top of ring */}
        <text x="160" y="7" textAnchor="middle" dominantBaseline="middle" fontFamily="var(--sans)" fontSize="10" fontWeight="700" fill="rgba(255,255,255,0.4)" letterSpacing="0.12em">
          {`0${index + 1}`}
        </text>
      </svg>

      {/* Inner content */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 240, height: 240 }}>
          {index === 0 && <IllustrationBrand />}
          {index === 1 && <IllustrationFilm />}
          {index === 2 && <IllustrationDigital />}
        </div>
      </div>
    </div>
  );
}

// ─── ServicesTabbed ───────────────────────────────────────────────────────────
function ServicesTabbed() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  const s = services[active];

  return (
    <section style={{ background: "var(--ink)", padding: "140px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 50px" }}>
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ServiceIllustration index={active} active={true} />
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
            {/* Iridescent brand bubble — exact Kissa shape */}
            <svg
              viewBox={BUBBLE_VB}
              width="100%"
              height="100%"
              style={{ display: "block" }}
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
              <path d={BUBBLE_PATH} fill="url(#iridescent-fill)" />
              <path d={BUBBLE_PATH} fill="url(#iridescent-inner)" />
            </svg>
          </motion.div>

          {/* Hero animated orbit mark — right side */}
          <HeroOrbitMark />

          {/* Hero scribble accents */}
          <ScribbleMark src="/projects/scribbles/s-04.svg"  size={110} rot={-12} delay={800}
            style={{ position: "absolute", bottom: "12%", left: "4%", opacity: 0 }} />
          <ScribbleMark src="/projects/scribbles/s-105.svg" size={80}  rot={18}  delay={1000}
            style={{ position: "absolute", top: "14%", right: "28%", opacity: 0 }} />

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
                }}>A media art agency</p>
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
                We make the work
                <br />
                people cannot stop thinking about.
              </motion.h1>

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
        <section style={{ background: "var(--ink)", padding: "120px 0 100px", borderTop: "1px solid rgba(255,255,255,0.08)", position: "relative", overflow: "hidden" }}>
          {/* Scribble accents — far edges */}
          <ScribbleMark src="/projects/scribbles/s-38.svg"  size={130} rot={-20} delay={200}
            style={{ position: "absolute", top: "8%",  right: "3%", opacity: 0 }} />
          <ScribbleMark src="/projects/scribbles/s-11.svg"  size={90}  rot={12}  delay={350}
            style={{ position: "absolute", bottom: "6%", right: "8%", opacity: 0 }} />
          <div className="wrap" style={{ maxWidth: 860, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 40, marginBottom: 40 }}>
              <StatementMark />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.12)", transformOrigin: "left", alignSelf: "center" }}
              />
            </div>
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
        <section id="work" style={{ background: "rgb(18,18,18)", padding: "120px 0 140px" }}>
          <div className="wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <WorkMark />
                <ScribbleMark src="/projects/scribbles/s-05.svg" size={56} rot={8} delay={200}
                  style={{ opacity: 0 }} />
                <ClipReveal>
                  <h2 style={{ fontFamily: "var(--sans)", fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 700, color: "var(--fg-on-ink)", letterSpacing: "-0.012em", lineHeight: 1.05, marginBottom: 0 }}>
                    Selected work.
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
                {/* Scribbles card: real SVG assets scattered across the card */}
                {"svgAssets" in p && (p as typeof p & { svgAssets: string[] }).svgAssets ? (
                  <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                    {(p as typeof p & { svgAssets: string[] }).svgAssets.map((src, si) => {
                      const positions = [
                        { top: "8%",  left: "10%",  rotate: "-12deg", scale: 1.1 },
                        { top: "12%", right: "8%",  rotate: "8deg",   scale: 0.9 },
                        { top: "40%", left: "5%",   rotate: "18deg",  scale: 0.75 },
                        { top: "38%", right: "5%",  rotate: "-6deg",  scale: 1.0 },
                        { top: "64%", left: "22%",  rotate: "4deg",   scale: 0.85 },
                        { top: "62%", right: "15%", rotate: "-15deg", scale: 0.95 },
                      ];
                      const pos = positions[si] || positions[0];
                      return (
                        <img
                          key={si}
                          src={src}
                          alt=""
                          style={{
                            position: "absolute",
                            width: 80, height: 80,
                            opacity: 0.9,
                            filter: "invert(1)",
                            ...pos,
                            transform: `rotate(${pos.rotate}) scale(${pos.scale})`,
                          }}
                        />
                      );
                    })}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%)" }} />
                  </div>
                ) : (
                  <>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse 80% 50% at 20% 20%, ${p.accent}22 0%, transparent 70%)`, pointerEvents: "none" }} />
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontFamily: "var(--sans)", fontSize: "clamp(120px, 20vw, 200px)", fontWeight: 700, color: "rgba(0,0,0,0.08)", lineHeight: 1, letterSpacing: "-0.05em", userSelect: "none", whiteSpace: "nowrap", pointerEvents: "none" }}>
                      {p.name[0]}
                    </div>
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(0,0,0,${hoveredCard === p.name ? 0.82 : 0.65}) 0%, transparent 55%)`, transition: "background 0.25s ease-out" }} />
                  </>
                )}
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

        {/* ══ 9. CTA BANNER — MAD bordered box ════════════════════════════════ */}
        <section style={{ background: "#000000", padding: "100px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 50px" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
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
              <div style={{ position: "relative", flexShrink: 0 }}>
                <CTAOrbitMark />
                <ScribbleMark src="/projects/scribbles/s-104.svg" size={64} rot={-30} delay={0}
                  style={{ position: "absolute", top: -32, right: -28, opacity: 0 }} />
                <ScribbleMark src="/projects/scribbles/s-10.svg"  size={50} rot={20}  delay={120}
                  style={{ position: "absolute", bottom: -24, left: -20, opacity: 0 }} />
              </div>

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
                <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
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
