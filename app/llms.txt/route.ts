import { siteConfig } from "../lib/data/content";
import { translations } from "../lib/data/content";

const BASE = "https://duxpace.no";

const SECTION_TITLES: Record<string, string> = {
  home: "Home",
  about: "About",
  team: "Team",
  news: "News",
  contact: "Contact",
};

export function GET() {
  const en = translations.en;
  const pages = siteConfig.nav.sections
    .map((s) => {
      const href = s === "home" ? `${BASE}/` : `${BASE}/#${s}`;
      return `- [${SECTION_TITLES[s] ?? s}](${href})`;
    })
    .join("\n");

  const body = [
    "# DuxPace",
    "",
    `> ${en.meta.description}`,
    "",
    en.hero.subheading,
    "",
    "## Pages",
    pages,
    "",
    "## Contact",
    `- Email: ${siteConfig.contact.email}`,
    `- Location: ${siteConfig.contact.location}`,
    `- LinkedIn: ${siteConfig.contact.linkedin}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
