"use client";

import Link from 'next/link';
import { PageWrapper } from "@/components/PageWrapper";

export default function AuthPage() {
  return (
    <PageWrapper>
      <div className="relative z-10 min-h-screen w-full overflow-x-hidden px-4 py-10 md:px-8 md:py-12 flex items-center">
      <div className="mx-auto w-full max-w-md">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[--color-brand-cyan] to-[--color-brand-pink] mb-2 text-center">
          Portal
        </h1>
        <p className="text-center text-[--foreground] opacity-60 mb-8">
          Enter the dream or create a new consciousness
        </p>

        <div className="rounded-lg p-8 border border-white/10 bg-linear-to-b from-[--brand-purple]/30 to-[--brand-midnight]/30 backdrop-blur-sm space-y-6">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[--foreground] mb-2">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-2 rounded-lg bg-[--brand-midnight]/50 border border-white/10 text-[--foreground] focus:border-[--color-brand-cyan] focus:outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[--foreground] mb-2">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-2 rounded-lg bg-[--brand-midnight]/50 border border-white/10 text-[--foreground] focus:border-[--color-brand-cyan] focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button className="w-full py-3 rounded-lg bg-linear-to-r from-[--color-brand-cyan]/20 to-[--color-brand-pink]/20 border border-[--color-brand-cyan] text-[--color-brand-cyan] font-semibold hover:shadow-[0_0_20px_rgba(26,229,229,0.3)] transition-all duration-500">
              Enter
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[--brand-midnight]/30 text-[--foreground] opacity-60">or</span>
            </div>
          </div>

          <button className="w-full py-3 rounded-lg bg-linear-to-r from-[--color-brand-pink]/20 to-[--color-brand-gold]/20 border border-[--color-brand-pink] text-[--color-brand-pink] font-semibold hover:shadow-[0_0_20px_rgba(217,79,214,0.3)] transition-all duration-500">
            Create Consciousness
          </button>
        </div>

        <p className="text-center text-sm text-[--foreground] opacity-60 mt-6">
          Already awakened? <Link href="/" className="text-[--color-brand-cyan] hover:text-[--color-brand-pink] transition-colors">Return to dream</Link>
        </p>
      </div>
    </div>
    </PageWrapper>
  );
}
