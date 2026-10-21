"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";
import { FadeIn } from "../../../shared/components/animations/ScrollReveal";
import { useLanguage } from "../../../shared/providers/LanguageProvider";
import { members as staticMembers, type Member } from "../../../lib/data/members";

export default function Team({ initialMembers }: { initialMembers?: Member[] }) {
  const { lang, t } = useLanguage();
  const members = initialMembers && initialMembers.length > 0 ? initialMembers : staticMembers;

  return (
    <section id="team" className="py-16 md:py-24 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
        <FadeIn className="md:col-span-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {t.team.headline}
          </h2>
        </FadeIn>

        <ul className="md:col-span-8 grid grid-cols-2 gap-6 md:gap-10 max-w-2xl">
          {members.map((member, i) => {
            const role = lang === "no" && member.roleNo ? member.roleNo : member.role;
            const bio = lang === "no" && member.bioNo ? member.bioNo : member.bio;
            return (
              <li key={member.name}>
                <FadeIn delay={i * 0.06}>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-md mb-5 bg-white/[0.03]">
                    <Image
                      src={member.image}
                      alt={`${member.name}, ${role}`}
                      fill
                      loading={i < 2 ? "eager" : "lazy"}
                      sizes="(max-width: 768px) 45vw, 320px"
                      className="object-cover object-top"
                    />
                  </div>
                  <h3 className="text-white text-lg font-semibold leading-snug">{member.name}</h3>
                  <p className="text-xs font-mono tracking-[0.14em] uppercase text-blue-400 mt-1">{role}</p>
                  {bio && <p className="text-gray-400 text-base mt-3 leading-relaxed">{bio}</p>}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 min-h-11 mt-2 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <Linkedin size={16} aria-hidden="true" />
                    LinkedIn
                  </a>
                </FadeIn>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
