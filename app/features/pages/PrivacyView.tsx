import { pathFor, siteConfig, type Language } from "../../lib/data/content";
import { CookieSettingsButton } from "../../shared/components/Consent";
import Article from "./Article";

export const privacyCopy = {
  no: {
    title: "Personvern og informasjonskapsler",
    description: "Hvilke personopplysninger duxpace.no behandler, hvilke informasjonskapsler som settes, og hvordan du endrer samtykket ditt.",
    updated: "Sist oppdatert 21. november 2026.",
    sections: [
      {
        h: "Hvem som er ansvarlig",
        p: [
          `DuxPace drives av Tri Tac Le og Andre Nielsen i Trondheim. DuxPace er ikke registrert som foretak ennå, så det er vi to som er ansvarlige for behandlingen. Spørsmål om personvern sendes til ${siteConfig.email}.`,
        ],
      },
      {
        h: "Kontaktskjemaet",
        p: [
          "Når du sender skjemaet, får vi navnet ditt, e-postadressen, temaet og meldingen. Meldingen sendes som e-post til innboksen vår gjennom tjenesten Resend. Vi bruker opplysningene bare til å svare deg, og sletter dem når du ber om det.",
          "Etter en sending setter vi en informasjonskapsel (rl_contact) som varer i 60 sekunder, så skjemaet ikke kan brukes til å sende mange meldinger på rad. Den er nødvendig for at skjemaet skal virke, og krever ikke samtykke.",
        ],
      },
      {
        h: "Statistikk uten informasjonskapsler",
        p: [
          "Vi bruker Vercel Web Analytics og Speed Insights for å se hvor mange som besøker sidene og hvor raskt de laster. Disse setter ingen informasjonskapsler og viser oss bare samlede tall.",
        ],
      },
      {
        h: "Google Analytics, bare med samtykke",
        p: [
          "Hvis du godtar statistikk, laster vi Google Analytics 4. Den setter informasjonskapslene _ga og _ga_ etterfulgt av en kode, for å skille besøk fra hverandre. Hvis du avslår eller ikke svarer, lastes ikke Google Analytics i det hele tatt.",
          "Valget ditt lagres i informasjonskapselen dp_consent i 180 dager. Du kan endre det når som helst, og hvis du trekker samtykket, sletter vi Google-kapslene i nettleseren din.",
        ],
      },
      {
        h: "Dine rettigheter",
        p: [
          "Du kan be om innsyn i, retting av og sletting av opplysninger vi har om deg. Skriv til oss på e-post. Mener du at vi behandler opplysninger i strid med regelverket, kan du klage til Datatilsynet.",
        ],
      },
    ],
    change: "Endre samtykke til informasjonskapsler",
  },
  en: {
    title: "Privacy and cookies",
    description: "What personal data duxpace.no processes, which cookies are set, and how to change your consent.",
    updated: "Last updated 21 November 2026.",
    sections: [
      {
        h: "Who is responsible",
        p: [
          `DuxPace is run by Tri Tac Le and Andre Nielsen in Trondheim. DuxPace is not yet registered as a company, so the two of us are responsible for the processing. Send privacy questions to ${siteConfig.email}.`,
        ],
      },
      {
        h: "The contact form",
        p: [
          "When you send the form, we receive your name, email address, topic and message. The message is delivered as email to our inbox through the Resend service. We use it only to answer you, and delete it when you ask.",
          "After sending, we set a cookie (rl_contact) that lasts 60 seconds, so the form cannot be used to send many messages in a row. It is needed for the form to work and does not require consent.",
        ],
      },
      {
        h: "Statistics without cookies",
        p: [
          "We use Vercel Web Analytics and Speed Insights to see how many people visit and how fast pages load. They set no cookies and show us only aggregate numbers.",
        ],
      },
      {
        h: "Google Analytics, only with consent",
        p: [
          "If you allow statistics, we load Google Analytics 4. It sets the cookies _ga and _ga_ followed by a code, to tell visits apart. If you decline or do not answer, Google Analytics is not loaded at all.",
          "Your choice is stored in the dp_consent cookie for 180 days. You can change it at any time, and if you withdraw consent, we delete the Google cookies in your browser.",
        ],
      },
      {
        h: "Your rights",
        p: [
          "You can ask for access to, correction of and deletion of data we hold about you. Write to us by email. If you believe we process data unlawfully, you can complain to Datatilsynet, the Norwegian Data Protection Authority.",
        ],
      },
    ],
    change: "Change cookie consent",
  },
};

export default function PrivacyView({ lang }: { lang: Language }) {
  const c = privacyCopy[lang];
  return (
    <Article title={c.title} crumbs={[{ name: "DuxPace", href: pathFor("home", lang) }]} lang={lang} route="privacy">
      <p className="mt-4 text-ink-2">{c.updated}</p>
      {c.sections.map((s) => (
        <section key={s.h} className="mt-12">
          <h2 className="text-2xl font-bold leading-tight">{s.h}</h2>
          {s.p.map((p) => (
            <p key={p} className="mt-4 max-w-[65ch]">{p}</p>
          ))}
        </section>
      ))}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <CookieSettingsButton
          label={c.change}
          className="mt-10 min-h-12 rounded-[var(--radius-control)] border border-ink-2 px-5 font-semibold transition-colors duration-150 hover:bg-sea"
        />
      )}
    </Article>
  );
}
