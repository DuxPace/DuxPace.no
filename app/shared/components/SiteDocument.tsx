import { Schibsted_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { htmlLang, siteConfig, SITE_URL, translations, urlFor, type Language } from "../../lib/data/content";
import Header from "./Header";
import Footer from "./Footer";
import Consent from "./Consent";
import JsonLd from "./JsonLd";
import "../../globals.css";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-schibsted",
});

export default function SiteDocument({ lang, children }: { lang: Language; children: React.ReactNode }) {
  const t = translations[lang];
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: "DuxPace",
        url: SITE_URL,
        logo: `${SITE_URL}/images/logos/logo-square.jpeg`,
        email: siteConfig.email,
        foundingDate: siteConfig.foundingDate,
        address: {
          "@type": "PostalAddress",
          streetAddress: "VM-paviljongen, Gründerbrakka",
          addressLocality: "Trondheim",
          addressCountry: "NO",
        },
        sameAs: [siteConfig.linkedin],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: urlFor("home", lang),
        name: "DuxPace",
        inLanguage: htmlLang[lang],
        publisher: { "@id": `${SITE_URL}/#org` },
      },
    ],
  };

  return (
    <html lang={htmlLang[lang]} className={schibsted.variable}>
      <body className="min-h-svh flex flex-col">
        <a
          href="#innhold"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:text-paper focus:px-4 focus:py-3 focus:rounded-[var(--radius-control)]"
        >
          {t.skip}
        </a>
        <JsonLd data={orgJsonLd} />
        <Header lang={lang} />
        <main id="innhold" className="flex-1">
          {children}
        </main>
        <Footer lang={lang} />
        <Consent lang={lang} gaId={process.env.NEXT_PUBLIC_GA_ID} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
