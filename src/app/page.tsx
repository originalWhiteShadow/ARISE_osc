"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  IoFlash,
  IoCodeWorkingOutline,
  IoPlanetOutline,
  IoSparkles,
  IoRocketOutline,
  IoPeopleOutline
} from "react-icons/io5";

// Interactive 3D Card Component
function InteractiveCard({ item, idx }: { item: any; idx: number }) {
  const Icon = item.icon;
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(mouseYSpring, [0, 1], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [0, 1], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };
  
  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      key={idx}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative glass w-[280px] sm:w-[320px] md:w-[380px] p-5 sm:p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-colors duration-500 shrink-0 flex flex-col cursor-grab active:cursor-grabbing group shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_40px_rgba(26,229,229,0.15)]"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl pointer-events-none" />
      
      <div className="flex items-center gap-4 mb-4 relative z-10 pointer-events-none" style={{ transform: "translateZ(40px)" }}>
        <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center transition-transform duration-500 shrink-0 shadow-inner group-hover:bg-white/5">
          <Icon className={`text-2xl ${item.color}`} />
        </div>
        <h3 className="text-lg font-bold text-white leading-tight tracking-tight whitespace-normal break-words drop-shadow-md">
          {item.title}
        </h3>
      </div>
      <p 
        className="text-sm text-white/60 leading-relaxed font-light whitespace-normal break-words relative z-10 pointer-events-none"
        style={{ transform: "translateZ(20px)" }}
      >
        {item.text}
      </p>
    </motion.div>
  );
}

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const scroll = () => {
      if (!isHovered && !isDragging && scrollRef.current) {
        scrollRef.current.scrollLeft += 1.0; // Auto-scroll speed

        // Endless loop jump
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseLeaveArea = () => {
    setIsHovered(false);
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // scroll speed multiplier
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const highlights = [
    { title: "Project: NeuralWeave", text: "A decentralized learning platform built in 48 hours by a swarm of 50 developers.", icon: IoCodeWorkingOutline, color: "text-[--color-brand-cyan]" },
    { title: "Quantum Release v2.0", text: "The fastest execution engine now open sourced and adopted by 500+ projects.", icon: IoRocketOutline, color: "text-[--color-brand-pink]" },
    { title: "10k Member Milestone", text: "Our ecosystem reached a new level of consciousness with 10k active nodes.", icon: IoPeopleOutline, color: "text-[--color-brand-gold]" },
    { title: "System Calibration", text: "Global node synchrony achieved 99.9% resonance across all active clusters.", icon: IoPlanetOutline, color: "text-[--color-brand-violet]" },
    { title: "Protocol Upgrade", text: "The new resonance protocol reduces peer-to-peer latency by 45%.", icon: IoFlash, color: "text-emerald-400" },
    { title: "Community Grant", text: "$500k distributed to top 10 open-source consciousness initiatives.", icon: IoSparkles, color: "text-[--color-brand-cyan]" },
  ];

  return (
    <main className="relative min-h-screen flex flex-col isolate">

      {/* ===== HERO SECTION ===== */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 pt-20">
        {/* Floating accent lines - kept for structural framing */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-px h-48 bg-gradient-to-b from-[--color-brand-cyan] to-transparent opacity-20 animate-float" />
          <div className="absolute top-40 right-20 w-px h-32 bg-gradient-to-b from-[--color-brand-pink] to-transparent opacity-20 animate-float-delay" />
        </div>

        {/* Hero Content */}
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10 pt-16 pointer-events-none">

          {/* Main Heading */}
          <div className="space-y-4 animate-slide-up animation-delay-500">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
              <span className="inline-block pb-2">
                <span
                  className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] pointer-events-auto"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  ARISE
                </span>
                <span className="text-[--color-brand-pink] font-light">_</span>
                <span
                  className="text-white pointer-events-auto"
                  style={{
                    backgroundImage: "linear-gradient(135deg, var(--color-brand-cyan) 0%, var(--color-brand-violet) 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  osc
                </span>
              </span>
            </h1>

            {/* Context & Status Badges */}
            <div className="flex flex-col items-center justify-center gap-5 pt-4 animate-fade-in animation-delay-700 pointer-events-auto">
              <p className="text-white/60 font-medium tracking-widest text-sm sm:text-base flex items-center gap-2 drop-shadow-md">
                <IoPlanetOutline className="text-[--color-brand-cyan] text-lg" />
                LOCATION: UDUPI (SMVITM)
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-red-500/30 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_5px_#ef4444]" />
                <span className="text-xs font-bold text-red-400 uppercase tracking-widest mt-0.5">Live</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HI-FI MARQUEE HIGHLIGHTS ===== */}
      <section className="relative z-10 py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 text-center animate-slide-up animation-delay-1200">
          <span className="px-4 py-1.5 rounded-full glass-accent text-[--color-brand-cyan] text-[10px] font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(26,229,229,0.1)] inline-block">
            Live Stream
          </span>
          <h2 className="text-3xl font-black text-white tracking-tight mt-4">
            Ecosystem <span className="text-[--color-brand-pink]">Highlights</span>
          </h2>
        </div>

        {/* Marquee Track Container */}
        <div className="relative w-full flex flex-col group py-4 pointer-events-auto animate-fade-in animation-delay-1200">

          {/* Subtle gradient edges to fade out the marquee (Shrunk on mobile) */}
          <div className="absolute inset-y-0 left-0 w-8 md:w-24 lg:w-40 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 md:w-24 lg:w-40 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

          {/* Native scrollable container with JS assisting the infinite auto-pan and cursor dragging */}
          <div
            ref={scrollRef}
            className={`flex overflow-x-auto whitespace-nowrap gap-6 w-full py-12 px-8 touch-pan-x select-none perspective-[1000px] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeaveArea}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleDragMove}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
          >

            {/* Render two identical sets of cards for seamless looping */}
            {[...highlights, ...highlights].map((item, idx) => (
              <InteractiveCard key={idx} item={item} idx={idx} />
            ))}

          </div>
        </div>
      </section>

      {/* Spacer to allow scrolling past marquee smoothly */}
      <div className="h-40" />
    </main>
  );
}
