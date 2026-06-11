"use client";

import { ShaderGradientCanvas, ShaderGradient } from "shadergradient";

interface ShaderBackgroundProps {
  style?: React.CSSProperties;
}

// Monochrome shader gradient — black/grey only, per brand constraint.
export default function ShaderBackground({ style }: ShaderBackgroundProps) {
  return (
    <ShaderGradientCanvas
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        ...style,
      }}
      fov={45}
      pixelDensity={1}
    >
      <ShaderGradient
        animate="on"
        type="waterPlane"
        wireframe={false}
        shader="defaults"
        uTime={0}
        uSpeed={0.2}
        uStrength={3}
        uDensity={1.3}
        uFrequency={5.5}
        uAmplitude={1.5}
        positionX={0}
        positionY={0}
        positionZ={0}
        rotationX={0}
        rotationY={0}
        rotationZ={50}
        color1="#5a5a5a"
        color2="#0a0a0a"
        color3="#2c2c2c"
        reflection={0.1}
        cAzimuthAngle={180}
        cPolarAngle={80}
        cDistance={2.8}
        cameraZoom={1}
        lightType="3d"
        brightness={1.2}
        grain="on"
        toggleAxis={false}
        zoomOut={false}
        enableTransition={false}
      />
    </ShaderGradientCanvas>
  );
}
