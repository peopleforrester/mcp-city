// ABOUTME: Search requires every word, ranks title matches first, and returns a snippet around the first hit.
// ABOUTME: Also checks the Markdown flattening that keeps link targets and table rules out of results.

import { describe, expect, it } from "vitest";
import { plain, search, type Entry } from "./search";

const index: Entry[] = [
  { title: "Vetting MCP Servers", url: "/a/", kind: "Research", text: "How a platform team approves a server before it comes online." },
  { title: "The attack", url: "/b/", kind: "Page", text: "An agent runs kubectl and the attacker vets nothing; the token leaves." },
  { title: "Cost", url: "/c/", kind: "Research", text: "Token bills grow with every tool description." },
];

describe("search", () => {
  it("needs every word and ranks titles first", () => {
    const hits = search(index, "vetting server");
    expect(hits.map((h) => h.entry.url)).toEqual(["/a/"]);
    expect(search(index, "token").map((h) => h.entry.url).sort()).toEqual(["/b/", "/c/"]);
  });
  it("returns nothing for an empty or noise query", () => {
    expect(search(index, "")).toEqual([]);
    expect(search(index, "a")).toEqual([]);
  });
  it("snips around the first match", () => {
    expect(search(index, "kubectl")[0].snippet).toContain("kubectl");
  });
  it("flattens Markdown to text", () => {
    expect(plain("---\ntitle: x\n---\n# Head\n\nSee [the spec](https://example.com/x) and `code`.\n\n| a | b |\n|---|---|\n")).toBe("Head See the spec and code . a b");
  });
});
