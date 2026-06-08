"use client";

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "motion/react";

const SCRIBBLES = [
  "/projects/scribbles/s-04.svg",
  "/projects/scribbles/s-05.svg",
  "/projects/scribbles/s-10.svg",
  "/projects/scribbles/s-11.svg",
  "/projects/scribbles/s-38.svg",
  "/projects/scribbles/s-104.svg",
  "/projects/scribbles/s-105.svg",
  "/projects/scribbles/s-138.svg",
];

const SIZES = [72, 56, 88, 64, 80, 52, 96, 60];

interface PhysicsItem {
  el: HTMLImageElement;
  body: Matter.Body;
}

export default function PhysicsScribbles({ height = 420 }: { height?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const itemsRef = useRef<PhysicsItem[]>([]);
  const rafRef = useRef<number>(0);
  const reduce = useReducedMotion();
  const triggered = useRef(false);

  const cleanup = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    if (runnerRef.current && engineRef.current) {
      const { Runner, Engine } = require("matter-js") as typeof import("matter-js");
      Runner.stop(runnerRef.current);
      Engine.clear(engineRef.current);
    }
    engineRef.current = null;
    runnerRef.current = null;
    itemsRef.current.forEach(({ el }) => el.remove());
    itemsRef.current = [];
  }, []);

  const initPhysics = useCallback(() => {
    const container = containerRef.current;
    if (!container || triggered.current) return;
    triggered.current = true;

    const {
      Engine, Runner, Bodies, Body, Composite, Events, Mouse, MouseConstraint, World,
    } = require("matter-js") as typeof import("matter-js");

    const W = container.offsetWidth;
    const H = height;
    const engine = Engine.create({ enableSleeping: false });
    engine.gravity.y = 1.4;
    engineRef.current = engine;

    const runner = Runner.create();
    runnerRef.current = runner;

    // Walls
    const thick = 200;
    const wallBody = (x: number, y: number, w: number, h: number) =>
      Bodies.rectangle(x, y, w, h, { isStatic: true, friction: 0.6, restitution: 0.3 });
    const ground    = wallBody(W / 2, H + thick / 2, W * 4, thick);
    const leftWall  = wallBody(-thick / 2, H / 2, thick, H * 2);
    const rightWall = wallBody(W + thick / 2, H / 2, thick, H * 2);
    World.add(engine.world, [ground, leftWall, rightWall]);

    // Mouse constraint for dragging
    const canvasMock = { getBoundingClientRect: () => container.getBoundingClientRect() } as HTMLCanvasElement;
    const mouse = Mouse.create(canvasMock);
    const mc = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    World.add(engine.world, mc);

    // Mouse repulsion
    let mouseX = W / 2, mouseY = -100;
    container.addEventListener("mousemove", (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    // Spawn items with stagger
    SCRIBBLES.forEach((src, i) => {
      const size = SIZES[i % SIZES.length];
      const half = size / 2;

      setTimeout(() => {
        const x = 80 + Math.random() * Math.max(1, W - 160);
        const body = Bodies.rectangle(x, -size, size, size, {
          restitution: 0.45,
          friction: 0.3,
          frictionAir: 0.018,
          angle: (Math.random() - 0.5) * 1.2,
          render: { visible: false },
        });
        World.add(engine.world, body);

        const img = document.createElement("img");
        img.src = src;
        img.alt = "";
        img.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          pointer-events: none;
          user-select: none;
          filter: invert(1);
          mix-blend-mode: screen;
          will-change: transform;
          transform-origin: center;
        `;
        container.appendChild(img);
        itemsRef.current.push({ el: img, body });
      }, 80 + i * 120);
    });

    // Physics loop
    Runner.run(runner, engine);

    // Repulsion + DOM sync
    Events.on(engine, "beforeUpdate", () => {
      const R = 130;
      itemsRef.current.forEach(({ body }) => {
        const dx = body.position.x - mouseX;
        const dy = body.position.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < R && dist > 1) {
          const force = (0.035 * (1 - dist / R));
          Body.applyForce(body, body.position, {
            x: (dx / dist) * force,
            y: (dy / dist) * force,
          });
        }
      });
    });

    const syncDOM = () => {
      itemsRef.current.forEach(({ el, body }) => {
        const { x, y } = body.position;
        const angle = body.angle;
        const half = el.offsetWidth / 2;
        el.style.transform = `translate(${x - half}px, ${y - half}px) rotate(${angle}rad)`;
      });
      rafRef.current = requestAnimationFrame(syncDOM);
    };
    rafRef.current = requestAnimationFrame(syncDOM);
  }, [height]);

  useEffect(() => {
    if (reduce) return;
    const container = containerRef.current;
    if (!container) return;

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { initPhysics(); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(container);
    return () => { obs.disconnect(); cleanup(); };
  }, [reduce, initPhysics, cleanup]);

  if (reduce) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height,
        overflow: "hidden",
        background: "var(--ink)",
        cursor: "crosshair",
      }}
      aria-hidden
    />
  );
}
