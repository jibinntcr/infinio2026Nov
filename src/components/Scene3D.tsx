'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

export interface Scene3DProps {
  activeMode?: number;
  paused?: boolean;
  reducedMotion?: boolean;
  onContextError?: () => void;
}

interface NodeSpec {
  pos: [number, number, number];
  color: string;
  scale: number;
}

const MODE_CONFIGS: {
  hubColor: string;
  secondaryHexColor: string;
  lineColor: string;
  nodes: NodeSpec[];
  edges: [number, number][];
}[] = [
  // Mode 0: AI Core (Diamond workflow pipeline around interlocking hex hub)
  {
    hubColor: '#0d9488',
    secondaryHexColor: '#d6c2b8',
    lineColor: '#38bdf8',
    nodes: [
      { pos: [-1.45, 0.65, 0.1], color: '#5ce1e6', scale: 0.24 },
      { pos: [1.45, 0.65, 0.1], color: '#2563eb', scale: 0.24 },
      { pos: [-1.35, -0.7, 0.15], color: '#38bdf8', scale: 0.22 },
      { pos: [1.35, -0.7, 0.15], color: '#0d9488', scale: 0.24 },
    ],
    edges: [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
    ],
  },
  // Mode 1: Cloud Mesh (Distributed multi-node resilient mesh)
  {
    hubColor: '#2563eb',
    secondaryHexColor: '#5ce1e6',
    lineColor: '#2563eb',
    nodes: [
      { pos: [0, 1.05, 0.1], color: '#38bdf8', scale: 0.25 },
      { pos: [-1.5, 0.15, 0.15], color: '#0d9488', scale: 0.23 },
      { pos: [1.5, 0.15, 0.15], color: '#2563eb', scale: 0.23 },
      { pos: [-0.95, -0.9, 0.1], color: '#5ce1e6', scale: 0.21 },
      { pos: [0.95, -0.9, 0.1], color: '#38bdf8', scale: 0.21 },
    ],
    edges: [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 4],
      [3, 4],
      [1, 2],
    ],
  },
  // Mode 2: Digital ERP (Structured 4-module operational matrix)
  {
    hubColor: '#0284c7',
    secondaryHexColor: '#e6d4cc',
    lineColor: '#0d9488',
    nodes: [
      { pos: [-1.35, 0.75, 0.05], color: '#2563eb', scale: 0.24 },
      { pos: [1.35, 0.75, 0.05], color: '#0d9488', scale: 0.24 },
      { pos: [-1.35, -0.75, 0.05], color: '#0284c7', scale: 0.24 },
      { pos: [1.35, -0.75, 0.05], color: '#5ce1e6', scale: 0.24 },
    ],
    edges: [
      [0, 1],
      [2, 3],
      [0, 2],
      [1, 3],
    ],
  },
];

function ConnectedInfinioNetwork({
  activeMode,
  reducedMotion,
}: {
  activeMode: number;
  reducedMotion: boolean;
}) {
  const rootRef = useRef<THREE.Group>(null);
  const leftHexRef = useRef<THREE.Mesh>(null);
  const rightHexRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  const config = MODE_CONFIGS[activeMode % MODE_CONFIGS.length];

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;

    if (rootRef.current) {
      // Restrained, slow breathing motion + subtle pointer parallax
      const targetX = state.pointer.y * 0.12 + Math.sin(t * 0.45) * 0.05;
      const targetY = state.pointer.x * 0.18 + Math.cos(t * 0.35) * 0.08;
      rootRef.current.rotation.x = THREE.MathUtils.lerp(
        rootRef.current.rotation.x,
        targetX,
        delta * 2.5
      );
      rootRef.current.rotation.y = THREE.MathUtils.lerp(
        rootRef.current.rotation.y,
        targetY,
        delta * 2.5
      );
    }

    if (leftHexRef.current && rightHexRef.current) {
      leftHexRef.current.rotation.z = Math.sin(t * 0.5) * 0.06;
      rightHexRef.current.rotation.z = -Math.sin(t * 0.5) * 0.06;
    }

    if (pulseRef.current && config.nodes.length > 0) {
      const segProgress = (t * 0.45) % config.nodes.length;
      const idx = Math.floor(segProgress);
      const frac = segProgress - idx;
      const nodePos = config.nodes[idx].pos;
      pulseRef.current.position.set(
        nodePos[0] * frac,
        nodePos[1] * frac,
        nodePos[2] * frac
      );
    }
  });

  const hubOrigin: [number, number, number] = [0, 0, 0];

  const spokeLines = useMemo(
    () => config.nodes.map((n) => [hubOrigin, n.pos] as [number, number, number][]),
    [config]
  );

  const perimeterLines = useMemo(
    () =>
      config.edges
        .filter(([a, b]) => config.nodes[a] && config.nodes[b])
        .map(
          ([a, b]) =>
            [config.nodes[a].pos, config.nodes[b].pos] as [number, number, number][]
        ),
    [config]
  );

  return (
    <group ref={rootRef}>
      {/* Central Interlocking Double-Hexagon Brand Motif (echoing the Infinio logo) */}
      <group position={[0, 0, 0]}>
        <mesh ref={leftHexRef} position={[-0.28, 0, 0]} rotation={[0.15, 0.2, 0]}>
          <torusGeometry args={[0.52, 0.09, 6, 6]} />
          <meshStandardMaterial
            color={config.hubColor}
            roughness={0.25}
            metalness={0.35}
          />
        </mesh>

        <mesh ref={rightHexRef} position={[0.28, 0, -0.04]} rotation={[-0.15, -0.2, 0]}>
          <torusGeometry args={[0.52, 0.09, 6, 6]} />
          <meshStandardMaterial
            color={config.secondaryHexColor}
            roughness={0.3}
            metalness={0.25}
          />
        </mesh>

        {/* Central Core Node */}
        <mesh position={[0, 0, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 6]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.4} />
        </mesh>
      </group>

      {/* Radial Circuit Spokes from Central Hub to Operational Modules */}
      {spokeLines.map((pts, idx) => (
        <Line
          key={`spoke-${activeMode}-${idx}`}
          points={pts}
          color={config.lineColor}
          lineWidth={1.6}
          transparent
          opacity={0.45}
        />
      ))}

      {/* Perimeter Module Connections */}
      {perimeterLines.map((pts, idx) => (
        <Line
          key={`edge-${activeMode}-${idx}`}
          points={pts}
          color="#94a3b8"
          lineWidth={1.2}
          transparent
          opacity={0.35}
        />
      ))}

      {/* Connected Hexagonal Module Nodes */}
      {config.nodes.map((node, idx) => (
        <group key={`node-${activeMode}-${idx}`} position={node.pos}>
          {/* Outer Hex Ring */}
          <mesh>
            <torusGeometry args={[node.scale, 0.045, 6, 6]} />
            <meshStandardMaterial
              color={node.color}
              roughness={0.25}
              metalness={0.3}
            />
          </mesh>
          {/* Inner Module Disc */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[node.scale * 0.55, node.scale * 0.55, 0.06, 6]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
          </mesh>
        </group>
      ))}

      {/* Subtle Signal Packet Traveling Between Hub and Modules */}
      {!reducedMotion && (
        <mesh ref={pulseRef}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshBasicMaterial color={config.hubColor} />
        </mesh>
      )}
    </group>
  );
}

export default function Scene3D({
  activeMode = 0,
  paused = false,
  reducedMotion = false,
  onContextError,
}: Scene3DProps) {
  useEffect(() => {
    return () => {
      // Clean up Three.js cache on unmount
      THREE.Cache.clear();
    };
  }, []);

  return (
    <div className="h-full w-full">
      <Canvas
        frameloop={paused || reducedMotion ? 'demand' : 'always'}
        camera={{ position: [0, 0, 3.8], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'default',
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl }) => {
          const domElement = gl.domElement;
          domElement.addEventListener(
            'webglcontextlost',
            (event) => {
              event.preventDefault();
              onContextError?.();
            },
            false
          );
        }}
      >
        <ambientLight intensity={1.6} />
        <directionalLight position={[4, 5, 5]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-4, -3, 3]} intensity={1.1} color="#e0f2fe" />
        <ConnectedInfinioNetwork
          activeMode={activeMode}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </div>
  );
}
