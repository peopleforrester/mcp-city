/// <reference types="node" />
// ABOUTME: The VTT reader gets times and text right, and the film's tracks fit inside the film.
// ABOUTME: The film is 386.17 seconds (v0.5); a cue past the end means the tracks belong to a different cut.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { clock, parseVtt } from "./vtt";

describe("vtt", () => {
  it("reads start, end and text", () => {
    const cues = parseVtt("WEBVTT\n\n1\n00:00:32.833 --> 00:00:58.233\nWhat you would expect\n");
    expect(cues).toEqual([{ start: 32.833, end: 58.233, text: "What you would expect" }]);
    expect(clock(cues[0].start)).toBe("0:32");
  });
  it("keeps the film's chapters and captions inside the cut", () => {
    for (const f of ["chapters.vtt", "captions.en.vtt"]) {
      const cues = parseVtt(readFileSync(`public/film/${f}`, "utf8"));
      expect(cues.length).toBeGreaterThan(5);
      expect(cues.at(-1)!.end).toBeLessThanOrEqual(386.2);
      expect([...cues.map((c) => c.start)].sort((a, b) => a - b)).toEqual(cues.map((c) => c.start));
    }
  });
  it("keeps the architecture walkthrough's captions inside its 209.5 seconds", () => {
    const cues = parseVtt(readFileSync("public/architecture/walkthrough.en.vtt", "utf8"));
    expect(cues).toHaveLength(48);
    expect(cues.at(-1)!.end).toBeLessThanOrEqual(209.5);
  });
});
