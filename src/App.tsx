// ABOUTME: The page, top to bottom: the city, the gates, the talk, the resources, the person.
// ABOUTME: One route; everything is an anchor on this page.

import { lazy, Suspense, useEffect } from "react";
import { Footer, Header } from "./components/Chrome";
import { Gates } from "./components/Gates";
import { Hero } from "./components/Hero";
import { About, Resources, Talk } from "./components/Sections";

// Everything below the gates arrives after first paint; a phone on ballroom wifi gets the title and the walk first.
const Map = lazy(() => import("./components/Map").then((m) => ({ default: m.Map })));
const Plugs = lazy(() => import("./components/Plugs").then((m) => ({ default: m.Plugs })));
const Film = lazy(() => import("./components/Film").then((m) => ({ default: m.Film })));
const Spiders = lazy(() => import("./components/Spiders").then((m) => ({ default: m.Spiders })));

export default function App() {
  // A share link or the QR deep link lands on an anchor that does not exist until React has rendered; scroll to it now.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
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
        <Suspense fallback={null}>
          <Map />
          <Plugs />
          <Film />
        </Suspense>
        <Talk />
        <Resources />
        <About />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <Spiders />
      </Suspense>
    </div>
  );
}
