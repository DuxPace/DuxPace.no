import Link from "next/link";
import { SITE_URL, urlFor, type Language, type RouteKey } from "../../lib/data/content";
import JsonLd from "../../shared/components/JsonLd";

type Crumb = { name: string; href: string };

export default function Article({
  title,
  lead,
  crumbs,
  lang,
  route,
  slug,
  children,
}: {
  title: string;
  lead?: string;
  crumbs: Crumb[];
  lang: Language;
  route: RouteKey;
  slug?: string;
  children: React.ReactNode;
}) {
  const items = [...crumbs.map((c) => ({ name: c.name, url: `${SITE_URL}${c.href === "/" ? "" : c.href}` })), { name: title, url: urlFor(route, lang, slug) }];
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.url })),
  };

  return (
    <article className="mx-auto max-w-[76rem] px-5 md:px-10 pt-10 md:pt-16">
      <JsonLd data={breadcrumbLd} />
      <nav aria-label={lang === "no" ? "Brødsmuler" : "Breadcrumb"} className="text-ink-2">
        <ol className="flex flex-wrap gap-x-2">
          {crumbs.map((c) => (
            <li key={c.href} className="after:ml-2 after:content-['/']">
              <Link href={c.href} className="link">{c.name}</Link>
            </li>
          ))}
          <li aria-current="page">{title}</li>
        </ol>
      </nav>
      <h1 className="mt-6 max-w-[22ch] text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
        {title}
      </h1>
      {lead && <p className="mt-6 max-w-[60ch] text-[length:var(--text-lead)] text-ink-2">{lead}</p>}
      {children}
    </article>
  );
}
