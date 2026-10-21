"use client";

import Image from "next/image";
import { Linkedin, Mail, MapPin } from "lucide-react";
import { FadeIn } from "../../../shared/components/animations/ScrollReveal";
import { useLanguage } from "../../../shared/providers/LanguageProvider";
import { siteConfig, partners } from "../../../lib/data/content";

const heading = "text-xs font-mono tracking-[0.14em] uppercase text-gray-400 mb-4";
const link = "text-gray-400 hover:text-white text-base transition-colors inline-flex items-center gap-2 min-h-11";

export default function SiteFooter() {
  const { t, lang } = useLanguage();
  const currentYear = new Date().getFullYear();

  const company = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.team, href: "#team" },
    { label: t.nav.news, href: "#news" },
  ];
  const contact = [
    { label: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}`, icon: Mail },
    { label: "LinkedIn", href: siteConfig.contact.linkedin, icon: Linkedin, external: true },
    { label: siteConfig.contact.location, href: "#contact", icon: MapPin },
  ];

  return (
    <footer className="border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <FadeIn className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-14">
          <div className="md:col-span-5">
            <a href="#home" className="inline-block mb-6">
              <Image src={siteConfig.nav.logo} alt="DuxPace" width={176} height={60} className="h-10 w-auto" />
            </a>
            <p className="text-gray-400 text-base leading-relaxed max-w-sm">
              {lang === "no"
                ? "Satellittdata og KI for bærekraftig havbruk. Vi overvåker havet fra verdensrommet."
                : "Satellite data and AI for sustainable aquaculture. We watch the ocean from space."}
            </p>
          </div>

          <nav className="md:col-span-3 md:col-start-7" aria-label={lang === "no" ? "Selskap" : "Company"}>
            <h3 className={heading}>{lang === "no" ? "Selskap" : "Company"}</h3>
            <ul>
              {company.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={link}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h3 className={heading}>{t.nav.contact}</h3>
            <ul>
              {contact.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className={link}
                  >
                    <item.icon size={16} aria-hidden="true" className="shrink-0" />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn className="pb-10 flex flex-col sm:flex-row sm:items-center gap-x-10 gap-y-5" delay={0.1}>
          <p className="text-xs font-mono tracking-[0.14em] uppercase text-gray-400 shrink-0">
            {t.footer.supportedBy}
          </p>
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-5">
            {partners.map((p) => (
              <li key={p.name}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={p.name}
                  className="inline-flex items-center gap-3 min-h-11 opacity-80 hover:opacity-100 focus-visible:opacity-100 transition-opacity"
                >
                  <Image
                    src={p.logo}
                    alt={p.name}
                    width={p.width}
                    height={p.height}
                    style={{ height: p.render, width: "auto" }}
                  />
                  {p.showName && <span className="text-sm text-gray-300">{p.name}</span>}
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>

        <div className="pt-8 border-t border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-gray-400">
          <p>© {currentYear} {siteConfig.footer.copyright}</p>
          <div className="flex items-center gap-6">
            <p>{t.footer.location}</p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-white transition-colors min-h-11"
            >
              {lang === "no" ? "Til toppen ↑" : "Back to top ↑"}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
