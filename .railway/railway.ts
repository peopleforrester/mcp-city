// ABOUTME: Railway configuration for the mcp-city service as code, replacing railway.toml (Config as Code ends 2026-12-01).
// ABOUTME: Builds with Railpack, Railway's builder; the service's builder setting is RAILPACK and IaC has no field to override it.

import { defineRailway, github, project, service } from "railway/iac";

// This repository manages only its own resources in the environment. Other
// repositories export their own partial name.
// See https://docs.railway.com/infrastructure-as-code#multi-repo-projects
export const partial = "mcp-city";

export default defineRailway(() => {
  // Deploys main from GitHub; Caddy serves dist/ per the Caddyfile at the repo root.
  const mcp_city = service("mcp-city", {
    source: github("peopleforrester/mcp-city", { branch: "main" }),
  });
  return project("mrf-website", {
    resources: [mcp_city],
  });
});
