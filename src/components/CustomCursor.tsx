"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reduce  = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let rx = 0, ry = 0; // ring position (lagged)
    let mx = 0, my = 0; // mouse
    let raf = 0;
    let visible = false;

    const show = () => {
      if (!visible) {
        dot.style.opacity  = "1";
        ring.style.opacity = "1";
        visible = true;
      }
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      show();
    };

    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const onEnter = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isClickable = el.closest("a, button, [role=button], input, textarea, select");
      ring.style.width  = isClickable ? "52px" : "36px";
      ring.style.height = isClickable ? "52px" : "36px";
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <>
      {/* Inner dot — instant */}
      <div ref={dotRef} style={{
        position: "fixed",
        top: 0, left: 0,
        width: 6, height: 6,
        borderRadius: "50%",
        background: "#ffffff",
        pointerEvents: "none",
        zIndex: 99999,
        opacity: 0,
        mixBlendMode: "difference",
        willChange: "transform",
      }} />
      {/* Outer ring — springs behind */}
      <div ref={ringRef} style={{
        position: "fixed",
        top: 0, left: 0,
        width: 36, height: 36,
        borderRadius: "50%",
        border: "1.5px solid rgba(255,255,255,0.6)",
        pointerEvents: "none",
        zIndex: 99998,
        opacity: 0,
        mixBlendMode: "difference",
        willChange: "transform",
        transition: "width 0.2s ease, height 0.2s ease",
      }} />
    </>
  );
}
