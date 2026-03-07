"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { ReactNode } from "react";

// Motion tokens - consistent timing and easing
export const motionTokens = {
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    reveal: 0.7,
  },
  ease: {
    smooth: [0.4, 0, 0.2, 1] as const,
    bounce: [0.16, 1, 0.3, 1] as const,
    snap: [0.25, 0.1, 0.25, 1] as const,
  },
  stagger: {
    fast: 0.05,
    normal: 0.08,
    slow: 0.1,
  },
};

// AnimatedSection - scroll-triggered reveal wrapper
interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  distance?: number;
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 30,
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const getInitialState = () => {
    if (shouldReduceMotion) return { opacity: 1, x: 0, y: 0, scale: 1 };
    
    switch (direction) {
      case "up": return { opacity: 0, y: distance };
      case "down": return { opacity: 0, y: -distance };
      case "left": return { opacity: 0, x: distance };
      case "right": return { opacity: 0, x: -distance };
      case "scale": return { opacity: 0, scale: 0.95 };
      default: return { opacity: 0, y: distance };
    }
  };

  return (
    <motion.div
      initial={getInitialState()}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: motionTokens.duration.reveal,
        delay,
        ease: motionTokens.ease.bounce,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// SplitHeadline - animated text reveal with split
interface SplitHeadlineProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function SplitHeadline({
  text,
  className = "",
  delay = 0,
  as: Component = "h1",
}: SplitHeadlineProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : motionTokens.stagger.fast,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: { 
      opacity: shouldReduceMotion ? 1 : 0, 
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: motionTokens.duration.slow,
        ease: motionTokens.ease.bounce,
      },
    },
  };

  return (
    <Component className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="inline-flex flex-wrap"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={child}
            className="mr-[0.25em] inline-block"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}

// AnimatedButton - CTA with hover/press states
interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  disabled?: boolean;
}

export function AnimatedButton({
  children,
  className = "",
  onClick,
  href,
  variant = "primary",
  type = "button",
  disabled = false,
}: AnimatedButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50";
  
  const variants = {
    primary: "bg-white text-black hover:bg-gray-100",
    secondary: "bg-transparent text-white border border-white/20 hover:bg-white/5 hover:border-white/30",
    ghost: "bg-transparent text-gray-400 hover:text-white",
  };

  const MotionComponent = href ? motion.a : motion.button;

  return (
    <MotionComponent
      href={href}
      type={href ? undefined : type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{
        duration: motionTokens.duration.fast,
        ease: motionTokens.ease.smooth,
      }}
    >
      {children}
    </MotionComponent>
  );
}

// HoverCard - card with lift, shadow, and glow
interface HoverCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function HoverCard({
  children,
  className = "",
  glowColor = "rgba(255, 255, 255, 0.05)",
}: HoverCardProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ 
        y: -4,
        transition: {
          duration: motionTokens.duration.normal,
          ease: motionTokens.ease.smooth,
        }
      }}
      style={{
        boxShadow: `0 0 0 ${glowColor}`,
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 40%)`,
        }}
        whileHover={{ opacity: 1 }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// StaggerContainer - wrapper for staggered children
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = motionTokens.stagger.normal,
  delayChildren = 0,
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// StaggerItem - individual item for stagger animations
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  const item: Variants = {
    hidden: { 
      opacity: shouldReduceMotion ? 1 : 0, 
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: motionTokens.duration.slow,
        ease: motionTokens.ease.bounce,
      },
    },
  };

  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}

// ScrollProgress - progress indicator
export function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-white/80 origin-left z-[100]"
      style={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{
        duration: 1,
        ease: motionTokens.ease.smooth,
      }}
    />
  );
}

// AnimatedGradient - subtle background gradient animation
interface AnimatedGradientProps {
  className?: string;
}

export function AnimatedGradient({ className = "" }: AnimatedGradientProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      animate={shouldReduceMotion ? {} : {
        background: [
          "radial-gradient(ellipse at 20% 30%, rgba(30, 89, 178, 0.08) 0%, transparent 50%)",
          "radial-gradient(ellipse at 80% 70%, rgba(30, 89, 178, 0.08) 0%, transparent 50%)",
          "radial-gradient(ellipse at 50% 50%, rgba(30, 89, 178, 0.06) 0%, transparent 50%)",
          "radial-gradient(ellipse at 20% 30%, rgba(30, 89, 178, 0.08) 0%, transparent 50%)",
        ],
      }}
      transition={{
        duration: 12,
        ease: "linear",
        repeat: Infinity,
      }}
    />
  );
}

// MagneticButton - button that follows cursor slightly
interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
}: MagneticButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}

// CountUp - animated number counter
interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function CountUp({
  end,
  duration = 2,
  suffix = "",
  prefix = "",
  className = "",
}: CountUpProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {prefix}
      <motion.span
        initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {end}
      </motion.span>
      {suffix}
    </motion.span>
  );
}

// FadeInView - simple fade in when in view
interface FadeInViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeInView({ children, className = "", delay = 0 }: FadeInViewProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: motionTokens.duration.slow,
        delay,
        ease: motionTokens.ease.smooth,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// TextReveal - line by line text reveal
interface TextRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}

export function TextReveal({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
}: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: delay,
      },
    },
  };

  const lineVariant: Variants = {
    hidden: { 
      opacity: shouldReduceMotion ? 1 : 0, 
      y: shouldReduceMotion ? 0 : 20,
      filter: shouldReduceMotion ? "none" : "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: motionTokens.duration.reveal,
        ease: motionTokens.ease.bounce,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {lines.map((line, index) => (
        <motion.div
          key={index}
          variants={lineVariant}
          className={lineClassName}
        >
          {line}
        </motion.div>
      ))}
    </motion.div>
  );
}
