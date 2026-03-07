import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Team from "./components/sections/Team";
import News from "./components/sections/News";
import Contact from "./components/sections/Contact";
import SiteFooter from "./components/sections/SiteFooter";

export default function Home() {
  return (
    <>
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded focus:text-xs focus:font-semibold focus:tracking-wide focus:uppercase"
      >
        Skip to main content
      </a>

      <Navbar />
      
      <main id="main-content">
        <Hero />
        <About />
        <Team />
        <News />
        <Contact />
      </main>
      
      <SiteFooter />
    </>
  );
}
