"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { animate } from "animejs";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete?: () => void;
}

// Design elements drawn in after the logo appears: drawn via stroke-dashoffset
const ELEMENTS = [
  { d: "M 200,110 A 96,96 0 1,1 199.99,110",   color: "rgba(255,255,255,0.45)", sw: 1.5, delay: 380 },
  { d: "M 100,22 L 300,22 L 300,198 L 100,198 Z", color: "rgba(255,255,255,0.22)", sw: 1,   delay: 560 },
  { d: "M 80,198 L 320,22",                       color: "rgba(250,203,14,0.55)",  sw: 1.5, delay: 720 },
  { d: "M 200,150 A 40,40 0 1,1 199.99,150",    color: "rgba(240,107,168,0.45)", sw: 1,   delay: 860 },
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const logoRef  = useRef<HTMLDivElement>(null);
  const lineRef  = useRef<HTMLDivElement>(null);
  const svgRef   = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    // Logo rises in
    if (logoRef.current) {
      animate(logoRef.current, {
        opacity: [0, 1],
        translateY: ["20px", "0px"],
        duration: 650,
        ease: "outExpo",
      });
    }

    // Design elements draw in via stroke-dashoffset
    pathRefs.current.forEach((el, i) => {
      if (!el) return;
      const len = el.getTotalLength();
      el.style.strokeDasharray = String(len);
      el.style.strokeDashoffset = String(len);
      animate(el, {
        strokeDashoffset: [len, 0],
        duration: 850,
        ease: "outQuart",
        delay: ELEMENTS[i].delay,
      });
    });

    // Progress bar
    if (lineRef.current) {
      animate(lineRef.current, {
        scaleX: [0, 1],
        duration: 1900,
        ease: "linear",
        delay: 160,
      });
    }

    // Elements fade before exit
    const fadeOut = setTimeout(() => {
      if (svgRef.current) {
        animate(svgRef.current, { opacity: [1, 0], duration: 380, ease: "outQuart" });
      }
    }, 2050);

    const exit = setTimeout(() => setVisible(false), 2500);
    return () => { clearTimeout(fadeOut); clearTimeout(exit); };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Morphing design elements */}
          <svg
            ref={svgRef}
            viewBox="0 0 400 220"
            width={400}
            height={220}
            fill="none"
            style={{ position: "absolute", pointerEvents: "none" }}
          >
            {ELEMENTS.map((el, i) => (
              <path
                key={i}
                ref={(n) => { pathRefs.current[i] = n; }}
                d={el.d}
                stroke={el.color}
                strokeWidth={el.sw}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </svg>

          {/* Logo — centred, above SVG */}
          <div ref={logoRef} style={{ opacity: 0, position: "relative", zIndex: 2 }}>
            <Image
              src="/logo-white.png"
              alt="Kissa"
              width={200}
              height={66}
              style={{ objectFit: "contain", display: "block" }}
              priority
            />
          </div>

          {/* Iridescent progress bar */}
          <div
            ref={lineRef}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: 2,
              width: "100%",
              background: "linear-gradient(90deg, #FACB0E, #F06BA8 45%, #78BAE6)",
              transformOrigin: "left center",
              transform: "scaleX(0)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
