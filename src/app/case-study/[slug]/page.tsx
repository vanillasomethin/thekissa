import Link from "next/link";
import { notFound } from "next/navigation";
import { getMergedManifest } from "@/lib/caseStudyStore";
import type { CaseStudy, CaseStudyMedia } from "@/lib/caseStudies";

export const dynamic = "force-dynamic";

function Media({ m, accent }: { m: CaseStudyMedia; accent: string }) {
  const common = {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    display: "block" as const,
  };
  return (
    <figure
      style={{
        margin: 0,
        borderRadius: 18,
        overflow: "hidden",
        background: `${accent}14`,
        aspectRatio: "4 / 3",
      }}
    >
      {m.type === "video" ? (
        <video autoPlay muted loop playsInline style={common}>
          <source src={m.url} />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={m.url} alt={m.caption ?? ""} style={common} />
      )}
    </figure>
  );
}

function MediaGrid({ media, accent }: { media: CaseStudyMedia[]; accent: string }) {
  if (!media.length) return null;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
        gap: 18,
        marginTop: 40,
      }}
    >
      {media.map((m, i) => (
        <Media key={i} m={m} accent={accent} />
      ))}
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--sans)",
          fontSize: 12,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.45)",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div style={{ fontFamily: "var(--sans)", fontSize: 17, color: "#fff", fontWeight: 500 }}>
        {value}
      </div>
    </div>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const manifest = await getMergedManifest();
  const study: CaseStudy | undefined = manifest[slug];
  if (!study) notFound();

  const others = Object.values(manifest).filter((s) => s.slug !== slug);

  return (
    <main style={{ background: "rgb(10,10,10)", color: "#fff", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "120px 32px 0" }}>
        <Link
          href="/#work"
          style={{
            fontFamily: "var(--sans)",
            fontSize: 14,
            color: "rgba(255,255,255,0.5)",
            textDecoration: "none",
          }}
        >
          ← Back to work
        </Link>
        <h1
          style={{
            fontFamily: "var(--sans)",
            fontSize: "clamp(48px, 9vw, 120px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 0.98,
            margin: "28px 0 18px",
            textWrap: "balance",
          }}
        >
          {study.brand}
        </h1>
        {study.intro && (
          <p
            style={{
              fontFamily: "var(--sans)",
              fontSize: "clamp(18px, 2.4vw, 26px)",
              color: "rgba(255,255,255,0.66)",
              maxWidth: "40ch",
              margin: 0,
            }}
          >
            {study.intro}
          </p>
        )}
      </section>

      {/* Cover */}
      {study.cover && (
        <section style={{ maxWidth: 1100, margin: "48px auto 0", padding: "0 32px" }}>
          <div
            style={{
              borderRadius: 24,
              overflow: "hidden",
              aspectRatio: "16 / 9",
              background: `${study.accent}22`,
            }}
          >
            {study.coverType === "video" ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              >
                <source src={study.cover} />
              </video>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={study.cover}
                alt={study.brand}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            )}
          </div>
        </section>
      )}

      {/* Meta bar */}
      <section style={{ maxWidth: 1100, margin: "64px auto 0", padding: "0 32px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 32,
            paddingBottom: 48,
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <MetaItem label="Brand" value={study.brand} />
          <MetaItem label="Industry" value={study.industry || "—"} />
          <MetaItem label="Year" value={study.year || "—"} />
          <MetaItem label="Services" value={study.services.join(", ") || "—"} />
        </div>
      </section>

      {/* Sections */}
      {study.sections.map((sec, i) => (
        <section
          key={i}
          style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 32px 0" }}
        >
          <h2
            style={{
              fontFamily: "var(--sans)",
              fontSize: "clamp(26px, 4vw, 44px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              margin: "0 0 20px",
              color: study.accent === "#ffffff" ? "#fff" : study.accent,
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.35)", marginRight: 12 }}>{sec.num})</span>
            {sec.title}
          </h2>
          {sec.body && (
            <p
              style={{
                fontFamily: "var(--sans)",
                fontSize: 17,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.72)",
                maxWidth: "68ch",
                whiteSpace: "pre-wrap",
                margin: 0,
              }}
            >
              {sec.body}
            </p>
          )}
          <MediaGrid media={sec.media} accent={study.accent} />
        </section>
      ))}

      {/* Other work */}
      {others.length > 0 && (
        <section style={{ maxWidth: 1100, margin: "120px auto 0", padding: "0 32px 120px" }}>
          <h2
            style={{
              fontFamily: "var(--sans)",
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              margin: "0 0 40px",
            }}
          >
            Other work you might like
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: 22,
            }}
          >
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/case-study/${o.slug}`}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <div
                  style={{
                    borderRadius: 18,
                    overflow: "hidden",
                    aspectRatio: "4 / 3",
                    background: `${o.accent}22`,
                    marginBottom: 14,
                  }}
                >
                  {o.cover &&
                    (o.coverType === "video" ? (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      >
                        <source src={o.cover} />
                      </video>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={o.cover}
                        alt={o.brand}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    ))}
                </div>
                <div style={{ fontFamily: "var(--sans)", fontSize: 18, fontWeight: 600 }}>
                  {o.brand}
                </div>
                <div
                  style={{
                    fontFamily: "var(--sans)",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  {o.industry}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
