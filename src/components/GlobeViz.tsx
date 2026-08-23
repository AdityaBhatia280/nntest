'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function GlobeViz() {
  const globeRef = useRef<any>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Use a small delay to setup zoom and auto-rotate
  useEffect(() => {
    if (globeRef.current) {
      // Setup initial POV
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 });
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableRotate = false;
    }
  }, [globeRef.current]);

  if (windowWidth === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden flex items-center justify-center opacity-30 grayscale brightness-150 contrast-50 mix-blend-luminosity">
      <Globe
        ref={globeRef}
        width={windowWidth}
        height={windowHeight}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={true}
        atmosphereColor="white"
        atmosphereAltitude={0.25}
      />
    </div>
  );
}
