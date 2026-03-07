import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { translations } from "./data/content";
import { LanguageProvider } from "./components/LanguageProvider";
import { PageLoadProvider } from "./components/PageLoad";
import { ScrollProgressIndicator } from "./components/SmoothScroll";
import HtmlLang from "./components/HtmlLang";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

const { title, description } = translations.en.meta;

export const metadata: Metadata = {
  metadataBase: new URL("https://duxpace.no"),
  title,
  description,
  icons: [
    { rel: "icon", url: "/favicon.png", type: "image/png" },
    { rel: "apple-touch-icon", url: "/favicon.png" },
  ],
  openGraph: {
    title,
    description,
    url: "https://duxpace.no",
    siteName: "DuxPace",
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/logos/logo-banner.jpeg", width: 1200, height: 630, alt: "DuxPace" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/logos/logo-banner.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geist.className} antialiased`}>
        <PageLoadProvider>
          <LanguageProvider>
            <HtmlLang />
            <ScrollProgressIndicator />
            {children}
          </LanguageProvider>
        </PageLoadProvider>
        <Analytics />
      </body>
    </html>
  );
}
