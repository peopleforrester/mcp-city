// ABOUTME: The city at night as instanced silhouettes under a drifting Death Star, in the deck's shadow-play look.
// ABOUTME: Loaded lazily after first paint; nothing here is needed to read the page.

import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { SkyDome } from "./SkyDome";

const COUNT = 2600;
const SPREAD = 160;

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function Buildings() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const matrices = useMemo(() => {
    const rand = seeded(20261006);
    const dummy = new THREE.Object3D();
    const list: THREE.Matrix4[] = [];
    for (let i = 0; i < COUNT; i++) {
      const x = (rand() - 0.5) * SPREAD;
      const z = (rand() - 0.5) * SPREAD;
      const core = 1 - Math.min(1, Math.hypot(x, z) / (SPREAD / 2));
      const h = 1 + rand() * 4 + core * core * rand() * 28;
      const w = 1 + rand() * 2;
      dummy.position.set(x, h / 2, z);
      dummy.scale.set(w, h, w);
      dummy.updateMatrix();
      list.push(dummy.matrix.clone());
    }
    return list;
  }, []);
  return (
    <instancedMesh
      ref={(m) => {
        ref.current = m;
        if (!m) return;
        matrices.forEach((mat, i) => m.setMatrixAt(i, mat));
        m.instanceMatrix.needsUpdate = true;
      }}
      args={[undefined, undefined, COUNT]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#03060f" />
    </instancedMesh>
  );
}

function Windows() {
  const points = useMemo(() => {
    const rand = seeded(500000);
    const arr = new Float32Array(1800 * 3);
    for (let i = 0; i < 1800; i++) {
      arr[i * 3] = (rand() - 0.5) * SPREAD * 0.7;
      arr[i * 3 + 1] = 1 + rand() * 18;
      arr[i * 3 + 2] = (rand() - 0.5) * SPREAD * 0.7;
    }
    return arr;
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#04c0da" size={0.22} sizeAttenuation transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

function DeathStar({ progress }: { progress: RefObject<number> }) {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!g.current) return;
    const t = clock.getElapsedTime();
    const p = progress.current ?? 0;
    // In orbit it hangs above the city; as the camera descends it slides up and out of frame.
    g.current.position.set(-40 + (t * 0.6) % 110, 42 + Math.sin(t * 0.2) * 2 + p * 260, -70);
    g.current.rotation.y = t * 0.05;
    g.current.visible = p < 0.6;
  });
  return (
    <group ref={g}>
      <mesh><sphereGeometry args={[9, 48, 48]} /><meshBasicMaterial color="#02050c" /></mesh>
      <mesh scale={1.03}><sphereGeometry args={[9, 48, 48]} /><meshBasicMaterial color="#ffc800" side={THREE.BackSide} transparent opacity={0.35} /></mesh>
      <mesh position={[4.5, 3.5, 6.5]}><sphereGeometry args={[2.2, 24, 24]} /><meshBasicMaterial color="#061a33" /></mesh>
    </group>
  );
}

const ORBIT = new THREE.Vector3(0, 230, 150);
const STREET = new THREE.Vector3(0, 5, 96);

function Rig({ progress }: { progress: RefObject<number> }) {
  const target = useRef(new THREE.Vector3());
  const look = useRef(new THREE.Vector3());
  useFrame(({ camera, pointer, clock }) => {
    const t = clock.getElapsedTime();
    const p = progress.current ?? 0;
    // Ease the descent so orbit lingers and the street arrives gently.
    const e = p < 0.5 ? 4 * p * p * p : 1 - (-2 * p + 2) ** 3 / 2;
    target.current.lerpVectors(ORBIT, STREET, e);
    target.current.x += Math.sin(t * 0.05) * 20 * (1 - e) + pointer.x * 6;
    target.current.y += pointer.y * 3 * (1 - e);
    camera.position.lerp(target.current, 0.08);
    look.current.set(0, 6 + e * 6, 0);
    camera.lookAt(look.current);
  });
  return null;
}

export default function Skyline({ progress, active = true }: { progress: RefObject<number>; active?: boolean }) {
  return (
    <Canvas frameloop={active ? "always" : "never"} dpr={[1, 1.5]} gl={{ alpha: false, antialias: false, powerPreference: "high-performance" }} camera={{ position: [0, 230, 150], fov: 50, near: 0.5, far: 600 }}>
      <fog attach="fog" args={["#07264a", 80, 420]} />
      <SkyDome />
      <Buildings />
      <Windows />
      <DeathStar progress={progress} />
      <Rig progress={progress} />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.9} luminanceThreshold={0.4} luminanceSmoothing={0.3} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
