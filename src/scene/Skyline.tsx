// ABOUTME: The city at night built on a Death Star, in the deck's shadow-play look: silhouette towers on the station's north cap.
// ABOUTME: Loaded lazily after first paint; nothing here is needed to read the page.

import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { DEATH_STAR_CENTER, DEATH_STAR_RADIUS, deathStarMaterial } from "./deathStar";
import { silhouetteMaterial } from "./silhouette";
import { SkyDome } from "./SkyDome";

const COUNT = 2600;
const UP = new THREE.Vector3(0, 1, 0);
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
  // Fog distances stretched for the orbit view, where the station is 400 units out.
  const material = useMemo(() => {
    const m = silhouetteMaterial();
    m.uniforms.uFogNear.value = 220;
    m.uniforms.uFogFar.value = 900;
    return m;
  }, []);
  useFrame(({ clock }) => {
    const m = ref.current?.material as THREE.ShaderMaterial | undefined;
    if (m) m.uniforms.uTime.value = clock.getElapsedTime();
  });
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
      // Stand each tower on the Death Star's surface, upright to the curve.
      const up = new THREE.Vector3(x, Math.sqrt(DEATH_STAR_RADIUS ** 2 - x * x - z * z), z).normalize();
      dummy.position.copy(DEATH_STAR_CENTER).addScaledVector(up, DEATH_STAR_RADIUS + h / 2 - 0.3);
      dummy.quaternion.setFromUnitVectors(UP, up);
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
      args={[undefined, material, COUNT]}
    >
      <boxGeometry args={[1, 1, 1]} />
    </instancedMesh>
  );
}


/** Stars below the horizon, so the station hangs in space rather than over a dark disc. */
function Stars() {
  const points = useMemo(() => {
    const rand = seeded(1977);
    const arr = new Float32Array(1400 * 3);
    for (let i = 0; i < 1400; i++) {
      const u = rand() * 2 - 1;
      const t = rand() * Math.PI * 2;
      const y = -Math.abs(u) * 0.95 - 0.05;
      const r = Math.sqrt(1 - y * y);
      arr.set([Math.cos(t) * r * 440, y * 440, Math.sin(t) * r * 440], i * 3);
    }
    return arr;
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#cfefff" size={1.4} sizeAttenuation={false} transparent opacity={0.85} depthWrite={false} fog={false} />
    </points>
  );
}

/** The station itself, under the city. */
function DeathStar() {
  const material = useMemo(() => deathStarMaterial(), []);
  return (
    <mesh position={DEATH_STAR_CENTER} material={material}>
      <sphereGeometry args={[DEATH_STAR_RADIUS, 160, 96]} />
    </mesh>
  );
}

// Orbit sees the station side on, the city a crown on its north cap; the descent rises over the top and lands on the street.
const ORBIT = new THREE.Vector3(0, 40, 440);
// Street level on the curve: the surface at z = 96 sits about 38 units below the pole.
const STREET = new THREE.Vector3(0, -31, 96);

function Rig({ progress }: { progress: RefObject<number> }) {
  const target = useRef(new THREE.Vector3());
  const look = useRef(new THREE.Vector3());
  useFrame(({ camera, pointer, clock }) => {
    const t = clock.getElapsedTime();
    const p = progress.current ?? 0;
    // Ease the descent so orbit lingers and the street arrives gently.
    const e = p < 0.5 ? 4 * p * p * p : 1 - (-2 * p + 2) ** 3 / 2;
    target.current.lerpVectors(ORBIT, STREET, e);
    target.current.x += Math.sin(t * 0.05) * 8 * (1 - e) + pointer.x * 6;
    target.current.y += pointer.y * 3 * (1 - e);
    camera.position.lerp(target.current, 0.08);
    // Looking left of the station at orbit puts it on the right of the frame, beside the title.
    look.current.set(-250 * (1 - e), -120 * (1 - e) - 12 * e, 0);
    camera.lookAt(look.current);
  });
  return null;
}

export default function Skyline({ progress, active = true }: { progress: RefObject<number>; active?: boolean }) {
  return (
    <Canvas frameloop={active ? "always" : "never"} dpr={[1, 1.5]} gl={{ alpha: false, antialias: false, powerPreference: "high-performance" }} camera={{ position: [0, 40, 440], fov: 50, near: 0.5, far: 1200 }}>
      <fog attach="fog" args={["#07264a", 80, 420]} />
      <SkyDome />
      <Buildings />
      <Stars />
      <DeathStar />
      <Rig progress={progress} />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.9} luminanceThreshold={0.4} luminanceSmoothing={0.3} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
