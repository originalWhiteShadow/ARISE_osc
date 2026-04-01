"use client";

import { PageWrapper } from "@/components/PageWrapper";

export default function IdeasPage() {
  const ideas = [
    { id: 1, title: 'Modular Architecture', description: 'Proposal to restructure core components for better scalability' },
    { id: 2, title: 'Real-time Sync', description: 'Implement live data synchronization across all ecosystem nodes' },
    { id: 3, title: 'Accessibility Layer', description: 'Enhanced accessibility features and keyboard navigation' },
  ];

  return (
    <PageWrapper>
      <div className="relative z-10 min-h-screen w-full overflow-x-hidden px-4 pt-28 pb-10 md:px-8 md:pt-32 md:pb-12">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[--color-brand-pink] to-[--color-brand-cyan] mb-6 text-center">
          Idea Seeds
        </h1>
        <p className="text-xl text-[--foreground] opacity-70 max-w-2xl mb-12 text-center mx-auto">
          Incubation chamber for new concepts and proposals.
        </p>

        <div className="space-y-4">
          {ideas.map((idea) => (
            <div 
              key={idea.id}
              className="rounded-lg p-6 border border-white/10 bg-linear-to-r from-[--brand-purple]/20 to-[--brand-midnight]/20 backdrop-blur-sm hover:border-[--color-brand-gold]/50 transition-all duration-500 flex items-center justify-between"
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[--foreground] mb-2">{idea.title}</h3>
                <p className="text-[--foreground] opacity-60 text-sm">{idea.description}</p>
              </div>
              <button className="ml-4 px-4 py-2 rounded-lg border border-[--color-brand-gold] text-[--color-brand-gold] hover:bg-[--color-brand-gold]/10 transition-all duration-300 whitespace-nowrap">
                Cultivate
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </PageWrapper>
  );
}
