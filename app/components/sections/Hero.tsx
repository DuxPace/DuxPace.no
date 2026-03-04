"use client";

import GlobeWrapper from "../GlobeWrapper";
import FadeIn from "../FadeIn";
import { useLanguage } from "../LanguageProvider";

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div
        aria-hidden="true"
        className="hidden md:block absolute top-1/2 right-[10vw] -translate-y-1/2 w-[min(95vh,95vw)] h-[min(95vh,95vw)] pointer-events-none select-none"
      >
        <GlobeWrapper />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black from-30% via-black/80 via-55% to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
      <div className="relative z-10 w-full px-6 md:px-16 pt-32 pb-24">
        <FadeIn>
          <p className="text-[11px] text-gray-600 mb-10 tracking-[0.22em] uppercase font-mono">
            {t.hero.eyebrow}
          </p>
        </FadeIn>
        <FadeIn delay={100}>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-8 max-w-2xl tracking-tight">
            {t.hero.headline[0]}
            <br />
            {t.hero.headline[1]}
          </h1>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="text-gray-500 text-base max-w-sm leading-relaxed mb-10">
            {t.hero.subheading}
          </p>
        </FadeIn>
        <FadeIn delay={300}>
          <div className="flex gap-6 items-center flex-wrap">
            <a
              href={t.hero.cta.href}
              className="bg-white text-black text-[11px] font-semibold px-5 py-2.5 rounded-sm hover:bg-gray-100 transition-colors tracking-[0.1em] uppercase"
            >
              {t.hero.cta.label}
            </a>
            <a
              href={t.hero.ctaSecondary.href}
              className="text-gray-600 hover:text-white text-sm transition-colors"
            >
              {t.hero.ctaSecondary.label}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
