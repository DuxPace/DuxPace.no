"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { siteConfig } from "../../../lib/data/content";
import { useLanguage } from "../../../shared/providers/LanguageProvider";
import LanguageToggle from "../../../shared/components/ui/LanguageToggle";

const { sections, logo } = siteConfig.nav;

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [hidden, setHidden] = useState(false);
  const { t } = useLanguage();
  
  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY ? "down" : "up";
    
    if (direction === "down" && latest > 150 && !menuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    setLastScrollY(latest);
    setScrolled(latest > 20);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);



  const closeMenu = () => setMenuOpen(false);

  return (
    <motion.nav
      aria-label="Main navigation"
      initial={{ y: 0 }}
      animate={{ 
        y: hidden ? -100 : 0,
        backgroundColor: scrolled || menuOpen ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 0)",
      }}
      transition={{
        y: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        backgroundColor: { duration: 0.3 }
      }}
      className={`fixed top-0 w-full z-50 backdrop-blur-md border-b ${
        scrolled || menuOpen ? "border-white/10" : "border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
        <motion.a 
          href="#home" 
          className="flex items-center" 
          aria-label="DuxPace – go to top"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Image src={logo} alt="DuxPace" width={160} height={48} className="h-10 w-auto" />
        </motion.a>

        <div className="hidden md:flex items-center gap-8 ml-auto">
          {sections.map((id, index) => (
            <motion.a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className={`relative text-sm transition-colors ${
                active === id ? "text-white" : "text-gray-500 hover:text-gray-200"
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -1 }}
            >
              {t.nav[id as keyof typeof t.nav]}
              {active === id && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-px bg-white"
                  layoutId="activeNav"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
          <motion.div 
            className="w-px h-4 bg-white/10" 
            aria-hidden="true"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: 0.4 }}
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <LanguageToggle />
          </motion.div>
        </div>

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

      <motion.div
        id="mobile-menu"
        initial={false}
        animate={{
          height: menuOpen ? "auto" : 0,
          opacity: menuOpen ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="md:hidden border-t border-white/10 bg-black/95 overflow-hidden"
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {sections.map((id, index) => (
            <motion.a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              onClick={closeMenu}
              className={`text-base transition-colors ${
                active === id ? "text-white font-medium" : "text-gray-400 hover:text-white"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: menuOpen ? 1 : 0, 
                x: menuOpen ? 0 : -20 
              }}
              transition={{
                duration: 0.2,
                delay: menuOpen ? index * 0.05 : 0,
              }}
              whileHover={{ x: 4 }}
            >
              {t.nav[id as keyof typeof t.nav]}
            </motion.a>
          ))}
          <motion.div
            className="pt-4 border-t border-white/10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: menuOpen ? 1 : 0, 
              y: menuOpen ? 0 : 10 
            }}
            transition={{
              duration: 0.2,
              delay: menuOpen ? sections.length * 0.05 : 0,
            }}
          >
            <LanguageToggle />
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
