"use client"

import { createContext, useContext, useCallback, useState, useEffect } from "react"
import type { Locale } from "./types"
import { dictionary } from "./dictionary"

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

function setCookie(name: string, value: string) {
  const expires = new Date(Date.now() + 365 * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;expires=${expires};SameSite=Lax`
}

export const LocaleContext = createContext<{
  locale: Locale
  setLocale: (locale: Locale) => void
} | null>(null)

export function LocaleProvider({
  children,
  defaultLocale = "no",
}: {
  children: React.ReactNode
  defaultLocale?: Locale
}) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  // Read stored locale after mount to avoid SSR/CSR mismatch
  useEffect(() => {
    const stored = getCookie("locale") as Locale | null
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === "no" || stored === "en") setLocaleState(stored)
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    setCookie("locale", newLocale)
  }, [])

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) throw new Error("useLocale must be used within LocaleProvider")
  return context
}

export function useT() {
  const { locale } = useLocale()

  return useCallback(
    (key: string): string => {
      const parts = key.split(".")
      let current: unknown = dictionary

      for (const part of parts) {
        if (typeof current !== "object" || current === null || !(part in current)) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`Missing translation key: ${key}`)
          }
          return key
        }
        current = (current as Record<string, unknown>)[part]
      }

      if (typeof current === "object" && current !== null) {
        const obj = current as Record<string, string>
        return obj[locale] ?? obj.en ?? key
      }

      return String(current)
    },
    [locale]
  )
}
