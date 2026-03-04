import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { siteContent } from "./data/content";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteContent.meta.title,
  description: siteContent.meta.description,
  icons: { icon: "/favicon.jpg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>{children}</body>
    </html>
  );
}
