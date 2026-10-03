// ABOUTME: Whether this visitor gets a live canvas: wide screen, motion welcome, and a beat after first paint.
// ABOUTME: Shared by every scene so the rule lives in one place.

import { useEffect, useState } from "react";

export function useLiveScene(delayMs = 300): boolean {
  const [live, setLive] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 48rem)").matches;
    if (reduced || !wide) return;
    const id = window.setTimeout(() => setLive(true), delayMs);
    return () => window.clearTimeout(id);
  }, [delayMs]);
  return live;
}
