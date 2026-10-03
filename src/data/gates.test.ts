// ABOUTME: The gate data is the contract with the slides: six gates, every claim sourced, every URL real.
// ABOUTME: A gate with no source cannot ship, because the talk promised one for every figure.

import { describe, expect, it } from "vitest";
import { GATES } from "./gates";

describe("the six gates", () => {
  it("has exactly six, numbered in order", () => {
    expect(GATES.map((g) => g.n)).toEqual([1, 2, 3, 4, 5, 6]);
  });
  it.each(GATES)("gate $n asks, verifies, names who answers, and cites a source", (g) => {
    expect(g.ask.length).toBeGreaterThan(0);
    expect(g.verify.length).toBeGreaterThan(0);
    expect(g.who).not.toBe("");
    expect(g.alley).not.toBe("");
    expect(g.sources.length).toBeGreaterThan(0);
    for (const s of g.sources) expect(s.url).toMatch(/^https:\/\//);
  });
  it("carries the measured base rate on the authorization gate", () => {
    expect(GATES[4].verify.join(" ")).toContain("40.55 percent");
  });
});

import { contrast } from "../lib/contrast";
import { GATE_TEXT, TILE } from "./gates";

describe("gate text colors", () => {
  it.each(GATE_TEXT.map((c, i) => [i + 1, c]))("gate %i text %s clears 4.5:1 on the tile", (_n, c) => {
    expect(contrast(String(c), TILE)).toBeGreaterThanOrEqual(4.5);
  });
});
