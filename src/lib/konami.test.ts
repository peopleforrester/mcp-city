// ABOUTME: The Konami matcher fires on the full sequence, tolerates case, and restarts cleanly on a wrong key.
// ABOUTME: Pure logic.

import { describe, expect, it } from "vitest";
import { KONAMI, konamiMatcher } from "./konami";

describe("konami", () => {
  it("fires only on the last key of the sequence", () => {
    const feed = konamiMatcher();
    const results = KONAMI.map(feed);
    expect(results.slice(0, -1).every((r) => r === false)).toBe(true);
    expect(results.at(-1)).toBe(true);
  });
  it("accepts upper-case B and A", () => {
    const feed = konamiMatcher();
    const keys = [...KONAMI.slice(0, 8), "B", "A"];
    expect(keys.map(feed).at(-1)).toBe(true);
  });
  it("restarts after a wrong key", () => {
    const feed = konamiMatcher();
    ["ArrowUp", "ArrowUp", "x"].forEach(feed);
    expect(KONAMI.map(feed).at(-1)).toBe(true);
  });
});
