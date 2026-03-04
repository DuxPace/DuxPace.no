export const siteContent = {
  // ─── Metadata ────────────────────────────────────────────────
  meta: {
    title: "DuxPace - Satellite Intelligence for Aquaculture",
    description:
      "DuxPace uses AI and Sentinel satellite data to detect algal blooms for Norwegian fish farming. Based at Gründerbrakka, NTNU Trondheim.",
  },

  // ─── Navbar ──────────────────────────────────────────────────
  nav: {
    logo: "/images/logos/logo-wide.jpeg",
    sections: ["home", "about", "team", "news", "contact"] as const,
  },

  // ─── Hero ────────────────────────────────────────────────────
  hero: {
    logo: "/images/logos/logo-wide-3.jpeg",
    eyebrow: "Trondheim, Norway — NTNU",
    headline: ["We watch the", "ocean from space."],
    subheading:
      "Satellite imagery and AI for Norwegian aquaculture. We help fish farms detect algal blooms before they cause damage.",
    cta: { label: "See our work", href: "#about" },
    ctaSecondary: { label: "Get in touch →", href: "#contact" },
  },

  // ─── About ───────────────────────────────────────────────────
  about: {
    headline: ["Built at NTNU.", "Focused on fish."],
    body: [
      "We're three engineering students from NTNU building tools to help fish farmers detect algal blooms using Sentinel satellite data — before they cause damage to stock.",
      "Algal blooms are a major threat to Norwegian salmon farming. Our platform processes satellite imagery in near real-time to give farmers the early warning they need.",
    ],
    facts: [
      {
        label: "Our approach",
        text: "Machine learning models trained on Sentinel satellite data to detect bloom patterns, changes, and risk zones — specific to Norwegian coastal conditions.",
      },
      {
        label: "Our partners",
        text: "Working with EquaFish AS, NORCE, Blått Kompetansesenter, Mowi, and NTNU's Hypso satellite program.",
      },
      {
        label: "Where we are",
        text: "Gründerbrakka, NTNU Trondheim — founded June 2024.",
      },
    ],
  },

  // ─── Team ────────────────────────────────────────────────────
  team: {
    headline: "The team",
  },

  // ─── News ────────────────────────────────────────────────────
  news: {
    headline: "What we've been up to",
    subheading: "Updates from the team",
  },

  // ─── Contact ─────────────────────────────────────────────────
  contact: {
    headline: "Say hello.",
    body: "Whether you're in aquaculture, research, or just curious about what we're building, we'd love to hear from you.",
    email: "planet@duxpace.no",
    location: "VM-paviljongen, Trondheim",
    mapEmbed:
      "https://www.google.com/maps?q=VM-paviljongen,Trondheim,Norway&output=embed",
  },

  // ─── Footer ──────────────────────────────────────────────────
  footer: {
    logo: "/images/logos/logo-square.jpeg",
    copyright: "© 2026 DuxPace",
    location: "Trondheim, Norway",
  },
};
