/// <reference types="node" />
// ABOUTME: Every picture in the art sets points at a file that exists under public/ and has a caption.
// ABOUTME: A renamed or missing image fails here instead of as a broken tile on the page.

import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { ART } from "./art";

describe("art", () => {
  it("has four sets with pictures", () => {
    expect(ART.map((s) => s.id)).toEqual(["scenes", "attack", "cables", "ships"]);
    for (const s of ART) expect(s.pictures.length).toBeGreaterThan(0);
  });
  it.each(ART.flatMap((s) => s.pictures.map((p) => [p.src, p.caption] as const)))("%s exists and is captioned", (src, caption) => {
    expect(existsSync(`public${src}`)).toBe(true);
    expect(caption.length).toBeGreaterThan(2);
  });
});
