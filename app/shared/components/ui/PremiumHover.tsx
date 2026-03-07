"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";

// ==========================================
// PREMIUM HOVER COMPONENTS (shadcn/ui-universe style)
// ==========================================

// Glow button (shadcn style)
interface GlowButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
}

export function GlowButton({
  children,
  className = "",
  onClick,
  variant = "primary",
}: GlowButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    primary: "bg-white text-black",
    secondary: "bg-blue-500 text-white",
    outline: "bg-transparent border border-white/30 text-white",
  };

  return (
    <motion.button
      className={`relative overflow-hidden px-8 py-4 rounded-lg font-semibold tracking-wider uppercase text-sm ${variants[variant]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={{
          opacity: isHovered ? 1 : 0,
          boxShadow: isHovered 
            ? "0 0 30px 10px rgba(59, 130, 246, 0.5), inset 0 0 20px rgba(59, 130, 246, 0.2)"
            : "0 0 0 0 rgba(59, 130, 246, 0)",
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Shine sweep */}
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{ x: isHovered ? "200%" : "-100%" }}
        transition={{ duration: 0.6 }}
      />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// Spotlight card (ui-universe style)
interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      className={`relative overflow-hidden bg-white/[0.02] border border-white/10 rounded-xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Spotlight effect */}
      <motion.div
        className="absolute pointer-events-none -inset-px opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
      
      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-blue-500/0 pointer-events-none"
        animate={{ borderColor: isHovered ? "rgba(59, 130, 246, 0.5)" : "rgba(59, 130, 246, 0)" }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative z-10 p-6">{children}</div>
    </motion.div>
  );
}

// Animated border button
interface AnimatedBorderButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function AnimatedBorderButton({
  children,
  className = "",
  onClick,
}: AnimatedBorderButtonProps) {
  return (
    <motion.button
      className={`relative px-8 py-4 bg-transparent text-white font-semibold tracking-wider uppercase overflow-hidden group ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Animated borders */}
      <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      <span className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent transform translate-x-full group-hover:-translate-x-full transition-transform duration-700" />
      <span className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent transform -translate-y-full group-hover:translate-y-full transition-transform duration-700 delay-100" />
      <span className="absolute right-0 bottom-0 w-[2px] h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-700 delay-100" />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// Magnetic card (uten delay)
interface MagneticCardProps {
  children: ReactNode;
  className?: string;
}

export function MagneticCard({ children, className = "" }: MagneticCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        y: isHovered ? -8 : 0,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Glow */}
      <motion.div
        className="absolute inset-0 opacity-0 bg-blue-500/10"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Shine */}
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: isHovered ? "200%" : "-100%" }}
        transition={{ duration: 0.6 }}
      />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Ripple button
interface RippleButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function RippleButton({
  children,
  className = "",
  onClick,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setRipples([...ripples, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 600);
    
    onClick?.();
  };

  return (
    <motion.button
      className={`relative overflow-hidden px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
          initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 1 }}
          animate={{ width: 500, height: 500, x: -250, y: -250, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// Glitch button (reactbits style)
interface GlitchButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function GlitchButton({
  children,
  className = "",
  onClick,
}: GlitchButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={`relative px-8 py-4 bg-white text-black font-bold tracking-wider uppercase overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glitch layers */}
      {isHovered && (
        <>
          <motion.span
            className="absolute inset-0 flex items-center justify-center text-red-500"
            initial={{ x: 0 }}
            animate={{ x: [-2, 2, -2, 0] }}
            transition={{ duration: 0.2 }}
            style={{ clipPath: "inset(10% 0 60% 0)" }}
          >
            {children}
          </motion.span>
          <motion.span
            className="absolute inset-0 flex items-center justify-center text-blue-500"
            initial={{ x: 0 }}
            animate={{ x: [2, -2, 2, 0] }}
            transition={{ duration: 0.2, delay: 0.05 }}
            style={{ clipPath: "inset(40% 0 30% 0)" }}
          >
            {children}
          </motion.span>
        </>
      )}
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// Neumorphic card
interface NeumorphicCardProps {
  children: ReactNode;
  className?: string;
}

export function NeumorphicCard({ children, className = "" }: NeumorphicCardProps) {
  return (
    <motion.div
      className={`relative bg-[#0a0a0a] rounded-2xl ${className}`}
      style={{
        boxShadow: "20px 20px 60px #050505, -20px -20px 60px #0f0f0f",
      }}
      whileHover={{
        boxShadow: "25px 25px 75px #030303, -25px -25px 75px #111111",
        y: -5,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

// Glass card
interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <motion.div
      className={`relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden ${className}`}
      whileHover={{
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        borderColor: "rgba(255, 255, 255, 0.2)",
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Tilt card (3D tilt on hover)
interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export function TiltCard({ children, className = "" }: TiltCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setRotateX((y - centerY) / 10);
    setRotateY((centerX - x) / 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}
