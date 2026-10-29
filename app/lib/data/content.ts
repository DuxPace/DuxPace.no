// ─── Non-translatable config ─────────────────────────────────
export const siteConfig = {
  nav: {
    logo: "/images/logos/logo-wide.png",
    sections: ["home", "about", "team", "news", "contact"] as const,
  },
  hero: {
    logo: "/images/logos/logo-wide-3.jpeg",
  },
  contact: {
    email: "planet@duxpace.no",
    location: "Gründerbrakka, VM-paviljongen, Trondheim",
    mapEmbed: "https://www.google.com/maps?q=Gründerbrakka,VM-paviljongen,Trondheim,Norway&output=embed",
    linkedin: "https://linkedin.com/company/duxpace",
  },
  footer: {
    logo: "/images/logos/logo-square.jpeg",
    copyright: "DuxPace",
  },
};

// Funders and partners credited in the footer. Rendered height in px keeps marks at a similar optical size.
export const partners = [
  { name: "NTNU Discovery", href: "https://www.ntnudiscovery.no/", logo: "/images/logos/ntnu-discovery.png", width: 138, height: 128, render: 56 },
  { name: "Aneo", href: "https://www.aneo.com/", logo: "/images/logos/aneo.svg", width: 47, height: 13, render: 16 },
  { name: "Spark* NTNU", href: "https://sparkntnu.no/", logo: "/images/logos/spark.png", width: 127, height: 128, render: 28, showName: true },
  { name: "EquaFish", href: "https://equafish.com/", logo: "/images/logos/equafish.svg", width: 648, height: 393, render: 44 },
];

// ─── Translations ─────────────────────────────────────────────
export const translations = {
  en: {
    meta: {
      title: "DuxPace - Satellite Intelligence for Aquaculture",
      description:
        "DuxPace uses AI and Sentinel satellite data to detect algal blooms and other risk factors for Norwegian fish farming. Based at VM-paviljongen, Trondheim.",
    },
    nav: {
      home: "Home",
      about: "About",
      team: "Team",
      news: "News",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Trondheim, Norway - NTNU",
      headline: ["We watch the", "ocean from space."],
      subheading:
        "Satellite imagery and AI for Norwegian aquaculture. We help fish farms detect algal blooms before they cause damage. Expanding to more use cases over time.",
      cta: { label: "See our work", href: "#about" },
      ctaSecondary: { label: "Get in touch →", href: "#contact" },
    },
    about: {
      headline: ["Built at NTNU.", "Focused on fish."],
      body: [
        "We're three engineering students from NTNU building tools to help fish farmers detect algal blooms using Sentinel satellite data - before they cause damage to stock.",
        "Algal blooms are a major threat to Norwegian salmon farming. Our platform processes satellite imagery in near real-time to give farmers the early warning they need.",
      ],
      facts: [
        {
          label: "Our approach",
          text: "Machine learning models trained on Sentinel satellite data to detect bloom patterns, changes, and risk zones - specific to Norwegian coastal conditions.",
        },
        {
          label: "Our partners",
          text: "Working with EquaFish AS and other aquaculture companies.",
        },
        {
          label: "Where we are",
          text: "VM-paviljongen, Trondheim - founded June 2024.",
        },
      ],
    },
    team: {
      headline: "The team",
    },
    news: {
      headline: "What we've been up to",
      subheading: "Updates from the team",
      readMore: "Read more",
    },
    contact: {
      headline: "Say hello.",
      body: "Whether you're in aquaculture, research, or just curious about what we're building, we'd love to hear from you.",
      formTitle: "Send us a message",
      nameLabel: "Name",
      emailLabel: "Email",
      locationLabel: "Location",
      messageLabel: "Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      messagePlaceholder: "How can we help you?",
      send: "Send →",
      sending: "Sending...",
      successTitle: "Message sent!",
      successBody: "We'll be in touch soon.",
      sendAnother: "Send another message",
    },
    footer: {
      location: "Trondheim, Norway",
      supportedBy: "Supported by",
    },
    notFound: {
      code: "404",
      title: "Page not found",
      body: "The page you're looking for doesn't exist.",
      home: "Go home",
    },
  },

  no: {
    meta: {
      title: "DuxPace - Satellittintelligens for havbruk",
      description:
        "DuxPace bruker KI og Sentinel-satellittdata for å oppdage algeoppblomstringer i norsk fiskeoppdrett. Holder til på VM-paviljongen, Trondheim.",
    },
    nav: {
      home: "Hjem",
      about: "Om oss",
      team: "Team",
      news: "Nyheter",
      contact: "Kontakt",
    },
    hero: {
      eyebrow: "Trondheim, Norge - NTNU",
      headline: ["Vi overvåker", "havet fra verdensrommet."],
      subheading:
        "Satellittbilder og KI for norsk havbruk. Vi hjelper fiskeoppdrettere med å oppdage algeoppblomstringer før de gjør skade.",
      cta: { label: "Se hva vi gjør", href: "#about" },
      ctaSecondary: { label: "Ta kontakt →", href: "#contact" },
    },
    about: {
      headline: ["Bygget ved NTNU.", "Fokusert på fisk."],
      body: [
        "Vi er tre ingeniørstudenter fra NTNU som bygger verktøy for å hjelpe fiskeoppdrettere med å oppdage algeoppblomstringer ved hjelp av Sentinel-satellittdata - før de gjør skade på bestanden.",
        "Algeoppblomstringer er en stor trussel mot norsk lakseoppdrett. Plattformen vår behandler satellittbilder i nær sanntid for å gi oppdretterne den tidlige varslingen de trenger.",
      ],
      facts: [
        {
          label: "Vår tilnærming",
          text: "Maskinlæringsmodeller trent på Sentinel-satellittdata for å oppdage blomstermønstre, endringer og risikosoner - spesifikke for norske kystforhold.",
        },
        {
          label: "Våre partnere",
          text: "Samarbeider med EquaFish AS og andre oppdrettsselskap.",
        },
        {
          label: "Hvor vi er",
          text: "VM-paviljongen, Trondheim - stiftet juni 2024.",
        },
      ],
    },
    team: {
      headline: "Teamet",
    },
    news: {
      headline: "Hva vi har drevet med",
      subheading: "Oppdateringer fra teamet",
      readMore: "Les mer",
    },
    contact: {
      headline: "Si hei.",
      body: "Enten du er innen havbruk, forskning eller bare er nysgjerrig på det vi bygger - vi vil gjerne høre fra deg.",
      formTitle: "Send oss en melding",
      nameLabel: "Navn",
      emailLabel: "E-post",
      locationLabel: "Sted",
      messageLabel: "Melding",
      namePlaceholder: "Ditt navn",
      emailPlaceholder: "din@epost.no",
      messagePlaceholder: "Hvordan kan vi hjelpe deg?",
      send: "Send →",
      sending: "Sender...",
      successTitle: "Melding sendt!",
      successBody: "Vi tar kontakt snart.",
      sendAnother: "Send en ny melding",
    },
    footer: {
      location: "Trondheim, Norge",
      supportedBy: "Støttet av",
    },
    notFound: {
      code: "404",
      title: "Siden finnes ikke",
      body: "Siden du leter etter finnes ikke.",
      home: "Til forsiden",
    },
  },
} as const;

export type Language = keyof typeof translations;
