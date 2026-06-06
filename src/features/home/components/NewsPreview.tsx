"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Share2 } from "lucide-react"
import { useLocale, useT } from "@/lib/i18n/useT"
import { FadeIn } from "@/lib/motion/ScrollReveal"
import { NewsCard } from "@/features/news/components/NewsCard"

interface NewsItem {
  _id: string
  title: { en: string; no: string }
  slug?: { current: string }
  excerpt?: { en?: string; no?: string }
  coverUrl?: string
  publishedAt: string
}

interface NewsPreviewProps {
  items: NewsItem[]
}

function formatDate(iso: string, locale: string): string {
  return new Date(iso).toLocaleDateString(locale === "no" ? "nb-NO" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function getItemId(item: NewsItem): string {
  return item.slug?.current || item._id
}

const ease = [0.16, 1, 0.3, 1] as const

export function NewsPreview({ items }: NewsPreviewProps) {
  const t = useT()
  const { locale } = useLocale()
  const [selected, setSelected] = useState<NewsItem | null>(null)
  const [copied, setCopied] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const [constraints, setConstraints] = useState({ left: 0, right: 0 })

  function openModal(item: NewsItem) {
    if (isDragging.current) return
    const id = getItemId(item)
    window.history.pushState(null, "", `#nyheter/${encodeURIComponent(id)}`)
    setSelected(item)
    setCopied(false)
  }

  function closeModal() {
    window.history.pushState(null, "", "#nyheter")
    setSelected(null)
  }

  useEffect(() => {
    function update() {
      if (!containerRef.current || !trackRef.current) return
      const cw = containerRef.current.offsetWidth
      const tw = trackRef.current.scrollWidth
      setConstraints({ left: Math.min(0, cw - tw - 24), right: 0 })
    }
    update()
    const ro = new ResizeObserver(update)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [items])

  useEffect(() => {
    const match = window.location.hash.match(/^#nyheter\/(.+)$/)
    if (match) {
      const id = decodeURIComponent(match[1])
      const found = items.find((item) => getItemId(item) === id)
      if (found) setTimeout(() => setSelected(found), 0)
    }
  }, [items])

  useEffect(() => {
    const onPop = () => {
      const match = window.location.hash.match(/^#nyheter\/(.+)$/)
      if (!match) setSelected(null)
    }
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])

  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [selected])

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [selected])

  function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <section
      id="nyheter"
      className="relative py-24 md:py-32 border-t border-gray-200"
      aria-labelledby="news-headline"
    >
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <h2
            id="news-headline"
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            {t("news.title")}
          </h2>
        </FadeIn>
        <FadeIn delay={0.08}>
          <p className="text-gray-600 text-base leading-[1.7] mb-12 max-w-xl">
            {t("news.body")}
          </p>
        </FadeIn>
      </div>

      {/* Carousel - bleeds to edges */}
      <div ref={containerRef} className="overflow-hidden px-6 md:px-16">
        <motion.div
          ref={trackRef}
          className="flex gap-5 pb-2 select-none cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.04}
          dragMomentum
          onDragStart={() => { isDragging.current = true }}
          onDragEnd={() => { setTimeout(() => { isDragging.current = false }, 50) }}
        >
          {items.map((item, index) => {
            const title = item.title[locale] ?? item.title.en
            const excerpt = item.excerpt
              ? (item.excerpt[locale] ?? item.excerpt.en ?? "")
              : ""
            return (
              <motion.div
                key={item._id}
                className="w-[min(360px,82vw)] shrink-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: index * 0.07 }}
              >
                <NewsCard
                  title={title}
                  excerpt={excerpt}
                  date={formatDate(item.publishedAt, locale)}
                  image={item.coverUrl}
                  onClick={() => openModal(item)}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <div className="px-6 md:px-16 mt-4">
        <p className="text-gray-400 text-xs select-none" aria-hidden="true">
          {t("news.dragHint")}
        </p>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeModal}
              aria-hidden="true"
            />

            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              onClick={closeModal}
            >
              <motion.div
                className="bg-gray-900 border border-white/[0.12] rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl"
                initial={{ scale: 0.96, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.96, y: 20, opacity: 0 }}
                transition={{ duration: 0.3, ease }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal top bar */}
                <div className="flex items-center justify-between px-6 pt-6 pb-4 gap-4 border-b border-white/[0.07]">
                  <span className="text-xs text-gray-500">
                    {formatDate(selected.publishedAt, locale)}
                  </span>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={copyLink}
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.07] transition-colors px-2"
                      aria-label={copied ? t("news.linkCopied") : t("news.copyLink")}
                    >
                      {copied ? (
                        <span className="text-green-400 text-xs font-mono">{t("news.linkCopied")}</span>
                      ) : (
                        <Share2 size={16} aria-hidden="true" />
                      )}
                    </button>
                    <button
                      onClick={closeModal}
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.07] transition-colors"
                      aria-label={t("news.close")}
                    >
                      <X size={18} aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Modal body */}
                <div className="px-6 py-8">
                  <h2
                    id="modal-title"
                    className="text-2xl md:text-3xl font-bold text-white leading-snug tracking-tight mb-6"
                  >
                    {selected.title[locale] ?? selected.title.en}
                  </h2>

                  {selected.excerpt && (
                    <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                      {selected.excerpt[locale] ?? selected.excerpt.en}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
