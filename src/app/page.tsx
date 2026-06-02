"use client";

import type { Metadata } from "next";
import { motion, useInView } from "framer-motion";
import { PlayCircle, Palette, Video, Zap, Star } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import PricingCalculator from "@/components/PricingCalculator";

// SEO metadata — exported for Next.js App Router (works from server components too,
// but keeping here for colocation; note: in a "use client" file this won't be picked
// up automatically by Next.js. Move to a parent layout or a separate metadata.ts if needed.)
export const metadata: Metadata = {
  title: "Kissa Media Arts Agency — Bold Creative Work",
  description:
    "Kissa Media Arts Agency delivers bold branding, video production, graphic design, and social media for brands that refuse to be ignored.",
  openGraph: {
    title: "Kissa Media Arts Agency — Bold Creative Work",
    description:
      "Bold creative work for brands that refuse to be ignored. Branding, video, design, and more.",
    url: "https://kissamedia.com",
    siteName: "Kissa Media Arts Agency",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kissa Media Arts Agency",
    description: "Bold creative work for brands that refuse to be ignored.",
  },
};

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── Gradient Orb ─────────────────────────────────────────────────────────────
function GradientOrb({
  color,
  size,
  x,
  y,
  delay,
}: {
  color: string;
  size: number;
  x: string;
  y: string;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl opacity-20 pointer-events-none"
      style={{ background: color, width: size, height: size, left: x, top: y }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
      transition={{ duration: 6, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

// ─── Work Card Colors ─────────────────────────────────────────────────────────
const workCards = [
  { name: "Pulse Energy Rebrand", category: "Branding", bg: "from-yellow-500 to-orange-500" },
  { name: "Vanilla x Somethin Collab", category: "Architecture", bg: "from-pink-500 to-purple-600" },
  { name: "Bloom Festival Campaign", category: "Social Media", bg: "from-green-400 to-teal-500" },
  { name: "Nexus Tech Launch", category: "Video", bg: "from-blue-500 to-indigo-600" },
  { name: "Kova Coffee Visual ID", category: "Branding", bg: "from-orange-400 to-red-500" },
  { name: "Urban Flow Series", category: "Photography", bg: "from-purple-500 to-pink-500" },
];

const testimonials = [
  {
    name: "Amara Osei",
    role: "CEO, Pulse Energy",
    quote:
      "Kissa completely transformed our brand identity. The team brought a level of creative energy that we had never seen before — truly exceptional work.",
    stars: 5,
  },
  {
    name: "Lena Hartmann",
    role: "Marketing Director, Bloom Festival",
    quote:
      "Our campaign numbers tripled after working with Kissa. They understand how to make a brand feel alive in the digital space.",
    stars: 5,
  },
  {
    name: "Marcus Webb",
    role: "Founder, Kova Coffee",
    quote:
      "From logo to packaging to web — Kissa handled everything flawlessly. Professional, bold, and always on time.",
    stars: 5,
  },
];

const blogPosts = [
  {
    title: "Why Brand Consistency Wins in a Noisy Market",
    date: "May 28, 2026",
    category: "Branding",
    excerpt:
      "In a world of infinite scroll and fleeting attention, the brands that stick are the ones that stay relentlessly consistent across every touchpoint.",
  },
  {
    title: "Short-Form Video Is Eating the World — Here's How to Win",
    date: "May 14, 2026",
    category: "Video Production",
    excerpt:
      "Reels, TikToks, YouTube Shorts. The format is everywhere. We break down what makes a short-form video actually convert.",
  },
  {
    title: "The Color Psychology Behind High-Converting Campaigns",
    date: "April 30, 2026",
    category: "Design",
    excerpt:
      "Color is not decoration — it's strategy. Learn how the world's most effective campaigns use hue, saturation, and contrast to drive action.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const metricsRef = useRef<HTMLDivElement>(null);

  return (
    <main className="bg-[#0A0A0A] text-[#F5F5F5] overflow-x-hidden font-sans">
      {/* ── 1. Hero ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        {/* Animated gradient orbs */}
        <GradientOrb color="#FFD700" size={600} x="-10%" y="-20%" delay={0} />
        <GradientOrb color="#FF6B35" size={500} x="60%" y="10%" delay={2} />
        <GradientOrb color="#FF3CAC" size={400} x="20%" y="60%" delay={4} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tight mb-4">
            <span className="block">We Make Brands</span>
            <span className="block gradient-text">Come Alive</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[#F5F5F5]/70 max-w-xl mx-auto leading-relaxed">
            Kissa Media Arts Agency — bold creative work for brands that refuse to be ignored.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <a
              href="#work"
              className="px-8 py-4 rounded-full bg-[#FFD700] text-[#0A0A0A] font-bold text-base hover:bg-yellow-300 transition-colors"
            >
              See Our Work
            </a>
            <a
              href="#pricing"
              className="px-8 py-4 rounded-full border-2 border-[#F5F5F5]/40 text-[#F5F5F5] font-bold text-base hover:border-[#FFD700] hover:text-[#FFD700] transition-colors"
            >
              Get a Quote
            </a>
          </div>
        </motion.div>

        {/* Video reel placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative z-10 mt-16 w-full max-w-3xl mx-auto aspect-video rounded-2xl bg-[#161616] border border-white/10 flex items-center justify-center cursor-pointer group"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center gap-2 text-[#F5F5F5]/50 group-hover:text-[#FFD700] transition-colors"
          >
            <PlayCircle size={72} strokeWidth={1.2} />
            <span className="text-sm font-medium tracking-widest uppercase">Watch Reel</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── 2. Marquee Ticker ────────────────────────────────────────────── */}
      <section className="bg-[#111111] py-5 overflow-hidden border-y border-white/5">
        <div className="flex whitespace-nowrap">
          <span className="animate-marquee inline-block text-[#FFD700] font-bold text-sm tracking-widest uppercase">
            {Array(4)
              .fill(
                "BRANDING · VIDEO PRODUCTION · GRAPHIC DESIGN · SOCIAL MEDIA · PHOTOGRAPHY · ANIMATION · WEB DESIGN · "
              )
              .join("")}
          </span>
          <span className="animate-marquee inline-block text-[#FFD700] font-bold text-sm tracking-widest uppercase" aria-hidden>
            {Array(4)
              .fill(
                "BRANDING · VIDEO PRODUCTION · GRAPHIC DESIGN · SOCIAL MEDIA · PHOTOGRAPHY · ANIMATION · WEB DESIGN · "
              )
              .join("")}
          </span>
        </div>
      </section>

      {/* ── 3. Featured Work ─────────────────────────────────────────────── */}
      <section id="work" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black mb-12 tracking-tight"
        >
          Selected Work
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {workCards.map((card, i) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div
                className={`aspect-video rounded-xl bg-gradient-to-br ${card.bg} mb-3 overflow-hidden relative`}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              <p className="font-bold text-[#F5F5F5] text-sm md:text-base">{card.name}</p>
              <span className="inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 text-[#FFD700]">
                {card.category}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 4. Metrics ───────────────────────────────────────────────────── */}
      <section ref={metricsRef} className="py-20 px-6 bg-[#111111] border-y border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { value: 120, suffix: "+", label: "Projects" },
            { value: 48, suffix: "", label: "Clients" },
            { value: 6, suffix: "", label: "Years" },
            { value: 3, suffix: "", label: "Awards" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-5xl md:text-6xl font-black text-[#FFD700]">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-[#F5F5F5]/70 font-medium text-sm uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Services Snapshot ─────────────────────────────────────────── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black mb-12 tracking-tight"
        >
          What We Do
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Palette size={32} strokeWidth={1.5} />,
              title: "Graphic Design",
              desc: "Visual identities, print, and digital assets that communicate with clarity and conviction.",
            },
            {
              icon: <Video size={32} strokeWidth={1.5} />,
              title: "Video Production",
              desc: "From concept to final cut — brand films, reels, and campaigns that demand attention.",
            },
            {
              icon: <Zap size={32} strokeWidth={1.5} />,
              title: "Branding",
              desc: "Strategy-led brand systems that give your business a voice, look, and lasting presence.",
            },
          ].map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-[#1A1A1A] rounded-2xl p-8 flex flex-col gap-4 border border-white/5 hover:border-[#FFD700]/30 transition-colors"
            >
              <span className="text-[#FF6B35]">{service.icon}</span>
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="text-[#F5F5F5]/60 text-sm leading-relaxed">{service.desc}</p>
              <a
                href="#"
                className="mt-auto text-[#FFD700] text-sm font-semibold hover:underline"
              >
                Learn more →
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 6. Social Proof ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#111111] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black mb-12 tracking-tight"
          >
            What Clients Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, x: i === 0 ? -40 : i === 2 ? 40 : 0, y: i === 1 ? 40 : 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-[#1A1A1A] rounded-2xl p-8 flex flex-col gap-4 border border-white/5"
              >
                <div className="flex gap-1">
                  {Array(t.stars)
                    .fill(null)
                    .map((_, idx) => (
                      <Star key={idx} size={16} fill="#FFD700" className="text-[#FFD700]" />
                    ))}
                </div>
                <p className="text-[#F5F5F5]/80 text-sm leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-auto">
                  <p className="font-bold text-[#F5F5F5]">{t.name}</p>
                  <p className="text-xs text-[#F5F5F5]/50">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Pricing Calculator ────────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black mb-12 tracking-tight"
        >
          Estimate Your Project Cost
        </motion.h2>
        <PricingCalculator />
      </section>

      {/* ── 8. Blog Preview ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#111111] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black mb-12 tracking-tight"
          >
            Fresh Insights
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#1A1A1A] rounded-2xl p-8 flex flex-col gap-3 border border-white/5 hover:border-[#FF3CAC]/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FF3CAC]/20 text-[#FF3CAC]">
                    {post.category}
                  </span>
                  <span className="text-xs text-[#F5F5F5]/40">{post.date}</span>
                </div>
                <h3 className="font-bold text-[#F5F5F5] text-base leading-snug">{post.title}</h3>
                <p className="text-[#F5F5F5]/60 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                <a href="#" className="text-[#FFD700] text-sm font-semibold hover:underline mt-2">
                  Read more →
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. CTA Banner ────────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-[#0A0A0A] text-center relative overflow-hidden">
        <GradientOrb color="#FFD700" size={500} x="40%" y="-30%" delay={0} />
        <GradientOrb color="#FF3CAC" size={400} x="-5%" y="30%" delay={2} />
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-8">
            Ready to make something bold?
          </h2>
          <a
            href="mailto:hello@kissamedia.com"
            className="inline-block px-12 py-5 rounded-full text-[#0A0A0A] font-black text-lg"
            style={{
              background: "linear-gradient(135deg, #FFD700 0%, #FF6B35 50%, #FF3CAC 100%)",
            }}
          >
            Let&apos;s Talk
          </a>
        </motion.div>
      </section>
    </main>
  );
}
