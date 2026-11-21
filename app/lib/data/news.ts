import type { Language } from "./content";

type Localized = Record<Language, string>;

export type NewsEntry = {
  slug: string;
  publishedAt: string;
  title: Localized;
  excerpt: Localized;
  body: Localized;
  source?: { url: string; label: Localized };
};

// Fallback when Sanity is unreachable. Kept identical to the Sanity documents.
export const newsItems: NewsEntry[] = [
  {
    slug: "ntnu-discovery-300k",
    publishedAt: "2026-05-21",
    title: {
      no: "NTNU Discovery gir DuxPace 300 000 kr",
      en: "NTNU Discovery awards DuxPace 300,000 kr",
    },
    excerpt: {
      no: "DuxPace var ett av tre studentprosjekter som fikk 300 000 kr hver da NTNU Discovery delte ut nye hovedprosjekter 21. mai 2026.",
      en: "DuxPace was one of three student projects awarded 300,000 kr each when NTNU Discovery announced its new main projects on 21 May 2026.",
    },
    body: {
      no: "Torsdag 21. mai 2026 delte NTNU Discovery ut midler til nye hovedprosjekter under et arrangement i regi av StartupTRD på Digs i Trondheim. Tre studentprosjekter fikk 300 000 kr hver, og DuxPace var ett av dem.\n\nNTNU Discovery beskrev DuxPace som et datadrevet beslutningsverktøy for havbruksnæringen, som skal kunne forutsi endringer i havmiljøet.\n\nMidlene går til å utvikle varslene for vannkvalitet videre og til å teste dem mot målinger fra flere lokaliteter.",
      en: "On Thursday 21 May 2026, NTNU Discovery awarded funding to new main projects at an event hosted by StartupTRD at Digs in Trondheim. Three student projects received 300,000 kr each, and DuxPace was one of them.\n\nNTNU Discovery described DuxPace as a data-driven decision tool for the aquaculture industry, built to predict changes in the marine environment.\n\nThe funding goes to developing the water quality forecasts further and testing them against measurements from more sites.",
    },
    source: {
      url: "https://ntnudiscovery.no/atte-millioner-til-nye-hovedprosjekter/",
      label: {
        no: "NTNU Discovery: Åtte millioner til nye hovedprosjekter",
        en: "NTNU Discovery: Åtte millioner til nye hovedprosjekter (Norwegian)",
      },
    },
  },
  {
    slug: "partnerskap-equafish",
    publishedAt: "2026-01-15",
    title: {
      no: "Samarbeid med EquaFish AS",
      en: "Partnership with EquaFish AS",
    },
    excerpt: {
      no: "Etter samtaler fra september 2025 ble samarbeidet med EquaFish AS skrevet ned tidlig i 2026.",
      en: "After talks that started in September 2025, the partnership with EquaFish AS was put in writing in early 2026.",
    },
    body: {
      no: "DuxPace og EquaFish AS begynte å snakke sammen i september 2025 om hvordan data fra satellitt og sensorer kan hjelpe den daglige driften i oppdrett.\n\nTidlig i 2026 ble samarbeidet formalisert skriftlig. DuxPace leverer varsler og indikatorer for miljøforhold som EquaFish kan vise i sin plattform for oppdrettere.",
      en: "DuxPace and EquaFish AS started talking in September 2025 about how satellite and sensor data can help day-to-day fish farming operations.\n\nIn early 2026 the partnership was formalised in writing. DuxPace supplies forecasts and environmental indicators that EquaFish can show in its platform for fish farmers.",
    },
  },
  {
    slug: "aneobidraget-tildelt",
    publishedAt: "2024-12-01",
    title: {
      no: "Tildelt Aneobidraget",
      en: "Aneobidraget grant awarded",
    },
    excerpt: {
      no: "DuxPace fikk 50 000 kr fra Aneobidraget, nok til tre måneders tilgang til Sentinel-data.",
      en: "DuxPace received 50,000 kr from Aneobidraget, enough for three months of Sentinel data access.",
    },
    body: {
      no: "DuxPace fikk 50 000 kr gjennom Aneobidraget, et tilskudd til innovasjon i tidlig fase ved NTNU.\n\nPengene ga tre måneders tilgang til Sentinel-satellittdata, slik at vi kunne bygge den første versjonen og teste den på ekte bilder.",
      en: "DuxPace received 50,000 kr through Aneobidraget, a grant for early-stage innovation at NTNU.\n\nThe money paid for three months of Sentinel satellite data access, so we could build a first version and test it on real imagery.",
    },
  },
  {
    slug: "duxpace-stiftet",
    publishedAt: "2024-06-01",
    title: {
      no: "DuxPace startet ved NTNU",
      en: "DuxPace started at NTNU",
    },
    excerpt: {
      no: "DuxPace startet ved NTNU i Trondheim i juni 2024. Havbruk ble hovedsporet etter hvert.",
      en: "DuxPace started at NTNU in Trondheim in June 2024. Aquaculture became the main track over time.",
    },
    body: {
      no: "DuxPace startet ved NTNU i Trondheim i juni 2024, med et mål om å gjøre satellittdata nyttig i praksis.\n\nI starten så vi på flere bruksområder. Etter hvert ble havbruk hovedsporet, og arbeidet dreide mot varsler for vannkvalitet ved oppdrettslokaliteter.\n\nI januar 2026 flyttet vi inn på Gründerbrakka på VM-paviljongen.",
      en: "DuxPace started at NTNU in Trondheim in June 2024, with the aim of making satellite data useful in practice.\n\nAt first we looked at several uses. Over time aquaculture became the main track, and the work turned toward water quality forecasts for fish farming sites.\n\nIn January 2026 we moved into Gründerbrakka at VM-paviljongen.",
    },
  },
];
