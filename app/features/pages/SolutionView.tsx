import Link from "next/link";
import { pathFor, urlFor, type Language } from "../../lib/data/content";
import { anchors } from "../../shared/components/Header";
import JsonLd from "../../shared/components/JsonLd";
import Article from "./Article";

export const solutionCopy = {
  no: {
    title: "Slik lages varselet",
    description:
      "Fra sensorene i merden til et 48-timersvarsel med kalibrert usikkerhet, kjørt hver natt. Hva DuxPace leverer, og hva vi ikke lover.",
    lead: "Fire trinn, fra måling til varsel, som kjører av seg selv hver natt.",
    steps: [
      {
        h: "Målinger inn",
        p: "Sensorene i merden måler temperatur, oksygen og saltholdighet på 3, 5 og 10 meters dyp hvert tiende minutt. Vi henter dataene hver natt kl. 03.30 UTC.",
      },
      {
        h: "Varsel",
        p: "For hver tidsserie lager vi et varsel 48 timer frem som starter fra siste faktiske måling. Vi trekker ikke trender ut over perioden modellen er trent på.",
      },
      {
        h: "Usikkerhet",
        p: "Hvert varsel får et bånd som skal fange 80 prosent av målingene. Vi sjekker at det holder: i testene havnet 80,9 prosent innenfor.",
      },
      {
        h: "Levering",
        p: "Varselet vises per lokalitet i kartet i oppdretterens dashbord, sammen med en samlet risikoscore fra 0 til 1 for oksygen, temperatur, saltholdighet, algeoppblomstring, lus og turbiditet.",
      },
    ],
    satH: "Hva satellittene gjør",
    sat: "Satellittdata går inn i risikoscoren, ikke i selve 48-timersvarselet. Sentinel-2 gir turbiditet og en klorofyllindeks for overflaten. Havtemperatur fra Sentinel-3 brukes i en indeks for lusens utviklingsvilkår.",
    whyH: "Hvorfor 48 timer",
    why: "Vi testet også 30 dager frem. Da tapte varselet mot en flat linje i 21 av 34 tidsserier, så vi sluttet å vise det. Det vi viser og det vi kan forsvare, er det samme tallet.",
    qH: "Spørsmål vi ofte får",
    q: [
      {
        h: "Trenger lokaliteten sensorer?",
        p: "I dag, ja. Varselet bygger på målinger fra merden. Å gi varsler til lokaliteter uten egne sensorer, ved hjelp av havmodeller og satellitt, er det vi jobber mot.",
      },
      {
        h: "Erstatter dette Havforskningsinstituttets algestatus?",
        p: "Nei. Algestatus gir ukentlig status for skadelige alger per produksjonsområde, og den bør du følge uansett. Vi varsler vannkvalitet for den enkelte lokaliteten.",
      },
      {
        h: "Hvor er det testet?",
        p: "Ved fem lokaliteter med sensorer i Nordfjord. Tallene på denne siden kommer fra de testene.",
      },
    ],
    hi: "Algestatus hos Havforskningsinstituttet",
    cta: "Be om et varsel for din lokalitet",
  },
  en: {
    title: "How the forecast is made",
    description:
      "From the sensors in your pens to a 48 hour forecast with calibrated uncertainty, run every night. What DuxPace delivers, and what we do not promise.",
    lead: "Four steps, from measurement to forecast, running on their own every night.",
    steps: [
      {
        h: "Measurements in",
        p: "Sensors in the pen measure temperature, oxygen and salinity at 3, 5 and 10 metres every ten minutes. We collect the data every night at 03:30 UTC.",
      },
      {
        h: "Forecast",
        p: "For each time series we make a forecast 48 hours ahead that starts from the last actual reading. We do not extend trends beyond the period the model was trained on.",
      },
      {
        h: "Uncertainty",
        p: "Every forecast carries a band meant to catch 80 percent of measurements. We check that it holds: in testing, 80.9 percent fell inside.",
      },
      {
        h: "Delivery",
        p: "The forecast appears for each site on the map in the farmer's dashboard, next to a combined risk score from 0 to 1 for oxygen, temperature, salinity, algal blooms, lice and turbidity.",
      },
    ],
    satH: "What the satellites do",
    sat: "Satellite data feeds the risk score, not the 48 hour forecast itself. Sentinel-2 gives turbidity and a surface chlorophyll index. Sea temperature from Sentinel-3 goes into an index of how favourable conditions are for lice development.",
    whyH: "Why 48 hours",
    why: "We also tested 30 days ahead. There the forecast lost to a flat line in 21 of 34 time series, so we stopped showing it. What we show and what we can defend are the same number.",
    qH: "Questions we often get",
    q: [
      {
        h: "Does the site need sensors?",
        p: "Today, yes. The forecast is built on measurements from the pen. Forecasts for sites without their own sensors, using ocean models and satellite, are what we are working toward.",
      },
      {
        h: "Does this replace the Institute of Marine Research algae status?",
        p: "No. Algestatus gives a weekly status of harmful algae per production area, and you should follow it regardless. We forecast water quality for the individual site.",
      },
      {
        h: "Where has it been tested?",
        p: "At five sites with sensors in Nordfjord. The figures on this page come from those tests.",
      },
    ],
    hi: "Algestatus at the Institute of Marine Research",
    cta: "Ask for a forecast for your site",
  },
};

export default function SolutionView({ lang }: { lang: Language }) {
  const c = solutionCopy[lang];
  const home = pathFor("home", lang);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DuxPace",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: c.description,
    url: urlFor("solution", lang),
    inLanguage: lang === "no" ? "nb" : "en",
    publisher: { "@id": "https://www.duxpace.no/#org" },
  };

  return (
    <Article title={c.title} lead={c.lead} crumbs={[{ name: "DuxPace", href: home }]} lang={lang} route="solution">
      <JsonLd data={jsonLd} />
      <ol className="mt-12 space-y-10">
        {c.steps.map((s, i) => (
          <li key={s.h} className="grid gap-2 md:grid-cols-12 md:gap-8">
            <p className="md:col-span-1 text-3xl font-extrabold text-magenta tabular" aria-hidden="true">{i + 1}</p>
            <div className="md:col-span-11">
              <h2 className="text-xl font-bold">{s.h}</h2>
              <p className="mt-2 max-w-[65ch]">{s.p}</p>
            </div>
          </li>
        ))}
      </ol>

      <h2 className="mt-20 text-[length:var(--text-section)] font-bold leading-tight">{c.satH}</h2>
      <p className="mt-4 max-w-[65ch]">{c.sat}</p>

      <h2 className="mt-16 text-[length:var(--text-section)] font-bold leading-tight">{c.whyH}</h2>
      <p className="mt-4 max-w-[65ch]">{c.why}</p>

      <h2 className="mt-16 text-[length:var(--text-section)] font-bold leading-tight">{c.qH}</h2>
      <div className="mt-6 space-y-8">
        {c.q.map((q) => (
          <div key={q.h}>
            <h3 className="text-xl font-bold">{q.h}</h3>
            <p className="mt-2 max-w-[65ch]">{q.p}</p>
          </div>
        ))}
      </div>
      <p className="mt-6">
        <a href="https://algestatus.hi.no" rel="noopener noreferrer" className="link inline-flex min-h-11 items-center">{c.hi}</a>
      </p>

      <Link
        href={`${home}#${anchors(lang).contact}`}
        className="mt-14 inline-flex min-h-12 items-center rounded-[var(--radius-control)] bg-magenta px-6 font-semibold text-paper transition-colors duration-150 hover:bg-magenta-dark"
      >
        {c.cta}
      </Link>
    </Article>
  );
}
