"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface NewsCardProps {
  title: string
  excerpt: string
  date: string
  image?: string
  onClick?: () => void
}

export function NewsCard({ title, excerpt, date, image, onClick }: NewsCardProps) {
  return (
    <motion.article
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick() } } : undefined}
      aria-label={onClick ? title : undefined}
      className="group flex flex-col h-full bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-400 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {image && (
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <span className="text-[10px] text-gray-400 tracking-[0.08em] uppercase">{date}</span>
        <h3 className="text-base font-semibold text-gray-900 leading-snug">
          {title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed flex-1">
          {excerpt}
        </p>
      </div>
    </motion.article>
  )
}
