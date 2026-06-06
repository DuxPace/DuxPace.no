const CONTACT_EMAIL = "planet@duxpace.no"
const LINKEDIN = "https://linkedin.com/company/duxpace"

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DuxPace",
    url: "https://duxpace.no",
    logo: "https://duxpace.no/images/logos/logo-wide.jpeg",
    description:
      "Satellite intelligence for Norwegian aquaculture. Early warning of algae, sea lice, and environmental stress per locality.",
    foundingDate: "2024-06-01",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Trondheim",
      addressCountry: "NO",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "General",
      email: CONTACT_EMAIL,
    },
    sameAs: [LINKEDIN],
  }
}

export function articleSchema(
  headline: string,
  description: string,
  author: string,
  publishedDate: string,
  url: string,
  image?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline,
    description,
    image: image
      ? [{ "@type": "ImageObject", url: image, width: 1200, height: 630 }]
      : undefined,
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: { "@type": "Person", name: author },
    publisher: {
      "@type": "Organization",
      name: "DuxPace",
      logo: {
        "@type": "ImageObject",
        url: "https://duxpace.no/images/logos/logo-square.jpeg",
      },
    },
    url,
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
