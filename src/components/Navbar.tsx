"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Studio", href: "/about" },
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
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          transition: "background 300ms ease, box-shadow 300ms ease",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          backgroundColor: scrolled ? "rgba(28,28,28,0.92)" : "transparent",
          boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,0.08)" : "none",
        }}
      >
        <nav
          className="flex items-center justify-between"
          style={{
            maxWidth: 1800,
            margin: "0 auto",
            padding: "0 50px",
            height: "80px",
          }}
        >
          {/* Logo — circular MAD-style container */}
          <Link href="/" aria-label="the Kissa — home" className="brand-bubble">
            <div style={{
              borderRadius: "50%",
              background: "rgb(28,28,28)",
              boxShadow: "rgba(0,0,0,0.75) 0px 0px 20px 0px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}>
              <Image
                src="/logo-white.png"
                alt="the Kissa"
                height={36}
                width={108}
                className="brand-bubble-img"
                style={{ width: "auto" }}
                priority
              />
            </div>
          </Link>

          {/* Desktop nav links + CTA */}
          <div className="flex items-center gap-4" id="desktop-nav" style={{ display: "none" }}>
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
            ))}

            {/* Let's Talk — MAD pill button */}
            <Link
              href="/contact"
              id="desktop-cta"
              style={{
                display: "none",
                fontFamily: "var(--sans)",
                fontWeight: 700,
                fontSize: "16px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#000000",
                backgroundColor: "#ffffff",
                padding: "12px 30px",
                borderRadius: "68px",
                whiteSpace: "nowrap",
                transition: "background 200ms ease, transform 200ms ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.88)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#ffffff"; (e.currentTarget as HTMLAnchorElement).style.transform = ""; }}
            >
              Let&apos;s Talk
            </Link>
          </div>

          {/* Hamburger — square MAD style */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              width: 68,
              height: 68,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgb(28,28,28)",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              color: "#ffffff",
              flexShrink: 0,
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }} style={{ display: "block", lineHeight: 0 }}>
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }} style={{ display: "block", lineHeight: 0 }}>
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </header>

      <style>{`
        .brand-bubble > div { width: 104px; height: 104px; }
        .brand-bubble-img { height: 54px !important; }
        @media (max-width: 640px) {
          .brand-bubble > div { width: 76px; height: 76px; }
          .brand-bubble-img { height: 38px !important; }
        }
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
              backgroundColor: "#000000",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 50px",
            }}
          >
            <nav>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
                {navLinks.map((link, i) => (
                  <motion.li key={link.href} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.07, duration: 0.3 }}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      style={{ fontFamily: "var(--sans)", fontSize: "clamp(36px,6vw,56px)", fontWeight: 700, color: "#ffffff", textDecoration: "none", display: "block", lineHeight: 1.1, transition: "opacity 0.2s ease" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.55"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + navLinks.length * 0.07, duration: 0.3 }} style={{ marginTop: "24px" }}>
                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    style={{ fontFamily: "var(--sans)", fontSize: "clamp(36px,6vw,56px)", fontWeight: 700, color: "rgba(255,255,255,0.4)", textDecoration: "none", display: "inline-block", lineHeight: 1.1 }}
                  >
                    Let&apos;s Talk
                  </Link>
                </motion.li>
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42, duration: 0.3 }}
              style={{ position: "absolute", bottom: "40px", left: "50px", right: "50px", display: "flex", gap: "32px", fontFamily: "var(--sans)", fontSize: "12px", color: "rgba(255,255,255,0.35)", flexWrap: "wrap" }}
            >
              <a href="mailto:hello@thekissa.com" style={{ color: "inherit" }}>hello@thekissa.com</a>
              <span>Nairobi · Dubai · London</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: string }) {
  const textRef = useRef<HTMLSpanElement>(null);
  const original = children;

  function onEnter() {
    if (!textRef.current) return;
    gsap.to(textRef.current, {
      duration: 0.5,
      scrambleText: { text: original, chars: "upperCase", revealDelay: 0.1, speed: 0.8 },
    });
  }

  return (
    <Link
      href={href}
      onMouseEnter={onEnter}
      style={{
        fontFamily: "var(--sans)",
        fontSize: "16px",
        fontWeight: 400,
        color: "#ffffff",
        textDecoration: "none",
        padding: "8px 0",
        opacity: 1,
        transition: "opacity 200ms ease",
      }}
    >
      <span ref={textRef}>{children}</span>
    </Link>
  );
}
