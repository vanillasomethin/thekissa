import Link from "next/link";
import Image from "next/image";
import { AtSign, Linkedin, PlayCircle } from "lucide-react";

const studioLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/studio" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
];

const connectLinks = [
  { label: "hello@thekissa.co", href: "mailto:hello@thekissa.co" },
  { label: "+254 700 000 000", href: "tel:+254700000000" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const socialLinks = [
  { Icon: AtSign, href: "https://instagram.com", label: "Instagram" },
  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: PlayCircle, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--ink)", color: "var(--fg-on-ink)" }}>
      <div
        className="max-w-7xl mx-auto"
        style={{ padding: "80px 24px 0" }}
      >
        {/* Top 3-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "48px",
            marginBottom: "72px",
          }}
        >
          {/* Col 1: Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Link href="/" aria-label="the Kissa — home">
              <Image
                src="/logo-white.png"
                alt="the Kissa"
                height={40}
                width={120}
                style={{ height: "40px", width: "auto" }}
              />
            </Link>
            <p
              style={{
                fontFamily: "var(--serif-display)",
                fontStyle: "italic",
                fontSize: "17px",
                color: "var(--fg-on-ink)",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Where art meets storytelling.
            </p>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: "12px",
                color: "var(--fg-on-ink-2)",
                letterSpacing: "0.04em",
              }}
            >
              Nairobi, Kenya
            </span>
          </div>

          {/* Col 2: Studio */}
          <div>
            <h4
              style={{
                fontFamily: "var(--sans)",
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#ffffff",
                margin: "0 0 20px 0",
              }}
            >
              Studio
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {studioLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Connect */}
          <div>
            <h4
              style={{
                fontFamily: "var(--sans)",
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#ffffff",
                margin: "0 0 20px 0",
              }}
            >
              Connect
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {connectLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter strip */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            padding: "40px 0",
            marginBottom: "0",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "24px",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--mono)",
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--fg-on-ink-2)",
                margin: "0 0 6px 0",
              }}
            >
              Stay in the loop
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "var(--fg-on-ink-2)",
                margin: 0,
              }}
            >
              New work, dispatches, and creative thinking.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: "flex", alignItems: "flex-end", gap: "12px", flexWrap: "wrap" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label
                htmlFor="footer-email"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "11px",
                  color: "var(--fg-on-ink-2)",
                  letterSpacing: "0.05em",
                }}
              >
                Your email
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="you@example.com"
                required
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid var(--fg-on-ink-2)",
                  color: "var(--fg-on-ink)",
                  fontFamily: "var(--sans)",
                  fontSize: "15px",
                  padding: "6px 0",
                  outline: "none",
                  width: "220px",
                  caretColor: "var(--crimson)",
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLInputElement).style.borderBottomColor = "#ffffff";
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLInputElement).style.borderBottomColor = "var(--fg-on-ink-2)";
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "var(--crimson)",
                color: "#ffffff",
                fontFamily: "var(--sans)",
                fontWeight: 600,
                fontSize: "14px",
                padding: "10px 18px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "var(--crimson-deep)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "var(--crimson)";
              }}
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            padding: "24px 0 32px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: "12px",
              color: "var(--fg-on-ink-2)",
              margin: 0,
            }}
          >
            © 2026 the Kissa — Where art meets storytelling.
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  color: "var(--fg-on-ink-2)",
                  display: "block",
                  lineHeight: 0,
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--fg-on-ink-2)";
                }}
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isExternal =
    href.startsWith("mailto:") || href.startsWith("tel:");

  const sharedStyle: React.CSSProperties = {
    fontFamily: "var(--sans)",
    fontSize: "15px",
    color: "var(--fg-on-ink-2)",
    textDecoration: "none",
    transition: "color 0.2s ease",
    display: "inline-block",
  };

  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "#ffffff";
  };
  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "var(--fg-on-ink-2)";
  };

  if (isExternal) {
    return (
      <a
        href={href}
        style={sharedStyle}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      style={sharedStyle}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
    </Link>
  );
}
