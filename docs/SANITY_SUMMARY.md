# Sanity CMS Integrasjon - Oppsummering

## ✅ Hva som er gjort

### 1. Installert avhengigheter

- `@sanity/client` - For å hente data fra Sanity
- `@sanity/image-url` - For å generere bilde-URLer
- `@portabletext/react` - For å rendre rich text

### 2. Opprettet Sanity-konfigurasjon

**Filer opprettet:**

- `/lib/sanity.ts` - Sanity-klient og bilde-URL helper
- `/lib/sanity.queries.ts` - Alle GROQ-queries for å hente data
- `/sanity/config.ts` - Konfigurasjon
- `/sanity/schemas/` - Alle innholdstyper

**Innholdstyper definert:**

- `siteSettings` - Globale innstillinger (tittel, beskrivelse, kontakt)
- `heroSection` - Forsidens hovedseksjon
- `aboutSection` - Om oss seksjon
- `teamMember` - Team-medlemmer
- `newsArticle` - Nyhetsartikler
- `contactSection` - Kontaktskjema tekster
- `localizedString/Text/RichText` - Oversettelsesstøtte

### 3. Oppdatert komponenter

**Nye filer:**

- `/app/components/SanityProvider.tsx` - Context for å dele Sanity-data

**Oppdaterte komponenter:**

- `/app/page.tsx` - Server-komponent som henter data og wrapper med Provider
- `/app/components/sections/Hero.tsx` - Bruker Sanity-data med fallback
- `/app/components/sections/Team.tsx` - Bruker Sanity team-medlemmer med fallback

### 4. Miljøvariabler

Oppdatert `/env.local` og `.env.local.example` med:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-03-05
```

### 5. ISR (Incremental Static Regeneration)

- Page revalideres hvert 60. sekund
- Du kan endre tekst i Sanity og det oppdateres automatisk

### 6. Import-script

- `/scripts/import-to-sanity.js` - For å importere eksisterende innhold

### 7. Dokumentasjon

- `/docs/SANITY_SETUP.md` - Komplett oppsettsguide
- Denne filen - Oppsummering

## 🚀 Neste steg

### 1. Opprette Sanity-prosjekt

```bash
# Gå til sanity.io/manage
# Opprett nytt prosjekt
# Noter prosjekt-ID
```

### 2. Konfigurere miljøvariabler

```bash
# Oppdater .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=din_prosjekt_id
```

### 3. Sette opp CORS

I Sanity-dashboardet:

- Gå til API → CORS Origins
- Legg til: `http://localhost:3000`
- Legg til: `https://duxpace.no` (produksjon)

### 4. Sette opp Studio (valgfritt men anbefalt)

**Alternativ A: Hosted Studio**

- Studio er tilgjengelig på `https://din-prosjekt-id.sanity.studio`
- Du redigerer direkte i nettleseren

**Alternativ B: Lokal Studio-mappe**

```bash
npx sanity@latest init --project din_prosjekt_id
# Velg "Create new studio"
# Kopier schemas fra /sanity/schemas/
```

### 5. Importere innhold

```bash
# Legg til write-token i .env.local
SANITY_WRITE_TOKEN=din_token

# Kjør import
node scripts/import-to-sanity.js
```

### 6. Legge til team-medlemmer

I Sanity Studio:

1. Opprett Team Member-dokumenter
2. Last opp bilder
3. Fyll ut norsk og engelsk tekst

### 7. Teste

```bash
npm run dev
# Åpne http://localhost:3000
# Verifiser at alt fungerer
```

## 📁 Filstruktur

```
duxpace.no/
├── app/
│   ├── components/
│   │   ├── SanityProvider.tsx    # Ny
│   │   └── sections/
│   │       ├── Hero.tsx          # Oppdatert
│   │       ├── Team.tsx          # Oppdatert
│   │       └── ...
│   └── page.tsx                  # Oppdatert
├── lib/
│   ├── sanity.ts                 # Ny
│   └── sanity.queries.ts         # Ny
├── sanity/
│   ├── config.ts                 # Ny
│   └── schemas/                  # Nye filer
│       ├── index.ts
│       ├── siteSettings.ts
│       ├── heroSection.ts
│       ├── aboutSection.ts
│       ├── teamMember.ts
│       ├── newsArticle.ts
│       ├── contactSection.ts
│       └── localizedText.ts
├── scripts/
│   └── import-to-sanity.js       # Ny
├── docs/
│   └── SANITY_SETUP.md           # Ny
├── .env.local                    # Oppdatert
└── .env.local.example            # Oppdatert
```

## 🔧 Hvordan bruke Sanity i komponenter

### Eksempel: Hente data

```tsx
import { useSanity } from "../SanityProvider";
import { getLocalizedValue } from "@/lib/sanity";

function MyComponent() {
  const { hero, teamMembers } = useSanity();
  const { lang } = useLanguage();

  // Hent oversatt verdi
  const title = getLocalizedValue(hero?.title, lang);

  return <h1>{title}</h1>;
}
```

### Eksempel: Rendre bilder

```tsx
import { urlFor } from "@/lib/sanity";
import Image from "next/image";

function TeamMember({ member }) {
  return <Image src={urlFor(member.image).url()} alt={member.name} width={400} height={500} />;
}
```

## 🎯 Fordeler med denne løsningen

1. **Fallback-strategi** - Fungerer med og uten Sanity-data
2. **Oversettelser** - Støtter norsk og engelsk i alle tekstfelt
3. **Automatisk oppdatering** - ISR sørger for at endringer vises raskt
4. **TypeScript** - Full typesikkerhet
5. **Bilder** - Automatisk bildeoptimalisering via Sanity
6. **Rich Text** - Portable Text-format støtter formatering

## ⚠️ Viktig å huske

- Du må sette opp Sanity-prosjektet før nettsiden kan hente data
- CORS må konfigureres for localhost og produksjonsdomene
- Team-medlemmer må legges til manuelt (bilder kan ikke importeres automatisk)
- Endringer i Sanity vises innen 60 sekunder (ISR)

## 📚 Ressurser

- [Sanity dokumentasjon](https://www.sanity.io/docs)
- [GROQ-spørringer](https://www.sanity.io/docs/groq)
- [Portable Text](https://www.portabletext.org/)
- [Sanity + Next.js guide](https://www.sanity.io/guides/nextjs-live-preview)

## ❓ Ofte stilte spørsmål

**Q: Må jeg ha et eget Studio?**  
A: Nei, du kan bruke det hostede Studioet på sanity.studio

**Q: Hva koster Sanity?**  
A: Gratis for opp til 3 brukere og 10GB data

**Q: Kan jeg bytte tilbake til hardkodet tekst?**  
A: Ja, fjern SanityProvider fra page.tsx og komponentene bruker fallback

**Q: Hvorfor ser jeg ingen endringer?**  
A: Vent 60 sekunder (ISR), eller restart dev-serveren

**Q: Hvordan legger jeg til nye sider?**  
A: Opprett ny schema-fil i /sanity/schemas/, legg til i index.ts, oppdater queries.ts
