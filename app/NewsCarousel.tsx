"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { newsItems } from "./data/news";

const PER_PAGE = 3;
const totalPages = Math.ceil(newsItems.length / PER_PAGE);

export default function NewsCarousel() {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const prev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const next = () => setPage((p) => (p + 1) % totalPages);

  const visibleItems = newsItems.slice(
    page * PER_PAGE,
    page * PER_PAGE + PER_PAGE
  );

  useEffect(() => {
    if (selected !== null) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [selected]);

  return (
    <>
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleItems.map((item, i) => {
            const globalIndex = page * PER_PAGE + i;
            return (
              <article
                key={globalIndex}
                onClick={() => setSelected(globalIndex)}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] hover:border-white/20"
              >
                <div className="relative w-full aspect-video">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 line-clamp-2">
                    {item.description}
                  </p>
                  <span className="inline-block mt-4 text-sm text-purple-400">
                    Read more &rarr;
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {totalPages > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute -left-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              aria-label="Previous page"
            >
              &#8249;
            </button>
            <button
              onClick={next}
              className="absolute -right-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              aria-label="Next page"
            >
              &#8250;
            </button>
          </>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === page ? "bg-white" : "bg-white/30"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-neutral-900 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-video">
              <Image
                src={newsItems[selected].image}
                alt={newsItems[selected].alt}
                fill
                className="object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="p-8">
              <p className="text-sm text-gray-500 mb-2">
                {newsItems[selected].date}
              </p>
              <h2 className="text-2xl font-bold text-white mb-4">
                {newsItems[selected].title}
              </h2>
              {newsItems[selected].content
                .split("\n\n")
                .map((paragraph, i) => (
                  <p key={i} className="text-gray-300 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
