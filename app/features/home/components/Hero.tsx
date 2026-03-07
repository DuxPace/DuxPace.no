"use client";

import GlobeWrapper from "../../../shared/components/GlobeWrapper";
import { useLanguage } from "../../../shared/providers/LanguageProvider";
import {
  SplitText,
  DramaticEntrance,
  ClipReveal,
  GlitchText,
  BounceIn,
} from "../../../shared/components/animations/DramaticAnimations";
import { FadeIn, Stagger, StaggerItem } from "../../../shared/components/animations/ScrollReveal";
import { motion } from "framer-motion";

export default function Hero() {
  const { t, lang } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Globe - visible on all devices */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-0 md:right-[10vw] -translate-y-1/2 w-[120vw] md:w-[min(95vh,95vw)] h-[120vw] md:h-[min(95vh,95vw)] pointer-events-none select-none opacity-30 md:opacity-100"
      >
        <GlobeWrapper />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-transparent md:from-black md:from-30% md:via-black/80 md:via-55% md:to-transparent pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-[1]" />

      <div className="relative z-10 w-full px-6 md:px-16 pt-32 pb-24">
        {/* Eyebrow */}
        <FadeIn direction="up" delay={0}>
          <p className="text-[11px] text-blue-400 mb-10 tracking-[0.22em] uppercase font-mono">
            {t.hero.eyebrow}
          </p>
        </FadeIn>

        {/* Dramatisk headline med split text */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] max-w-2xl tracking-tight">
            <SplitText delay={0.2} staggerDelay={0.04} splitBy="char">
              {t.hero.headline[0]}
            </SplitText>
            <br />
            <SplitText delay={0.6} staggerDelay={0.04} splitBy="char">
              {t.hero.headline[1]}
            </SplitText>
          </h1>
        </div>

        {/* Subheading med dramatisk entrance */}
        <DramaticEntrance delay={1}>
          <p className="text-gray-500 text-base max-w-sm leading-relaxed mb-10">
            {t.hero.subheading}
          </p>
        </DramaticEntrance>

        {/* CTA buttons med bounce */}
        <Stagger className="flex gap-6 items-center flex-wrap" staggerDelay={0.15} baseDelay={1.2}>
          <StaggerItem>
            <BounceIn>
              <a
                href={t.hero.cta.href}
                className="bg-white text-black text-[11px] font-semibold px-5 py-2.5 rounded-sm hover:bg-gray-100 transition-colors tracking-[0.1em] uppercase inline-block"
              >
                {t.hero.cta.label}
              </a>
            </BounceIn>
          </StaggerItem>
          
          <StaggerItem>
            <FadeIn direction="up" delay={0}>
              <a
                href={t.hero.ctaSecondary.href}
                className="text-gray-600 hover:text-white text-sm transition-colors inline-flex items-center gap-2 group"
              >
                {t.hero.ctaSecondary.label}
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </a>
            </FadeIn>
          </StaggerItem>
        </Stagger>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-12 left-6 md:left-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] text-gray-600 font-mono tracking-[0.2em] uppercase">
              {lang === "no" ? "Scroll" : "Scroll"}
            </span>
            <motion.div
              className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-1 bg-white/60 rounded-full"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
