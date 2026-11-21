import { siteConfig, translations, urlFor } from "../lib/data/content";
import { solutionCopy } from "../features/pages/SolutionView";
import { algaeCopy } from "../features/pages/AlgaeView";

export const dynamic = "force-static";

export function GET() {
  const en = translations.en.meta;
  const body = [
    "# DuxPace",
    "",
    `> ${en.description}`,
    "",
    "DuxPace forecasts water temperature, oxygen and salinity 48 hours ahead for individual salmon farming sites in Norway, from in-pen sensors, with calibrated 80 percent uncertainty bands. It does not claim to predict algal blooms from satellite.",
    "",
    "## Pages",
    `- [Home (Norwegian)](${urlFor("home", "no")})`,
    `- [Home (English)](${urlFor("home", "en")})`,
    `- [${solutionCopy.en.title}](${urlFor("solution", "en")}): ${solutionCopy.en.description}`,
    `- [${algaeCopy.en.title}](${urlFor("algae", "en")}): ${algaeCopy.en.description}`,
    "",
    "## Contact",
    `- Email: ${siteConfig.email}`,
    `- Address: ${siteConfig.address}`,
    `- LinkedIn: ${siteConfig.linkedin}`,
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
