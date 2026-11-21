"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { pathFor, translations, type Language } from "../../lib/data/content";

const COOKIE = "dp_consent";
const MAX_AGE = 180 * 24 * 60 * 60;
const OPEN_EVENT = "dp:consent-open";

type Choice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function readChoice(): Choice | null {
  const m = document.cookie.match(/(?:^|; )dp_consent=(granted|denied)/);
  return m ? (m[1] as Choice) : null;
}

function writeChoice(choice: Choice) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${choice}; path=/; max-age=${MAX_AGE}; SameSite=Lax${secure}`;
}

// Basic consent mode: the Google tag is not loaded at all until the visitor accepts.
function loadGa(id: string) {
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the arguments object, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
  window.gtag("js", new Date());
  window.gtag("config", id);
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

function clearGaCookies() {
  const host = location.hostname;
  const domains = [host, `.${host.replace(/^www\./, "")}`];
  for (const name of document.cookie.split("; ").map((c) => c.split("=")[0])) {
    if (name === "_ga" || name.startsWith("_ga_")) {
      for (const d of domains) document.cookie = `${name}=; path=/; max-age=0; domain=${d}`;
      document.cookie = `${name}=; path=/; max-age=0`;
    }
  }
}

export function track(event: string, params?: Record<string, string>) {
  window.gtag?.("event", event, params);
}

export function CookieSettingsButton({ label, className }: { label: string; className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      {label}
    </button>
  );
}

export default function Consent({ lang, gaId }: { lang: Language; gaId?: string }) {
  const t = translations[lang].consent;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!gaId) return;
    const choice = readChoice();
    if (choice === "granted") loadGa(gaId);
    // Reading the cookie is only possible after mount, so the banner opens here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (choice === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, [gaId]);

  // Without a measurement id there is nothing to consent to, so no banner.
  if (!gaId || !open) return null;

  const choose = (choice: Choice) => {
    writeChoice(choice);
    if (choice === "granted") {
      loadGa(gaId);
    } else {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      clearGaCookies();
    }
    setOpen(false);
  };

  const button =
    "min-h-11 rounded-[var(--radius-control)] px-5 font-semibold transition-colors duration-150";

  return (
    <section
      aria-labelledby="consent-title"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-[var(--radius-block)] bg-ink p-5 text-paper md:inset-x-auto md:right-6 md:bottom-6"
    >
      <h2 id="consent-title" className="text-lg font-bold">{t.title}</h2>
      <p className="mt-2 text-on-deep">
        {t.body}{" "}
        <Link href={pathFor("privacy", lang)} className="underline underline-offset-4 hover:text-sea">
          {t.more}
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => choose("granted")} className={`${button} bg-paper text-ink hover:bg-sea`}>
          {t.accept}
        </button>
        <button type="button" onClick={() => choose("denied")} className={`${button} bg-paper text-ink hover:bg-sea`}>
          {t.reject}
        </button>
      </div>
    </section>
  );
}
