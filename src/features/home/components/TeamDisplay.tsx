"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Linkedin, Mail } from "lucide-react"
import { useLocale } from "@/lib/i18n/useT"
import { FadeIn } from "@/lib/motion/ScrollReveal"
import { useT } from "@/lib/i18n/useT"

export interface TeamMemberDisplay {
  name: string
  role: { en: string; no?: string }
  image: string
  bio?: { en?: string; no?: string }
  linkedin?: string
}

function MemberCard({ member, index }: { member: TeamMemberDisplay; index: number }) {
  const { locale } = useLocale()

  const role = member.role[locale] ?? member.role.en
  const bio = member.bio ? (member.bio[locale] ?? member.bio.en ?? "") : ""

  return (
    <motion.article
      className="flex flex-col group"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
    >
      {member.image ? (
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 mb-4">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-103"
            sizes="(max-width: 640px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      ) : (
        <div className="relative aspect-[3/4] w-full bg-gray-100 flex items-center justify-center mb-4">
          <span className="text-2xl font-bold text-gray-300 select-none">
            {member.name.charAt(0)}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">{member.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{role}</p>
        </div>

        {bio && (
          <p className="text-gray-600 text-xs leading-relaxed">{bio}</p>
        )}

        <div className="flex items-center gap-3 mt-1">
          <Link
            href="mailto:planet@duxpace.no"
            className="text-gray-400 hover:text-gray-900 transition-colors duration-150"
            aria-label={`Email ${member.name}`}
          >
            <Mail size={14} />
          </Link>
          {member.linkedin && (
            <Link
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors duration-150"
              aria-label={`${member.name} on LinkedIn`}
            >
              <Linkedin size={14} />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export function TeamDisplay({ members }: { members: TeamMemberDisplay[] }) {
  const t = useT()

  if (members.length === 0) return null

  return (
    <section className="relative py-24 md:py-32 border-t border-gray-200" aria-labelledby="team-headline">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <h2
            id="team-headline"
            className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4"
          >
            {t("team.title")}
          </h2>
        </FadeIn>
        <FadeIn delay={0.08}>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-16 max-w-xl">
            {t("team.body")}
          </p>
        </FadeIn>

        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-8 list-none max-w-[680px]">
          {members.map((member, index) => (
            <li key={member.name}>
              <MemberCard member={member} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
