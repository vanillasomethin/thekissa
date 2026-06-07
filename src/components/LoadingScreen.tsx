"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BUBBLE_PATH =
  "M 95,0 L 205,0 Q 260,0 260,55 L 260,245 Q 260,300 205,300 L 95,300 Q 40,300 40,245 L 40,210 L 0,188 L 40,165 L 40,55 Q 40,0 95,0 Z";
const BUBBLE_VB = "0 0 260 300";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(t);
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
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
          }}
        >
          {/* Animated bubble */}
          <motion.svg
            viewBox={BUBBLE_VB}
            width={95}
            height={110}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <defs>
              <linearGradient id="ld-grad" x1="0" y1="0" x2="260" y2="300" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="rgba(250,203,14,0.28)" />
                <stop offset="38%"  stopColor="rgba(240,107,168,0.28)" />
                <stop offset="72%"  stopColor="rgba(120,186,230,0.2)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.06)" />
              </linearGradient>
            </defs>

            {/* Fill fades in after stroke draws */}
            <motion.path
              d={BUBBLE_PATH}
              fill="url(#ld-grad)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.7 }}
            />

            {/* Stroke draws on */}
            <motion.path
              d={BUBBLE_PATH}
              stroke="rgba(255,255,255,0.85)"
              strokeWidth={2.5}
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* K appears last */}
            <motion.text
              x="150" y="150"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--sans)"
              fontWeight="700"
              fontSize="72"
              fill="#ffffff"
              letterSpacing="-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              K
            </motion.text>
          </motion.svg>

          {/* Wordmark */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--sans)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#ffffff",
              margin: 0,
            }}
          >
            the Kissa
          </motion.p>

          {/* Progress bar — iridescent, bottom edge */}
          <motion.div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: 2,
              width: "100%",
              background: "linear-gradient(90deg, rgba(250,203,14,0.9), rgba(240,107,168,0.9) 45%, rgba(120,186,230,0.9))",
              transformOrigin: "left center",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.2, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
