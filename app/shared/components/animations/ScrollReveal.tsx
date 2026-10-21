"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

// The one scroll reveal on the site: a short rise and fade, once, on the brand curve.
export function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduce ? false : { opacity: 0, y: 12 }}
      animate={shouldReduce ? {} : isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
