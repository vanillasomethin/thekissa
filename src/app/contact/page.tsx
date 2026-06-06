"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  AtSign,
  Link2,
  PlayCircle,
  Clock,
  CheckCircle2,
  Send,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormState = {
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
};

const inquiryTypes = ["General", "Project Brief", "Partnership", "Press"];

// ─── Shared input style ───────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderBottom: "1.5px solid var(--line)",
  borderTop: "none",
  borderLeft: "none",
  borderRight: "none",
  background: "transparent",
  padding: "12px 0",
  fontSize: 17,
  color: "var(--fg1)",
  outline: "none",
  fontFamily: "var(--sans)",
  boxSizing: "border-box",
};

function focusIn(
  e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) {
  e.target.style.borderBottomColor = "var(--crimson)";
}
function focusOut(
  e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) {
  e.target.style.borderBottomColor = "var(--line)";
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
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

        {/* ── 1. Hero ─────────────────────────────────────────────────── */}
        <section
          style={{
            background: "var(--ink)",
            padding: "120px 0",
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
                Get in touch
              </p>
              <h1
                className="k-h1"
                style={{ color: "var(--fg-on-ink)", maxWidth: 680, margin: "0 auto" }}
              >
                Let&apos;s create{" "}
                <em className="italic-crimson">together.</em>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* ── 2. Two-column: Form + Details ──────────────────────────── */}
        <section style={{ background: "var(--paper)", padding: "96px 0" }}>
          <div className="wrap">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "60fr 40fr",
                gap: 64,
                alignItems: "start",
              }}
            >
              {/* ── Left: Form ─────────────────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h3
                  className="k-h3"
                  style={{ color: "var(--fg1)", marginBottom: 40 }}
                >
                  Start your project
                </h3>

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
                        Message received!
                      </h3>
                      <p className="k-body" style={{ color: "var(--fg2)" }}>
                        We typically respond within one business day. Looking forward
                        to the conversation.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      onSubmit={handleSubmit}
                      style={{ display: "flex", flexDirection: "column", gap: 28 }}
                    >
                      {[
                        {
                          label: "Name",
                          name: "name",
                          type: "text",
                          placeholder: "Your full name",
                        },
                        {
                          label: "Email",
                          name: "email",
                          type: "email",
                          placeholder: "you@example.com",
                        },
                        {
                          label: "Phone",
                          name: "phone",
                          type: "tel",
                          placeholder: "+254 700 000 000",
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
                            required={field.name !== "phone"}
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
                          Inquiry type
                        </label>
                        <select
                          name="inquiryType"
                          required
                          value={form.inquiryType}
                          onChange={handleChange}
                          style={{ ...inputStyle, appearance: "none" }}
                          onFocus={focusIn}
                          onBlur={focusOut}
                        >
                          <option value="" disabled>
                            Select an inquiry type
                          </option>
                          {inquiryTypes.map((t) => (
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
                          placeholder="Tell us about your project, idea, or question..."
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
              </motion.div>

              {/* ── Right: Contact Details ────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                style={{ display: "flex", flexDirection: "column", gap: 40 }}
              >
                {/* Contact info rows */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 28,
                  }}
                >
                  {[
                    {
                      Icon: Mail,
                      label: "Email",
                      value: "hello@thekissa.com",
                      href: "mailto:hello@thekissa.com",
                    },
                    {
                      Icon: Phone,
                      label: "Phone",
                      value: "",
                      href: "tel:+254700000000",
                    },
                    {
                      Icon: MapPin,
                      label: "Location",
                      value: "",
                      href: undefined,
                    },
                    {
                      Icon: Clock,
                      label: "Hours",
                      value: "Mon–Fri · 9am–6pm EAT",
                      href: undefined,
                    },
                  ].map(({ Icon, label, value, href }) => {
                    const content = (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 16,
                        }}
                      >
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 12,
                            background: "rgba(0,0,0,0.07)",
                            border: "1px solid rgba(0,0,0,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={18} style={{ color: "var(--crimson)" }} />
                        </div>
                        <div>
                          <p
                            className="k-eyebrow"
                            style={{
                              color: "var(--fg3)",
                              marginBottom: 4,
                            }}
                          >
                            {label}
                          </p>
                          <p
                            className="k-body"
                            style={{ color: "var(--fg1)", fontWeight: 600 }}
                          >
                            {value}
                          </p>
                        </div>
                      </div>
                    );
                    return href ? (
                      <a
                        key={label}
                        href={href}
                        style={{ textDecoration: "none" }}
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={label}>{content}</div>
                    );
                  })}
                </div>

                {/* Social links */}
                <div>
                  <p
                    className="k-eyebrow"
                    style={{ color: "var(--fg3)", marginBottom: 16 }}
                  >
                    Follow us
                  </p>
                  <div style={{ display: "flex", gap: 12 }}>
                    {[
                      {
                        Icon: AtSign,
                        label: "Instagram",
                        href: "https://instagram.com/thekissa",
                      },
                      {
                        Icon: Link2,
                        label: "LinkedIn",
                        href: "https://linkedin.com/company/thekissa",
                      },
                      {
                        Icon: PlayCircle,
                        label: "Vimeo",
                        href: "https://vimeo.com/thekissa",
                      },
                    ].map(({ Icon, label, href }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          background: "var(--bone)",
                          border: "1px solid var(--line)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--fg3)",
                          transition: "color 0.2s",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLAnchorElement).style.color =
                            "var(--crimson)")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLAnchorElement).style.color =
                            "var(--fg3)")
                        }
                      >
                        <Icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 3. Map Placeholder ──────────────────────────────────────── */}
        <section style={{ background: "var(--bone)", paddingBottom: 0 }}>
          <div
            className="wrap"
            style={{ maxWidth: 1180, paddingBottom: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{
                width: "100%",
                aspectRatio: "16/5",
                background: "#241A18",
                borderRadius: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                margin: "0 auto",
              }}
            >
              <MapPin
                size={32}
                style={{ color: "var(--fg-on-ink-2)" }}
                strokeWidth={1.5}
              />
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 13,
                  color: "var(--fg-on-ink-2)",
                }}
              >
                
              </span>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
