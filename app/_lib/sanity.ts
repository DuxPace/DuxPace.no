/* eslint-disable @typescript-eslint/no-require-imports */

import type { SanityClient } from "@sanity/client";
import {
  SiteSettings,
  HeroSection,
  AboutSection,
  TeamMember,
  NewsArticle,
  ContactSection,
} from "@/types/sanity";

// Lazy initialization - only create client when needed
let clientInstance: SanityClient | null = null;
let builderInstance: ReturnType<typeof import("@sanity/image-url").default> | null = null;

function getClient(): SanityClient {
  if (clientInstance) return clientInstance;

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  if (!projectId || projectId === "your_project_id_here") {
    // Return mock client when Sanity is not configured
    return { fetch: async () => null } as unknown as SanityClient;
  }

  // Dynamic import to avoid build-time issues
  const { createClient } = require("@sanity/client");
  clientInstance = createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-03-05",
    useCdn: true,
    perspective: "published",
  }) as SanityClient;

  return clientInstance;
}

function getBuilder() {
  if (builderInstance) return builderInstance;
  const { default: imageUrlBuilder } = require("@sanity/image-url");
  builderInstance = imageUrlBuilder(getClient());
  return builderInstance;
}

// Export a proxy that lazy-loads the client
export const client = new Proxy({} as SanityClient, {
  get(_target, prop) {
    const actualClient = getClient();
    return actualClient ? actualClient[prop as keyof SanityClient] : undefined;
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  try {
    const builder = getBuilder();
    if (!builder) {
      throw new Error("Builder not available");
    }
    return builder.image(source);
  } catch {
    return {
      url: () => "/images/placeholder.jpg",
      width: () => ({ url: () => "/images/placeholder.jpg" }),
      height: () => ({ url: () => "/images/placeholder.jpg" }),
    };
  }
}

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

// QUERIES
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const query = `*[_type == "siteSettings"][0]`;
    return (await client.fetch(query)) || null;
  } catch {
    return null;
  }
}

export async function getHeroSection(): Promise<HeroSection | null> {
  try {
    const query = `*[_type == "heroSection"][0]`;
    return (await client.fetch(query)) || null;
  } catch {
    return null;
  }
}

export async function getAboutSection(): Promise<AboutSection | null> {
  try {
    const query = `*[_type == "aboutSection"][0]`;
    return (await client.fetch(query)) || null;
  } catch {
    return null;
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const query = `*[_type == "teamMember"] | order(order asc) {
      _id, name, role, image, bio, linkedin, order
    }`;
    return (await client.fetch(query)) || [];
  } catch {
    return [];
  }
}

export async function getNewsArticles(limit?: number): Promise<NewsArticle[]> {
  try {
    const limitClause = limit ? `[0...${limit}]` : "";
    const query = `*[_type == "newsArticle"] | order(publishedAt desc) ${limitClause} {
      _id, title, slug, excerpt, image, publishedAt, featured
    }`;
    return (await client.fetch(query)) || [];
  } catch {
    return [];
  }
}

export async function getNewsArticleBySlug(slug: string): Promise<NewsArticle | null> {
  try {
    const query = `*[_type == "newsArticle" && slug.current == $slug][0]`;
    return (await client.fetch(query, { slug })) || null;
  } catch {
    return null;
  }
}

export async function getContactSection(): Promise<ContactSection | null> {
  try {
    const query = `*[_type == "contactSection"][0]`;
    return (await client.fetch(query)) || null;
  } catch {
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
