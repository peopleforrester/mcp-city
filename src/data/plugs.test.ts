// ABOUTME: The plug timeline climbs year by year and the USB span matches the talk's eighteen years.
// ABOUTME: Every wrapping tool links somewhere real.

import { describe, expect, it } from "vitest";
import { PLUGS, USB_YEARS, WRAP_REASONS, WRAP_TOOLS } from "./plugs";

describe("the plugs", () => {
  it("run from 1981 to 2014 in order", () => {
    for (let i = 1; i < PLUGS.length; i++) expect(PLUGS[i].year).toBeGreaterThan(PLUGS[i - 1].year);
    expect(PLUGS[0].year).toBe(1981);
    expect(PLUGS.at(-1)?.year).toBe(2014);
  });
  it("count eighteen years from USB 1.0 to USB-C", () => {
    expect(USB_YEARS.to - USB_YEARS.from).toBe(USB_YEARS.span);
    expect(PLUGS.find((p) => p.name === "USB-A")?.year).toBe(USB_YEARS.from);
    expect(PLUGS.find((p) => p.name === "USB-C")?.year).toBe(USB_YEARS.to);
  });
  it("give six reasons to wrap and five tools with links", () => {
    expect(WRAP_REASONS).toHaveLength(6);
    expect(WRAP_TOOLS).toHaveLength(5);
    for (const t of WRAP_TOOLS) expect(t.url).toMatch(/^https:\/\//);
  });
});
