'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import DigitalCity from './DigitalCity';

function CameraController() {
  const { camera } = useThree();

  useEffect(() => {
    // Cinematic intro animation with GSAP
    gsap.fromTo(
      camera.position,
      { x: 0, y: 40, z: 60 },
      { x: 0, y: 15, z: 25, duration: 2.5, ease: 'power3.inOut' }
    );
  }, [camera]);

  return null;
}

export default function Canvas3D() {
  return (
    <div className="absolute inset-0 w-full h-full bg-slate-950">
      <Canvas
        camera={{ position: [0, 40, 60], fov: 60 }}
        gl={{ antialias: true }}
      >
        <CameraController />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 20, 15]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
        
        <DigitalCity />

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