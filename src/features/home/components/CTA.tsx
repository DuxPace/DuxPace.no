"use client"

import { motion } from "framer-motion"
import { useT } from "@/lib/i18n/useT"
import { FadeIn } from "@/lib/motion/ScrollReveal"

const MAP_EMBED = "https://www.google.com/maps?q=Gründerbrakka,VM-paviljongen,Trondheim,Norway&output=embed"

export function CTA() {
  const t = useT()

  return (
    <section id="kontakt" className="relative py-24 md:py-32 border-t border-gray-200" aria-labelledby="cta-headline">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: headline + CTAs */}
          <div>
            <FadeIn>
              <h2
                id="cta-headline"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
              >
                {t("cta.headline")}
              </h2>
            </FadeIn>
            <FadeIn delay={0.08}>
              <p className="text-gray-600 text-base leading-[1.7] mb-8">
                {t("cta.body")}
              </p>
            </FadeIn>
            <FadeIn delay={0.14}>
              <div className="space-y-4 mb-10 text-sm">
                <div>
                  <p className="text-gray-500 text-xs mb-1">Email</p>
                  <a href="mailto:planet@duxpace.no" className="text-gray-700 hover:text-gray-900 transition-colors">planet@duxpace.no</a>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Adresse</p>
                  <span className="text-gray-700">Gründerbrakka, VM-paviljongen, Trondheim</span>
                </div>
              </div>
            </FadeIn>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <a
                href="mailto:planet@duxpace.no"
                className="inline-block bg-gray-900 text-white hover:bg-gray-800 text-sm font-semibold px-6 py-3 rounded-sm transition-colors duration-150"
              >
                {t("cta.primary")}
              </a>
            </motion.div>
          </div>

          {/* Right: map */}
          <FadeIn delay={0.2}>
            <div className="rounded-xl overflow-hidden border border-gray-200 aspect-video w-full">
              <iframe
                src={MAP_EMBED}
                title="VM-paviljongen, Trondheim"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
