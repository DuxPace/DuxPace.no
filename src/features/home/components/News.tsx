import { NewsPreview } from "./NewsPreview"

const NEWS_ITEMS = [
  {
    _id: "ntnu-discovery-main",
    title: {
      no: "DuxPace fikk hovedprosjekt godkjent hos NTNU Discovery",
      en: "DuxPace approved for NTNU Discovery main project",
    },
    slug: { current: "" },
    excerpt: {
      no: "DuxPace har fått godkjent hovedprosjekt hos NTNU Discovery, NTNUs program for kommersialisering av forskning og studentideer.",
      en: "DuxPace has been approved for a main project grant through NTNU Discovery, NTNU's program for commercializing research and student ideas.",
    },
    coverUrl: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=600&q=80",
    publishedAt: "2026-01-01",
  },
  {
    _id: "sterling-road",
    title: {
      no: "DuxPace mottok tilskudd fra Sterling Road",
      en: "DuxPace receives Sterling Road grant",
    },
    slug: { current: "" },
    excerpt: {
      no: "DuxPace er den første startupen fra NTNU som har mottatt tilskudd fra Sterling Road - 10.000 kroner pluss coaching for videre utvikling av programvareprosjekter.",
      en: "DuxPace is the first startup from NTNU to receive a Sterling Road grant - 10,000 NOK plus coaching to develop software projects further.",
    },
    coverUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
    publishedAt: "2025-09-01",
  },
  {
    _id: "ntnu-discovery-pre",
    title: {
      no: "DuxPace fikk forprosjekt godkjent hos NTNU Discovery",
      en: "DuxPace approved for NTNU Discovery pre-project",
    },
    slug: { current: "" },
    excerpt: {
      no: "DuxPace ble godkjent for forprosjekt hos NTNU Discovery etter å ha mottatt Aneo-bidraget gjennom Spark* NTNU.",
      en: "DuxPace was approved for a pre-project grant through NTNU Discovery, following our Aneo contribution via Spark* NTNU.",
    },
    coverUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",
    publishedAt: "2025-03-01",
  },
  {
    _id: "tronderkassa",
    title: {
      no: "DuxPace tildelt støtte fra Trønderkassa",
      en: "DuxPace awarded Trønderkassa funding",
    },
    slug: { current: "" },
    excerpt: {
      no: "DuxPace mottok 20.000 kroner i støtte fra Trønderkassa til videre utvikling av vår satellittbaserte løsning for havbruksnæringen.",
      en: "DuxPace received 20,000 NOK from Trønderkassa to continue developing our satellite-based solution for the aquaculture industry.",
    },
    coverUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&q=80",
    publishedAt: "2025-06-01",
  },
  {
    _id: "aneo",
    title: {
      no: "DuxPace tildelt Aneo-bidraget gjennom Spark* NTNU",
      en: "DuxPace awarded Aneo contribution through Spark* NTNU",
    },
    slug: { current: "" },
    excerpt: {
      no: "DuxPace mottok inntil 25.000 kroner i Aneo-bidrag gjennom Spark* NTNU, og ble koblet med en veileder som har hjulpet oss videre i kommersialiseringsprosessen.",
      en: "DuxPace received up to 25,000 NOK through the Aneo contribution via Spark* NTNU, and was matched with an advisor to support our commercialization process.",
    },
    coverUrl: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&q=80",
    publishedAt: "2024-09-01",
  },
]

export function News() {
  return <NewsPreview items={NEWS_ITEMS} />
}
