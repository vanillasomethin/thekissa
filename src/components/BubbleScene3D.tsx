"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

// ─── Kissa bubble shape as 2D points (left-pointing tail at ~55% height) ──────
function buildBubbleShape(): THREE.Shape {
  const s = new THREE.Shape();
  const r = 24; // corner radius
  const w = 220, h = 200;
  const tailX = 40, tailTip = 0;
  const tailTop = 78, tailBot = 135, tailMid = 115;

  s.moveTo(68, 0);
  s.lineTo(w - r, 0);
  s.quadraticCurveTo(w, 0, w, r);
  s.lineTo(w, h - r);
  s.quadraticCurveTo(w, h, w - r, h);
  s.lineTo(68, h);
  s.quadraticCurveTo(r + (68 - r), h, tailX, h - (h - tailBot));
  s.lineTo(tailTip, tailMid);
  s.lineTo(tailX, tailTop);
  s.lineTo(tailX, r);
  s.quadraticCurveTo(tailX, 0, 68, 0);
  s.closePath();
  return s;
}

// ─── Single floating bubble mesh ─────────────────────────────────────────────
function BubbleMesh({
  scale = 1,
  position = [0, 0, 0] as [number, number, number],
  rotation = [0, 0, 0] as [number, number, number],
  speed = 1,
  phase = 0,
  wireframe = false,
  opacity = 1,
}: {
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  speed?: number;
  phase?: number;
  wireframe?: boolean;
  opacity?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const shape = buildBubbleShape();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 24,
      bevelEnabled: true,
      bevelThickness: 4,
      bevelSize: 3,
      bevelSegments: 6,
    });
    geo.center();
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime() * speed + phase;
    mesh.current.rotation.y = rotation[1] + Math.sin(t * 0.4) * 0.18;
    mesh.current.rotation.x = rotation[0] + Math.cos(t * 0.3) * 0.08;
    mesh.current.position.y = position[1] + Math.sin(t * 0.5) * 0.15;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale * 0.012}>
      <primitive object={geometry} />
      {wireframe ? (
        <meshBasicMaterial color="#ffffff" wireframe opacity={opacity} transparent />
      ) : (
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.3}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.05}
          distortionScale={0.3}
          temporalDistortion={0.05}
          iridescence={0.3}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          roughness={0.05}
          color="#ffffff"
          transmission={1}
          transparent
          opacity={opacity}
        />
      )}
    </mesh>
  );
}

// ─── Camera drift on pointer ──────────────────────────────────────────────────
function CameraDrift() {
  const { camera } = useThree();

  useFrame(({ pointer: p }) => {
    camera.position.x += (p.x * 0.8 - camera.position.x) * 0.04;
    camera.position.y += (p.y * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Scrolling parallax via window.scrollY ────────────────────────────────────
function ScrollLayer() {
  const group = useRef<THREE.Group>(null);
  const scrollRef = useRef(0);

  useFrame(() => {
    if (typeof window !== "undefined") {
      scrollRef.current = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
    }
    if (!group.current) return;
    const s = scrollRef.current;
    group.current.rotation.z += (s * Math.PI * 0.3 - group.current.rotation.z) * 0.04;
    group.current.position.y += (-s * 3 - group.current.position.y) * 0.04;
  });

  return (
    <group ref={group}>
      <BubbleMesh scale={1.4} position={[0, 0, 0]} opacity={0.9} speed={0.6} phase={0} />
      <BubbleMesh scale={0.6} position={[4.2, 1.5, -2]} wireframe opacity={0.5} speed={0.9} phase={1.2} />
      <BubbleMesh scale={0.4} position={[-4, -1.2, -1]} wireframe opacity={0.35} speed={1.1} phase={2.4} />
    </group>
  );
}

// ─── Main hero 3D canvas ──────────────────────────────────────────────────────
export default function BubbleScene3D() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-5, -3, 2]} intensity={0.6} color="#aaaaaa" />
        <pointLight position={[0, 0, 4]} intensity={2} color="#ffffff" />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ScrollLayer />
        </Suspense>
        <CameraDrift />
      </Canvas>
    </div>
  );
}

// ─── Lightweight CSS-3D bubble for non-hero sections ─────────────────────────
// Uses Framer Motion perspective transforms — no WebGL needed
const BUBBLE_PATH =
  "M 68,0 L 196,0 Q 220,0 220,24 L 220,176 Q 220,200 196,200 L 68,200 Q 40,200 40,176 L 40,135 L 0,115 L 40,78 L 40,24 Q 40,0 68,0 Z";

export function FloatingBubble2D({
  size = 120,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 2,
  style,
  delay = 0,
  rotateRange = 12,
  yRange = 20,
}: {
  size?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
  delay?: number;
  rotateRange?: number;
  yRange?: number;
}) {
  return (
    <motion.div
      style={{ ...style, display: "inline-block" }}
      animate={{
        y: [0, -yRange, 0],
        rotate: [-rotateRange * 0.4, rotateRange * 0.4, -rotateRange * 0.4],
      }}
      transition={{
        duration: 4 + delay * 0.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <motion.svg
        viewBox="0 0 220 200"
        width={size}
        height={size}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        style={{ filter: fill !== "none" ? "drop-shadow(0 8px 24px rgba(0,0,0,0.25))" : "none" }}
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <path d={BUBBLE_PATH} />
      </motion.svg>
    </motion.div>
  );
}
