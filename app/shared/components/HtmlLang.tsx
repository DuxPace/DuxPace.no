"use client";

import { useEffect } from "react";
import { useLanguage } from "../providers/LanguageProvider";

export default function HtmlLang() {
  const { lang } = useLanguage();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
