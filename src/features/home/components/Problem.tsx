"use client"

import { motion } from "framer-motion"
import { useT } from "@/lib/i18n/useT"
import { FadeIn } from "@/lib/motion/ScrollReveal"

export function Problem() {
  const t = useT()

  return (
    <section className="relative py-24 md:py-32 border-t border-gray-200" aria-labelledby="problem-headline">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <FadeIn>
              <h2
                id="problem-headline"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
              >
                {t("problem.headline")}
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-gray-600 text-base leading-[1.7] max-w-xl">
                {t("problem.body")}
              </p>
            </FadeIn>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              className="border-l-2 border-blue-500/60 pl-8 py-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              <p className="text-5xl md:text-6xl font-bold text-gray-900 tabular-nums mb-3">
                {t("problem.stat_value")}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {t("problem.stat_label")}
              </p>
              <p className="text-xs text-gray-500">
                Based on satellite revisit cycle + algal bloom dynamics
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
