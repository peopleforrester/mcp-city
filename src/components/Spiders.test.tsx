// ABOUTME: Nothing is on screen until the Konami code is typed; then the spiders come out.
// ABOUTME: jsdom key events on window.

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { KONAMI } from "../lib/konami";
import { Spiders } from "./Spiders";

describe("the spiders", () => {
  it("stay hidden until the code, then appear", () => {
    render(<Spiders />);
    expect(screen.queryByTestId("spiders")).toBeNull();
    for (const key of KONAMI) fireEvent.keyDown(window, { key });
    expect(screen.getByTestId("spiders").querySelectorAll("img")).toHaveLength(9);
  });
});
