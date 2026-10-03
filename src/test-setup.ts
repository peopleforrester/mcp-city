// ABOUTME: Vitest setup: DOM matchers, and a matchMedia stub so the hero never tries to load the canvas in jsdom.
// ABOUTME: Keeps three.js out of the unit tests entirely.

import "@testing-library/jest-dom/vitest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: query.includes("reduce"),
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Vitest does not expose globals, so testing-library's auto-cleanup never registers; do it by hand.
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
afterEach(cleanup);
