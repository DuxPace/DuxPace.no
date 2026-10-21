"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { FadeIn } from "../../../shared/components/animations/ScrollReveal";
import { useLanguage } from "../../../shared/providers/LanguageProvider";
import { newsItems as staticNewsItems, localize, type NewsItem } from "../../../lib/data/news";

export default function News({ initialItems }: { initialItems?: NewsItem[] }) {
  const newsItems = initialItems && initialItems.length > 0 ? initialItems : staticNewsItems;
  const { lang, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<number | null>(null);
  const shouldReduce = useReducedMotion();

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Deep links: ?news=<index> opens the article on load.
  useEffect(() => {
    const newsId = searchParams.get("news");
    if (newsId === null) return;
    const index = parseInt(newsId, 10);
    if (!isNaN(index) && index >= 0 && index < newsItems.length) {
      requestAnimationFrame(() => setSelected(index));
    }
  }, [searchParams, newsItems]);

  const openNews = useCallback((index: number) => {
    setSelected(index);
    const params = new URLSearchParams(searchParams.toString());
    params.set("news", index.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);

  const closeModal = useCallback(() => {
    setSelected(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("news");
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.push(newUrl, { scroll: false });
  }, [searchParams, pathname, router]);

  useEffect(() => {
    document.body.style.overflow = selected !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  useEffect(() => {
    if (selected !== null) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      closeButtonRef.current?.focus();
    } else {
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    }
  }, [selected]);

  useEffect(() => {
    if (selected === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key !== "Tab") return;

      const modal = modalRef.current;
      if (!modal) return;

      const focusable = Array.from(
        modal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selected, closeModal]);

  const article = selected !== null ? localize(newsItems[selected], lang) : null;

  return (
    <section id="news" className="py-28 md:py-40 border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn direction="up" delay={0} className="mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            {t.news.headline}
          </h2>
          <p className="text-gray-400 text-base mt-4">{t.news.subheading}</p>
        </FadeIn>

        <ol className="border-t border-white/[0.07]">
          {newsItems.map((item, i) => {
            const { title, description, date } = localize(item, lang);
            return (
              <li key={i} className="border-b border-white/[0.07]">
                <button
                  type="button"
                  onClick={() => openNews(i)}
                  aria-haspopup="dialog"
                  className="group w-full text-left grid gap-2 md:grid-cols-[11rem_1fr] md:gap-10 py-6 md:py-8 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <span className="text-sm text-gray-400 tracking-[0.14em] uppercase md:pt-1">
                    {date}
                  </span>
                  <span>
                    <span className="block text-lg md:text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                      {title}
                    </span>
                    <span className="block text-base text-gray-400 leading-relaxed mt-2 max-w-2xl">
                      {description}
                    </span>
                    <span className="inline-block text-sm text-blue-400 mt-3">
                      {t.news.readMore} →
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {article && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="news-modal-title"
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/90 p-0 md:p-6"
          onClick={closeModal}
        >
          <motion.div
            ref={modalRef}
            className="bg-black border border-white/[0.12] w-full md:max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg p-6 md:p-10"
            onClick={(e) => e.stopPropagation()}
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduce ? { duration: 0.15 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-start justify-between gap-6 mb-6">
              <p className="text-sm text-blue-400 tracking-[0.14em] uppercase pt-3">{article.date}</p>
              <button
                ref={closeButtonRef}
                onClick={closeModal}
                aria-label="Close article"
                className="shrink-0 w-11 h-11 flex items-center justify-center rounded-full border border-white/[0.12] text-white hover:bg-white/10 transition-colors text-xl leading-none"
              >
                ×
              </button>
            </div>
            <h2 id="news-modal-title" className="text-2xl md:text-3xl font-bold text-white mb-6 leading-snug tracking-tight">
              {article.title}
            </h2>
            {article.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-gray-300 text-base leading-relaxed mb-4">{paragraph}</p>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}
