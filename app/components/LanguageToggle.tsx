"use client";

import { useLanguage } from "./LanguageProvider";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="radiogroup"
      aria-label="Select language / Velg språk"
      className="flex items-center border border-white/[0.12] p-0.5"
    >
      <button
        role="radio"
        aria-checked={lang === "en"}
        aria-label="English"
        onClick={() => setLang("en")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-sm font-medium transition-colors min-w-[44px] min-h-[36px] justify-center ${
          lang === "en"
            ? "bg-white text-black"
            : "text-gray-500 hover:text-white"
        }`}
      >
        <span aria-hidden="true">🇬🇧</span>
        <span className="text-xs">EN</span>
      </button>
      <button
        role="radio"
        aria-checked={lang === "no"}
        aria-label="Norsk"
        onClick={() => setLang("no")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-sm font-medium transition-colors min-w-[44px] min-h-[36px] justify-center ${
          lang === "no"
            ? "bg-white text-black"
            : "text-gray-500 hover:text-white"
        }`}
      >
        <span aria-hidden="true">🇳🇴</span>
        <span className="text-xs">NO</span>
      </button>
    </div>
  );
}
