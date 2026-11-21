import type { Metadata } from "next";
import AlgaeView, { algaeCopy } from "../../../features/pages/AlgaeView";
import { pageMetadata } from "../../../lib/meta";

const c = algaeCopy.en;
export const metadata: Metadata = pageMetadata({ lang: "en", route: "algae", title: `${c.title} | DuxPace`, description: c.description });

export default function Page() {
  return <AlgaeView lang="en" />;
}
