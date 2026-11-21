import type { Metadata } from "next";
import SiteDocument from "../shared/components/SiteDocument";
import { SITE_URL } from "../lib/data/content";

export const metadata: Metadata = { metadataBase: new URL(SITE_URL) };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteDocument lang="en">{children}</SiteDocument>;
}
