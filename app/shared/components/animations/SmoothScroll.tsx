"use client";

import { useEffect, useRef, ReactNode, useCallback, useState } from "react";
import { motion, useSpring, useScroll, useTransform } from "framer-motion";

// Smooth scroll hook
export function useSmoothScroll() {
  const scrollTo = useCallback((elementId: string, offset: number = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return { scrollTo };
}

// Smooth scroll link component
interface SmoothScrollLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  offset?: number;
  onClick?: () => void;
}

export function SmoothScrollLink({
  href,
  children,
  className = "",
  offset = 80,
  onClick,
}: SmoothScrollLinkProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
      
      onClick?.();
    },
    [href, offset, onClick]
  );

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

// Scroll progress indicator
export function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 via-white to-blue-400 origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}

// Section observer for animations
interface SectionObserverProps {
  children: ReactNode;
  className?: string;
  onEnter?: () => void;
  threshold?: number;
}

export function SectionObserver({
  children,
  className = "",
  onEnter,
  threshold = 0.2,
}: SectionObserverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onEnter?.();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [onEnter, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// Scroll snap container
interface ScrollSnapContainerProps {
  children: ReactNode;
  className?: string;
}

export function ScrollSnapContainer({ children, className = "" }: ScrollSnapContainerProps) {
  return (
    <div 
      className={`snap-y snap-mandatory overflow-y-scroll h-screen ${className}`}
      style={{ scrollBehavior: "smooth" }}
    >
      {children}
    </div>
  );
}

// Scroll snap section
interface ScrollSnapSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function ScrollSnapSection({ children, className = "", id }: ScrollSnapSectionProps) {
  return (
    <section 
      id={id} 
      className={`snap-start snap-always min-h-screen flex items-center ${className}`}
    >
      {children}
    </section>
  );
}

// Parallax scroll element
interface ParallaxElementProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}

export function ParallaxElement({
  children,
  className = "",
  speed = 0.5,
  direction = "up",
}: ParallaxElementProps) {
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

// Fade in on scroll
interface FadeInOnScrollProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
}

export function FadeInOnScroll({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.6,
}: FadeInOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { y: 0, x: 50 },
    right: { y: 0, x: -50 },
  };

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [directions[direction].y, 0]
  );
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [directions[direction].x, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x, y }}
      transition={{ delay, duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Scroll velocity hook
export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime.current;
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY.current;
      
      if (deltaTime > 0) {
        const newVelocity = deltaY / deltaTime;
        setVelocity(newVelocity);
      }
      
      lastScrollY.current = currentScrollY;
      lastTime.current = currentTime;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return velocity;
}
