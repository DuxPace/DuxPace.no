export type Member = {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin: string;
  email: string;
};

export const members: Member[] = [
  {
    name: "Herman Castberg",
    role: "CEO",
    image: "/images/team/herman.jpg",
    bio: "Project Manager for FramSat-1. Bachelor in Material Science at NTNU",
    linkedin: "https://www.linkedin.com/in/herman-castberg-17a17b109/",
    email: "planet@duxpace.no",
  },
  {
    name: "Andre Nielsen",
    role: "CPO",
    image: "/images/team/andre.jpg",
    bio: "4th year Cybernetics at NTNU",
    linkedin: "https://www.linkedin.com/in/andr%C3%A9-nielsen-2846a434a/",
    email: "planet@duxpace.no",
  },
  {
    name: "Tri Tac Le",
    role: "CTO",
    image: "/images/team/tri.jpg",
    bio: "2nd year Computer Science at NTNU",
    linkedin: "https://www.linkedin.com/in/tritacle/",
    email: "planet@duxpace.no",
  },
];
