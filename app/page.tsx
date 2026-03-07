import { Navbar } from "./features/layout";
import { Hero, About, Team, News, Contact, Footer } from "./features/home";

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
      
      <Footer />
    </>
  );
}
