"use client";

import Link from 'next/link';
import { PageWrapper } from "@/components/PageWrapper";

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  // In a real implementation, fetch article content based on slug
  const articles: Record<string, { 
    title: string; 
    date: string; 
    readingTime: number;
    category: string;
    content: string;
    excerpt: string;
    color: "cyan" | "pink" | "gold" | "purple";
  }> = {
    awakening: {
      title: 'The Awakening: Vision for ARISE OSC',
      date: 'March 15, 2026',
      readingTime: 8,
      category: 'Vision',
      color: 'cyan',
      excerpt: 'Understanding the consciousness-driven design philosophy behind our ecosystem.',
      content: 'The ARISE_osc project represents a fundamental shift in how we think about community-driven open source ecosystems. Rather than presenting information as a static website, we create a living, breathing environment that responds to user interaction and engagement...',
    },
    lucidity: {
      title: 'Lucidity in User Experience',
      date: 'February 28, 2026',
      readingTime: 12,
      category: 'Design',
      color: 'pink',
      excerpt: 'How users progress from dream awareness to lucid control of the interface.',
      content: 'Our Lucidity System tracks user engagement and adjusts the interface accordingly. As users explore and interact, the interface becomes clearer, more organized, and more responsive. This mirrors the real-world experience of becoming lucid in a dream...',
    },
    ecosystem: {
      title: 'Building the Dream Ecosystem',
      date: 'January 30, 2026',
      readingTime: 15,
      category: 'Technical',
      color: 'gold',
      excerpt: 'Technical insights into our decentralized, multi-page architecture.',
      content: 'The technical foundation of ARISE_osc combines modern web technologies with a focus on immersive experience. We use Three.js for the persistent world layer, React for component management, and Next.js for seamless routing...',
    },
  };

  const article = articles[params.slug] || articles.awakening;

  const colorMap = {
    cyan: {
      accent: "text-[--color-brand-cyan]",
      gloss: "from-[--color-brand-cyan]/20 to-transparent",
    },
    pink: {
      accent: "text-[--color-brand-pink]",
      gloss: "from-[--color-brand-pink]/20 to-transparent",
    },
    gold: {
      accent: "text-[--color-brand-gold]",
      gloss: "from-[--color-brand-gold]/20 to-transparent",
    },
    purple: {
      accent: "text-[--brand-purple]",
      gloss: "from-[--brand-purple]/20 to-transparent",
    },
  };

  const colors = colorMap[article.color];

  return (
    <PageWrapper>
      <div className="relative z-10 min-h-screen w-full overflow-x-hidden px-4 pt-28 pb-10 md:px-8 md:pt-32 md:pb-12">
      <div className="mx-auto w-full max-w-3xl">
        {/* Back link */}
        <Link 
          href="/blog" 
          className="text-[--color-brand-cyan] hover:text-[--color-brand-pink] transition-colors mb-10 inline-flex items-center gap-2 font-semibold"
        >
          ← Back to Knowledge Orbs
        </Link>

        {/* Article Header */}
        <div className={`pb-8 border-b border-white/10 mb-10`}>
          <div className="space-y-3 mb-6">
            {/* Category badge */}
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${colors.accent} bg-white/5 border border-white/10`}>
              {article.category}
            </div>
            
            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-transparent bg-clip-text bg-linear-to-r from-[--color-brand-cyan] to-[--color-brand-pink]">
              {article.title}
            </h1>

            {/* Metadata row */}
            <div className="flex items-center gap-4 text-sm text-[--foreground] opacity-70 flex-wrap">
              <span>📅 {article.date}</span>
              <span>•</span>
              <span>📖 {article.readingTime} minute read</span>
            </div>
          </div>

          {/* Excerpt */}
          <p className="text-xl text-[--foreground] opacity-80 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Article Card Container */}
        <article className={`rounded-2xl p-8 md:p-10 border border-white/10 bg-linear-to-br ${colors.gloss} backdrop-blur-sm bg-white/5 space-y-8`}>
          {/* Main content */}
          <div className="prose prose-invert max-w-none">
            <div className="space-y-6">
              <p className="text-lg text-[--foreground] opacity-90 leading-relaxed font-light">
                {article.content}
              </p>
              
              <p className="text-base text-[--foreground] opacity-80 leading-relaxed">
                This is a placeholder article demonstrating the knowledge orb structure and immersive reading experience. In a full implementation, articles would be loaded from a database or CMS, featuring rich formatting, code blocks, images, and interactive elements that maintain the dreamlike aesthetic throughout the reading journey.
              </p>

              {/* Key insight box */}
              <div className={`p-6 rounded-xl border-l-4 ${colors.accent} bg-white/5 border border-white/10 space-y-2`}>
                <p className={`font-bold ${colors.accent} uppercase text-sm tracking-widest`}>Key Insight</p>
                <p className="text-[--foreground] opacity-90">
                  The most important realization is that immersive design and functional clarity are not mutually exclusive. Both can coexist when thoughtfully integrated into the user experience.
                </p>
              </div>

              <p className="text-base text-[--foreground] opacity-80 leading-relaxed">
                As we continue building this ecosystem, these principles guide every decision. We remain committed to creating interfaces that feel alive, responsive, and genuinely human—interfaces that don't just process information, but invite exploration and foster connection.
              </p>
            </div>
          </div>

          {/* Footer with metadata */}
          <div className="pt-8 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-1">
                <p className="text-xs text-[--foreground] opacity-60 uppercase tracking-widest">Reading Time</p>
                <p className="text-lg font-bold text-[--foreground]">{article.readingTime} minutes</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-[--foreground] opacity-60 uppercase tracking-widest">Category</p>
                <p className={`text-lg font-bold ${colors.accent}`}>{article.category}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-[--foreground] opacity-60 uppercase tracking-widest">Published</p>
                <p className="text-lg font-bold text-[--foreground]">{article.date}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Link
                href="/blog"
                className="inline-block px-6 py-3 rounded-lg border border-[--color-brand-cyan] text-[--color-brand-cyan] font-semibold uppercase tracking-wide hover:bg-[--color-brand-cyan]/10 hover:shadow-[0_0_20px_rgba(26,229,229,0.3)] transition-all duration-300"
              >
                Explore More Knowledge Orbs →
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
    </PageWrapper>
  );
}
