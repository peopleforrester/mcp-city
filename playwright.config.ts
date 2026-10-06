// ABOUTME: Playwright against the built site: a local preview by default, a deployed URL when E2E_BASE_URL is set.
// ABOUTME: Mobile Chrome is in the matrix because the ballroom is phones.

import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.E2E_BASE_URL ?? "http://127.0.0.1:4173";

export default defineConfig({
  // Pages mount after their script loads; under a full parallel run, or over the network against the live site, five seconds was not always enough (#34).
  expect: { timeout: 10_000 },
  testDir: "e2e",
  use: { baseURL },
  webServer: process.env.E2E_BASE_URL ? undefined : { command: "npm run preview -- --host 127.0.0.1 --port 4173", url: baseURL, reuseExistingServer: true },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
