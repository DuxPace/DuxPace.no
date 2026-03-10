"use client";

import Image from "next/image";
import { FadeIn, Stagger, StaggerItem } from "../../../shared/components/animations/ScrollReveal";
import { DramaticCard } from "../../../shared/components/ui/HoverEffects";
import { useLanguage } from "../../../shared/providers/LanguageProvider";
import { newsItems, localize } from "../../../lib/data/news";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const PER_PAGE = 3;

export default function News() {
  const { lang, t } = useLanguage();
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const totalPages = Math.ceil(newsItems.length / PER_PAGE);
  const visibleItems = newsItems.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const closeModal = () => {
    setSelected(null);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.style.overflow = selected !== null ? "hidden" : "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section id="news" className="py-28 md:py-40 border-t border-white/[0.07] relative">
      {/* Background glow */}
      <motion.div
        className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          y: [0, 50, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <FadeIn direction="up" delay={0} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            {t.news.headline}
          </h2>
        </FadeIn>

        {/* News grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleItems.map((item, i) => {
            const globalIndex = page * PER_PAGE + i;
            const { title, description, date } = localize(item, lang);
            return (
              <FadeIn key={globalIndex} direction="up" delay={0.1 + i * 0.15}>
                <DramaticCard
                  className="bg-white/[0.02] rounded-lg overflow-hidden border border-white/5 h-full"
                  glowColor="rgba(59, 130, 246, 0.2)"
                >
                  <button
                    onClick={() => setSelected(globalIndex)}
                    className="w-full text-left group cursor-pointer"
                    aria-haspopup="dialog"
                  >
                    {/* Image */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110"
                      />
                      {/* Hover overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      {/* Date badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-[10px] text-white font-mono tracking-wider uppercase rounded-full">
                          {date}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-sm font-bold text-white leading-snug mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">
                        {title}
                      </h3>
                      <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed mb-4">
                        {description}
                      </p>
                      <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-blue-400/80 group-hover:text-blue-400 transition-colors inline-flex items-center gap-1">
                        {t.news.readMore}
                        <motion.span
                          className="inline-block"
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </span>
                    </div>
                  </button>
                </DramaticCard>
              </FadeIn>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <FadeIn direction="up" delay={0.3} className="flex items-center justify-center gap-8 mt-12">
            <motion.button
              onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}
              aria-label="Previous page"
              className="text-gray-500 hover:text-white text-sm font-mono transition-colors flex items-center gap-2"
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              ← prev
            </motion.button>

            <div role="tablist" aria-label="News pages" className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <motion.button
                  key={i}
                  role="tab"
                  aria-selected={i === page}
                  aria-label={`Page ${i + 1}`}
                  onClick={() => setPage(i)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
                    i === page 
                      ? "bg-blue-500 text-white" 
                      : "bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xs font-mono">{i + 1}</span>
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={() => setPage((p) => (p + 1) % totalPages)}
              aria-label="Next page"
              className="text-gray-500 hover:text-white text-sm font-mono transition-colors flex items-center gap-2"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.95 }}
            >
              next →
            </motion.button>
          </FadeIn>
        )}
      </div>

      {/* Modal */}
      {selected !== null && (() => {
        const item = newsItems[selected];
        const { title, content, date } = localize(item, lang);
        return (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/90 backdrop-blur-md p-0 md:p-6"
            onClick={closeModal}
          >
            <motion.div
              className="bg-black border border-white/[0.12] w-full md:max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative w-full aspect-video">
                <Image src={item.image} alt={item.alt} fill className="object-cover" />
                <motion.button
                  onClick={closeModal}
                  aria-label="Close article"
                  className="absolute top-4 right-4 bg-black/70 hover:bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>
              </div>
              <div className="p-8">
                <p className="text-[10px] text-blue-400 font-mono tracking-[0.18em] uppercase mb-3">{date}</p>
                <h2 className="text-2xl font-bold text-white mb-6 leading-snug tracking-tight">{title}</h2>
                {content.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-gray-400 text-sm leading-relaxed mb-4">{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </div>
        );
      })()}
    </section>
  );
}
