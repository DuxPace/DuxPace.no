/**
 * Motion Design System for DuxPace
 * 
 * This module exports all animation components and utilities used throughout
 * the DuxPace website. All animations respect prefers-reduced-motion.
 * 
 * Usage:
 * ```tsx
 * import { AnimatedSection, AnimatedButton, SplitHeadline } from "@/app/components/motion";
 * ```
 */

// Export everything from the main motion file (index.tsx)
export * from "./motion";

// Export form elements with animations
export {
  AnimatedInput,
  FormLabel,
  SubmitButton,
  SuccessMessage,
  ErrorMessage,
} from "./FormElements";

// Export team card with hover effects
export { TeamCard, TeamGrid } from "./TeamCard";

// Export news card with carousel
export { NewsCard, NewsModal, PaginationDot } from "./NewsCard";

// Export hero specific elements
export {
  ScrollCue,
  GradientBackground,
  AnimatedLine,
  EyebrowText,
} from "./HeroElements";
