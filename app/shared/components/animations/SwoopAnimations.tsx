"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// Swoop inn fra sidene med rotasjon
interface SwoopInProps {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "top" | "bottom" | "up" | "down";
  delay?: number;
  duration?: number;
  rotate?: number;
}

export function SwoopIn({
  children,
  className = "",
  direction = "left",
  delay = 0,
  duration = 0.8,
  rotate = 10,
}: SwoopInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const directions = {
    left: { x: -200, y: 0 },
    right: { x: 200, y: 0 },
    top: { x: 0, y: -200 },
    bottom: { x: 0, y: 200 },
    up: { x: 0, y: -200 },
    down: { x: 0, y: 200 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0, 
        ...directions[direction],
        rotate: direction === "left" ? -rotate : direction === "right" ? rotate : 0,
        scale: 0.8,
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0,
        rotate: 0,
        scale: 1,
      } : {}}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Swoop ut (forsvinner)
interface SwoopOutProps {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "top" | "bottom";
}

export function SwoopOut({
  children,
  className = "",
  direction = "right",
}: SwoopOutProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const directions = {
    left: { x: -300 },
    right: { x: 300 },
    top: { y: -300 },
    bottom: { y: 300 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={!isInView ? { 
        opacity: 0, 
        ...directions[direction],
        scale: 0.8,
        rotate: direction === "left" ? -15 : 15,
      } : {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
      }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Floating animation (som svever)
interface FloatingProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
}

export function Floating({
  children,
  className = "",
  amplitude = 20,
  duration = 4,
}: FloatingProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

// Pulse scale animation
interface PulseScaleProps {
  children: ReactNode;
  className?: string;
}

export function PulseScale({ children, className = "" }: PulseScaleProps) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

// Shake animation
interface ShakeProps {
  children: ReactNode;
  className?: string;
  trigger?: boolean;
}

export function Shake({ children, className = "", trigger = false }: ShakeProps) {
  return (
    <motion.div
      className={className}
      animate={trigger ? {
        x: [0, -10, 10, -10, 10, 0],
      } : {}}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

// Elastic snap
interface ElasticSnapProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ElasticSnap({
  children,
  className = "",
  delay = 0,
}: ElasticSnapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

// Scroll-based rotation
interface ScrollRotateProps {
  children: ReactNode;
  className?: string;
  rotate?: number;
}

export function ScrollRotate({
  children,
  className = "",
  rotate = 360,
}: ScrollRotateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateValue = useTransform(scrollYProgress, [0, 1], [0, rotate]);

  return (
    <motion.div ref={ref} className={className} style={{ rotate: rotateValue }}>
      {children}
    </motion.div>
  );
}

// Morphing shape
interface MorphProps {
  children: ReactNode;
  className?: string;
}

export function Morph({ children, className = "" }: MorphProps) {
  return (
    <motion.div
      className={className}
      animate={{
        borderRadius: ["20%", "50%", "20%"],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

// Typewriter effect
interface TypewriterProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export function Typewriter({
  text,
  className = "",
  delay = 0,
  speed = 0.05,
}: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const characters = text.split("");

  return (
    <span ref={ref} className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{
            duration: 0.1,
            delay: delay + index * speed,
          }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        className="inline-block w-0.5 h-5 bg-blue-400 ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </span>
  );
}

// Spotlight effect
interface SpotlightProps {
  children: ReactNode;
  className?: string;
}

export function Spotlight({ children, className = "" }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
        initial={{ x: "-200%" }}
        animate={isInView ? { x: "200%" } : {}}
        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
      />
      {children}
    </div>
  );
}

// Reveal with mask
interface MaskRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
}

export function MaskReveal({
  children,
  className = "",
  direction = "left",
}: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const masks = {
    left: "inset(0 100% 0 0)",
    right: "inset(0 0 0 100%)",
    up: "inset(100% 0 0 0)",
    down: "inset(0 0 100% 0)",
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: masks[direction] }}
      animate={isInView ? { clipPath: "inset(0 0 0 0)" } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
