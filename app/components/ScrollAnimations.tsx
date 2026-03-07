"use client";

import { useRef, ReactNode, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue } from "framer-motion";

// ==========================================
// 1. SCROLL-TRIGGERED SECTION REVEALS
// ==========================================

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

export function ScrollReveal({
  children,
  className = "",
  direction = "up",
  distance = 50,
  delay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.2,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { y: 0, x: distance },
    right: { y: 0, x: -distance },
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
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Stagger container for scroll reveals
interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  baseDelay?: number;
  direction?: "up" | "down" | "left" | "right";
  once?: boolean;
}

export function StaggerReveal({
  children,
  className = "",
  staggerDelay = 0.1,
  baseDelay = 0,
  direction = "up",
  once = true,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.2 });

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

export function StaggerRevealItem({
  children,
  className = "",
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}) {
  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { y: 0, x: 30 },
    right: { y: 0, x: -30 },
  };

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...directions[direction] },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// ==========================================
// 2. PROGRESS BARS ON SCROLL
// ==========================================

interface ScrollProgressBarProps {
  value: number;
  className?: string;
  barClassName?: string;
  height?: string;
  label?: string;
  showPercentage?: boolean;
  delay?: number;
}

export function ScrollProgressBar({
  value,
  className = "",
  barClassName = "",
  height = "8px",
  label,
  showPercentage = true,
  delay = 0,
}: ScrollProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className={className}>
      {(label || showPercentage) && (
        <div className="flex justify-between mb-2">
          {label && <span className="text-sm text-gray-400">{label}</span>}
          {showPercentage && (
            <motion.span
              className="text-sm text-white font-mono"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: delay + 0.3 }}
            >
              {value}%
            </motion.span>
          )}
        </div>
      )}
      <div
        className="w-full bg-white/10 rounded-full overflow-hidden"
        style={{ height }}
      >
        <motion.div
          className={`h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full ${barClassName}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : {}}
          transition={{
            duration: 1.2,
            delay,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </div>
    </div>
  );
}

// ==========================================
// 3. COUNTER ANIMATIONS
// ==========================================

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
  delay?: number;
}

export function CountUp({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  className = "",
  decimals = 0,
  delay = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(easeOutQuart * end);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, end, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// ==========================================
// 4. IMAGE REVEAL ANIMATIONS
// ==========================================

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}

export function ImageReveal({
  src,
  alt,
  className = "",
  direction = "up",
  delay = 0,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const clipPaths = {
    up: {
      hidden: "inset(100% 0 0 0)",
      visible: "inset(0 0 0 0)",
    },
    down: {
      hidden: "inset(0 0 100% 0)",
      visible: "inset(0 0 0 0)",
    },
    left: {
      hidden: "inset(0 100% 0 0)",
      visible: "inset(0 0 0 0)",
    },
    right: {
      hidden: "inset(0 0 0 100%)",
      visible: "inset(0 0 0 0)",
    },
  };

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 bg-white z-10"
        initial={{ scaleY: 1, originY: direction === "up" ? 1 : 0 }}
        animate={isInView ? { scaleY: 0 } : {}}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ 
          clipPath: clipPaths[direction].hidden,
          scale: 1.2 
        }}
        animate={isInView ? { 
          clipPath: clipPaths[direction].visible,
          scale: 1 
        } : {}}
        transition={{
          clipPath: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
          scale: { duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] },
        }}
      />
    </div>
  );
}

// Circular reveal
interface CircularRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function CircularReveal({
  children,
  className = "",
  delay = 0,
}: CircularRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: "circle(0% at 50% 50%)" }}
        animate={isInView ? { clipPath: "circle(100% at 50% 50%)" } : {}}
        transition={{
          duration: 1,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ==========================================
// 5. TEXT HIGHLIGHT ON SCROLL
// ==========================================

interface TextHighlightProps {
  children: string;
  className?: string;
  highlightColor?: string;
  delay?: number;
  staggerDelay?: number;
}

export function TextHighlight({
  children,
  className = "",
  highlightColor = "rgba(96, 165, 250, 0.3)",
  delay = 0,
  staggerDelay = 0.03,
}: TextHighlightProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const words = children.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="relative inline-block mr-[0.3em]"
          initial={{ opacity: 0.3 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{
            duration: 0.3,
            delay: delay + index * staggerDelay,
          }}
        >
          <motion.span
            className="absolute inset-0 -mx-1 -my-0.5 rounded"
            initial={{ scaleX: 0, originX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{
              duration: 0.4,
              delay: delay + index * staggerDelay + 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ backgroundColor: highlightColor }}
          />
          <span className="relative z-10">{word}</span>
        </motion.span>
      ))}
    </span>
  );
}

// ==========================================
// 6. STICKY SECTIONS MED PARALLAX
// ==========================================

interface StickySectionProps {
  children: ReactNode;
  className?: string;
  backgroundContent?: ReactNode;
  stickyHeight?: string;
}

export function StickySection({
  children,
  className = "",
  backgroundContent,
  stickyHeight = "200vh",
}: StickySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.95]);

  return (
    <div ref={ref} className="relative" style={{ height: stickyHeight }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {backgroundContent && (
          <div className="absolute inset-0 z-0">
            {backgroundContent}
          </div>
        )}
        <motion.div
          className={`relative z-10 h-full flex items-center ${className}`}
          style={{ opacity, scale }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

// Parallax layer
interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}

export function ParallaxLayer({
  children,
  className = "",
  speed = 0.5,
  direction = "up",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const multiplier = direction === "up" ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [0, 100 * speed * multiplier]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// ==========================================
// 7. SCROLL VELOCITY EFFECTS
// ==========================================

interface VelocityTextProps {
  children: string;
  className?: string;
}

export function VelocityText({ children, className = "" }: VelocityTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const skewX = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);
  const springSkew = useSpring(skewX, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ skewX: springSkew }}>
        {children}
      </motion.div>
    </div>
  );
}

// ==========================================
// 8. HORIZONTAL SCROLL
// ==========================================

interface HorizontalScrollProps {
  children: ReactNode[];
  className?: string;
  itemWidth?: string;
}

export function HorizontalScroll({
  children,
  className = "",
  itemWidth = "100vw",
}: HorizontalScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(children.length - 1) * 100}%`]
  );

  return (
    <div
      ref={ref}
      className={`relative h-[300vh] ${className}`}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div className="flex" style={{ x }}>
          {children.map((child, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center px-8"
              style={{ width: itemWidth }}
            >
              {child}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ==========================================
// 9. SCROLL SNAP SECTIONS
// ==========================================

interface SnapSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SnapSection({ children, className = "", id }: SnapSectionProps) {
  return (
    <section
      id={id}
      className={`snap-start snap-always min-h-screen flex items-center ${className}`}
    >
      {children}
    </section>
  );
}

// Snap container
interface SnapContainerProps {
  children: ReactNode;
  className?: string;
}

export function SnapContainer({ children, className = "" }: SnapContainerProps) {
  return (
    <div className={`snap-y snap-mandatory h-screen overflow-y-scroll ${className}`}>
      {children}
    </div>
  );
}
