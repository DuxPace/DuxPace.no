import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { NewsCard } from "../NewsCard"

describe("NewsCard", () => {
  const baseProps = {
    title: "Algae warning system launched",
    excerpt: "DuxPace deploys real-time algae detection for Norwegian salmon farms.",
    date: "1. januar 2024",
  }

  it("renders title", () => {
    render(<NewsCard {...baseProps} />)
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(baseProps.title)
  })

  it("renders excerpt", () => {
    render(<NewsCard {...baseProps} />)
    expect(screen.getByText(baseProps.excerpt)).toBeInTheDocument()
  })

  it("renders date", () => {
    render(<NewsCard {...baseProps} />)
    expect(screen.getByText(baseProps.date)).toBeInTheDocument()
  })

  it("renders without image when image prop omitted", () => {
    render(<NewsCard {...baseProps} />)
    expect(screen.queryByRole("img")).toBeNull()
  })

  it("renders image with title as alt text when image provided", () => {
    render(<NewsCard {...baseProps} image="https://example.com/photo.jpg" />)
    const img = screen.getByRole("img")
    expect(img).toHaveAttribute("alt", baseProps.title)
  })
})
