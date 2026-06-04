"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Palette,
  Video,
  Zap,
  Share2,
  Camera,
  Play,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    number: "01",
    name: "Story & Brand",
    lead: "Strategy that sounds like you.",
    desc:
      "We dig into your brand's DNA — its voice, its audience, its ambition — and build an identity that is unmistakably yours. No templates. No borrowed aesthetics.",
    tags: ["Brand Strategy", "Identity Design", "Naming", "Guidelines"],
  },
  {
    number: "02",
    name: "Motion & Film",
    lead: "Frames that move people.",
    desc:
      "From a thirty-second social cut to a full documentary, we bring cinematic craft to every brief. We don't just film things — we make them unforgettable.",
    tags: ["Video Production", "Animation", "Motion Graphics", "Editing"],
  },
  {
    number: "03",
    name: "Digital & Immersive",
    lead: "Experiences you step inside.",
    desc:
      "Websites, social ecosystems, and interactive campaigns that pull people in and keep them there. Built for the scroll, designed for the soul.",
    tags: ["Web Design", "Social Media", "Content Systems", "Campaigns"],
  },
];

const SERVICES = [
  {
    icon: Palette,
    title: "Graphic Design",
    desc: "Visuals that stop the scroll and stay in memory. From logos to full print campaigns.",
    price: "$500",
    tags: ["Logo", "Print", "Brand Assets", "Social"],
  },
  {
    icon: Video,
    title: "Video Production",
    desc: "Cinematic storytelling for brands that demand attention — from storyboard to final cut.",
    price: "$1,200",
    tags: ["Commercials", "Documentaries", "Social Content"],
  },
  {
    icon: Zap,
    title: "Branding",
    desc: "A brand that feels inevitable. We build the strategy, voice, and look from the ground up.",
    price: "$800",
    tags: ["Strategy", "Visual Identity", "Naming"],
  },
  {
    icon: Share2,
    title: "Social Media",
    desc: "Consistent, compelling content that builds communities and converts followers to fans.",
    price: "$400/mo",
    tags: ["Content", "Strategy", "Community"],
  },
  {
    icon: Camera,
    title: "Photography",
    desc: "Every frame tells your brand's story. We shoot products, people, and everything in between.",
    price: "$600",
    tags: ["Product", "Lifestyle", "Events", "Portrait"],
  },
  {
    icon: Play,
    title: "Animation",
    desc: "Motion that brings ideas to life — from sleek motion graphics to full 2D animated stories.",
    price: "$900",
    tags: ["Motion Graphics", "2D", "Explainers"],
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery",
    desc: "We dive deep into your brand, audience, and goals before a single pixel is placed.",
  },
  {
    number: "02",
    title: "Concept",
    desc: "Ideas are born, challenged, refined, and sharpened into a clear creative direction.",
  },
  {
    number: "03",
    title: "Creation",
    desc: "Our team executes with precision and boldness — delivering work that exceeds the brief.",
  },
  {
    number: "04",
    title: "Delivery",
    desc: "Final assets handed over on time, with revisions included and your satisfaction guaranteed.",
  },
];

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  description: "",
  budget: "",
  timeline: "",
};

// ─── Quote Form ────────────────────────────────────────────────────────────────

function QuoteForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quote request submitted:", form);
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: "var(--r-md)",
    border: "1.5px solid var(--line-strong)",
    background: "#fff",
    padding: "12px 16px",
    fontSize: "15px",
    fontFamily: "var(--sans)",
    color: "var(--fg1)",
    outline: "none",
    transition: "border-color 0.18s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "6px",
    fontFamily: "var(--sans)",
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "var(--fg3)",
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 py-16 text-center"
        style={{
          background: "#fff",
          borderRadius: "var(--r-bubble)",
          border: "1px solid var(--line)",
          boxShadow: "var(--sh-2)",
        }}
      >
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: "var(--bone)" }}
        >
          <CheckCircle size={32} style={{ color: "var(--crimson)" }} />
        </div>
        <h3
          style={{
            fontFamily: "var(--serif-display)",
            fontSize: "28px",
            fontWeight: 700,
            color: "var(--fg1)",
          }}
        >
          We&apos;ve got your request!
        </h3>
        <p className="k-body" style={{ maxWidth: "360px" }}>
          Our team will be in touch within 24 hours to talk through your project.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="k-credit"
          style={{
            marginTop: "8px",
            color: "var(--crimson)",
            textDecoration: "underline",
            cursor: "pointer",
            background: "none",
            border: "none",
          }}
        >
          Submit another request
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        background: "#fff",
        borderRadius: "var(--r-bubble)",
        border: "1px solid var(--line)",
        boxShadow: "var(--sh-2)",
        padding: "40px",
      }}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label style={labelStyle}>Name *</label>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Email *</label>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Your phone number"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Company</label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Your company name"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Service *</label>
          <select
            required
            name="service"
            value={form.service}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="" disabled>
              Select a service
            </option>
            {SERVICES.map((s) => (
              <option key={s.title} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Budget Range *</label>
          <select
            required
            name="budget"
            value={form.budget}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="" disabled>
              Select budget
            </option>
            <option value="under-1k">Under $1,000</option>
            <option value="1k-5k">$1,000 – $5,000</option>
            <option value="5k-20k">$5,000 – $20,000</option>
            <option value="20k+">$20,000+</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Timeline *</label>
          <select
            required
            name="timeline"
            value={form.timeline}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="" disabled>
              Select timeline
            </option>
            <option value="asap">ASAP (rush)</option>
            <option value="2-weeks">Within 2 weeks</option>
            <option value="1-month">Within 1 month</option>
            <option value="1-3-months">1–3 months</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label style={labelStyle}>Project Description *</label>
          <textarea
            required
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us about your project, goals, and any references you love…"
            style={{ ...inputStyle, resize: "none" }}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button type="submit" className="btn btn-primary">
          Send Request →
        </button>
      </div>
    </motion.form>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
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
            What we create
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{
              fontFamily: "var(--serif-display)",
              fontSize: "clamp(48px, 7vw, 84px)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Three ways we{" "}
            <em className="italic-crimson" style={{ fontStyle: "italic" }}>
              tell it.
            </em>
          </motion.h1>
        </section>

        {/* ── Services section ── */}
        <section
          style={{
            background: "var(--paper)",
            paddingTop: "96px",
            paddingBottom: "96px",
          }}
        >
          <div className="px-6 mx-auto" style={{ maxWidth: "1200px" }}>
            {/* Section header — 2-col */}
            <div className="grid gap-8 mb-16 md:grid-cols-2 md:items-end">
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="k-h2"
              >
                What we do best.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="k-body-l"
              >
                Three creative pillars. One studio. Every project we take draws from
                all of them — strategy, craft, and technology working in concert.
              </motion.p>
            </div>

            {/* 3 Pillars */}
            <div className="flex flex-col gap-0 mb-20">
              {PILLARS.map((pillar, i) => (
                <motion.div
                  key={pillar.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  style={{
                    borderTop: "1px solid var(--line)",
                    paddingTop: "32px",
                    paddingBottom: "32px",
                  }}
                >
                  <div className="grid gap-6 md:grid-cols-[160px_1fr_1fr]">
                    {/* Number + name */}
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: "13px",
                          color: "var(--fg3)",
                          marginBottom: "8px",
                        }}
                      >
                        {pillar.number}
                      </p>
                      <h3 className="k-h3">{pillar.name}</h3>
                    </div>

                    {/* Lead + body */}
                    <div>
                      <p
                        className="italic-crimson"
                        style={{
                          fontFamily: "var(--serif-display)",
                          fontStyle: "italic",
                          fontSize: "20px",
                          lineHeight: 1.3,
                          marginBottom: "10px",
                        }}
                      >
                        {pillar.lead}
                      </p>
                      <p className="k-body">{pillar.desc}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 content-start">
                      {pillar.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            background: "var(--bone)",
                            color: "var(--fg2)",
                            borderRadius: "999px",
                            fontSize: "13px",
                            fontFamily: "var(--sans)",
                            padding: "5px 14px",
                            fontWeight: 500,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 6 Service cards */}
            <div className="grid gap-5 md:grid-cols-2">
              {SERVICES.map((svc, i) => {
                const Icon = svc.icon;
                return (
                  <motion.div
                    key={svc.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.07 }}
                    whileHover={{ y: -4, boxShadow: "var(--sh-3)" }}
                    style={{
                      background: "#fff",
                      borderRadius: "var(--r-lg)",
                      border: "1px solid var(--line)",
                      boxShadow: "var(--sh-1)",
                      padding: "28px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      transition: "box-shadow 0.2s, transform 0.2s",
                    }}
                  >
                    {/* Icon */}
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "var(--r-md)",
                        background: "var(--bone)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={22} style={{ color: "var(--crimson)" }} />
                    </div>

                    {/* Title + desc */}
                    <div>
                      <h4
                        style={{
                          fontFamily: "var(--sans)",
                          fontWeight: 700,
                          fontSize: "18px",
                          color: "var(--fg1)",
                          marginBottom: "6px",
                        }}
                      >
                        {svc.title}
                      </h4>
                      <p className="k-body">{svc.desc}</p>
                    </div>

                    {/* Tags row */}
                    <div className="flex flex-wrap gap-2 mt-auto pt-2">
                      {svc.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            background: "var(--bone)",
                            color: "var(--fg3)",
                            borderRadius: "999px",
                            fontSize: "12px",
                            fontFamily: "var(--mono)",
                            padding: "3px 10px",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Pricing */}
                    <p
                      style={{
                        fontFamily: "var(--sans)",
                        fontSize: "13px",
                        color: "var(--fg3)",
                        marginTop: "4px",
                      }}
                    >
                      From{" "}
                      <strong
                        style={{
                          color: "var(--crimson)",
                          fontFamily: "var(--sans)",
                          fontWeight: 700,
                        }}
                      >
                        {svc.price}
                      </strong>
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section
          style={{
            background: "var(--bone)",
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
              className="text-center mb-16"
            >
              <p
                className="k-eyebrow mb-4"
                style={{ color: "var(--fg3)", justifyContent: "center" }}
              >
                Our process
              </p>
              <h2 className="k-h2">How we work.</h2>
            </motion.div>

            {/* Steps — horizontal desktop, vertical mobile */}
            <div className="relative flex flex-col gap-12 md:flex-row md:gap-0">
              {/* Connector line desktop */}
              <div
                className="hidden md:block absolute"
                style={{
                  top: "28px",
                  left: "calc(12.5%)",
                  right: "calc(12.5%)",
                  height: "1px",
                  background: "var(--line-strong)",
                }}
              />

              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center flex-1"
                >
                  {/* Number badge */}
                  <div
                    className="relative z-10 flex items-center justify-center mb-5"
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: "var(--crimson)",
                      color: "#fff",
                      fontFamily: "var(--serif-display)",
                      fontWeight: 700,
                      fontSize: "18px",
                    }}
                  >
                    {step.number}
                  </div>

                  <h3
                    className="k-h3 mb-2"
                    style={{ fontSize: "18px" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="k-body"
                    style={{ maxWidth: "200px", fontSize: "15px" }}
                  >
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Quote Form ── */}
        <section
          id="quote"
          style={{
            background: "var(--paper)",
            paddingTop: "96px",
            paddingBottom: "96px",
          }}
        >
          <div className="px-6 mx-auto" style={{ maxWidth: "760px" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="text-center mb-12"
            >
              <p
                className="k-eyebrow mb-4"
                style={{ color: "var(--fg3)", justifyContent: "center" }}
              >
                Start your project
              </p>
              <h2 className="k-h2 mb-4">Get a quote.</h2>
              <p className="k-body-l">
                Fill in the details below and we&apos;ll get back to you within 24 hours with a
                tailored proposal.
              </p>
            </motion.div>

            <QuoteForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
