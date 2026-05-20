"use client";

import { Canvas } from "@react-three/fiber";
import { ParticleTunnel } from "@/components/particles/ParticleTunnel";

export function ParticleBackground() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none opacity-90">
      <Canvas camera={{ position: [0, 0, 6], fov: 42 }} style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <ParticleTunnel />
      </Canvas>
    </div>
  );
}
