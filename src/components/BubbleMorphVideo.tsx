"use client";

import { useRef, useEffect, useId } from "react";
import { useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Brand bubble — exact shape from the Kissa logo, solid geometry safe for clipPath.
const BUBBLE_PATH =
  "M 89.71875 447.589844 L 89.71875 538.636719 C 89.71875 581.875 102.347656 600.210938 121.460938 607.527344 L 470.175781 678.648438 C 529.8125 697.007812 593.5625 656.058594 597.953125 589.382812 L 597.953125 50.019531 C 597.953125 22.753906 575.847656 0.648438 548.582031 0.648438 C 544.007812 0.648438 539.449219 1.28125 535.050781 2.539062 L 123.304688 86.566406 C 103.234375 93.339844 89.71875 112.15625 89.71875 133.347656 L 89.71875 322.265625 L 3.347656 387.941406 C -1.023438 392.667969 -1.023438 399.964844 3.347656 404.6875 L 89.710938 470.367188 Z";
const BUBBLE_VB_W = 598;
const BUBBLE_VB_H = 684;

// Dimension presets (px at 1x scale)
const BUBBLE_W = 380;
const BUBBLE_H = Math.round(BUBBLE_W * (BUBBLE_VB_H / BUBBLE_VB_W)); // 438
const LAND_W   = 600; // 16:9
const LAND_H   = 338;
const PORT_W   = 240; // 9:16
const PORT_H   = 427;

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function easeIO(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
function norm(p: number, lo: number, hi: number) { return Math.max(0, Math.min(1, (p - lo) / (hi - lo))); }

interface Props {
  src: string;
  scrollRef: React.RefObject<HTMLElement | null>;
}

export default function BubbleMorphVideo({ src, scrollRef }: Props) {
  const uid = useId().replace(/:/g, "");
  const reduce = useReducedMotion();

  const wrapperRef      = useRef<HTMLDivElement>(null);
  const bubbleLayerRef  = useRef<HTMLDivElement>(null);
  const rectLayerRef    = useRef<HTMLDivElement>(null);
  const rectFrameRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || !scrollRef.current || !wrapperRef.current) return;

    const wrapper     = wrapperRef.current;
    const bubbleLayer = bubbleLayerRef.current;
    const rectLayer   = rectLayerRef.current;
    const rectFrame   = rectFrameRef.current;

    const trigger = ScrollTrigger.create({
      trigger: scrollRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5,
      onUpdate(self) {
        const p = self.progress;
        let w: number, h: number, bOp: number, rOp: number;

        if (p < 0.28) {
          w = BUBBLE_W; h = BUBBLE_H; bOp = 1; rOp = 0;
        } else if (p < 0.52) {
          const t = easeIO(norm(p, 0.28, 0.52));
          w = lerp(BUBBLE_W, LAND_W, t);
          h = lerp(BUBBLE_H, LAND_H, t);
          bOp = 1 - t; rOp = t;
        } else if (p < 0.68) {
          w = LAND_W; h = LAND_H; bOp = 0; rOp = 1;
        } else if (p < 0.92) {
          const t = easeIO(norm(p, 0.68, 0.92));
          w = lerp(LAND_W, PORT_W, t);
          h = lerp(LAND_H, PORT_H, t);
          bOp = 0; rOp = 1;
        } else {
          w = PORT_W; h = PORT_H; bOp = 0; rOp = 1;
        }

        wrapper.style.width  = `${w}px`;
        wrapper.style.height = `${h}px`;
        if (bubbleLayer) bubbleLayer.style.opacity = String(bOp);
        if (rectLayer)   rectLayer.style.opacity   = String(rOp);
        if (rectFrame)   rectFrame.style.opacity   = String(rOp);
      },
    });

    return () => trigger.kill();
  }, [reduce, scrollRef]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        width:  BUBBLE_W,
        height: BUBBLE_H,
        flexShrink: 0,
        willChange: "width, height",
        transition: "width 0.05s linear, height 0.05s linear",
      }}
    >
      {/* ── Bubble layer ── */}
      <div
        ref={bubbleLayerRef}
        style={{ position: "absolute", inset: 0, transition: "opacity 0.12s" }}
      >
        {/* Clip definition — solid path, scaled to objectBoundingBox */}
        <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }} aria-hidden>
          <defs>
            <clipPath id={`clip-${uid}`} clipPathUnits="objectBoundingBox"
              transform={`scale(${1 / BUBBLE_VB_W} ${1 / BUBBLE_VB_H})`}>
              <path d={BUBBLE_PATH} />
            </clipPath>
          </defs>
        </svg>

        {/* Video fills the bubble interior */}
        <div style={{
          position: "absolute",
          inset: 0,
          clipPath: `url(#clip-${uid})`,
          WebkitClipPath: `url(#clip-${uid})`,
          overflow: "hidden",
        }}>
          <video autoPlay muted loop playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}>
            <source src={src} type="video/mp4" />
          </video>
        </div>

        {/* Single-border outline tracing the bubble */}
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${BUBBLE_VB_W} ${BUBBLE_VB_H}`}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", overflow: "visible" }}
        >
          <path
            d={BUBBLE_PATH}
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth={2}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* ── Rect layer ── */}
      <div
        ref={rectLayerRef}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          borderRadius: 14,
          opacity: 0,
          transition: "opacity 0.12s",
        }}
      >
        <video autoPlay muted loop playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}>
          <source src={src} type="video/mp4" />
        </video>
      </div>

      {/* ── Single-border rect outline ── */}
      <div
        ref={rectFrameRef}
        style={{
          position: "absolute",
          inset: 0,
          border: "2px solid rgba(255,255,255,0.85)",
          borderRadius: 14,
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity 0.12s",
        }}
      />
    </div>
  );
}
