import type { Metadata } from "next";
import SolutionView, { solutionCopy } from "../../../features/pages/SolutionView";
import { pageMetadata } from "../../../lib/meta";

const c = solutionCopy.en;
export const metadata: Metadata = pageMetadata({ lang: "en", route: "solution", title: `${c.title} | DuxPace`, description: c.description });

export default function Page() {
  return <SolutionView lang="en" />;
}
