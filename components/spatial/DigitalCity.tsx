"use client";

import { useState } from "react";

export default function DigitalCity() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const buildings = Array.from({ length: 16 }).map((_, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    return {
      id: i,
      position: [(col - 1.5) * 5, 0, (row - 1.5) * 5] as [number, number, number],
      height: (i % 3 + 1) * 3 + 2,
    };
  });

  return (
    <group>
      {buildings.map((b) => {
        const isSelected = selected === b.id;
        const isHovered = hovered === b.id;
        
        // هەڵبژاردنی ڕەنگی گەشێنەرەوە
        const activeColor = isSelected ? "#00ffff" : isHovered ? "#ff007f" : "#38bdf8";

        return (
          <mesh
            key={b.id}
            position={[b.position[0], b.height / 2, b.position[2]]}
            onPointerDown={(e) => {
              e.stopPropagation();
              setSelected(b.id);
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
            <meshBasicMaterial
              color={activeColor}
              wireframe={true}
            />
          </mesh>
        );
      })}
    </group>
  );
}