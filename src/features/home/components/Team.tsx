import { TeamDisplay, type TeamMemberDisplay } from "./TeamDisplay"

const MEMBERS: TeamMemberDisplay[] = [
  {
    name: "Herman Castberg",
    role: { en: "CEO", no: "Daglig leder" },
    image: "/images/team/herman.jpg",
    bio: { en: "Project manager for FramSat-1. Bachelor in Material Science at NTNU.", no: "Prosjektleder for FramSat-1. Bachelor i materialteknologi ved NTNU." },
    linkedin: "https://www.linkedin.com/in/herman-castberg-17a17b109/",
  },
  {
    name: "Andre Nielsen",
    role: { en: "CPO", no: "Produktsjef" },
    image: "/images/team/andre.jpg",
    bio: { en: "4th year Cybernetics at NTNU.", no: "4. år kybernetikk ved NTNU." },
    linkedin: "https://www.linkedin.com/in/andr%C3%A9-nielsen-2846a434a/",
  },
  {
    name: "Tri Tac Le",
    role: { en: "CTO", no: "Teknologisjef" },
    image: "/images/team/tri.jpg",
    bio: { en: "3rd year Data Engineering at NTNU.", no: "3. år dataingeniørfag ved NTNU." },
    linkedin: "https://www.linkedin.com/in/tritacle/",
  },
]

export function Team() {
  return <TeamDisplay members={MEMBERS} />
}
