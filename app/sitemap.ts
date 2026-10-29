import type { MetadataRoute } from "next";

const BASE = "https://duxpace.no";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: BASE,
          no: BASE,
          "x-default": BASE,
        },
      },
    },
  ];
}
