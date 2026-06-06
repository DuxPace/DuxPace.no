"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Linkedin, Mail, MapPin, ArrowUpRight } from "lucide-react"
import { useT, useLocale } from "@/lib/i18n/useT"

const companyLinks = [
  { key: "nav.howItWorks", href: "#how-it-works" },
  { key: "nav.news", href: "#nyheter" },
  { key: "nav.contact", href: "#kontakt" },
] as const

const contactLinks = [
  { label: "planet@duxpace.no", href: "mailto:planet@duxpace.no", icon: Mail },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/duxpace", icon: Linkedin, external: true },
  { label: "Trondheim, Norway", href: "#", icon: MapPin },
] as const

export function Footer() {
  const t = useT()
  const { locale } = useLocale()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#111] border-t border-white/[0.07] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#111] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div className="inline-block mb-6" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/" aria-label="DuxPace home">
                <Image
                  src="/images/logos/logo-wide.jpeg"
                  alt="DuxPace"
                  width={120}
                  height={36}
                  className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
                />
              </Link>
            </motion.div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-4">
              <motion.a
                href="https://www.linkedin.com/company/duxpace"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-400 hover:bg-blue-500/10 transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="DuxPace on LinkedIn"
              >
                <Linkedin size={16} />
              </motion.a>
              <motion.a
                href="mailto:planet@duxpace.no"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-400 hover:bg-blue-500/10 transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Email DuxPace"
              >
                <Mail size={16} />
              </motion.a>
            </div>
          </motion.div>

          {/* Company links */}
          <motion.div
            className="md:col-span-3 md:col-start-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-[10px] text-gray-400 font-mono tracking-[0.2em] uppercase mb-4" suppressHydrationWarning>
              {locale === "no" ? "Selskap" : "Company"}
            </h3>
            <ul className="space-y-3">
              {companyLinks.map(({ key, href }) => (
                <li key={href}>
                  <motion.div whileHover={{ x: 4 }}>
                    <a
                      href={href}
                      className="text-gray-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group"
                    >
                      {t(key)}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </a>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact links */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-[10px] text-gray-400 font-mono tracking-[0.2em] uppercase mb-4" suppressHydrationWarning>
              {locale === "no" ? "Kontakt" : "Contact"}
            </h3>
            <ul className="space-y-3">
              {contactLinks.map(({ label, href, icon: Icon, ...rest }) => (
                <li key={label}>
                  <motion.a
                    href={href}
                    target={"external" in rest && rest.external ? "_blank" : undefined}
                    rel={"external" in rest && rest.external ? "noopener noreferrer" : undefined}
                    className="text-gray-400 hover:text-white text-sm transition-colors inline-flex items-center gap-2 group"
                    whileHover={{ x: 4 }}
                  >
                    <Icon size={14} className="text-gray-400 group-hover:text-gray-200 shrink-0" />
                    <span className="truncate">{label}</span>
                    {"external" in rest && rest.external && (
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                      />
                    )}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom row */}
        <motion.div
          className="pt-8 border-t border-white/[0.07] flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <Image
              src="/images/logos/logo-wide.jpeg"
              alt=""
              width={18}
              height={18}
              className="opacity-50 h-4 w-auto"
            />
            <span className="text-gray-400 text-xs font-mono">
              &copy; {year} DuxPace AS
            </span>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-gray-400 text-xs font-mono">{t("footer.data_sources")}</p>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-gray-400 hover:text-white text-xs font-mono flex items-center gap-1 transition-colors"
              whileHover={{ y: -2 }}
            >
              <span suppressHydrationWarning>{locale === "no" ? "Til toppen" : "Back to top"}</span>
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                &uarr;
              </motion.span>
            </motion.button>
          </div>
        </motion.div>

        {/* Decorative gradient line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </footer>
  )
}
