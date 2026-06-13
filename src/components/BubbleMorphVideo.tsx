"use client";

import { useRef, useEffect, useId } from "react";
import { useReducedMotion } from "motion/react";
import { gsap } from "gsap";

// Brand bubble — exact shape from the Kissa logo, solid geometry safe for clipPath.
const BUBBLE_PATH =
  "M 89.71875 447.589844 L 89.71875 538.636719 C 89.71875 581.875 102.347656 600.210938 121.460938 607.527344 L 470.175781 678.648438 C 529.8125 697.007812 593.5625 656.058594 597.953125 589.382812 L 597.953125 50.019531 C 597.953125 22.753906 575.847656 0.648438 548.582031 0.648438 C 544.007812 0.648438 539.449219 1.28125 535.050781 2.539062 L 123.304688 86.566406 C 103.234375 93.339844 89.71875 112.15625 89.71875 133.347656 L 89.71875 322.265625 L 3.347656 387.941406 C -1.023438 392.667969 -1.023438 399.964844 3.347656 404.6875 L 89.710938 470.367188";
const BUBBLE_VB_W = 598;
const BUBBLE_VB_H = 684;

// Dimension presets (px at 1x scale)
const BUBBLE_W = 380;
const BUBBLE_H = Math.round(BUBBLE_W * (BUBBLE_VB_H / BUBBLE_VB_W)); // 438
const LAND_W   = 600; // 16:9
const LAND_H   = 338;

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

interface Props {
  src: string;
}

// Hover/cursor-driven morph: bubble shape <-> rounded landscape rect.
// A single persistent wrapper element is resized in place — only its
// dimensions/clip change, so the element identity never changes.
export default function BubbleMorphVideo({ src }: Props) {
  const uid = useId().replace(/:/g, "");
  const reduce = useReducedMotion();

  const wrapperRef     = useRef<HTMLDivElement>(null);
  const bubbleLayerRef = useRef<HTMLDivElement>(null);
  const rectLayerRef   = useRef<HTMLDivElement>(null);
  const rectFrameRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper     = wrapperRef.current;
    const bubbleLayer = bubbleLayerRef.current;
    const rectLayer   = rectLayerRef.current;
    const rectFrame   = rectFrameRef.current;
    if (!wrapper || !bubbleLayer || !rectLayer || !rectFrame) return;

    if (reduce) return;

    const state = { p: 0 };

    function apply() {
      const t = state.p;
      const w = lerp(BUBBLE_W, LAND_W, t);
      const h = lerp(BUBBLE_H, LAND_H, t);
      wrapper!.style.width  = `${w}px`;
      wrapper!.style.height = `${h}px`;
      bubbleLayer!.style.opacity = String(1 - t);
      rectLayer!.style.opacity   = String(t);
      rectFrame!.style.opacity   = String(t);
    }

    function onEnter() {
      gsap.to(state, { p: 1, duration: 0.7, ease: "power3.out", onUpdate: apply });
    }
    function onLeave() {
      gsap.to(state, { p: 0, duration: 0.6, ease: "power3.inOut", onUpdate: apply });
    }

    wrapper.addEventListener("mouseenter", onEnter);
    wrapper.addEventListener("mouseleave", onLeave);
    apply();

    return () => {
      wrapper.removeEventListener("mouseenter", onEnter);
      wrapper.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(state);
    };
  }, [reduce]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        width:  BUBBLE_W,
        height: BUBBLE_H,
        flexShrink: 0,
        willChange: "width, height",
        cursor: reduce ? "default" : "pointer",
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

        {/* Single-border outline tracing the bubble — fixed aspect, no stretch */}
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${BUBBLE_VB_W} ${BUBBLE_VB_H}`}
          preserveAspectRatio="xMidYMid meet"
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
