"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Studio", href: "/studio" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          backgroundColor: scrolled ? "rgba(250,250,250,0.92)" : "transparent",
          boxShadow: scrolled ? "0 1px 0 #E4E4E4" : "none",
        }}
      >
        <nav
          className="max-w-7xl mx-auto px-6 flex items-center justify-between"
          style={{ height: "68px" }}
        >
          {/* Logo */}
          <Link href="/" aria-label="the Kissa — home">
            <Image
              src={scrolled ? "/logo-ink.png" : "/logo-white.png"}
              alt="the Kissa"
              height={44}
              width={132}
              style={{ height: "44px", width: "auto" }}
              priority
            />
          </Link>

          {/* Desktop nav links — hidden below 860px */}
          <ul
            className="items-center gap-8"
            style={{ display: "none" }}
            id="desktop-nav"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} scrolled={scrolled}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            {/* Let's talk — desktop */}
            <Link
              href="/contact"
              style={{
                display: "none",
                backgroundColor: "var(--ink)",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "14px",
                padding: "10px 20px",
                borderRadius: "10px",
                transition: "background-color 0.2s ease",
                whiteSpace: "nowrap",
              }}
              id="desktop-cta"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "var(--crimson)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "var(--ink)";
              }}
            >
              Let&apos;s talk
            </Link>

            {/* Hamburger button */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{
                width: "42px",
                height: "42px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: scrolled ? "var(--ink)" : "#ffffff",
                padding: 0,
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ display: "block", lineHeight: 0 }}
                  >
                    <X size={24} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ display: "block", lineHeight: 0 }}
                  >
                    <Menu size={24} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* Responsive style to show desktop nav above 860px */}
      <style>{`
        @media (min-width: 860px) {
          #desktop-nav { display: flex !important; }
          #desktop-cta { display: inline-flex !important; }
        }
      `}</style>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 40,
              backgroundColor: "var(--ink)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 40px",
            }}
          >
            {/* Nav links */}
            <nav>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.07, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        fontFamily: "var(--serif-display)",
                        fontSize: "44px",
                        fontWeight: 700,
                        color: "#ffffff",
                        textDecoration: "none",
                        display: "block",
                        lineHeight: 1.15,
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          "var(--crimson)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          "#ffffff";
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}

                {/* Let's talk in mobile menu */}
                <motion.li
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + navLinks.length * 0.07,
                    duration: 0.3,
                  }}
                  style={{ marginTop: "24px" }}
                >
                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: "var(--serif-display)",
                      fontSize: "44px",
                      fontWeight: 700,
                      color: "var(--crimson)",
                      textDecoration: "none",
                      display: "inline-block",
                      lineHeight: 1.15,
                    }}
                  >
                    Let&apos;s talk
                  </Link>
                </motion.li>
              </ul>
            </nav>

            {/* Bottom meta row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42, duration: 0.3 }}
              style={{
                position: "absolute",
                bottom: "40px",
                left: "40px",
                right: "40px",
                display: "flex",
                alignItems: "center",
                gap: "32px",
                fontFamily: "var(--mono)",
                fontSize: "12px",
                color: "var(--fg-on-ink-2)",
                flexWrap: "wrap",
              }}
            >
              <a
                href="mailto:hello@thekissa.com"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                hello@thekissa.com
              </a>
              <span>hello@thekissa.com</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* Inline hover-underline nav link */
function NavLink({
  href,
  scrolled,
  children,
}: {
  href: string;
  scrolled: boolean;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: "14px",
        fontWeight: 500,
        color: hovered
          ? "var(--crimson)"
          : scrolled
          ? "var(--ink)"
          : "#ffffff",
        textDecoration: "none",
        position: "relative",
        paddingBottom: "2px",
        transition: "color 0.2s ease",
        display: "inline-block",
      }}
    >
      {children}
      {/* Underline grows from left on hover */}
      <span
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "1.5px",
          backgroundColor: "var(--crimson)",
          width: hovered ? "100%" : "0%",
          transition: "width 0.22s ease",
          borderRadius: "1px",
        }}
      />
    </Link>
  );
}
