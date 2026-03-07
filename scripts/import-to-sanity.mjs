#!/usr/bin/env node
/**
 * Import existing content to Sanity CMS
 *
 * Usage:
 * 1. Set SANITY_WRITE_TOKEN in .env.local
 * 2. Run: node scripts/import-to-sanity.mjs
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-03-05",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

// Existing content from the website
const siteSettings = {
  _type: "siteSettings",
  title: {
    no: "DuxPace - Satellittdata for havbruk",
    en: "DuxPace - Satellite Data for Aquaculture",
  },
  description: {
    no: "Tidlig varsling av algeoppblomstringer for fiskeoppdrett ved hjelp av satellittdata og AI.",
    en: "Early warning of algal blooms for fish farming using satellite data and AI.",
  },
  contactEmail: "post@duxpace.no",
  socialLinks: {
    linkedin: "https://linkedin.com/company/duxpace",
    twitter: "https://twitter.com/duxpace",
    github: "https://github.com/duxpace",
  },
};

const heroSection = {
  _type: "heroSection",
  title: {
    no: "Tidlig varsling\nfor havbruket",
    en: "Early Warning\nfor Aquaculture",
  },
  subtitle: {
    no: "Satellittdata og kunstig intelligens for å oppdage alger før de skader fiskebestanden.",
    en: "Satellite data and artificial intelligence to detect algae before they damage fish stocks.",
  },
  ctaText: {
    no: "Kontakt oss",
    en: "Contact us",
  },
  ctaLink: "#contact",
};

const aboutSection = {
  _type: "aboutSection",
  title: {
    no: "Satellittdata for havbruk",
    en: "Satellite data for aquaculture",
  },
  content: {
    no: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Vi er tre ingeniørstudenter fra NTNU som utvikler verktøy for å oppdage algeoppblomstringer før de skader fiskebestanden. Ved å bruke Sentinel-satellittdata og maskinlæring gir vi oppdrettere tidlig varsel.",
          },
        ],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Vår plattform behandler satellittbilder i nær sanntid og identifiserer risikoområder langs norskekysten.",
          },
        ],
      },
    ],
    en: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "We're three engineering students from NTNU developing tools to detect algal blooms before they damage fish stocks. Using Sentinel satellite data and machine learning, we give farmers early warning.",
          },
        ],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Our platform processes satellite imagery in near real-time and identifies risk areas along the Norwegian coast.",
          },
        ],
      },
    ],
  },
  missionTitle: {
    no: "Vår tilnærming",
    en: "Our approach",
  },
  missionContent: {
    no: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Maskinlæringsmodeller trent på Sentinel-satellittdata for å oppdage blomstermønstre og risikosoner.",
          },
        ],
      },
    ],
    en: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Machine learning models trained on Sentinel satellite data to detect bloom patterns and risk zones.",
          },
        ],
      },
    ],
  },
};

const contactSection = {
  _type: "contactSection",
  title: {
    no: "Kontakt oss",
    en: "Contact us",
  },
  subtitle: {
    no: "Har du spørsmål om vår teknologi? Ta kontakt.",
    en: "Have questions about our technology? Get in touch.",
  },
  formLabels: {
    name: {
      no: "Navn",
      en: "Name",
    },
    email: {
      no: "E-post",
      en: "Email",
    },
    message: {
      no: "Melding",
      en: "Message",
    },
    submit: {
      no: "Send melding",
      en: "Send message",
    },
    success: {
      no: "Takk for din henvendelse! Vi vil kontakte deg snart.",
      en: "Thank you for your inquiry! We will contact you soon.",
    },
    error: {
      no: "Det oppstod en feil. Vennligst prøv igjen senere.",
      en: "An error occurred. Please try again later.",
    },
  },
  contactInfo: {
    email: "post@duxpace.no",
    phone: "",
    address: {
      no: "VM-paviljongen, Trondheim",
      en: "VM-paviljongen, Trondheim, Norway",
    },
  },
};

async function importDocuments() {
  console.log("🚀 Starting import to Sanity...\n");

  try {
    // Import Site Settings
    console.log("📄 Importing Site Settings...");
    await client.createOrReplace({ ...siteSettings, _id: "siteSettings" });
    console.log("✅ Site Settings imported\n");

    // Import Hero Section
    console.log("🦸 Importing Hero Section...");
    await client.createOrReplace({ ...heroSection, _id: "heroSection" });
    console.log("✅ Hero Section imported\n");

    // Import About Section
    console.log("ℹ️  Importing About Section...");
    await client.createOrReplace({ ...aboutSection, _id: "aboutSection" });
    console.log("✅ About Section imported\n");

    // Import Contact Section
    console.log("📧 Importing Contact Section...");
    await client.createOrReplace({ ...contactSection, _id: "contactSection" });
    console.log("✅ Contact Section imported\n");

    console.log("🎉 All content imported successfully!");
    console.log("\nNext steps:");
    console.log("1. Import team members manually in Sanity Studio");
    console.log("2. Add images to team members");
    console.log("3. Create news articles");
    console.log("4. Update social media links in Site Settings");
  } catch (error) {
    console.error("❌ Import failed:", error.message);
    process.exit(1);
  }
}

// Check if running directly
if (import.meta.url === `file://${process.argv[1]}`) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error("❌ NEXT_PUBLIC_SANITY_PROJECT_ID is not set");
    console.log("Please set it in your environment variables");
    process.exit(1);
  }

  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error("❌ SANITY_WRITE_TOKEN is not set");
    console.log("Please add SANITY_WRITE_TOKEN to .env.local");
    console.log("Get your token at: https://sanity.io/manage");
    process.exit(1);
  }

  importDocuments();
}

export { importDocuments };
