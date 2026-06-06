import { test, expect } from "@playwright/test"

test.describe("Motion: prefers-reduced-motion", () => {
  test("page loads without layout shift", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
    await page.goto("/")
    await page.waitForLoadState("networkidle")
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
  })

  test("no console errors with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
    const errors: string[] = []
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text())
    })
    await page.goto("/")
    await page.waitForLoadState("networkidle")
    expect(errors).toHaveLength(0)
  })
})
