"use client";

import FadeIn from "../FadeIn";
import NewsCarousel from "../NewsCarousel";
import { useLanguage } from "../LanguageProvider";

export default function News() {
  const { t } = useLanguage();
  return (
    <section id="news" className="py-28 md:py-40 border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight">
            {t.news.headline}
          </h2>
        </FadeIn>
        <NewsCarousel />
      </div>
    </section>
  );
}
