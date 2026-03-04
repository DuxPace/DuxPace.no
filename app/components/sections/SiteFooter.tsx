"use client";

import Image from "next/image";
import { useLanguage } from "../LanguageProvider";
import { siteConfig } from "../../data/content";

export default function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-white/[0.07] py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src={siteConfig.footer.logo}
            alt="DuxPace"
            width={18}
            height={18}
            className="opacity-50"
          />
          <span className="text-gray-700 text-xs font-mono">{siteConfig.footer.copyright}</span>
        </div>
        <p className="text-gray-800 text-xs font-mono">{t.footer.location}</p>
      </div>
    </footer>
  );
}
