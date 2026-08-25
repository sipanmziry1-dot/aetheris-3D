"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import DigitalCity from "./DigitalCity";

interface Canvas3DProps {
  isGenerating: boolean;
  prompt: string;
}

export default function Canvas3D({ isGenerating }: Canvas3DProps) {
  const cityGroupRef = useRef<any>(null);

  useEffect(() => {
    if (isGenerating && cityGroupRef.current) {
      // Animate building scales and rotation when generating
      gsap.to(cityGroupRef.current.rotation, {
        y: cityGroupRef.current.rotation.y + Math.PI * 2,
        duration: 2,
        ease: "power2.inOut",
      });

      gsap.to(cityGroupRef.current.scale, {
        x: 1.2,
        y: 1.5,
        z: 1.2,
        duration: 1,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
      });
    }
  }, [isGenerating]);

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [20, 20, 20], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
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