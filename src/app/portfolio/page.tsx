"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CATEGORIES = ["All", "Branding", "Food & Beverage", "Health & Wellness", "Tech & Finance", "Social & Lifestyle"];

const PROJECTS = [
  { slug: "fyture", name: "FYTURE", category: "Branding", img: "/projects/fyture.png" },
  { slug: "mezze", name: "Mezze", category: "Food & Beverage", img: "/projects/mezze.png" },
  { slug: "vs", name: "VS", category: "Branding", img: "/projects/vs.png" },
  { slug: "tecfides", name: "Tecfides", category: "Tech & Finance", img: "/projects/tecfides.png" },
  { slug: "natura", name: "Natura", category: "Social & Lifestyle", img: "/projects/natura.png" },
  { slug: "hearing-ear-care", name: "Hearing Ear Care", category: "Health & Wellness", img: "/projects/hearing-ear-care.png" },
  { slug: "asbc", name: "ASBC", category: "Tech & Finance", img: "/projects/asbc.png" },
  { slug: "scribbles", name: "Scribbles", category: "Branding", img: "/projects/scribbles.png" },
  { slug: "kere-pedals", name: "Kere Pedals", category: "Branding", img: "/projects/kere-pedals.png" },
  { slug: "hyderabadi-dhaba", name: "Hyderabadi Dhaba", category: "Food & Beverage", img: "/projects/hyderabadi-dhaba.png" },
  { slug: "travel-now", name: "Travel Now", category: "Social & Lifestyle", img: "/projects/travel-now.png" },
  { slug: "gurukripa", name: "Gurukripa", category: "Food & Beverage", img: "/projects/gurukripa.png" },
  { slug: "lyfsense", name: "Lyfsense", category: "Health & Wellness", img: "/projects/lyfsense.png" },
  { slug: "chocolate-dairies", name: "Chocolate Dairies", category: "Food & Beverage", img: "/projects/chocolate-dairies.png" },
  { slug: "pranik", name: "Pranik", category: "Health & Wellness", img: "/projects/pranik.png" },
  { slug: "armario", name: "Armario", category: "Branding", img: "/projects/armario.png" },
  { slug: "espoir-cube", name: "Espoir Cube", category: "Branding", img: "/projects/espoir-cube.png" },
  { slug: "dip-n-melt", name: "Dip n Melt", category: "Food & Beverage", img: "/projects/dip-n-melt.png" },
  { slug: "alive", name: "Alive", category: "Social & Lifestyle", img: "/projects/alive.png" },
  { slug: "sorbete", name: "Sorbete", category: "Food & Beverage", img: "/projects/sorbete.jpg" },
  { slug: "eqmed", name: "EQMed", category: "Health & Wellness", img: "/projects/eqmed.png" },
  { slug: "hayatibb", name: "Hayatibb", category: "Health & Wellness", img: "/projects/hayatibb.png" },
  { slug: "tmed", name: "Tmed", category: "Tech & Finance", img: "/projects/tmed.png" },
];

const TESTIMONIALS = [
  { quote: "They didn't just design our brand — they found the story we'd been trying to tell for years.", name: "Sarah K.", company: "Lyfsense", initials: "SK" },
  { quote: "The Kissa turned our concept into something people feel before they understand it. Incredible work.", name: "Marco V.", company: "Espoir Cube", initials: "MV" },
  { quote: "Professional, bold, and genuinely fun to work with. They anticipate what the brand needs.", name: "Amara O.", company: "Natura", initials: "AO" },
];

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
              <h1 style={{ fontFamily: "var(--serif-display)", fontWeight: 700, fontSize: "clamp(48px,7vw,84px)", lineHeight: 1.0, letterSpacing: "-0.012em", color: "#fff", margin: "16px 0 0", maxWidth: "16ch" }}>
                Our unforgettable{" "}
                <em className="italic-crimson" style={{ fontStyle: "italic" }}>kissas.</em>
              </h1>
              <p className="k-body-l" style={{ color: "var(--fg-on-ink-2)", marginTop: 24, maxWidth: "48ch" }}>
                Every project is a story. Here are ours — told in frames, light, and motion.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Bar */}
        <div style={{ background: "var(--paper)", position: "sticky", top: 0, zIndex: 40, borderBottom: "1px solid var(--line)", padding: "16px 0" }}>
          <div className="wrap" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CATEGORIES.map((cat) => (
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
        <section style={{ background: "var(--paper)", padding: "64px 0 96px" }}>
          <div className="wrap">
            <motion.div
              layout
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}
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
                    style={{
                      background: "#fff",
                      borderRadius: "var(--r-lg)",
                      border: "1px solid var(--line)",
                      boxShadow: "var(--sh-1)",
                      overflow: "hidden",
                      position: "relative",
                    }}
                    whileHover={{ y: -4, boxShadow: "var(--sh-3)" }}
                  >
                    {/* Image */}
                    <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: "var(--bone)" }}>
                      <Image
                        src={project.img}
                        alt={project.name}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Hover overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(to bottom, rgba(22,16,15,0.2) 0%, rgba(22,16,15,0.85) 100%)",
                          display: "flex",
                          alignItems: "flex-end",
                          padding: 20,
                        }}
                      >
                        <span style={{ color: "#fff", fontFamily: "var(--sans)", fontWeight: 600, fontSize: 14, display: "inline-flex", alignItems: "center", gap: 8 }}>
                          View case study <span className="pa" />
                        </span>
                      </motion.div>
                    </div>

                    {/* Meta */}
                    <div style={{ padding: "16px 20px 20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                        <span style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: 17, color: "var(--fg1)" }}>{project.name}</span>
                        <span style={{
                          fontFamily: "var(--sans)",
                          fontSize: 12,
                          fontWeight: 600,
                          color: "var(--crimson)",
                          background: "var(--bone)",
                          borderRadius: "var(--r-pill)",
                          padding: "4px 10px",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                        }}>
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "80px 0", color: "var(--fg3)" }}>
                <p className="k-body">No projects in this category yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ background: "var(--bone)", padding: "96px 0" }}>
          <div className="wrap">
            <span className="k-eyebrow" style={{ marginBottom: 16, display: "inline-flex" }}>
              <span className="pa" /> Kind words
            </span>
            <h2 className="k-h2" style={{ marginBottom: 56, marginTop: 12 }}>What our storytellers say.</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  style={{
                    background: "#fff",
                    borderRadius: "var(--r-lg)",
                    borderLeft: "4px solid var(--crimson)",
                    padding: 32,
                    boxShadow: "var(--sh-1)",
                  }}
                >
                  <p style={{ fontFamily: "var(--serif-display)", fontStyle: "italic", fontWeight: 500, fontSize: 17, lineHeight: 1.6, color: "var(--fg1)", margin: "0 0 24px" }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--crimson)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, flexShrink: 0 }}>
                      {t.initials}
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: 15, color: "var(--fg1)" }}>{t.name}</div>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--fg3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{t.company}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "var(--ink)", padding: "96px 0", textAlign: "center" }}>
          <div className="wrap" style={{ maxWidth: 720 }}>
            <span className="k-eyebrow on-ink" style={{ marginBottom: 16, display: "inline-flex" }}>
              <span className="pa" /> Start a project
            </span>
            <h2 style={{ fontFamily: "var(--serif-display)", fontWeight: 700, fontSize: "clamp(36px,5vw,60px)", color: "#fff", margin: "12px 0 40px", lineHeight: 1.1 }}>
              Have a project in mind?
            </h2>
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: 16, padding: "16px 32px" }}>
              Start a conversation <span className="pa" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
