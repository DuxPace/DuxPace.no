"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "../data/content";
import { useLanguage } from "./LanguageProvider";
import LanguageToggle from "./LanguageToggle";

const { sections, logo } = siteConfig.nav;

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
        <a href="#home" className="flex items-center" aria-label="DuxPace – go to top">
          <Image src={logo} alt="DuxPace" width={160} height={48} className="h-10 w-auto" />
        </a>
        <div className="flex items-center gap-8 ml-auto">
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className={`text-sm transition-colors ${
                active === id ? "text-white" : "text-gray-500 hover:text-gray-200"
              }`}
            >
              {t.nav[id as keyof typeof t.nav]}
            </a>
          ))}
          <div className="w-px h-4 bg-white/10" aria-hidden="true" />
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
}
