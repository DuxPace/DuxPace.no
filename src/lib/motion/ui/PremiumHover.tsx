"use client"

import { ReactNode, useState } from "react"
import { motion } from "framer-motion"

interface GlowButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "outline"
}

export function GlowButton({ children, className = "", onClick, variant = "primary" }: GlowButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const variants = {
    primary: "bg-white text-black",
    secondary: "bg-blue-500 text-white",
    outline: "bg-transparent border border-white/30 text-white",
  }

  return (
    <motion.button
      className={`relative overflow-hidden px-8 py-4 rounded-lg font-semibold tracking-wider uppercase text-sm ${variants[variant]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
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
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{ x: isHovered ? "200%" : "-100%" }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

interface SpotlightCardProps {
  children: ReactNode
  className?: string
}

export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div
      className={`relative overflow-hidden bg-white/[0.02] border border-white/10 rounded-xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <motion.div
        className="absolute pointer-events-none -inset-px opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-blue-500/0 pointer-events-none"
        animate={{ borderColor: isHovered ? "rgba(59, 130, 246, 0.5)" : "rgba(59, 130, 246, 0)" }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative z-10 p-6">{children}</div>
    </motion.div>
  )
}

interface TiltCardProps {
  children: ReactNode
  className?: string
}

export function TiltCard({ children, className = "" }: TiltCardProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    setRotateX((y - centerY) / 10)
    setRotateY((centerX - x) / 10)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedBorderButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function AnimatedBorderButton({ children, className = "", onClick }: AnimatedBorderButtonProps) {
  return (
    <motion.button
      className={`relative px-8 py-4 bg-transparent text-white font-semibold tracking-wider uppercase overflow-hidden group ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      <span className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent transform translate-x-full group-hover:-translate-x-full transition-transform duration-700" />
      <span className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent transform -translate-y-full group-hover:translate-y-full transition-transform duration-700 delay-100" />
      <span className="absolute right-0 bottom-0 w-[2px] h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-700 delay-100" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

interface MagneticCardProps {
  children: ReactNode
  className?: string
}

export function MagneticCard({ children, className = "" }: MagneticCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ y: isHovered ? -8 : 0, scale: isHovered ? 1.02 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 bg-blue-500/10"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: isHovered ? "200%" : "-100%" }}
        transition={{ duration: 0.6 }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
