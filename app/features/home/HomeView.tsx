import Image from "next/image";
import Link from "next/link";
import { pathFor, siteConfig, translations, type Language } from "../../lib/data/content";
import { members } from "../../lib/data/members";
import { formatDate, getNews } from "../../lib/data/load";
import { anchors } from "../../shared/components/Header";
import SatelliteFigure from "./SatelliteFigure";
import ContactForm from "./ContactForm";

const copy = {
  no: {
    h1: "Vannet i merden, to døgn frem.",
    lead: "Vi varsler temperatur, oksygen og saltholdighet for hver lokalitet, med et usikkerhetsbånd som faktisk holder. Varselet bygger på sensorene som allerede står i merdene, og oppdateres hver natt.",
    cta: "Be om et varsel for din lokalitet",
    how: "Slik lages varselet",
    evidenceH: "Hva varselet har vist",
    evidence: [
      "Vi har testet 48-timersvarselet mot det enkleste alternativet en oppdretter har: å anta at vannet i morgen er som vannet nå. For temperatur slår varselet dette ved to lokaliteter i Nordfjord på alle dyp vi måler, 3, 5 og 10 meter.",
      "Usikkerhetsbåndet er kalibrert. Når vi sier at 80 prosent av målingene vil havne innenfor båndet, havnet 80,9 prosent der i testene.",
    ],
    evidenceSource: "Kilde: egne tester høsten 2026, 43 tidsserier fra fem lokaliteter.",
    notH: "Det vi ikke lover",
    not: [
      "At vi kan forutsi algeoppblomstring fra satellitt. Med dataene vi har i dag finner vi ingen sammenheng mellom satellittens klorofyllindeks og algetellingene ved lokalitetene.",
      "Ett treffsikkerhetstall for hele tjenesten. Omtrent halvparten av tidsseriene slår ennå ikke referansen.",
    ],
    notLink: "Les hva vi fant om alger",
    whoH: "Hvem det er for",
    who: [
      {
        h: "Oppdrettere",
        p: "Et varsel per lokalitet og per dyp, to døgn frem. Nok tid til å planlegge fôring og tiltak før oksygen eller temperatur går feil vei.",
      },
      {
        h: "Forsikring",
        p: "Miljøforholdene ved en lokalitet over tid, med usikkerheten oppgitt. Et grunnlag for risikovurdering som ikke bare bygger på hva som har skjedd før.",
      },
      {
        h: "Forskning og finansiering",
        p: "Vi skriver ned hva metodene klarer og ikke klarer, med tall og kilder. Vi er åpne for samarbeid om data og validering.",
      },
    ],
    teamH: "Hvem vi er",
    team: "DuxPace startet ved NTNU i Trondheim i juni 2024 og holder til på Gründerbrakka på VM-paviljongen. Vi er to.",
    support:
      "Arbeidet er støttet av NTNU Discovery med 300 000 kr (mai 2026) og av Aneobidraget med 50 000 kr, og vi samarbeider med EquaFish AS.",
    newsH: "Nyheter",
  },
  en: {
    h1: "The water in your pens, two days ahead.",
    lead: "We forecast temperature, oxygen and salinity for each site, with an uncertainty band that holds up. The forecast is built on the sensors already in your pens and refreshes every night.",
    cta: "Ask for a forecast for your site",
    how: "How the forecast is made",
    evidenceH: "What the forecast has shown",
    evidence: [
      "We tested the 48 hour forecast against the simplest option a farmer has: assume the water tomorrow is like the water now. For temperature, the forecast beats that at two sites in Nordfjord at every depth we measure, 3, 5 and 10 metres.",
      "The uncertainty band is calibrated. When we say 80 percent of measurements will fall inside the band, 80.9 percent did in testing.",
    ],
    evidenceSource: "Source: our own tests in autumn 2026, 43 time series from five sites.",
    notH: "What we do not promise",
    not: [
      "That we can predict algal blooms from satellite. With the data we have today we find no relationship between the satellite chlorophyll index and the algae counts at the sites.",
      "A single accuracy figure for the whole service. About half the time series do not yet beat the baseline.",
    ],
    notLink: "Read what we found about algae",
    whoH: "Who it is for",
    who: [
      {
        h: "Fish farmers",
        p: "A forecast for each site and each depth, two days ahead. Enough time to plan feeding and measures before oxygen or temperature turn the wrong way.",
      },
      {
        h: "Insurers",
        p: "Environmental conditions at a site over time, with the uncertainty stated. A basis for risk assessment that does not rest only on what happened before.",
      },
      {
        h: "Research and funding",
        p: "We write down what our methods can and cannot do, with figures and sources. We are open to working together on data and validation.",
      },
    ],
    teamH: "Who we are",
    team: "DuxPace started at NTNU in Trondheim in June 2024 and works out of Gründerbrakka at VM-paviljongen. There are two of us.",
    support:
      "The work is supported by NTNU Discovery with 300,000 kr (May 2026) and by Aneobidraget with 50,000 kr, and we work with EquaFish AS.",
    newsH: "News",
  },
};

export default async function HomeView({ lang }: { lang: Language }) {
  const c = copy[lang];
  const t = translations[lang];
  const a = anchors(lang);
  const news = await getNews();
  const wrap = "mx-auto max-w-[76rem] px-5 md:px-10";

  return (
    <>
      <section className={`${wrap} pt-16 md:pt-28`}>
        <h1 className="max-w-[16ch] text-[length:var(--text-display)] font-extrabold leading-[1.05] tracking-[-0.02em]">
          {c.h1}
        </h1>
        <p className="mt-6 max-w-[60ch] text-[length:var(--text-lead)] text-ink-2">{c.lead}</p>
        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={`#${a.contact}`}
            className="inline-flex min-h-12 items-center rounded-[var(--radius-control)] bg-magenta px-6 font-semibold text-paper transition-colors duration-150 hover:bg-magenta-dark"
          >
            {c.cta}
          </a>
          <Link href={pathFor("solution", lang)} className="link inline-flex min-h-11 items-center font-medium">
            {c.how}
          </Link>
        </div>
      </section>

      <SatelliteFigure lang={lang} />

      <section className={`${wrap} mt-28 md:mt-40 grid gap-12 md:grid-cols-12`}>
        <div className="md:col-span-7">
          <h2 className="text-[length:var(--text-section)] font-bold leading-tight">{c.evidenceH}</h2>
          {c.evidence.map((p) => (
            <p key={p} className="mt-5 max-w-[65ch]">{p}</p>
          ))}
          <p className="mt-5 text-sm text-ink-2">{c.evidenceSource}</p>
        </div>
        <aside className="md:col-span-5 self-start rounded-[var(--radius-block)] bg-sea p-6 md:p-8">
          <h3 className="text-xl font-bold">{c.notH}</h3>
          <ul className="mt-4 space-y-4">
            {c.not.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <Link href={pathFor("algae", lang)} className="link mt-5 inline-flex min-h-11 items-center font-medium">
            {c.notLink}
          </Link>
        </aside>
      </section>

      <section className={`${wrap} mt-28 md:mt-36`}>
        <h2 className="text-[length:var(--text-section)] font-bold leading-tight">{c.whoH}</h2>
        <dl className="mt-10 border-t border-rule">
          {c.who.map((w) => (
            <div key={w.h} className="grid gap-2 py-7 md:grid-cols-12 md:gap-8">
              <dt className="md:col-span-4 text-xl font-bold">{w.h}</dt>
              <dd className="md:col-span-8 max-w-[60ch] text-ink-2">{w.p}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={`${wrap} mt-20 md:mt-28`}>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="text-[length:var(--text-section)] font-bold leading-tight">{c.teamH}</h2>
            <p className="mt-5 max-w-[45ch]">{c.team}</p>
            <p className="mt-5 max-w-[45ch] text-ink-2">{c.support}</p>
          </div>
          <ul className="md:col-span-7 grid grid-cols-2 gap-5 md:gap-8">
            {members.map((m) => (
              <li key={m.name}>
                <Image
                  src={m.image}
                  alt={m.name}
                  width={640}
                  height={853}
                  sizes="(min-width: 768px) 320px, 45vw"
                  className="aspect-[3/4] w-full rounded-[var(--radius-block)] object-cover object-top"
                />
                <p className="mt-4 text-lg font-bold">{m.name}</p>
                <p className="text-ink-2">{m.role[lang]}</p>
                <p className="text-sm text-ink-2">{m.bio[lang]}</p>
                <a href={m.linkedin} rel="noopener noreferrer" className="link inline-flex min-h-11 items-center text-sm">
                  LinkedIn<span className="sr-only">: {m.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id={a.news} className={`${wrap} mt-28 md:mt-36`}>
        <h2 className="text-[length:var(--text-section)] font-bold leading-tight">{c.newsH}</h2>
        <ol className="mt-8">
          {news.map((n) => (
            <li key={n.slug} className="grid gap-1 py-6 md:grid-cols-12 md:gap-8">
              <time dateTime={n.publishedAt} className="md:col-span-3 text-ink-2 md:pt-1">
                {formatDate(n.publishedAt, lang)}
              </time>
              <div className="md:col-span-9">
                <h3 className="text-xl font-bold">
                  <Link href={pathFor("news", lang, n.slug)} className="transition-colors duration-150 hover:text-magenta hover:underline underline-offset-4">
                    {n.title[lang]}
                  </Link>
                </h3>
                <p className="mt-2 max-w-[65ch] text-ink-2">{n.excerpt[lang]}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id={a.contact} className={`${wrap} mt-20 md:mt-28`}>
        <div className="grid gap-10 rounded-[var(--radius-block)] bg-sea p-6 md:grid-cols-12 md:p-12">
          <div className="md:col-span-5">
            <h2 className="text-[length:var(--text-section)] font-bold leading-tight">{t.contact.heading}</h2>
            <p className="mt-5 max-w-[40ch]">{t.contact.body}</p>
            <dl className="mt-8 space-y-4">
              <div>
                <dt className="font-medium">{t.contact.emailLabel}</dt>
                <dd>
                  <a href={`mailto:${siteConfig.email}`} className="link">{siteConfig.email}</a>
                </dd>
              </div>
              <div>
                <dt className="font-medium">{t.contact.addressLabel}</dt>
                <dd>
                  <a href={siteConfig.mapsUrl} rel="noopener noreferrer" className="link">{siteConfig.address}</a>
                </dd>
              </div>
            </dl>
          </div>
          <div className="md:col-span-7">
            <h3 className="sr-only">{t.contact.formTitle}</h3>
            <ContactForm lang={lang} />
          </div>
        </div>
      </section>
    </>
  );
}
