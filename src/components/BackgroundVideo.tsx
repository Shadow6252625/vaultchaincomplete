"use client";

import { usePathname } from "next/navigation";
import * as React from "react";
const { useEffect, useRef, useState } = React;

export function BackgroundVideo({ src = "/vault-bg.mp4", brightness = 0.35 }: { src?: string, brightness?: number }) {
  const pathname = usePathname();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
    if (videoRef.current) {
      if (videoRef.current.readyState >= 3) {
        setIsLoaded(true);
      }
      videoRef.current.play().catch(err => {
        console.warn("Autoplay was prevented, waiting for user interaction:", err);
      });
    }
  }, [src]);

  const poster = src.includes("trust")
    ? "/trust-poster.png"
    : src.includes("vault")
      ? "/vault-poster.png"
      : "/vault-poster.png"; // Fallback poster



  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#0b0c10]">
      {/* Fallback/Poster layer for instant display */}
      <div
        className={`absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
        style={{
          backgroundImage: `url(${poster})`,
          filter: `brightness(${brightness}) saturate(1.2) blur(10px)`,
          transform: 'scale(1.1)' // Hide blur edges
        }}
      />

      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        src={src}
        className="h-full w-full object-cover"
        style={{
          filter: `brightness(${brightness}) saturate(1.2)`,
          willChange: "transform",
        }}
      />
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(11,12,16,0.3) 0%, rgba(11,12,16,0.85) 100%)",
        }}
      />
    </div>
  );
}
