"use client"

import { motion } from "framer-motion"
import { useT } from "@/lib/i18n/useT"
import { FadeIn } from "@/lib/motion/ScrollReveal"

const STEPS = [
  {
    num: "howItWorks.step1_label",
    title: "howItWorks.step1_title",
    body: "howItWorks.step1_body",
  },
  {
    num: "howItWorks.step2_label",
    title: "howItWorks.step2_title",
    body: "howItWorks.step2_body",
  },
  {
    num: "howItWorks.step3_label",
    title: "howItWorks.step3_title",
    body: "howItWorks.step3_body",
  },
] as const

export function HowItWorks() {
  const t = useT()

  return (
    <section className="relative py-24 md:py-32 border-t border-gray-200" aria-labelledby="how-it-works-headline">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <h2
            id="how-it-works-headline"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-16 max-w-lg"
          >
            {t("howItWorks.title")}
          </h2>
        </FadeIn>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200">
          {STEPS.map((step, index) => (
            <motion.li
              key={step.num}
              className="bg-background p-8 flex flex-col gap-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
            >
              <span
                className="text-4xl font-bold text-black/[0.08] leading-none select-none tabular-nums"
                aria-hidden="true"
              >
                {t(step.num)}
              </span>
              <h3 className="text-base font-semibold text-gray-900">
                {t(step.title)}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t(step.body)}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
