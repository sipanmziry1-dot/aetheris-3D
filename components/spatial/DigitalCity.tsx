"use client";

import { useState } from "react";

export default function DigitalCity() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  // دروستکردنی gridی 4x4 بە دووری گونجاو لە نێوانیاندا
  const buildings = Array.from({ length: 16 }).map((_, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    return {
      id: i,
      position: [(col - 1.5) * 5, 0, (row - 1.5) * 5] as [number, number, number],
      height: (i % 3 + 1) * 3 + 2, // بەرزایی جیاواز بۆ باڵەخانەکان
    };
  });

  return (
    <group>
      {buildings.map((b) => (
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
          <meshStandardMaterial
            color={selected === b.id ? "#00ffff" : hovered === b.id ? "#ff007f" : "#0ea5e9"}
            wireframe={true}
          />
        </mesh>
      ))}
    </group>
  );
}