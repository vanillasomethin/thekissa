"use client";

import { motion, type Variants } from "framer-motion";
import {
  Target,
  Eye,
  Trophy,
  Star,
  Flame,
  Shield,
  Gem,
} from "lucide-react";

export const metadata = {
  title: "About — Kissa Media Arts Agency",
  description:
    "We are Kissa — a bold creative agency based in Nairobi, amplifying African stories through unapologetic design, video, and brand work.",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const TEAM = [
  {
    name: "Kissa Njoki",
    role: "Creative Director",
    bio: "The visionary behind Kissa's aesthetic. Kissa sets the creative tone and ensures every project pushes the boundary of what's expected.",
    initials: "KN",
    color: "#FFD700",
  },
  {
    name: "Amara Oduya",
    role: "Design Lead",
    bio: "A pixel-perfect perfectionist with a bold eye for layout and colour. Amara leads the graphic design team with relentless craft.",
    initials: "AO",
    color: "#FF6B35",
  },
  {
    name: "Theo Kamau",
    role: "Video Director",
    bio: "Theo brings stories to life on screen. From storyboard to final grade, he commands every frame with cinematic precision.",
    initials: "TK",
    color: "#FF3CAC",
  },
  {
    name: "Priya Nair",
    role: "Brand Strategist",
    bio: "Priya digs into the 'why' before the 'what'. Her strategic thinking transforms ambiguous briefs into sharp, distinctive brand platforms.",
    initials: "PN",
    color: "#FFD700",
  },
  {
    name: "Marcus Webb",
    role: "Photography",
    bio: "Marcus captures the unseen — raw, textured, and alive. His lens finds beauty in Nairobi's streets and boardrooms alike.",
    initials: "MW",
    color: "#FF6B35",
  },
  {
    name: "Zara Ali",
    role: "Motion Designer",
    bio: "Zara turns static ideas into kinetic experiences. Her motion work adds soul to every brand system we build.",
    initials: "ZA",
    color: "#FF3CAC",
  },
];

const TIMELINE = [
  {
    year: "2018",
    title: "Founded",
    desc: "Kissa was born in a small studio in Nairobi's Westlands, driven by a belief that African brands deserved world-class creative work — made right here at home.",
    color: "#FFD700",
  },
  {
    year: "2020",
    title: "First Major Brand Campaign",
    desc: "We landed our first national campaign for Pulse Energy, delivering a rebrand and ATL campaign that earned coverage in three major Kenyan publications.",
    color: "#FF6B35",
  },
  {
    year: "2023",
    title: "Expanded to Video & Animation",
    desc: "With demand growing, we built a full in-house video production and motion design studio — doubling our headcount and our impact.",
    color: "#FF3CAC",
  },
];

const ACHIEVEMENTS = [
  {
    icon: Trophy,
    title: "Best Creative Agency 2023",
    source: "Design Week Africa",
    color: "#FFD700",
  },
  {
    icon: Star,
    title: "Top 10 African Agencies 2022",
    source: "Campaign Magazine",
    color: "#FF6B35",
  },
  {
    icon: Trophy,
    title: "Emerging Agency Award 2021",
    source: "Nairobi Design Week",
    color: "#FF3CAC",
  },
  {
    icon: Star,
    title: "Brand Campaign of the Year 2023",
    source: "Marketing Society",
    color: "#FFD700",
  },
];

const VALUES = [
  {
    icon: Flame,
    title: "Boldness",
    desc: "We never play it safe. Every project is an opportunity to push further, stand out, and make something that the world hasn't seen before.",
    color: "#FFD700",
  },
  {
    icon: Shield,
    title: "Authenticity",
    desc: "We create with honesty — rooted in African culture, telling real stories, building brands that feel true to the people behind them.",
    color: "#FF6B35",
  },
  {
    icon: Gem,
    title: "Excellence",
    desc: "Good enough is never enough. We obsess over the details because the difference between good and extraordinary is always in the craft.",
    color: "#FF3CAC",
  },
];

// ─── Animation Variants ────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

// ─── Team Card ─────────────────────────────────────────────────────────────────

function TeamCard({ member, index }: { member: (typeof TEAM)[0]; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex flex-col items-center gap-4 rounded-2xl border border-white/5 p-6 text-center"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      {/* Avatar */}
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full text-lg font-black"
        style={{
          background: `linear-gradient(135deg, ${member.color}33, ${member.color}66)`,
          border: `2px solid ${member.color}55`,
          color: member.color,
        }}
      >
        {member.initials}
      </div>

      <div>
        <h3 className="font-bold text-white">{member.name}</h3>
        <p
          className="mt-0.5 text-xs font-semibold uppercase tracking-widest"
          style={{ color: member.color }}
        >
          {member.role}
        </p>
      </div>

      <p className="text-sm leading-relaxed" style={{ color: "#9A9A9A" }}>
        {member.bio}
      </p>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#0A0A0A" }}>

      {/* ── 1. Hero ── */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-32 text-center">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(255,60,172,0.14) 0%, transparent 65%)",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.3em]"
          style={{ color: "#FF6B35" }}
        >
          Kissa Media Arts Agency
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="gradient-text mb-6 text-5xl font-black leading-none md:text-7xl"
        >
          We Are Kissa
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl text-base leading-relaxed md:text-lg"
          style={{ color: "#9A9A9A" }}
        >
          We are a bold, unapologetic creative agency based in Nairobi. We exist to amplify
          African stories — through design, film, brand, and every medium in between. We don't
          follow trends. We set them.
        </motion.p>
      </section>

      {/* ── 2. Mission & Vision ── */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {[
            {
              icon: Target,
              label: "Mission",
              color: "#FFD700",
              text: "To amplify African stories through bold, unapologetic creative work.",
            },
            {
              icon: Eye,
              label: "Vision",
              color: "#FF3CAC",
              text: "To be the most exciting creative agency on the continent.",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="rounded-2xl border border-white/5 p-8"
                style={{ backgroundColor: "#1A1A1A" }}
              >
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: item.color + "22" }}
                >
                  <Icon size={24} style={{ color: item.color }} />
                </div>
                <p
                  className="mb-3 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: item.color }}
                >
                  {item.label}
                </p>
                <p className="text-xl font-bold leading-snug text-white">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── 3. Our Story ── */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: "#FF6B35" }}
            >
              How We Got Here
            </p>
            <h2 className="text-4xl font-black text-white md:text-5xl">Our Story</h2>
          </motion.div>

          <div className="relative flex flex-col gap-0">
            {/* Vertical line */}
            <div
              className="absolute left-[27px] top-8 bottom-8 w-px md:left-1/2"
              style={{ backgroundColor: "#2A2A2A" }}
            />

            {TIMELINE.map((milestone, i) => (
              <motion.div
                key={milestone.year}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
                className={`relative flex gap-6 pb-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Year badge — mobile left, desktop center */}
                <div className="flex flex-col items-center md:absolute md:left-1/2 md:-translate-x-1/2">
                  <div
                    className="z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-sm font-black"
                    style={{
                      backgroundColor: milestone.color + "22",
                      border: `2px solid ${milestone.color}`,
                      color: milestone.color,
                    }}
                  >
                    {milestone.year}
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`ml-6 rounded-2xl border border-white/5 p-6 md:ml-0 md:w-[calc(50%-3rem)] ${
                    i % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                  }`}
                  style={{ backgroundColor: "#1A1A1A" }}
                >
                  <h3 className="mb-2 text-lg font-bold text-white">{milestone.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#9A9A9A" }}>
                    {milestone.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Team ── */}
      <section className="px-6 pb-24" style={{ backgroundColor: "#0D0D0D" }}>
        <div className="mx-auto max-w-6xl py-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: "#FFD700" }}
            >
              The People
            </p>
            <h2 className="text-4xl font-black text-white md:text-5xl">Meet the Team</h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Achievements ── */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: "#FF3CAC" }}
            >
              Recognition
            </p>
            <h2 className="text-4xl font-black text-white md:text-5xl">Awards & Achievements</h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2">
            {ACHIEVEMENTS.map((award, i) => {
              const Icon = award.icon;
              return (
                <motion.div
                  key={award.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  custom={i}
                  className="card-hover flex items-center gap-5 rounded-2xl border border-white/5 p-6"
                  style={{ backgroundColor: "#1A1A1A" }}
                >
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: award.color + "22" }}
                  >
                    <Icon size={22} style={{ color: award.color }} />
                  </div>
                  <div>
                    <p className="font-bold text-white">{award.title}</p>
                    <p className="mt-0.5 text-sm" style={{ color: "#9A9A9A" }}>
                      {award.source}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. Values ── */}
      <section className="px-6 pb-32" style={{ backgroundColor: "#0D0D0D" }}>
        <div className="mx-auto max-w-5xl py-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: "#FF6B35" }}
            >
              What We Stand For
            </p>
            <h2 className="text-4xl font-black text-white md:text-5xl">Our Values</h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={i}
                  className="card-hover rounded-2xl border border-white/5 p-8"
                  style={{ backgroundColor: "#1A1A1A" }}
                >
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: value.color + "22" }}
                  >
                    <Icon size={24} style={{ color: value.color }} />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">{value.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#9A9A9A" }}>
                    {value.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
