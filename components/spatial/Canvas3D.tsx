"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import gsap from "gsap";
import DigitalCity from "./DigitalCity";

interface Canvas3DProps {
  isGenerating?: boolean;
  prompt?: string;
}

export default function Canvas3D({ isGenerating }: Canvas3DProps) {
  const cityGroupRef = useRef<any>(null);

  useEffect(() => {
    if (isGenerating && cityGroupRef.current) {
      gsap.to(cityGroupRef.current.rotation, {
        y: cityGroupRef.current.rotation.y + Math.PI * 2,
        duration: 2,
        ease: "power2.inOut",
      });
    }
  }, [isGenerating]);

  return (
    <div className="w-full h-full bg-slate-950">
      <Canvas camera={{ position: [15, 12, 15], fov: 50 }}>
        {/* ڕووناکی هەورازی و ڕاستەوخۆ بۆ رووناککردنەوەی مەنهۆڵەکە */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 20, 15]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00ffff" />

        {/* تۆڕی شین/دیجیتاڵی زەمینەکە */}
        <Grid
          infiniteGrid
          cellSize={1}
          cellThickness={1}
          cellColor="#1e293b"
          sectionSize={5}
          sectionThickness={1.5}
          sectionColor="#0ea5e9"
          fadeDistance={40}
        />

        <group ref={cityGroupRef}>
          <DigitalCity />
        </group>

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={5}
          maxDistance={50}
        />
      </Canvas>
    </div>
  );
}