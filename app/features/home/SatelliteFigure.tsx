import Image from "next/image";
import type { Language } from "../../lib/data/content";

// Tick positions are percentages along the top and left edges of the UTM 32N
// window, computed with pyproj for the bounds the image was cut to.
const LON_TICKS = [
  { label: "5°30′E", at: 8.22 },
  { label: "5°45′E", at: 32.43 },
  { label: "6°00′E", at: 56.64 },
  { label: "6°15′E", at: 80.83 },
];
const LAT_TICKS = [
  { label: "61°55′N", at: 25.66 },
  { label: "61°50′N", at: 51.59 },
  { label: "61°45′N", at: 77.53 },
];

const copy = {
  no: {
    alt: "Satellittbilde av indre Nordfjord en klar sommerdag, med fjordarmer, grønne lier og snø på fjellene i sør.",
    caption: "Indre Nordfjord sett fra Sentinel-2C 16. juli 2025 kl. 11.04 UTC. Det er her vi har testet varselet.",
    credit: "Inneholder modifiserte Copernicus Sentinel-data (2025).",
  },
  en: {
    alt: "Satellite image of inner Nordfjord on a clear summer day, with fjord arms, green hillsides and snow on the mountains to the south.",
    caption: "Inner Nordfjord seen from Sentinel-2C on 16 July 2025 at 11:04 UTC. This is where we have tested the forecast.",
    credit: "Contains modified Copernicus Sentinel data (2025).",
  },
};

export default function SatelliteFigure({ lang }: { lang: Language }) {
  const c = copy[lang];
  const tick = "absolute text-xs font-medium text-ink-2 tabular";

  return (
    <figure className="mt-16 md:mt-24">
      <div className="relative mx-5 md:mx-10 pt-6 pl-0 md:pl-16">
        <div aria-hidden="true" className="hidden md:block">
          {LON_TICKS.map((t) => (
            <span key={t.label} className={`${tick} top-0 -translate-x-1/2`} style={{ left: `calc(4rem + (100% - 4rem) * ${t.at / 100})` }}>
              {t.label}
            </span>
          ))}
        </div>
        <div className="relative">
          <div aria-hidden="true" className="hidden md:block">
            {LAT_TICKS.map((t) => (
              <span key={t.label} className={`${tick} -left-16 -translate-y-1/2`} style={{ top: `${t.at}%` }}>
                {t.label}
              </span>
            ))}
          </div>
          <Image
            src="/images/satellite/nordfjord-2025-07-16.jpg"
            alt={c.alt}
            width={2560}
            height={1695}
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className="w-full h-auto outline outline-1 outline-ink/30"
          />
        </div>
      </div>
      <figcaption className="mx-auto mt-4 max-w-[76rem] px-5 md:px-10 md:pl-[6.5rem] text-ink-2">
        <span className="text-ink">{c.caption}</span> {c.credit}
      </figcaption>
    </figure>
  );
}
