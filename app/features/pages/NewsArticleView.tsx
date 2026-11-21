import Link from "next/link";
import { notFound } from "next/navigation";
import { htmlLang, pathFor, SITE_URL, urlFor, type Language } from "../../lib/data/content";
import { formatDate, getNewsEntry } from "../../lib/data/load";
import { anchors } from "../../shared/components/Header";
import JsonLd from "../../shared/components/JsonLd";
import Article from "./Article";

export default async function NewsArticleView({ lang, slug }: { lang: Language; slug: string }) {
  const n = await getNewsEntry(slug);
  if (!n) notFound();
  const home = pathFor("home", lang);
  const newsLabel = lang === "no" ? "Nyheter" : "News";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: n.title[lang],
    description: n.excerpt[lang],
    datePublished: n.publishedAt,
    inLanguage: htmlLang[lang],
    mainEntityOfPage: urlFor("news", lang, slug),
    image: [`${SITE_URL}/images/satellite/nordfjord-2025-07-16.jpg`],
    author: { "@type": "Organization", name: "DuxPace", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#org` },
  };

  return (
    <Article
      title={n.title[lang]}
      crumbs={[
        { name: "DuxPace", href: home },
        { name: newsLabel, href: `${home}#${anchors(lang).news}` },
      ]}
      lang={lang}
      route="news"
      slug={slug}
    >
      <JsonLd data={jsonLd} />
      <time dateTime={n.publishedAt} className="mt-4 block text-ink-2">
        {formatDate(n.publishedAt, lang)}
      </time>
      <div className="mt-8 max-w-[65ch]">
        {n.body[lang].split("\n\n").map((p) => (
          <p key={p} className="mt-5 first:mt-0">{p}</p>
        ))}
      </div>
      {n.source && (
        <p className="mt-8">
          {lang === "no" ? "Kilde: " : "Source: "}
          <a href={n.source.url} rel="noopener noreferrer" className="link">{n.source.label[lang]}</a>
        </p>
      )}
      <Link href={`${home}#${anchors(lang).news}`} className="link mt-10 inline-flex min-h-11 items-center font-medium">
        {lang === "no" ? "Alle nyheter" : "All news"}
      </Link>
    </Article>
  );
}
