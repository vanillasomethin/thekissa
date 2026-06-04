"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, TrendingUp, Users, MapPin, Briefcase, X, Upload, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────

type Job = {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  coverLetter: string;
  cv: File | null;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const WHY_WORK_HERE = [
  {
    icon: Palette,
    title: "Creative freedom",
    description:
      "Bold ideas are celebrated here. Bring your full creative self to every project — the Kissa backs your vision.",
  },
  {
    icon: TrendingUp,
    title: "Growth & learning",
    description:
      "Access mentorship, workshops, and real-world challenges that push your craft forward. Your growth is the Kissa's growth.",
  },
  {
    icon: Users,
    title: "Real culture",
    description:
      "A tight-knit crew that values humanity as much as hustle. Flexible hours, genuine collaboration, and zero ego.",
  },
];

const JOBS: Job[] = [
  {
    title: "Senior Brand Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description:
      "Lead brand identity projects from concept to delivery. Collaborate closely with strategists and clients to craft visual systems that resonate and endure.",
  },
  {
    title: "Video Producer",
    department: "Production",
    location: "Remote",
    type: "Full-time",
    description:
      "Own the full production pipeline — pre-production planning, on-set direction, and post-production oversight. Storytelling is your superpower.",
  },
  {
    title: "Social Media Strategist",
    department: "Marketing",
    location: "Remote",
    type: "Contract",
    description:
      "Build and execute data-driven social strategies for a diverse portfolio of clients. You understand culture, content calendars, and conversion.",
  },
  {
    title: "Motion Graphics Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description:
      "Create stunning motion graphics and animated content for brand campaigns, social media, and broadcast. After Effects and Cinema 4D are your playgrounds.",
  },
];

const CULTURE_VALUES = [
  {
    title: "Intentionality",
    text: "Every creative decision is purposeful — the Kissa never makes things just to make them.",
  },
  {
    title: "Collaboration",
    text: "The best work happens when diverse perspectives come together without hierarchy.",
  },
  {
    title: "Passion",
    text: "We're obsessive about craft. If you love what you do, you'll feel right at home.",
  },
];

// ─── Shared modal input style ─────────────────────────────────────────────────

const modalInputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--bone)",
  border: "1.5px solid var(--line)",
  borderRadius: 10,
  padding: "12px 16px",
  fontSize: 15,
  color: "var(--fg1)",
  outline: "none",
  fontFamily: "var(--sans)",
  boxSizing: "border-box",
};

// ─── Job Card ─────────────────────────────────────────────────────────────────

function JobCard({ job, onApply }: { job: Job; onApply: (job: Job) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="k-card"
      style={{
        background: "#fff",
        borderRadius: "var(--r-lg, 16px)",
        border: "1px solid var(--line)",
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <h3
          style={{
            fontFamily: "var(--serif-display)",
            fontSize: 22,
            fontWeight: 700,
            color: "var(--fg1)",
          }}
        >
          {job.title}
        </h3>
        <span
          style={{
            padding: "4px 14px",
            borderRadius: 20,
            fontSize: 12,
            fontFamily: "var(--sans)",
            fontWeight: 600,
            background: "var(--accent-soft)",
            color: "var(--fg3)",
          }}
        >
          {job.department}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--mono)",
            fontSize: 12,
            color: "var(--fg3)",
          }}
        >
          <MapPin size={13} /> {job.location}
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--mono)",
            fontSize: 12,
            color: "var(--fg3)",
          }}
        >
          <Briefcase size={13} /> {job.type}
        </span>
      </div>

      <p className="k-body" style={{ color: "var(--fg2)" }}>
        {job.description}
      </p>

      <button
        onClick={() => onApply(job)}
        className="btn btn-primary"
        style={{
          alignSelf: "flex-start",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          marginTop: 4,
        }}
      >
        Apply now →
      </button>
    </motion.div>
  );
}

// ─── Application Modal ────────────────────────────────────────────────────────

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  linkedin: "",
  portfolio: "",
  coverLetter: "",
  cv: null,
};

function ApplicationModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, cv: e.target.files?.[0] ?? null }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        background: "rgba(22,16,15,0.6)",
        backdropFilter: "blur(6px)",
      }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 600,
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#fff",
          borderRadius: 20,
          padding: 40,
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "var(--bone)",
            border: "none",
            borderRadius: 8,
            padding: 8,
            cursor: "pointer",
            color: "var(--fg3)",
            display: "flex",
          }}
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            <div style={{ marginBottom: 28 }}>
              <p
                className="k-eyebrow"
                style={{ color: "var(--crimson)", marginBottom: 8 }}
              >
                {job.title}
              </p>
              <h2
                className="k-h3"
                style={{ color: "var(--fg1)" }}
              >
                Apply for a role
              </h2>
            </div>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              {/* Name */}
              <div>
                <label
                  className="k-eyebrow"
                  style={{
                    color: "var(--fg3)",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Full name *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Jane Mwangi"
                  style={modalInputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--crimson)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--line)")
                  }
                />
              </div>

              {/* Email + Phone */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                {[
                  {
                    label: "Email *",
                    name: "email",
                    type: "email",
                    placeholder: "jane@example.com",
                    required: true,
                  },
                  {
                    label: "Phone",
                    name: "phone",
                    type: "tel",
                    placeholder: "Your phone number",
                    required: false,
                  },
                ].map((f) => (
                  <div key={f.name}>
                    <label
                      className="k-eyebrow"
                      style={{
                        color: "var(--fg3)",
                        display: "block",
                        marginBottom: 6,
                      }}
                    >
                      {f.label}
                    </label>
                    <input
                      name={f.name}
                      type={f.type}
                      value={((form as Record<string, unknown>)[f.name] as string) ?? ""}
                      onChange={handleChange}
                      required={f.required}
                      placeholder={f.placeholder}
                      style={modalInputStyle}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "var(--crimson)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "var(--line)")
                      }
                    />
                  </div>
                ))}
              </div>

              {/* LinkedIn + Portfolio */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                {[
                  {
                    label: "LinkedIn URL",
                    name: "linkedin",
                    placeholder: "https://linkedin.com/in/...",
                  },
                  {
                    label: "Portfolio URL",
                    name: "portfolio",
                    placeholder: "https://yourportfolio.com",
                  },
                ].map((f) => (
                  <div key={f.name}>
                    <label
                      className="k-eyebrow"
                      style={{
                        color: "var(--fg3)",
                        display: "block",
                        marginBottom: 6,
                      }}
                    >
                      {f.label}
                    </label>
                    <input
                      name={f.name}
                      type="url"
                      value={((form as Record<string, unknown>)[f.name] as string) ?? ""}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      style={modalInputStyle}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "var(--crimson)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "var(--line)")
                      }
                    />
                  </div>
                ))}
              </div>

              {/* Cover Letter */}
              <div>
                <label
                  className="k-eyebrow"
                  style={{
                    color: "var(--fg3)",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Cover letter *
                </label>
                <textarea
                  name="coverLetter"
                  value={form.coverLetter}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us why you'd be a great fit..."
                  style={{ ...modalInputStyle, resize: "none" }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--crimson)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--line)")
                  }
                />
              </div>

              {/* CV Upload */}
              <div>
                <label
                  className="k-eyebrow"
                  style={{
                    color: "var(--fg3)",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Upload CV *
                </label>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    width: "100%",
                    background: "var(--bone)",
                    border: "1.5px dashed var(--line)",
                    borderRadius: 10,
                    padding: "14px 16px",
                    cursor: "pointer",
                    boxSizing: "border-box",
                  }}
                >
                  <Upload
                    size={18}
                    style={{ color: "var(--crimson)", flexShrink: 0 }}
                  />
                  <span
                    className="k-body"
                    style={{ color: "var(--fg3)", fontSize: 14 }}
                  >
                    {form.cv ? form.cv.name : "Click to upload PDF, DOC, or DOCX"}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFile}
                    required
                    style={{ display: "none" }}
                  />
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  marginTop: 8,
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                Submit application
              </button>
            </form>
          </>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "40px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <CheckCircle2
              size={48}
              style={{ color: "var(--crimson)" }}
            />
            <h2 className="k-h3" style={{ color: "var(--fg1)" }}>
              Application sent!
            </h2>
            <p className="k-body" style={{ color: "var(--fg2)", maxWidth: 340 }}>
              Thanks for applying for{" "}
              <strong style={{ color: "var(--crimson)" }}>{job.title}</strong>.
              The team will review your application and be in touch soon.
            </p>
            <button
              onClick={onClose}
              className="btn btn-ghost"
              style={{ marginTop: 8 }}
            >
              Close
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

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
                Join the team
              </p>
              <h1
                className="k-h1"
                style={{
                  color: "var(--fg-on-ink)",
                  maxWidth: 680,
                  margin: "0 auto",
                }}
              >
                We&apos;re building{" "}
                <em className="italic-crimson">something bold.</em>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* ── Why Work Here ── */}
        <section style={{ background: "var(--paper)", padding: "96px 0" }}>
          <div className="wrap">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: 56, textAlign: "center" }}
            >
              <p
                className="k-eyebrow"
                style={{ color: "var(--fg3)", marginBottom: 12 }}
              >
                Why the Kissa
              </p>
              <h2 className="k-h2" style={{ color: "var(--fg1)" }}>
                More than a job.
              </h2>
            </motion.div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 24,
              }}
            >
              {WHY_WORK_HERE.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{
                    background: "#fff",
                    borderRadius: "var(--r-lg, 16px)",
                    border: "1px solid var(--line)",
                    padding: 28,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: "rgba(173,19,53,0.07)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <item.icon size={22} style={{ color: "var(--crimson)" }} />
                  </div>
                  <h3
                    className="k-h3"
                    style={{ color: "var(--fg1)", fontSize: 19 }}
                  >
                    {item.title}
                  </h3>
                  <p className="k-body" style={{ color: "var(--fg2)" }}>
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Open Positions ── */}
        <section style={{ background: "var(--bone)", padding: "96px 0" }}>
          <div className="wrap">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: 48, textAlign: "center" }}
            >
              <h2 className="k-h2" style={{ color: "var(--fg1)" }}>
                Open positions
              </h2>
            </motion.div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 24,
              }}
            >
              {JOBS.map((job) => (
                <JobCard key={job.title} job={job} onApply={setSelectedJob} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Culture ── */}
        <section
          style={{
            background: "var(--ink)",
            padding: "96px 0",
            textAlign: "center",
          }}
        >
          <div className="wrap" style={{ maxWidth: 860 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <blockquote
                style={{
                  fontFamily: "var(--serif-display)",
                  fontSize: "clamp(24px, 3.5vw, 42px)",
                  fontStyle: "italic",
                  color: "var(--fg-on-ink)",
                  lineHeight: 1.3,
                  marginBottom: 64,
                }}
              >
                &ldquo;We don&apos;t hire for roles. We invite people into a creative family.&rdquo;
              </blockquote>
            </motion.div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 20,
              }}
            >
              {CULTURE_VALUES.map((val, i) => (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{
                    background: "rgba(244,239,233,0.07)",
                    border: "1px solid rgba(244,239,233,0.12)",
                    borderRadius: 16,
                    padding: "28px 24px",
                    textAlign: "center",
                  }}
                >
                  <h3
                    className="k-h3"
                    style={{
                      color: "var(--fg-on-ink)",
                      fontSize: 17,
                      marginBottom: 12,
                    }}
                  >
                    {val.title}
                  </h3>
                  <p
                    className="k-body"
                    style={{ color: "var(--fg-on-ink-2)", fontSize: 14 }}
                  >
                    {val.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />

      {/* ── Application Modal ── */}
      <AnimatePresence>
        {selectedJob && (
          <ApplicationModal
            job={selectedJob}
            onClose={() => setSelectedJob(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
