"use client";

import Link from 'next/link';
import { PageWrapper } from "@/components/PageWrapper";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return (
    <PageWrapper>
      <div className="relative z-10 min-h-screen w-full overflow-x-hidden px-4 pt-28 pb-10 md:px-8 md:pt-32 md:pb-12">
      <div className="mx-auto w-full max-w-5xl">
        <Link 
          href="/projects" 
          className="text-[--color-brand-cyan] hover:text-[--color-brand-pink] transition-colors mb-8 inline-flex items-center gap-2"
        >
          ← Back to Dream Entities
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Project Core */}
          <div className="md:col-span-1">
            <div className="rounded-lg p-6 border border-white/10 bg-linear-to-b from-[--brand-purple]/20 to-[--brand-midnight]/20 backdrop-blur-sm sticky top-8">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-[--color-brand-cyan] to-[--color-brand-pink] mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold">P{params.id}</span>
              </div>
              <h1 className="text-2xl font-bold text-[--foreground] mb-2 text-center">Project {params.id}</h1>
              <div className="mb-6">
                <p className="text-[--foreground] opacity-60 text-sm text-center mb-4">Status: Active Development</p>
                <div className="flex gap-2">
                  <a href="#" className="flex-1 px-3 py-2 rounded-lg bg-[--color-brand-cyan]/10 border border-[--color-brand-cyan] text-[--color-brand-cyan] text-sm font-semibold hover:bg-[--color-brand-cyan]/20 transition-colors text-center">
                    View Repo
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Overview */}
            <div className="rounded-lg p-6 border border-white/10 bg-linear-to-r from-[--brand-purple]/20 to-[--brand-midnight]/20 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-[--foreground] mb-4">Overview</h2>
              <p className="text-[--foreground] opacity-80 leading-relaxed">
                This is Project {params.id} in the ARISE_osc ecosystem. This project demonstrates the inner mind view where users can explore project details, contributors, milestones, and collaboration opportunities.
              </p>
            </div>

            {/* Contributors */}
            <div className="rounded-lg p-6 border border-white/10 bg-linear-to-r from-[--brand-purple]/20 to-[--brand-midnight]/20 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-[--foreground] mb-4">Contributors</h2>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-[--color-brand-cyan] to-[--color-brand-pink]" />
                    <div className="flex-1">
                      <p className="text-[--foreground] font-semibold">Contributor {i}</p>
                      <p className="text-[--foreground] opacity-60 text-sm">12 contributions</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Roadmap */}
            <div className="rounded-lg p-6 border border-white/10 bg-linear-to-r from-[--brand-purple]/20 to-[--brand-midnight]/20 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-[--foreground] mb-4">Roadmap</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <input type="checkbox" checked disabled className="mt-1" />
                  <span className="text-[--foreground] opacity-70 line-through">Phase 1: Foundation</span>
                </div>
                <div className="flex items-start gap-3">
                  <input type="checkbox" checked disabled className="mt-1" />
                  <span className="text-[--foreground] opacity-90">Phase 2: Core Features</span>
                </div>
                <div className="flex items-start gap-3">
                  <input type="checkbox" disabled className="mt-1" />
                  <span className="text-[--foreground] opacity-70">Phase 3: Community Launch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </PageWrapper>
  );
}
