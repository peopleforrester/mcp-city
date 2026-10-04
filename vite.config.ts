// ABOUTME: Vite with React and Tailwind; three.js split into its own chunk so first paint never waits on it.
// ABOUTME: Vitest runs in jsdom with the testing-library matchers.

/// <reference types="vitest/config" />
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { PAGES } from "./routes.js";


export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // One HTML entry per page; each is real static HTML served by Caddy.
      input: Object.fromEntries(PAGES.map((p: string) => [p || "index", resolve(__dirname, p ? `${p}/index.html` : "index.html")])),
      output: {
        manualChunks: (id: string) => (/node_modules\/(three|@react-three|postprocessing)/.test(id) ? "three" : undefined),
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
