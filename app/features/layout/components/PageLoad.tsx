"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageLoadContextType {
  isLoading: boolean;
}

const PageLoadContext = createContext<PageLoadContextType>({ isLoading: true });

export const usePageLoad = () => useContext(PageLoadContext);

export function PageLoadProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageLoadContext.Provider value={{ isLoading }}>
      <AnimatePresence mode="wait">
        {isLoading && <IntroScreen key="intro" />}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </PageLoadContext.Provider>
  );
}

function IntroScreen() {
  const letters = "DUXPACE".split("");

  return (
        <motion.div
        className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        exit={{ y: "-100%" }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-[700px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative flex flex-col items-center gap-5">
        {/* Letters */}
        <div className="flex" aria-label="DUXPACE">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              className="text-[13vw] sm:text-8xl md:text-9xl font-bold text-white leading-none tracking-tight"
              initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: i * 0.04 + 0.05,
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Divider line */}
        <motion.div
          className="h-px bg-white/15 w-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ originX: 0 }}
          transition={{ delay: 0.6, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Tagline */}
        <motion.p
          className="text-[11px] text-white/35 tracking-[0.45em] uppercase font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          Satellite Intelligence
        </motion.p>
      </div>
    </motion.div>
  );
}
