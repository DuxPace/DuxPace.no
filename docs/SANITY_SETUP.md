# Sanity CMS Setup Guide

## 1. Opprette Sanity-prosjekt

1. Gå til [sanity.io/manage](https://sanity.io/manage)
2. Logg inn med GitHub eller Google
3. Klikk "Add project"
4. Velg "Clean project with no predefined schemas"
5. Noter prosjekt-IDen (f.eks. `abc12345`)

## 2. Konfigurere miljøvariabler

Oppdater `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=din_prosjekt_id_her
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-03-05
```

## 3. Sette opp Sanity Studio

For å kunne redigere innhold trenger du Sanity Studio. Du har to alternativer:

### Alternativ A: Hosted Studio (Enklest)

1. I Sanity-dashboardet, gå til "API" → "CORS Origins"
2. Legg til `http://localhost:3000` for lokal utvikling
3. Legg til ditt Vercel-domene for produksjon
4. Studio blir tilgjengelig på `https://din-prosjekt-id.sanity.studio`

### Alternativ B: Egen Studio-mappe (Lokal redigering)

1. Kjør: `npx sanity@latest init --project your-project-id`
2. Velg "Create new studio"
3. Velg "Use schema from existing project"
4. Kopier `sanity/schemas/` til studio-mappen
5. Start studio: `npm run dev` i studio-mappen

## 4. Hente API-token (valgfritt for lesing, påkrevd for skriving)

Hvis du skal ha Server Actions som skriver til Sanity:

1. Gå til "API" → "Tokens"
2. Klikk "Add API token"
3. Gi navn: "DuxPace Website"
4. Velg "Editor" eller "Admin" rolle
5. Legg til i `.env.local`:

```bash
SANITY_API_TOKEN=din_token_her
SANITY_WRITE_TOKEN=din_write_token_her
```

## 5. Importere eksisterende innhold

Etter at Studio er satt opp, kan du importere eksisterende innhold:

```bash
npm run sanity-import
```

Eller manuelt i Studio:

1. Gå til [din-prosjekt-id.sanity.studio](https://din-prosjekt-id.sanity.studio)
2. Opprett dokumenter:
   - **Site Settings**: Tittel, beskrivelse, kontaktinfo
   - **Hero Section**: Hovedtittel og undertittel
   - **About Section**: Om oss tekst
   - **Team Members**: Team-medlemmer
   - **News Articles**: Nyhetsartikler
   - **Contact Section**: Kontaktskjema tekster

## 6. Testing

1. Start utviklingsserveren: `npm run dev`
2. Åpne `http://localhost:3000`
3. Verifiser at innhold lastes fra Sanity
4. Endre tekst i Sanity Studio
5. Siden skal oppdateres automatisk (ISR)

## Struktur

### Innholdstyper

- **Site Settings**: Globale innstillinger (tittel, meta, sosiale lenker)
- **Hero Section**: Forsidens hovedseksjon
- **About Section**: Om oss seksjon
- **Team Member**: Team-medlemmer med bilde og bio
- **News Article**: Nyhetsartikler med rich text
- **Contact Section**: Kontaktskjema tekster

### Lokalisering

Alle tekstfelter støtter norsk og engelsk. I Sanity ser du to felt:

- **no**: Norsk
- **en**: English

Nettsiden henter automatisk riktig språk basert på brukerens valg.

## Hjelp

- [Sanity dokumentasjon](https://www.sanity.io/docs)
- [Next.js + Sanity guide](https://www.sanity.io/guides/nextjs-live-preview)
- [Portable Text](https://www.portabletext.org/) (Rich text format)

## Feilsøking

**Problem**: `Project ID is required`

- Sjekk at `NEXT_PUBLIC_SANITY_PROJECT_ID` er satt i `.env.local`
- Restart utviklingsserveren etter endringer

**Problem**: `401 Unauthorized`

- Sjekk at CORS er konfigurert i Sanity-dashboardet
- Verifiser at dataset-navnet er riktig (`production`)

**Problem**: Endringer vises ikke

- Sanity bruker CDN som cacher innhold i 60 sekunder
- Vent litt, eller bruk `useCdn: false` i utvikling
- Sjekk at dokumentet er publisert (ikke bare lagret som utkast)
