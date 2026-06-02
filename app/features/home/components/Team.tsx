"use client";

import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";
import { SwoopIn, ElasticSnap } from "../../../shared/components/animations/SwoopAnimations";
import { SpotlightCard, TiltCard } from "../../../shared/components/ui/PremiumHover";
import { useLanguage } from "../../../shared/providers/LanguageProvider";
import { members as staticMembers, type Member } from "../../../lib/data/members";
import { motion } from "framer-motion";

export default function Team({ initialMembers }: { initialMembers?: Member[] }) {
  const { lang, t } = useLanguage();
  const members = initialMembers && initialMembers.length > 0 ? initialMembers : staticMembers;

  return (
    <section id="team" className="py-28 md:py-40 border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-6">
        <SwoopIn direction="up" delay={0}>
          <h2 className="text-[11px] text-blue-400 font-mono tracking-[0.22em] uppercase mb-12">
            {t.team.headline}
          </h2>
        </SwoopIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-[680px]">
          {members.map((member, i) => {
            const role = lang === "no" && member.roleNo ? member.roleNo : member.role;
            const bio = lang === "no" && member.bioNo ? member.bioNo : member.bio;
            return (
              <ElasticSnap key={member.name} delay={0.1 + i * 0.1}>
                <TiltCard>
                  <SpotlightCard className="h-full group">
                    {/* Image */}
                    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg mb-4">
                    <Image
                      src={member.image}
                      alt={`${member.name} - ${role} at DuxPace`}
                      fill
                      loading={i < 2 ? "eager" : "lazy"}
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 220px"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvL0A9Ljo7Ujo4P0ZDS0dMTU5PUVVDWkRHQ11VT0tUVVZfW//2wBDAR..."
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                      {/* Overlay on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-blue-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>

                    {/* Content */}
                    <h3 className="text-white text-sm font-bold leading-snug group-hover:text-blue-300 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-blue-400/80 text-xs mt-1 font-mono tracking-wider">
                      {role}
                    </p>
                    {bio && (
                      <p className="text-gray-500 text-[11px] mt-2 leading-relaxed">
                        {bio}
                      </p>
                    )}

                    {/* Social icons */}
                    <div className="flex gap-3 mt-4">
                      <motion.a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-500/20 transition-all"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Linkedin size={14} />
                      </motion.a>
                      <motion.a
                        href={`mailto:${member.email}`}
                        className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-500/20 transition-all"
                        whileHover={{ scale: 1.2, rotate: -10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Mail size={14} />
                      </motion.a>
                    </div>
                  </SpotlightCard>
                </TiltCard>
              </ElasticSnap>
            );
          })}
        </div>
      </div>
    </section>
  );
}
