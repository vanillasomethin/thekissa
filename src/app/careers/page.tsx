"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, TrendingUp, Heart, MapPin, Briefcase, X, Upload } from "lucide-react";

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
    title: "Creative Freedom",
    description:
      "We foster an environment where bold ideas are celebrated. Bring your full creative self to every project — we back your vision.",
    color: "#FFD700",
  },
  {
    icon: TrendingUp,
    title: "Growth & Learning",
    description:
      "Access mentorship, workshops, and real-world challenges that push your craft forward. We invest in your growth because your growth is ours.",
    color: "#FF6B35",
  },
  {
    icon: Heart,
    title: "Great Culture",
    description:
      "We're a tight-knit crew that values humanity as much as hustle. Flexible hours, team retreats, and zero ego — just vibes and great work.",
    color: "#FF3CAC",
  },
];

const JOBS: Job[] = [
  {
    title: "Senior Brand Designer",
    department: "Design",
    location: "Nairobi",
    type: "Full-time",
    description:
      "Lead brand identity projects from concept to delivery. You'll collaborate closely with strategists and clients to craft visual systems that resonate and endure.",
  },
  {
    title: "Video Producer",
    department: "Production",
    location: "Nairobi",
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
  { emoji: "🎯", title: "Intentionality", text: "Every creative decision is purposeful — we never make things just to make them." },
  { emoji: "🤝", title: "Collaboration", text: "The best work happens when diverse perspectives come together without hierarchy." },
  { emoji: "🔥", title: "Passion", text: "We're obsessive about craft. If you love what you do, you'll feel right at home." },
];

// ─── Department Badge ─────────────────────────────────────────────────────────

const DEPT_COLORS: Record<string, string> = {
  Design: "bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/20",
  Production: "bg-[#FF6B35]/10 text-[#FF6B35] border-[#FF6B35]/20",
  Marketing: "bg-[#FF3CAC]/10 text-[#FF3CAC] border-[#FF3CAC]/20",
};

function DeptBadge({ dept }: { dept: string }) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${DEPT_COLORS[dept] ?? "bg-white/10 text-white/60 border-white/10"}`}>
      {dept}
    </span>
  );
}

// ─── Job Card ─────────────────────────────────────────────────────────────────

function JobCard({ job, onApply }: { job: Job; onApply: (job: Job) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-white/[0.03] border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:border-[#FFD700]/30 transition-colors duration-300"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-[#F5F5F5] mb-2">{job.title}</h3>
          <DeptBadge dept={job.department} />
        </div>
      </div>

      <p className="text-[#F5F5F5]/60 text-sm leading-relaxed">{job.description}</p>

      <div className="flex flex-wrap gap-4 text-sm text-[#F5F5F5]/50">
        <span className="flex items-center gap-1.5">
          <MapPin size={14} className="text-[#FF6B35]" />
          {job.location}
        </span>
        <span className="flex items-center gap-1.5">
          <Briefcase size={14} className="text-[#FF6B35]" />
          {job.type}
        </span>
      </div>

      <button
        onClick={() => onApply(job)}
        className="mt-auto self-start px-5 py-2.5 rounded-xl font-semibold text-sm bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FF6B35] hover:text-white transition-all duration-200"
      >
        Apply Now
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#111111] border border-white/10 rounded-2xl p-8"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-[#F5F5F5]/40 hover:text-[#F5F5F5] hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-black text-[#F5F5F5] mb-1">Apply for a Role</h2>
              <div className="flex items-center gap-2">
                <span className="text-[#FFD700] font-semibold">{job.title}</span>
                <span className="text-[#F5F5F5]/30">·</span>
                <DeptBadge dept={job.department} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-[#F5F5F5]/70 mb-1.5">Full Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Jane Mwangi"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#F5F5F5] placeholder-white/20 focus:outline-none focus:border-[#FFD700]/50 transition-colors text-sm"
                />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#F5F5F5]/70 mb-1.5">Email *</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="jane@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#F5F5F5] placeholder-white/20 focus:outline-none focus:border-[#FFD700]/50 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#F5F5F5]/70 mb-1.5">Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+254 700 000 000"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#F5F5F5] placeholder-white/20 focus:outline-none focus:border-[#FFD700]/50 transition-colors text-sm"
                  />
                </div>
              </div>

              {/* LinkedIn + Portfolio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#F5F5F5]/70 mb-1.5">LinkedIn URL</label>
                  <input
                    name="linkedin"
                    type="url"
                    value={form.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#F5F5F5] placeholder-white/20 focus:outline-none focus:border-[#FFD700]/50 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#F5F5F5]/70 mb-1.5">Portfolio URL</label>
                  <input
                    name="portfolio"
                    type="url"
                    value={form.portfolio}
                    onChange={handleChange}
                    placeholder="https://yourportfolio.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#F5F5F5] placeholder-white/20 focus:outline-none focus:border-[#FFD700]/50 transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-medium text-[#F5F5F5]/70 mb-1.5">Cover Letter *</label>
                <textarea
                  name="coverLetter"
                  value={form.coverLetter}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us why you'd be a great fit for this role..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#F5F5F5] placeholder-white/20 focus:outline-none focus:border-[#FFD700]/50 transition-colors text-sm resize-none"
                />
              </div>

              {/* CV Upload */}
              <div>
                <label className="block text-sm font-medium text-[#F5F5F5]/70 mb-1.5">Upload CV *</label>
                <label className="flex items-center gap-3 w-full bg-white/5 border border-dashed border-white/20 rounded-xl px-4 py-4 cursor-pointer hover:border-[#FFD700]/40 transition-colors group">
                  <Upload size={18} className="text-[#FF6B35] shrink-0" />
                  <span className="text-sm text-[#F5F5F5]/50 group-hover:text-[#F5F5F5]/80 transition-colors">
                    {form.cv ? form.cv.name : "Click to upload PDF, DOC, or DOCX"}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFile}
                    required
                    className="hidden"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-3.5 rounded-xl font-bold text-[#0A0A0A] bg-[#FFD700] hover:bg-[#FF6B35] hover:text-white transition-all duration-200 text-base"
              >
                Submit Application
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-[#FFD700]/10 flex items-center justify-center mx-auto mb-5">
              <span className="text-3xl">🎉</span>
            </div>
            <h2 className="text-2xl font-black text-[#F5F5F5] mb-3">Application Sent!</h2>
            <p className="text-[#F5F5F5]/60 mb-8 max-w-sm mx-auto">
              Thanks for applying for <span className="text-[#FFD700] font-semibold">{job.title}</span>. We'll review your application and be in touch soon.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl font-semibold text-[#0A0A0A] bg-[#FFD700] hover:bg-[#FF6B35] hover:text-white transition-all duration-200"
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
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5]">

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[#FF3CAC]/8 rounded-full blur-[140px]" />
          <div className="absolute top-20 left-1/3 w-[300px] h-[300px] bg-[#FFD700]/6 rounded-full blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-5 leading-tight">
            <span
              style={{
                background: "linear-gradient(135deg, #FFD700 0%, #FF6B35 50%, #FF3CAC 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Join the Team
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[#F5F5F5]/60 font-light max-w-xl mx-auto leading-relaxed">
            At Kissa, we don&apos;t just make content — we shape culture. We&apos;re a crew of creatives, strategists, and storytellers who believe great work starts with great people.
          </p>
        </motion.div>
      </section>

      {/* ── Why Work Here ── */}
      <section className="px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-3">Why Work Here?</h2>
            <p className="text-[#F5F5F5]/50">More than a job — a place to do the best work of your life.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHY_WORK_HERE.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-7 flex flex-col gap-4 hover:border-white/20 transition-colors duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon size={22} style={{ color: item.color }} />
                </div>
                <h3 className="text-lg font-bold text-[#F5F5F5]">{item.title}</h3>
                <p className="text-[#F5F5F5]/55 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Positions ── */}
      <section className="px-4 py-20 bg-white/[0.015]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-3">Open Positions</h2>
            <p className="text-[#F5F5F5]/50">Find your place in the Kissa story.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {JOBS.map((job) => (
              <JobCard key={job.title} job={job} onApply={setSelectedJob} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Culture Section ── */}
      <section className="px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-8">
              <blockquote className="text-2xl md:text-3xl font-black leading-snug">
                <span className="text-[#FFD700]">&ldquo;</span>
                We don&apos;t hire for roles,{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #FFD700 0%, #FF6B35 60%, #FF3CAC 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  we invite people into a creative family.
                </span>
                <span className="text-[#FFD700]">&rdquo;</span>
              </blockquote>
              <p className="text-[#F5F5F5]/40 mt-3 text-sm">— Kissa Media Arts Agency</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CULTURE_VALUES.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center hover:border-[#FFD700]/20 transition-colors duration-300"
              >
                <div className="text-3xl mb-4">{val.emoji}</div>
                <h3 className="text-base font-bold text-[#F5F5F5] mb-2">{val.title}</h3>
                <p className="text-[#F5F5F5]/50 text-sm leading-relaxed">{val.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Application Modal ── */}
      <AnimatePresence>
        {selectedJob && (
          <ApplicationModal job={selectedJob} onClose={() => setSelectedJob(null)} />
        )}
      </AnimatePresence>

    </main>
  );
}
