"use client";

import { useLucidity } from "@/store/lucidity";

const tierInfo = {
  dreaming: {
    label: "Dreaming",
    description: "Just awakening...",
    color: "text-[--color-brand-cyan]",
    barColor: "bg-[--color-brand-cyan]",
  },
  waking: {
    label: "Waking",
    description: "Beginning to see...",
    color: "text-[--color-brand-pink]",
    barColor: "bg-[--color-brand-pink]",
  },
  aware: {
    label: "Aware",
    description: "Pattern recognition...",
    color: "text-[--color-brand-gold]",
    barColor: "bg-[--color-brand-gold]",
  },
  lucid: {
    label: "Lucid",
    description: "You control the dream...",
    color: "text-[--brand-purple]",
    barColor: "bg-[--brand-purple]",
  },
  fully_lucid: {
    label: "Fully Lucid",
    description: "Master of the world...",
    color: "text-white",
    barColor: "bg-white",
  },
};

export function LucidityIndicator() {
  const { level, tier, totalInteractions, pagesVisited } = useLucidity();
  const info = tierInfo[tier];

  return (
    <div className="flex flex-col gap-2 transition-all duration-300">
      {/* Tier label and percentage */}
      <div className="flex items-center justify-between">
        <div>
          <div className={`text-xs font-bold uppercase tracking-widest ${info.color}`}>
            {info.label}
          </div>
          <p className="text-xs text-[--foreground] opacity-60">{info.description}</p>
        </div>
        <div className={`text-xl font-bold ${info.color}`}>{level}%</div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full ${info.barColor} transition-all duration-300`}
          style={{ width: `${level}%` }}
        />
      </div>

      {/* Stats */}
      <div className="flex gap-3 text-xs text-[--foreground] opacity-60">
        <span>🔗 {totalInteractions} interactions</span>
        <span>•</span>
        <span>📍 {pagesVisited} places</span>
      </div>
    </div>
  );
}
