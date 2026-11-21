import { getNewsArticles, blocksToText } from "../../_lib/sanity";
import type { NewsArticle } from "@/types/sanity";
import { newsItems, type NewsEntry } from "./news";

function fromSanity(a: NewsArticle): NewsEntry {
  const local = newsItems.find((n) => n.slug === a.slug?.current);
  const pick = (f?: { en?: string; no?: string }) => ({
    no: f?.no || f?.en || "",
    en: f?.en || f?.no || "",
  });
  return {
    slug: a.slug.current,
    publishedAt: a.publishedAt.slice(0, 10),
    title: pick(a.title),
    excerpt: pick(a.excerpt),
    body: pick({ no: blocksToText(a.content?.no), en: blocksToText(a.content?.en) }),
    source: local?.source,
  };
}

export async function getNews(): Promise<NewsEntry[]> {
  const articles = await getNewsArticles();
  const usable = articles.filter((a) => a.slug?.current && a.publishedAt);
  return usable.length > 0 ? usable.map(fromSanity) : newsItems;
}

export async function getNewsEntry(slug: string): Promise<NewsEntry | undefined> {
  return (await getNews()).find((n) => n.slug === slug);
}

export function formatDate(iso: string, lang: "no" | "en"): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString(lang === "no" ? "nb-NO" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
