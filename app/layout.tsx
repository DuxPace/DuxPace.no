import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { translations } from "./data/content";
import { LanguageProvider } from "./components/LanguageProvider";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: translations.en.meta.title,
  description: translations.en.meta.description,
  icons: { icon: "/favicon.jpg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
