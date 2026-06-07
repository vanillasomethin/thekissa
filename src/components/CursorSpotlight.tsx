"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorSpotlight() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Ring lags behind with spring physics
  const ringX = useSpring(dotX, { stiffness: 180, damping: 22, mass: 0.6 });
  const ringY = useSpring(dotY, { stiffness: 180, damping: 22, mass: 0.6 });

  useEffect(() => {
    // Hide on touch-primary devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, label");
      setHovering(!!interactive);
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [dotX, dotY, visible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Dot — follows cursor exactly */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 0 : 6,
          height: hovering ? 0 : 6,
          borderRadius: "50%",
          background: "#ffffff",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: visible ? 1 : 0,
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.2s ease",
          mixBlendMode: "difference",
        }}
      />

      {/* Ring — lags with spring */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s ease",
          mixBlendMode: "difference",
        }}
      >
        <motion.div
          animate={{
            width: hovering ? 44 : 32,
            height: hovering ? 44 : 32,
            borderColor: hovering ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.45)",
            borderWidth: hovering ? 1.5 : 1,
          }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.45)",
            width: 32,
            height: 32,
          }}
        />
      </motion.div>
    </>
  );
}
