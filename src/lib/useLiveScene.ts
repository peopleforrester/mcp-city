// ABOUTME: Whether this visitor gets a live canvas: wide screen, motion welcome, a real GPU, and a beat after first paint.
// ABOUTME: The layout answer is known on the first render so nothing shifts; only the canvas waits for the delay.

import { useEffect, useState } from "react";

/** A browser rendering WebGL in software (SwiftShader, llvmpipe) would burn the CPU on the city; give it the poster instead. */
export function hasHardwareGl(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ?? canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return false;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    return !/swiftshader|llvmpipe|software|mesa offscreen/i.test(renderer);
  } catch {
    return false;
  }
}

function wants(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  if (new URLSearchParams(window.location.search).get("gpu") === "1") return true;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wide = window.matchMedia("(min-width: 48rem)").matches;
  return wide && !reduced && hasHardwareGl();
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
