export type Member = {
  name: string;
  role: string;
  roleNo?: string;
  image: string;
  bio: string;
  bioNo?: string;
  linkedin: string;
};

export const members: Member[] = [
  {
    name: "Andre Nielsen",
    role: "CPO",
    image: "/images/team/andre.jpg",
    bio: "4th year Cybernetics at NTNU",
    linkedin: "https://www.linkedin.com/in/andr%C3%A9-nielsen-2846a434a/",
  },
  {
    name: "Tri Tac Le",
    role: "CTO",
    image: "/images/team/tri.jpg",
    bio: "2nd year Computer Science at NTNU",
    linkedin: "https://www.linkedin.com/in/tritacle/",
  },
];
