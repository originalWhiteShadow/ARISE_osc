"use client";

import Link from "next/link";
import { 
  IoArrowForwardOutline,
  IoFlash,
  IoCodeWorkingOutline,
  IoCheckmarkCircle,
  IoInfinite,
  IoPlanetOutline,
  IoSparkles,
  IoRocketOutline,
  IoPeopleOutline
} from "react-icons/io5";
import { InteractiveAurora } from "@/components/world/InteractiveAurora";
import { Meteors } from "@/components/world/Meteors";

export default function Home() {
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
      {/* Background Layer - Fixed and Continuous */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <InteractiveAurora />

        {/* Subtle moving meteor shower */}
        <Meteors />
      </div>

      {/* ===== HERO SECTION ===== */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 md:p-10">
        {/* Floating accent lines - kept for structural framing */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-px h-48 bg-gradient-to-b from-[--color-brand-cyan] to-transparent opacity-20 animate-float" />
          <div className="absolute top-40 right-20 w-px h-32 bg-gradient-to-b from-[--color-brand-pink] to-transparent opacity-20 animate-float-delay" />
        </div>

        {/* Hero Content */}
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10 pt-16 pointer-events-none">

          {/* Main Heading */}
          <div className="space-y-4 animate-slide-up animation-delay-500">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
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
          </div>

          {/* CTA Buttons - High Visibility */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-slide-up animation-delay-1000 pointer-events-auto relative z-20">
            <Link
              href="/ecosystem"
              className="group relative px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm text-black bg-white hover:bg-gray-200 shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span className="relative z-10">Enter Ecosystem</span>
              <IoArrowForwardOutline className="text-lg group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
            </Link>
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
          
          {/* Subtle gradient edges to fade out the marquee */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

          {/* Wrapping container for the infinite loop */}
          <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap gap-6 w-max">
            
            {/* Render two identical sets of cards for seamless looping */}
            {[...highlights, ...highlights].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className="relative glass w-72 md:w-96 p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-500 shrink-0 flex flex-col cursor-pointer hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(26,229,229,0.1)]"
                >
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />

                  <div className="flex items-center gap-4 mb-4 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center transition-transform duration-500 shrink-0 shadow-inner">
                      <Icon className={`text-2xl ${item.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-white leading-tight tracking-tight whitespace-normal break-words">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed font-light whitespace-normal break-words relative z-10">
                    {item.text}
                  </p>
                </div>
              );
            })}
            
          </div>
        </div>
      </section>
      
      {/* Spacer to allow scrolling past marquee smoothly */}
      <div className="h-40" />
    </main>
  );
}
