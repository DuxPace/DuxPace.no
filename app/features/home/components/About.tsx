"use client";

import { useLanguage } from "../../../shared/providers/LanguageProvider";
import { FadeIn } from "../../../shared/components/animations/ScrollReveal";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          <FadeIn className="md:col-span-7">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-8">
              {t.about.headline[0]}
              <br />
              {t.about.headline[1]}
            </h2>
            <div className="space-y-5 max-w-xl">
              {t.about.body.map((p, i) => (
                <p key={i} className="text-gray-300 text-lg leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="md:col-span-5 md:pt-3" delay={0.1}>
            <dl className="border-t border-white/[0.08]">
              {t.about.facts.map((fact) => (
                <div key={fact.label} className="py-5 border-b border-white/[0.08]">
                  <dt className="text-xs font-mono tracking-[0.14em] uppercase text-blue-400 mb-2">
                    {fact.label}
                  </dt>
                  <dd className="text-gray-300 text-base leading-relaxed">{fact.text}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
