// ABOUTME: How far an element has scrolled through the viewport, 0 at its top edge to 1 at its bottom edge.
// ABOUTME: Returns both a React state (for the HUD) and a ref (for the canvas, which must not re-render per frame).

import { useEffect, useRef, useState, type RefObject } from "react";

export function useScrollProgress(target: RefObject<HTMLElement | null>): { progress: number; progressRef: RefObject<number> } {
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const el = target.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = travel <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / travel));
      if (Math.abs(p - progressRef.current) > 0.001) {
        progressRef.current = p;
        setProgress(p);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target]);
  return { progress, progressRef };
}
