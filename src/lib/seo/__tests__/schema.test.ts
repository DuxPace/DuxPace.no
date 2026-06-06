import { describe, it, expect } from "vitest"
import { organizationSchema, articleSchema, breadcrumbSchema } from "../schema"

describe("organizationSchema", () => {
  it("produces valid JSON-LD shape", () => {
    const schema = organizationSchema()
    expect(schema["@context"]).toBe("https://schema.org")
    expect(schema["@type"]).toBe("Organization")
    expect(schema.name).toBe("DuxPace")
    expect(schema.url).toMatch(/^https:\/\//)
  })

  it("includes contact point with email", () => {
    const schema = organizationSchema()
    expect(schema.contactPoint.email).toBe("planet@duxpace.no")
    expect(schema.contactPoint["@type"]).toBe("ContactPoint")
  })

  it("includes address in Norway", () => {
    const schema = organizationSchema()
    expect(schema.address.addressCountry).toBe("NO")
    expect(schema.address["@type"]).toBe("PostalAddress")
  })

  it("serializes without error", () => {
    expect(() => JSON.stringify(organizationSchema())).not.toThrow()
  })
})

describe("articleSchema", () => {
  it("produces valid NewsArticle shape", () => {
    const schema = articleSchema(
      "Test headline",
      "Test description",
      "Author Name",
      "2024-01-01",
      "https://duxpace.no/nyheter/test"
    )
    expect(schema["@type"]).toBe("NewsArticle")
    expect(schema.headline).toBe("Test headline")
    expect(schema.author.name).toBe("Author Name")
  })

  it("omits image field when not provided", () => {
    const schema = articleSchema("h", "d", "a", "2024-01-01", "https://duxpace.no/nyheter/x")
    expect(schema.image).toBeUndefined()
  })

  it("includes image object when provided", () => {
    const schema = articleSchema("h", "d", "a", "2024-01-01", "https://duxpace.no/nyheter/x", "https://img.example.com/photo.jpg")
    expect(schema.image).toBeDefined()
  })
})

describe("breadcrumbSchema", () => {
  it("produces BreadcrumbList with correct positions", () => {
    const schema = breadcrumbSchema([
      { name: "Home", url: "https://duxpace.no" },
      { name: "News", url: "https://duxpace.no/nyheter" },
    ])
    expect(schema["@type"]).toBe("BreadcrumbList")
    expect(schema.itemListElement).toHaveLength(2)
    expect(schema.itemListElement[0].position).toBe(1)
    expect(schema.itemListElement[1].position).toBe(2)
  })

  it("handles empty list", () => {
    const schema = breadcrumbSchema([])
    expect(schema.itemListElement).toHaveLength(0)
  })
})
