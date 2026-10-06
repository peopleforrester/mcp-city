// ABOUTME: Reads the cues out of a WebVTT file: start time in seconds and the cue text.
// ABOUTME: Used for the film's chapter list, which browsers do not render from a chapters track on their own.

export interface Cue { start: number; end: number; text: string }

const seconds = (t: string): number => {
  const parts = t.split(":").map(Number);
  return parts.reduce((acc, n) => acc * 60 + n, 0);
};

export function parseVtt(vtt: string): Cue[] {
  return vtt
    .replace(/\r/g, "")
    .split(/\n\n+/)
    .map((block) => block.split("\n"))
    .flatMap((lines) => {
      const i = lines.findIndex((l) => l.includes("-->"));
      if (i < 0) return [];
      const [a, b] = lines[i].split("-->").map((s) => s.trim().split(" ")[0]);
      return [{ start: seconds(a), end: seconds(b), text: lines.slice(i + 1).join(" ").trim() }];
    });
}

export function clock(s: number): string {
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}
