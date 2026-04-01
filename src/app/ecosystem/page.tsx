"use client";

import { PageWrapper } from "@/components/PageWrapper";
import { EcosystemVisualization } from "@/components/EcosystemVisualization";

export default function EcosystemPage() {
  return (
    <PageWrapper>
      <div className="relative z-10 min-h-screen w-full overflow-x-hidden px-4 pt-28 pb-10 md:px-8 md:pt-32 md:pb-12">
        <div className="mx-auto w-full max-w-6xl">
          {/* Header Card */}
          <div className="glass border border-white/10 p-8 rounded-2xl shadow-2xl mb-12 max-w-3xl mx-auto text-center backdrop-blur-xl">
            <h1 className="text-5xl md:text-6xl font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] mb-4 tracking-tight">
              The Universe
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto">
              Network visualization of all clusters, roles, and connections within the dream ecosystem. Hover to explore, click to inspect.
            </p>
          </div>

          <EcosystemVisualization />

          <div className="mt-8 p-6 rounded-lg border border-white/10 glass shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-3 tracking-wide">About This Ecosystem</h2>
            <p className="text-white/80 text-sm leading-relaxed font-medium">
              This is a living map of the ARISE_osc ecosystem. Projects (cyan orbs) represent active initiatives, contributors (green nodes) show active participants, and ideas (purple nodes) represent emerging concepts. Lines indicate active collaborations and dependencies.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
