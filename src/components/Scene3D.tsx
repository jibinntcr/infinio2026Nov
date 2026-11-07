'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function IridescentSculpture({ activeMode }: { activeMode: number }) {
  const torusRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const palettes = [
    { primary: '#1a73e8', secondary: '#7b61ff', core: '#d96570' },
    { primary: '#7b61ff', secondary: '#1a73e8', core: '#0d9488' },
    { primary: '#d96570', secondary: '#1a73e8', core: '#7b61ff' },
  ];
  const current = palettes[activeMode % palettes.length];

  useFrame((state, delta) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.35;
      torusRef.current.rotation.y += delta * 0.45;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.25;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.4;
    }
    if (coreRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.06;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group>
      <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh ref={torusRef}>
          <torusKnotGeometry args={[1.05, 0.28, 128, 32]} />
          <MeshDistortMaterial
            color={current.primary}
            roughness={0.15}
            metalness={0.65}
            distort={0.22}
            speed={2}
          />
        </mesh>

        <mesh ref={ringRef} scale={1.55}>
          <torusGeometry args={[1.1, 0.035, 32, 100]} />
          <meshStandardMaterial
            color={current.secondary}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        <mesh ref={coreRef} scale={0.45}>
          <icosahedronGeometry args={[1, 4]} />
          <meshStandardMaterial
            color={current.core}
            roughness={0.1}
            metalness={0.5}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene3D({ activeMode = 0 }: { activeMode?: number }) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 6, 4]} intensity={2.2} color="#ffffff" />
        <directionalLight position={[-4, -3, 2]} intensity={1.4} color="#a8c7fa" />
        <IridescentSculpture activeMode={activeMode} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
