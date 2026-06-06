import "@testing-library/jest-dom"
import { beforeEach } from "vitest"

beforeEach(() => {
  document.cookie = "locale=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"
})

window.scrollTo = () => {}
