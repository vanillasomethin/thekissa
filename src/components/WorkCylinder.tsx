"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface CylinderProject {
  name: string;
  category: string;
  href: string;
  accent: string;
  cover?: string;
}

const CARD_W = 2.4;
const CARD_H = 1.5;
const RADIUS = 4.6;

function Card({
  project,
  index,
  total,
  groupRotation,
  hoveredIndex,
  setHoveredIndex,
}: {
  project: CylinderProject;
  index: number;
  total: number;
  groupRotation: React.RefObject<number>;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const texture = project.cover ? useTexture(project.cover) : null;
  if (texture) {
    texture.anisotropy = 16;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    texture.colorSpace = THREE.SRGBColorSpace;
    // Cover-fit: crop the texture to match the card aspect ratio instead of stretching it
    const img = texture.image as { width: number; height: number } | undefined;
    if (img?.width && img?.height) {
      const imgAspect = img.width / img.height;
      const cardAspect = CARD_W / CARD_H;
      if (imgAspect > cardAspect) {
        texture.repeat.set(cardAspect / imgAspect, 1);
        texture.offset.set((1 - cardAspect / imgAspect) / 2, 0);
      } else {
        texture.repeat.set(1, imgAspect / cardAspect);
        texture.offset.set(0, (1 - imgAspect / cardAspect) / 2);
      }
    }
  }
  const angle = (index / total) * Math.PI * 2;

  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const a = angle + groupRotation.current;
    g.position.set(Math.sin(a) * RADIUS, 0, Math.cos(a) * RADIUS);
    g.rotation.y = a;
    const target = hoveredIndex === index ? 1.08 : 1;
    g.scale.x += (target - g.scale.x) * 0.08;
    g.scale.y += (target - g.scale.y) * 0.08;
    g.scale.z += (target - g.scale.z) * 0.08;
  });

  return (
    <group
      ref={ref}
      onPointerOver={(e) => { e.stopPropagation(); setHoveredIndex(index); document.body.style.cursor = "pointer"; }}
      onPointerOut={(e) => { e.stopPropagation(); setHoveredIndex(null); document.body.style.cursor = "auto"; }}
      onClick={() => { if (project.href) window.open(project.href, "_blank", "noopener,noreferrer"); }}
    >
      {/* Front face */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[CARD_W, CARD_H]} />
        {texture ? (
          <meshBasicMaterial map={texture} toneMapped={false} />
        ) : (
          <meshStandardMaterial color={project.accent} />
        )}
      </mesh>
      {/* Back face — visible from the other side of the cylinder */}
      <mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[CARD_W, CARD_H]} />
        <meshStandardMaterial color="#1c1c1c" roughness={0.6} metalness={0.1} />
      </mesh>
    </group>
  );
}

function Scene({
  projects,
  groupRotation,
  hoveredIndex,
  setHoveredIndex,
}: {
  projects: CylinderProject[];
  groupRotation: React.RefObject<number>;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 6]} intensity={1.2} />
      <Suspense fallback={null}>
        <group rotation={[0.05, 0, 0]}>
          {projects.map((p, i) => (
            <Card
              key={p.name + i}
              project={p}
              index={i}
              total={projects.length}
              groupRotation={groupRotation}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </group>
      </Suspense>
    </>
  );
}

export default function WorkCylinder({ projects }: { projects: CylinderProject[] }) {
  const groupRotation = useRef(0);
  const velocity = useRef(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const lastScroll = useRef<number | null>(null);

  const targetVelocity = useRef(0);

  const Rig = () => {
    useFrame(() => {
      if (lastScroll.current === null) lastScroll.current = window.scrollY;
      const delta = window.scrollY - lastScroll.current;
      lastScroll.current = window.scrollY;
      targetVelocity.current += delta * 0.00022;
      targetVelocity.current *= 0.82;
      velocity.current += (targetVelocity.current - velocity.current) * 0.12;
      groupRotation.current += velocity.current;
    });
    return null;
  };

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Canvas
        camera={{ position: [0, 1.2, 11.5], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        style={{ touchAction: "none" }}
      >
        <Rig />
        <Scene
          projects={projects}
          groupRotation={groupRotation}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
        />
      </Canvas>
    </div>
  );
}
