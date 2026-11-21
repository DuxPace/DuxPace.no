import type { Language } from "./content";

export type Member = {
  name: string;
  role: Record<Language, string>;
  bio: Record<Language, string>;
  image: string;
  linkedin: string;
};

// The roster of record. Sanity can supply a photo, but only these people are shown.
export const members: Member[] = [
  {
    name: "Andre Nielsen",
    role: { no: "Produktsjef", en: "Chief product officer" },
    bio: { no: "4. år kybernetikk ved NTNU.", en: "4th year Cybernetics at NTNU." },
    image: "/images/team/andre.jpg",
    linkedin: "https://www.linkedin.com/in/andr%C3%A9-nielsen-2846a434a/",
  },
  {
    name: "Tri Tac Le",
    role: { no: "Teknologisjef", en: "Chief technology officer" },
    bio: { no: "2. år informatikk ved NTNU.", en: "2nd year Computer Science at NTNU." },
    image: "/images/team/tri.jpg",
    linkedin: "https://www.linkedin.com/in/tritacle/",
  },
];
