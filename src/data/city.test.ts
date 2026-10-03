// ABOUTME: The city data is consistent: every road joins two real buildings, every building has a district and a description.
// ABOUTME: The attack replay only visits buildings that exist.

import { describe, expect, it } from "vitest";
import { ATTACK, ATTACK_SOURCES, DISTRICTS, EDGES, NODES, nodeById } from "./city";

describe("the city", () => {
  it("has unique building ids", () => {
    expect(new Set(NODES.map((n) => n.id)).size).toBe(NODES.length);
  });
  it.each(EDGES)("road $from to $to joins two buildings", (e) => {
    expect(() => nodeById(e.from)).not.toThrow();
    expect(() => nodeById(e.to)).not.toThrow();
    expect(e.label).not.toBe("");
  });
  it.each(NODES)("$id sits in a district and says what it is", (n) => {
    const known = [...DISTRICTS.map((d) => d.id), "audit", "bypass"];
    expect(known).toContain(n.district);
    expect(n.what.length).toBeGreaterThan(20);
  });
  it("carries the two bypass roads from the agent", () => {
    expect(EDGES.filter((e) => e.kind === "bypass").map((e) => e.to).sort()).toEqual(["OUT", "TM"]);
  });
  it("replays the attack across real buildings with sources", () => {
    for (const s of ATTACK) expect(() => nodeById(s.at)).not.toThrow();
    expect(ATTACK).toHaveLength(5);
    for (const s of ATTACK_SOURCES) expect(s.url).toMatch(/^https:\/\//);
  });
});
