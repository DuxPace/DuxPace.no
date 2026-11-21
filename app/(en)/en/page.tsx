import type { Metadata } from "next";
import HomeView from "../../features/home/HomeView";
import { translations } from "../../lib/data/content";
import { pageMetadata } from "../../lib/meta";

const t = translations.en.meta;
export const metadata: Metadata = { ...pageMetadata({ lang: "en", route: "home", title: t.title, description: t.description }), title: { absolute: t.title } };
export const revalidate = 300;

export default function Page() {
  return <HomeView lang="en" />;
}
