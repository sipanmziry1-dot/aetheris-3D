"use client";

import { useState } from "react";
import { Html } from "@react-three/drei";

export default function DigitalCity({ onSelectBuilding }: { onSelectBuilding?: (id: number) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  // دروستکردنی نموونەی باڵەخانەکان (داتا)
  const buildings = Array.from({ length: 16 }).map((_, i) => ({
    id: i,
    position: [(i % 4) * 4 - 6, 0, Math.floor(i / 4) * 4 - 6] as [number, number, number],
    height: Math.random() * 6 + 2,
  }));

  return (
    <group>
      {buildings.map((b) => {
        const isHovered = hovered === b.id;
        const isSelected = selected === b.id;

        return (
          <mesh
            key={b.id}
            position={[b.position[0], b.height / 2, b.position[2]]}
            onPointerOver={(e) => (e.stopPropagation(), setHovered(b.id))}
            onPointerOut={() => setHovered(null)}
            onClick={(e) => {
              e.stopPropagation();
              setSelected(b.id);
              if (onSelectBuilding) onSelectBuilding(b.id);
            }}
          >
            <boxGeometry args={[2, b.height, 2]} />
            <meshStandardMaterial
              color={isSelected ? "#00ffff" : isHovered ? "#ff007f" : "#0f172a"}
              wireframe={true}
            />

            {/* کارتی زانیاری ئەگەر کلیکی لەسەر کرا */}
            {isSelected && (
              <Html position={[0, b.height / 2 + 1.5, 0]} center>
                <div className="bg-slate-900/90 border border-cyan-400 text-white p-3 rounded-xl shadow-xl text-xs w-36 backdrop-blur-md">
                  <p className="font-bold text-cyan-400">Node #{b.id + 1}</p>
                  <p className="text-slate-300 mt-1">Height: {b.height.toFixed(1)}m</p>
                  <p className="text-slate-400 text-[10px] mt-1">Status: Active</p>
                  <button
                    onClick={() => setSelected(null)}
                    className="mt-2 text-[10px] text-red-400 hover:underline block w-full text-right"
                  >
                    داخستن
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