// ABOUTME: Vite with React and Tailwind; three.js split into its own chunk so first paint never waits on it.
// ABOUTME: Vitest runs in jsdom with the testing-library matchers.

/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
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
