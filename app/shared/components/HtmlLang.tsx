"use client";

import { useLayoutEffect } from "react";
import { useLanguage } from "../providers/LanguageProvider";

export default function HtmlLang() {
  const { lang } = useLanguage();
  useLayoutEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
