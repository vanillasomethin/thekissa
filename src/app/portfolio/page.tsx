"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PROJECTS = [
  { slug: "fyture", name: "FYTURE", category: "Branding", canvaUrl: "https://www.canva.com/d/TT5LBPgwQwxGJOZ", bg: "linear-gradient(135deg,#1C0810 0%,#3A0F1E 50%,#1C0810)" },
  { slug: "mezze", name: "Mezze", category: "Food & Beverage", canvaUrl: "https://www.canva.com/d/4e8NxvP6rD4weV7", bg: "linear-gradient(135deg,#0F1A10 0%,#1E3A20 50%,#0F1A10)" },
  { slug: "vs", name: "VS", category: "Branding", canvaUrl: "https://www.canva.com/d/lzVUP4x-0_j4Giu", bg: "linear-gradient(135deg,#10100F 0%,#2A2010 50%,#10100F)" },
  { slug: "tecfides", name: "Tecfides", category: "Tech & Finance", canvaUrl: "https://www.canva.com/d/uAp3r5ONIJyRW2t", bg: "linear-gradient(135deg,#0F141A 0%,#1A2A3A 50%,#0F141A)" },
  { slug: "natura", name: "Natura", category: "Wellness & Lifestyle", canvaUrl: "https://www.canva.com/d/5atF6nUAu2myTup", bg: "linear-gradient(135deg,#101508 0%,#243010 50%,#101508)" },
  { slug: "hearing-ear-care", name: "Hearing Ear Care", category: "Health", canvaUrl: "https://www.canva.com/d/_XDPj1ASuUmRVy9", bg: "linear-gradient(135deg,#0A1018 0%,#142030 50%,#0A1018)" },
  { slug: "asbc", name: "ASBC", category: "Tech & Finance", canvaUrl: "https://www.canva.com/d/exxmAdW_9dBXBMu", bg: "linear-gradient(135deg,#0F1218 0%,#1E2440 50%,#0F1218)" },
  { slug: "scribbles", name: "Scribbles", category: "Branding", canvaUrl: "https://www.canva.com/d/y4ZGuierNsuJMza", bg: "linear-gradient(135deg,#18100F 0%,#3A2010 50%,#18100F)" },
  { slug: "kere-pedals", name: "Kere Pedals", category: "Branding", canvaUrl: "https://www.canva.com/d/QyGODGlg6dG5SDF", bg: "linear-gradient(135deg,#100F18 0%,#20103A 50%,#100F18)" },
  { slug: "hyderabadi-dhaba", name: "Hyderabadi Dhaba", category: "Food & Beverage", canvaUrl: "https://www.canva.com/d/MI7BarHBxPEkBaS", bg: "linear-gradient(135deg,#180E08 0%,#3A2010 50%,#180E08)" },
  { slug: "travel-now", name: "Travel Now", category: "Wellness & Lifestyle", canvaUrl: "https://www.canva.com/d/c_eEfVej9so5gqu", bg: "linear-gradient(135deg,#081018 0%,#10283A 50%,#081018)" },
  { slug: "gurukripa", name: "Gurukripa", category: "Food & Beverage", canvaUrl: "https://www.canva.com/d/dhxLE02h2RJJRJE", bg: "linear-gradient(135deg,#180F0A 0%,#3A2015 50%,#180F0A)" },
  { slug: "lyfsense", name: "Lyfsense", category: "Health", canvaUrl: "https://www.canva.com/d/GqmEIxZ6C6ned0v", bg: "linear-gradient(135deg,#0F1814 0%,#1E3828 50%,#0F1814)" },
  { slug: "chocolate-dairies", name: "Chocolate Dairies", category: "Food & Beverage", canvaUrl: "https://www.canva.com/d/pbq3mWpSOb8pdlK", bg: "linear-gradient(135deg,#180C08 0%,#3A1810 50%,#180C08)" },
  { slug: "pranik", name: "Pranik", category: "Health", canvaUrl: "https://www.canva.com/d/9-FsZ9v_Njndj88", bg: "linear-gradient(135deg,#0F1A10 0%,#204020 50%,#0F1A10)" },
  { slug: "armario", name: "Armario", category: "Branding", canvaUrl: "https://www.canva.com/d/ZO04RqVk5EkiRCs", bg: "linear-gradient(135deg,#18100F 0%,#40201A 50%,#18100F)" },
  { slug: "espoir-cube", name: "Espoir Cube", category: "Branding", canvaUrl: "https://www.canva.com/d/psdC61XxI9NI2Zu", bg: "linear-gradient(135deg,#100F18 0%,#2A2040 50%,#100F18)" },
  { slug: "dip-n-melt", name: "Dip n Melt", category: "Food & Beverage", canvaUrl: "https://www.canva.com/d/GvzfZGfDu3pj4ln", bg: "linear-gradient(135deg,#181008 0%,#3A280A 50%,#181008)" },
  { slug: "alive", name: "Alive", category: "Wellness & Lifestyle", canvaUrl: "https://www.canva.com/d/YX8nZA1NEv7FyP6", bg: "linear-gradient(135deg,#0A1810 0%,#10381A 50%,#0A1810)" },
  { slug: "sorbete", name: "Sorbete", category: "Food & Beverage", canvaUrl: "https://www.canva.com/d/h0dM5G2nJ8Txp5m", bg: "linear-gradient(135deg,#180D08 0%,#402015 50%,#180D08)" },
  { slug: "eqmed", name: "EQMed", category: "Health", canvaUrl: "https://www.canva.com/d/yUQQzCWSNc8-yO8", bg: "linear-gradient(135deg,#081018 0%,#10243A 50%,#081018)" },
  { slug: "hayatibb", name: "Hayatibb", category: "Health", canvaUrl: "https://www.canva.com/d/Zj2mWu5_8FKn9iM", bg: "linear-gradient(135deg,#10100A 0%,#2A2A10 50%,#10100A)" },
  { slug: "tmed", name: "Tmed", category: "Tech & Finance", canvaUrl: "https://www.canva.com/d/zRQbUcH4o-74Giq", bg: "linear-gradient(135deg,#0F1418 0%,#1E2840 50%,#0F1418)" },
];

const ALL_CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

export default function PortfolioPage() {
  const [selected, setSelected] = useState("All");

  const filtered = selected === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === selected);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ background: "var(--ink)", paddingTop: 160, paddingBottom: 80 }}>
          <div className="wrap">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="k-eyebrow on-ink" style={{ marginBottom: 20, display: "inline-flex" }}>
                <span className="pa" /> Selected work
              </span>
              <h1
                style={{
                  fontFamily: "var(--serif-display)",
                  fontWeight: 700,
                  fontSize: "clamp(56px,8vw,96px)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.012em",
                  color: "#fff",
                  margin: "16px 0 0",
                  maxWidth: "14ch",
                }}
              >
                Our{" "}
                <em style={{ fontStyle: "italic", color: "var(--crimson)" }}>kissas.</em>
              </h1>
              <p
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: "clamp(16px,2vw,18px)",
                  lineHeight: 1.65,
                  color: "var(--fg-on-ink-2)",
                  marginTop: 24,
                  maxWidth: "48ch",
                }}
              >
                Every project is a story. Here are ours — told in frames, light, and motion.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Bar */}
        <div
          style={{
            background: "var(--paper)",
            position: "sticky",
            top: 0,
            zIndex: 40,
            borderBottom: "1px solid var(--line)",
            padding: "16px 0",
          }}
        >
          <div className="wrap" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "var(--r-pill)",
                  border: "1.5px solid",
                  borderColor: selected === cat ? "var(--crimson)" : "var(--line-strong)",
                  background: selected === cat ? "var(--crimson)" : "transparent",
                  color: selected === cat ? "#fff" : "var(--fg2)",
                  fontFamily: "var(--sans)",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all var(--dur) var(--ease)",
                  whiteSpace: "nowrap",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <section style={{ background: "var(--paper)", padding: "80px 0" }}>
          <div className="wrap">
            <motion.div
              layout
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: 24,
              }}
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((project) => (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(22,16,15,0.25)" }}
                    style={{
                      borderRadius: 20,
                      overflow: "hidden",
                      cursor: "pointer",
                      position: "relative",
                      background: "#fff",
                    }}
                  >
                    {/* Card image area */}
                    <div
                      style={{
                        aspectRatio: "4/3",
                        background: project.bg,
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {/* Noise-like radial overlay for texture */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.04) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(255,255,255,0.03) 0%, transparent 50%)",
                          pointerEvents: "none",
                        }}
                      />
                      {/* Bottom gradient + text */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: "60%",
                          background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                          padding: "0 20px 18px",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "var(--mono)",
                            fontSize: 11,
                            fontWeight: 400,
                            color: "rgba(255,255,255,0.65)",
                            textTransform: "uppercase",
                            letterSpacing: "0.12em",
                            marginBottom: 6,
                          }}
                        >
                          {project.category}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--serif-display)",
                            fontSize: 22,
                            fontWeight: 700,
                            color: "#fff",
                            lineHeight: 1.15,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {project.name}
                        </div>
                        <a
                          href={project.canvaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            marginTop: 10,
                            fontFamily: "var(--sans)",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "rgba(255,255,255,0.75)",
                            textDecoration: "none",
                            transition: "color 0.2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                        >
                          View project <span style={{ fontSize: 12 }}>→</span>
                        </a>
                      </div>
                    </div>

                    {/* Bottom meta row */}
                    <div
                      style={{
                        background: "#fff",
                        padding: "14px 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--sans)",
                          fontWeight: 700,
                          fontSize: 15,
                          color: "var(--fg1)",
                          letterSpacing: "-0.005em",
                        }}
                      >
                        {project.name}
                      </span>
                      <a
                        href={project.canvaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`View ${project.name} on Canva`}
                        style={{ color: "var(--fg3)", display: "flex", alignItems: "center", flexShrink: 0 }}
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "80px 0", color: "var(--fg3)" }}>
                <p style={{ fontFamily: "var(--sans)", fontSize: 16 }}>No projects in this category yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "var(--ink)", padding: "96px 0", textAlign: "center" }}>
          <div className="wrap" style={{ maxWidth: 720 }}>
            <h2
              style={{
                fontFamily: "var(--serif-display)",
                fontWeight: 700,
                fontSize: "clamp(36px,5vw,60px)",
                color: "#fff",
                margin: "0 0 40px",
                lineHeight: 1.1,
              }}
            >
              Have a project in mind?
            </h2>
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: 16, padding: "16px 32px" }}>
              Start a conversation →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
