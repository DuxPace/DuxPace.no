import type { Metadata } from "next";
import SolutionView, { solutionCopy } from "../../features/pages/SolutionView";
import { pageMetadata } from "../../lib/meta";

const c = solutionCopy.no;
export const metadata: Metadata = pageMetadata({ lang: "no", route: "solution", title: `${c.title} | DuxPace`, description: c.description });

export default function Page() {
  return <SolutionView lang="no" />;
}
