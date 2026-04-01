"use client";

import { PageWrapper } from "@/components/PageWrapper";
import { EcosystemVisualization } from "@/components/EcosystemVisualization";

export default function EcosystemPage() {
  return (
    <PageWrapper>
      <div className="relative z-10 min-h-screen w-full overflow-x-hidden px-4 py-10 md:px-8 md:py-12">
        <div className="mx-auto w-full max-w-6xl">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[--color-brand-cyan] to-[--color-brand-pink] mb-6 text-center">
            The Universe
          </h1>
          <p className="text-xl text-[--foreground] opacity-70 max-w-2xl mb-12 text-center mx-auto">
            Network visualization of all clusters, roles, and connections within the dream ecosystem. Hover to explore, click to inspect.
          </p>

          <EcosystemVisualization />

          <div className="mt-8 p-6 rounded-lg border border-white/10 bg-linear-to-r from-[--brand-purple]/20 to-[--brand-midnight]/20 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-[--foreground] mb-3">About This Ecosystem</h2>
            <p className="text-[--foreground] opacity-70 text-sm leading-relaxed">
              This is a living map of the ARISE_osc ecosystem. Projects (cyan orbs) represent active initiatives, contributors (green nodes) show active participants, and ideas (purple nodes) represent emerging concepts. Lines indicate active collaborations and dependencies.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
