"use client";

import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";
import FadeIn from "../FadeIn";
import { useLanguage } from "../LanguageProvider";
import { members } from "../../data/members";

export default function Team() {
  const { t } = useLanguage();
  return (
    <section id="team" className="py-28 md:py-40 border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-[11px] text-gray-600 font-mono tracking-[0.22em] uppercase mb-12">
            {t.team.headline}
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-12 max-w-[680px]">
          {members.map((member, i) => (
            <FadeIn key={member.name} delay={i * 80}>
              <div className="group">
                <div className="relative w-full aspect-[3/4] overflow-hidden mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="text-white text-sm font-medium leading-snug">{member.name}</p>
                <p className="text-gray-600 text-xs mt-0.5">{member.role}</p>
                {member.bio && (
                  <p className="text-gray-700 text-[11px] mt-1.5 mb-3 leading-relaxed">{member.bio}</p>
                )}
                <div className="flex gap-3 mt-3">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="text-gray-700 hover:text-white transition-colors"
                  >
                    <Linkedin size={13} aria-hidden="true" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    aria-label={`Email ${member.name}`}
                    className="text-gray-700 hover:text-white transition-colors"
                  >
                    <Mail size={13} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
