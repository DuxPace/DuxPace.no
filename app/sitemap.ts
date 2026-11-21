import type { MetadataRoute } from "next";
import { urlFor, type RouteKey } from "./lib/data/content";
import { getNews } from "./lib/data/load";

export const revalidate = 3600;

function entry(route: RouteKey, slug?: string, lastModified?: string): MetadataRoute.Sitemap {
  const languages = { nb: urlFor(route, "no", slug), en: urlFor(route, "en", slug), "x-default": urlFor(route, "no", slug) };
  return (["no", "en"] as const).map((lang) => ({
    url: urlFor(route, lang, slug),
    lastModified,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const news = await getNews();
  return [
    ...entry("home"),
    ...entry("solution"),
    ...entry("algae"),
    ...entry("privacy"),
    ...news.flatMap((n) => entry("news", n.slug, n.publishedAt)),
  ];
}
