// ABOUTME: The state of a walk through the six gates, its share code, and the exported checklist.
// ABOUTME: Pure functions so the tests need no DOM.

import { GATES, type Gate } from "../data/gates";

export type Verdict = "pass" | "fail" | "open";
export type Walk = Verdict[];

const CODE: Record<Verdict, string> = { pass: "P", fail: "F", open: "U" };
const DECODE: Record<string, Verdict> = { P: "pass", F: "fail", U: "open" };

export const emptyWalk = (): Walk => GATES.map(() => "open");

export function encodeWalk(walk: Walk): string {
  return walk.map((v) => CODE[v]).join("");
}

export function decodeWalk(code: string | null): Walk {
  if (!code || code.length !== GATES.length) return emptyWalk();
  const walk = [...code.toUpperCase()].map((c) => DECODE[c]);
  return walk.every(Boolean) ? walk : emptyWalk();
}

export function shareUrl(walk: Walk, base = "https://mcp.michaelrishiforrester.com/"): string {
  return `${base}?g=${encodeWalk(walk)}#gates`;
}

/** The first gate still open, or null when the walk is finished. */
export function currentGate(walk: Walk): Gate | null {
  const i = walk.findIndex((v) => v === "open");
  return i === -1 ? null : GATES[i];
}

export function summary(walk: Walk): { passed: number; failed: number; admitted: boolean } {
  const passed = walk.filter((v) => v === "pass").length;
  const failed = walk.filter((v) => v === "fail").length;
  return { passed, failed, admitted: passed === GATES.length };
}

export function checklistMarkdown(walk: Walk, date = new Date()): string {
  const day = date.toISOString().slice(0, 10);
  const lines: string[] = [
    "# MCP server approval: the six gates",
    "",
    `From "Governing MCP for a Workforce the Size of a City", MCP Dev Summit Toronto 2026. Walked ${day} at mcp.michaelrishiforrester.com.`,
    "",
  ];
  GATES.forEach((g, i) => {
    const v = walk[i];
    const mark = v === "pass" ? "PASS" : v === "fail" ? "FAIL" : "open";
    lines.push(`## Gate ${g.n}: ${g.title} (${mark})`, "", `Who answers: ${g.who}`, "", "Ask:", "");
    g.ask.forEach((a) => lines.push(`- ${a}`));
    lines.push("", "Verify:", "");
    g.verify.forEach((c) => lines.push(`- [${v === "pass" ? "x" : " "}] ${c}`));
    lines.push("", g.note, "", "Sources:", "");
    g.sources.forEach((s) => lines.push(`- ${s.label}: ${s.url}`));
    lines.push("");
  });
  const { passed, failed, admitted } = summary(walk);
  lines.push("## Result", "", admitted
    ? "Admitted: every gate passed."
    : `${passed} passed, ${failed} failed, ${GATES.length - passed - failed} open. ${failed ? "Where a gate fails, ask what the user will build instead." : ""}`.trim(), "");
  return lines.join("\n");
}
