"use client";

import Link from 'next/link';
import { PageWrapper } from "@/components/PageWrapper";
import { KnowledgeOrb } from "@/components/KnowledgeOrb";
import { useState } from "react";

export default function BlogPage() {
  const [categoryFilter, setCategoryFilter] = useState<"all" | "vision" | "technical" | "community" | "design">("all");

  const articles = [
    {
      id: 1,
      slug: 'awakening',
      title: 'The Awakening: Vision for ARISE OSC',
      excerpt: 'Understanding the consciousness-driven design philosophy behind our ecosystem and how it shapes every interaction.',
      date: 'March 2026',
      readingTime: 8,
      category: "vision" as const,
      color: "cyan" as const,
    },
    {
      id: 2,
      slug: 'lucidity',
      title: 'Lucidity in User Experience',
      excerpt: 'How users progress from dream awareness to lucid control of the interface. A deep dive into progressive disclosure.',
      date: 'February 2026',
      readingTime: 12,
      category: "design" as const,
      color: "pink" as const,
    },
    {
      id: 3,
      slug: 'ecosystem',
      title: 'Building the Dream Ecosystem',
      excerpt: 'Technical insights into our decentralized, multi-page architecture and the reasoning behind every stack choice.',
      date: 'January 2026',
      readingTime: 15,
      category: "technical" as const,
      color: "gold" as const,
    },
    {
      id: 4,
      slug: 'community-first',
      title: 'Community-First Development',
      excerpt: 'How we empower contributors at every level and foster collaborative growth within the open-source ecosystem.',
      date: 'December 2025',
      readingTime: 10,
      category: "community" as const,
      color: "purple" as const,
    },
    {
      id: 5,
      slug: 'three-js-dreams',
      title: 'Three.js: Creating Dream Renders',
      excerpt: 'Technical exploration of Three.js particles, shaders, and lighting to build the immersive visual layer.',
      date: 'November 2025',
      readingTime: 18,
      category: "technical" as const,
      color: "cyan" as const,
    },
    {
      id: 6,
      slug: 'lucidity-metrics',
      title: 'Measuring Lucidity: UX Metrics that Matter',
      excerpt: 'How we define and track user progression toward lucid control through meaningful, non-invasive analytics.',
      date: 'October 2025',
      readingTime: 11,
      category: "design" as const,
      color: "pink" as const,
    },
  ];

  const filteredArticles =
    categoryFilter === "all"
      ? articles
      : articles.filter((a) => a.category === categoryFilter);

  const categoryColors = {
    all: "from-[--color-brand-cyan] to-[--color-brand-pink]",
    vision: "from-[--color-brand-cyan] to-[--color-brand-gold]",
    technical: "from-[--color-brand-gold] to-[--color-brand-cyan]",
    community: "from-[--color-brand-pink] to-[--color-brand-cyan]",
    design: "from-[--color-brand-pink] to-[--color-brand-gold]",
  };

  return (
    <PageWrapper>
      <div className="relative z-10 min-h-screen w-full overflow-x-hidden px-4 pt-28 pb-10 md:px-8 md:pt-32 md:pb-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-12">
          <h1 className={`text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r ${categoryColors[categoryFilter]} mb-4 text-center`}>
            Knowledge Orbs
          </h1>
          <p className="text-xl text-[--foreground] opacity-70 max-w-2xl mb-10 text-center mx-auto">
            Insights, reflections, and deep dives into the ARISE_osc universe. Explore our collective consciousness.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 p-5 rounded-xl border border-white/10 bg-linear-to-r from-[--brand-purple]/10 to-[--brand-midnight]/10 backdrop-blur-sm">
            {(["all", "vision", "technical", "community", "design"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-lg font-semibold uppercase text-xs tracking-wide transition-all duration-300 capitalize ${
                  categoryFilter === cat
                    ? "bg-linear-to-r from-[--color-brand-cyan]/30 to-[--color-brand-pink]/30 border border-[--color-brand-cyan]/60 text-[--color-brand-cyan] shadow-[0_0_20px_rgba(26,229,229,0.3)]"
                    : "border border-white/20 text-[--foreground] opacity-60 hover:opacity-100 hover:border-white/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Knowledge Orb Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
          {filteredArticles.map((article) => (
            <KnowledgeOrb key={article.id} {...article} />
          ))}
        </div>

        {/* Empty state */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[--foreground] opacity-60">
              No knowledge orbs in this category yet. Check back soon.
            </p>
          </div>
        )}
      </div>
    </div>
    </PageWrapper>
  );
}
