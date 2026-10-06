// ABOUTME: The walk's share code round-trips, rejects junk, and the exported checklist carries every source.
// ABOUTME: Pure logic, no DOM.

import { describe, expect, it } from "vitest";
import { GATES } from "../data/gates";
import { checklistMarkdown, currentGate, decodeWalk, emptyWalk, encodeWalk, shareUrl, summary } from "./walk";

describe("share code", () => {
  it("round-trips", () => {
    const w = ["pass", "pass", "fail", "open", "open", "open"] as const;
    expect(decodeWalk(encodeWalk([...w]))).toEqual([...w]);
  });
  it("falls back to an empty walk on junk or the wrong length", () => {
    expect(decodeWalk("PPX")).toEqual(emptyWalk());
    expect(decodeWalk("PPFPPZ")).toEqual(emptyWalk());
    expect(decodeWalk(null)).toEqual(emptyWalk());
  });
  it("builds a share URL on the site origin", () => {
    expect(shareUrl(["pass", "fail", "open", "open", "open", "open"])).toBe("https://mcp.michaelrishiforrester.com/gates/?g=PFUUUU");
  });
});

describe("walk state", () => {
  it("points at the first open gate", () => {
    expect(currentGate(emptyWalk())?.n).toBe(1);
    expect(currentGate(["pass", "fail", "open", "open", "open", "open"])?.n).toBe(3);
    expect(currentGate(["pass", "pass", "pass", "pass", "pass", "pass"])).toBeNull();
  });
  it("admits only a clean sweep", () => {
    expect(summary(["pass", "pass", "pass", "pass", "pass", "pass"]).admitted).toBe(true);
    expect(summary(["pass", "pass", "pass", "pass", "pass", "fail"])).toEqual({ passed: 5, failed: 1, admitted: false });
  });
});

describe("exported checklist", () => {
  it("names every gate and every source URL", () => {
    const md = checklistMarkdown(emptyWalk(), new Date("2026-10-06T14:00:00Z"));
    for (const g of GATES) {
      expect(md).toContain(`## Gate ${g.n}: ${g.title}`);
      for (const s of g.sources) expect(md).toContain(s.url);
    }
    expect(md).toContain("Walked 2026-10-06");
  });
  it("ticks the verify boxes on a passed gate only", () => {
    const md = checklistMarkdown(["pass", "fail", "open", "open", "open", "open"]);
    expect(md).toContain(`- [x] ${GATES[0].verify[0]}`);
    expect(md).toContain(`- [ ] ${GATES[1].verify[0]}`);
  });
});
