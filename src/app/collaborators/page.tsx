"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Data ──────────────────────────────────────────────────────────────────────

const collaborationTypes = [
  "Branding & Identity",
  "Spatial Branding",
  "Video Production",
  "Photography",
  "Exhibition Design",
  "Social Media Campaign",
  "Other",
];

const jointProjects = [
  {
    name: "The Form & Function Exhibition",
    collaborator: "Kissa × Vanilla",
    bg: "linear-gradient(135deg, #111111 0%, #000000 100%)",
    chip: "crimson",
  },
  {
    name: "Spatial Branding for Vault Gallery",
    collaborator: "Kissa × Vanilla",
    bg: "linear-gradient(135deg, #000000 0%, #16100F 100%)",
    chip: "crimson",
  },
  {
    name: "Urban Identity Series",
    collaborator: "Kissa × Somethin",
    bg: "linear-gradient(135deg, #2A3F5F 0%, #16100F 100%)",
    chip: "cool",
  },
  {
    name: "The Nairobi Blueprint",
    collaborator: "Kissa × Somethin",
    bg: "linear-gradient(135deg, #1a2c44 0%, #16100F 100%)",
    chip: "cool",
  },
];

// ─── Shared input style helpers ────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderBottom: "1.5px solid var(--line)",
  background: "transparent",
  padding: "12px 0",
  fontSize: 17,
  color: "var(--fg1)",
  outline: "none",
  fontFamily: "var(--sans)",
  boxSizing: "border-box",
};

function focusIn(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  e.target.style.borderBottomColor = "var(--crimson)";
}
function focusOut(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  e.target.style.borderBottomColor = "var(--line)";
}

// ─── Collaborator Card ─────────────────────────────────────────────────────────

function CollaboratorCard({
  name,
  tagline,
  description,
  projects,
  accent,
  accentBg,
  initials,
  delay,
}: {
  name: string;
  tagline: string;
  description: string;
  projects: string[];
  accent: string;
  accentBg: string;
  initials: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay }}
      style={{
        background: "#fff",
        borderRadius: 28,
        border: "2px solid var(--crimson)",
        padding: 40,
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {/* Logo placeholder */}
      <div
        style={{
          width: "100%",
          aspectRatio: "2/1",
          background: accentBg,
          borderRadius: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: accent,
            fontSize: 56,
            fontWeight: 900,
            fontFamily: "var(--sans)",
          }}
        >
          {initials}
        </span>
      </div>

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
        <div>
          <p className="k-eyebrow" style={{ color: accent, marginBottom: 6 }}>
            {tagline}
          </p>
          <h3 className="k-h3" style={{ color: "var(--fg1)" }}>
            {name}
          </h3>
        </div>

        <p className="k-body" style={{ color: "var(--fg2)" }}>
          {description}
        </p>

        <div>
          <p className="k-eyebrow" style={{ color: "var(--fg3)", marginBottom: 12 }}>
            Joint Projects
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {projects.map((project) => (
              <li key={project} className="pa" style={{ color: "var(--fg2)", fontSize: 15 }}>
                {project}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: "auto", paddingTop: 8 }}>
          <button
            className="btn btn-ghost"
            style={{ color: accent, borderColor: accent, display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            View projects <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function CollaboratorsPage() {
  const [form, setForm] = useState({
    name: "",
    organization: "",
    collaborationType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--paper)", color: "var(--fg1)" }}>

        {/* ── 1. Hero ──────────────────────────────────────────────────── */}
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
                Creative alliances
              </p>
              <h1
                className="k-h1"
                style={{
                  color: "var(--fg-on-ink)",
                  maxWidth: 680,
                  margin: "0 auto",
                }}
              >
                Where disciplines{" "}
                <em className="italic-crimson">collide.</em>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* ── 2. Featured Collaborators ─────────────────────────────── */}
        <section style={{ background: "var(--paper)", padding: "96px 0" }}>
          <div className="wrap">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 32,
              }}
            >
              <CollaboratorCard
                name="Vanilla"
                tagline="Architects & Spatial Design"
                description="Vanilla brings architectural vision to life — designing spaces that speak. Their mastery of form, material, and atmosphere transforms built environments into experiences that resonate long after you leave."
                projects={[
                  "The Form & Function Exhibition",
                  "Spatial Branding for Vault Gallery",
                ]}
                accent="var(--crimson)"
                accentBg="rgba(0,0,0,0.07)"
                initials="VN"
                delay={0}
              />
              <CollaboratorCard
                name="Somethin"
                tagline="Architecture & Urban Design"
                description="Somethin turns cities into canvases. Through bold urban interventions and community-driven design, they create environments where identity, culture, and architecture converge into something unforgettable."
                projects={["Urban Identity Series", "The Nairobi Blueprint"]}
                accent="var(--accent-cool)"
                accentBg="rgba(42,63,95,0.08)"
                initials="SM"
                delay={0.15}
              />
            </div>
          </div>
        </section>

        {/* ── 3. Joint Projects Grid ────────────────────────────────── */}
        <section style={{ background: "var(--bone)", padding: "96px 0" }}>
          <div className="wrap">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: 48 }}
            >
              <h2 className="k-h2" style={{ color: "var(--fg1)" }}>
                Joint projects
              </h2>
            </motion.div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 24,
              }}
            >
              {jointProjects.map((project, i) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="k-card"
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "16/9",
                      background: project.bg,
                    }}
                  />
                  <div style={{ padding: "20px 24px 24px" }}>
                    <p
                      className="k-body"
                      style={{
                        color: "var(--fg1)",
                        fontWeight: 700,
                        marginBottom: 8,
                      }}
                    >
                      {project.name}
                    </p>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        borderRadius: 20,
                        fontSize: 12,
                        fontFamily: "var(--sans)",
                        background:
                          project.chip === "crimson"
                            ? "rgba(0,0,0,0.1)"
                            : "rgba(42,63,95,0.1)",
                        color:
                          project.chip === "crimson"
                            ? "var(--crimson)"
                            : "var(--accent-cool)",
                      }}
                    >
                      {project.collaborator}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. Philosophy ──────────────────────────────────────────── */}
        <section
          style={{
            background: "var(--ink)",
            padding: "96px 0",
            textAlign: "center",
          }}
        >
          <div className="wrap" style={{ maxWidth: 780 }}>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <blockquote
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: "clamp(28px, 4vw, 48px)",
                  fontStyle: "italic",
                  color: "var(--fg-on-ink)",
                  lineHeight: 1.25,
                  marginBottom: 32,
                }}
              >
                &ldquo;Great work happens at the intersection of disciplines.&rdquo;
              </blockquote>
              <p
                className="k-body-l"
                style={{
                  color: "var(--fg-on-ink-2)",
                  maxWidth: 600,
                  margin: "0 auto",
                }}
              >
                Every partnership the Kissa enters is built on genuine creative alignment — a
                shared hunger to push past the obvious and make something that stands apart. When a
                brand strategist sits beside an architect, the unexpected becomes possible.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── 5. Become a Collaborator ───────────────────────────────── */}
        <section style={{ background: "var(--paper)", padding: "96px 0" }}>
          <div className="wrap" style={{ maxWidth: 640 }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: 40 }}
            >
              <p
                className="k-eyebrow"
                style={{ color: "var(--fg3)", marginBottom: 12 }}
              >
                Work with us
              </p>
              <h2 className="k-h2" style={{ color: "var(--fg1)", marginBottom: 16 }}>
                Become a collaborator
              </h2>
              <p className="k-body" style={{ color: "var(--fg2)" }}>
                The Kissa is always open to conversations with studios, firms, and creatives who
                want to build something together.
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    background: "rgba(0,0,0,0.06)",
                    border: "1.5px solid var(--crimson)",
                    borderRadius: 20,
                    padding: 48,
                    textAlign: "center",
                  }}
                >
                  <CheckCircle2
                    size={40}
                    style={{ color: "var(--crimson)", margin: "0 auto 16px" }}
                  />
                  <h3
                    className="k-h3"
                    style={{ color: "var(--fg1)", marginBottom: 8 }}
                  >
                    Message sent!
                  </h3>
                  <p className="k-body" style={{ color: "var(--fg2)" }}>
                    We&apos;ll be in touch soon to explore how we can work together.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: 24 }}
                >
                  {[
                    {
                      label: "Name",
                      name: "name",
                      type: "text",
                      placeholder: "Your full name",
                    },
                    {
                      label: "Organization",
                      name: "organization",
                      type: "text",
                      placeholder: "Your studio, firm, or company",
                    },
                  ].map((field) => (
                    <div key={field.name}>
                      <label
                        className="k-eyebrow"
                        style={{
                          color: "var(--fg3)",
                          display: "block",
                          marginBottom: 8,
                        }}
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        required
                        value={(form as Record<string, string>)[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        style={inputStyle}
                        onFocus={focusIn}
                        onBlur={focusOut}
                      />
                    </div>
                  ))}

                  <div>
                    <label
                      className="k-eyebrow"
                      style={{
                        color: "var(--fg3)",
                        display: "block",
                        marginBottom: 8,
                      }}
                    >
                      Collaboration type
                    </label>
                    <select
                      name="collaborationType"
                      required
                      value={form.collaborationType}
                      onChange={handleChange}
                      style={{ ...inputStyle, appearance: "none" }}
                      onFocus={focusIn}
                      onBlur={focusOut}
                    >
                      <option value="" disabled>
                        Select a type
                      </option>
                      {collaborationTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      className="k-eyebrow"
                      style={{
                        color: "var(--fg3)",
                        display: "block",
                        marginBottom: 8,
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your work and what you have in mind..."
                      style={{ ...inputStyle, resize: "none" }}
                      onFocus={focusIn}
                      onBlur={focusOut}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      marginTop: 8,
                    }}
                  >
                    <Send size={15} />
                    Send message
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
