// ABOUTME: The rainbow spiders: the Konami code releases a few across the city, for Whitney.
// ABOUTME: Pure DOM and motion; nothing until the code is typed.

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { konamiMatcher } from "../lib/konami";

export function Spiders() {
  const [wave, setWave] = useState(0);
  useEffect(() => {
    const feed = konamiMatcher();
    const onKey = (e: KeyboardEvent) => {
      if (feed(e.key)) setWave((w) => w + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  if (!wave) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true" data-testid="spiders">
      {Array.from({ length: 9 }, (_, i) => (
        <motion.img
          key={`${wave}-${i}`}
          src="/art/spider.png"
          alt=""
          className="absolute w-16"
          style={{ top: `${8 + ((i * 37) % 80)}%` }}
          initial={{ x: i % 2 ? "110vw" : "-20vw", rotate: 0 }}
          animate={{ x: i % 2 ? "-20vw" : "110vw", rotate: i % 2 ? -720 : 720 }}
          transition={{ duration: 6 + (i % 4), delay: i * 0.35, ease: "linear" }}
        />
      ))}
    </div>
  );
}
