"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Page load context
interface PageLoadContextType {
  isLoading: boolean;
  progress: number;
}

const PageLoadContext = createContext<PageLoadContextType>({
  isLoading: true,
  progress: 0,
});

export const usePageLoad = () => useContext(PageLoadContext);

// Page load provider
export function PageLoadProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 20;
        if (prev + increment >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + increment;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <PageLoadContext.Provider value={{ isLoading, progress }}>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen progress={progress} />}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </PageLoadContext.Provider>
  );
}

// Dramatisk loading screen
function LoadingScreen({ progress }: { progress: number }) {
  const text = "DUXPACE";
  const letters = text.split("");

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
      exit={{ 
        opacity: 0,
        scale: 1.1,
        filter: "blur(20px)"
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Glow effects */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Letter animation */}
        <div className="flex justify-center mb-8">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              className="text-6xl md:text-8xl font-bold text-white inline-block"
              initial={{ 
                opacity: 0, 
                y: 100,
                rotateX: -90,
                filter: "blur(10px)"
              }}
              animate={{ 
                opacity: 1, 
                y: 0,
                rotateX: 0,
                filter: "blur(0px)"
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ 
                textShadow: "0 0 40px rgba(59, 130, 246, 0.5)",
                perspective: "1000px"
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-blue-400/80 text-sm tracking-[0.3em] uppercase font-mono mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Satellite Intelligence
        </motion.p>

        {/* Progress bar container */}
        <div className="w-64 mx-auto">
          {/* Progress track */}
          <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Progress text */}
          <div className="flex justify-between text-[10px] font-mono tracking-wider">
            <motion.span
              className="text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              INITIALIZING
            </motion.span>
            <motion.span
              className="text-blue-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.span>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Corner decorations */}
      <motion.div
        className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-blue-500/30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-blue-500/30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
    </motion.div>
  );
}
