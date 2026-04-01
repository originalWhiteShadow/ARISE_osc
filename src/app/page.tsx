"use client";

import Link from "next/link";
import { 
  IoSparkles, 
  IoRocketOutline, 
  IoPeopleOutline,
  IoFlame,
  IoArrowForwardOutline,
  IoFlash,
  IoCheckmarkCircle,
  IoInfinite,
  IoPlanetOutline,
  IoCodeWorkingOutline
} from "react-icons/io5";
import { InteractiveAurora } from "@/components/world/InteractiveAurora";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden isolate">
      {/* ===== HERO SECTION ===== */}
      <section className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center p-6 md:p-10 overflow-hidden">
        {/* Interactive Space and 3D Blob Background */}
        <InteractiveAurora />

        {/* Floating accent lines - kept for structural framing */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-px h-48 bg-gradient-to-b from-[--color-brand-cyan] to-transparent opacity-20 animate-float" />
          <div className="absolute top-40 right-20 w-px h-32 bg-gradient-to-b from-[--color-brand-pink] to-transparent opacity-20 animate-float-delay" />
        </div>

        {/* Hero Content */}
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10 pt-16 pointer-events-none">
          {/* Brand Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 glass-accent shadow-[0_0_20px_rgba(26,229,229,0.1)] hover:border-white/20 transition-all duration-500 animate-fade-in pointer-events-auto cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-[--color-brand-cyan] animate-pulse-subtle shadow-[0_0_8px_var(--color-brand-cyan)]" />
            <span className="text-[10px] font-bold text-white uppercase tracking-[0.15em] transition-colors">
              The Conscious OS is Live
            </span>
          </div>

          {/* Main Heading - Scaled down for better balance */}
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

          {/* Subheading */}
          <div className="space-y-4 max-w-3xl mx-auto animate-slide-up animation-delay-700 pointer-events-auto">
            <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed tracking-tight">
              A collective intelligence engine where{" "}
              <span className="font-semibold text-white">projects</span>,{" "}
              <span className="font-semibold text-white">ideas</span>, and{" "}
              <span className="font-semibold text-white">people</span> evolve together.
            </p>
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
            
            <Link
              href="/projects"
              className="group relative px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm text-black bg-[--color-brand-cyan] hover:bg-cyan-300 shadow-[0_0_30px_rgba(26,229,229,0.4)] transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <IoPlanetOutline className="text-lg text-black group-hover:rotate-12 transition-transform duration-300" />
              <span>Explore Projects</span>
            </Link>
          </div>

          {/* Stats Grid - Tighter glass cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-16 pb-8 animate-slide-up animation-delay-1200 pointer-events-auto">
            {[
              { icon: IoCodeWorkingOutline, label: "Projects Alive", value: "2,400+", color: "text-[--color-brand-cyan]" },
              { icon: IoPeopleOutline, label: "Conscious Creators", value: "11k+", color: "text-[--color-brand-pink]" },
              { icon: IoInfinite, label: "Evolution Cycles", value: "∞", color: "text-[--color-brand-gold]" },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-xl glass p-4 hover:-translate-y-1 transition-transform duration-500 border border-white/5"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[--color-brand-cyan]/5 to-[--color-brand-pink]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-white/5 border border-white/5 ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                      <Icon className="text-xl" />
                    </div>
                    <div className="text-left space-y-0.5">
                      <p className="text-xl font-black text-white tracking-tight">{stat.value}</p>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">{stat.label}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="relative z-10 py-20 px-6 md:px-12 border-t border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
            <span className="px-4 py-1.5 rounded-full glass-accent text-[--color-brand-cyan] text-[10px] font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(26,229,229,0.1)] inline-block">
              Architecture of Tomorrow
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Built for <br/>
              <span
                className="text-transparent inline-block mt-1"
                style={{
                  backgroundImage: "linear-gradient(135deg, var(--color-brand-cyan) 0%, var(--color-brand-pink) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                Resonance
              </span>
            </h2>
            <p className="text-base text-white/60 font-light leading-relaxed">
              ARISE isn&apos;t just another platform. It&apos;s a living, breathing ecosystem designed to amplify human creativity and collective intelligence.
            </p>
          </div>

          {/* Feature Cards - Properly Scaled */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: IoSparkles,
                title: "Lucid Interfaces",
                description: "Experience code and collaboration through an immersive, distraction-free environment that adapts to your mental state.",
                color: "text-[--color-brand-cyan]",
                gradient: "from-[--color-brand-cyan] to-blue-500"
              },
              {
                icon: IoRocketOutline,
                title: "Quantum Scaling",
                description: "Built on absolute cutting-edge technology. Zero-latency interactions, instant project spawning, and infinite scale.",
                color: "text-[--color-brand-pink]",
                gradient: "from-[--color-brand-pink] to-purple-500"
              },
              {
                icon: IoPeopleOutline,
                title: "Swarm Intelligence",
                description: "Connections are made dynamically. Find the right collaborators for your projects at the exact moment you need them.",
                color: "text-[--color-brand-gold]",
                gradient: "from-[--color-brand-gold] to-orange-500"
              },
              {
                icon: IoFlame,
                title: "Absolute Freedom",
                description: "100% open-source core. No lock-in, no paywalls. Own your data, own your code, own your digital destiny.",
                color: "text-red-400",
                gradient: "from-red-400 to-rose-600"
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl glass p-8 hover:border-white/20 transition-all duration-700"
                >
                  <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${feature.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
                  
                  {/* Inner glow on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700`} />

                  <div className="relative space-y-4">
                    <div className="inline-flex p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                      <Icon className={`text-3xl ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">{feature.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed font-light">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative z-10 py-20 px-6 md:px-12 overflow-hidden border-t border-white/5 bg-black/60">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="relative group rounded-3xl overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[--color-brand-cyan]/10 via-[--color-brand-pink]/10 to-[--color-brand-violet]/10 opacity-50 blur-3xl animate-pulse-subtle" />
            
            {/* Glass Card */}
            <div className="relative glass p-10 md:p-16 border border-white/10 text-center space-y-8 group-hover:border-white/20 transition-colors duration-500">
              <div className="space-y-4 max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                  Ready to Awaken?
                </h2>
                <p className="text-lg text-white/70 font-light">
                  Join the most advanced conscious developer community on the planet.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-20">
                <Link
                  href="/ecosystem"
                  className="px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm text-black bg-white hover:bg-gray-200 transition-colors duration-300 shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2 hover:scale-105"
                >
                  <span>Initialize Connection</span>
                  <IoFlash className="text-lg text-[--color-brand-cyan]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
