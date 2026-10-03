// ABOUTME: The page, top to bottom: the city, the gates, the talk, the resources, the person.
// ABOUTME: One route; everything is an anchor on this page.

import { Footer, Header } from "./components/Chrome";
import { Gates } from "./components/Gates";
import { Hero } from "./components/Hero";
import { Map } from "./components/Map";
import { Plugs } from "./components/Plugs";
import { Spiders } from "./components/Spiders";
import { About, Resources, Talk } from "./components/Sections";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Gates />
        <Map />
        <Plugs />
        <Talk />
        <Resources />
        <About />
      </main>
      <Footer />
      <Spiders />
    </div>
  );
}
