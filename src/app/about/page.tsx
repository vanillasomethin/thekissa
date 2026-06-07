"use client";

import { motion } from "framer-motion";
import { Target, Eye, Trophy, Star, Flame, Shield, Gem } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Data ─────────────────────────────────────────────────────────────────────

const TEAM = [
  {
    name: "Kissa Njoki",
    role: "Creative Director",
    bio: "The visionary behind Kissa's aesthetic. Kissa sets the creative tone and ensures every project pushes the boundary of what's expected.",
    initials: "KN",
    avatarBg: "#111111",
  },
  {
    name: "Amara Oduya",
    role: "Design Lead",
    bio: "A pixel-perfect perfectionist with a bold eye for layout and colour. Amara leads the graphic design team with relentless craft.",
    initials: "AO",
    avatarBg: "#2A3F5F",
  },
  {
    name: "Theo Kamau",
    role: "Video Director",
    bio: "Theo brings stories to life on screen. From storyboard to final grade, he commands every frame with cinematic precision.",
    initials: "TK",
    avatarBg: "#000000",
  },
  {
    name: "Priya Nair",
    role: "Brand Strategist",
    bio: "Priya digs into the 'why' before the 'what'. Her strategic thinking transforms ambiguous briefs into sharp, distinctive brand platforms.",
    initials: "PN",
    avatarBg: "#2E5563",
  },
  {
    name: "Marcus Webb",
    role: "Photography",
    bio: "Marcus captures the unseen — raw, textured, and alive. His lens finds raw texture, energy, and light in every frame.",
    initials: "MW",
    avatarBg: "#4A4140",
  },
  {
    name: "Zara Ali",
    role: "Motion Designer",
    bio: "Zara turns static ideas into kinetic experiences. Her motion work adds soul to every brand system we build.",
    initials: "ZA",
    avatarBg: "#D11A41",
  },
];

const TIMELINE = [
  {
    year: "2018",
    title: "Founded",
    desc: "Kissa was born from a belief by a belief that brands everywhere deserved world-class creative work.",
  },
  {
    year: "2020",
    title: "First Major Brand Campaign",
    desc: "We landed our first national campaign for Pulse Energy, delivering a rebrand and ATL campaign that earned coverage in three major Kenyan publications.",
  },
  {
    year: "2023",
    title: "Expanded to Video & Animation",
    desc: "With demand growing, we built a full in-house video production and motion design studio — doubling our headcount and our impact.",
  },
];

const ACHIEVEMENTS = [
  {
    icon: Trophy,
    title: "Best Creative Agency 2023",
    org: "Design Week Africa",
    year: "2023",
  },
  {
    icon: Star,
    title: "Top 10 African Agencies",
    org: "Campaign Magazine",
    year: "2022",
  },
  {
    icon: Trophy,
    title: "Emerging Agency Award",
    org: "Creative Week",
    year: "2021",
  },
  {
    icon: Star,
    title: "Brand Campaign of the Year",
    org: "Marketing Society",
    year: "2023",
  },
];

const VALUES = [
  {
    icon: Flame,
    title: "Boldness",
    desc: "We never play it safe. Every project is an opportunity to push further, stand out, and make something the world hasn't seen before.",
  },
  {
    icon: Shield,
    title: "Authenticity",
    desc: "We create with honesty — rooted in African culture, telling real stories, building brands that feel true to the people behind them.",
  },
  {
    icon: Gem,
    title: "Excellence",
    desc: "Good enough is never enough. We obsess over the details because the difference between good and extraordinary is always in the craft.",
  },
];

// ─── Team Card ─────────────────────────────────────────────────────────────────

function TeamCard({
  member,
  index,
}: {
  member: (typeof TEAM)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ scale: 1.02 }}
      style={{
        background: "#fff",
        borderRadius: "var(--r-lg)",
        border: "1px solid var(--line)",
        boxShadow: "var(--sh-1)",
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "12px",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: member.avatarBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontFamily: "var(--sans)",
          fontWeight: 700,
          fontSize: "18px",
          flexShrink: 0,
        }}
      >
        {member.initials}
      </div>

      {/* Name + role */}
      <div>
        <p
          style={{
            fontFamily: "var(--sans)",
            fontWeight: 700,
            fontSize: "16px",
            color: "var(--fg1)",
          }}
        >
          {member.name}
        </p>
        <p
          style={{
            fontFamily: "var(--sans)",
            fontStyle: "italic",
            fontSize: "14px",
            color: "var(--crimson)",
            marginTop: "2px",
          }}
        >
          {member.role}
        </p>
      </div>

      {/* Bio */}
      <p
        style={{
          fontFamily: "var(--sans)",
          fontSize: "13px",
          lineHeight: 1.55,
          color: "var(--fg3)",
        }}
      >
        {member.bio}
      </p>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── 1. Hero ── */}
        <section
          className="relative flex flex-col items-center justify-center text-center overflow-hidden px-6"
          style={{
            background: "var(--ink)",
            paddingTop: "140px",
            paddingBottom: "100px",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="k-eyebrow mb-4"
            style={{ color: "var(--fg-on-ink-2)", justifyContent: "center" }}
          >
            Our studio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{
              fontFamily: "var(--sans)",
              fontSize: "clamp(48px, 7vw, 84px)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "24px",
            }}
          >
            We are{" "}
            <em className="italic-crimson" style={{ fontStyle: "italic" }}>
              the Kissa.
            </em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            style={{
              fontFamily: "var(--sans)",
              fontSize: "18px",
              lineHeight: 1.6,
              color: "var(--fg-on-ink-2)",
              maxWidth: "560px",
            }}
          >
            A media art agency. We tell stories that are impossible to look away from.
          </motion.p>
        </section>

        {/* ── 2. Mission & Vision ── */}
        <section
          style={{
            background: "var(--paper)",
            paddingTop: "96px",
            paddingBottom: "96px",
          }}
        >
          <div className="px-6 mx-auto" style={{ maxWidth: "900px" }}>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  icon: Target,
                  label: "Mission",
                  text: "To amplify African stories through bold, unapologetic creative work.",
                },
                {
                  icon: Eye,
                  label: "Vision",
                  text: "To be the most exciting creative studio on the continent.",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    style={{
                      background: "#fff",
                      borderRadius: "var(--r-bubble)",
                      border: "2px solid var(--crimson)",
                      padding: "36px",
                      boxShadow: "var(--sh-1)",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "var(--r-md)",
                        background: "var(--bone)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "16px",
                      }}
                    >
                      <Icon size={24} style={{ color: "var(--crimson)" }} />
                    </div>
                    <p
                      className="k-eyebrow mb-3"
                      style={{ color: "var(--crimson)" }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--sans)",
                        fontSize: "22px",
                        fontWeight: 700,
                        lineHeight: 1.35,
                        color: "var(--fg1)",
                      }}
                    >
                      {item.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 3. Story Timeline ── */}
        <section
          style={{
            background: "var(--bone)",
            paddingTop: "96px",
            paddingBottom: "96px",
          }}
        >
          <div className="px-6 mx-auto" style={{ maxWidth: "1100px" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="text-center mb-16"
            >
              <h2 className="k-h2">Our story.</h2>
            </motion.div>

            {/* Timeline */}
            <div className="relative flex flex-col gap-0 md:flex-row">
              {/* Horizontal connector line — desktop */}
              <div
                className="hidden md:block absolute"
                style={{
                  top: "27px",
                  left: "calc(100% / 6)",
                  right: "calc(100% / 6)",
                  height: "2px",
                  background: "var(--line-strong)",
                }}
              />

              {/* Vertical connector line — mobile */}
              <div
                className="md:hidden absolute"
                style={{
                  left: "27px",
                  top: "28px",
                  bottom: "28px",
                  width: "2px",
                  background: "var(--line-strong)",
                }}
              />

              {TIMELINE.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative flex gap-5 pb-10 md:flex-col md:flex-1 md:items-center md:text-center md:gap-0 md:pb-0"
                >
                  {/* Year badge */}
                  <div
                    className="relative z-10 shrink-0 flex items-center justify-center md:mb-6"
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: "var(--crimson)",
                      color: "#fff",
                      fontFamily: "var(--sans)",
                      fontWeight: 700,
                      fontSize: "14px",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {milestone.year}
                  </div>

                  {/* Content */}
                  <div className="md:px-4">
                    <h3
                      style={{
                        fontFamily: "var(--sans)",
                        fontWeight: 700,
                        fontSize: "17px",
                        color: "var(--fg1)",
                        marginBottom: "8px",
                      }}
                    >
                      {milestone.title}
                    </h3>
                    <p className="k-body" style={{ fontSize: "14px" }}>
                      {milestone.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. Team ── */}
        <section
          style={{
            background: "var(--paper)",
            paddingTop: "96px",
            paddingBottom: "96px",
          }}
        >
          <div className="px-6 mx-auto" style={{ maxWidth: "1200px" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="mb-14"
            >
              <h2 className="k-h2">Meet the team.</h2>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {TEAM.map((member, i) => (
                <TeamCard key={member.name} member={member} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. Achievements ── */}
        <section
          style={{
            background: "var(--bone)",
            paddingTop: "96px",
            paddingBottom: "96px",
          }}
        >
          <div className="px-6 mx-auto" style={{ maxWidth: "1000px" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="mb-14"
            >
              <p
                className="k-eyebrow mb-4"
                style={{ color: "var(--fg3)" }}
              >
                Recognition
              </p>
              <h2 className="k-h2">Awards & achievements.</h2>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2">
              {ACHIEVEMENTS.map((award, i) => {
                const Icon = award.icon;
                return (
                  <motion.div
                    key={award.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    style={{
                      background: "#fff",
                      borderRadius: "var(--r-lg)",
                      borderLeft: "4px solid var(--crimson)",
                      boxShadow: "var(--sh-1)",
                      padding: "24px 28px",
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "var(--r-md)",
                        background: "var(--bone)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={22} style={{ color: "var(--crimson)" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        style={{
                          fontFamily: "var(--sans)",
                          fontWeight: 700,
                          fontSize: "15px",
                          color: "var(--fg1)",
                        }}
                      >
                        {award.title}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--sans)",
                          fontSize: "13px",
                          color: "var(--fg3)",
                          marginTop: "2px",
                        }}
                      >
                        {award.org}
                      </p>
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--sans)",
                        fontSize: "13px",
                        color: "var(--fg3)",
                        flexShrink: 0,
                      }}
                    >
                      {award.year}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 6. Values ── */}
        <section
          style={{
            background: "var(--ink)",
            paddingTop: "96px",
            paddingBottom: "96px",
          }}
        >
          <div className="px-6 mx-auto" style={{ maxWidth: "1100px" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="mb-14"
            >
              <p
                className="k-eyebrow mb-4"
                style={{ color: "var(--fg-on-ink-2)", justifyContent: "flex-start" }}
              >
                What we stand for
              </p>
              <h2
                className="k-h2"
                style={{ color: "var(--fg-on-ink)" }}
              >
                Our values.
              </h2>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {VALUES.map((value, i) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    style={{
                      borderTop: "1px solid rgba(244,239,233,0.12)",
                      paddingTop: "28px",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "var(--r-md)",
                        background: "rgba(0,0,0,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "16px",
                      }}
                    >
                      <Icon size={22} style={{ color: "var(--crimson-bright)" }} />
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--sans)",
                        fontWeight: 700,
                        fontSize: "20px",
                        color: "var(--fg-on-ink)",
                        marginBottom: "10px",
                      }}
                    >
                      {value.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--sans)",
                        fontSize: "15px",
                        lineHeight: 1.65,
                        color: "var(--fg-on-ink-2)",
                      }}
                    >
                      {value.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 7. CTA ── */}
        <section
          className="text-center px-6"
          style={{
            background: "var(--crimson)",
            paddingTop: "96px",
            paddingBottom: "96px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto"
            style={{ maxWidth: "640px" }}
          >
            <h2
              style={{
                fontFamily: "var(--sans)",
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                marginBottom: "32px",
              }}
            >
              Every brand has a story.
            </h2>
            <a
              href="/contact"
              className="btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--ink)",
                color: "#fff",
                border: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "var(--crimson-deep)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "var(--ink)";
              }}
            >
              Let&apos;s tell yours →
            </a>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
