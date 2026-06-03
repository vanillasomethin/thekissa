"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Data ─────────────────────────────────────────────────────────────────────

type Category = "All" | "Services" | "Pricing" | "Process" | "General";

const FAQS: { question: string; answer: string; category: Exclude<Category, "All"> }[] = [
  {
    question: "What services does the Kissa offer?",
    answer:
      "The Kissa offers a full spectrum of creative services: graphic design, brand identity, video production, motion graphics, photography, social media management, and digital marketing strategy. Whether you need a single deliverable or an end-to-end campaign, the Kissa has you covered.",
    category: "Services",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines vary by scope. A logo design can be turned around in 5–7 business days, while a full brand identity system takes 3–6 weeks. Video production ranges from 2 weeks to 2+ months depending on length and complexity. A detailed timeline is always shared during onboarding.",
    category: "Process",
  },
  {
    question: "What is the pricing structure?",
    answer:
      "Project-based pricing is tailored to your specific needs and budget. After an initial discovery call, a custom quote is prepared. Retainer packages for ongoing clients unlock priority scheduling and reduced rates.",
    category: "Pricing",
  },
  {
    question: "Does the Kissa work with startups?",
    answer:
      "Absolutely. Early-stage companies and startups are a natural fit. The Kissa understands the importance of making a strong first impression with limited resources, and offers flexible packages designed to help you launch boldly without breaking the bank.",
    category: "General",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply reach out via the Contact page or email directly. A free 30-minute discovery call is scheduled to understand your goals, share relevant case studies, and discuss next steps. No commitment required.",
    category: "Process",
  },
  {
    question: "Are payment plans available?",
    answer:
      "Yes. For larger projects, payments are typically split into milestones: 50% upfront to kick off, 25% at mid-project review, and 25% on final delivery. Monthly payment schedules for retainer clients can also be arranged on request.",
    category: "Pricing",
  },
  {
    question: "Can the Kissa work with international clients?",
    answer:
      "Definitely. The Kissa works with clients across Africa, Europe, North America, and beyond. The team is fully remote-capable and handles payments in multiple currencies. Time zone differences are managed through async communication and scheduled check-in calls.",
    category: "General",
  },
  {
    question: "What makes the Kissa different?",
    answer:
      "The Kissa sits at the intersection of strategic thinking and raw creative energy — not just an execution shop. Every engagement involves understanding your audience, your competition, and your story. Every pixel, frame, and word produced is intentional.",
    category: "General",
  },
  {
    question: "Are rush services available?",
    answer:
      "Yes, rush timelines can be accommodated for select project types. Rush delivery (typically 24–72 hours) carries an additional fee of 25–50% depending on scope and current capacity. Reach out early so availability can be confirmed.",
    category: "Services",
  },
  {
    question: "How many revision rounds are included?",
    answer:
      "Most packages include 2–3 rounds of revisions. Each round allows you to give consolidated feedback, which is addressed in the next iteration. Additional rounds beyond the included amount are billed at an hourly rate.",
    category: "Process",
  },
  {
    question: "What file formats are delivered?",
    answer:
      "All final assets are delivered in the formats you need: vector files (AI, EPS, SVG), high-resolution rasters (PNG, JPG, TIFF), and video exports (MP4, MOV, ProRes). A brand asset package with organized folders and a usage guide is also included.",
    category: "Services",
  },
  {
    question: "Does the Kissa sign NDAs?",
    answer:
      "Yes. A mutual NDA can be signed before any confidential information is shared. Client confidentiality is taken seriously — your ideas, strategies, and business details are always kept private.",
    category: "General",
  },
];

const CATEGORIES: Category[] = ["All", "Services", "Pricing", "Process", "General"];

// ─── Accordion Item ────────────────────────────────────────────────────────────

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        borderBottom: "1px solid var(--line)",
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "24px 0",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "var(--sans)",
            fontSize: 17,
            fontWeight: 600,
            color: isOpen ? "var(--crimson)" : "var(--fg1)",
            transition: "color 0.2s",
          }}
        >
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          style={{
            flexShrink: 0,
            color: isOpen ? "var(--crimson)" : "var(--fg3)",
          }}
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p
              className="k-body"
              style={{
                color: "var(--fg2)",
                paddingBottom: 24,
                lineHeight: 1.7,
              }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = FAQS.filter(
    (f) => activeCategory === "All" || f.category === activeCategory
  );

  function handleToggle(idx: number) {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  }

  function handleCategory(cat: Category) {
    setActiveCategory(cat);
    setOpenIndex(null);
  }

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--paper)", color: "var(--fg1)" }}>

        {/* ── Hero ── */}
        <section
          style={{
            background: "var(--ink)",
            padding: "160px 0 96px",
            textAlign: "center",
          }}
        >
          <div className="wrap">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p
                className="k-eyebrow"
                style={{ color: "var(--fg-on-ink-2)", marginBottom: 20 }}
              >
                FAQ
              </p>
              <h1
                className="k-h1"
                style={{
                  color: "var(--fg-on-ink)",
                  maxWidth: 680,
                  margin: "0 auto",
                }}
              >
                Got questions?
                <br />
                <em className="italic-crimson">We&apos;ve got answers.</em>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* ── Category Tabs ── */}
        <section
          style={{
            background: "var(--paper)",
            paddingTop: 40,
            paddingBottom: 8,
          }}
        >
          <div className="wrap">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  style={{
                    padding: "8px 20px",
                    borderRadius: 40,
                    fontSize: 13,
                    fontFamily: "var(--sans)",
                    fontWeight: 600,
                    border:
                      activeCategory === cat
                        ? "1.5px solid var(--crimson)"
                        : "1.5px solid var(--line)",
                    background:
                      activeCategory === cat ? "var(--crimson)" : "transparent",
                    color:
                      activeCategory === cat ? "#fff" : "var(--fg2)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Accordion ── */}
        <section style={{ background: "var(--paper)", padding: "40px 0 96px" }}>
          <div className="wrap" style={{ maxWidth: 760 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {filtered.map((faq, idx) => (
                  <AccordionItem
                    key={faq.question}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === idx}
                    onToggle={() => handleToggle(idx)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ background: "var(--bone)", padding: "64px 0" }}>
          <div className="wrap" style={{ textAlign: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                className="k-h2"
                style={{ color: "var(--fg1)", marginBottom: 16 }}
              >
                Still have questions?
              </h2>
              <p
                className="k-body-l"
                style={{ color: "var(--fg2)", marginBottom: 32 }}
              >
                The team is happy to help. Reach out and we&apos;ll get back to you within
                one business day.
              </p>
              <Link
                href="/contact"
                className="btn btn-ghost"
                style={{ display: "inline-flex" }}
              >
                Get in touch →
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
