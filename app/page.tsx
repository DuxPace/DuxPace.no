import { Navbar } from "@/features/shared/components/Navbar"
import { Footer } from "@/features/shared/components/Footer"
import { Hero } from "@/features/home/components/Hero"
import { Problem } from "@/features/home/components/Problem"
import { HowItWorks } from "@/features/home/components/HowItWorks"
import { Team } from "@/features/home/components/Team"
import { News } from "@/features/home/components/News"
import { CTA } from "@/features/home/components/CTA"

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded focus:text-xs focus:font-semibold focus:tracking-wide focus:uppercase"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <div id="hjem"><Hero /></div>
        <div id="problem"><Problem /></div>
        <div id="how-it-works"><HowItWorks /></div>
        <div id="team"><Team /></div>
        <div id="nyheter"><News /></div>
        <div id="kontakt"><CTA /></div>
      </main>
      <Footer />
    </>
  )
}
