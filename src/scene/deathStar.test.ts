// ABOUTME: The Death Star sits under the city with its pole at ground level, and its dish faces out of the city's cap.
// ABOUTME: The look is checked by eye in a GPU browser; this guards the geometry the towers and the camera depend on.

import { describe, expect, it } from "vitest";
import { DEATH_STAR_CENTER, DEATH_STAR_RADIUS, DISH_DIRECTION, deathStarMaterial } from "./deathStar";

describe("death star", () => {
  it("has its north pole at y = 0, under the city", () => {
    expect(DEATH_STAR_CENTER.y + DEATH_STAR_RADIUS).toBe(0);
  });
  it("is wide enough to carry the city's 160-unit spread on its cap", () => {
    expect(DEATH_STAR_RADIUS).toBeGreaterThan(Math.hypot(80, 80));
  });
  it("points the dish below the city's cap, where it can be seen", () => {
    const capAngle = Math.asin(Math.hypot(80, 80) / DEATH_STAR_RADIUS);
    expect(Math.acos(DISH_DIRECTION.y)).toBeGreaterThan(capAngle);
  });
  it("outlines the station in the deck's yellow", () => {
    expect(`#${deathStarMaterial().uniforms.uRim.value.getHexString()}`).toBe("#ffc800");
  });
});
