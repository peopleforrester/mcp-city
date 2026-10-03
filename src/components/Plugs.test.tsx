// ABOUTME: The plug wall lists seven connectors in order and the wrap button closes USB-C around USB-A.
// ABOUTME: jsdom; motion animations resolve immediately under reduced motion.

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Plugs } from "./Plugs";

describe("the plug wall", () => {
  it("lists the seven connectors by year", () => {
    render(<Plugs />);
    const items = screen.getByRole("list", { name: "Connectors by year" }).querySelectorAll("li");
    expect(items).toHaveLength(7);
    expect(items[0]).toHaveTextContent("Parallel");
    expect(items[6]).toHaveTextContent("USB-C");
    expect(screen.getByText("18 years")).toBeInTheDocument();
  });
  it("wraps on the button", () => {
    render(<Plugs />);
    fireEvent.click(screen.getByRole("button", { name: "USB, wrapped in USB" }));
    expect(screen.getByTestId("wrap-stage")).toHaveAttribute("data-wrapped", "yes");
    expect(screen.getByRole("button", { name: "Unwrap it" })).toBeInTheDocument();
  });
});
