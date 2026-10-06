// ABOUTME: The video page waits honestly until a recording id is set, then embeds it from the privacy-enhanced YouTube domain.
// ABOUTME: Both states render from src/data/links.ts, so the test flips that one value.

import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { TALK } from "../data/links";
import { VideoPage } from "./Video";

describe("video page", () => {
  const official = TALK.recordingYouTubeId;
  beforeEach(() => {
    TALK.recordingYouTubeId = null;
  });
  afterEach(() => {
    TALK.recordingYouTubeId = official;
    TALK.phoneRecording = null;
  });
  it("says where to go until the recording exists", () => {
    render(<VideoPage />);
    expect(screen.getByText(/once the Linux Foundation posts it/)).toBeInTheDocument();
    expect(document.querySelector("iframe")).toBeNull();
  });
  it("embeds the recording once its id is set", () => {
    TALK.recordingYouTubeId = "abc123";
    render(<VideoPage />);
    expect(document.querySelector("iframe")?.getAttribute("src")).toBe("https://www.youtube-nocookie.com/embed/abc123");
  });
  it("shows the phone recording on its own, before the official one exists", () => {
    TALK.phoneRecording = { kind: "file", src: "/video/room.mp4" };
    render(<VideoPage />);
    expect(screen.getByRole("heading", { name: "From the room" })).toBeInTheDocument();
    expect(document.querySelector("video")?.getAttribute("src")).toBe("/video/room.mp4");
    expect(screen.queryByText(/once the Linux Foundation posts it/)).toBeNull();
  });
});
