// ABOUTME: The flat map works without a canvas: buildings open a panel, say-no reveals the alleys, the replay walks five steps.
// ABOUTME: jsdom, so the live scene never loads.

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Map } from "./Map";

describe("the living map, flat", () => {
  it("opens a building's panel on click", () => {
    render(<Map />);
    fireEvent.click(screen.getByRole("button", { name: "MCP gateway" }));
    expect(screen.getByTestId("map-panel")).toHaveTextContent("Should this caller be allowed?");
  });
  it("hides the bypass alleys until you say no", () => {
    render(<Map />);
    expect(screen.queryByRole("button", { name: "Outlook" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Say no" }));
    expect(screen.getByRole("button", { name: "Outlook" })).toBeInTheDocument();
    expect(screen.getByTestId("map-panel")).toHaveTextContent("goes dark");
  });
  it("replays the attack in five steps and ends on the replay", () => {
    render(<Map />);
    fireEvent.click(screen.getByRole("button", { name: "Replay the attack" }));
    expect(screen.getByTestId("map-panel")).toHaveTextContent("step 1 of 5");
    for (let i = 0; i < 4; i++) fireEvent.click(screen.getByRole("button", { name: /^Next/ }));
    expect(screen.getByTestId("map-panel")).toHaveTextContent("Every call was authorized");
    expect(screen.getByTestId("map-panel")).toHaveTextContent("CVE-2026-47250");
  });
});
