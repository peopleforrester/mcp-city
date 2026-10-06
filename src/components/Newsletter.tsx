// ABOUTME: The newsletter signup: a plain HTML form posting to michaelrishiforrester.com, per the contract in MRF-website#101.
// ABOUTME: No script needed to submit; the reader returns to the home page with ?subscribed=1, which shows the thanks state.

import { ACTION, CONSENT, subscribed } from "../lib/newsletter";

export function Newsletter({ compact = false }: { compact?: boolean }) {
  if (typeof window !== "undefined" && subscribed(window.location.search)) {
    return (
      <p role="status" className="rounded-md border-l-4 border-[color:var(--color-glow)] bg-[color:var(--color-tile)] p-4">
        You are on the list. The first email will come from michaelrishiforrester.com.
      </p>
    );
  }
  return (
    <form action={ACTION} method="post" className={compact ? "grid gap-2" : "grid gap-3 max-w-xl"} aria-label="Newsletter signup">
      <input type="hidden" name="source" value="mcp-dev-summit-toronto-2026" />
      <input type="hidden" name="next" value="https://mcp.michaelrishiforrester.com/" />
      <div className="hidden" aria-hidden="true">
        <label>Leave this empty <input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <label className="grid gap-1">
        <span className={compact ? "text-sm" : "font-semibold"}>Email</span>
        <input type="email" name="email" required maxLength={254} autoComplete="email" className="rounded-md border border-[color:var(--color-rule)] bg-[color:var(--color-page)] px-3 py-2 text-[color:var(--color-ink)]" />
      </label>
      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" name="consent" value="yes" required className="mt-1" />
        <span>{CONSENT}</span>
      </label>
      <button type="submit" className="justify-self-start rounded-md bg-[color:var(--color-glow)] px-5 py-2 font-semibold text-black">Subscribe</button>
    </form>
  );
}
