"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";
import { motionTokens } from ".";

// TeamCard - professional team card with hover effects
interface TeamCardProps {
  name: string;
  role: string;
  bio?: string;
  image: string;
  linkedin: string;
  email: string;
  index?: number;
}

export function TeamCard({
  name,
  role,
  bio,
  image,
  linkedin,
  email,
  index = 0,
}: TeamCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: motionTokens.duration.slow,
        delay: index * motionTokens.stagger.slow,
        ease: motionTokens.ease.bounce,
      }}
    >
      {/* Card container with hover effects */}
      <motion.div
        className="relative"
        whileHover={shouldReduceMotion ? {} : { y: -4 }}
        transition={{
          duration: motionTokens.duration.normal,
          ease: motionTokens.ease.smooth,
        }}
      >
        {/* Image container */}
        <motion.div
          className="relative w-full aspect-[3/4] overflow-hidden mb-4 bg-gray-900/50"
          whileHover={shouldReduceMotion ? {} : { 
            boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.5)"
          }}
          transition={{
            duration: motionTokens.duration.normal,
          }}
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-top transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
          />
          
          {/* Subtle gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: motionTokens.duration.normal }}
          />
          
          {/* Border glow on hover */}
          <motion.div
            className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-colors duration-300"
          />
        </motion.div>

        {/* Content */}
        <div className="space-y-1">
          <motion.p
            className="text-white text-sm font-medium leading-snug group-hover:text-gray-100 transition-colors duration-200"
          >
            {name}
          </motion.p>
          <p className="text-gray-600 text-xs group-hover:text-gray-500 transition-colors duration-200">
            {role}
          </p>
          {bio && (
            <p className="text-gray-700 text-[11px] mt-1.5 mb-3 leading-relaxed line-clamp-2">
              {bio}
            </p>
          )}
          
          {/* Social links with slide-in effect */}
          <motion.div
            className="flex gap-3 mt-3 overflow-hidden"
            initial={{ height: "auto" }}
          >
            <motion.a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} on LinkedIn`}
              className="text-gray-700 hover:text-white transition-colors duration-200 relative group/link"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={13} aria-hidden="true" />
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-px bg-white origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: motionTokens.duration.fast }}
              />
            </motion.a>
            <motion.a
              href={`mailto:${email}`}
              aria-label={`Email ${name}`}
              className="text-gray-700 hover:text-white transition-colors duration-200 relative group/link"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={13} aria-hidden="true" />
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-px bg-white origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: motionTokens.duration.fast }}
              />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// TeamGrid - container for team cards with stagger
interface TeamGridProps {
  children: React.ReactNode;
  className?: string;
}

export function TeamGrid({ children, className = "" }: TeamGridProps) {
  return (
    <motion.div
      className={`grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-12 max-w-[680px] ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
}
