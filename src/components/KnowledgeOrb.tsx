"use client";

import Link from "next/link";
import { useState } from "react";

interface KnowledgeOrbProps {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  category: "vision" | "technical" | "community" | "design";
  color: "cyan" | "pink" | "gold" | "purple";
}

const colorMap = {
  cyan: {
    bg: "from-[--color-brand-cyan]/15 to-transparent",
    text: "text-[--color-brand-cyan]",
    glow: "hover:shadow-[0_0_40px_rgba(26,229,229,0.3)]",
    border: "border-[--color-brand-cyan]/20 hover:border-[--color-brand-cyan]/50",
    icon: "🧠",
  },
  pink: {
    bg: "from-[--color-brand-pink]/15 to-transparent",
    text: "text-[--color-brand-pink]",
    glow: "hover:shadow-[0_0_40px_rgba(217,79,214,0.3)]",
    border: "border-[--color-brand-pink]/20 hover:border-[--color-brand-pink]/50",
    icon: "💫",
  },
  gold: {
    bg: "from-[--color-brand-gold]/15 to-transparent",
    text: "text-[--color-brand-gold]",
    glow: "hover:shadow-[0_0_40px_rgba(235,177,52,0.3)]",
    border: "border-[--color-brand-gold]/20 hover:border-[--color-brand-gold]/50",
    icon: "✨",
  },
  purple: {
    bg: "from-[--brand-purple]/15 to-transparent",
    text: "text-[--brand-purple]",
    glow: "hover:shadow-[0_0_40px_rgba(42,15,74,0.3)]",
    border: "border-[--brand-purple]/20 hover:border-[--brand-purple]/50",
    icon: "🌀",
  },
};

const categoryLabel = {
  vision: "Vision",
  technical: "Technical",
  community: "Community",
  design: "Design",
};

export function KnowledgeOrb({
  id,
  slug,
  title,
  excerpt,
  date,
  readingTime,
  category,
  color,
}: KnowledgeOrbProps) {
  const [isHovered, setIsHovered] = useState(false);
  const colors = colorMap[color];

  return (
    <Link href={`/blog/${slug}`}>
      <div
        className={`relative group cursor-pointer h-72 rounded-2xl border backdrop-blur-sm transition-all duration-500 ${colors.border} ${colors.glow} overflow-hidden`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient background with orb effect */}
        <div
          className={`absolute inset-0 bg-linear-to-br ${colors.bg} opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Animated orb glow (center-bottom) */}
        <div
          className={`absolute -bottom-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full ${colors.bg} blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col p-6 text-[--foreground]">
          {/* Icon and category */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{colors.icon}</span>
            <span className={`text-xs font-bold uppercase tracking-widest ${colors.text}`}>
              {categoryLabel[category]}
            </span>
          </div>

          {/* Title */}
          <h3 className={`text-xl font-bold leading-tight mb-3 line-clamp-2 ${colors.text}`}>
            {title}
          </h3>

          {/* Excerpt - expands on hover */}
          <p
            className={`flex-1 text-sm text-[--foreground] opacity-70 leading-relaxed line-clamp-3 transition-all duration-500 ${
              isHovered ? "opacity-90" : "opacity-70"
            }`}
          >
            {excerpt}
          </p>

          {/* Footer metadata */}
          <div className="space-y-3 mt-auto pt-3 border-t border-white/10">
            {/* Reading time and date */}
            <div className="flex items-center justify-between text-xs text-[--foreground] opacity-60">
              <span>📖 {readingTime} min read</span>
              <span>{date}</span>
            </div>

            {/* Read more indicator */}
            <div
              className={`flex items-center gap-1 transition-all duration-500 ${
                isHovered ? "opacity-100 translate-x-0" : "opacity-60 -translate-x-1"
              }`}
            >
              <span className={`text-sm font-bold ${colors.text}`}>Read insight</span>
              <span className={`text-sm ${colors.text}`}>→</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
