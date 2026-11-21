import type { Metadata } from "next";
import Link from "next/link";
import { Schibsted_Grotesk } from "next/font/google";
import { translations } from "./lib/data/content";
import "./globals.css";

const schibsted = Schibsted_Grotesk({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-schibsted" });

export const metadata: Metadata = {
  title: "404 | DuxPace",
  robots: { index: false },
};

// Unmatched URLs have no language, so the page offers both.
export default function GlobalNotFound() {
  const no = translations.no.notFound;
  const en = translations.en.notFound;
  return (
    <html lang="nb" className={schibsted.variable}>
      <body className="min-h-svh">
        <main className="mx-auto max-w-[76rem] px-5 md:px-10 py-24 md:py-36 grid gap-16 md:grid-cols-2">
          <section>
            <p className="text-ink-2 tabular">404</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.02em]">{no.title}</h1>
            <p className="mt-4 max-w-[45ch] text-ink-2">{no.body}</p>
            <Link href="/" className="link mt-6 inline-flex min-h-11 items-center font-medium">{no.home}</Link>
          </section>
          <section lang="en">
            <p className="text-ink-2 tabular">404</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-[-0.02em]">{en.title}</h2>
            <p className="mt-4 max-w-[45ch] text-ink-2">{en.body}</p>
            <Link href="/en" className="link mt-6 inline-flex min-h-11 items-center font-medium">{en.home}</Link>
          </section>
        </main>
      </body>
    </html>
  );
}
