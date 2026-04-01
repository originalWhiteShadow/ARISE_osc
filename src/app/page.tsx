import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center relative z-10 w-full font-sans">
      
      {/* Hero Section */}
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[--color-brand-cyan] to-[--color-brand-pink] mb-6 drop-shadow-[0_0_15px_rgba(26,229,229,0.3)] animate-pulse" style={{ animationDuration: '4s' }}>
        We are building a living <br /> open-source dream world.
      </h1>
      
      <p className="text-xl md:text-2xl text-[--foreground] opacity-80 max-w-2xl mb-12 font-light">
        A conscious ecosystem where projects, ideas, and people connect through lucid control.
      </p>

      {/* Entry Portal CTA */}
      <Link 
        href="/ecosystem" 
        className="group relative px-8 py-4 rounded-full overflow-hidden transition-all duration-700 hover:scale-105"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[--color-brand-purple] to-[--color-brand-midnight] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[--color-brand-pink] to-[--color-brand-cyan] opacity-0 group-hover:opacity-30 transition-opacity duration-700 blur" />
        <div className="absolute inset-0 border border-white/10 group-hover:border-white/30 rounded-full transition-colors duration-700" />
        <span className="relative z-10 text-lg font-medium tracking-widest uppercase flex items-center gap-2">
          Enter the Dream
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
      </Link>

      {/* Live Signals / Atmospheric presence indicator */}
      <div className="absolute bottom-12 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-1000">
        <div className="w-2 h-2 rounded-full bg-[--color-brand-cyan] animate-ping" />
        <span className="text-xs uppercase tracking-widest">Ecosystem Active</span>
      </div>

    </div>
  );
}
