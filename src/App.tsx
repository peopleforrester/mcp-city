// ABOUTME: The home page: the descent, the gate walk, and a card for every other page.
// ABOUTME: The old anchors still resolve so share links and the deck's QR codes keep working.

import { lazy, Suspense, useEffect } from "react";
import { Footer, Header } from "./components/Chrome";
import { Gates } from "./components/Gates";
import { Hero } from "./components/Hero";
import { subscribed } from "./components/Newsletter";
import { PageCards } from "./components/PageCards";

// Everything below the gates arrives after first paint; a phone on ballroom wifi gets the title and the walk first.
const Map = lazy(() => import("./components/Map").then((m) => ({ default: m.Map })));
const Film = lazy(() => import("./components/Film").then((m) => ({ default: m.Film })));
const Spiders = lazy(() => import("./components/Spiders").then((m) => ({ default: m.Spiders })));

export default function App() {
  // A share link or the QR deep link lands on an anchor that does not exist until React has rendered; scroll to it now.
  useEffect(() => {
    // Back from the newsletter signup: the thanks state sits in the signup box, so take the reader to it.
    const id = subscribed(window.location.search) ? "newsletter" : window.location.hash.slice(1);
    if (!id) return;
    // The USB history moved to its own page; old links to the home page section follow it there.
    if (id === "plugs") {
      window.location.replace("/usb/");
      return;
    }
    // The lower sections load lazily, so the target may appear a moment after mount; look for it for a few seconds.
    let tries = 0;
    const timer = window.setInterval(() => {
      const el = document.getElementById(id);
      tries += 1;
      if (el || tries > 30) {
        window.clearInterval(timer);
        el?.scrollIntoView();
      }
    }, 100);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Gates />
        <PageCards />
        <Suspense fallback={null}>
          <Map />
          <Film />
        </Suspense>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <Spiders />
      </Suspense>
    </div>
  );
}
