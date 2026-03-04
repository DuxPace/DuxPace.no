"use client";

import FadeIn from "../FadeIn";
import { useLanguage } from "../LanguageProvider";

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
          <FadeIn>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8 tracking-tight">
                {t.about.headline[0]}
                <br />
                {t.about.headline[1]}
              </h2>
              {t.about.body.map((p, i) => (
                <p
                  key={i}
                  className={`leading-relaxed ${i === 0 ? "text-gray-400 text-base mb-5" : "text-gray-600 text-sm"}`}
                >
                  {p}
                </p>
              ))}
            </div>
          </FadeIn>
          <div className="space-y-8 pt-1">
            {t.about.facts.map((fact, i) => (
              <FadeIn key={fact.label} delay={i * 80}>
                <div className="border-l border-white/15 pl-5">
                  <p className="text-[10px] text-gray-600 font-mono tracking-[0.18em] uppercase mb-2">
                    {fact.label}
                  </p>
                  <p className="text-gray-500 leading-relaxed text-sm">{fact.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
