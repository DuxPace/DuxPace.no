"use client"

import { motion } from "framer-motion"
import { useT } from "@/lib/i18n/useT"
import GlobeWrapper from "@/features/shared/components/GlobeWrapper"

const ease = [0.16, 1, 0.3, 1] as const

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.4, ease },
  }
}

export function Hero() {
  const t = useT()

  return (
    <section id="home" className="relative min-h-svh flex flex-col justify-center overflow-hidden bg-[#0a0a0a]" aria-labelledby="hero-headline">
      {/* Globe */}
      <div className="absolute top-1/2 right-0 lg:right-[5vw] -translate-y-1/2 w-[90vw] md:w-[min(70vh,55vw)] lg:w-[min(90vh,62vw)] h-[90vw] md:h-[min(70vh,55vw)] lg:h-[min(90vh,62vw)] pointer-events-auto select-none opacity-25 md:opacity-80 lg:opacity-90 cursor-grab active:cursor-grabbing z-[5]">
        <GlobeWrapper />
      </div>

      {/* Gradient masks */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-transparent md:from-black md:from-25% md:via-black/85 md:via-55% md:to-transparent pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-[1]" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-16 py-32 pointer-events-none">
        <div className="pointer-events-auto">
          <motion.p
            className="text-sm text-blue-400 mb-6"
            {...fadeUp(0.05)}
          >
            {t("hero.label")}
          </motion.p>

          <motion.h1
            id="hero-headline"
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.05] max-w-2xl mb-5 md:mb-8"
            {...fadeUp(0.12)}
          >
            {t("hero.headline")}
          </motion.h1>

          <motion.p
            className="text-gray-300 text-base max-w-sm leading-[1.7] mb-8 md:mb-10"
            {...fadeUp(0.2)}
          >
            {t("hero.subhead")}
          </motion.p>

          <motion.div
            className="flex flex-row items-center gap-5 flex-wrap relative z-20"
            {...fadeUp(0.28)}
          >
            <a
              href="#kontakt"
              className="shrink-0 bg-white text-black text-sm font-semibold px-6 py-3 rounded-sm hover:bg-gray-100 transition-colors"
            >
              {t("hero.cta_primary")}
            </a>
            <a
              href="#how-it-works"
              className="shrink-0 text-gray-300 hover:text-white text-sm transition-colors"
            >
              {t("hero.cta_secondary")} →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
