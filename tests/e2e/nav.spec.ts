import { test, expect } from "@playwright/test"

test.describe("Navigation", () => {
  test("nav links exist and point to correct anchors", async ({ page }) => {
    await page.goto("/")
    const nav = page.getByRole("navigation", { name: "Main navigation" })
    await expect(nav.locator('a[href="#how-it-works"]')).toBeAttached()
    await expect(nav.locator('a[href="#nyheter"]')).toBeAttached()
    await expect(nav.locator('a[href="#kontakt"]')).toBeAttached()
  })

  test("clicking nav anchor updates location hash", async ({ page }) => {
    await page.goto("/")
    await page.locator('a[href="#how-it-works"]').first().click()
    await page.waitForTimeout(600)
    expect(page.url()).toContain("#how-it-works")
  })

  test("locale switcher toggles between NO and EN", async ({ page }) => {
    await page.goto("/")
    const btn = page.getByRole("button", { name: /switch to english/i })
    await btn.click()
    await expect(page.getByRole("button", { name: /switch to norwegian/i })).toBeVisible()
  })

  test("mobile menu opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto("/")
    const openBtn = page.getByRole("button", { name: /open menu/i })
    await openBtn.click()
    await expect(page.getByRole("dialog", { name: "Mobile navigation" })).toBeVisible()
    const closeBtn = page.getByRole("button", { name: /close menu/i })
    await closeBtn.click()
    await expect(page.getByRole("dialog", { name: "Mobile navigation" })).not.toBeVisible()
  })
})
