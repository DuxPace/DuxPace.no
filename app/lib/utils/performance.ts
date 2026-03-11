"use client";

// Type declarations for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
  
  interface Navigator {
    connection?: {
      effectiveType?: string;
      saveData?: boolean;
    };
  }
}

// Performance monitoring utilities
export function reportWebVitals(metric: {
  id: string;
  name: string;
  startTime: number;
  value: number;
  label: "web-vital" | "custom";
}) {
  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Web Vitals] ${metric.name}: ${metric.value}`, metric);
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === "production" && typeof window !== "undefined") {
    if (window.gtag) {
      window.gtag("event", metric.name, {
        event_category: "Web Vitals",
        event_label: metric.id,
        value: Math.round(metric.value),
        non_interaction: true,
      });
    }
  }
}

// Measure custom performance marks
export function measurePerformance(markName: string, startMark?: string) {
  if (typeof window === "undefined" || !window.performance) return;

  if (startMark) {
    window.performance.measure(markName, startMark);
  } else {
    window.performance.mark(markName);
  }

  const entries = window.performance.getEntriesByName(markName);
  const lastEntry = entries[entries.length - 1] as PerformanceMeasure;
  
  return lastEntry?.duration;
}

// Check if user has slow connection
export function isSlowConnection(): boolean {
  if (typeof navigator === "undefined") return false;
  
  const connection = navigator.connection;
  
  if (!connection) return false;
  
  return connection.effectiveType === "2g" || 
         connection.effectiveType === "slow-2g" ||
         connection.saveData === true;
}

// Prefetch images
export function prefetchImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// Debounce function for performance
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function for scroll/resize events
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
