export type Language = "no" | "en";

export const SITE_URL = "https://www.duxpace.no";

// BCP 47 tag for <html lang> and hreflang. Content keys stay "no" for history.
export const htmlLang: Record<Language, string> = { no: "nb", en: "en" };
export const ogLocale: Record<Language, string> = { no: "nb_NO", en: "en_US" };

export const routes = {
  home: { no: "/", en: "/en" },
  solution: { no: "/losning", en: "/en/solution" },
  algae: { no: "/alger", en: "/en/algae" },
  news: { no: "/nyheter", en: "/en/news" },
  privacy: { no: "/personvern", en: "/en/privacy" },
} as const;

export type RouteKey = keyof typeof routes;

export function pathFor(route: RouteKey, lang: Language, slug?: string): string {
  const base = routes[route][lang];
  return slug ? `${base}/${slug}` : base;
}

export function urlFor(route: RouteKey, lang: Language, slug?: string): string {
  const p = pathFor(route, lang, slug);
  return p === "/" ? SITE_URL : `${SITE_URL}${p}`;
}

// Metadata alternates: canonical to self, reciprocal hreflang, Norwegian as x-default.
export function alternatesFor(route: RouteKey, lang: Language, slug?: string) {
  return {
    canonical: urlFor(route, lang, slug),
    languages: {
      nb: urlFor(route, "no", slug),
      en: urlFor(route, "en", slug),
      "x-default": urlFor(route, "no", slug),
    },
  };
}

export const siteConfig = {
  email: "planet@duxpace.no",
  address: "Gründerbrakka, VM-paviljongen, Trondheim",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=VM-paviljongen%2C+Trondheim",
  linkedin: "https://www.linkedin.com/company/duxpace",
  foundingDate: "2024-06-01",
};

// Funders and partners credited in the footer. Rendered height keeps marks at a similar optical size.
export const partners = [
  { name: "NTNU Discovery", href: "https://www.ntnudiscovery.no/", logo: "/images/logos/ntnu-discovery.png", width: 138, height: 128, render: 44 },
  { name: "Aneo", href: "https://www.aneo.com/", logo: "/images/logos/aneo.svg", width: 47, height: 13, render: 16, dark: true },
  { name: "Spark* NTNU", href: "https://sparkntnu.no/", logo: "/images/logos/spark.png", width: 127, height: 128, render: 28, showName: true },
  { name: "EquaFish", href: "https://equafish.com/", logo: "/images/logos/equafish.svg", width: 648, height: 393, render: 36 },
];

export const translations = {
  no: {
    meta: {
      title: "DuxPace: vannkvalitet 48 timer frem for havbruk",
      description:
        "DuxPace varsler temperatur, oksygen og saltholdighet 48 timer frem for oppdrettslokaliteter, med kalibrerte usikkerhetsbånd. Bygget ved NTNU i Trondheim.",
    },
    skip: "Hopp til innholdet",
    nav: {
      label: "Hovedmeny",
      solution: "Løsningen",
      algae: "Alger",
      news: "Nyheter",
      contact: "Kontakt",
      menu: "Meny",
      close: "Lukk menyen",
      switchLabel: "English",
      switchAria: "Read this page in English",
    },
    contact: {
      heading: "Kontakt",
      body: "Fortell oss hvilken lokalitet det gjelder, eller hva du lurer på, så svarer en av oss på e-post.",
      emailLabel: "E-post",
      addressLabel: "Adresse",
      formTitle: "Send en melding",
      name: "Navn",
      email: "E-post",
      topic: "Hva gjelder det?",
      topics: {
        site: "Varsel for en lokalitet",
        insurance: "Forsikring",
        research: "Forskning eller finansiering",
        other: "Noe annet",
      },
      message: "Melding",
      messageHint: "Lokalitetsnavn eller -nummer hjelper oss å svare raskere.",
      required: "påkrevd",
      send: "Send melding",
      sending: "Sender",
      successTitle: "Takk, meldingen er sendt.",
      successBody: "Vi svarer på e-postadressen du oppga.",
      sendAnother: "Send en ny melding",
    },
    footer: {
      tagline: "Vannkvalitetsvarsel for havbruk, fra Trondheim.",
      supportedBy: "Støttet av",
      pages: "Sider",
      privacy: "Personvern",
      cookies: "Informasjonskapsler",
    },
    consent: {
      title: "Informasjonskapsler",
      body: "Vi vil gjerne bruke Google Analytics for å se hvilke sider som blir lest. Det setter informasjonskapsler, så vi spør først. Siden virker like godt om du sier nei.",
      accept: "Godta statistikk",
      reject: "Avslå",
      more: "Les mer om personvern",
    },
    notFound: {
      title: "Siden finnes ikke",
      body: "Lenken kan være gammel, eller adressen kan ha en skrivefeil.",
      home: "Til forsiden",
    },
  },
  en: {
    meta: {
      title: "DuxPace: water quality 48 hours ahead for fish farms",
      description:
        "DuxPace forecasts temperature, oxygen and salinity 48 hours ahead for salmon farming sites, with calibrated uncertainty bands. Built at NTNU in Trondheim, Norway.",
    },
    skip: "Skip to content",
    nav: {
      label: "Main menu",
      solution: "Solution",
      algae: "Algae",
      news: "News",
      contact: "Contact",
      menu: "Menu",
      close: "Close menu",
      switchLabel: "Norsk",
      switchAria: "Les denne siden på norsk",
    },
    contact: {
      heading: "Contact",
      body: "Tell us which site you have in mind, or what you want to know, and one of us will answer by email.",
      emailLabel: "Email",
      addressLabel: "Address",
      formTitle: "Send a message",
      name: "Name",
      email: "Email",
      topic: "What is it about?",
      topics: {
        site: "A forecast for a site",
        insurance: "Insurance",
        research: "Research or funding",
        other: "Something else",
      },
      message: "Message",
      messageHint: "A site name or number helps us answer faster.",
      required: "required",
      send: "Send message",
      sending: "Sending",
      successTitle: "Thanks, your message is on its way.",
      successBody: "We will reply to the email address you gave.",
      sendAnother: "Send another message",
    },
    footer: {
      tagline: "Water quality forecasts for aquaculture, from Trondheim.",
      supportedBy: "Supported by",
      pages: "Pages",
      privacy: "Privacy",
      cookies: "Cookies",
    },
    consent: {
      title: "Cookies",
      body: "We would like to use Google Analytics to see which pages get read. It sets cookies, so we ask first. The site works just as well if you say no.",
      accept: "Allow statistics",
      reject: "Decline",
      more: "Read the privacy notice",
    },
    notFound: {
      title: "Page not found",
      body: "The link may be old, or the address may have a typo.",
      home: "Go to the front page",
    },
  },
} as const;

export type Strings = (typeof translations)[Language];
