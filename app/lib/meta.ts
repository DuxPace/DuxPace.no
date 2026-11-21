import type { Metadata } from "next";
import { alternatesFor, ogLocale, SITE_URL, urlFor, type Language, type RouteKey } from "./data/content";

export function pageMetadata({
  lang,
  route,
  slug,
  title,
  description,
  type = "website",
}: {
  lang: Language;
  route: RouteKey;
  slug?: string;
  title: string;
  description: string;
  type?: "website" | "article";
}): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: alternatesFor(route, lang, slug),
    openGraph: {
      title,
      description,
      url: urlFor(route, lang, slug),
      siteName: "DuxPace",
      locale: ogLocale[lang],
      alternateLocale: ogLocale[lang === "no" ? "en" : "no"],
      type,
    },
    twitter: { card: "summary_large_image", title, description },
    icons: [
      { rel: "icon", url: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", url: "/favicon.png" },
    ],
  };
}
