"use client";

import { useState, useEffect } from "react";
import { IoGitNetworkOutline } from "react-icons/io5";

export function BootSequence() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Ignite the visual progression perfectly mapped to our hold time
    const startLoader = setTimeout(() => {
      setProgress(100);
    }, 100);

    // Hold the completely solid loading screen for 1.8s to let heavy Three.js assets hydrate silently in the background
    const timer1 = setTimeout(() => {
      setIsFading(true);
    }, 1800);

    // Fully unmount the loading screen after the crossfade completes
    const timer2 = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 1.8s hold + 0.7s crossfade

    return () => {
      clearTimeout(startLoader);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-[#020204] text-white flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="flex flex-col items-center gap-8 animate-pulse-subtle">
        {/* Glowing Network Icon */}
        <div className="relative group perspective-1000">
          <IoGitNetworkOutline className="text-8xl text-[--color-brand-cyan] animate-float" />
          <div className="absolute inset-0 blur-2xl bg-[--color-brand-cyan] opacity-30 rounded-full" />
          
          {/* Orbital rings */}
          <div className="absolute inset-[-20px] rounded-full border border-white/5 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-[-40px] rounded-full border border-[--color-brand-pink]/10 animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        
        {/* Typography */}
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-black tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
            ARISE<span className="text-[--color-brand-pink]">_osc</span>
          </h2>
          <div className="flex flex-col items-center gap-2">
            <p className="text-[--color-brand-cyan] text-xs font-bold tracking-[0.3em] uppercase">
              Establishing Consciousness Link
            </p>
            {/* Live Synchronized Progress Bar */}
            <div className="w-56 h-1.5 bg-white/10 rounded-full overflow-hidden mt-3 relative drop-shadow-[0_0_10px_rgba(26,229,229,0.3)]">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[--color-brand-cyan] to-[--color-brand-pink] rounded-full transition-all ease-in-out"
                style={{ width: `${progress}%`, transitionDuration: '1800ms' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
