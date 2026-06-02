"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const categories = ["All", "Branding", "Video", "Design", "Strategy", "Photography"];

const featuredArticle = {
  title: "The Future of African Creative Work",
  date: "June 2, 2026",
  author: "Kissa Editorial",
  category: "Industry Trends",
  excerpt: [
    "Africa's creative industry is no longer waiting for permission. Across Nairobi, Lagos, Accra, and Johannesburg, a new generation of studios, agencies, and independent creatives are rewriting the rules — not borrowing frameworks from elsewhere, but building their own. The energy is undeniable, and the output is world-class.",
    "At the heart of this shift is a refusal to separate culture from commerce. The most compelling African creative work right now is rooted in lived experience — visual languages drawn from local architecture, textile, music, and ritual — reimagined for a digital-first world. It is specific, and that specificity is exactly what makes it universally resonant.",
    "For agencies like Kissa, this moment is both a responsibility and an opportunity. The question is not whether African creative work will define global culture — it already is. The question is whether we have the infrastructure, the investment, and the intention to sustain it.",
  ],
};

const articles = [
  {
    category: "Branding",
    title: "Why Brand Consistency Wins in a Noisy Market",
    excerpt:
      "In a world of infinite scroll and fleeting attention, the brands that stick are the ones that stay relentlessly consistent across every touchpoint. We break down why consistency is the most underrated brand strategy.",
    author: "Aisha Mwangi",
    authorInitials: "AM",
    authorColor: "bg-yellow-500",
    date: "May 28, 2026",
  },
  {
    category: "Video",
    title: "Short-Form Video Is Eating the World — Here's How to Win",
    excerpt:
      "Reels, TikToks, YouTube Shorts: the format is everywhere. We break down what makes a short-form video actually convert versus one that gets scrolled past in under two seconds.",
    author: "David Otieno",
    authorInitials: "DO",
    authorColor: "bg-orange-500",
    date: "May 14, 2026",
  },
  {
    category: "Strategy",
    title: "Social Media Strategy for Brands That Actually Have Something to Say",
    excerpt:
      "Most social media strategies optimise for vanity metrics. The brands winning on social right now are doing something different — they are building communities around ideas, not just products.",
    author: "Priya Nair",
    authorInitials: "PN",
    authorColor: "bg-pink-500",
    date: "April 30, 2026",
  },
  {
    category: "Design",
    title: "Color Theory Is Not Decoration — It's Strategy",
    excerpt:
      "Color is one of the most powerful and least understood tools in a designer's arsenal. Learn how the world's most effective campaigns use hue, saturation, and contrast to drive emotion and action.",
    author: "Kissa Editorial",
    authorInitials: "KE",
    authorColor: "bg-purple-500",
    date: "April 18, 2026",
  },
  {
    category: "Design",
    title: "Inside Kissa's Design Process: From Brief to Final File",
    excerpt:
      "How does a project actually move from a client brief to a finished deliverable? We pull back the curtain on our internal design process — the thinking, the tools, and the hard conversations that make great work possible.",
    author: "Aisha Mwangi",
    authorInitials: "AM",
    authorColor: "bg-yellow-500",
    date: "April 5, 2026",
  },
  {
    category: "Photography",
    title: "Photography Tips for Brands Shooting on a Budget",
    excerpt:
      "You do not need a massive production budget to get stunning brand photography. With the right light, the right framing, and a clear creative brief, a small team can produce images that compete with any big campaign.",
    author: "David Otieno",
    authorInitials: "DO",
    authorColor: "bg-orange-500",
    date: "March 22, 2026",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function CategoryBadge({ category, color }: { category: string; color?: string }) {
  const colorMap: Record<string, string> = {
    "Industry Trends": "bg-[#FF3CAC]/15 text-[#FF3CAC]",
    Branding: "bg-[#FFD700]/15 text-[#FFD700]",
    Video: "bg-[#FF6B35]/15 text-[#FF6B35]",
    Strategy: "bg-purple-500/15 text-purple-400",
    Design: "bg-blue-500/15 text-blue-400",
    Photography: "bg-emerald-500/15 text-emerald-400",
  };
  const cls = color ?? colorMap[category] ?? "bg-white/10 text-[#F5F5F5]/70";
  return (
    <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${cls}`}>
      {category}
    </span>
  );
}

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
      className="bg-[#1A1A1A] rounded-2xl border border-white/5 card-hover flex flex-col overflow-hidden"
    >
      {/* Colored header strip */}
      <div
        className="w-full h-1.5"
        style={{
          background:
            index % 3 === 0
              ? "linear-gradient(90deg,#FFD700,#FF6B35)"
              : index % 3 === 1
              ? "linear-gradient(90deg,#FF6B35,#FF3CAC)"
              : "linear-gradient(90deg,#FF3CAC,#FFD700)",
        }}
      />

      <div className="flex flex-col gap-4 p-7 flex-1">
        <CategoryBadge category={article.category} />

        <h3 className="font-black text-[#F5F5F5] text-base leading-snug group-hover:text-[#FFD700] transition-colors">
          {article.title}
        </h3>

        <p className="text-[#F5F5F5]/55 text-sm leading-relaxed flex-1">{article.excerpt}</p>

        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-8 h-8 rounded-full ${article.authorColor} flex items-center justify-center text-xs font-black text-[#0A0A0A]`}
            >
              {article.authorInitials}
            </span>
            <span className="text-xs text-[#F5F5F5]/55 font-medium">{article.author}</span>
          </div>
          <span className="text-xs text-[#F5F5F5]/35">{article.date}</span>
        </div>

        <a
          href="#"
          className="text-[#FFD700] text-sm font-bold hover:underline flex items-center gap-1 mt-1 w-fit"
        >
          Read more <ArrowRight size={13} />
        </a>
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
    <main className="bg-[#0A0A0A] text-[#F5F5F5] overflow-x-hidden min-h-screen">
      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        {/* Orbs */}
        <motion.div
          className="absolute rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: "#FF3CAC", width: 520, height: 520, right: "-10%", top: "-15%" }}
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: "#FFD700", width: 400, height: 400, left: "-5%", bottom: "-10%" }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <p className="text-xs font-bold tracking-widest uppercase text-[#FF3CAC] mb-4">
            The Kissa Journal
          </p>
          <h1 className="text-6xl md:text-7xl font-black leading-none tracking-tight mb-6">
            <span className="gradient-text">Fresh Perspectives</span>
          </h1>
          <p className="text-lg text-[#F5F5F5]/65 leading-relaxed max-w-xl mx-auto">
            Ideas, insights, and honest takes on branding, design, video, and the creative industry
            — straight from the studio.
          </p>
        </motion.div>
      </section>

      {/* ── 2. Category Filter Bar ──────────────────────────────────────── */}
      <section className="px-6 pb-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat
                  ? "bg-[#FFD700] text-[#0A0A0A]"
                  : "bg-[#1A1A1A] text-[#F5F5F5]/60 hover:bg-[#2A2A2A] hover:text-[#F5F5F5]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      {/* ── 3. Featured Article ─────────────────────────────────────────── */}
      {(activeCategory === "All" || activeCategory === "Industry Trends") && (
        <section className="px-6 pb-16 max-w-7xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[#1A1A1A] rounded-3xl border border-white/5 overflow-hidden"
          >
            {/* Banner */}
            <div
              className="w-full h-2"
              style={{
                background: "linear-gradient(90deg, #FFD700 0%, #FF6B35 50%, #FF3CAC 100%)",
              }}
            />

            <div className="p-8 md:p-12 flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <CategoryBadge category={featuredArticle.category} />
                <span className="text-xs text-[#F5F5F5]/40">{featuredArticle.date}</span>
                <span className="text-xs text-[#F5F5F5]/40">·</span>
                <span className="text-xs font-medium text-[#F5F5F5]/55">
                  By {featuredArticle.author}
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight text-[#F5F5F5]">
                {featuredArticle.title}
              </h2>

              <div className="flex flex-col gap-4 max-w-3xl">
                {featuredArticle.excerpt.map((para, i) => (
                  <p key={i} className="text-[#F5F5F5]/65 text-base leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              <div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-sm text-[#0A0A0A] transition-opacity hover:opacity-85"
                  style={{
                    background: "linear-gradient(135deg, #FFD700 0%, #FF6B35 60%, #FF3CAC 100%)",
                  }}
                >
                  Read Full Article <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </motion.article>
        </section>
      )}

      {/* ── 4. Article Grid ─────────────────────────────────────────────── */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article, i) => (
              <ArticleCard key={article.title} article={article} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center text-[#F5F5F5]/40 text-sm"
          >
            No articles in this category yet — check back soon.
          </motion.div>
        )}
      </section>

      {/* ── 5. Newsletter Signup ────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#111111] border-y border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1A1A1A] border border-white/10 mb-6 mx-auto">
              <Mail size={24} className="text-[#FFD700]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Stay in the Loop
            </h2>
            <p className="text-[#F5F5F5]/55 text-base leading-relaxed mb-8 max-w-md mx-auto">
              Get our latest articles, creative insights, and behind-the-scenes studio stories
              delivered straight to your inbox — no spam, ever.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#1A1A1A] rounded-2xl border border-[#FFD700]/25 px-8 py-6"
              >
                <p className="text-[#FFD700] font-black text-lg mb-1">You&apos;re in!</p>
                <p className="text-[#F5F5F5]/55 text-sm">
                  Welcome to the Kissa Journal. Expect bold ideas in your inbox soon.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-[#1A1A1A] border border-white/10 rounded-full px-5 py-3.5 text-sm text-[#F5F5F5] placeholder:text-[#F5F5F5]/25 focus:outline-none focus:border-[#FFD700]/50 transition-colors"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-full font-black text-sm text-[#0A0A0A] transition-opacity hover:opacity-85 whitespace-nowrap"
                  style={{
                    background:
                      "linear-gradient(135deg, #FFD700 0%, #FF6B35 60%, #FF3CAC 100%)",
                  }}
                >
                  Subscribe
                </button>
              </form>
            )}

            <p className="mt-4 text-xs text-[#F5F5F5]/30">
              Weekly articles · Studio updates · Creative resources · Zero spam
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
