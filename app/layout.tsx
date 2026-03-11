import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { translations } from "./lib/data/content";
import { LanguageProvider } from "./shared/providers/LanguageProvider";
import { ScrollProgressIndicator } from "./shared/components/animations/SmoothScroll";
import HtmlLang from "./shared/components/HtmlLang";
import "./globals.css";

const geist = Geist({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const { title, description } = translations.en.meta;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://duxpace.no"),
  title: {
    default: title,
    template: "%s | DuxPace",
  },
  description,
  keywords: ["satellite", "aquaculture", "algal blooms", "fish farming", "Norway", "NTNU", "AI"],
  authors: [{ name: "DuxPace" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
  alternates: {
    canonical: "https://duxpace.no",
    languages: {
      "en": "https://duxpace.no",
      "no": "https://duxpace.no",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`scroll-smooth ${geist.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="preload" href="/images/team/herman.jpg" as="image" />
        <link rel="preload" href="/images/team/andre.jpg" as="image" />
        <link rel="preload" href="/images/logos/logo-wide.jpeg" as="image" />
      </head>
      <body className={`${geist.className} antialiased`}>
        <LanguageProvider>
          <HtmlLang />
          <ScrollProgressIndicator />
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
