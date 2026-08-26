"use client";

import { useState } from "react";
import { useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import gsap from "gsap";

interface Building {
  id: number;
  position: [number, number, number];
  height: number;
  title: string;
}

export default function DigitalCity({ prompt }: { prompt?: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const { camera } = useThree();

  const buildings: Building[] = Array.from({ length: 16 }).map((_, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    return {
      id: i,
      position: [(col - 1.5) * 5, 0, (row - 1.5) * 5],
      height: (i % 3 + 1) * 3 + 2,
      title: `Data Node #${i + 1}`,
    };
  });

  const handleSelectBuilding = (b: Building) => {
    setSelected(b.id);
    // Camera Zoom-In effect with GSAP
    gsap.to(camera.position, {
      x: b.position[0] + 6,
      y: b.height + 4,
      z: b.position[2] + 6,
      duration: 1.5,
      ease: "power3.inOut",
    });
  };

  return (
    <group>
      {buildings.map((b) => {
        const isSelected = selected === b.id;
        const isHovered = hovered === b.id;
        const activeColor = isSelected ? "#00ffff" : isHovered ? "#ff007f" : "#0284c7";

        return (
          <mesh
            key={b.id}
            position={[b.position[0], b.height / 2, b.position[2]]}
            onPointerDown={(e) => {
              e.stopPropagation();
              handleSelectBuilding(b);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
              setHovered(b.id);
            }}
            onPointerOut={() => {
              document.body.style.cursor = "auto";
              setHovered(null);
            }}
          >
            <boxGeometry args={[2, b.height, 2]} />
            <meshStandardMaterial
              color={activeColor}
              emissive={activeColor}
              emissiveIntensity={isSelected ? 4 : isHovered ? 3 : 1.5}
              wireframe={true}
            />

            {isSelected && (
              <Html position={[0, b.height / 2 + 1.5, 0]} center>
                <div className="bg-slate-900/90 border border-cyan-400 text-white p-3 rounded-xl shadow-2xl text-xs w-44 backdrop-blur-md dir-rtl">
                  <p className="font-bold text-cyan-400">{b.title}</p>
                  <p className="text-slate-300 mt-1">Status: Processed</p>
                  <p className="text-slate-400 text-[10px] mt-1 break-words">
                    {prompt ? `AI Query: "${prompt}"` : "ئامادەیە بۆ وەرگرتنی داتا"}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(null);
                      // Reset Camera
                      gsap.to(camera.position, { x: 15, y: 12, z: 15, duration: 1.5 });
                    }}
                    className="mt-2 text-[10px] text-red-400 hover:underline block w-full text-right"
                  >
                    داخستن / Return
                  </button>
                </div>
              </Html>
            )}
          </mesh>
        );
      })}
    </group>
  );
}