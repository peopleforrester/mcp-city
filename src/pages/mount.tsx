// ABOUTME: Mounts a page into the shared shell: styles, strict mode, header and footer.
// ABOUTME: Kept apart from Page.tsx so that file exports only components and fast refresh keeps working.

import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import { Page } from "./Page";

export function mountPage(node: ReactNode) {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Page>{node}</Page>
    </StrictMode>,
  );
}
