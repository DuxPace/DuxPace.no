import type { Metadata } from "next";
import PrivacyView, { privacyCopy } from "../../../features/pages/PrivacyView";
import { pageMetadata } from "../../../lib/meta";

const c = privacyCopy.en;
export const metadata: Metadata = pageMetadata({ lang: "en", route: "privacy", title: `${c.title} | DuxPace`, description: c.description });

export default function Page() {
  return <PrivacyView lang="en" />;
}
