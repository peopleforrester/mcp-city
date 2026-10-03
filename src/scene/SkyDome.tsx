// ABOUTME: The backlit screen behind every scene: cyan at the horizon fading to navy overhead, dark below.
// ABOUTME: A shader on the inside of a sphere, so the canvas needs no transparency and bloom composites cleanly.

import { useMemo } from "react";
import * as THREE from "three";

export function SkyDome({ radius = 500, sharpness = 1.6 }: { radius?: number; sharpness?: number }) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: {
          top: { value: new THREE.Color("#051932") },
          horizon: { value: new THREE.Color("#04c0da") },
          below: { value: new THREE.Color("#03101f") },
          radius: { value: radius },
          sharpness: { value: sharpness },
        },
        vertexShader: `varying vec3 vPos; void main(){ vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `uniform vec3 top; uniform vec3 horizon; uniform vec3 below; uniform float radius; uniform float sharpness; varying vec3 vPos;
          void main(){ float h = vPos.y / radius; vec3 c = h < 0.0 ? mix(horizon, below, clamp(-h * 2.5, 0.0, 1.0)) : mix(horizon, top, pow(clamp(h * sharpness, 0.0, 1.0), 0.6)); gl_FragColor = vec4(c, 1.0); }`,
      }),
    [radius, sharpness],
  );
  return (
    <mesh material={material} frustumCulled={false}>
      <sphereGeometry args={[radius, 64, 32]} />
    </mesh>
  );
}
