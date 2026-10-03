// ABOUTME: The ladder climbs, every ship is sourced, and the descent lights the right ship at each altitude.
// ABOUTME: Pure data and arithmetic.

import { describe, expect, it } from "vitest";
import { SHIPS, activeShip, populationInView } from "./ships";

describe("the ship ladder", () => {
  it("climbs from the Enterprise to the Death Star", () => {
    for (let i = 1; i < SHIPS.length; i++) expect(SHIPS[i].crew).toBeGreaterThan(SHIPS[i - 1].crew);
    expect(SHIPS[0].crew).toBe(428);
    expect(SHIPS.at(-1)?.crew).toBe(1200000);
  });
  it.each(SHIPS)("$name has an image and a source", (s) => {
    expect(s.image).toMatch(/^\/art\/ships\//);
    expect(s.source).not.toBe("");
  });
  it("lights the Death Star in orbit and nothing at the desk", () => {
    expect(populationInView(0)).toBe(1200000);
    expect(activeShip(0)?.name).toBe("Death Star");
    expect(populationInView(1)).toBe(1);
    expect(activeShip(1)).toBeNull();
  });
  it("passes through every ship on the way down", () => {
    const seen = new Set<string>();
    for (let p = 0; p <= 1; p += 0.01) {
      const s = activeShip(p);
      if (s) seen.add(s.name);
    }
    expect(seen.size).toBe(SHIPS.length);
  });
});
