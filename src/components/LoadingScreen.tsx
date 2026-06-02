"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LETTERS = ["K", "I", "S", "S", "A"];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="loading-screen"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#0A0A0A",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          {/* KISSA letters */}
          <motion.div
            style={{ display: "flex", gap: "0.15em" }}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                style={{
                  fontSize: "clamp(4rem, 12vw, 9rem)",
                  fontWeight: 900,
                  letterSpacing: "0.05em",
                  color: "#FFD700",
                  lineHeight: 1,
                  display: "inline-block",
                  fontFamily: "sans-serif",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6, ease: "easeOut" }}
            style={{
              marginTop: "1rem",
              fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#FF6B35",
              fontFamily: "sans-serif",
            }}
          >
            Media Arts Agency
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            style={{
              position: "absolute",
              bottom: "2.5rem",
              left: "10%",
              right: "10%",
              height: "3px",
              borderRadius: "2px",
              backgroundColor: "rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 2, ease: "linear" }}
              style={{
                height: "100%",
                transformOrigin: "left center",
                background:
                  "linear-gradient(90deg, #FFD700 0%, #FF6B35 55%, #FF3CAC 100%)",
                borderRadius: "2px",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
