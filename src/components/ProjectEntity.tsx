"use client";

import Link from "next/link";
import { useState } from "react";

interface ProjectEntityProps {
  id: number;
  title: string;
  description: string;
  status: "planning" | "active" | "complete";
  contributors: number;
  tags: string[];
  color: "cyan" | "pink" | "gold" | "purple";
}

const colorMap = {
  cyan: {
    bg: "from-[--color-brand-cyan]/20 to-[--color-brand-cyan]/10",
    text: "text-[--color-brand-cyan]",
    glow: "hover:shadow-[0_0_30px_rgba(26,229,229,0.4)]",
    border: "border-[--color-brand-cyan]/30 hover:border-[--color-brand-cyan]/60",
  },
  pink: {
    bg: "from-[--color-brand-pink]/20 to-[--color-brand-pink]/10",
    text: "text-[--color-brand-pink]",
    glow: "hover:shadow-[0_0_30px_rgba(217,79,214,0.4)]",
    border: "border-[--color-brand-pink]/30 hover:border-[--color-brand-pink]/60",
  },
  gold: {
    bg: "from-[--color-brand-gold]/20 to-[--color-brand-gold]/10",
    text: "text-[--color-brand-gold]",
    glow: "hover:shadow-[0_0_30px_rgba(235,177,52,0.4)]",
    border: "border-[--color-brand-gold]/30 hover:border-[--color-brand-gold]/60",
  },
  purple: {
    bg: "from-[--brand-purple]/20 to-[--brand-purple]/10",
    text: "text-[--brand-purple]",
    glow: "hover:shadow-[0_0_30px_rgba(42,15,74,0.4)]",
    border: "border-[--brand-purple]/30 hover:border-[--brand-purple]/60",
  },
};

const statusMap = {
  planning: { label: "Planning", dot: "bg-[--color-brand-gold]" },
  active: { label: "Active", dot: "bg-[--color-brand-cyan]" },
  complete: { label: "Complete", dot: "bg-[--color-brand-pink]" },
};

export function ProjectEntity({
  id,
  title,
  description,
  status,
  contributors,
  tags,
  color,
}: ProjectEntityProps) {
  const [isHovered, setIsHovered] = useState(false);
  const colors = colorMap[color];
  const statusInfo = statusMap[status];

  return (
    <Link href={`/project/${id}`}>
      <div
        className={`relative group cursor-pointer h-64 rounded-2xl border backdrop-blur-sm transition-all duration-500 ${colors.border} ${colors.glow} overflow-hidden`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient background */}
        <div
          className={`absolute inset-0 bg-linear-to-br ${colors.bg} opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Animated blob accent (top-right) */}
        <div
          className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${colors.bg} blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500`}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col p-6 text-[--foreground]">
          {/* Header with status */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className={`text-lg font-bold ${colors.text} leading-tight mb-1`}>
                {title}
              </h3>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${statusInfo.dot}`} />
                <span className="text-xs text-[--foreground] opacity-60">
                  {statusInfo.label}
                </span>
              </div>
            </div>
          </div>

          {/* Description - visible on hover */}
          <div
            className={`flex-1 overflow-hidden transition-all duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-sm text-[--foreground] opacity-70 leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>

          {/* Footer: contributors and tags */}
          <div className="space-y-2 mt-auto">
            {/* Contributor count */}
            <div className="flex items-center gap-2 text-xs">
              <span className={`${colors.text}`}>👥</span>
              <span className="text-[--foreground] opacity-70">
                {contributors} contributor{contributors !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Tags - preview on hover */}
            <div
              className={`flex flex-wrap gap-1 transition-all duration-500 ${
                isHovered ? "opacity-100" : "opacity-60"
              }`}
            >
              {tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-[--foreground]"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 2 && (
                <span className="px-2 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-[--foreground] opacity-60">
                  +{tags.length - 2}
                </span>
              )}
            </div>
          </div>

          {/* Hover indicator */}
          <div
            className={`absolute bottom-3 right-3 transition-all duration-500 ${
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
            }`}
          >
            <span className={`text-sm font-semibold ${colors.text}`}>→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
