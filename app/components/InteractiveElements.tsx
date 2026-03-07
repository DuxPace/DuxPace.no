"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

// Interactive card with hover effects
interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  glowColor?: string;
}

export function InteractiveCard({
  children,
  className = "",
  onClick,
  glowColor = "rgba(96, 165, 250, 0.15)",
}: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative group cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg -z-10"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 40%)`,
        }}
      />
      
      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-lg border border-white/0 group-hover:border-white/10 transition-colors duration-300"
      />
      
      {children}
    </motion.div>
  );
}

// Button with comprehensive hover states
interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  disabled?: boolean;
  href?: string;
}

export function AnimatedButton({
  children,
  className = "",
  onClick,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  href,
}: AnimatedButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
  
  const variants = {
    primary: "bg-white text-black hover:bg-gray-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]",
    secondary: "bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/5",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
    >
      {/* Loading spinner */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-inherit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}
      
      {/* Button content */}
      <motion.span
        animate={{ opacity: isLoading ? 0 : 1 }}
        className="relative z-10"
      >
        {children}
      </motion.span>
      
      {/* Hover shine effect */}
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        whileHover={{ translateX: "100%" }}
        transition={{ duration: 0.5 }}
      />
    </Component>
  );
}

// Link with underline animation
interface AnimatedLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
  external?: boolean;
  underlineColor?: string;
}

export function AnimatedLink({
  children,
  href,
  className = "",
  external = false,
  underlineColor = "white",
}: AnimatedLinkProps) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`relative inline-flex items-center gap-1 group ${className}`}
      whileHover="hover"
    >
      <span className="relative">
        {children}
        <motion.span
          className="absolute bottom-0 left-0 h-px bg-current"
          initial={{ width: 0 }}
          variants={{
            hover: { width: "100%" },
          }}
          transition={{ duration: 0.2 }}
          style={{ backgroundColor: underlineColor }}
        />
      </span>
      {external && (
        <motion.svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="opacity-50 group-hover:opacity-100 transition-opacity"
          variants={{
            hover: { x: 2, y: -2 },
          }}
        >
          <path
            d="M3 9L9 3M9 3H4M9 3V8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      )}
    </motion.a>
  );
}

// Image with hover zoom and overlay
interface HoverImageProps {
  src: string;
  alt: string;
  className?: string;
  overlayContent?: ReactNode;
  zoomScale?: number;
}

export function HoverImage({
  src,
  alt,
  className = "",
  overlayContent,
  zoomScale = 1.1,
}: HoverImageProps) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover="hover"
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        variants={{
          hover: { scale: zoomScale },
        }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Overlay */}
      {overlayContent && (
        <motion.div
          className="absolute inset-0 flex items-end p-4"
          initial={{ opacity: 0 }}
          variants={{
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full bg-gradient-to-t from-black/80 to-transparent p-4">
            {overlayContent}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// Focus ring component for accessibility
interface FocusRingProps {
  children: ReactNode;
  className?: string;
}

export function FocusRing({ children, className = "" }: FocusRingProps) {
  return (
    <div className={`focus-within:ring-2 focus-within:ring-white/50 focus-within:ring-offset-2 focus-within:ring-offset-black rounded-lg ${className}`}>
      {children}
    </div>
  );
}

// Tooltip component
interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({ children, content, position = "top" }: TooltipProps) {
  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative group">
      {children}
      <div
        className={`absolute ${positions[position]} px-3 py-2 bg-black border border-white/20 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50`}
      >
        {content}
      </div>
    </div>
  );
}
