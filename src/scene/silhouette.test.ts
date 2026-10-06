// ABOUTME: The silhouette material carries the palette and fog the scenes rely on, and keeps windows sparse behind the hero text.
// ABOUTME: The shader itself is checked by eye in a GPU browser; this guards the knobs that keep it readable.

import { describe, expect, it } from "vitest";
import { silhouetteMaterial } from "./silhouette";

describe("silhouette material", () => {
  it("uses the deck's palette and the skyline's fog", () => {
    const m = silhouetteMaterial();
    expect(`#${m.uniforms.uBody.value.getHexString()}`).toBe("#03060f");
    expect(`#${m.uniforms.uRim.value.getHexString()}`).toBe("#04c0da");
    expect(m.uniforms.uFogNear.value).toBe(80);
    expect(m.uniforms.uFogFar.value).toBe(420);
  });
  it("keeps the windows sparse so the hero text stays readable", () => {
    expect(silhouetteMaterial().uniforms.uDensity.value).toBeLessThanOrEqual(0.05);
  });
  it("reads the instance matrix, so it only works on instanced meshes", () => {
    expect(silhouetteMaterial().vertexShader).toContain("instanceMatrix");
  });
});
