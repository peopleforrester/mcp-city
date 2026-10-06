// ABOUTME: The city's signature material: cut-paper silhouettes backlit by the horizon, a cyan rim on the edges, and sparse lit windows that flicker.
// ABOUTME: One ShaderMaterial for the instanced buildings; window cells are sized in world units so tall and short towers share a grid.

import * as THREE from "three";

const vertex = /* glsl */ `
  uniform float uTime;
  varying vec3 vLocal;
  varying vec3 vScale;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vSeed;
  varying float vDepth;

  void main() {
    vLocal = position;
    // Each instance is a unit box scaled by its matrix; the column lengths recover the scale for a world-sized window grid.
    vScale = vec3(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz), length(instanceMatrix[2].xyz));
    vNormal = normalize(mat3(modelMatrix) * normal);
    vec4 world = modelMatrix * instanceMatrix * vec4(position, 1.0);
    vView = normalize(cameraPosition - world.xyz);
    vSeed = fract(sin(dot(instanceMatrix[3].xz, vec2(12.9898, 78.233))) * 43758.5453);
    vec4 mv = viewMatrix * world;
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uBody;
  uniform vec3 uRim;
  uniform vec3 uWindow;
  uniform vec3 uWarm;
  uniform vec3 uFog;
  uniform float uFogNear;
  uniform float uFogFar;
  uniform float uDensity;
  varying vec3 vLocal;
  varying vec3 vScale;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vSeed;
  varying float vDepth;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  void main() {
    vec3 color = uBody;

    // The rim: the roofline and the vertical edges catch the backlight, the way paper edges glow on a lit screen.
    vec3 p = vLocal + 0.5;
    float roof = smoothstep(0.985, 1.0, p.y) * step(abs(vNormal.y), 0.5);
    vec2 side = abs(vNormal.x) > 0.5 ? vec2(p.z * vScale.z, p.y * vScale.y) : vec2(p.x * vScale.x, p.y * vScale.y);
    float width = abs(vNormal.x) > 0.5 ? vScale.z : vScale.x;
    float edge = 1.0 - smoothstep(0.0, 0.04, min(side.x, width - side.x));
    float grazing = pow(1.0 - abs(dot(normalize(vNormal), vView)), 3.0);
    color += uRim * (roof * 0.9 + edge * 0.08 + grazing * 0.025);

    // Windows on the walls only: a grid in world units, a few cells lit, each on its own slow flicker.
    if (abs(vNormal.y) < 0.5 && side.y > 0.6) {
      vec2 cell = floor(side * vec2(1.4, 1.1));
      vec2 inCell = fract(side * vec2(1.4, 1.1));
      float pane = step(0.25, inCell.x) * step(inCell.x, 0.75) * step(0.3, inCell.y) * step(inCell.y, 0.8);
      float r = hash(cell + vSeed * 91.0 + (abs(vNormal.x) > 0.5 ? 17.0 : 0.0));
      float lit = step(1.0 - uDensity, r);
      float flicker = 0.75 + 0.25 * sin(uTime * (0.4 + r * 1.6) + r * 40.0);
      vec3 tint = r > 1.0 - uDensity * 0.15 ? uWarm : uWindow;
      color += tint * pane * lit * flicker * 0.4;
    }

    float fog = smoothstep(uFogNear, uFogFar, vDepth);
    gl_FragColor = vec4(mix(color, uFog, fog), 1.0);
  }
`;

export function silhouetteMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms: {
      uTime: { value: 0 },
      uBody: { value: new THREE.Color("#03060f") },
      uRim: { value: new THREE.Color("#04c0da") },
      uWindow: { value: new THREE.Color("#7fe9f7") },
      uWarm: { value: new THREE.Color("#ffc800") },
      uFog: { value: new THREE.Color("#07264a") },
      uFogNear: { value: 80 },
      uFogFar: { value: 420 },
      uDensity: { value: 0.035 },
    },
  });
}
