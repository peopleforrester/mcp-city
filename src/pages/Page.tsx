// ABOUTME: The shell every page mounts into: header, main, footer, and the page's own title block.
// ABOUTME: Pages are separate Vite entries, so the chrome lives here and each entry stays a few lines.

import type { ReactNode } from "react";
import { Footer, Header } from "../components/Chrome";

export function PageIntro({ title, lede, children }: { title: string; lede?: ReactNode; children?: ReactNode }) {
  return (
    <div className="measure-wide pt-12 pb-4">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
      {lede && <p className="mt-4 max-w-2xl text-xl text-[color:var(--color-ink-muted)]">{lede}</p>}
      {children}
    </div>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main" className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

