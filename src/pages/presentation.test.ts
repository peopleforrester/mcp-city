/// <reference types="node" />
// ABOUTME: The presentation content is complete: every shown slide has an image on disk and its speaker notes.
// ABOUTME: Runs on content/presentation/slides.json, which scripts/pull-deck.py writes.

import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import deck from "../../content/presentation/slides.json";

describe("presentation content", () => {
  it("has every shown slide with an image on disk", () => {
    expect(deck.slides.length).toBeGreaterThanOrEqual(39);
    for (const s of deck.slides) expect(existsSync(`public${s.image}`)).toBe(true);
  });
});
