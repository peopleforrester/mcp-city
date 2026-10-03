// ABOUTME: Whether an element is near the viewport, so a canvas only renders while someone can see it.
// ABOUTME: Returns a callback ref, so an element that mounts later is still observed; without IntersectionObserver (jsdom) everything counts as in view.

import { useCallback, useEffect, useState } from "react";

export function useInView(rootMargin = "25% 0px"): [(el: HTMLElement | null) => void, boolean] {
  const [el, setEl] = useState<HTMLElement | null>(null);
  const [inView, setInView] = useState(() => typeof IntersectionObserver === "undefined");
  const ref = useCallback((node: HTMLElement | null) => setEl(node), []);
  useEffect(() => {
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    obs.observe(el);
    return () => obs.disconnect();
  }, [el, rootMargin]);
  return [ref, inView];
}
