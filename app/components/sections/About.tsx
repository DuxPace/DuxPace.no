"use client";

import { useLanguage } from "../LanguageProvider";
import { FadeIn, Stagger, StaggerItem } from "../ScrollReveal";
import { 
  DramaticSlide, 
  ClipReveal, 
  FlipReveal,
  SplitText,
  DramaticEntrance,
} from "../DramaticAnimations";
import { DramaticCard } from "../HoverEffects";
import { motion } from "framer-motion";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-28 md:py-40 relative overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute top-0 right-0 w-1/2 h-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-blue-500/10 via-blue-400/5 to-transparent" />
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
          {/* Left column */}
          <DramaticSlide direction="left" delay={0} duration={1} rotate={3}>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8 tracking-tight">
                {t.about.headline[0]}
                <br />
                {t.about.headline[1]}
              </h2>
              
              <div className="space-y-5">
                {t.about.body.map((p, i) => (
                  <FadeIn key={i} direction="up" delay={0.3 + i * 0.15}>
                    <p
                      className={`leading-relaxed ${i === 0 ? "text-gray-400 text-base" : "text-gray-600 text-sm"}`}
                    >
                      {p}
                    </p>
                  </FadeIn>
                ))}
              </div>
            </div>
          </DramaticSlide>

          {/* Right column - facts med dramatiske kort */}
          <div className="space-y-6 pt-1">
            {t.about.facts.map((fact, i) => (
              <FlipReveal key={fact.label} delay={0.2 + i * 0.2} axis="y">
                <DramaticCard 
                  className="p-6 bg-white/[0.02] rounded-lg border border-white/5"
                  glowColor="rgba(59, 130, 246, 0.15)"
                >
                  <p className="text-[10px] text-blue-400 font-mono tracking-[0.18em] uppercase mb-3">
                    {fact.label}
                  </p>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {fact.text}
                  </p>
                </DramaticCard>
              </FlipReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
