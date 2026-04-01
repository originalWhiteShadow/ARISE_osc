"use client";

import Link from 'next/link';
import { PageWrapper } from "@/components/PageWrapper";

export default function ProfilePage({ params }: { params: { id: string } }) {
  return (
    <PageWrapper>
      <div className="relative z-10 min-h-screen w-full overflow-x-hidden px-4 pt-28 pb-10 md:px-8 md:pt-32 md:pb-12">
      <div className="mx-auto w-full max-w-4xl">
        <Link 
          href="/" 
          className="text-[--color-brand-cyan] hover:text-[--color-brand-pink] transition-colors mb-8 inline-flex items-center gap-2"
        >
          ← Return to dream
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Header */}
          <div className="md:col-span-1">
            <div className="rounded-lg p-6 border border-white/10 bg-linear-to-b from-[--brand-purple]/20 to-[--brand-midnight]/20 backdrop-blur-sm text-center">
              <div className="w-24 h-24 rounded-full bg-linear-to-br from-[--color-brand-cyan] to-[--color-brand-pink] mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl font-bold">U{params.id}</span>
              </div>
              <h1 className="text-2xl font-bold text-[--foreground] mb-2">User {params.id}</h1>
              <p className="text-[--foreground] opacity-60 text-sm mb-4">Consciousness Tier: Aware</p>
              <div className="flex gap-2 justify-center">
                <button className="px-4 py-2 rounded-lg bg-[--color-brand-cyan]/10 border border-[--color-brand-cyan] text-[--color-brand-cyan] text-sm font-semibold hover:bg-[--color-brand-cyan]/20 transition-colors">
                  Follow
                </button>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="md:col-span-2">
            <div className="space-y-6">
              {/* Activity */}
            <div className="rounded-lg p-6 border border-white/10 bg-linear-to-r from-[--brand-purple]/20 to-[--brand-midnight]/20 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-[--foreground] mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  <div className="text-[--foreground] opacity-70 text-sm">• Contributed to Project Alpha</div>
                  <div className="text-[--foreground] opacity-70 text-sm">• Proposed new Idea Seed</div>
                  <div className="text-[--foreground] opacity-70 text-sm">• Reviewed 3 community discussions</div>
                </div>
              </div>

              {/* Skills */}
            <div className="rounded-lg p-6 border border-white/10 bg-linear-to-r from-[--brand-purple]/20 to-[--brand-midnight]/20 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-[--foreground] mb-4">Consciousness Nodes</h2>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'TypeScript', 'Three.js', 'Design'].map((skill) => (
                    <span key={skill} className="px-3 py-1 rounded-full bg-[--color-brand-cyan]/10 border border-[--color-brand-cyan] text-[--color-brand-cyan] text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contributions */}
            <div className="rounded-lg p-6 border border-white/10 bg-linear-to-r from-[--brand-purple]/20 to-[--brand-midnight]/20 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-[--foreground] mb-4">Contribution Stats</h2>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[--color-brand-cyan]">42</div>
                    <p className="text-[--foreground] opacity-60 text-sm">Commits</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[--color-brand-pink]">8</div>
                    <p className="text-[--foreground] opacity-60 text-sm">Projects</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[--color-brand-gold]">156</div>
                    <p className="text-[--foreground] opacity-60 text-sm">Days Active</p>
                  </div>
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
