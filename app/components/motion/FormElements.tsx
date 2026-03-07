"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { motionTokens } from ".";

// AnimatedInput - form field with focus states
interface AnimatedInputProps {
  id: string;
  name: string;
  type?: "text" | "email" | "textarea";
  placeholder: string;
  required?: boolean;
  rows?: number;
  className?: string;
  disabled?: boolean;
}

export function AnimatedInput({
  id,
  name,
  type = "text",
  placeholder,
  required = false,
  rows = 4,
  className = "",
  disabled = false,
}: AnimatedInputProps) {
  const shouldReduceMotion = useReducedMotion();

  const baseClasses = `w-full bg-transparent py-3 text-white placeholder-gray-700 focus:outline-none text-sm transition-colors ${className}`;

  if (type === "textarea") {
    return (
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: motionTokens.duration.slow,
          ease: motionTokens.ease.smooth,
        }}
      >
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          rows={rows}
          required={required}
          disabled={disabled}
          className={`${baseClasses} border-b border-white/[0.12] focus:border-white/50 resize-none`}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-[1px] bg-white"
          initial={{ width: "0%" }}
          whileFocus={{ width: "100%" }}
          transition={{
            duration: motionTokens.duration.normal,
            ease: motionTokens.ease.smooth,
          }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: motionTokens.duration.slow,
        ease: motionTokens.ease.smooth,
      }}
    >
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`${baseClasses} border-b border-white/[0.12] focus:border-white/50`}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-[1px] bg-white origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 0 }}
        style={{ width: "100%" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-[1px] bg-white"
        initial={{ width: "0%" }}
        animate={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{
          duration: shouldReduceMotion ? 0 : motionTokens.duration.normal,
          ease: motionTokens.ease.smooth,
        }}
      />
    </motion.div>
  );
}

// FormLabel - animated label for form fields
interface FormLabelProps {
  htmlFor: string;
  children: ReactNode;
  className?: string;
}

export function FormLabel({ htmlFor, children, className = "" }: FormLabelProps) {
  return (
    <label htmlFor={htmlFor} className={`sr-only ${className}`}>
      {children}
    </label>
  );
}

// SubmitButton - animated submit button with loading state
interface SubmitButtonProps {
  children: ReactNode;
  pending?: boolean;
  className?: string;
}

export function SubmitButton({ children, pending = false, className = "" }: SubmitButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="submit"
      disabled={pending}
      className={`text-[11px] font-semibold text-black bg-white px-5 py-2.5 rounded-sm hover:bg-gray-100 tracking-[0.1em] uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50 disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden ${className}`}
      whileHover={{ scale: pending ? 1 : 1.02 }}
      whileTap={{ scale: pending ? 1 : 0.98 }}
      transition={{
        duration: motionTokens.duration.fast,
        ease: motionTokens.ease.smooth,
      }}
    >
      <motion.span
        initial={false}
        animate={{ opacity: pending ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.span>
      {pending && (
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          <motion.svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            animate={shouldReduceMotion ? {} : { rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <circle cx="12" cy="12" r="10" strokeDasharray="60" strokeDashoffset="20" />
          </motion.svg>
        </motion.span>
      )}
    </motion.button>
  );
}

// SuccessMessage - animated success state
interface SuccessMessageProps {
  title: string;
  message: string;
  className?: string;
}

export function SuccessMessage({ title, message, className = "" }: SuccessMessageProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`pt-2 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: motionTokens.duration.slow,
        ease: motionTokens.ease.bounce,
      }}
    >
      <motion.p
        className="text-white text-sm font-medium mb-1 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: shouldReduceMotion ? 0 : 0.1 }}
      >
        <motion.svg
          className="w-4 h-4"
          viewBox="0 0 20 20"
          fill="currentColor"
          initial={{ scale: shouldReduceMotion ? 1 : 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: shouldReduceMotion ? 0 : 0.2,
            duration: motionTokens.duration.fast,
            ease: motionTokens.ease.bounce,
          }}
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </motion.svg>
        {title}
      </motion.p>
      <motion.p
        className="text-gray-600 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: shouldReduceMotion ? 0 : 0.3 }}
      >
        {message}
      </motion.p>
    </motion.div>
  );
}

// ErrorMessage - animated error state
interface ErrorMessageProps {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className = "" }: ErrorMessageProps) {
  return (
    <motion.p
      className={`text-red-400 text-xs ${className}`}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: motionTokens.duration.fast,
        ease: motionTokens.ease.smooth,
      }}
    >
      {message}
    </motion.p>
  );
}
