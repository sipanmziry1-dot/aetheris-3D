"use client";

import { useState } from "react";

export default function DigitalCity() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const buildings = Array.from({ length: 16 }).map((_, i) => ({
    id: i,
    position: [(i % 4) * 4 - 6, 0, Math.floor(i / 4) * 4 - 6] as [number, number, number],
    height: Math.random() * 6 + 2,
  }));

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
            color={selected === b.id ? "#00ffff" : hovered === b.id ? "#ff007f" : "#0f172a"}
            wireframe={true}
          />
        </mesh>
      ))}
    </group>
  );
}