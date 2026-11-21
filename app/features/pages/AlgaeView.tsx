import Link from "next/link";
import { pathFor, type Language } from "../../lib/data/content";
import Article from "./Article";

export const algaeCopy = {
  no: {
    title: "Skadelige alger i norsk havbruk",
    description:
      "Hva skadelige algeoppblomstringer er, hvor du følger med på dem, hva satellitter kan og ikke kan måle, og hva DuxPace har funnet i egne data.",
    lead: "Hva det er, hvor du følger med, og hva satellitter kan og ikke kan si i dag.",
    sections: [
      {
        h: "Hva det er",
        p: [
          "Noen mikroalger kan skade eller drepe fisk når de blomstrer opp. Pseudochattonella er en av artene som omtales når næringen forbereder seg på algesesongen.",
          "Oppblomstringer følges per produksjonsområde, og fagpressen omtaler dem ofte med kodene PO1, PO2 og så videre.",
        ],
      },
      {
        h: "Hvor du følger med",
        p: [
          "Havforskningsinstituttet publiserer en ukentlig algestatus per produksjonsområde, sammen med satellittkart over klorofyll for hele kysten. Det er den nasjonale overvåkingen, og stedet å starte.",
          "Mattilsynet har en egen side om forebygging og beredskap ved algeoppblomstring, med tegn å se etter og tiltak oppdrettere kan gjøre.",
        ],
      },
      {
        h: "Hva satellitter kan se",
        p: [
          "Sentinel-2 og Sentinel-3 måler fargen på havoverflaten. Fra den kan man regne ut indekser for klorofyll, som NDCI. En slik indeks sier noe om hvor mye alger det er i overflaten, men ikke hvilke arter det er, og skyer stopper målingen.",
        ],
      },
      {
        h: "Hva vi har funnet",
        p: [
          "Vi koblet satellittdata mot 16 ukentlige algeprøver fra en lokalitet i Nordfjord. Med skyfilteret vi vanligvis bruker kunne bare én satellittscene i hele perioden kobles til en prøve. Med et løsere filter fikk vi 17 til 18 par, og fant ingen sammenheng: korrelasjonen mellom NDCI og antall kiselalger var 0,00.",
          "Grunnene er to: for få prøver, og skyene fjerner de fleste dagene det ble tatt prøver. Det betyr ikke at det er umulig, men at vi ikke kan love algevarsel fra satellitt i dag. Derfor gjør vi det ikke.",
        ],
      },
    ],
    sourcesH: "Kilder",
    sources: [
      { label: "Havforskningsinstituttet: Algestatus", url: "https://algestatus.hi.no" },
      {
        label: "Mattilsynet: Algeoppblomstring, forebygging og beredskap",
        url: "https://mattilsynet.no/fisk-og-akvakultur/fiskevelferd/algeoppblomstring-forebygging-og-beredskap",
      },
    ],
    solution: "Les hva DuxPace varsler i stedet",
  },
  en: {
    title: "Harmful algae in Norwegian aquaculture",
    description:
      "What harmful algal blooms are, where to follow them, what satellites can and cannot measure, and what DuxPace found in its own data.",
    lead: "What they are, where to follow them, and what satellites can and cannot tell you today.",
    sections: [
      {
        h: "What they are",
        p: [
          "Some microalgae can harm or kill fish when they bloom. Pseudochattonella is one of the species mentioned when the industry prepares for the algae season.",
          "Blooms are tracked by production area, and the trade press usually refers to them by codes such as PO1 and PO2.",
        ],
      },
      {
        h: "Where to follow them",
        p: [
          "The Norwegian Institute of Marine Research publishes a weekly algae status per production area, with satellite chlorophyll maps for the whole coast. That is the national monitoring and the place to start.",
          "The Norwegian Food Safety Authority has a page on preventing and preparing for algal blooms, with signs to watch for and measures farmers can take.",
        ],
      },
      {
        h: "What satellites can see",
        p: [
          "Sentinel-2 and Sentinel-3 measure the colour of the sea surface. From that you can compute chlorophyll indices such as NDCI. Such an index says something about how much algae there is at the surface, but not which species, and clouds stop the measurement.",
        ],
      },
      {
        h: "What we found",
        p: [
          "We matched satellite data with 16 weekly algae samples from a site in Nordfjord. With our usual cloud filter, only one satellite scene in the whole period could be matched to a sample. With a looser filter we got 17 to 18 pairs and found no relationship: the correlation between NDCI and diatom counts was 0.00.",
          "There are two reasons: too few samples, and clouds remove most of the days samples were taken. That does not make it impossible, but it means we cannot promise algae warnings from satellite today. So we do not.",
        ],
      },
    ],
    sourcesH: "Sources",
    sources: [
      { label: "Institute of Marine Research: Algestatus (Norwegian)", url: "https://algestatus.hi.no" },
      {
        label: "Norwegian Food Safety Authority: algal blooms (Norwegian)",
        url: "https://mattilsynet.no/fisk-og-akvakultur/fiskevelferd/algeoppblomstring-forebygging-og-beredskap",
      },
    ],
    solution: "Read what DuxPace forecasts instead",
  },
};

export default function AlgaeView({ lang }: { lang: Language }) {
  const c = algaeCopy[lang];
  return (
    <Article title={c.title} lead={c.lead} crumbs={[{ name: "DuxPace", href: pathFor("home", lang) }]} lang={lang} route="algae">
      {c.sections.map((s) => (
        <section key={s.h} className="mt-14">
          <h2 className="text-[length:var(--text-section)] font-bold leading-tight">{s.h}</h2>
          {s.p.map((p) => (
            <p key={p} className="mt-4 max-w-[65ch]">{p}</p>
          ))}
        </section>
      ))}
      <section className="mt-14 rounded-[var(--radius-block)] bg-sea p-6 md:p-8 max-w-3xl">
        <h2 className="text-xl font-bold">{c.sourcesH}</h2>
        <ul className="mt-3">
          {c.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} rel="noopener noreferrer" className="link inline-flex min-h-11 items-center">{s.label}</a>
            </li>
          ))}
        </ul>
      </section>
      <Link href={pathFor("solution", lang)} className="link mt-10 inline-flex min-h-11 items-center text-lg font-medium">
        {c.solution}
      </Link>
    </Article>
  );
}
