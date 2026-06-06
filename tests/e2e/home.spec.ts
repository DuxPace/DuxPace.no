import { test, expect } from "@playwright/test"

test.describe("Homepage basics", () => {
  test("title contains DuxPace", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/DuxPace/)
  })

  test("meta description is present and non-empty", async ({ page }) => {
    await page.goto("/")
    const content = await page.locator('meta[name="description"]').getAttribute("content")
    expect(content?.length).toBeGreaterThan(50)
  })

  test("hero h1 is visible", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
  })

  test("all 6 anchor sections present in DOM", async ({ page }) => {
    await page.goto("/")
    for (const id of ["hjem", "problem", "how-it-works", "team", "nyheter", "kontakt"]) {
      await expect(page.locator(`#${id}`)).toBeAttached()
    }
  })

  test("skip-to-content link is in DOM", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator('a[href="#main-content"]')).toBeAttached()
  })

  test("footer copyright includes current year", async ({ page }) => {
    await page.goto("/")
    const year = new Date().getFullYear().toString()
    await expect(page.locator("footer")).toContainText(year)
  })

  test("no JavaScript console errors on load", async ({ page }) => {
    const errors: string[] = []
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text())
    })
    await page.goto("/")
    await page.waitForLoadState("networkidle")
    expect(errors).toHaveLength(0)
  })
})
