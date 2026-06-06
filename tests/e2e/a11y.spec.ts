import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

test.describe("Accessibility", () => {
  test("no critical or serious violations on homepage (NO locale)", async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze()
    const blocking = results.violations.filter((v) =>
      ["critical", "serious"].includes(v.impact ?? "")
    )
    expect(blocking, JSON.stringify(blocking.map((v) => `${v.id}: ${v.description}`), null, 2)).toHaveLength(0)
  })

  test("no critical or serious violations on homepage (EN locale)", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("button", { name: /switch to english/i }).click()
    await page.waitForTimeout(300)
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze()
    const blocking = results.violations.filter((v) =>
      ["critical", "serious"].includes(v.impact ?? "")
    )
    expect(blocking, JSON.stringify(blocking.map((v) => `${v.id}: ${v.description}`), null, 2)).toHaveLength(0)
  })

  test("all images have alt attributes", async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")
    const images = page.locator("img")
    const count = await images.count()
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute("alt")
      expect(alt, `img[${i}] missing alt`).not.toBeNull()
    }
  })

  test("heading hierarchy starts with h1", async ({ page }) => {
    await page.goto("/")
    const h1 = page.getByRole("heading", { level: 1 })
    await expect(h1).toBeVisible()
  })
})
