import Image from "next/image";
import Link from "next/link";
import { partners, pathFor, siteConfig, translations, type Language } from "../../lib/data/content";
import { Wordmark } from "./Header";
import { CookieSettingsButton } from "./Consent";

export default function Footer({ lang }: { lang: Language }) {
  const t = translations[lang];
  const linkClass = "inline-flex min-h-11 items-center transition-colors duration-150 hover:text-paper underline-offset-4 hover:underline";

  return (
    <footer className="bg-deep text-on-deep mt-24 md:mt-36">
      <div className="mx-auto max-w-[76rem] px-5 md:px-10 pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark tone="light" />
            <p className="mt-4 max-w-sm text-on-deep-2">{t.footer.tagline}</p>
            <p className="mt-6 text-on-deep-2">
              <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                {siteConfig.email}
              </a>
              <br />
              {siteConfig.address}
            </p>
          </div>

          <nav aria-label={t.footer.pages} className="md:col-span-3 flex flex-col text-on-deep-2">
            <Link href={pathFor("solution", lang)} className={linkClass}>{t.nav.solution}</Link>
            <Link href={pathFor("algae", lang)} className={linkClass}>{t.nav.algae}</Link>
            <Link href={pathFor("privacy", lang)} className={linkClass}>{t.footer.privacy}</Link>
            {process.env.NEXT_PUBLIC_GA_ID && (
              <CookieSettingsButton label={t.footer.cookies} className={`${linkClass} text-left`} />
            )}
            <a href={siteConfig.linkedin} className={linkClass} rel="noopener noreferrer">LinkedIn</a>
          </nav>

          <div className="md:col-span-4">
            <p className="text-on-deep-2">{t.footer.supportedBy}</p>
            <ul className="mt-4 flex flex-wrap items-center gap-3">
              {partners.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.href}
                    rel="noopener noreferrer"
                    className={`flex h-16 min-w-16 items-center justify-center gap-2 rounded-[var(--radius-block)] px-4 transition-colors duration-150 ${
                      "dark" in p ? "bg-ink outline outline-1 outline-on-deep-2/40 hover:bg-deep" : "bg-paper text-ink hover:bg-sea"
                    }`}
                  >
                    <Image
                      src={p.logo}
                      alt={"showName" in p ? "" : p.name}
                      width={p.width}
                      height={p.height}
                      style={{ height: p.render, width: "auto" }}
                    />
                    {"showName" in p && <span className="font-semibold">{p.name}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-14 text-sm text-on-deep-2">© {new Date().getFullYear()} DuxPace</p>
      </div>
    </footer>
  );
}
