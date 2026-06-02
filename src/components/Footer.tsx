import Link from "next/link";
import { Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

const columns = [
  {
    heading: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Graphic Design", href: "/services/graphic-design" },
      { label: "Video Production", href: "/services/video-production" },
      { label: "Branding", href: "/services/branding" },
      { label: "Social Media", href: "/services/social-media" },
      { label: "Photography", href: "/services/photography" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Collaborators", href: "/collaborators" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
];

const socialLinks = [
  { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: Twitter, href: "https://twitter.com", label: "Twitter / X" },
  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1A1A1A" }} className="text-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
          {/* Logo + tagline */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block text-2xl font-extrabold tracking-widest mb-3">
              <span
                style={{
                  background: "linear-gradient(90deg, #FFD700, #FF6B35, #FF3CAC)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                KISSA
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Where creativity meets strategy.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-[#FFD700] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div
          className="rounded-2xl p-8 mb-12"
          style={{ backgroundColor: "#111111" }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold mb-1">Stay in the loop</h3>
              <p className="text-sm text-gray-400">
                Get the latest news, updates, and creative inspiration straight to your inbox.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full md:w-auto gap-0"
            >
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="flex-1 md:w-64 px-4 py-3 rounded-l-full bg-[#1A1A1A] border border-gray-700 text-sm text-[#F5F5F5] placeholder-gray-500 focus:outline-none focus:border-[#FF3CAC] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-r-full text-sm font-semibold text-white transition-all duration-200 hover:brightness-110"
                style={{ backgroundColor: "#FF3CAC" }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-800 pt-8">
          <p className="text-xs text-gray-500">
            © 2024 Kissa Media Arts Agency. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-gray-400 hover:text-[#FF3CAC] transition-colors duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
