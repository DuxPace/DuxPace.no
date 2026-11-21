import Image from "next/image";
import Link from "next/link";
import { pathFor, translations, type Language } from "../../lib/data/content";
import LangSwitch from "./LangSwitch";

export function anchors(lang: Language) {
  return lang === "no" ? { news: "nyheter", contact: "kontakt" } : { news: "news", contact: "contact" };
}

export function Wordmark({ tone = "ink" }: { tone?: "ink" | "light" }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image src="/images/logos/mark.png" alt="" width={228} height={273} className="h-8 w-auto" priority />
      <span className={`text-xl font-extrabold tracking-tight ${tone === "ink" ? "text-ink" : "text-on-deep"}`}>
        DuxPace
      </span>
    </span>
  );
}

export default function Header({ lang }: { lang: Language }) {
  const t = translations[lang].nav;
  const home = pathFor("home", lang);
  const a = anchors(lang);
  const homeAnchor = (id: string) => `${home}#${id}`;
  const links = [
    { href: pathFor("solution", lang), label: t.solution },
    { href: pathFor("algae", lang), label: t.algae },
    { href: homeAnchor(a.news), label: t.news },
    { href: homeAnchor(a.contact), label: t.contact },
  ];
  const linkClass =
    "inline-flex min-h-11 items-center px-3 font-medium transition-colors duration-150 hover:text-magenta active:text-ink-2";

  return (
    <header className="sticky top-0 z-40 bg-paper/95 border-b border-rule">
      <div className="mx-auto flex h-[4.5rem] max-w-[76rem] items-center justify-between px-5 md:px-10">
        <Link href={home} className="inline-flex min-h-11 items-center" aria-label="DuxPace">
          <Wordmark />
        </Link>

        <nav aria-label={t.label} className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass}>
              {l.label}
            </Link>
          ))}
          <span className="mx-2 h-5 w-px bg-rule" aria-hidden="true" />
          <LangSwitch lang={lang} label={t.switchLabel} aria={t.switchAria} />
        </nav>

        <details className="md:hidden group relative">
          <summary className="list-none inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-[var(--radius-control)] border border-ink-2 px-4 font-medium [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">{t.menu}</span>
            <span className="hidden group-open:inline">{t.close}</span>
          </summary>
          <nav
            aria-label={t.label}
            className="absolute right-0 top-[calc(100%+0.75rem)] w-64 rounded-[var(--radius-block)] bg-sea p-3 flex flex-col"
          >
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
            <LangSwitch lang={lang} label={t.switchLabel} aria={t.switchAria} />
          </nav>
        </details>
      </div>
    </header>
  );
}
