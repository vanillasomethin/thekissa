"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const INK = "#000000";

// Brand bubble: portrait, large corner radii, sharp left-pointing tail.
const BUBBLE_PATH =
  "M 95,0 L 205,0 Q 260,0 260,55 L 260,245 Q 260,300 205,300 L 95,300 Q 40,300 40,245 L 40,210 L 0,188 L 40,165 L 40,55 Q 40,0 95,0 Z";
const BUBBLE_VB = "0 0 260 300";

// Phase timeline (ms) — deliberately unhurried
const T = {
  twoDots:      200,
  dotTrail:     1000,
  grid:         2300,
  conversation: 3900,
  blackSea:     5400,
  whiteSpace:   6000,
  whiteScreen:  7000,
  stamp:        7700,
  exit:         9000,
};

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const stageRef      = useRef<HTMLDivElement>(null);
  const floodRef      = useRef<HTMLDivElement>(null);
  const whitespaceRef = useRef<HTMLDivElement>(null);
  const whitewipeRef  = useRef<HTMLDivElement>(null);
  const logoRef       = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const flood = floodRef.current;
    const whitespace = whitespaceRef.current;
    const whitewipe = whitewipeRef.current;
    const logo = logoRef.current;
    if (!stage || !flood || !whitespace || !whitewipe || !logo) return;

    const S = stage, F = flood, WS = whitespace, WW = whitewipe, LG = logo;

    const W = window.innerWidth;
    const H = window.innerHeight;
    const cx = W / 2;
    const cy = H / 2;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const t = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timers.push(id);
    };

    function dot(x: number, y: number, r: number) {
      const d = document.createElement("div");
      const s = r * 2;
      d.style.cssText = `position:absolute;width:${s}px;height:${s}px;left:${x - r}px;top:${y - r}px;opacity:0;transform:scale(0);will-change:transform,opacity,left,top;`;
      d.innerHTML = `<svg viewBox="0 0 20 20" style="display:block;width:100%;height:100%;"><circle cx="10" cy="10" r="10" fill="${INK}"/></svg>`;
      S.appendChild(d);
      return d;
    }

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

    function show(el: HTMLElement, delay = 0, dur = 280) {
      t(() => {
        el.style.transition = `opacity ${dur}ms ease, transform ${dur}ms cubic-bezier(0.34,1.56,0.64,1)`;
        el.style.opacity = "1";
        el.style.transform = "scale(1)";
      }, delay);
    }
    function hide(el: HTMLElement, delay = 0, dur = 200) {
      t(() => {
        el.style.transition = `opacity ${dur}ms ease, transform ${dur}ms ease`;
        el.style.opacity = "0";
        el.style.transform = "scale(0.5)";
      }, delay);
    }
    function clearStage(delay = 0) {
      t(() => {
        const children = Array.from(S.children);
        children.forEach((c, i) => hide(c as HTMLElement, i * 10, 180));
        t(() => { S.innerHTML = ""; }, 600);
      }, delay);
    }

    // ── Phase 1: two dots appear ────────────────────────────────────────────
    t(() => {
      const a = dot(cx - 22, cy, 8);
      const b = dot(cx + 22, cy, 8);
      show(a, 0); show(b, 120);
    }, T.twoDots);

    // ── Phase 2: dot trail drifts across ────────────────────────────────────
    t(() => {
      clearStage(0);
      const sizes = [7, 5, 4, 8, 11, 9, 4, 6, 4, 3];
      const startX = cx - 260;
      sizes.forEach((r, i) => {
        const x = startX + i * 55;
        const d = dot(x, cy, r);
        show(d, i * 55, 220);
        t(() => {
          d.style.transition = "left 0.9s cubic-bezier(0.45,0,0.55,1)";
          d.style.left = `${parseFloat(d.style.left) + 70}px`;
        }, i * 55 + 200);
      });
    }, T.dotTrail);

    // ── Phase 3: full-screen grid, middle row filled ────────────────────────
    t(() => {
      clearStage(0);
      const BW = 54, BH = 62;
      const gx = 96, gy = 112;
      const cols = Math.ceil(W / gx) + 2;
      const rows = Math.ceil(H / gy) + 2;
      const ox = cx - ((cols - 1) * gx) / 2;
      const oy = cy - ((rows - 1) * gy) / 2;
      const midRow = Math.floor(rows / 2);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const filled = r === midRow;
          const faint  = !filled;
          const jx = (Math.random() - 0.5) * 12;
          const jy = (Math.random() - 0.5) * 12;
          const b = bub(ox + c * gx + jx, oy + r * gy + jy, BW, BH, filled, faint);
          if (Math.random() > 0.6) (b.firstChild as HTMLElement).style.transform = "scaleX(-1)";
          const dist = Math.hypot(c - cols / 2, (r - rows / 2) * 1.4);
          show(b, dist * 55, 260);
        }
      }
    }, T.grid);

    // ── Phase 4: conversation cluster ───────────────────────────────────────
    t(() => {
      clearStage(0);
      t(() => {
        const BW = 98, BH = 113;
        const slots = [-1.5, -0.5, 0.5, 1.5];
        slots.forEach((ix, i) => {
          const b = bub(cx + ix * 125, cy, BW, BH, true);
          if (i % 2 === 1) (b.firstChild as HTMLElement).style.transform = "scaleX(-1)";
          show(b, i * 110, 300);
        });

        for (let i = 0; i < 22; i++) {
          const x = Math.random() * W;
          const y = Math.random() * H;
          if (Math.abs(x - cx) < 280 && Math.abs(y - cy) < 120) continue;
          const s = 28 + Math.random() * 30;
          const b = bub(x, y, s, s * 1.13, false, true);
          if (Math.random() > 0.5) (b.firstChild as HTMLElement).style.transform = "scaleX(-1)";
          show(b, 300 + i * 45, 280);
        }
      }, 350);
    }, T.conversation);

    // ── Phase 5: black sea floods ───────────────────────────────────────────
    t(() => {
      F.style.opacity = "1";
      clearStage(300);
    }, T.blackSea);

    // ── Phase 5b: white space with ink logo appears in the black sea ───────
    t(() => {
      WS.style.opacity = "1";
      WS.style.transform = "scale(1)";
    }, T.whiteSpace);

    // ── Phase 6: white screen wipes over everything ─────────────────────────
    t(() => {
      WW.style.opacity = "1";
      t(() => { F.style.opacity = "0"; }, 400);
    }, T.whiteScreen);

    // ── Phase 7: black logo stamps onto white ────────────────────────────────
    t(() => {
      LG.style.transition = "opacity 0.45s cubic-bezier(0.22,1.2,0.36,1), transform 0.45s cubic-bezier(0.22,1.2,0.36,1)";
      LG.style.opacity = "1";
      LG.style.transform = "translate(-50%, -50%) scale(1)";
    }, T.stamp);

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

          {/* Black sea flood */}
          <div
            ref={floodRef}
            style={{
              position: "fixed",
              inset: 0,
              background: "#000000",
              opacity: 0,
              zIndex: 10,
              pointerEvents: "none",
              transition: "opacity 0.5s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* White space holding the ink logo */}
            <div
              ref={whitespaceRef}
              style={{
                width: 92,
                height: 104,
                background: "#ffffff",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transform: "scale(0.5)",
                transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/kissa-logo.svg" alt="Kissa" style={{ width: 56 }} />
            </div>
          </div>

          {/* White wipe */}
          <div
            ref={whitewipeRef}
            style={{
              position: "fixed",
              inset: 0,
              background: "#ffffff",
              opacity: 0,
              zIndex: 20,
              pointerEvents: "none",
              transition: "opacity 0.6s ease",
            }}
          />

          {/* Black logo stamps on white */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={logoRef}
            src="/kissa-logo.svg"
            alt="Kissa"
            style={{
              position:  "fixed",
              top:       "50%",
              left:      "50%",
              width:     180,
              transform: "translate(-50%, -50%) scale(1.6)",
              opacity:   0,
              zIndex:    30,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
