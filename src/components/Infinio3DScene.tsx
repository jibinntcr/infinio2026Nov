'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export interface SceneInteractionState {
  scrollProgress: number;
  shockPulse: number;
  holdChaos: number;
  activeWorkIndex: number;
  formationMode?: 'auto' | 'infinity' | 'helix' | 'matrix' | 'ring';
  pointerX: number;
  pointerY: number;
}

interface RibbonSegment {
  infinityPos: THREE.Vector3;
  infinityQuat: THREE.Quaternion;
  helixPos: THREE.Vector3;
  helixQuat: THREE.Quaternion;
  matrixPos: THREE.Vector3;
  matrixQuat: THREE.Quaternion;
  ringPos: THREE.Vector3;
  ringQuat: THREE.Quaternion;
  chaosPos: THREE.Vector3;
  scale: THREE.Vector3;
  phase: number;
}

const SEGMENT_COUNT = 108;

function getInfinityPoint(t: number, out: THREE.Vector3) {
  const a = 2.6;
  const denom = 1 + Math.sin(t) * Math.sin(t);
  const x = (a * Math.cos(t)) / denom;
  const y = (a * Math.sin(t) * Math.cos(t)) / denom;
  const z = Math.sin(t) * 0.68;
  out.set(x, y * 1.2, z);
}

function IridescentSculpture({
  stateRef,
}: {
  stateRef: React.MutableRefObject<SceneInteractionState>;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const targetQuat = useMemo(() => new THREE.Quaternion(), []);
  const tempVec = useMemo(() => new THREE.Vector3(), []);

  const segments = useMemo<RibbonSegment[]>(() => {
    const list: RibbonSegment[] = [];
    const pCurr = new THREE.Vector3();
    const pNext = new THREE.Vector3();
    const up = new THREE.Vector3(0, 0, 1);
    const mat = new THREE.Matrix4();

    for (let i = 0; i < SEGMENT_COUNT; i++) {
      const ratio = i / SEGMENT_COUNT;
      const t = ratio * Math.PI * 2;
      const dt = 0.012;

      // 1. Infinity Ribbon
      getInfinityPoint(t, pCurr);
      getInfinityPoint(t + dt, pNext);
      const twistUp = new THREE.Vector3(
        Math.cos(t * 0.5) * 0.25,
        Math.sin(t * 0.5) * 0.4,
        Math.cos(t * 0.5)
      ).normalize();
      mat.lookAt(pCurr, pNext, twistUp);
      const infinityQuat = new THREE.Quaternion().setFromRotationMatrix(mat);
      const infinityPos = pCurr.clone();

      // 2. Double-Helix
      const strand = i % 2 === 0 ? 1 : -1;
      const hAngle = ratio * Math.PI * 4 + (strand === -1 ? Math.PI : 0);
      const hRadius = 1.65;
      const hx = Math.cos(hAngle) * hRadius;
      const hy = (ratio - 0.5) * 3.8;
      const hz = Math.sin(hAngle) * hRadius;
      const helixPos = new THREE.Vector3(hx, hy, hz);
      const helixNext = new THREE.Vector3(
        Math.cos(hAngle + dt) * hRadius,
        hy + 0.02,
        Math.sin(hAngle + dt) * hRadius
      );
      mat.lookAt(helixPos, helixNext, up);
      const helixQuat = new THREE.Quaternion().setFromRotationMatrix(mat);

      // 3. Spatial Matrix
      const gx = (i % 6) - 2.5;
      const gy = (Math.floor(i / 6) % 6) - 2.5;
      const gz = Math.floor(i / 36) - 1;
      const matrixPos = new THREE.Vector3(gx * 0.65, gy * 0.58, gz * 0.65);
      const matrixQuat = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0.18, 0.35, 0)
      );

      // 4. Orbital Ring
      const rRadius = 2.25;
      const rx = Math.cos(t) * rRadius;
      const ry = Math.sin(t) * rRadius * 0.78;
      const rz = Math.sin(t * 3) * 0.32;
      const ringPos = new THREE.Vector3(rx, ry, rz);
      const ringNext = new THREE.Vector3(
        Math.cos(t + dt) * rRadius,
        Math.sin(t + dt) * rRadius * 0.78,
        Math.sin((t + dt) * 3) * 0.32
      );
      mat.lookAt(ringPos, ringNext, up);
      const ringQuat = new THREE.Quaternion().setFromRotationMatrix(mat);

      const chaosPos = infinityPos
        .clone()
        .normalize()
        .multiplyScalar(3.4 + (i % 4) * 0.4);

      const isKey = i % 6 === 0;
      list.push({
        infinityPos,
        infinityQuat,
        helixPos,
        helixQuat,
        matrixPos,
        matrixQuat,
        ringPos,
        ringQuat,
        chaosPos,
        scale: isKey
          ? new THREE.Vector3(0.44, 0.12, 0.22)
          : new THREE.Vector3(0.34, 0.09, 0.16),
        phase: ratio * Math.PI * 2,
      });
    }
    return list;
  }, []);

  useEffect(() => {
    if (!meshRef.current) return;
    const color = new THREE.Color();
    // NotebookLM / Google Labs palette: Cobalt Blue, Gemini Violet, Coral Rose, Teal, Slate Ink
    for (let i = 0; i < SEGMENT_COUNT; i++) {
      const mod = i % 10;
      if (mod === 0 || mod === 1) {
        color.set('#1a73e8'); // Google Cobalt Blue
      } else if (mod === 2 || mod === 3) {
        color.set('#7b61ff'); // Gemini Violet
      } else if (mod === 4) {
        color.set('#d96570'); // Warm Coral
      } else if (mod === 5 || mod === 6) {
        color.set('#0ea5e9'); // Sky Cyan
      } else if (mod === 7 || mod === 8) {
        color.set('#1e293b'); // Deep Obsidian Slate
      } else {
        color.set('#64748b'); // Architectural Pewter
      }
      meshRef.current.setColorAt(i, color);
    }
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [segments]);

  const currentPos = useMemo(
    () => segments.map((s) => s.infinityPos.clone()),
    [segments]
  );
  const currentQuat = useMemo(
    () => segments.map((s) => s.infinityQuat.clone()),
    [segments]
  );

  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return;
    const time = state.clock.elapsedTime;
    const st = stateRef.current;

    if (st.shockPulse > 0.001) {
      st.shockPulse = Math.max(0, st.shockPulse - delta * 1.8);
    }

    const p = st.scrollProgress;
    const mode = st.formationMode || 'auto';

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      st.pointerX * 0.25,
      delta * 3.5
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      st.pointerY * 0.2,
      delta * 3.5
    );

    groupRef.current.rotation.y =
      time * 0.18 + Math.sin(time * 0.3) * 0.18 + st.pointerX * 0.35;
    groupRef.current.rotation.x =
      Math.cos(time * 0.22) * 0.14 - st.pointerY * 0.2;

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.15;
      ring1Ref.current.rotation.x = Math.sin(time * 0.25) * 0.35;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.12;
      ring2Ref.current.rotation.y = Math.cos(time * 0.2) * 0.3;
    }

    for (let i = 0; i < SEGMENT_COUNT; i++) {
      const s = segments[i];

      if (mode === 'infinity') {
        targetPos.copy(s.infinityPos);
        targetQuat.copy(s.infinityQuat);
      } else if (mode === 'helix') {
        targetPos.copy(s.helixPos);
        targetQuat.copy(s.helixQuat);
      } else if (mode === 'matrix') {
        targetPos.copy(s.matrixPos);
        targetQuat.copy(s.matrixQuat);
      } else if (mode === 'ring') {
        targetPos.copy(s.ringPos);
        targetQuat.copy(s.ringQuat);
      } else {
        if (p < 0.3) {
          const alpha = THREE.MathUtils.smoothstep(p, 0.05, 0.28);
          targetPos.lerpVectors(s.infinityPos, s.helixPos, alpha);
          targetQuat.slerpQuaternions(s.infinityQuat, s.helixQuat, alpha);
        } else if (p < 0.65) {
          const alpha = THREE.MathUtils.smoothstep(p, 0.32, 0.58);
          targetPos.lerpVectors(s.helixPos, s.matrixPos, alpha);
          targetQuat.slerpQuaternions(s.helixQuat, s.matrixQuat, alpha);
        } else {
          const alpha = THREE.MathUtils.smoothstep(p, 0.66, 0.9);
          targetPos.lerpVectors(s.matrixPos, s.ringPos, alpha);
          targetQuat.slerpQuaternions(s.matrixQuat, s.ringQuat, alpha);
        }
      }

      const wave = Math.sin(time * 2.0 - s.phase * 2) * 0.06;
      targetPos.z += wave;

      if (st.shockPulse > 0.01) {
        const ripple =
          Math.sin(st.shockPulse * Math.PI - s.phase) * st.shockPulse * 0.55;
        tempVec.copy(targetPos).normalize().multiplyScalar(ripple);
        targetPos.add(tempVec);
      }

      if (st.holdChaos > 0.01) {
        targetPos.lerp(s.chaosPos, st.holdChaos * 0.88);
      }

      const curP = currentPos[i];
      const curQ = currentQuat[i];
      curP.lerp(targetPos, Math.min(1, delta * 7.5));
      curQ.slerp(targetQuat, Math.min(1, delta * 7.5));

      dummy.position.copy(curP);
      dummy.quaternion.copy(curQ);

      const scaleBoost = 1 + st.shockPulse * 0.25;
      dummy.scale.set(
        s.scale.x * scaleBoost,
        s.scale.y * scaleBoost,
        s.scale.z * scaleBoost
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, SEGMENT_COUNT]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          roughness={0.22}
          metalness={0.65}
          envMapIntensity={1.4}
        />
      </instancedMesh>

      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.35, 0.008, 16, 120]} />
        <meshBasicMaterial color="#1a73e8" transparent opacity={0.22} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[0.5, 0.2, 0]}>
        <torusGeometry args={[2.75, 0.006, 16, 120]} />
        <meshBasicMaterial color="#7b61ff" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function ResponsiveCamera({
  stateRef,
}: {
  stateRef: React.MutableRefObject<SceneInteractionState>;
}) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    const st = stateRef.current;
    const targetZ = 5.6 - st.shockPulse * 0.25 + st.holdChaos * 0.5;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, delta * 4);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function Infinio3DScene({
  stateRef,
  embedded = false,
}: {
  stateRef: React.MutableRefObject<SceneInteractionState>;
  embedded?: boolean;
}) {
  return (
    <div
      className={
        embedded
          ? 'relative w-full h-full select-none'
          : 'fixed inset-0 z-0 pointer-events-none select-none'
      }
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5.6], fov: 40, near: 0.1, far: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[6, 8, 6]} intensity={2.8} color="#ffffff" />
        <directionalLight position={[-6, -4, 4]} intensity={1.8} color="#1a73e8" />
        <pointLight position={[2.5, 1.5, 3.5]} intensity={2.2} distance={12} color="#7b61ff" />
        <pointLight position={[-2, -2, 2.5]} intensity={1.8} distance={10} color="#d96570" />

        <ResponsiveCamera stateRef={stateRef} />
        <IridescentSculpture stateRef={stateRef} />
      </Canvas>
    </div>
  );
}
