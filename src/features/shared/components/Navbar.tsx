"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useT, useLocale } from "@/lib/i18n/useT"

const NAV_LINKS = [
  { key: "nav.howItWorks", href: "#how-it-works" },
  { key: "nav.news", href: "#nyheter" },
  { key: "nav.contact", href: "#kontakt" },
]

export function Navbar() {
  const t = useT()
  const { locale, setLocale } = useLocale()
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY ? "down" : "up"
    if (direction === "down" && latest > 150 && !menuOpen) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    setLastScrollY(latest)
    setScrolled(latest > 20)
  })

  const closeMenu = () => setMenuOpen(false)

  return (
    <motion.nav
      aria-label="Main navigation"
      initial={{ y: 0 }}
      animate={{
        y: hidden ? -100 : 0,
        backgroundColor: scrolled || menuOpen ? "rgba(10, 10, 10, 0.97)" : "rgba(10, 10, 10, 0)",
      }}
      transition={{
        y: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        backgroundColor: { duration: 0.3 },
      }}
      className={`fixed top-0 w-full z-50 backdrop-blur-md border-b ${
        scrolled || menuOpen ? "border-white/10" : "border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link href="/" aria-label="DuxPace home">
            <Image
              src="/images/logos/logo-wide.jpeg"
              alt={t("nav.logo_alt")}
              width={140}
              height={56}
              className="w-auto block"
              style={{ height: '28px' }}
              priority
            />
          </Link>
        </motion.div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 ml-auto">
          {NAV_LINKS.map(({ key, href }, index) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a
                href={href}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {t(key)}
              </a>
            </motion.div>
          ))}

          <motion.div
            className="w-px h-4 bg-white/10"
            aria-hidden="true"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: 0.4 }}
          />

          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => setLocale(locale === "no" ? "en" : "no")}
            className="text-xs font-mono tracking-[0.15em] text-gray-400 hover:text-white transition-colors min-h-[44px] px-1"
            aria-label={`Switch to ${locale === "no" ? "English" : "Norwegian"}`}
          >
            {locale === "no" ? "EN" : "NO"}
          </motion.button>

        </div>

        {/* Mobile menu button */}
        <motion.button
          className="md:hidden ml-auto text-gray-400 hover:text-white transition-all duration-200 w-11 h-11 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
          whileTap={{ scale: 0.95 }}
        >
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            animate={{ rotate: menuOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {menuOpen ? (
              <motion.path
                d="M4 4L16 16M16 4L4 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.2 }}
              />
            ) : (
              <motion.path
                d="M3 6h14M3 10h14M3 14h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.svg>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <motion.div
        id="mobile-menu"
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="md:hidden border-t border-white/10 bg-[#0a0a0a]/98 overflow-hidden"
        role="dialog"
        aria-label="Mobile navigation"
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {NAV_LINKS.map(({ key, href }, index) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : -20 }}
              transition={{ duration: 0.2, delay: menuOpen ? index * 0.05 : 0 }}
              whileHover={{ x: 4 }}
            >
              <a
                href={href}
                onClick={closeMenu}
                className="text-base text-gray-300 hover:text-white transition-colors min-h-[44px] flex items-center"
              >
                {t(key)}
              </a>
            </motion.div>
          ))}
          <motion.div
            className="pt-4 border-t border-white/10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : 10 }}
            transition={{ duration: 0.2, delay: menuOpen ? NAV_LINKS.length * 0.05 : 0 }}
          >
            <button
              onClick={() => {
                setLocale(locale === "no" ? "en" : "no")
                closeMenu()
              }}
              className="text-xs font-mono tracking-[0.15em] text-gray-400 hover:text-white transition-colors min-h-[44px] flex items-center"
            >
              {locale === "no" ? "EN" : "NO"}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  )
}
