"use client";

import { useEffect, useLayoutEffect } from "react";
import { useLanguage } from "../providers/LanguageProvider";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function HtmlLang() {
  const { lang } = useLanguage();
  useIsomorphicLayoutEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
