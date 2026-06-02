import { Suspense } from "react";
import { Navbar } from "./features/layout";
import { Hero, About, Team, News, Contact, Footer } from "./features/home";
import { getNewsArticles, getTeamMembers, urlFor, blocksToText } from "./_lib/sanity";
import { newsItems as staticNews } from "./lib/data/news";
import { members as staticMembers } from "./lib/data/members";
import type { NewsItem } from "./lib/data/news";
import type { Member } from "./lib/data/members";
import type { NewsArticle, TeamMember } from "@/types/sanity";

function formatDate(isoDate: string, locale: string): string {
  try {
    return new Date(isoDate).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return isoDate;
  }
}

function adaptNews(articles: NewsArticle[]): NewsItem[] {
  return articles.map((a) => ({
    image: a.image ? urlFor(a.image).url() : "/images/placeholder.jpg",
    alt: a.title.en || a.title.no || "",
    date: a.publishedAt ? formatDate(a.publishedAt, "en-US") : "",
    dateNo: a.publishedAt ? formatDate(a.publishedAt, "nb-NO") : "",
    title: a.title.en || a.title.no || "",
    titleNo: a.title.no || a.title.en || "",
    description: a.excerpt?.en || a.excerpt?.no || "",
    descriptionNo: a.excerpt?.no || a.excerpt?.en || "",
    content: blocksToText(a.content?.en),
    contentNo: blocksToText(a.content?.no),
  }));
}

function adaptTeam(sanityMembers: TeamMember[]): Member[] {
  return sanityMembers.map((m) => ({
    name: m.name,
    role: m.role.en || m.role.no || "",
    roleNo: m.role.no || m.role.en || "",
    image: m.image ? urlFor(m.image).url() : "/images/placeholder.jpg",
    bio: m.bio?.en || m.bio?.no || "",
    bioNo: m.bio?.no || m.bio?.en || "",
    linkedin: m.linkedin || "",
    email: "planet@duxpace.no",
  }));
}

export default async function Home() {
  const [sanityNews, sanityTeam] = await Promise.all([
    getNewsArticles(),
    getTeamMembers(),
  ]);

  const newsData = sanityNews.length > 0 ? adaptNews(sanityNews) : staticNews;
  const teamData = sanityTeam.length > 0 ? adaptTeam(sanityTeam) : staticMembers;

  return (
    <>
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded focus:text-xs focus:font-semibold focus:tracking-wide focus:uppercase"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <About />
        <Team initialMembers={teamData} />
        <Suspense fallback={<div className="py-20 text-center text-gray-500">Loading news...</div>}>
          <News initialItems={newsData} />
        </Suspense>
        <Contact />
      </main>

      <Footer />
    </>
  );
}
