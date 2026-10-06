// ABOUTME: The Death Star the city is built on: a dark sphere with the superlaser dish, the equatorial trench, panel seams and the deck's yellow rim.
// ABOUTME: Line work over a near-black body, so it reads as the Death Star in the same shadow-play style as the towers on top of it.

import * as THREE from "three";

/** Radius of the Death Star in scene units; the city's 160-unit spread sits on its north cap. */
export const DEATH_STAR_RADIUS = 140;
/** The sphere's centre, placed so its north pole is at y = 0 under the city. */
export const DEATH_STAR_CENTER = new THREE.Vector3(0, -DEATH_STAR_RADIUS, 0);
/** Where the superlaser dish faces: upper left as seen from orbit, the station's classic three-quarter view, just below the city's cap. */
export const DISH_DIRECTION = new THREE.Vector3(-0.42, 0.56, 0.71).normalize();

const vertex = /* glsl */ `
  varying vec3 vDir;
  varying vec3 vNormalW;
  varying vec3 vView;
  varying float vDepth;
  void main() {
    vDir = normalize(position);
    vec4 world = modelMatrix * vec4(position, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vView = normalize(cameraPosition - world.xyz);
    vec4 mv = viewMatrix * world;
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uBody;
  uniform vec3 uLine;
  uniform vec3 uRim;
  uniform vec3 uDish;
  uniform vec3 uDishDir;
  uniform vec3 uFog;
  uniform float uFogNear;
  uniform float uFogFar;
  varying vec3 vDir;
  varying vec3 vNormalW;
  varying vec3 vView;
  varying float vDepth;

  float line(float v, float width) { float d = abs(fract(v) - 0.5); return 1.0 - smoothstep(0.5 - width, 0.5, d); }

  void main() {
    vec3 color = uBody;
    float lat = asin(clamp(vDir.y, -1.0, 1.0));
    float lon = atan(vDir.z, vDir.x);

    // Panel seams: a latitude and longitude grid, faint, the way the station's plating reads from orbit.
    float seams = max(line(lat * 18.0 / 3.14159, 0.03), line(lon * 24.0 / 3.14159, 0.03));
    color += uLine * seams * 0.22;

    // The equatorial trench: a dark band with lit edges.
    float band = abs(lat);
    float trench = 1.0 - smoothstep(0.018, 0.03, band);
    color = mix(color, uBody * 0.3, trench);
    color += uLine * (smoothstep(0.03, 0.026, band) - smoothstep(0.026, 0.018, band)) * 0.9;

    // The superlaser dish: a shallow disc with two bright rings and a focus point.
    float a = acos(clamp(dot(vDir, uDishDir), -1.0, 1.0));
    float dishR = 0.30;
    float inDish = 1.0 - smoothstep(dishR - 0.006, dishR, a);
    color = mix(color, uBody * 0.55, inDish);
    color += uDish * (1.0 - smoothstep(0.0, 0.012, abs(a - dishR))) * 1.1;
    color += uDish * (1.0 - smoothstep(0.0, 0.008, abs(a - dishR * 0.55))) * 0.5;
    color += uDish * (1.0 - smoothstep(0.0, 0.03, a)) * 1.4;

    // The outline that makes it the Death Star at a glance: the deck's yellow, brightest at the silhouette.
    float rim = pow(1.0 - max(dot(normalize(vNormalW), vView), 0.0), 6.0);
    color += uRim * rim * 0.8;

    float fog = smoothstep(uFogNear, uFogFar, vDepth);
    gl_FragColor = vec4(mix(color, uFog, fog * 0.3), 1.0);
  }
`;

export function deathStarMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms: {
      uBody: { value: new THREE.Color("#0c182b") },
      uLine: { value: new THREE.Color("#04c0da") },
      uRim: { value: new THREE.Color("#ffc800") },
      uDish: { value: new THREE.Color("#7fe9f7") },
      uFog: { value: new THREE.Color("#07264a") },
      uFogNear: { value: 220 },
      uFogFar: { value: 900 },
      uDishDir: { value: DISH_DIRECTION.clone() },
    },
  });
}
