// ABOUTME: Whether this visitor gets a live canvas: wide screen, motion welcome, and a beat after first paint.
// ABOUTME: The layout answer is known on the first render so nothing shifts; only the canvas waits for the delay.

import { useEffect, useState } from "react";

function wants(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wide = window.matchMedia("(min-width: 48rem)").matches;
  return wide && !reduced;
}

export function useLiveScene(delayMs = 300): { wants: boolean; live: boolean } {
  const [wanted] = useState(wants);
  const [live, setLive] = useState(false);
  useEffect(() => {
    if (!wanted) return;
    const id = window.setTimeout(() => setLive(true), delayMs);
    return () => window.clearTimeout(id);
  }, [wanted, delayMs]);
  return { wants: wanted, live };
}
