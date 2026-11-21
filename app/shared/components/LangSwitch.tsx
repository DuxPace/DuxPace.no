"use client";

import { usePathname } from "next/navigation";
import { routes, type Language } from "../../lib/data/content";

// Maps the current path to the same page in the other language, keeping any slug.
function otherPath(pathname: string, lang: Language): string {
  const to: Language = lang === "no" ? "en" : "no";
  const keys = Object.keys(routes) as (keyof typeof routes)[];
  for (const key of keys) {
    const base = routes[key][lang];
    if (base === "/" || base === "/en") continue;
    if (pathname === base || pathname.startsWith(`${base}/`)) {
      return routes[key][to] + pathname.slice(base.length);
    }
  }
  return routes.home[to];
}

export default function LangSwitch({ lang, label, aria }: { lang: Language; label: string; aria: string }) {
  const pathname = usePathname() ?? "/";
  const to = lang === "no" ? "en" : "nb";
  return (
    <a
      href={otherPath(pathname, lang)}
      hrefLang={to}
      lang={to}
      aria-label={aria}
      className="inline-flex min-h-11 items-center px-3 font-medium underline decoration-1 underline-offset-4 transition-colors duration-150 hover:text-magenta"
    >
      {label}
    </a>
  );
}
