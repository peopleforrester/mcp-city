// ABOUTME: Walking the gates in the DOM: a fail shows the alley, six passes admit the server, the URL carries the code.
// ABOUTME: Runs in jsdom with no canvas.

import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { Gates } from "./Gates";

beforeEach(() => window.history.replaceState(null, "", "/"));

describe("the gate walk", () => {
  it("starts at gate one and lifts the barrier on pass", () => {
    render(<Gates />);
    expect(screen.getByText("Gate 1 of 6")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /^Pass/ }));
    expect(screen.getByText("Gate 2 of 6")).toBeInTheDocument();
    expect(window.location.search).toBe("?g=PUUUUU");
  });
  it("shows the side alley when a gate fails", () => {
    render(<Gates />);
    fireEvent.click(screen.getByRole("button", { name: /^Pass/ }));
    fireEvent.click(screen.getByRole("button", { name: /^Pass/ }));
    fireEvent.click(screen.getByRole("button", { name: /^Fail/ }));
    expect(screen.getByTestId("alley")).toHaveTextContent("gate 3");
    expect(screen.getByTestId("alley")).toHaveTextContent("they build their own");
  });
  it("admits a server that passes all six", () => {
    render(<Gates />);
    for (let i = 0; i < 6; i++) fireEvent.click(screen.getByRole("button", { name: /^Pass/ }));
    expect(screen.getByTestId("result")).toHaveTextContent("Admitted");
  });
  it("resumes a walk from the share code in the URL", () => {
    window.history.replaceState(null, "", "/?g=PPPPUU");
    render(<Gates />);
    expect(screen.getByText("Gate 5 of 6")).toBeInTheDocument();
  });
});
