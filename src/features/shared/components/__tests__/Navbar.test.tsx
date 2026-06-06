import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { LocaleProvider } from "@/lib/i18n/useT"
import { Navbar } from "../Navbar"

function renderNavbar() {
  return render(
    <LocaleProvider defaultLocale="no">
      <Navbar />
    </LocaleProvider>
  )
}

describe("Navbar", () => {
  it("renders main navigation landmark", () => {
    renderNavbar()
    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument()
  })

  it("renders logo link to home", () => {
    renderNavbar()
    expect(screen.getByRole("link", { name: /DuxPace home/i })).toBeInTheDocument()
  })

  it("mobile menu button toggles aria-expanded", async () => {
    renderNavbar()
    const btn = screen.getByRole("button", { name: /open menu/i })
    expect(btn).toHaveAttribute("aria-expanded", "false")
    await userEvent.click(btn)
    expect(screen.getByRole("button", { name: /close menu/i })).toHaveAttribute("aria-expanded", "true")
  })

  it("locale toggle button visible on desktop nav", () => {
    renderNavbar()
    expect(screen.getByRole("button", { name: /switch to english/i })).toBeInTheDocument()
  })

  it("mobile menu button has min 44px touch target", () => {
    renderNavbar()
    const btn = screen.getByRole("button", { name: /open menu/i })
    const classes = btn.className
    expect(classes).toMatch(/w-11/)
    expect(classes).toMatch(/h-11/)
  })
})
