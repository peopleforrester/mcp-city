/// <reference types="node" />
// ABOUTME: The interactive diagram turns every part of the real SVG into a labeled button and explains the one you pick.
// ABOUTME: Loads the committed architecture.svg through a stubbed fetch, so it tests the same file the site serves.

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NODES } from "../data/city";
import { Diagram } from "./Diagram";

const svg = readFileSync("public/architecture/architecture.svg", "utf8");

describe("interactive diagram", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(svg)));
  });
  afterEach(() => vi.unstubAllGlobals());

  it("makes every part of the architecture a focusable, labeled button", async () => {
    render(<Diagram />);
    await waitFor(() => expect(document.querySelectorAll("[data-node]").length).toBe(NODES.length));
    for (const n of NODES) {
      const el = document.querySelector(`[data-node="${n.id}"]`)!;
      expect(el.getAttribute("role")).toBe("button");
      expect(el.getAttribute("aria-label")).toBe(n.name);
    }
    expect(document.querySelectorAll("[data-edge]").length).toBe(23);
  });

  it("explains a part when it is picked, and lights its connections", async () => {
    render(<Diagram />);
    await waitFor(() => expect(screen.queryByText("Loading the diagram")).toBeNull());
    fireEvent.click(document.querySelector('[data-node="G"]')!);
    expect(screen.getByTestId("diagram-panel")).toHaveTextContent("MCP gateway");
    expect(document.querySelector('[data-edge="P>G"]')!.classList.contains("hl")).toBe(true);
    expect(document.querySelector('[data-edge="A>OUT"]')!.classList.contains("hl")).toBe(false);
  });

  it("says what a no does and lights only the side paths", async () => {
    render(<Diagram />);
    await waitFor(() => expect(screen.queryByText("Loading the diagram")).toBeNull());
    fireEvent.click(screen.getByRole("button", { name: "What a no does" }));
    expect(screen.getByTestId("diagram-panel")).toHaveTextContent("Neither crosses the MCP gateway");
    expect(document.querySelector('[data-edge="A>OUT"]')!.classList.contains("hl")).toBe(true);
    expect(document.querySelector('[data-edge="A>TM"]')!.classList.contains("hl")).toBe(true);
    expect(document.querySelector('[data-edge="P>G"]')!.classList.contains("hl")).toBe(false);
  });

  it("names the attack and walks its five steps", async () => {
    render(<Diagram />);
    await waitFor(() => expect(screen.queryByText("Loading the diagram")).toBeNull());
    const replay = screen.getByRole("button", { name: /Replay the attack: CVE-2026-47250/ });
    fireEvent.click(replay);
    expect(screen.getByTestId("diagram-panel")).toHaveTextContent("step 1 of 5");
    for (let i = 0; i < 4; i++) fireEvent.click(screen.getByRole("button", { name: /Next: step|Done/ }));
    expect(screen.getByTestId("diagram-panel")).toHaveTextContent("a token for a cluster they could not reach");
  });
});
