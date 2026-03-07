"use client";

import { useEffect, useRef, useState } from "react";

type AnimationDirection = "up" | "down" | "left" | "right" | "scale" | "none";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: AnimationDirection;
  distance?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 24,
  duration = 500,
  threshold = 0.1,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold }
    );
    
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const getInitialTransform = () => {
    switch (direction) {
      case "up": return `translateY(${distance}px)`;
      case "down": return `translateY(-${distance}px)`;
      case "left": return `translateX(${distance}px)`;
      case "right": return `translateX(-${distance}px)`;
      case "scale": return `scale(0.95)`;
      case "none": return "none";
      default: return `translateY(${distance}px)`;
    }
  };

  const getFinalTransform = () => {
    switch (direction) {
      case "up":
      case "down": return "translateY(0)";
      case "left":
      case "right": return "translateX(0)";
      case "scale": return "scale(1)";
      case "none": return "none";
      default: return "translateY(0)";
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? getFinalTransform() : getInitialTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, 
                     transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

// Utility component for staggered children animations
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  baseDelay?: number;
}

export function StaggerContainer({ 
  children, 
  className = "", 
  staggerDelay = 80,
  baseDelay = 0 
}: StaggerContainerProps) {
  return (
    <div className={className}>
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <FadeIn key={index} delay={baseDelay + index * staggerDelay}>
              {child}
            </FadeIn>
          ))
        : children
      }
    </div>
  );
}
