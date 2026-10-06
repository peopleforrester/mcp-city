// ABOUTME: The spec timeline is in date order, every claim carries an https source, and the text keeps the site's prose rules.
// ABOUTME: Guards src/data/spec.ts, which the spec evolution page renders line for line.

import { describe, expect, it } from "vitest";
import { DEPRECATION_POLICY, SDK_TIERS, SPEC_REVISIONS } from "./spec";

const all = [...SPEC_REVISIONS.flatMap((r) => [...r.changes, ...r.removed]), ...DEPRECATION_POLICY, ...SDK_TIERS];

describe("spec timeline", () => {
  it("runs from launch to the current revision in order", () => {
    expect(SPEC_REVISIONS[0].id).toBe("2024-11-05");
    expect(SPEC_REVISIONS.at(-1)!.id).toBe("2026-07-28");
    const dates = SPEC_REVISIONS.map((r) => r.date);
    expect([...dates].sort()).toEqual(dates);
  });
  it("cites a primary https source for every claim", () => {
    for (const c of all) expect(c.source).toMatch(/^https:\/\/(modelcontextprotocol\.io|github\.com\/modelcontextprotocol|blog\.modelcontextprotocol\.io|www\.anthropic\.com\/news\/model-context-protocol)/);
  });
  it("has no em-dashes or en-dashes", () => {
    for (const c of all) expect(c.text).not.toMatch(/[–—]/);
    for (const r of SPEC_REVISIONS) expect(r.headline).not.toMatch(/[–—]/);
  });
});
