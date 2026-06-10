"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const INK = "#111111";

// Brand bubble: portrait, large corner radii, sharp left-pointing tail.
// Solid geometry — used as a single-border outline everywhere in the loader.
const BUBBLE_PATH =
  "M 95,0 L 205,0 Q 260,0 260,55 L 260,245 Q 260,300 205,300 L 95,300 Q 40,300 40,245 L 40,210 L 0,188 L 40,165 L 40,55 Q 40,0 95,0 Z";
const BUBBLE_VB = "0 0 260 300";
const BUBBLE_RATIO = 300 / 260;

// Phase timeline (ms) — deliberately unhurried
const T = {
  p1_dot:     200,
  p2_dots:    1100,
  p3_bubbles: 2100,
  p4_grow:    3300,
  p5_explode: 4500,
  p6_dark:    5100,
  p7_logo:    5900,
  exit:       7600,
};

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const stageRef   = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);
  const logoRef    = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const layer = bubblesRef.current;
    const logo  = logoRef.current;
    if (!stage || !layer || !logo) return;
    const L = layer;

    const W  = window.innerWidth;
    const H  = window.innerHeight;
    const cx = W / 2;
    const cy = H / 2;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const t = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timers.push(id);
    };

    // Outline bubble — single 2px border, non-scaling so it stays hairline-thin
    // even when the element is scaled to several screen-widths.
    function makeBub(w: number, x: number, y: number) {
      const h = Math.round(w * BUBBLE_RATIO);
      const d = document.createElement("div");
      d.style.cssText = `position:absolute;width:${w}px;height:${h}px;left:${x - w / 2}px;top:${y - h / 2}px;opacity:0;transform:scale(0);will-change:transform,opacity;`;
      d.innerHTML = `<svg viewBox="${BUBBLE_VB}" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:100%;overflow:visible;">
        <path d="${BUBBLE_PATH}" fill="none" stroke="${INK}" stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
      </svg>`;
      L.appendChild(d);
      return d;
    }

    function makeDot(x: number, y: number, r = 8) {
      const s = r * 2 + 2;
      const d = document.createElement("div");
      d.style.cssText = `position:absolute;width:${s}px;height:${s}px;left:${x - s / 2}px;top:${y - s / 2}px;opacity:0;transform:scale(0);will-change:transform,opacity;`;
      d.innerHTML = `<svg viewBox="0 0 20 20" style="display:block;width:100%;height:100%;"><circle cx="10" cy="10" r="9" fill="${INK}"/></svg>`;
      L.appendChild(d);
      return d;
    }

    function show(el: HTMLElement, delay = 0, dur = 500) {
      t(() => {
        el.style.transition = `opacity ${dur}ms ease, transform ${dur}ms cubic-bezier(0.34,1.4,0.64,1)`;
        el.style.opacity = "1";
        el.style.transform = "scale(1)";
      }, delay);
    }

    function hide(el: HTMLElement, delay = 0, dur = 350) {
      t(() => {
        el.style.transition = `opacity ${dur}ms ease, transform ${dur}ms ease`;
        el.style.opacity = "0";
        el.style.transform = "scale(0.4)";
      }, delay);
    }

    // ── Phase 1: single ink dot breathes in ─────────────────────────────────
    const d0 = makeDot(cx, cy, 8);
    show(d0, T.p1_dot, 450);

    // ── Phase 2: three dots pulse, like someone typing ──────────────────────
    t(() => {
      hide(d0, 0, 250);
      const dots = [-34, 0, 34].map((ox, i) => {
        const d = makeDot(cx + ox, cy, 8);
        show(d, 150 + i * 130, 380);
        return d;
      });
      t(() => dots.forEach((d, i) => hide(d, i * 80, 280)), 750);
    }, T.p2_dots);

    // ── Phase 3: five small outline bubbles fan out in a row ────────────────
    const SMALL = 64;
    const GAP = Math.min(120, W / 7);
    const row: HTMLElement[] = [];
    t(() => {
      [-2, -1, 0, 1, 2].forEach((ix, i) => {
        const b = makeBub(SMALL, cx + ix * GAP, cy);
        show(b, i * 110, 520);
        row.push(b);
      });
    }, T.p3_bubbles);

    // ── Phase 4: middle three swell — still just borders ────────────────────
    t(() => {
      [[1, 1.45], [2, 2.1], [3, 1.45]].forEach(([idx, sc], i) => {
        const el = row[idx as number];
        t(() => {
          el.style.transition = "transform 700ms cubic-bezier(0.34,1.3,0.64,1)";
          el.style.transform = `scale(${sc})`;
        }, i * 140);
      });
    }, T.p4_grow);

    // ── Phase 5: outer four drift off; center explodes to 5× screen width ───
    t(() => {
      const flings: [number, number, number][] = [
        [0, -W * 0.7, -H * 0.25],
        [1, -W * 0.45,  H * 0.4],
        [3,  W * 0.45, -H * 0.4],
        [4,  W * 0.7,   H * 0.25],
      ];
      flings.forEach(([idx, dx, dy], i) => {
        const el = row[idx];
        t(() => {
          el.style.transition = "transform 800ms cubic-bezier(0.55,0,0.6,1), opacity 600ms ease 200ms";
          el.style.transform = `translate(${dx}px, ${dy}px) scale(0.8)`;
          el.style.opacity = "0";
        }, i * 60);
      });

      // Center bubble blows past the viewport — its border sweeps across the
      // screen and leaves us inside the bubble.
      const ctr = row[2];
      const target = (W * 5) / SMALL;
      t(() => {
        ctr.style.transition = "transform 1300ms cubic-bezier(0.5,0,0.15,1), opacity 500ms ease 800ms";
        ctr.style.transform = `scale(${target})`;
        ctr.style.opacity = "0";
      }, 250);
    }, T.p5_explode);

    // ── Phase 6: stage fades to dark while we're "inside" the bubble ────────
    t(() => {
      stage.style.transition = "background 900ms ease";
      stage.style.background = "#0d0d0d";
    }, T.p6_dark);

    // ── Phase 7: logo stamps in ──────────────────────────────────────────────
    t(() => {
      logo.style.transition = "opacity 0.8s ease, transform 0.8s cubic-bezier(0.34,1.45,0.64,1)";
      logo.style.opacity    = "1";
      logo.style.transform  = "translate(-50%, -50%) scale(1)";
    }, T.p7_logo);

    // ── Exit ─────────────────────────────────────────────────────────────────
    t(() => setVisible(false), T.exit);

    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="loader"
          ref={stageRef}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position:   "fixed",
            inset:      0,
            zIndex:     9999,
            background: "#ffffff",
            overflow:   "hidden",
          }}
        >
          <div
            ref={bubblesRef}
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={logoRef}
            src="/logo-white.png"
            alt="Kissa"
            style={{
              position:  "absolute",
              width:     240,
              left:      "50%",
              top:       "50%",
              transform: "translate(-50%, -50%) scale(0.6)",
              opacity:   0,
              zIndex:    20,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
