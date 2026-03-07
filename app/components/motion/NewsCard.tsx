"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { motionTokens } from ".";

// NewsCard - animated news article card
interface NewsCardProps {
  title: string;
  description: string;
  date: string;
  image: string;
  alt: string;
  readMoreText: string;
  onClick: () => void;
  index: number;
  isLastInRow?: boolean;
}

export function NewsCard({
  title,
  description,
  date,
  image,
  alt,
  readMoreText,
  onClick,
  index,
  isLastInRow = false,
}: NewsCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className={`${index > 0 ? "border-t border-white/[0.08] md:border-t-0 md:border-l md:border-white/[0.08]" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: motionTokens.duration.slow,
        delay: index * motionTokens.stagger.normal,
        ease: motionTokens.ease.bounce,
      }}
    >
      <motion.button
        onClick={onClick}
        className="w-full text-left group py-8 md:py-0 md:px-8 first:md:pl-0 last:md:pr-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 relative"
        aria-haspopup="dialog"
        whileHover={shouldReduceMotion ? {} : { y: -2 }}
        whileTap={{ scale: 0.99 }}
        transition={{
          duration: motionTokens.duration.fast,
          ease: motionTokens.ease.smooth,
        }}
      >
        {/* Image container */}
        <motion.div
          className="relative w-full aspect-[4/3] mb-5 overflow-hidden bg-gray-900/30"
          whileHover={shouldReduceMotion ? {} : {
            boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.4)"
          }}
          transition={{ duration: motionTokens.duration.normal }}
        >
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover transition-all duration-500 scale-100 group-hover:scale-[1.03]"
          />
          {/* Subtle overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"
          />
        </motion.div>

        {/* Date */}
        <p className="text-[10px] text-gray-600 font-mono tracking-[0.18em] uppercase mb-3">
          {date}
        </p>

        {/* Title with hover color transition */}
        <motion.h3
          className="text-sm font-semibold text-white leading-snug mb-2 group-hover:text-gray-200 transition-colors duration-200"
        >
          {title}
        </motion.h3>

        {/* Description */}
        <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed mb-5">
          {description}
        </p>

        {/* Read more link with arrow animation */}
        <motion.span
          className="text-[10px] font-mono tracking-[0.15em] uppercase text-gray-700 group-hover:text-white transition-colors duration-200 inline-flex items-center gap-1"
          aria-hidden="true"
        >
          {readMoreText}
          <motion.span
            className="inline-block"
            initial={{ x: 0 }}
            whileHover={{ x: 3 }}
            transition={{ duration: motionTokens.duration.fast }}
          >
            →
          </motion.span>
        </motion.span>
      </motion.button>
    </motion.article>
  );
}

// NewsModal - animated modal for news articles
interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  date: string;
  image: string;
  alt: string;
}

export function NewsModal({
  isOpen,
  onClose,
  title,
  content,
  date,
  image,
  alt,
}: NewsModalProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: motionTokens.duration.fast }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal content */}
          <motion.div
            className="relative bg-black border-t md:border border-white/[0.12] w-full md:max-w-2xl max-h-[90vh] overflow-y-auto z-10"
            initial={{ 
              opacity: shouldReduceMotion ? 1 : 0, 
              y: shouldReduceMotion ? 0 : 20,
              scale: shouldReduceMotion ? 1 : 0.98
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ 
              opacity: 0, 
              y: 10,
              scale: 0.98
            }}
            transition={{
              duration: motionTokens.duration.slow,
              ease: motionTokens.ease.bounce,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <motion.button
              onClick={onClose}
              aria-label="Close article"
              className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white w-9 h-9 flex items-center justify-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50 text-lg leading-none z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ×
            </motion.button>

            {/* Image */}
            <div className="relative w-full aspect-video">
              <Image src={image} alt={alt} fill className="object-cover" />
            </div>

            {/* Content */}
            <motion.div
              className="p-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.1,
                duration: motionTokens.duration.slow,
              }}
            >
              <p className="text-[10px] text-gray-600 font-mono tracking-[0.18em] uppercase mb-3">
                {date}
              </p>
              <h2
                id="modal-title"
                className="text-xl font-bold text-white mb-6 leading-snug tracking-tight"
              >
                {title}
              </h2>
              {content.split("\n\n").map((paragraph, i) => (
                <motion.p
                  key={i}
                  className="text-gray-400 text-sm leading-relaxed mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : 0.1 + i * 0.05,
                    duration: motionTokens.duration.slow,
                  }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// PaginationDot - animated pagination indicator
interface PaginationDotProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
}

export function PaginationDot({ isActive, onClick, label }: PaginationDotProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      role="tab"
      aria-selected={isActive}
      aria-label={label}
      onClick={onClick}
      className="w-10 h-10 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="rounded-full"
        animate={{
          width: isActive ? 6 : 5,
          height: isActive ? 6 : 5,
          backgroundColor: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.2)",
        }}
        transition={{
          duration: shouldReduceMotion ? 0 : motionTokens.duration.fast,
          ease: motionTokens.ease.smooth,
        }}
      />
    </motion.button>
  );
}
