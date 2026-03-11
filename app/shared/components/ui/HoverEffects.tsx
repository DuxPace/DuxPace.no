"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";

interface DramaticCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  glowColor?: string;
}

export function DramaticCard({
  children,
  className = "",
  onClick,
  glowColor = "rgba(59, 130, 246, 0.3)",
}: DramaticCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ 
        y: -12,
        scale: 1.02,
      }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 25
      }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-xl -z-10 blur-xl"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{ backgroundColor: glowColor }}
      />
      
      {/* Border animation */}
      <motion.div
        className="absolute inset-0 rounded-lg border-2 border-transparent"
        animate={{
          borderColor: isHovered ? "rgba(59, 130, 246, 0.5)" : "transparent",
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 rounded-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
          animate={isHovered ? { x: "200%" } : { x: "-100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </motion.div>
      
      {children}
    </motion.div>
  );
}

interface DramaticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function DramaticButton({
  children,
  className = "",
  onClick,
  variant = "primary",
  size = "md",
}: DramaticButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    primary: "bg-white text-black",
    secondary: "bg-blue-500 text-white",
    outline: "bg-transparent border-2 border-white text-white",
  };

  const sizes = {
    sm: "px-6 py-3 text-xs",
    md: "px-8 py-4 text-sm",
    lg: "px-10 py-5 text-base",
  };

  return (
    <motion.button
      className={`relative overflow-hidden font-semibold tracking-wider uppercase ${variants[variant]} ${sizes[size]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ borderRadius: "4px" }}
    >
      {/* Background fill animation */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "0%" : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          background: variant === "primary" ? "#3b82f6" : 
                     variant === "secondary" ? "#1e40af" : "white",
        }}
      />
      
      {/* Text color change */}
      <motion.span
        className="relative z-10"
        animate={{
          color: isHovered && variant === "outline" ? "black" : "inherit",
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>
      
      {/* Sparkle effect */}
      {isHovered && (
        <>
          <motion.div
            className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1.5, 0], opacity: [1, 1, 0] }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute bottom-1 left-1 w-1 h-1 bg-white rounded-full"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1.5, 0], opacity: [1, 1, 0] }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
        </>
      )}
    </motion.button>
  );
}

interface DramaticImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function DramaticImage({ src, alt, className = "" }: DramaticImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        animate={{
          scale: isHovered ? 1.15 : 1,
          filter: isHovered ? "brightness(1.1) contrast(1.1)" : "brightness(1) contrast(1)",
        }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Overlay gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Border animation */}
      <motion.div
        className="absolute inset-0 border-4 border-blue-400"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 1.1,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Corner accents */}
      <motion.div
        className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
    </motion.div>
  );
}

interface DramaticLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
}

export function DramaticLink({ children, href, className = "" }: DramaticLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      className={`relative inline-flex items-center gap-2 group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <span className="relative">
        {children}
        {/* Underline that grows from center */}
        <motion.span
          className="absolute -bottom-1 left-1/2 h-0.5 bg-blue-400"
          initial={{ width: 0, x: "-50%" }}
          animate={{ 
            width: isHovered ? "100%" : 0,
            x: "-50%",
          }}
          transition={{ duration: 0.3 }}
        />
      </span>
      
      {/* Arrow that bounces */}
      <motion.span
        animate={{
          x: isHovered ? [0, 5, 0] : 0,
        }}
        transition={{
          duration: 0.6,
          repeat: isHovered ? Infinity : 0,
        }}
      >
        →
      </motion.span>
    </motion.a>
  );
}

interface ColorShiftTextProps {
  children: string;
  className?: string;
}

export function ColorShiftText({ children, className = "" }: ColorShiftTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      className={`inline-block cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        color: isHovered ? "#60a5fa" : "inherit",
      }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.span>
  );
}

interface PulsatingDotProps {
  color?: string;
  size?: number;
}

export function PulsatingDot({ color = "#60a5fa", size = 8 }: PulsatingDotProps) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
