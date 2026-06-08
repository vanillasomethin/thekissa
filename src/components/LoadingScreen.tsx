"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { animate } from "animejs";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete?: () => void;
}

type Frame =
  | { kind: "logo" }
  | { kind: "scribble"; src: string; size: number };

const SEQUENCE: Frame[] = [
  { kind: "logo" },
  { kind: "scribble", src: "/projects/scribbles/s-04.svg",  size: 180 },
  { kind: "scribble", src: "/projects/scribbles/s-38.svg",  size: 160 },
  { kind: "logo" },
];

// Wrap anime animate in a Promise resolved via onComplete
function morphAnim(
  el: HTMLElement,
  props: Record<string, unknown>,
  duration: number,
  ease: string
): Promise<void> {
  return new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    animate(el, { ...props, duration, ease, onComplete: resolve as any });
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// Wait one rAF so React can flush a state update before we animate
function tick(): Promise<void> {
  return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible,  setVisible]  = useState(true);
  const [frameIdx, setFrameIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el    = containerRef.current;
    const lineEl = lineRef.current;
    if (!el) return;

    // Progress bar runs in parallel, covers the whole sequence
    if (lineEl) {
      animate(lineEl, { scaleX: [0, 1], duration: 3100, ease: "linear" });
    }

    async function run() {
      // ── frame 0: logo blurs in ───────────────────────────────────────────
      await morphAnim(el!, {
        opacity: [0, 1],
        scale:   [1.06, 1],
        filter:  ["blur(14px)", "blur(0px)"],
      }, 560, "outQuart");

      await sleep(680);

      // ── logo → scribble 1 ───────────────────────────────────────────────
      await morphAnim(el!, {
        opacity: [1, 0],
        scale:   [1, 0.9],
        filter:  ["blur(0px)", "blur(20px)"],
      }, 300, "inQuart");

      setFrameIdx(1);
      await tick();

      await morphAnim(el!, {
        opacity: [0, 1],
        scale:   [1.1, 1],
        filter:  ["blur(20px)", "blur(0px)"],
      }, 520, "outQuart");

      await sleep(680);

      // ── scribble 1 → scribble 2 ─────────────────────────────────────────
      await morphAnim(el!, {
        opacity: [1, 0],
        scale:   [1, 0.9],
        filter:  ["blur(0px)", "blur(20px)"],
      }, 300, "inQuart");

      setFrameIdx(2);
      await tick();

      await morphAnim(el!, {
        opacity: [0, 1],
        scale:   [1.1, 1],
        filter:  ["blur(20px)", "blur(0px)"],
      }, 520, "outQuart");

      await sleep(620);

      // ── scribble 2 → logo ───────────────────────────────────────────────
      await morphAnim(el!, {
        opacity: [1, 0],
        scale:   [1, 0.9],
        filter:  ["blur(0px)", "blur(20px)"],
      }, 300, "inQuart");

      setFrameIdx(3);
      await tick();

      await morphAnim(el!, {
        opacity: [0, 1],
        scale:   [1.06, 1],
        filter:  ["blur(14px)", "blur(0px)"],
      }, 480, "outQuart");

      await sleep(280);

      // ── exit ─────────────────────────────────────────────────────────────
      setVisible(false);
    }

    run();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const frame = SEQUENCE[frameIdx];

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
          {/* Morphing frame */}
          <div
            ref={containerRef}
            style={{
              opacity: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // keep a stable bounding box so the blur doesn't cause layout shifts
              minWidth: 200,
              minHeight: 180,
            }}
          >
            {frame.kind === "logo" ? (
              <Image
                src="/logo-white.png"
                alt="Kissa"
                width={200}
                height={66}
                style={{ objectFit: "contain", display: "block" }}
                priority
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={frame.src}
                alt=""
                width={frame.size}
                height={frame.size}
                style={{
                  width:       frame.size,
                  height:      frame.size,
                  objectFit:   "contain",
                  display:     "block",
                  filter:      "invert(1)",
                }}
              />
            )}
          </div>

          {/* Iridescent progress bar */}
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
