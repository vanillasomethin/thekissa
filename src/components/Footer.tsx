import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Studio", href: "/studio" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
];

const socialLinks = [
  { label: "IG", href: "https://instagram.com" },
  { label: "LI", href: "https://linkedin.com" },
  { label: "YT", href: "https://youtube.com" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#000000", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "68px 50px" }}>

        {/* Top row: logo + pill clusters */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 68 }}>

          {/* Circular logo */}
          <Link href="/" aria-label="the Kissa — home" style={{ flexShrink: 0 }}>
            <div style={{
              width: 68,
              height: 68,
              borderRadius: "50%",
              background: "rgb(28,28,28)",
              boxShadow: "rgba(0,0,0,0.75) 0px 0px 20px 0px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}>
              <Image src="/logo-white.png" alt="the Kissa" height={32} width={96} style={{ height: "32px", width: "auto" }} />
            </div>
          </Link>

          {/* Nav pill */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "rgb(28,28,28)",
            borderRadius: 68,
            padding: "8px 12px",
            flexWrap: "wrap",
          }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                  padding: "6px 14px",
                  borderRadius: 68,
                  transition: "color 0.2s ease, background 0.2s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)"; (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social pill */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "rgb(28,28,28)",
            borderRadius: 68,
            padding: "8px 12px",
          }}>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  padding: "6px 14px",
                  borderRadius: 68,
                  letterSpacing: "0.04em",
                  transition: "color 0.2s ease, background 0.2s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)"; (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact pill */}
          <div style={{
            background: "rgb(28,28,28)",
            borderRadius: 68,
            padding: "8px 20px",
          }}>
            <a
              href="mailto:hello@thekissa.com"
              style={{
                fontFamily: "var(--sans)",
                fontSize: 13,
                color: "rgba(255,255,255,0.55)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#ffffff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)")}
            >
              hello@thekissa.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <p style={{ fontFamily: "var(--sans)", fontSize: 12, color: "rgba(255,255,255,0.3)", margin: 0 }}>
            © 2026 the Kissa. Where art meets storytelling.
          </p>
          <p style={{ fontFamily: "var(--sans)", fontSize: 12, color: "rgba(255,255,255,0.2)", margin: 0 }}>
            Nairobi · Dubai · London
          </p>
        </div>

      </div>
    </footer>
  );
}
