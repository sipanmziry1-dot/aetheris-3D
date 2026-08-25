'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function DigitalCity() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  const buildings = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 20,
    z: (Math.random() - 0.5) * 20,
    height: Math.random() * 4 + 1,
    color: Math.random() > 0.5 ? '#00f0ff' : '#7000ff',
  }));

  return (
    <group ref={groupRef}>
      {/* Grid Floor */}
      <gridHelper args={[30, 30, '#00f0ff', '#1f2937']} position={[0, -0.01, 0]} />

      {/* City Buildings */}
      {buildings.map((b) => (
        <mesh key={b.id} position={[b.x, b.height / 2, b.z]}>
          <boxGeometry args={[0.8, b.height, 0.8]} />
          <meshStandardMaterial 
            color={b.color} 
            wireframe={true}
            emissive={b.color}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}