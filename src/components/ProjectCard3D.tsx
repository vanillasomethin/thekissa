"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

interface ProjectCard3DProps {
  accent: string;
  className?: string;
  pointerRef: React.RefObject<{ x: number; y: number }>;
}

function TiltPlate({ accent, pointerRef }: { accent: string; pointerRef: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const cylinderRef = useRef<THREE.Group>(null);
  const { size } = useThree();
  const aspect = size.width / size.height;

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (g) {
      const { x, y } = pointerRef.current;
      g.rotation.x += (-y * 0.5 - g.rotation.x) * 0.08;
      g.rotation.y += (x * 0.6 - g.rotation.y) * 0.08;
    }
    const cyl = cylinderRef.current;
    if (cyl) cyl.rotation.y += delta * 0.25;
  });

  const color = useMemo(() => new THREE.Color(accent), [accent]);

  return (
    <group ref={groupRef}>
      {/* Ambient revolving cylinder behind the card — pmndrs carousel-style accent */}
      <group ref={cylinderRef} position={[0, 0, -1.2]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.6, 1.6, 2.6, 48, 1, true]} />
          <meshPhysicalMaterial
            color={color}
            roughness={0.4}
            metalness={0.2}
            transparent
            opacity={0.18}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      <RoundedBox args={[aspect * 2.4, 2.4, 0.18]} radius={0.16} smoothness={6}>
        <MeshTransmissionMaterial
          color={color}
          roughness={0.15}
          thickness={0.5}
          transmission={1}
          ior={1.2}
          chromaticAberration={0.04}
          anisotropy={0.1}
          distortion={0.15}
          distortionScale={0.2}
          temporalDistortion={0.1}
          clearcoat={0.6}
          clearcoatRoughness={0.25}
        />
      </RoundedBox>
    </group>
  );
}

// Reusable react-three-fiber background plate — a rounded-corner glass card
// (pmndrs "cards-with-border-radius" pattern) that tilts toward the pointer,
// driven by a pointer position ref updated from a regular DOM mousemove handler
// on the parent (so the canvas itself stays pointer-events:none and the
// overlay link on top of it remains clickable).
export default function ProjectCard3D({ accent, className, pointerRef }: ProjectCard3DProps) {
  return (
    <Canvas
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4], fov: 35 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <pointLight position={[-3, -2, 3]} intensity={0.4} color="#ffffff" />
      <TiltPlate accent={accent} pointerRef={pointerRef} />
    </Canvas>
  );
}
