import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { LocaleProvider, useT, useLocale } from "../useT"

function TestTranslation({ tkey }: { tkey: string }) {
  const t = useT()
  return <span data-testid="out">{t(tkey)}</span>
}

function LocaleSwitcher() {
  const { locale, setLocale } = useLocale()
  return (
    <>
      <span data-testid="locale">{locale}</span>
      <button onClick={() => setLocale(locale === "no" ? "en" : "no")}>toggle</button>
    </>
  )
}

function wrap(ui: React.ReactNode) {
  return render(<LocaleProvider defaultLocale="no">{ui}</LocaleProvider>)
}

describe("useT", () => {
  it("returns Norwegian text by default", () => {
    wrap(<TestTranslation tkey="nav.home" />)
    expect(screen.getByTestId("out").textContent).toBe("Hjem")
  })

  it("falls back to English after locale switch", async () => {
    wrap(
      <>
        <LocaleSwitcher />
        <TestTranslation tkey="nav.home" />
      </>
    )
    await userEvent.click(screen.getByRole("button"))
    expect(screen.getByTestId("out").textContent).toBe("Home")
  })

  it("returns key for missing translation", () => {
    wrap(<TestTranslation tkey="nonexistent.key.path" />)
    expect(screen.getByTestId("out").textContent).toBe("nonexistent.key.path")
  })

  it("handles nested missing segment", () => {
    wrap(<TestTranslation tkey="nav.doesNotExist" />)
    expect(screen.getByTestId("out").textContent).toBe("nav.doesNotExist")
  })
})

describe("useLocale", () => {
  it("defaults to no", () => {
    wrap(<LocaleSwitcher />)
    expect(screen.getByTestId("locale").textContent).toBe("no")
  })

  it("switches locale", async () => {
    wrap(<LocaleSwitcher />)
    await userEvent.click(screen.getByRole("button"))
    expect(screen.getByTestId("locale").textContent).toBe("en")
  })

  it("throws outside provider", () => {
    const original = console.error
    console.error = () => {}
    expect(() => render(<LocaleSwitcher />)).toThrow("useLocale must be used within LocaleProvider")
    console.error = original
  })
})
