"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "../LanguageProvider";
import { siteConfig } from "../../data/content";
import { Linkedin, Mail, MapPin, ArrowUpRight } from "lucide-react";

export default function SiteFooter() {
  const { t, lang } = useLanguage();

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: lang === "no" ? "Om oss" : "About", href: "#about" },
      { label: lang === "no" ? "Team" : "Team", href: "#team" },
      { label: lang === "no" ? "Nyheter" : "News", href: "#news" },
    ],
    contact: [
      { label: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}`, icon: Mail },
      { label: "LinkedIn", href: "https://linkedin.com/company/duxpace", icon: Linkedin, external: true },
      { label: siteConfig.contact.location, href: "#contact", icon: MapPin },
    ],
  };

  return (
    <footer className="border-t border-white/[0.07] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 py-16 relative">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          {/* Brand column */}
          <motion.div 
            className="md:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.a 
              href="#home"
              className="inline-block mb-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image
                src={siteConfig.footer.logo}
                alt="DuxPace"
                width={120}
                height={36}
                className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
              />
            </motion.a>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm mb-6">
              {lang === "no" 
                ? "Satellittdata og AI for bærekraftig havbruk. Vi overvåker havet fra verdensrommet."
                : "Satellite data and AI for sustainable aquaculture. We watch the ocean from space."
              }
            </p>
            <div className="flex items-center gap-4">
              <motion.a
                href={siteConfig.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-blue-400 hover:bg-blue-500/10 transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={16} />
              </motion.a>
              <motion.a
                href={`mailto:${siteConfig.contact.email}`}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-blue-400 hover:bg-blue-500/10 transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={16} />
              </motion.a>
            </div>
          </motion.div>

          {/* Links columns */}
          <motion.div 
            className="md:col-span-3 md:col-start-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-[10px] text-gray-500 font-mono tracking-[0.2em] uppercase mb-4">
              {lang === "no" ? "Selskap" : "Company"}
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    className="text-gray-600 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group"
                    whileHover={{ x: 4 }}
                  >
                    {link.label}
                    <ArrowUpRight 
                      size={12} 
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className="md:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-[10px] text-gray-500 font-mono tracking-[0.2em] uppercase mb-4">
              {lang === "no" ? "Kontakt" : "Contact"}
            </h3>
            <ul className="space-y-3">
              {footerLinks.contact.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-gray-600 hover:text-white text-sm transition-colors inline-flex items-center gap-2 group"
                    whileHover={{ x: 4 }}
                  >
                    <link.icon size={14} className="text-gray-700 group-hover:text-gray-400" />
                    <span className="truncate">{link.label}</span>
                    {link.external && (
                      <ArrowUpRight 
                        size={12} 
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    )}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div 
          className="pt-8 border-t border-white/[0.07] flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <Image
              src={siteConfig.footer.logo}
              alt="DuxPace"
              width={18}
              height={18}
              className="opacity-50"
            />
            <span className="text-gray-700 text-xs font-mono">
              © {currentYear} {siteConfig.footer.copyright}
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <p className="text-gray-800 text-xs font-mono">{t.footer.location}</p>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-gray-700 hover:text-white text-xs font-mono flex items-center gap-1 transition-colors"
              whileHover={{ y: -2 }}
            >
              {lang === "no" ? "Til toppen" : "Back to top"}
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↑
              </motion.span>
            </motion.button>
          </div>
        </motion.div>

        {/* Decorative element */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </footer>
  );
}
