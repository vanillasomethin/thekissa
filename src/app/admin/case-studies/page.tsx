"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { CaseStudy, CaseStudyMedia } from "@/lib/caseStudies";
import { emptyCaseStudy } from "@/lib/caseStudies";

type Manifest = Record<string, CaseStudy>;

/* ---------- upload helper ---------- */
async function uploadFile(slug: string, file: File): Promise<CaseStudyMedia> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("slug", slug);
  const res = await fetch("/api/case-studies/upload", { method: "POST", body: fd });
  if (!res.ok) throw new Error((await res.json()).error || "Upload failed");
  const { url, type } = await res.json();
  return { url, type };
}

/* ---------- drop zone ---------- */
function DropZone({
  slug,
  label,
  onDropped,
  multiple,
}: {
  slug: string;
  label: string;
  onDropped: (m: CaseStudyMedia[]) => void;
  multiple?: boolean;
}) {
  const [over, setOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || !files.length) return;
      setBusy(true);
      try {
        const list = multiple ? Array.from(files) : [files[0]];
        const uploaded = await Promise.all(list.map((f) => uploadFile(slug, f)));
        onDropped(uploaded);
      } catch (e) {
        alert(e instanceof Error ? e.message : "Upload failed");
      } finally {
        setBusy(false);
      }
    },
    [slug, multiple, onDropped]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      style={{
        border: `2px dashed ${over ? "#AD1335" : "rgba(255,255,255,0.25)"}`,
        borderRadius: 12,
        padding: "18px 16px",
        textAlign: "center",
        cursor: "pointer",
        background: over ? "rgba(173,19,53,0.12)" : "rgba(255,255,255,0.03)",
        color: "rgba(255,255,255,0.6)",
        fontSize: 13,
        transition: "all 0.15s",
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple={multiple}
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />
      {busy ? "Uploading…" : over ? "Drop to upload" : label}
    </div>
  );
}

function Thumb({ m, onRemove }: { m: CaseStudyMedia; onRemove: () => void }) {
  return (
    <div style={{ position: "relative", borderRadius: 8, overflow: "hidden", aspectRatio: "4/3", background: "#000" }}>
      {m.type === "video" ? (
        <video muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }}>
          <source src={m.url} />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={m.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      )}
      <button
        onClick={onRemove}
        style={{
          position: "absolute",
          top: 4,
          right: 4,
          border: "none",
          background: "rgba(0,0,0,0.7)",
          color: "#fff",
          borderRadius: 6,
          width: 22,
          height: 22,
          cursor: "pointer",
          fontSize: 13,
        }}
      >
        ×
      </button>
    </div>
  );
}

/* ---------- field primitives ---------- */
const labelStyle: React.CSSProperties = {
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "rgba(255,255,255,0.4)",
  marginBottom: 6,
  display: "block",
};
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  fontSize: 14,
  fontFamily: "inherit",
};

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
        />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
      )}
    </div>
  );
}

/* ---------- editor ---------- */
function Editor({
  study,
  onChange,
  onSave,
  saving,
}: {
  study: CaseStudy;
  onChange: (s: CaseStudy) => void;
  onSave: () => void;
  saving: boolean;
}) {
  const set = (patch: Partial<CaseStudy>) => onChange({ ...study, ...patch });
  const setSection = (i: number, patch: Partial<CaseStudy["sections"][number]>) =>
    set({ sections: study.sections.map((s, idx) => (idx === i ? { ...s, ...patch } : s)) });

  return (
    <div style={{ maxWidth: 760 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, margin: 0 }}>{study.brand}</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <a
            href={`/case-study/${study.slug}`}
            target="_blank"
            rel="noreferrer"
            style={{ ...pillBtn, background: "transparent", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            Preview ↗
          </a>
          <button onClick={onSave} disabled={saving} style={pillBtn}>
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {/* Meta */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="Brand" value={study.brand} onChange={(v) => set({ brand: v })} />
        <Field label="Industry" value={study.industry} onChange={(v) => set({ industry: v })} />
        <Field label="Year" value={study.year} onChange={(v) => set({ year: v })} />
        <Field
          label="Services (comma-separated)"
          value={study.services.join(", ")}
          onChange={(v) => set({ services: v.split(",").map((s) => s.trim()).filter(Boolean) })}
        />
        <Field label="Accent color (hex)" value={study.accent} onChange={(v) => set({ accent: v })} />
      </div>
      <Field label="Intro / tagline" value={study.intro} onChange={(v) => set({ intro: v })} />

      {/* Cover */}
      <div style={{ marginBottom: 28 }}>
        <label style={labelStyle}>Cover (page-1 hero)</label>
        {study.cover ? (
          <div style={{ maxWidth: 260 }}>
            <Thumb m={{ url: study.cover, type: study.coverType }} onRemove={() => set({ cover: "" })} />
          </div>
        ) : (
          <DropZone
            slug={study.slug}
            label="Drag cover image/video here, or click"
            onDropped={(m) => set({ cover: m[0].url, coverType: m[0].type })}
          />
        )}
      </div>

      {/* Sections */}
      {study.sections.map((sec, i) => (
        <div
          key={i}
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 14,
            padding: 20,
            marginBottom: 20,
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 12 }}>
            <Field label="No." value={sec.num} onChange={(v) => setSection(i, { num: v })} />
            <Field label="Title" value={sec.title} onChange={(v) => setSection(i, { title: v })} />
          </div>
          <Field label="Body" value={sec.body} onChange={(v) => setSection(i, { body: v })} textarea />
          <label style={labelStyle}>Media (images + looping videos, in order)</label>
          {sec.media.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: 10,
                marginBottom: 12,
              }}
            >
              {sec.media.map((m, mi) => (
                <Thumb
                  key={mi}
                  m={m}
                  onRemove={() => setSection(i, { media: sec.media.filter((_, x) => x !== mi) })}
                />
              ))}
            </div>
          )}
          <DropZone
            slug={study.slug}
            label="Drag one or more assets here"
            multiple
            onDropped={(m) => setSection(i, { media: [...sec.media, ...m] })}
          />
        </div>
      ))}
    </div>
  );
}

const pillBtn: React.CSSProperties = {
  padding: "10px 20px",
  borderRadius: 999,
  border: "none",
  background: "#AD1335",
  color: "#fff",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
};

/* ---------- page ---------- */
export default function AdminCaseStudies() {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [active, setActive] = useState<string>("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/case-studies")
      .then((r) => r.json())
      .then((d) => {
        setManifest(d.caseStudies);
        setActive(Object.keys(d.caseStudies)[0] || "");
      });
  }, []);

  const save = async () => {
    if (!manifest || !active) return;
    setSaving(true);
    try {
      await fetch("/api/case-studies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: active, data: manifest[active] }),
      });
    } finally {
      setSaving(false);
    }
  };

  if (!manifest) {
    return (
      <div style={{ background: "rgb(10,10,10)", color: "#fff", minHeight: "100vh", padding: 60, fontFamily: "system-ui" }}>
        Loading…
      </div>
    );
  }

  const slugs = Object.keys(manifest);
  const study = manifest[active];

  return (
    <div
      style={{
        background: "rgb(10,10,10)",
        color: "#fff",
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "220px 1fr",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          borderRight: "1px solid rgba(255,255,255,0.1)",
          padding: "32px 16px",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)", marginBottom: 18 }}>
          Case studies
        </div>
        {slugs.map((slug) => (
          <button
            key={slug}
            onClick={() => setActive(slug)}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "10px 12px",
              borderRadius: 8,
              border: "none",
              marginBottom: 4,
              cursor: "pointer",
              background: slug === active ? "rgba(173,19,53,0.25)" : "transparent",
              color: slug === active ? "#fff" : "rgba(255,255,255,0.6)",
              fontSize: 14,
            }}
          >
            {manifest[slug].brand}
          </button>
        ))}

        <button
          onClick={() => {
            const name = prompt("New case study — slug (lowercase, e.g. acme):");
            if (!name) return;
            const slug = name.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-");
            if (!slug) return;
            if (manifest[slug]) {
              setActive(slug);
              return;
            }
            setManifest({ ...manifest, [slug]: emptyCaseStudy(slug) });
            setActive(slug);
          }}
          style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px dashed rgba(255,255,255,0.2)",
            marginTop: 12,
            cursor: "pointer",
            background: "transparent",
            color: "rgba(255,255,255,0.6)",
            fontSize: 14,
          }}
        >
          + New case study
        </button>
      </aside>

      {/* Editor */}
      <main style={{ padding: "40px 48px" }}>
        {study && (
          <Editor
            study={study}
            onChange={(s) => setManifest({ ...manifest, [active]: s })}
            onSave={save}
            saving={saving}
          />
        )}
      </main>
    </div>
  );
}
