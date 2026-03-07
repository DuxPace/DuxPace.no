"use client";

import { motion, useReducedMotion } from "framer-motion";
import { motionTokens } from ".";

// ScrollCue - animated hint to scroll down
interface ScrollCueProps {
  className?: string;
}

export function ScrollCue({ className = "" }: ScrollCueProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`flex flex-col items-center gap-2 ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 1.5,
        duration: motionTokens.duration.slow,
        ease: motionTokens.ease.bounce,
      }}
    >
      <span className="text-[10px] text-gray-600 font-mono tracking-[0.2em] uppercase">
        Scroll
      </span>
      <motion.div
        className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-2"
        initial={{ opacity: 0.5 }}
        animate={shouldReduceMotion ? {} : { opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="w-1 h-1 bg-white/60 rounded-full"
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// GradientBackground - subtle animated gradient for hero
interface GradientBackgroundProps {
  className?: string;
}

export function GradientBackground({ className = "" }: GradientBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Primary gradient blob */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(30, 89, 178, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={shouldReduceMotion ? {} : {
          x: ["-20%", "10%", "-20%"],
          y: ["-10%", "20%", "-10%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Secondary gradient blob */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 right-0 bottom-0"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={shouldReduceMotion ? {} : {
          x: ["10%", "-10%", "10%"],
          y: ["10%", "-5%", "10%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

// AnimatedLine - decorative line that draws in
interface AnimatedLineProps {
  className?: string;
  direction?: "horizontal" | "vertical";
  delay?: number;
}

export function AnimatedLine({
  className = "",
  direction = "horizontal",
  delay = 0,
}: AnimatedLineProps) {
  const shouldReduceMotion = useReducedMotion();

  const isHorizontal = direction === "horizontal";

  return (
    <motion.div
      className={`bg-white/20 ${isHorizontal ? "h-px" : "w-px"} ${className}`}
      initial={{
        scaleX: isHorizontal ? (shouldReduceMotion ? 1 : 0) : 1,
        scaleY: !isHorizontal ? (shouldReduceMotion ? 1 : 0) : 1,
      }}
      whileInView={{
        scaleX: 1,
        scaleY: 1,
      }}
      viewport={{ once: true }}
      transition={{
        duration: motionTokens.duration.reveal,
        delay,
        ease: motionTokens.ease.bounce,
      }}
      style={{
        originX: isHorizontal ? 0 : 0.5,
        originY: !isHorizontal ? 0 : 0.5,
      }}
    />
  );
}

// EyebrowText - small uppercase label with animation
interface EyebrowTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function EyebrowText({ children, className = "", delay = 0 }: EyebrowTextProps) {
  return (
    <motion.p
      className={`text-[11px] text-gray-600 tracking-[0.22em] uppercase font-mono ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: motionTokens.duration.slow,
        ease: motionTokens.ease.bounce,
      }}
    >
      {children}
    </motion.p>
  );
}
