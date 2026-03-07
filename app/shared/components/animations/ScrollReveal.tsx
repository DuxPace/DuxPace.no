"use client";

import { useRef, ReactNode, useEffect, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";

// Enkel hook for scroll-reveal
export function useScrollReveal(threshold = 0.2, once = true) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  return { ref, isInView };
}

// Subtil fade-in på scroll
interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 30,
}: FadeInProps) {
  const { ref, isInView } = useScrollReveal();

  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { y: 0, x: distance },
    right: { y: 0, x: -distance },
    none: { y: 0, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Scale-in effekt
interface ScaleInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function ScaleIn({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
}: ScaleInProps) {
  const { ref, isInView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Stagger container - elementer kommer etter hverandre
interface StaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  baseDelay?: number;
}

export function Stagger({
  children,
  className = "",
  staggerDelay = 0.1,
  baseDelay = 0,
}: StaggerProps) {
  const { ref, isInView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: baseDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Linje som tegner seg inn
interface LineRevealProps {
  className?: string;
  direction?: "horizontal" | "vertical";
  delay?: number;
  duration?: number;
}

export function LineReveal({
  className = "",
  direction = "horizontal",
  delay = 0,
  duration = 0.8,
}: LineRevealProps) {
  const { ref, isInView } = useScrollReveal();
  const isHorizontal = direction === "horizontal";

  return (
    <motion.div
      ref={ref}
      className={`bg-white/20 ${isHorizontal ? "h-px" : "w-px"} ${className}`}
      initial={{
        scaleX: isHorizontal ? 0 : 1,
        scaleY: isHorizontal ? 1 : 0,
      }}
      animate={isInView ? { scaleX: 1, scaleY: 1 } : {}}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        originX: isHorizontal ? 0 : 0.5,
        originY: isHorizontal ? 0.5 : 0,
      }}
    />
  );
}

// Bilde som fader inn med scale
interface ImageFadeProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}

export function ImageFade({
  src,
  alt,
  className = "",
  delay = 0,
}: ImageFadeProps) {
  const { ref, isInView } = useScrollReveal();

  return (
    <motion.div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{
          opacity: { duration: 0.6, delay },
          scale: { duration: 0.8, delay },
          ease: [0.25, 0.1, 0.25, 1],
        }}
      />
    </motion.div>
  );
}

// Tekst som kommer inn bokstav for bokstav (subtilt)
interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
}: TextRevealProps) {
  const { ref, isInView } = useScrollReveal();
  const words = children.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: delay + index * 0.05,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// Border som animerer inn (for kort)
interface AnimatedBorderProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedBorder({
  children,
  className = "",
  delay = 0,
}: AnimatedBorderProps) {
  const { ref, isInView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay }}
    >
      {children}
      <motion.div
        className="absolute inset-0 border border-white/10 rounded-lg pointer-events-none"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{
          duration: 0.5,
          delay: delay + 0.2,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      />
    </motion.div>
  );
}

// Blur-in effekt (elegant)
interface BlurInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function BlurIn({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
}: BlurInProps) {
  const { ref, isInView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={
        isInView
          ? { opacity: 1, filter: "blur(0px)" }
          : {}
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
