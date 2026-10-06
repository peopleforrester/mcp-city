// ABOUTME: Header and footer in the shape of michaelrishiforrester.com, pointing back to it.
// ABOUTME: The city is a satellite of the main site, so the chrome says whose it is. The footer holds the sound switch.

import { useEffect, useRef, useState } from "react";
import { isGroup, NAV, type NavItem } from "../data/nav";
import { isHumming, setHum } from "../lib/sound";


const linkClass = "block py-1 text-[color:var(--color-link-muted)] hover:text-[color:var(--color-link)]";

/** A group as a native disclosure: keyboard and screen reader support come with the element, and it works without script. */
function Group({ item, wide }: { item: Extract<NavItem, { links: unknown }>; wide: boolean }) {
  return (
    <details className={wide ? "group relative" : "group"} data-nav-group={item.label}>
      <summary className="cursor-pointer list-none py-1 text-[color:var(--color-link-muted)] hover:text-[color:var(--color-link)] [&::-webkit-details-marker]:hidden">
        {item.label} <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-180">▾</span>
      </summary>
      <ul className={wide ? "absolute left-0 top-full z-30 mt-2 min-w-64 rounded-md border border-[color:var(--color-rule)] bg-[color:var(--color-page)] p-3 shadow-lg" : "mb-2 ml-4 border-l border-[color:var(--color-rule)] pl-3"}>
        {item.links.map((l) => (
          <li key={l.href}><a href={l.href} className={linkClass}>{l.label}</a></li>
        ))}
      </ul>
    </details>
  );
}

function NavList({ wide }: { wide: boolean }) {
  return (
    <ul className={wide ? "hidden md:flex items-center gap-x-6 text-sm" : "grid gap-1 text-base"}>
      {NAV.map((item) => (
        <li key={item.label}>{isGroup(item) ? <Group item={item} wide={wide} /> : <a href={item.href} className={linkClass}>{item.label}</a>}</li>
      ))}
    </ul>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLElement>(null);
  // An open dropdown closes when the reader clicks anywhere else or presses Escape.
  useEffect(() => {
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent && e.key !== "Escape") return;
      bar.current?.querySelectorAll("details[open]").forEach((d) => {
        if (e instanceof KeyboardEvent || !d.contains(e.target as Node)) d.removeAttribute("open");
      });
      if (e instanceof KeyboardEvent) setOpen(false);
    };
    document.addEventListener("click", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", close);
    };
  }, []);
  return (
    <header ref={bar} className="border-b border-[color:var(--color-rule)] bg-[color:var(--color-page)]/90 backdrop-blur md:sticky md:top-0 z-20">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:p-3 focus:bg-white focus:text-black">
        Skip to content
      </a>
      <nav aria-label="Site" className="measure-wide flex items-center justify-between gap-x-6 py-4">
        <a href="/" className="font-semibold tracking-tight">Michael Rishi Forrester</a>
        <NavList wide />
        <button type="button" className="md:hidden rounded-md border border-[color:var(--color-rule)] px-3 py-1 text-sm" aria-expanded={open} aria-controls="phone-menu" onClick={() => setOpen((v) => !v)}>
          {open ? "Close" : "Menu"}
        </button>
      </nav>
      {open && (
        <div id="phone-menu" className="md:hidden measure-wide pb-4">
          <NavList wide={false} />
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const [on, setOn] = useState(isHumming());
  return (
    <footer className="border-t border-[color:var(--color-rule)]">
      <div className="measure-wide flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-[color:var(--color-ink-muted)]">
        <span><a href="https://michaelrishiforrester.com/" className="hover:underline">Michael Rishi Forrester</a> · <a href="https://michaelrishiforrester.com/speaking/" className="hover:underline">Speaking</a> · <a href="https://michaelrishiforrester.com/contact/" className="hover:underline">Contact</a></span>
        <span className="flex items-center gap-4">
          <button type="button" onClick={() => setOn(setHum(!on))} aria-pressed={on} className="hover:underline">
            Sound: {on ? "on" : "off"}
          </button>
          <a href="https://github.com/peopleforrester/mcp-city" className="hover:underline">Site source</a>
          <img src="/art/spider.png" alt="" width="36" height="27" className="opacity-80" title="For Whitney. Up, up, down, down, left, right, left, right, B, A." />
        </span>
      </div>
    </footer>
  );
}
