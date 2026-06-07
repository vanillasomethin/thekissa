"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = ["All", "Branding", "Video", "Design", "Strategy", "Photography"];

const featuredArticle = {
  title: "The future of African creative work",
  date: "June 2, 2026",
  author: "Kissa Editorial",
  category: "Industry Trends",
  excerpt: [
    "Africa's creative industry is no longer waiting for permission. Across Nairobi, Lagos, Accra, and Johannesburg, a new generation of studios and agencies are rewriting the rules — not borrowing frameworks from elsewhere, but building their own.",
    "At the heart of this shift is a refusal to separate culture from commerce. The most compelling African creative work right now is rooted in lived experience — specific, and that specificity is exactly what makes it universally resonant.",
  ],
};

const articles = [
  {
    category: "Branding",
    title: "Why brand consistency wins in a noisy market",
    excerpt:
      "In a world of infinite scroll and fleeting attention, the brands that stick are the ones that stay relentlessly consistent across every touchpoint.",
    author: "Aisha Mwangi",
    authorInitials: "AM",
    date: "May 28, 2026",
    gradientBg: "linear-gradient(135deg, #111111 0%, #000000 100%)",
  },
  {
    category: "Video",
    title: "Short-form video is eating the world — here's how to win",
    excerpt:
      "Reels, TikToks, YouTube Shorts: the format is everywhere. We break down what makes a short-form video actually convert versus one that gets scrolled past in under two seconds.",
    author: "David Otieno",
    authorInitials: "DO",
    date: "May 14, 2026",
    gradientBg: "linear-gradient(135deg, #2A3F5F 0%, #16100F 100%)",
  },
  {
    category: "Strategy",
    title: "Social media strategy for brands that actually have something to say",
    excerpt:
      "Most social media strategies optimise for vanity metrics. The brands winning on social right now are building communities around ideas, not just products.",
    author: "Priya Nair",
    authorInitials: "PN",
    date: "April 30, 2026",
    gradientBg: "linear-gradient(135deg, #4A4140 0%, #16100F 100%)",
  },
  {
    category: "Design",
    title: "Color theory is not decoration — it's strategy",
    excerpt:
      "Color is one of the most powerful and least understood tools in a designer's arsenal. Learn how effective campaigns use hue and contrast to drive emotion.",
    author: "Kissa Editorial",
    authorInitials: "KE",
    date: "April 18, 2026",
    gradientBg: "linear-gradient(135deg, #000000 0%, #111111 100%)",
  },
  {
    category: "Design",
    title: "Inside the Kissa design process: from brief to final file",
    excerpt:
      "How does a project actually move from a client brief to a finished deliverable? We pull back the curtain on our internal process — the thinking, the tools, the hard conversations.",
    author: "Aisha Mwangi",
    authorInitials: "AM",
    date: "April 5, 2026",
    gradientBg: "linear-gradient(135deg, #16100F 0%, #2A3F5F 100%)",
  },
  {
    category: "Photography",
    title: "Photography tips for brands shooting on a budget",
    excerpt:
      "You do not need a massive production budget to get stunning brand photography. With the right light, the right framing, and a clear creative brief, small teams can compete.",
    author: "David Otieno",
    authorInitials: "DO",
    date: "March 22, 2026",
    gradientBg: "linear-gradient(135deg, #111111 0%, #4A4140 100%)",
  },
];

// ─── Category pill ─────────────────────────────────────────────────────────────

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 20px",
        borderRadius: 40,
        fontSize: 13,
        fontFamily: "var(--sans)",
        fontWeight: 600,
        border: active ? "1.5px solid var(--crimson)" : "1.5px solid var(--line)",
        background: active ? "var(--crimson)" : "transparent",
        color: active ? "#fff" : "var(--fg2)",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      {label}
    </button>
  );
}

// ─── Article Card ──────────────────────────────────────────────────────────────

function ArticleCard({
  article,
  index,
}: {
  article: (typeof articles)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="k-card"
      style={{
        background: "#fff",
        borderRadius: 16,
        border: "1px solid var(--line)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image placeholder */}
      <div
        style={{
          width: "100%",
          aspectRatio: "3/2",
          background: article.gradientBg,
          borderRadius: "12px 12px 0 0",
        }}
      />

      <div
        style={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          flex: 1,
        }}
      >
        <p className="k-eyebrow" style={{ color: "var(--crimson)" }}>
          {article.category}
        </p>
        <h3
          style={{
            fontFamily: "var(--sans)",
            fontSize: 20,
            fontWeight: 700,
            color: "var(--fg1)",
            lineHeight: 1.3,
          }}
        >
          {article.title}
        </h3>
        <p className="k-body" style={{ color: "var(--fg2)", flex: 1 }}>
          {article.excerpt}
        </p>

        {/* Author row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            paddingTop: 12,
            borderTop: "1px solid var(--line)",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "var(--crimson)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 800,
              color: "#fff",
              flexShrink: 0,
            }}
          >
            {article.authorInitials}
          </div>
          <span className="k-body" style={{ color: "var(--fg2)", fontSize: 14 }}>
            {article.author}
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontFamily: "var(--sans)",
              fontSize: 12,
              color: "var(--fg3)",
            }}
          >
            {article.date}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  }

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--paper)", color: "var(--fg1)" }}>

        {/* ── 1. Hero ─────────────────────────────────────────────────── */}
        <section
          style={{
            background: "var(--ink)",
            padding: "160px 0 96px",
            textAlign: "center",
          }}
        >
          <div className="wrap">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
            >
              <p
                className="k-eyebrow"
                style={{ color: "var(--fg-on-ink-2)", marginBottom: 20 }}
              >
                Fresh perspectives
              </p>
              <h1
                className="k-h1"
                style={{
                  color: "var(--fg-on-ink)",
                  maxWidth: 680,
                  margin: "0 auto",
                }}
              >
                Stories about{" "}
                <em className="italic-crimson">storytelling.</em>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* ── 2. Category Filter ──────────────────────────────────────── */}
        <section
          style={{
            background: "var(--paper)",
            paddingTop: 32,
            position: "sticky",
            top: 0,
            zIndex: 10,
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div className="wrap">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                paddingBottom: 20,
              }}
            >
              {CATEGORIES.map((cat) => (
                <CategoryPill
                  key={cat}
                  label={cat}
                  active={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. Featured Article ─────────────────────────────────────── */}
        {(activeCategory === "All" || activeCategory === "Industry Trends") && (
          <section style={{ background: "var(--paper)", padding: "48px 0" }}>
            <div className="wrap">
              <motion.article
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  border: "1px solid var(--line)",
                  boxShadow: "0 4px 24px rgba(22,16,15,0.08)",
                  overflow: "hidden",
                  display: "grid",
                  gridTemplateColumns: "minmax(0,2fr) minmax(0,3fr)",
                  gap: 0,
                }}
              >
                {/* Left: image */}
                <div
                  style={{
                    aspectRatio: "4/3",
                    background: "linear-gradient(135deg, #111111 0%, #16100F 100%)",
                    borderRadius: "16px 0 0 16px",
                    minHeight: 280,
                  }}
                />
                {/* Right: text */}
                <div
                  style={{
                    padding: "40px 48px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    justifyContent: "center",
                  }}
                >
                  <p className="k-eyebrow" style={{ color: "var(--crimson)" }}>
                    {featuredArticle.category}
                  </p>
                  <h3
                    className="k-h3"
                    style={{
                      color: "var(--fg1)",
                      fontFamily: "var(--sans)",
                    }}
                  >
                    {featuredArticle.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--sans)",
                      fontSize: 12,
                      color: "var(--fg3)",
                    }}
                  >
                    {featuredArticle.date}
                  </span>
                  {featuredArticle.excerpt.map((para, i) => (
                    <p
                      key={i}
                      className="k-body"
                      style={{ color: "var(--fg2)" }}
                    >
                      {para}
                    </p>
                  ))}
                  <div style={{ marginTop: 8 }}>
                    <button
                      className="btn btn-primary"
                      style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                    >
                      Read the full piece →
                    </button>
                  </div>
                </div>
              </motion.article>
            </div>
          </section>
        )}

        {/* ── 4. Article Grid ─────────────────────────────────────────── */}
        <section style={{ background: "var(--paper)", paddingBottom: 96 }}>
          <div className="wrap">
            <AnimatePresence mode="wait">
              {filtered.length > 0 ? (
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: 24,
                  }}
                >
                  {filtered.map((article, i) => (
                    <ArticleCard key={article.title} article={article} index={i} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    padding: "80px 0",
                    textAlign: "center",
                    color: "var(--fg3)",
                    fontSize: 15,
                  }}
                >
                  No articles in this category yet — check back soon.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ── 5. Newsletter ───────────────────────────────────────────── */}
        <section style={{ background: "var(--bone)", padding: "64px 0" }}>
          <div className="wrap" style={{ maxWidth: 580, textAlign: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p
                className="k-eyebrow"
                style={{ color: "var(--fg3)", marginBottom: 12 }}
              >
                The Kissa Journal
              </p>
              <h2
                className="k-h2"
                style={{ color: "var(--fg1)", marginBottom: 24 }}
              >
                Stay in the loop.
              </h2>

              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    background: "rgba(0,0,0,0.06)",
                    border: "1.5px solid var(--crimson)",
                    borderRadius: 16,
                    padding: "32px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <CheckCircle2
                    size={36}
                    style={{ color: "var(--crimson)" }}
                  />
                  <p
                    className="k-body"
                    style={{ color: "var(--fg1)", fontWeight: 700 }}
                  >
                    You&apos;re in!
                  </p>
                  <p className="k-body" style={{ color: "var(--fg2)" }}>
                    Expect bold ideas in your inbox soon.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  style={{
                    display: "flex",
                    gap: 12,
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{
                      flex: "1 1 280px",
                      background: "#fff",
                      border: "1.5px solid var(--line)",
                      borderRadius: "var(--r-md, 12px)",
                      padding: "14px 20px",
                      fontSize: 16,
                      color: "var(--fg1)",
                      outline: "none",
                      fontFamily: "var(--sans)",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--crimson)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--line)")
                    }
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ flexShrink: 0 }}
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
