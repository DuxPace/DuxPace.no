import type {
  SiteSettings,
  HeroSection,
  AboutSection,
  TeamMember,
  NewsArticle,
  ContactSection,
} from "@/types/sanity";
import { logger } from "./logger";

export type Language = "no" | "en";

interface LocalizedField {
  no?: string;
  en?: string;
}

export function getLocalizedValue(
  field: LocalizedField | null | undefined,
  lang: Language
): string | null {
  if (!field) return null;
  return field[lang] ?? field.en ?? field.no ?? null;
}

export function blocksToText(
  blocks: Array<{ children?: Array<{ text: string }> }> | undefined
): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .map((b) => (b.children || []).map((c) => c.text).join(""))
    .join("\n\n");
}

export function urlFor(source: { asset?: { _ref?: string } } | null | undefined) {
  const fallback = { url: () => "/images/placeholder.jpg" };
  if (!source?.asset?._ref) return fallback;

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  if (!projectId || projectId === "your_project_id_here") return fallback;

  // ref format: image-<hash>-<WxH>-<ext>
  const parts = source.asset._ref.split("-");
  if (parts.length < 4) return fallback;
  const [, hash, dimensions, ext] = parts;
  const filename = `${hash}-${dimensions}.${ext}`;

  return {
    url: () => `https://cdn.sanity.io/images/${projectId}/${dataset}/${filename}`,
  };
}

async function sanityFetch<T>(
  query: string,
  params?: Record<string, string>
): Promise<T | null> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId || projectId === "your_project_id_here") return null;

  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-03-05";
  const useCdn = process.env.NODE_ENV === "production";
  const subdomain = useCdn ? "apicdn" : "api";

  const url = new URL(
    `https://${projectId}.${subdomain}.sanity.io/v${apiVersion}/data/query/${dataset}`
  );
  url.searchParams.set("query", query);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(`$${key}`, JSON.stringify(value));
    }
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Sanity API ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  return data.result as T;
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await sanityFetch<SiteSettings>(`*[_type == "siteSettings"][0]`);
  } catch (err) {
    logger.error("getSiteSettings failed", err instanceof Error ? err : new Error(String(err)));
    return null;
  }
}

export async function getHeroSection(): Promise<HeroSection | null> {
  try {
    return await sanityFetch<HeroSection>(`*[_type == "heroSection"][0]`);
  } catch (err) {
    logger.error("getHeroSection failed", err instanceof Error ? err : new Error(String(err)));
    return null;
  }
}

export async function getAboutSection(): Promise<AboutSection | null> {
  try {
    return await sanityFetch<AboutSection>(`*[_type == "aboutSection"][0]`);
  } catch (err) {
    logger.error("getAboutSection failed", err instanceof Error ? err : new Error(String(err)));
    return null;
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const query = `*[_type == "teamMember"] | order(order asc) {
      _id, name, role, image, bio, linkedin, order
    }`;
    return (await sanityFetch<TeamMember[]>(query)) || [];
  } catch (err) {
    logger.error("getTeamMembers failed", err instanceof Error ? err : new Error(String(err)));
    return [];
  }
}

export async function getNewsArticles(limit?: number): Promise<NewsArticle[]> {
  try {
    const limitClause = limit ? `[0...${limit}]` : "";
    const query = `*[_type == "newsArticle"] | order(publishedAt desc) ${limitClause} {
      _id, title, slug, excerpt, content, image, publishedAt, featured
    }`;
    return (await sanityFetch<NewsArticle[]>(query)) || [];
  } catch (err) {
    logger.error("getNewsArticles failed", err instanceof Error ? err : new Error(String(err)));
    return [];
  }
}

export async function getNewsArticleBySlug(slug: string): Promise<NewsArticle | null> {
  try {
    const query = `*[_type == "newsArticle" && slug.current == $slug][0]`;
    return await sanityFetch<NewsArticle>(query, { slug });
  } catch (err) {
    logger.error(
      `getNewsArticleBySlug failed: ${slug}`,
      err instanceof Error ? err : new Error(String(err))
    );
    return null;
  }
}

export async function getContactSection(): Promise<ContactSection | null> {
  try {
    return await sanityFetch<ContactSection>(`*[_type == "contactSection"][0]`);
  } catch (err) {
    logger.error("getContactSection failed", err instanceof Error ? err : new Error(String(err)));
    return null;
  }
}

interface LocalizedContent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export function localizeContent(
  content: LocalizedContent | null,
  lang: Language
): LocalizedContent | null {
  if (!content) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const localized: { [key: string]: any } = {};

  for (const [key, value] of Object.entries(content)) {
    if (key.startsWith("_")) {
      localized[key] = value;
    } else if (value && typeof value === "object" && ("no" in value || "en" in value)) {
      localized[key] = getLocalizedValue(value as { no?: string; en?: string }, lang);
    } else {
      localized[key] = value;
    }
  }

  return localized;
}
