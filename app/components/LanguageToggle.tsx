"use client";

import { useLanguage } from "./LanguageProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <motion.div
      role="radiogroup"
      aria-label="Select language / Velg språk"
      className="relative flex items-center border border-white/[0.12] p-0.5 rounded-sm"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated background pill */}
      <motion.div
        className="absolute top-0.5 bottom-0.5 bg-white rounded-sm"
        initial={false}
        animate={{
          x: lang === "en" ? 0 : "100%",
          width: "calc(50% - 2px)",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
        style={{
          left: "2px",
        }}
      />

      <button
        role="radio"
        aria-checked={lang === "en"}
        aria-label="English"
        onClick={() => setLang("en")}
        className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-sm font-medium min-w-[44px] min-h-[36px] justify-center transition-colors duration-200 ${
          lang === "en"
            ? "text-black"
            : "text-gray-500 hover:text-white"
        }`}
      >
        <motion.span 
          aria-hidden="true"
          animate={{ scale: lang === "en" ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          🇬🇧
        </motion.span>
        <span className="text-xs">EN</span>
      </button>
      
      <button
        role="radio"
        aria-checked={lang === "no"}
        aria-label="Norsk"
        onClick={() => setLang("no")}
        className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-sm font-medium min-w-[44px] min-h-[36px] justify-center transition-colors duration-200 ${
          lang === "no"
            ? "text-black"
            : "text-gray-500 hover:text-white"
        }`}
      >
        <motion.span 
          aria-hidden="true"
          animate={{ scale: lang === "no" ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          🇳🇴
        </motion.span>
        <span className="text-xs">NO</span>
      </button>
    </motion.div>
  );
}
