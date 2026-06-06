import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LocaleProvider } from "@/lib/i18n/useT";
import { ScrollProgressIndicator } from "@/lib/motion/SmoothScroll";
import { organizationSchema } from "@/lib/seo/schema";
import "./globals.css";

const geist = Geist({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const title = "DuxPace - Satellite data for Norwegian aquaculture";
const description = "DuxPace gives Norwegian fish farmers early warning of algae, sea lice, and environmental stress - from Sentinel-2 satellite data to dashboard in hours. Based at VM-paviljongen, Trondheim.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="no" className={`scroll-smooth ${geist.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="preload" href="/images/team/herman.jpg" as="image" />
        <link rel="preload" href="/images/team/andre.jpg" as="image" />
        <link rel="preload" href="/images/logos/logo-wide.jpeg" as="image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
      </head>
      <body className={`${geist.className} antialiased`}>
        <LocaleProvider>
          <ScrollProgressIndicator />
          {children}
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
