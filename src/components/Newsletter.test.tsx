// ABOUTME: The signup form matches the MRF-website#101 contract field for field, and the thanks state follows ?subscribed=1.
// ABOUTME: The consent text is stored with each row, so a test pins it verbatim.

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CONSENT, Newsletter, subscribed } from "./Newsletter";

describe("newsletter", () => {
  it("posts the contract's fields to the main site", () => {
    const { container } = render(<Newsletter />);
    const form = container.querySelector("form")!;
    expect(form.getAttribute("action")).toBe("https://michaelrishiforrester.com/api/newsletter/subscribe");
    expect(form.getAttribute("method")).toBe("post");
    const v = (n: string) => (form.querySelector(`[name=${n}]`) as HTMLInputElement | null)?.value;
    expect(v("source")).toBe("mcp-dev-summit-toronto-2026");
    expect(v("next")).toBe("https://mcp.michaelrishiforrester.com/");
    expect(v("website")).toBe("");
    expect(v("consent")).toBe("yes");
    expect(screen.getByRole("textbox", { name: "Email" })).toBeRequired();
  });
  it("shows the consent text verbatim", () => {
    render(<Newsletter />);
    expect(CONSENT).toBe("Yes, email me about these talks and future writing. One list, no sharing, and every email carries an unsubscribe link.");
    expect(screen.getByText(CONSENT)).toBeInTheDocument();
  });
  it("knows the thanks state", () => {
    expect(subscribed("?subscribed=1")).toBe(true);
    expect(subscribed("?g=PPFUUU")).toBe(false);
  });
});
