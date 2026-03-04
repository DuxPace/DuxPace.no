"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    const size = canvasRef.current!.parentElement!.offsetWidth || 800;

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: 0.25,
      dark: 0.6,
      diffuse: 1.8,
      mapSamples: 24000,
      mapBrightness: 14,
      baseColor: [0.12, 0.35, 0.7],
      markerColor: [1, 0.88, 0.35],
      glowColor: [0.18, 0.52, 1.0],
      markers: [
        { location: [63.4305, 10.3951], size: 0.1 },
        { location: [59.9139, 10.7522], size: 0.05 },
        { location: [60.3913, 5.3221],  size: 0.04 },
        { location: [69.6496, 18.9553], size: 0.04 },
        { location: [51.5074, -0.1278], size: 0.05 },
        { location: [40.7128, -74.006], size: 0.05 },
        { location: [35.6762, 139.6503], size: 0.04 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.0025;
      },
    });

    return () => globe.destroy();
  }, []);

  return (
    <div className="relative w-full aspect-square">
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", contain: "layout paint size" }}
      />
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path id="sat-path-1" d="M 8,100 A 92,26 0 1,1 192,100 A 92,26 0 1,1 8,100"   transform="rotate(-30, 100, 100)" />
          <path id="sat-path-2" d="M -2,100 A 102,20 0 1,1 202,100 A 102,20 0 1,1 -2,100" transform="rotate(55, 100, 100)" />
          <path id="sat-path-3" d="M 18,100 A 82,32 0 1,1 182,100 A 82,32 0 1,1 18,100"  transform="rotate(135, 100, 100)" />
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle r="2"   fill="white"   opacity="0.95" filter="url(#glow)"><animateMotion dur="10s" repeatCount="indefinite"><mpath href="#sat-path-1" /></animateMotion></circle>
        <circle r="1.6" fill="#93c5fd" opacity="0.9"  filter="url(#glow)"><animateMotion dur="17s" repeatCount="indefinite" begin="-5s"><mpath href="#sat-path-2" /></animateMotion></circle>
        <circle r="1.4" fill="#fcd34d" opacity="0.85" filter="url(#glow)"><animateMotion dur="24s" repeatCount="indefinite" begin="-12s"><mpath href="#sat-path-3" /></animateMotion></circle>
      </svg>
    </div>
  );
}
