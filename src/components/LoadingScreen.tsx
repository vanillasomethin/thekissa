"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { animate, stagger } from "animejs";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete?: () => void;
}

// Scribbles positioned around the logo centre — offset from centre in px
const SCRIBBLES = [
  { src: "/projects/scribbles/s-04.svg",  size: 100, x: -220, y: -100, rot: -15, delay: 0   },
  { src: "/projects/scribbles/s-38.svg",  size: 80,  x:  200, y: -110, rot:  20, delay: 80  },
  { src: "/projects/scribbles/s-11.svg",  size: 90,  x:  240, y:   60, rot: -8,  delay: 140 },
  { src: "/projects/scribbles/s-105.svg", size: 85,  x:  140, y:  130, rot:  35, delay: 200 },
  { src: "/projects/scribbles/s-10.svg",  size: 70,  x: -170, y:  130, rot: -25, delay: 260 },
  { src: "/projects/scribbles/s-138.svg", size: 110, x: -250, y:   40, rot:  10, delay: 320 },
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const logoRef     = useRef<HTMLDivElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const scribbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Logo rises in first
    if (logoRef.current) {
      animate(logoRef.current, {
        opacity: [0, 1],
        translateY: ["18px", "0px"],
        duration: 600,
        ease: "outExpo",
      });
    }

    // Scribbles burst in around the logo with stagger
    if (scribbleRef.current) {
      const items = scribbleRef.current.querySelectorAll<HTMLElement>(".s-item");
      animate(items, {
        opacity:    [0, 1],
        scale:      [0, 1],
        rotate:     (_el: Element, i: number) => [`${SCRIBBLES[i].rot - 40}deg`, `${SCRIBBLES[i].rot}deg`],
        duration:   700,
        ease:       "outExpo",
        delay:      stagger(70, { start: 220 }),
      });

      // Subtle breathe loop on each scribble
      animate(items, {
        scale:      [1, 1.04, 1],
        duration:   2800,
        ease:       "inOutSine",
        loop:       true,
        delay:      stagger(180, { start: 900 }),
      });
    }

    // Progress bar sweeps full width
    if (lineRef.current) {
      animate(lineRef.current, {
        scaleX:   [0, 1],
        duration: 2000,
        ease:     "linear",
        delay:    120,
      });
    }

    // Scribbles fade out before screen exits
    const fadeScribbles = setTimeout(() => {
      if (scribbleRef.current) {
        const items = scribbleRef.current.querySelectorAll<HTMLElement>(".s-item");
        animate(items, {
          opacity:  [1, 0],
          scale:    [1, 0.8],
          duration: 380,
          ease:     "outQuart",
          delay:    stagger(40),
        });
      }
    }, 2000);

    const exit = setTimeout(() => setVisible(false), 2550);
    return () => { clearTimeout(fadeScribbles); clearTimeout(exit); };
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
          {/* Scribble constellation */}
          <div ref={scribbleRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            {SCRIBBLES.map((s, i) => (
              <div
                key={i}
                className="s-item"
                style={{
                  position: "absolute",
                  top:    "50%",
                  left:   "50%",
                  width:  s.size,
                  height: s.size,
                  marginTop:  -s.size / 2 + s.y,
                  marginLeft: -s.size / 2 + s.x,
                  opacity: 0,
                  transform: `rotate(${s.rot}deg) scale(0)`,
                  filter: "invert(1)",
                  mixBlendMode: "screen",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt="" width={s.size} height={s.size} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
            ))}
          </div>

          {/* Logo */}
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

          {/* Progress bar */}
          <div
            ref={lineRef}
            style={{
              position:        "absolute",
              bottom:          0,
              left:            0,
              height:          2,
              width:           "100%",
              background:      "linear-gradient(90deg, #FACB0E, #F06BA8 45%, #78BAE6)",
              transformOrigin: "left center",
              transform:       "scaleX(0)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
