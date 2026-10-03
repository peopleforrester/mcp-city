// ABOUTME: The living map: districts as lit plates, buildings as silhouettes, roads with traffic, the bypass alleys, the attack tracer.
// ABOUTME: Driven by props the Map component holds; clicks on buildings report back through onSelect.

import { Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { DISTRICTS, EDGES, EDGE_COLORS, NODES, nodeById, type CityEdge } from "../data/city";
import { SkyDome } from "./SkyDome";

interface Props {
  sayNo: boolean;
  selected: string | null;
  tracerAt: string | null;
  onSelect: (id: string | null) => void;
}

function Plates() {
  return (
    <group>
      {DISTRICTS.map((d) => (
        <mesh key={d.id} rotation={[-Math.PI / 2, 0, 0]} position={[d.plate[0], 0.02, d.plate[1]]}>
          <planeGeometry args={[d.plate[2], d.plate[3]]} />
          <meshBasicMaterial color={d.color} transparent opacity={0.18} />
        </mesh>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[320, 240]} />
        <meshBasicMaterial color="#071a33" />
      </mesh>
    </group>
  );
}

function Buildings({ selected, sayNo, onSelect }: Pick<Props, "selected" | "sayNo" | "onSelect">) {
  return (
    <group>
      {NODES.map((n) => {
        const dim = n.district === "bypass" && !sayNo;
        const audit = n.district === "audit";
        const color = selected === n.id ? "#04c0da" : "#02050c";
        return (
          <group key={n.id} position={[n.x, 0, n.z]} visible={!dim}>
            <mesh
              position={[0, n.height / 2, 0]}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(selected === n.id ? null : n.id);
              }}
              onPointerOver={() => (document.body.style.cursor = "pointer")}
              onPointerOut={() => (document.body.style.cursor = "")}
            >
              <boxGeometry args={[4, n.height, 4]} />
              <meshBasicMaterial color={color} />
            </mesh>
            {/* A window strip so each building reads as lit; audit goes dark when the city says no. */}
            <mesh position={[0, n.height / 2, 2.05]}>
              <planeGeometry args={[2.4, Math.max(0.6, n.height - 1.5)]} />
              <meshBasicMaterial color={audit && sayNo ? "#1b2535" : n.district === "bypass" ? "#ff3c64" : "#04c0da"} transparent opacity={audit && sayNo ? 0.4 : 0.55} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function Labels({ selected, sayNo }: Pick<Props, "selected" | "sayNo">) {
  return (
    <group>
      {/* drei drops the first Html child's transform on some frames; an empty one takes the hit. */}
      <Html position={[0, -50, 0]} style={{ pointerEvents: "none" }}><span /></Html>
      {NODES.filter((n) => n.district !== "bypass" || sayNo).map((n) => (
        <Html key={n.id} position={[n.x, n.height + 1.2, n.z]} center distanceFactor={80} zIndexRange={[100, 50]} style={{ pointerEvents: "none" }}>
          <span style={{ whiteSpace: "nowrap", fontSize: 11, fontWeight: 600, color: selected === n.id ? "#04c0da" : "#f8f8f2", textShadow: "0 0 6px #000, 0 0 2px #000" }}>{n.name}</span>
        </Html>
      ))}
    </group>
  );
}

function Roads({ sayNo }: { sayNo: boolean }) {
  const segs = useMemo(
    () =>
      EDGES.map((e) => {
        const a = nodeById(e.from);
        const b = nodeById(e.to);
        const dx = b.x - a.x;
        const dz = b.z - a.z;
        return { e, len: Math.hypot(dx, dz), angle: Math.atan2(dx, dz), cx: (a.x + b.x) / 2, cz: (a.z + b.z) / 2 };
      }),
    [],
  );
  return (
    <group>
      {segs.map(({ e, len, angle, cx, cz }) => (
        <mesh key={`${e.from}-${e.to}`} position={[cx, 0.05, cz]} rotation={[-Math.PI / 2, 0, -angle]} visible={e.kind !== "bypass" || sayNo}>
          <planeGeometry args={[e.kind === "bypass" ? 1.2 : 0.7, len]} />
          <meshBasicMaterial color={EDGE_COLORS[e.kind]} transparent opacity={e.kind === "control" ? 0.35 : 0.6} />
        </mesh>
      ))}
    </group>
  );
}

const PER_EDGE = 3;

function Traffic({ sayNo }: { sayNo: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const edges = useMemo(() => EDGES.map((e) => ({ e, a: nodeById(e.from), b: nodeById(e.to) })), []);
  const positions = useMemo(() => new Float32Array(edges.length * PER_EDGE * 3), [edges.length]);
  const colors = useMemo(() => {
    const arr = new Float32Array(edges.length * PER_EDGE * 3);
    edges.forEach(({ e }, i) => {
      const c = new THREE.Color(EDGE_COLORS[e.kind]);
      for (let k = 0; k < PER_EDGE; k++) c.toArray(arr, (i * PER_EDGE + k) * 3);
    });
    return arr;
  }, [edges]);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    edges.forEach(({ e, a, b }, i) => {
      for (let k = 0; k < PER_EDGE; k++) {
        const idx = (i * PER_EDGE + k) * 3;
        const hidden = e.kind === "bypass" && !sayNo;
        const speed = e.kind === "control" ? 0.12 : 0.3;
        const p = ((t * speed + k / PER_EDGE + i * 0.13) % 1 + 1) % 1;
        positions[idx] = a.x + (b.x - a.x) * p;
        positions[idx + 1] = hidden ? -5 : 0.8;
        positions[idx + 2] = a.z + (b.z - a.z) * p;
      }
    });
    if (ref.current) (ref.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial vertexColors size={1.6} sizeAttenuation transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

function Tracer({ at }: { at: string | null }) {
  const g = useRef<THREE.Group>(null);
  const target = useMemo(() => {
    if (!at) return null;
    const n = nodeById(at);
    return new THREE.Vector3(n.x, n.height + 2.5, n.z);
  }, [at]);
  useFrame(({ clock }) => {
    if (!g.current) return;
    g.current.visible = !!target;
    if (target) {
      g.current.position.lerp(target, 0.04);
      g.current.position.y = target.y + Math.sin(clock.getElapsedTime() * 4) * 0.4;
    }
  });
  return (
    <group ref={g} position={[0, 8, 0]} visible={false}>
      <mesh>
        <sphereGeometry args={[1.3, 24, 24]} />
        <meshBasicMaterial color="#ff3c64" />
      </mesh>
      <mesh scale={1.5}>
        <sphereGeometry args={[1.3, 24, 24]} />
        <meshBasicMaterial color="#ff3c64" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function Rig({ selected, tracerAt }: { selected: string | null; tracerAt: string | null }) {
  const target = useRef(new THREE.Vector3());
  const look = useRef(new THREE.Vector3());
  const focus = useMemo(() => {
    const id = tracerAt ?? selected;
    if (!id) return null;
    const n = nodeById(id);
    return new THREE.Vector3(n.x, 0, n.z);
  }, [selected, tracerAt]);
  useFrame(({ camera, pointer }) => {
    if (focus) {
      target.current.set(focus.x + 10, 30, focus.z + 34);
      look.current.set(focus.x, 2, focus.z);
    } else {
      target.current.set(pointer.x * 8, 62, 70 + pointer.y * 6);
      look.current.set(2, 0, 4);
    }
    camera.position.lerp(target.current, 0.04);
    camera.lookAt(look.current);
  });
  return null;
}

export default function CityMap({ sayNo, selected, tracerAt, onSelect }: Props) {
  return (
    <Canvas dpr={[1, 1.5]} gl={{ alpha: false, antialias: false, powerPreference: "high-performance" }} camera={{ position: [0, 62, 70], fov: 45, near: 0.5, far: 500 }} onPointerMissed={() => onSelect(null)}>
      <fog attach="fog" args={["#07264a", 120, 260]} />
      <SkyDome radius={300} sharpness={5} />
      <Plates />
      <Roads sayNo={sayNo} />
      <Traffic sayNo={sayNo} />
      <Buildings selected={selected} sayNo={sayNo} onSelect={onSelect} />
      <Tracer at={tracerAt} />
      <Labels selected={selected} sayNo={sayNo} />
      <Rig selected={selected} tracerAt={tracerAt} />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.7} luminanceThreshold={0.55} luminanceSmoothing={0.3} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}

export type { CityEdge };
