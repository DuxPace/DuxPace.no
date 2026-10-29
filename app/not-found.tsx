import Link from "next/link";
import { cookies } from "next/headers";
import { translations, type Language } from "./lib/data/content";

export default async function NotFound() {
  const rawLang = (await cookies()).get("lang")?.value;
  const lang: Language = rawLang === "en" || rawLang === "no" ? rawLang : "en";
  const t = translations[lang].notFound;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-gray-400 text-sm tracking-wide mb-4">{t.code}</p>
        <h1 className="text-4xl font-bold text-white mb-4">{t.title}</h1>
        <p className="text-gray-400 mb-8">{t.body}</p>
        <Link
          href="/"
          className="bg-white text-black text-sm font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {t.home}
        </Link>
      </div>
    </div>
  );
}
