import type { Metadata } from "next";
import PrivacyView, { privacyCopy } from "../../features/pages/PrivacyView";
import { pageMetadata } from "../../lib/meta";

const c = privacyCopy.no;
export const metadata: Metadata = pageMetadata({ lang: "no", route: "privacy", title: `${c.title} | DuxPace`, description: c.description });

export default function Page() {
  return <PrivacyView lang="no" />;
}
