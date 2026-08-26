"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import gsap from "gsap";
import DigitalCity from "./DigitalCity";
import FloatingParticles from "./FloatingParticles";

interface Canvas3DProps {
  isGenerating?: boolean;
  prompt?: string;
}

export default function Canvas3D({ isGenerating, prompt }: Canvas3DProps) {
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
      <Canvas 
        camera={{ position: [15, 12, 15], fov: 50 }}
        gl={{ toneMappingExposure: 2 }}
      >
        <ambientLight intensity={0.5} />

        <Grid
          infiniteGrid
          cellSize={1}
          cellThickness={1}
          cellColor="#0f172a"
          sectionSize={5}
          sectionThickness={1.5}
          sectionColor="#0284c7"
          fadeDistance={40}
        />

        {/* زیادکردنی تۆزی دیجیتاڵی */}
        <FloatingParticles />

        <group ref={cityGroupRef}>
          <DigitalCity prompt={prompt} />
        </group>

        <EffectComposer>
          <Bloom
            intensity={3.5}
            luminanceThreshold={0}
            luminanceSmoothing={0.8}
            mipmapBlur
          />
        </EffectComposer>

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