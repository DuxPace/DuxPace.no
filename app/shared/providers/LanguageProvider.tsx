"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { translations, type Language } from "../../lib/data/content";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const LANG_COOKIE_MAX_AGE = 365 * 24 * 60 * 60;

function writeLangCookie(value: Language) {
  document.cookie = `lang=${value}; path=/; max-age=${LANG_COOKIE_MAX_AGE}; SameSite=Lax`;
}

type LanguageContextType = {
  lang: Language;
  t: (typeof translations)[Language];
  toggle: () => void;
  setLang: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({
  children,
  initialLang = "en",
}: {
  children: React.ReactNode;
  initialLang?: Language;
}) {
  const [lang, setLangState] = useState<Language>(initialLang);

  useIsomorphicLayoutEffect(() => {
    const saved = localStorage.getItem("lang") as Language | null;
    if (saved === "en" || saved === "no") {
      setLangState(saved);
      writeLangCookie(saved);
    }
  }, []);

  const setLang = (next: Language) => {
    setLangState(next);
    localStorage.setItem("lang", next);
    writeLangCookie(next);
  };

  const toggle = () => setLang(lang === "en" ? "no" : "en");

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggle, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
