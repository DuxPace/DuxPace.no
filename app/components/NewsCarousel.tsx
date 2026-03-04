"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { newsItems, localize } from "../data/news";
import { useLanguage } from "./LanguageProvider";

const PER_PAGE = 3;
const totalPages = Math.ceil(newsItems.length / PER_PAGE);

export default function NewsCarousel() {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { lang, t } = useLanguage();

  const visibleItems = newsItems.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  useEffect(() => {
    document.body.style.overflow = selected !== null ? "hidden" : "";
    if (selected !== null) closeRef.current?.focus();
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  const closeModal = () => {
    setSelected(null);
    triggerRef.current?.focus();
  };

  return (
    <>
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {visibleItems.map((item, i) => {
            const globalIndex = page * PER_PAGE + i;
            const { title, description, date } = localize(item, lang);
            return (
              <article
                key={globalIndex}
                className={i > 0 ? "border-t border-white/[0.08] md:border-t-0 md:border-l md:border-white/[0.08]" : ""}
              >
                <button
                  ref={globalIndex === selected ? triggerRef : undefined}
                  onClick={(e) => {
                    triggerRef.current = e.currentTarget;
                    setSelected(globalIndex);
                  }}
                  className="w-full text-left group py-8 md:py-0 md:px-8 first:md:pl-0 last:md:pr-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
                  aria-haspopup="dialog"
                >
                  <div className="relative w-full aspect-[4/3] mb-5 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-700 scale-100 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="text-[10px] text-gray-600 font-mono tracking-[0.18em] uppercase mb-3">{date}</p>
                  <h3 className="text-sm font-semibold text-white leading-snug mb-2 group-hover:text-gray-200 transition-colors">{title}</h3>
                  <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed mb-5">{description}</p>
                  <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-gray-700 group-hover:text-white transition-colors" aria-hidden="true">
                    {t.news.readMore} →
                  </span>
                </button>
              </article>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-6 mt-12">
            <button
              onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}
              aria-label="Previous page"
              className="text-gray-700 hover:text-white transition-colors text-sm font-mono focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50"
            >
              ← prev
            </button>
            <div role="tablist" aria-label="News pages" className="flex gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === page}
                  aria-label={`Page ${i + 1}`}
                  onClick={() => setPage(i)}
                  className="w-10 h-10 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50"
                >
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors ${i === page ? "bg-white" : "bg-white/20"}`} />
                </button>
              ))}
            </div>
            <button
              onClick={() => setPage((p) => (p + 1) % totalPages)}
              aria-label="Next page"
              className="text-gray-700 hover:text-white transition-colors text-sm font-mono focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50"
            >
              next →
            </button>
          </div>
        )}
      </div>

      {selected !== null && (() => {
        const item = newsItems[selected];
        const { title, content, date } = localize(item, lang);
        return (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onKeyDown={(e) => e.key === "Escape" && closeModal()}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/85 backdrop-blur-sm p-0 md:p-6"
            onClick={closeModal}
          >
            <div
              className="bg-black border-t md:border border-white/[0.12] w-full md:max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-video">
                <Image src={item.image} alt={item.alt} fill className="object-cover" />
                <button
                  ref={closeRef}
                  onClick={closeModal}
                  aria-label="Close article"
                  className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white w-9 h-9 flex items-center justify-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50 text-lg leading-none"
                >
                  &times;
                </button>
              </div>
              <div className="p-8">
                <p className="text-[10px] text-gray-600 font-mono tracking-[0.18em] uppercase mb-3">{date}</p>
                <h2 id="modal-title" className="text-xl font-bold text-white mb-6 leading-snug tracking-tight">{title}</h2>
                {content.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-gray-400 text-sm leading-relaxed mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}
