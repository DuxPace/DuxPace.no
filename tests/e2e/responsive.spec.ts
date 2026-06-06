import { test, expect } from "@playwright/test"

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 800 },
  { name: "wide", width: 1920, height: 1080 },
]

for (const vp of VIEWPORTS) {
  test.describe(`Responsive: ${vp.name} (${vp.width}px)`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } })

    test("no horizontal scroll", async ({ page }) => {
      await page.goto("/")
      await page.waitForLoadState("networkidle")
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth)
    })

    test("hero heading visible", async ({ page }) => {
      await page.goto("/")
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
    })

    test("navbar visible", async ({ page }) => {
      await page.goto("/")
      await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible()
    })
  })
}
