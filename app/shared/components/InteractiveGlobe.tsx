"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";

interface Location {
  lat: number;
  lng: number;
  name: string;
  size: number;
  color: string;
}

interface SatelliteArc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string[];
}

interface RingData {
  lat: number;
  lng: number;
  maxR: number;
  propagationSpeed: number;
  repeatPeriod: number;
}

const LOCATIONS: Location[] = [
  { lat: 63.4305, lng: 10.3951, name: "Trondheim", size: 1.2, color: "#60a5fa" },
  { lat: 59.9139, lng: 10.7522, name: "Oslo", size: 1.0, color: "#60a5fa" },
  { lat: 60.3913, lng: 5.3221, name: "Bergen", size: 0.9, color: "#60a5fa" },
  { lat: 69.6496, lng: 18.9553, name: "Tromsø", size: 0.9, color: "#60a5fa" },
  { lat: 62.4722, lng: 6.1495, name: "Ålesund", size: 0.8, color: "#60a5fa" },
  { lat: 58.1467, lng: 7.9956, name: "Kristiansand", size: 0.7, color: "#60a5fa" },
  { lat: 67.28, lng: 14.405, name: "Bodø", size: 0.7, color: "#60a5fa" },
  { lat: 51.5074, lng: -0.1278, name: "London", size: 1.0, color: "#93c5fd" },
  { lat: 40.7128, lng: -74.006, name: "New York", size: 1.0, color: "#93c5fd" },
  { lat: 35.6762, lng: 139.6503, name: "Tokyo", size: 0.9, color: "#93c5fd" },
];

const SATELLITE_ARCS: SatelliteArc[] = [
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

const RINGS_DATA: RingData[] = LOCATIONS.map(loc => ({
  lat: loc.lat,
  lng: loc.lng,
  maxR: loc.size * 3,
  propagationSpeed: 2,
  repeatPeriod: 2500,
}));

export default function InteractiveGlobe() {
  const globeRef = useRef<typeof Globe.prototype | null>(null);
  const [, setIsHovering] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 900, height: 900 });
   
  const rotationSpeed = 0.4;

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

  useEffect(() => {
    if (!globeRef.current) return;

    const controls = globeRef.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = rotationSpeed;
    controls.enableZoom = false;
    controls.enablePan = false;

    const scene = globeRef.current.scene();
    scene.background = new THREE.Color(0x000000);
    
    scene.children.forEach((child: THREE.Object3D) => {
      if ((child as THREE.Light).isLight) scene.remove(child);
    });
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(100, 50, 80);
    scene.add(dirLight);
    
    const fillLight = new THREE.DirectionalLight(0x6699ff, 0.4);
    fillLight.position.set(-100, 0, 50);
    scene.add(fillLight);

  }, [rotationSpeed]);

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

  const markerTooltip = (marker: object) => {
    const m = marker as Location;
    return `
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
      <div style="color: #60a5fa; font-weight: 600; margin-bottom: 4px; font-size: 13px;">${m.name}</div>
      <div style="color: rgba(255, 255, 255, 0.5); font-family: monospace; font-size: 10px;">${m.lat.toFixed(2)}°, ${m.lng.toFixed(2)}°</div>
    </div>
  `;
  };

  return (
    <div 
      className="relative w-full h-full cursor-grab active:cursor-grabbing"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div 
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        
        atmosphereColor="rgba(100, 149, 237, 0.4)"
        atmosphereAltitude={0.2}
        
        labelsData={LOCATIONS}
        labelLat={(d) => (d as Location).lat}
        labelLng={(d) => (d as Location).lng}
        labelText={(d) => (d as Location).name}
        labelSize={(d) => (d as Location).size}
        labelDotRadius={(d) => (d as Location).size * 0.3}
        labelColor={(d) => (d as Location).color}
        labelResolution={2}
        labelAltitude={0.01}
        labelLabel={markerTooltip}
        
        ringsData={RINGS_DATA}
        ringLat={(d) => (d as RingData).lat}
        ringLng={(d) => (d as RingData).lng}
        ringMaxRadius={(d) => (d as RingData).maxR}
        ringPropagationSpeed={(d) => (d as RingData).propagationSpeed}
        ringRepeatPeriod={(d) => (d as RingData).repeatPeriod}
        ringColor={() => (t: number) => `rgba(96, 165, 250, ${0.8 * (1 - t)})`}
        ringResolution={64}
        
        arcsData={SATELLITE_ARCS}
        arcStartLat={(d) => (d as SatelliteArc).startLat}
        arcStartLng={(d) => (d as SatelliteArc).startLng}
        arcEndLat={(d) => (d as SatelliteArc).endLat}
        arcEndLng={(d) => (d as SatelliteArc).endLng}
        arcColor={(d: object) => (d as SatelliteArc).color}
        arcDashLength={0.5}
        arcDashGap={0.2}
        arcDashInitialGap={() => Math.random()}
        arcDashAnimateTime={2500}
        arcStroke={0.6}
        arcAltitudeAutoScale={0.4}
        
        pointsData={LOCATIONS}
        pointLat={(d) => (d as Location).lat}
        pointLng={(d) => (d as Location).lng}
        pointRadius={(d) => (d as Location).size * 0.25}
        pointColor={(d) => (d as Location).color}
        pointAltitude={0.01}
        pointResolution={32}
      />

    </div>
  );
}
