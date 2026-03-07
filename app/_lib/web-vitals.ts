"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import type { Metric } from "web-vitals";

// Report Web Vitals to Sentry for performance monitoring
export function useWebVitals() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Dynamic import to avoid SSR issues
    import("web-vitals").then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
      const reportWebVital = (metric: Metric) => {
        // Report to Sentry
        Sentry.captureMessage(`Web Vitals: ${metric.name}`, {
          level: "info",
          tags: {
            metric_name: metric.name,
            metric_rating: metric.rating,
          },
          extra: {
            metric_id: metric.id,
            metric_value: metric.value,
            metric_delta: metric.delta,
            metric_entries: metric.entries,
          },
        });

        // Also log to console in development
        if (process.env.NODE_ENV === "development") {
         
          console.log(`Web Vital: ${metric.name}`, {
            value: metric.value,
            rating: metric.rating,
          });
        }
      };

      // Core Web Vitals (using new API names)
      onCLS(reportWebVital);
      onFCP(reportWebVital);
      onINP(reportWebVital);
      onLCP(reportWebVital);
      onTTFB(reportWebVital);
    });
  }, []);
}
