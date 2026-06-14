"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const INK = "#000000";

// Brand bubble — exact shape from the Kissa logo.
const BUBBLE_PATH =
  "M 89.71875 447.589844 L 89.71875 538.636719 C 89.71875 581.875 102.347656 600.210938 121.460938 607.527344 L 470.175781 678.648438 C 529.8125 697.007812 593.5625 656.058594 597.953125 589.382812 L 597.953125 50.019531 C 597.953125 22.753906 575.847656 0.648438 548.582031 0.648438 C 544.007812 0.648438 539.449219 1.28125 535.050781 2.539062 L 123.304688 86.566406 C 103.234375 93.339844 89.71875 112.15625 89.71875 133.347656 L 89.71875 322.265625 L 3.347656 387.941406 C -1.023438 392.667969 -1.023438 399.964844 3.347656 404.6875 L 89.71875 447.589844 Z";
const BUBBLE_VB = "0 0 598 684";

// Phase timeline (ms) — deliberately unhurried, ~9.5s total
const T = {
  oneDot:    150,    // single dot appears
  toBubble:  1000,   // dot grows into a bubble
  talk:      2200,   // second bubble appears, they "talk" (pulse)
  multiply:  4300,   // bubble multiplies into a small cluster
  compress:  6300,   // cluster converges & compresses toward center
  logoStamp: 7300,   // logo forms from the compressed cluster
  exit:      9500,   // hold the logo, then fade out
};

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);
  const logoRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const logo  = logoRef.current;
    if (!stage || !logo) return;

    const S = stage, LG = logo;
    const W = window.innerWidth;
    const H = window.innerHeight;
    const cx = W / 2;
    const cy = H / 2;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const t = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timers.push(id);
    };

    function bub(x: number, y: number, w: number, h: number, filled: boolean, faint = false) {
      const d = document.createElement("div");
      d.style.cssText = `position:absolute;width:${w}px;height:${h}px;left:${x - w / 2}px;top:${y - h / 2}px;opacity:0;transform:scale(0);will-change:transform,opacity,left,top;`;
      const fill   = filled ? INK : "none";
      const stroke = filled ? "none" : INK;
      const op     = faint ? 0.18 : 1;
      d.innerHTML = `<svg viewBox="${BUBBLE_VB}" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:100%;overflow:visible;opacity:${op};">
        <path d="${BUBBLE_PATH}" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
      </svg>`;
      S.appendChild(d);
      return d;
    }

    function dot(x: number, y: number, r: number) {
      const d = document.createElement("div");
      const s = r * 2;
      d.style.cssText = `position:absolute;width:${s}px;height:${s}px;left:${x - r}px;top:${y - r}px;opacity:0;transform:scale(0);will-change:transform,opacity,left,top;`;
      d.innerHTML = `<svg viewBox="0 0 20 20" style="display:block;width:100%;height:100%;"><circle cx="10" cy="10" r="10" fill="${INK}"/></svg>`;
      S.appendChild(d);
      return d;
    }

    function show(el: HTMLElement, delay = 0, dur = 320) {
      t(() => {
        el.style.transition = `opacity ${dur}ms ease, transform ${dur}ms cubic-bezier(0.34,1.56,0.64,1)`;
        el.style.opacity = "1";
        el.style.transform = "scale(1)";
      }, delay);
    }
    function hide(el: HTMLElement, delay = 0, dur = 220) {
      t(() => {
        el.style.transition = `opacity ${dur}ms ease, transform ${dur}ms ease`;
        el.style.opacity = "0";
        el.style.transform = "scale(0.4)";
      }, delay);
    }
    function moveTo(el: HTMLElement, x: number, y: number, w: number, h: number, dur = 900) {
      el.style.transition = `left ${dur}ms cubic-bezier(0.65,0,0.35,1), top ${dur}ms cubic-bezier(0.65,0,0.35,1), width ${dur}ms cubic-bezier(0.65,0,0.35,1), height ${dur}ms cubic-bezier(0.65,0,0.35,1)`;
      el.style.left = `${x - w / 2}px`;
      el.style.top = `${y - h / 2}px`;
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
    }

    // ── Phase 1: a single dot appears ───────────────────────────────────────
    t(() => {
      const a = dot(cx, cy, 9);
      show(a, 0, 320);
    }, T.oneDot);

    // ── Phase 2: dot grows into a single bubble (crossfade, no flash) ───────
    t(() => {
      const old = Array.from(S.children) as HTMLElement[];
      const b = bub(cx, cy, 90, 103, true);
      show(b, 0, 420);
      old.forEach((el) => hide(el, 0, 320));
      t(() => { old.forEach((el) => el.remove()); }, 340);
    }, T.toBubble);

    // ── Phase 3: a second bubble appears — they "talk" (pulse exchange) ────
    t(() => {
      // re-center the existing bubble to the left, bring in a second on the right
      const existing = S.children[0] as HTMLElement | undefined;
      if (existing) moveTo(existing, cx - 70, cy, 90, 103, 500);
      t(() => {
        const right = bub(cx + 70, cy, 90, 103, false);
        if (right.firstChild) (right.firstChild as HTMLElement).style.transform = "scaleX(-1)";
        show(right, 0, 380);
        // pulse "conversation" — alternate scale pulses
        const pulse = (el: HTMLElement, delay: number) => {
          t(() => {
            el.style.transition = "transform 0.3s ease";
            el.style.transform = "scale(1.12)";
            t(() => { el.style.transform = "scale(1)"; }, 260);
          }, delay);
        };
        for (let i = 0; i < 3; i++) {
          if (existing) pulse(existing, i * 560);
          pulse(right, 280 + i * 560);
        }
      }, 500);
    }, T.talk);

    // ── Phase 4: bubbles multiply and fill the whole screen ─────────────────
    t(() => {
      const old = Array.from(S.children) as HTMLElement[];
      // grid of slots spanning the full viewport, with jitter
      const cols = 5, rows = 4;
      const slots: [number, number][] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const jx = (Math.random() - 0.5) * 0.4;
          const jy = (Math.random() - 0.5) * 0.4;
          slots.push([
            ((c + 0.5) / cols + jx / cols) * W,
            ((r + 0.5) / rows + jy / rows) * H,
          ]);
        }
      }
      slots.forEach(([px, py], i) => {
        const scale = 0.6 + Math.random() * 0.5;
        const w = 90 * scale, h = 103 * scale;
        const b = bub(px, py, w, h, true);
        if (i % 2 === 1) (b.firstChild as HTMLElement).style.transform = "scaleX(-1)";
        show(b, i * 28, 360);
      });
      old.forEach((el, i) => hide(el, i * 60, 320));
      t(() => { old.forEach((el) => el.remove()); }, 420);
    }, T.multiply);

    // ── Phase 5: bubbles converge & compress toward the center ─────────────
    t(() => {
      const children = Array.from(S.children) as HTMLElement[];
      children.forEach((c, i) => {
        const w = parseFloat(c.style.width) * 0.18;
        const h = parseFloat(c.style.height) * 0.18;
        moveTo(c, cx, cy, w, h, 700);
        t(() => { c.style.opacity = "0"; }, 650 + i * 4);
      });
      t(() => { S.innerHTML = ""; }, 800);
    }, T.compress);

    // ── Phase 6: logo forms from the compressed bubbles ─────────────────────
    t(() => {
      LG.style.transition = "opacity 0.5s cubic-bezier(0.22,1.2,0.36,1), transform 0.5s cubic-bezier(0.22,1.2,0.36,1)";
      LG.style.opacity = "1";
      LG.style.transform = "translate(-50%, -50%) scale(1)";
    }, T.logoStamp);

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
          {/* Animated bubble/dot stage */}
          <div
            ref={stageRef}
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          />

          {/* Logo, formed in ink at the end */}
          <div
            ref={logoRef}
            style={{
              position:  "fixed",
              top:       "50%",
              left:      "50%",
              display:   "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "18px",
              transform: "translate(-50%, -50%) scale(0.6)",
              opacity:   0,
              zIndex:    30,
              pointerEvents: "none",
            }}
          >
            <img src="/kissa-logo.svg" alt="the Kissa" style={{ display: "block", width: 180, height: Math.round(180 * (706.5 / 727.5)) }} />
            <span className="k-caption" style={{ color: INK, opacity: 0.6 }}>Every great story starts with a conversation</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
