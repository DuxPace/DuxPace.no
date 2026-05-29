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
      "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&q=80",
    alt: "Trophy award",
    date: "May 21, 2026",
    dateNo: "21. mai 2026",
    title: "NTNU Discovery Award – 300,000 kr",
    titleNo: "NTNU Discovery-prisen – 300 000 kr",
    description:
      "DuxPace wins 300,000 kr at the NTNU Discovery Award on May 21, 2026, recognizing our satellite-based approach to aquaculture monitoring.",
    descriptionNo:
      "DuxPace vinner 300 000 kr i NTNU Discovery-prisen 21. mai 2026, som anerkjenner vår satellittbaserte tilnærming til overvåking av havbruk.",
    content:
      "On May 21, 2026, DuxPace wins the NTNU Discovery Award, receiving 300,000 kr in recognition of our work applying satellite intelligence to aquaculture.\n\nThe award validates our approach of using Sentinel satellite data to detect algal blooms and environmental risk factors affecting fish farming operations.\n\nThis funding will accelerate development of our core product and support continued collaboration with partners in the aquaculture industry.",
    contentNo:
      "Den 21. mai 2026 vinner DuxPace NTNU Discovery-prisen og mottar 300 000 kr som anerkjennelse for arbeidet vårt med å anvende satellittintelligens på havbruk.\n\nPrisen bekrefter tilnærmingen vår med å bruke Sentinel-satellittdata til å oppdage algeoppblomstringer og miljørisikofaktorer som påvirker fiskeoppdrettsvirksomheter.\n\nMidlene vil akselerere utviklingen av kjerneprodukt og støtte videre samarbeid med partnere i oppdrettsnæringen.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&q=80",
    alt: "Fish farming",
    date: "Early 2026",
    dateNo: "Tidlig 2026",
    title: "Partnership with EquaFish AS",
    titleNo: "Partnerskap med EquaFish AS",
    description:
      "After initial talks starting in September 2025, DuxPace formalizes a partnership with EquaFish AS in early 2026 to provide satellite-based insights for their platform.",
    descriptionNo:
      "Etter innledende dialog fra september 2025 formaliserer DuxPace et partnerskap med EquaFish AS tidlig i 2026 for å levere satellittbasert innsikt til deres plattform.",
    content:
      "DuxPace begins discussions with EquaFish AS in September 2025, exploring how satellite intelligence can support fish farming operations.\n\nIn early 2026, the collaboration is formalized in writing. DuxPace contributes insights derived from Sentinel satellite data—such as indicators relevant to algal bloom risk and environmental conditions—which EquaFish can integrate and use within their platform.\n\nThe partnership strengthens the bridge between satellite data and day-to-day operational decision-making in aquaculture.",
    contentNo:
      "DuxPace innleder dialog med EquaFish AS i september 2025, med mål om å utforske hvordan satellittintelligens kan støtte driften i oppdrett.\n\nTidlig i 2026 blir samarbeidet formaliseres skriftlig. DuxPace bidrar med innsikt utledet fra Sentinel-satellittdata—som indikatorer relevante for risiko for algeoppblomstring og miljøforhold—som EquaFish kan integrere og bruke i sin plattform.\n\nPartnerskapet styrker koblingen mellom satellittdata og operasjonelle beslutninger i havbruk.",
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
      "DuxPace is awarded 50,000 kr through Aneobidraget, securing three months of Sentinel satellite data access for development.",
    descriptionNo:
      "DuxPace tildeles 50 000 kr gjennom Aneobidraget, noe som sikrer tre måneders tilgang til Sentinel-satellittdata for utvikling.",
    content:
      "DuxPace is awarded 50,000 kr through Aneobidraget, a grant supporting early-stage innovation at NTNU.\n\nThe funding secures three months of Sentinel satellite data access, enabling the team to accelerate MVP development and validate our algal bloom detection models with real satellite imagery.\n\nThis grant represents an important milestone in our journey toward a commercially viable product.",
    contentNo:
      "DuxPace tildeles 50 000 kr gjennom Aneobidraget, et tilskudd som støtter tidligfaseinnovasjon ved NTNU.\n\nFinansieringen sikrer tre måneders tilgang til Sentinel-satellittdata, noe som gjør at teamet kan akselerere MVP-utviklingen og validere modellene våre for deteksjon av algeoppblomstringer med ekte satellittbilder.\n\nDette tilskuddet representerer en viktig milepæl på veien mot et kommersielt levedyktig produkt.",
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
      "DuxPace is founded at NTNU Trondheim. The early work explored satellite applications broadly, and the focus on aquaculture developed over time.",
    descriptionNo:
      "DuxPace stiftes ved NTNU Trondheim. Det tidlige arbeidet utforsket satellittbruksområder bredt, og fokuset på havbruk utviklet seg over tid.",
    content:
      "DuxPace is founded at NTNU Trondheim by a team of engineers with a shared ambition: turning satellite data into practical solutions.\n\nIn the beginning, our work was not specifically focused on aquaculture. We explored multiple use cases, and our focus gradually shifted toward fish farming—especially AI-powered monitoring of algal blooms using Sentinel satellite data.\n\nWe established our base at Gründerbrakka (NTNU) in January 2026.",
    contentNo:
      "DuxPace stiftes ved NTNU Trondheim av et team ingeniører med en felles ambisjon: å gjøre satellittdata om til praktiske løsninger.\n\nI starten var arbeidet vårt ikke spesifikt rettet mot havbruksnæringen. Vi utforsket flere bruksområder, og fokuset vårt dreide seg gradvis mot oppdrett—særlig KI-drevet overvåking av algeoppblomstringer ved hjelp av Sentinel-satellittdata.\n\nVi etablerte oss med base på Gründerbrakka (NTNU) i januar 2026.",
  },
];
