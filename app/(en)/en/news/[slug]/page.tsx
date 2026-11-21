import type { Metadata } from "next";
import NewsArticleView from "../../../../features/pages/NewsArticleView";
import { getNews, getNewsEntry } from "../../../../lib/data/load";
import { pageMetadata } from "../../../../lib/meta";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300;
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getNews()).map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const n = await getNewsEntry(slug);
  if (!n) return {};
  return pageMetadata({ lang: "en", route: "news", slug, title: `${n.title.en} | DuxPace`, description: n.excerpt.en, type: "article" });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <NewsArticleView lang="en" slug={slug} />;
}
