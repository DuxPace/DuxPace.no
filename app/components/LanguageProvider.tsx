"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, type Language } from "../data/content";

type LanguageContextType = {
  lang: Language;
  t: (typeof translations)[Language];
  toggle: () => void;
  setLang: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Language | null;
    if (saved === "en" || saved === "no") setLangState(saved);
  }, []);

  const setLang = (next: Language) => {
    setLangState(next);
    localStorage.setItem("lang", next);
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
