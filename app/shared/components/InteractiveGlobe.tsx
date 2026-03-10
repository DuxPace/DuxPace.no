"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";

  // Data for Norwegian aquaculture locations - INCREASED SIZES
const LOCATIONS = [
  { lat: 63.4305, lng: 10.3951, name: "Trondheim", size: 1.2, color: "#60a5fa" },
  { lat: 59.9139, lng: 10.7522, name: "Oslo", size: 1.0, color: "#60a5fa" },
  { lat: 60.3913, lng: 5.3221, name: "Bergen", size: 0.9, color: "#60a5fa" },
  { lat: 69.6496, lng: 18.9553, name: "Tromsø", size: 0.9, color: "#60a5fa" },
  { lat: 62.4722, lng: 6.1495, name: "Ålesund", size: 0.8, color: "#60a5fa" },
  { lat: 58.1467, lng: 7.9956, name: "Kristiansand", size: 0.7, color: "#60a5fa" },
  { lat: 67.28, lng: 14.405, name: "Bodø", size: 0.7, color: "#60a5fa" },
  // International hubs
  { lat: 51.5074, lng: -0.1278, name: "London", size: 1.0, color: "#93c5fd" },
  { lat: 40.7128, lng: -74.006, name: "New York", size: 1.0, color: "#93c5fd" },
  { lat: 35.6762, lng: 139.6503, name: "Tokyo", size: 0.9, color: "#93c5fd" },
];

// Satellite orbits (arcs)
const SATELLITE_ARCS = [
  { 
    startLat: 63.4305, startLng: 10.3951, 
    endLat: 51.5074, endLng: -0.1278,
    color: ["rgba(96, 165, 250, 0.2)", "rgba(96, 165, 250, 0.6)"]
  },
  { 
    startLat: 59.9139, startLng: 10.7522, 
    endLat: 40.7128, endLng: -74.006,
    color: ["rgba(147, 197, 253, 0.2)", "rgba(147, 197, 253, 0.6)"]
  },
  { 
    startLat: 60.3913, startLng: 5.3221, 
    endLat: 35.6762, endLng: 139.6503,
    color: ["rgba(147, 197, 253, 0.2)", "rgba(147, 197, 253, 0.6)"]
  },
  { 
    startLat: 69.6496, startLng: 18.9553, 
    endLat: 51.5074, endLng: -0.1278,
    color: ["rgba(96, 165, 250, 0.2)", "rgba(96, 165, 250, 0.6)"]
  },
];

// Ring data for pulsating effect
const RINGS_DATA = LOCATIONS.map(loc => ({
  lat: loc.lat,
  lng: loc.lng,
  maxR: loc.size * 3,
  propagationSpeed: 2,
  repeatPeriod: 2500,
}));

export default function InteractiveGlobe() {
  const globeRef = useRef<typeof Globe.prototype | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 900, height: 900 });
  
  const rotationSpeed = 0.4;

  // Handle window resize
  useEffect(() => {
    const updateDimensions = () => {
      const container = globeRef.current?._containerRef?.current?.parentElement;
      if (container) {
        const size = Math.min(container.offsetWidth, container.offsetHeight, 1000);
        setDimensions({ width: size, height: size });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Initialize globe
  useEffect(() => {
    if (!globeRef.current) return;

    // Auto-rotate
    const controls = globeRef.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = rotationSpeed;
    controls.enableZoom = false;
    controls.enablePan = false;

    // Custom lighting - BRIGHTER
    const scene = globeRef.current.scene();
    scene.background = new THREE.Color(0x000000);
    
    // Clear existing lights
    scene.children.forEach((child: THREE.Object3D) => {
      if ((child as THREE.Light).isLight) scene.remove(child);
    });
    
    // Add ambient light - BRIGHTER
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    // Add directional light (sun) - BRIGHTER
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(100, 50, 80);
    scene.add(dirLight);
    
    // Add secondary light for fill - BRIGHTER
    const fillLight = new THREE.DirectionalLight(0x6699ff, 0.8);
    fillLight.position.set(-100, 0, 50);
    scene.add(fillLight);

    setIsLoaded(true);
  }, [rotationSpeed]);

  // Handle mouse interactions
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    if (globeRef.current) {
      globeRef.current.controls().autoRotateSpeed = 0.05;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    if (globeRef.current) {
      globeRef.current.controls().autoRotateSpeed = rotationSpeed;
    }
  }, [rotationSpeed]);

  const handleClick = useCallback(() => {
    if (globeRef.current) {
      const currentSpeed = globeRef.current.controls().autoRotateSpeed;
      globeRef.current.controls().autoRotateSpeed = currentSpeed > 0 ? 0 : rotationSpeed;
    }
  }, [rotationSpeed]);

  // Custom marker tooltip
  const markerTooltip = (marker: any) => `
    <div style="
      background: rgba(0, 0, 0, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 10px 14px;
      border-radius: 6px;
      font-family: system-ui, sans-serif;
      font-size: 12px;
      color: white;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    ">
      <div style="color: #60a5fa; font-weight: 600; margin-bottom: 4px; font-size: 13px;">${marker.name}</div>
      <div style="color: rgba(255, 255, 255, 0.5); font-family: monospace; font-size: 10px;">${marker.lat.toFixed(2)}°, ${marker.lng.toFixed(2)}°</div>
    </div>
  `;

  return (
    <div 
      className="relative w-full h-full cursor-grab active:cursor-grabbing"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
        </div>
      )}

      {/* Glow effect behind globe - MORE VISIBLE */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.35) 0%, transparent 55%), radial-gradient(circle at 70% 50%, rgba(30, 89, 178, 0.3) 0%, transparent 45%), radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        
        // Earth texture - USING CLEAN BLUE MARBLE
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        // Bump map for terrain detail
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        
        // Atmosphere glow - BRIGHTER
        atmosphereColor="rgba(100, 149, 237, 0.85)"
        atmosphereAltitude={0.2}
        
        // Locations markers
        labelsData={LOCATIONS}
        labelLat={(d: any) => d.lat}
        labelLng={(d: any) => d.lng}
        labelText={(d: any) => d.name}
        labelSize={(d: any) => d.size}
        labelDotRadius={(d: any) => d.size * 0.3}
        labelColor={(d: any) => d.color}
        labelResolution={2}
        labelAltitude={0.01}
        labelLabel={markerTooltip}
        
        // Pulsating rings around locations
        ringsData={RINGS_DATA}
        ringLat={(d: any) => d.lat}
        ringLng={(d: any) => d.lng}
        ringMaxRadius={(d: any) => d.maxR}
        ringPropagationSpeed={(d: any) => d.propagationSpeed}
        ringRepeatPeriod={(d: any) => d.repeatPeriod}
        ringColor={() => (t: number) => `rgba(96, 165, 250, ${0.8 * (1 - t)})`}
        ringResolution={64}
        
        // Satellite arcs
        arcsData={SATELLITE_ARCS}
        arcStartLat={(d: any) => d.startLat}
        arcStartLng={(d: any) => d.startLng}
        arcEndLat={(d: any) => d.endLat}
        arcEndLng={(d: any) => d.endLng}
        arcColor={(d: any) => d.color}
        arcDashLength={0.5}
        arcDashGap={0.2}
        arcDashInitialGap={() => Math.random()}
        arcDashAnimateTime={2500}
        arcStroke={0.6}
        arcAltitudeAutoScale={0.4}
        
        // Points for cities
        pointsData={LOCATIONS}
        pointLat={(d: any) => d.lat}
        pointLng={(d: any) => d.lng}
        pointRadius={(d: any) => d.size * 0.25}
        pointColor={(d: any) => d.color}
        pointAltitude={0.01}
        pointResolution={32}
      />

      {/* Satellite legend overlay */}
      <div className="absolute bottom-4 left-4 pointer-events-none">
        <div className="bg-black/70 backdrop-blur-sm border border-white/10 rounded px-3 py-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[10px] text-gray-400 font-mono tracking-wider uppercase">Active Hubs</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-px bg-gradient-to-r from-blue-400/30 to-blue-400" />
            <span className="text-[10px] text-gray-400 font-mono tracking-wider uppercase">Data Links</span>
          </div>
        </div>
      </div>

      {/* Interaction hint */}
      <div 
        className={`absolute bottom-4 right-4 pointer-events-none transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-60'}`}
      >
        <span className="text-[10px] text-gray-500 font-mono tracking-wider">
          Click to pause • Drag to rotate
        </span>
      </div>
    </div>
  );
}
