// ABOUTME: The page a phone in the ballroom gets: it loads, the title is there, the gates walk by keyboard.
// ABOUTME: Points at E2E_BASE_URL when set, otherwise the local preview.

import { expect, test } from "@playwright/test";

test("loads with the title and the thesis", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Governing MCP for a Workforce the Size of a City");
  await expect(page.getByRole("main").getByText("If you do not give them MCP servers, they build their own.", { exact: true })).toBeVisible();
});

test("walks the gates by keyboard and reaches a result", async ({ page }) => {
  await page.goto("/#gates");
  for (let i = 1; i <= 6; i++) {
    await expect(page.getByText(`Gate ${i} of 6`)).toBeVisible();
    await page.getByRole("button", { name: /^Pass/ }).focus();
    await page.keyboard.press("Enter");
  }
  await expect(page.getByTestId("result")).toContainText("Admitted");
});

test("a shared walk resumes where it stopped", async ({ page }) => {
  await page.goto("/?g=PPFUUU#gates");
  await expect(page.getByText("Gate 4 of 6")).toBeVisible();
  await expect(page.getByTestId("alley")).toContainText("gate 3");
});

test("the film is on the page with a poster and a playable source", async ({ page }) => {
  await page.goto("/#film");
  const film = page.getByTestId("film");
  await expect(film).toBeVisible();
  await expect(film).toHaveAttribute("poster", "/film/poster.jpg");
  const res = await page.request.head("/film/shadow-play-720.mp4");
  expect(res.ok()).toBeTruthy();
});

test("the wrapping page stands on its own", async ({ page }) => {
  await page.goto("/wrapping/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("We wrapped MCP servers in MCP servers. So did you.");
  await expect(page.getByText("The one test")).toBeVisible();
});
