"use client"

import { useRef, ReactNode } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

interface DramaticSlideProps {
  children: ReactNode
  className?: string
  direction?: "left" | "right" | "top" | "bottom" | "up" | "down"
  delay?: number
  duration?: number
  rotate?: number
}

export function DramaticSlide({
  children,
  className = "",
  direction = "left",
  delay = 0,
  duration = 0.8,
  rotate = 5,
}: DramaticSlideProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const directions = {
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
    top: { x: 0, y: -100 },
    bottom: { x: 0, y: 100 },
    up: { x: 0, y: -100 },
    down: { x: 0, y: 100 },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...directions[direction],
        rotate: direction === "left" ? -rotate : direction === "right" ? rotate : 0,
      }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, rotate: 0 } : {}}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

interface FlipRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  axis?: "x" | "y"
}

export function FlipReveal({
  children,
  className = "",
  delay = 0,
  axis = "y",
}: FlipRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, rotateX: axis === "x" ? 90 : 0, rotateY: axis === "y" ? 90 : 0 }}
      animate={isInView ? { opacity: 1, rotateX: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

interface ClipRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "center"
}

export function ClipReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const clipPaths = {
    up: { hidden: "inset(100% 0 0 0)", visible: "inset(0 0 0 0)" },
    down: { hidden: "inset(0 0 100% 0)", visible: "inset(0 0 0 0)" },
    left: { hidden: "inset(0 100% 0 0)", visible: "inset(0 0 0 0)" },
    right: { hidden: "inset(0 0 0 100%)", visible: "inset(0 0 0 0)" },
    center: { hidden: "inset(50% 50% 50% 50%)", visible: "inset(0 0 0 0)" },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: clipPaths[direction].hidden }}
      animate={isInView ? { clipPath: clipPaths[direction].visible } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

interface SplitTextProps {
  children: string
  className?: string
  delay?: number
  staggerDelay?: number
  splitBy?: "char" | "word"
}

export function SplitText({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  splitBy = "char",
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const items = splitBy === "char" ? children.split("") : children.split(" ")

  return (
    <span ref={ref} className={className}>
      {items.map((item, index) => (
        <motion.span
          key={index}
          className="inline-block"
          style={{ whiteSpace: item === " " ? "pre" : "normal" }}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: delay + index * staggerDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {item}
        </motion.span>
      ))}
    </span>
  )
}

interface ScaleInProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function ScaleIn({ children, className = "", delay = 0 }: ScaleInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

interface BounceInProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function BounceIn({ children, className = "", delay = 0 }: BounceInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 100, scale: 0.3 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ type: "spring", damping: 12, stiffness: 100, delay }}
    >
      {children}
    </motion.div>
  )
}

interface WaveStaggerProps {
  children: ReactNode[]
  className?: string
  baseDelay?: number
  staggerDelay?: number
}

export function WaveStagger({
  children,
  className = "",
  baseDelay = 0,
  staggerDelay = 0.1,
}: WaveStaggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 30 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: baseDelay + index * staggerDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

interface MaskRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "left" | "right"
}

export function MaskReveal({
  children,
  className = "",
  delay = 0,
  direction = "left",
}: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ x: direction === "left" ? "-100%" : "100%" }}
        animate={isInView ? { x: direction === "left" ? "100%" : "-100%" } : {}}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-black z-10"
      />
      {children}
    </div>
  )
}

interface ParallaxGroupProps {
  children: ReactNode
  className?: string
  speed?: number
}

export function ParallaxGroup({
  children,
  className = "",
  speed = 0.5,
}: ParallaxGroupProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <motion.div ref={ref} className={className} style={{ y, opacity, scale }}>
      {children}
    </motion.div>
  )
}
