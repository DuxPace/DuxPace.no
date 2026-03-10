"use client";

import GlobeWrapper from "../../../shared/components/GlobeWrapper";
import { useLanguage } from "../../../shared/providers/LanguageProvider";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.7, ease },
  };
}

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-svh flex items-center overflow-hidden">
      {/* Globe - SEAMLESSLY INTEGRATED */}
      <div
        className="absolute inset-0 md:inset-auto md:top-1/2 md:right-[-10vw] md:-translate-y-1/2 md:w-[80vw] md:h-[80vw] pointer-events-auto select-none opacity-30 md:opacity-90 cursor-grab active:cursor-grabbing"
      >
        <GlobeWrapper />
      </div>

      {/* Gradient overlays - blend globe into page */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-transparent md:from-black md:from-20% md:via-black/85 md:via-50% md:to-transparent/50 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 pointer-events-none z-[1]" />

      <div className="relative z-10 w-full px-6 md:px-16 pt-20 md:pt-36 pb-20 md:pb-24 pointer-events-none">
        {/* Content wrapper - ENABLE INTERACTIONS */}
        <div className="pointer-events-auto">
        {/* Eyebrow */}
        <motion.p
          className="text-[11px] text-blue-400 mb-6 md:mb-10 tracking-[0.22em] uppercase font-mono"
          {...fadeUp(0.1)}
        >
          {t.hero.eyebrow}
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.05] max-w-2xl tracking-tight mb-5 md:mb-8"
          {...fadeUp(0.25)}
        >
          {t.hero.headline[0]}
          <br />
          {t.hero.headline[1]}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-gray-500 text-sm md:text-base max-w-sm leading-relaxed mb-8 md:mb-10"
          {...fadeUp(0.45)}
        >
          {t.hero.subheading}
        </motion.p>

        {/* CTA buttons - CLICKABLE */}
        <motion.div
          className="flex flex-row items-center gap-5 flex-wrap relative z-20"
          {...fadeUp(0.6)}
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
