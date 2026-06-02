"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

type Category = "All" | "Services" | "Pricing" | "Process" | "General";

const FAQS: { question: string; answer: string; category: Exclude<Category, "All"> }[] = [
  {
    question: "What services does Kissa offer?",
    answer:
      "Kissa Media Arts Agency offers a full spectrum of creative services including graphic design, brand identity, video production, motion graphics, photography, social media management, and digital marketing strategy. Whether you need a single deliverable or an end-to-end campaign, we've got you covered.",
    category: "Services",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines vary by scope. A logo design can be turned around in 5–7 business days, while a full brand identity system takes 3–6 weeks. Video production projects range from 2 weeks to 2+ months depending on length and complexity. We always share a detailed timeline during onboarding.",
    category: "Process",
  },
  {
    question: "What is your pricing structure?",
    answer:
      "We offer project-based pricing tailored to your specific needs and budget. After an initial discovery call, we put together a custom quote. We also have retainer packages for ongoing clients that unlock priority scheduling and reduced rates.",
    category: "Pricing",
  },
  {
    question: "Do you work with startups?",
    answer:
      "Absolutely. We love working with early-stage companies and startups. We understand the importance of making a strong first impression with limited resources, and we offer flexible packages designed to help you launch boldly without breaking the bank.",
    category: "General",
  },
  {
    question: "How do I get started?",
    answer:
      "Getting started is easy. Simply reach out via our Contact page or email us directly. We'll schedule a free 30-minute discovery call to understand your goals, share relevant case studies, and discuss next steps. No commitment required.",
    category: "Process",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "Yes. For larger projects, we typically split payments into milestones: 50% upfront to kick off, 25% at mid-project review, and 25% on final delivery. We can also arrange monthly payment schedules for retainer clients upon request.",
    category: "Pricing",
  },
  {
    question: "Can you work with international clients?",
    answer:
      "Definitely. We work with clients across Africa, Europe, North America, and beyond. Our team is fully remote-capable, and we handle payments in multiple currencies. Time zone differences are managed through async communication and scheduled check-in calls.",
    category: "General",
  },
  {
    question: "What makes Kissa different?",
    answer:
      "Kissa sits at the intersection of strategic thinking and raw creative energy. We're not just an execution shop — we partner with you to understand your audience, your competition, and your story. Every pixel, frame, and word we produce is intentional.",
    category: "General",
  },
  {
    question: "Do you offer rush services?",
    answer:
      "Yes, we can accommodate rush timelines for select project types. Rush delivery (typically 24–72 hours) carries an additional fee of 25–50% depending on scope and current capacity. Contact us early so we can let you know if rush slots are available.",
    category: "Services",
  },
  {
    question: "How many revision rounds are included?",
    answer:
      "Most of our packages include 2–3 rounds of revisions. Each round allows you to give consolidated feedback, which we address in the next iteration. Additional revision rounds beyond the included amount are billed at an hourly rate.",
    category: "Process",
  },
  {
    question: "What file formats do you deliver?",
    answer:
      "We deliver all final assets in the formats you need: vector files (AI, EPS, SVG), high-resolution rasters (PNG, JPG, TIFF), and video exports (MP4, MOV, ProRes). We also provide a brand asset package with organized folders and a usage guide.",
    category: "Services",
  },
  {
    question: "Do you sign NDAs?",
    answer:
      "Yes. We're happy to sign a mutual NDA before any confidential information is shared. Client confidentiality is something we take seriously — your ideas, strategies, and business details are always kept private.",
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
      className={`rounded-xl border transition-colors duration-300 overflow-hidden ${
        isOpen ? "border-[#FFD700]/60 bg-white/5" : "border-white/10 bg-white/[0.02]"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className={`font-semibold text-base md:text-lg transition-colors duration-200 ${isOpen ? "text-[#FFD700]" : "text-[#F5F5F5]"}`}>
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="shrink-0 text-[#FFD700]"
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
          >
            <p className="px-6 pb-5 text-[#F5F5F5]/70 leading-relaxed text-sm md:text-base">
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

  const handleToggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  // reset open item when filter changes
  const handleCategory = (cat: Category) => {
    setActiveCategory(cat);
    setOpenIndex(null);
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5]">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
        {/* background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#FFD700]/10 rounded-full blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
            <span
              style={{
                background: "linear-gradient(135deg, #FFD700 0%, #FF6B35 50%, #FF3CAC 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Got Questions?
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[#F5F5F5]/60 font-light">
            We&apos;ve got answers.
          </p>
        </motion.div>
      </section>

      {/* ── Category Tabs ── */}
      <section className="px-4 pb-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-2 justify-center"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#FFD700] text-[#0A0A0A] border-[#FFD700]"
                    : "bg-transparent text-[#F5F5F5]/60 border-white/20 hover:border-[#FFD700]/40 hover:text-[#F5F5F5]"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Accordion ── */}
      <section className="px-4 pb-24">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-3"
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
      <section className="px-4 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center bg-white/5 border border-white/10 rounded-2xl p-12"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#FFD700]/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">💬</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-3">
            Still have questions?
          </h2>
          <p className="text-[#F5F5F5]/60 mb-8 text-lg">
            Our team is happy to help. Reach out and we&apos;ll get back to you within one business day.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 rounded-xl font-bold text-[#0A0A0A] bg-[#FFD700] hover:bg-[#FF6B35] transition-colors duration-200 text-base"
          >
            Contact Us
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
