// ABOUTME: Eighteen years of plugs: the connector timeline scrolls past, then USB-C closes around USB-A and the wrapping reasons follow.
// ABOUTME: Hand-drawn sketches from the talk, animated in the DOM; no canvas needed.

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { PLUGS, USB_YEARS, WRAP_REASONS, WRAP_SOURCES, WRAP_TEST, WRAP_TOOLS } from "../data/plugs";

export function Plugs() {
  const reduced = useReducedMotion();
  const [wrapped, setWrapped] = useState(false);
  const usbA = PLUGS.find((p) => p.name === "USB-A")!;
  const usbC = PLUGS.find((p) => p.name === "USB-C")!;
  return (
    <section id="plugs" className="measure-wide py-16 border-t border-[color:var(--color-rule)]" aria-labelledby="plugs-h">
      <h2 id="plugs-h" className="text-3xl font-semibold tracking-tight sm:text-4xl">Remember these?</h2>
      <p className="mt-3 max-w-2xl text-[color:var(--color-ink-muted)]">
        "MCP is the USB of AI tooling." Fine. But does anyone remember the early days of USB? Is that A? Is that Mini? Is that Micro? Which way up does it go?
      </p>

      <ol className="mt-8 flex gap-6 overflow-x-auto pb-4 snap-x" aria-label="Connectors by year">
        {PLUGS.map((p, i) => (
          <motion.li
            key={p.name}
            className="shrink-0 snap-start w-40 rounded-lg bg-white p-3 text-black"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
          >
            <img src={p.image} alt={`A hand-drawn ${p.name} connector`} className="h-28 w-full object-contain" loading="lazy" />
            <p className="mt-2 font-semibold">{p.name}</p>
            <p className="font-mono text-sm">{p.year}</p>
            <p className="text-xs text-[#555]">{p.note}</p>
          </motion.li>
        ))}
      </ol>

      <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1fr] items-center">
        <div>
          <p className="font-mono text-6xl font-semibold text-[color:var(--color-glow)]" aria-label={`${USB_YEARS.span} years`}>
            {USB_YEARS.span} years
          </p>
          <p className="mt-2 text-xl">to get to one plug. USB 1.0 in {USB_YEARS.from}; USB-C in {USB_YEARS.to}.</p>
          <p className="mt-4 text-[color:var(--color-ink-muted)]">MCP will get there faster, and you could argue it already is. But we are not at USB-C yet. Meanwhile, we wrapped MCP servers in MCP servers. So did you.</p>
          <button type="button" onClick={() => setWrapped((v) => !v)} aria-pressed={wrapped} className="mt-6 rounded-md bg-[color:var(--color-glow)] px-5 py-2 font-semibold text-black">
            {wrapped ? "Unwrap it" : "USB, wrapped in USB"}
          </button>
        </div>
        <div className="relative mx-auto h-56 w-72 rounded-lg bg-white" data-testid="wrap-stage" data-wrapped={wrapped ? "yes" : "no"}>
          <motion.img
            src={usbA.image}
            alt="A USB-A plug"
            className="absolute inset-0 m-auto h-40 object-contain"
            animate={wrapped ? { scale: 0.62, opacity: 0.9 } : { scale: 1, opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.6 }}
          />
          <motion.img
            src={usbC.image}
            alt="A USB-C shell closing around it"
            className="absolute inset-0 m-auto h-52 object-contain"
            initial={false}
            animate={wrapped ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.4 }}
            transition={{ duration: reduced ? 0 : 0.6 }}
          />
        </div>
      </div>

      <h3 className="mt-14 text-2xl font-semibold">Why we wrapped them</h3>
      <ol className="mt-4 grid gap-3 md:grid-cols-2">
        {WRAP_REASONS.map((r, i) => (
          <li key={r} className="rounded-lg bg-[color:var(--color-tile)] p-4">
            <span className="font-mono text-sm text-[color:var(--color-glow)]">{i + 1}</span>
            <p className="mt-1">{r}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6 rounded-md border-l-4 border-[color:var(--color-accent)] bg-[color:var(--color-tile)] p-4 text-lg">
        The one test: {WRAP_TEST}
      </p>
      <h3 className="mt-10 text-xl font-semibold">Tools that do it</h3>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {WRAP_TOOLS.map((t) => (
          <li key={t.name}><a href={t.url} className="font-semibold underline underline-offset-4">{t.name}</a> <span className="text-[color:var(--color-ink-muted)]">{t.what}</span></li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-[color:var(--color-ink-muted)]">
        Sources: {WRAP_SOURCES.map((s, i) => <span key={s.url}>{i > 0 && " · "}<a href={s.url} className="underline underline-offset-4">{s.label}</a></span>)}
      </p>
    </section>
  );
}
