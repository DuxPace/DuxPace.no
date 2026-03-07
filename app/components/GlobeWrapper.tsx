"use client";

import dynamic from "next/dynamic";

const InteractiveGlobe = dynamic(() => import("./InteractiveGlobe"), { 
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
    </div>
  )
});

export default function GlobeWrapper() {
  return <InteractiveGlobe />;
}
