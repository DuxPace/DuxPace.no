"use client";

import dynamic from "next/dynamic";
import { Component, useRef, useState, useEffect, type ReactNode } from "react";

const InteractiveGlobe = dynamic(() => import("./InteractiveGlobe"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
    </div>
  )
});

// The globe runs WebGL. On hardware or driver failure the render throws, and
// without a boundary that crash takes the whole page down. Catch it here and
// fall back to a quiet static placeholder so the rest of the page survives.
// The globe is decorative, so the fallback carries no copy and is hidden from
// assistive tech; it only holds the layout so nothing around it shifts.
class GlobeErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("InteractiveGlobe failed to render:", error);
  }

  render() {
    if (this.state.failed) {
      return <div className="w-full aspect-square" aria-hidden="true" />;
    }
    return this.props.children;
  }
}

export default function GlobeWrapper() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: "100px",
        threshold: 0.1 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full h-full">
      {isVisible ? (
        <GlobeErrorBoundary>
          <InteractiveGlobe />
        </GlobeErrorBoundary>
      ) : (
        <div className="w-full aspect-square flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
