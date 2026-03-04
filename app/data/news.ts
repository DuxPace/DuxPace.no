import type { Language } from "./content";

export type NewsItem = {
  image: string;
  alt: string;
  date: string;
  dateNo: string;
  title: string;
  titleNo: string;
  description: string;
  descriptionNo: string;
  content: string;
  contentNo: string;
};

export function localize(item: NewsItem, lang: Language) {
  return {
    title: lang === "no" ? item.titleNo : item.title,
    description: lang === "no" ? item.descriptionNo : item.description,
    content: lang === "no" ? item.contentNo : item.content,
    date: lang === "no" ? item.dateNo : item.date,
  };
}

export const newsItems: NewsItem[] = [
  {
    image:
      "https://images.unsplash.com/photo-1569429593410-b498b3fb3387?w=600&q=80",
    alt: "Innovation funding",
    date: "February 2026",
    dateNo: "Februar 2026",
    title: "Innovasjon Norge & Discovery Grant Applications",
    titleNo: "Søknader til Innovasjon Norge og Discovery-programmet",
    description:
      "DuxPace submits applications to Innovasjon Norge and the Discovery grant program to fund continued MVP development.",
    descriptionNo:
      "DuxPace sender søknader til Innovasjon Norge og Discovery-programmet for å finansiere videre MVP-utvikling.",
    content:
      "DuxPace submits grant applications to Innovasjon Norge and the Discovery program to secure funding for the next phase of product development.\n\nThe funding will support further development of our algal bloom detection platform, expansion of our satellite data pipeline, and continued collaboration with industry partners EquaFish AS and Mowi.\n\nThese grants are a key step toward scaling our technology and bringing it to market.",
    contentNo:
      "DuxPace sender tilskuddssøknader til Innovasjon Norge og Discovery-programmet for å sikre finansiering til neste fase av produktutviklingen.\n\nMidlene vil støtte videreutvikling av vår plattform for deteksjon av algeoppblomstringer, utvidelse av satellittdatapipelinen vår og fortsatt samarbeid med bransjepartnerne EquaFish AS og Mowi.\n\nDisse tilskuddene er et viktig skritt mot å skalere teknologien vår og bringe den til markedet.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1560523160-754a9e25c68f?w=600&q=80",
    alt: "Salmon farming",
    date: "2025",
    dateNo: "2025",
    title: "Mowi Partnership Discussions",
    titleNo: "Partnerskapsdiskusjoner med Mowi",
    description:
      "DuxPace enters discussions with Mowi, one of the world's largest salmon producers, on data integration and verification.",
    descriptionNo:
      "DuxPace innleder diskusjoner med Mowi, en av verdens største lakseprodusenter, om dataintegrering og verifisering.",
    content:
      "DuxPace initiates discussions with Mowi, one of the world's largest salmon farming companies, regarding satellite data integration and verification for their operations.\n\nThese conversations represent a significant opportunity to bring our algal bloom monitoring technology to an industry leader, and to validate our platform against large-scale real-world aquaculture data.",
    contentNo:
      "DuxPace innleder diskusjoner med Mowi, et av verdens største lakseoppdrettsselskaper, om satellittdataintegrering og verifisering for deres virksomhet.\n\nDisse samtalene representerer en betydelig mulighet til å bringe vår teknologi for overvåking av algeoppblomstringer til en bransjekjempe, og til å validere plattformen vår mot store mengder virkelige havbruksdata.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=600&q=80",
    alt: "Small satellite",
    date: "2025",
    dateNo: "2025",
    title: "Hypso Collaboration",
    titleNo: "Samarbeid med Hypso",
    description:
      "DuxPace begins collaboration with Hypso, NTNU's small satellite program, to explore next-generation satellite data sources.",
    descriptionNo:
      "DuxPace innleder samarbeid med Hypso, NTNUs satellittprogram, for å utforske neste generasjons satellittdatakilder.",
    content:
      "DuxPace begins a collaboration with Hypso, NTNU's pioneering small satellite program, to explore the use of hyperspectral satellite data for algal bloom detection.\n\nHypso's satellites provide high-resolution spectral imagery that could significantly enhance the accuracy of our monitoring models. This collaboration strengthens our ties with NTNU's broader space research ecosystem.",
    contentNo:
      "DuxPace innleder et samarbeid med Hypso, NTNUs banebrytende satellittprogram for småsatellitter, for å utforske bruken av hyperspektral satellittdata til deteksjon av algeoppblomstringer.\n\nHypsos satellitter leverer høyoppløselige spektrale bilder som kan øke nøyaktigheten i overvåkingsmodellene våre betydelig. Dette samarbeidet styrker våre bånd til NTNUs bredere romforskningsøkosystem.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&q=80",
    alt: "Satellite dish",
    date: "Winter 2024",
    dateNo: "Vinteren 2024",
    title: "Aneobidraget Grant Awarded",
    titleNo: "Tildelt Aneobidraget",
    description:
      "DuxPace is awarded 50,000 kr through Aneobidraget, securing three months of Sentinel satellite data access for MVP development.",
    descriptionNo:
      "DuxPace tildeles 50 000 kr gjennom Aneobidraget, noe som sikrer tre måneders tilgang til Sentinel-satellittdata for MVP-utvikling.",
    content:
      "DuxPace is awarded 50,000 kr through Aneobidraget, a grant supporting early-stage innovation at NTNU.\n\nThe funding secures three months of Sentinel satellite data access, enabling the team to accelerate MVP development and validate our algal bloom detection models with real satellite imagery.\n\nThis grant represents an important milestone in our journey toward a commercially viable product.",
    contentNo:
      "DuxPace tildeles 50 000 kr gjennom Aneobidraget, et tilskudd som støtter tidligfaseinnovasjon ved NTNU.\n\nFinansieringen sikrer tre måneders tilgang til Sentinel-satellittdata, noe som gjør at teamet kan akselerere MVP-utviklingen og validere modellene våre for deteksjon av algeoppblomstringer med ekte satellittbilder.\n\nDette tilskuddet representerer en viktig milepæl på veien mot et kommersielt levedyktig produkt.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    alt: "Satellite data",
    date: "Autumn 2024",
    dateNo: "Høsten 2024",
    title: "Collaboration with NORCE & Blått Kompetansesenter",
    titleNo: "Samarbeid med NORCE og Blått Kompetansesenter",
    description:
      "DuxPace partners with NORCE and Blått Kompetansesenter to advance research on satellite data applications in aquaculture.",
    descriptionNo:
      "DuxPace inngår partnerskap med NORCE og Blått Kompetansesenter for å fremme forskning på satellittdataapplikasjoner i havbruk.",
    content:
      "DuxPace establishes a research collaboration with NORCE and Blått Kompetansesenter, two leading institutions in Norwegian marine and aquaculture research.\n\nThe collaboration focuses on applying satellite data to solve practical challenges in the fish farming industry, combining DuxPace's remote sensing capabilities with NORCE's scientific expertise and Blått Kompetansesenter's industry connections.",
    contentNo:
      "DuxPace etablerer et forskningssamarbeid med NORCE og Blått Kompetansesenter, to ledende institusjoner innen norsk havforskning og havbruksforskning.\n\nSamarbeidet fokuserer på å anvende satellittdata for å løse praktiske utfordringer i fiskeoppdrettsnæringen, og kombinerer DuxPaces fjernmålingskompetanse med NORCEs vitenskapelige ekspertise og Blått Kompetansesenters bransjetilknytning.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&q=80",
    alt: "Fish farming",
    date: "Autumn 2024",
    dateNo: "Høsten 2024",
    title: "Partnership with EquaFish AS",
    titleNo: "Partnerskap med EquaFish AS",
    description:
      "DuxPace enters a partnership with EquaFish AS to develop an algal bloom prediction interface for fish farming operations.",
    descriptionNo:
      "DuxPace inngår partnerskap med EquaFish AS for å utvikle et grensesnitt for prediksjon av algeoppblomstringer i fiskeoppdrett.",
    content:
      "DuxPace enters a strategic partnership with EquaFish AS, a key stakeholder in the Norwegian fish farming industry.\n\nTogether, we are developing a user interface and predictive models for monitoring algal blooms using Sentinel satellite data. Biweekly workshops are established to align on product development and real-world operational needs.\n\nThis partnership marks our first major industry collaboration and validates the demand for satellite intelligence in aquaculture.",
    contentNo:
      "DuxPace inngår et strategisk partnerskap med EquaFish AS, en nøkkelaktør i norsk fiskeoppdrettsnæring.\n\nSammen utvikler vi et brukergrensesnitt og prediktive modeller for overvåking av algeoppblomstringer ved hjelp av Sentinel-satellittdata. Det er etablert annenhver uke-workshops for å samkjøre produktutvikling og reelle driftsbehov.\n\nDette partnerskapet markerer vårt første store bransjesamarbeid og bekrefter etterspørselen etter satellittintelligens i havbruk.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=600&q=80",
    alt: "Earth from space",
    date: "June 2024",
    dateNo: "Juni 2024",
    title: "DuxPace Founded at NTNU",
    titleNo: "DuxPace stiftet ved NTNU",
    description:
      "DuxPace is founded at NTNU Trondheim, with a focus on satellite-based solutions for the aquaculture industry.",
    descriptionNo:
      "DuxPace stiftes ved NTNU Trondheim, med fokus på satellittbaserte løsninger for havbruksnæringen.",
    content:
      "DuxPace is founded at NTNU Trondheim, bringing together a team of engineers and scientists focused on applying satellite data to real-world challenges.\n\nOur primary focus is developing AI-powered tools for monitoring algal blooms in fish farming operations using Sentinel satellite data. Based at Gründerbrakka, NTNU, we are positioned at the heart of one of Scandinavia's leading technology and research environments.",
    contentNo:
      "DuxPace stiftes ved NTNU Trondheim, og samler et team av ingeniører og forskere med fokus på å anvende satellittdata på virkelige utfordringer.\n\nHovedfokuset vårt er å utvikle KI-drevne verktøy for overvåking av algeoppblomstringer i fiskeoppdrettsvirksomhet ved hjelp av Sentinel-satellittdata. Med base på Gründerbrakka, NTNU, er vi plassert i hjertet av ett av Skandinavias ledende teknologi- og forskningsmiljøer.",
  },
];
