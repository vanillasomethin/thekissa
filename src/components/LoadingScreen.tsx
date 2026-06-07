"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { animate, stagger } from "animejs";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const WORD = "KISSA";

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const lettersRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lettersRef.current) return;

    const letters = lettersRef.current.querySelectorAll<HTMLElement>(".loader-letter");

    // Letters rise up + opacity
    animate(letters, {
      opacity: [0, 1],
      translateY: ["40px", "0px"],
      duration: 700,
      ease: "outExpo",
      delay: stagger(90, { start: 120 }),
    });

    // Iridescent line sweeps in
    if (lineRef.current) {
      animate(lineRef.current, {
        scaleX: [0, 1],
        duration: 1800,
        ease: "linear",
        delay: 200,
      });
    }

    const t = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          {/* Letter-stagger wordmark */}
          <div ref={lettersRef} style={{ display: "flex", alignItems: "baseline", gap: 2, overflow: "hidden" }}>
            {WORD.split("").map((ch, i) => (
              <span
                key={i}
                className="loader-letter"
                style={{
                  display: "inline-block",
                  fontFamily: "var(--sans)",
                  fontSize: "clamp(64px, 12vw, 112px)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  color: "#ffffff",
                  opacity: 0,
                  lineHeight: 1,
                }}
              >
                {ch}
              </span>
            ))}
          </div>

          {/* Subtitle fades after letters */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.38 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            style={{
              fontFamily: "var(--sans)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#ffffff",
              margin: 0,
            }}
          >
            A media art agency
          </motion.p>

          {/* Iridescent progress bar — bottom edge */}
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
