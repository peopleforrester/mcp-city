// ABOUTME: The road into the city with six gates: a barrier per gate, a vehicle that advances on pass, a pink alley on fail.
// ABOUTME: Driven by the walk state the form already holds; the admitted server lights a building in the registry district.

import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { GATE_COLORS, GATES } from "../data/gates";
import type { Walk } from "../lib/walk";
import { SkyDome } from "./SkyDome";

const GATE_Z = (i: number) => -6 - i * 7;
const CITY_Z = GATE_Z(GATES.length) - 10;

function Road() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -30]}>
        <planeGeometry args={[7, 120]} />
        <meshBasicMaterial color="#0b1a30" />
      </mesh>
      {Array.from({ length: 24 }, (_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 4 - i * 4]}>
          <planeGeometry args={[0.2, 1.6]} />
          <meshBasicMaterial color="#1f3a5f" />
        </mesh>
      ))}
    </group>
  );
}

function Gate({ i, verdict }: { i: number; verdict: Walk[number] }) {
  const bar = useRef<THREE.Group>(null);
  const alley = useRef<THREE.Mesh>(null);
  const figure = useRef<THREE.Mesh>(null);
  const color = GATE_COLORS[i];
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (bar.current) {
      const target = verdict === "pass" ? Math.PI / 2.4 : 0;
      bar.current.rotation.z += (target - bar.current.rotation.z) * 0.08;
    }
    if (alley.current) {
      const m = alley.current.material as THREE.MeshBasicMaterial;
      const on = verdict === "fail" ? 0.55 + Math.sin(t * 3) * 0.2 : 0;
      m.opacity += (on - m.opacity) * 0.08;
    }
    if (figure.current) {
      figure.current.visible = verdict === "fail";
      figure.current.position.x = 4 + ((t * 0.8) % 7);
    }
  });
  const z = GATE_Z(i);
  return (
    <group position={[0, 0, z]}>
      {[-3.6, 3.6].map((x) => (
        <mesh key={x} position={[x, 1.6, 0]}>
          <boxGeometry args={[0.4, 3.2, 0.4]} />
          <meshBasicMaterial color="#02050c" />
        </mesh>
      ))}
      {/* The barrier pivots on the left post, so it lifts like a real one. */}
      <group ref={bar} position={[-3.4, 2.4, 0]}>
        <mesh position={[3.4, 0, 0]}>
          <boxGeometry args={[6.8, 0.22, 0.22]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
      <mesh position={[0, 3.9, 0]}>
        <boxGeometry args={[0.9, 0.9, 0.1]} />
        <meshBasicMaterial color={verdict === "pass" ? "#04c0da" : verdict === "fail" ? "#ff3c64" : "#1f3a5f"} />
      </mesh>
      {/* The side alley: what the user builds when this gate says no. */}
      <mesh ref={alley} rotation={[-Math.PI / 2, 0, 0]} position={[7.5, 0.02, 1.5]}>
        <planeGeometry args={[8, 1.6]} />
        <meshBasicMaterial color="#ff3c64" transparent opacity={0} />
      </mesh>
      <mesh ref={figure} position={[4, 0.9, 1.5]} visible={false}>
        <capsuleGeometry args={[0.28, 1.1, 4, 8]} />
        <meshBasicMaterial color="#02050c" />
      </mesh>
    </group>
  );
}

function Vehicle({ walk }: { walk: Walk }) {
  const g = useRef<THREE.Group>(null);
  const targetZ = useMemo(() => {
    const next = walk.findIndex((v) => v === "open");
    const fail = walk.findIndex((v) => v === "fail");
    if (fail !== -1) return GATE_Z(fail) + 2.2;
    if (next === -1) return CITY_Z + 4;
    return GATE_Z(next) + 2.2;
  }, [walk]);
  useFrame(() => {
    if (!g.current) return;
    g.current.position.z += (targetZ - g.current.position.z) * 0.06;
  });
  return (
    <group ref={g} position={[0, 0.5, 4]}>
      <mesh>
        <boxGeometry args={[1.4, 0.7, 2.2]} />
        <meshBasicMaterial color="#02050c" />
      </mesh>
      <mesh position={[0, 0.55, -0.2]}>
        <boxGeometry args={[1.0, 0.4, 1.0]} />
        <meshBasicMaterial color="#02050c" />
      </mesh>
      {[-0.45, 0.45].map((x) => (
        <mesh key={x} position={[x, 0.1, -1.12]}>
          <boxGeometry args={[0.25, 0.12, 0.05]} />
          <meshBasicMaterial color="#04c0da" />
        </mesh>
      ))}
    </group>
  );
}

function City({ admitted }: { admitted: boolean }) {
  const glow = useRef<THREE.Mesh>(null);
  const blocks = useMemo(() => {
    const out: [number, number, number, number][] = [];
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    for (let i = 0; i < 160; i++) {
      const x = (rand() - 0.5) * 70;
      const z = CITY_Z - rand() * 50;
      out.push([x, z, 1 + rand() * 2, 2 + rand() * 12]);
    }
    return out;
  }, []);
  useFrame(({ clock }) => {
    if (!glow.current) return;
    const m = glow.current.material as THREE.MeshBasicMaterial;
    const on = admitted ? 1 : 0;
    m.opacity += (on - m.opacity) * 0.05;
    glow.current.position.y = 7 + Math.sin(clock.getElapsedTime() * 2) * 0.1;
  });
  return (
    <group>
      {blocks.map(([x, z, w, h], i) => (
        <mesh key={i} position={[x, h / 2, z]}>
          <boxGeometry args={[w, h, w]} />
          <meshBasicMaterial color="#02050c" />
        </mesh>
      ))}
      {/* The registry district's tower, lit when the server is admitted. */}
      <mesh position={[0, 7, CITY_Z - 6]}>
        <boxGeometry args={[2.4, 14, 2.4]} />
        <meshBasicMaterial color="#02050c" />
      </mesh>
      <mesh ref={glow} position={[0, 7, CITY_Z - 6]}>
        <boxGeometry args={[2.6, 14.2, 2.6]} />
        <meshBasicMaterial color="#04c0da" transparent opacity={0} />
      </mesh>
    </group>
  );
}

function Rig({ walk }: { walk: Walk }) {
  const target = useRef(new THREE.Vector3());
  const look = useRef(new THREE.Vector3());
  const focusZ = useMemo(() => {
    const next = walk.findIndex((v) => v === "open");
    const fail = walk.findIndex((v) => v === "fail");
    if (fail !== -1) return GATE_Z(fail);
    if (next === -1) return CITY_Z;
    return GATE_Z(next);
  }, [walk]);
  useFrame(({ camera, pointer }) => {
    target.current.set(pointer.x * 2, 5.5, focusZ + 16);
    camera.position.lerp(target.current, 0.05);
    look.current.set(0, 1.5, focusZ - 6);
    camera.lookAt(look.current);
  });
  return null;
}

export default function GateRoad({ walk, active = true }: { walk: Walk; active?: boolean }) {
  const admitted = walk.every((v) => v === "pass");
  return (
    <Canvas frameloop={active ? "always" : "never"} dpr={[1, 1.5]} gl={{ alpha: false, antialias: false, powerPreference: "high-performance" }} camera={{ position: [0, 5.5, 14], fov: 45, near: 0.5, far: 400 }}>
      <fog attach="fog" args={["#07264a", 30, 120]} />
      <SkyDome radius={200} sharpness={7} />
      <Road />
      {GATES.map((g, i) => (
        <Gate key={g.n} i={i} verdict={walk[i]} />
      ))}
      <Vehicle walk={walk} />
      <City admitted={admitted} />
      <Rig walk={walk} />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.8} luminanceThreshold={0.5} luminanceSmoothing={0.3} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
