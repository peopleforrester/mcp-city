/// <reference types="node" />
// ABOUTME: The Atom feed is well-formed, newest first, and links each entry to its page and its commit.
// ABOUTME: Built from the same manifest as the change log, so the two never disagree.

import { describe, expect, it } from "vitest";
import manifest from "../../content/collateral/manifest.json";
import { atomFeed } from "../../feed";

describe("atom feed", () => {
  const xml = atomFeed(manifest.documents, manifest.repo);
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  it("parses as XML with a feed root", () => {
    expect(doc.getElementsByTagName("parsererror")).toHaveLength(0);
    expect(doc.documentElement.nodeName).toBe("feed");
  });
  it("lists entries newest first with page and commit links", () => {
    const entries = [...doc.getElementsByTagName("entry")];
    expect(entries.length).toBeGreaterThan(5);
    const dates = entries.map((e) => e.getElementsByTagName("updated")[0].textContent ?? "");
    expect([...dates].sort().reverse()).toEqual(dates);
    const first = entries[0];
    expect(first.getElementsByTagName("link")[0].getAttribute("href")).toMatch(/^https:\/\/mcp\.michaelrishiforrester\.com\/resources\//);
    expect(first.getElementsByTagName("link")[1].getAttribute("href")).toMatch(/github\.com\/peopleforrester\/mcp-for-a-city\/commit\//);
  });
  it("escapes titles", () => {
    expect(atomFeed([{ slug: "x", title: "A & B", history: [{ date: "2026-10-06", sha: "abc", subject: "<fix>" }] }], "r")).toContain("A &amp; B: &lt;fix&gt;");
  });
});
