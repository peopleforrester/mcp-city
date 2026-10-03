// ABOUTME: Mounts the app. Nothing else.
// ABOUTME: Styles are imported here so Vite bundles them with the entry.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
