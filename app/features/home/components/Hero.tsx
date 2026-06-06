"use client";

import GlobeWrapper from "../../../shared/components/GlobeWrapper";
import { useLanguage } from "../../../shared/providers/LanguageProvider";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.4, ease },
  };
}

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-svh flex flex-col justify-end lg:justify-center overflow-hidden">
      <div
        className="absolute top-1/2 right-0 lg:right-[5vw] -translate-y-1/2 w-[90vw] md:w-[min(70vh,55vw)] lg:w-[min(90vh,62vw)] h-[90vw] md:h-[min(70vh,55vw)] lg:h-[min(90vh,62vw)] pointer-events-auto select-none opacity-25 md:opacity-80 lg:opacity-90 cursor-grab active:cursor-grabbing z-[5]"
      >
        <GlobeWrapper />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-transparent md:from-black md:from-25% md:via-black/85 md:via-55% md:to-transparent pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-[1]" />

      <div className="relative z-10 w-full px-6 lg:px-16 pb-16 pt-8 lg:pt-36 lg:pb-24 pointer-events-none">
        <div className="pointer-events-auto">
        <motion.p
          className="text-[11px] text-blue-400 mb-6 md:mb-10 tracking-[0.22em] uppercase font-mono"
          {...fadeUp(0.05)}
        >
          {t.hero.eyebrow}
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.05] max-w-2xl tracking-tight mb-5 md:mb-8"
          {...fadeUp(0.12)}
        >
          {t.hero.headline[0]}
          <br />
          {t.hero.headline[1]}
        </motion.h1>

        <motion.p
          className="text-gray-300 text-sm md:text-base max-w-sm leading-relaxed mb-8 md:mb-10"
          {...fadeUp(0.2)}
        >
          {t.hero.subheading}
        </motion.p>

        <motion.div
          className="flex flex-row items-center gap-5 flex-wrap relative z-20"
          {...fadeUp(0.28)}
        >
          <a
            href={t.hero.cta.href}
            className="shrink-0 bg-white text-black text-xs font-semibold px-6 py-3 rounded-sm hover:bg-gray-100 transition-colors tracking-[0.08em] uppercase cursor-pointer pointer-events-auto"
          >
            {t.hero.cta.label}
          </a>
          <a
            href={t.hero.ctaSecondary.href}
            className="shrink-0 text-gray-300 hover:text-white text-sm transition-colors cursor-pointer pointer-events-auto"
          >
            {t.hero.ctaSecondary.label}
          </a>
        </motion.div>


        </div>
      </div>
    </section>
  );
}
