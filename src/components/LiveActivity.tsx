"use client";

import { useState, useEffect } from "react";

export interface ActivePresence {
  id: string;
  name: string;
  activity: string;
  color: "cyan" | "pink" | "gold" | "purple";
  intensity: number; // 0-1, for pulse intensity
}

interface LiveActivityProps {
  members: ActivePresence[];
}

const colorMap = {
  cyan: "bg-[--color-brand-cyan]",
  pink: "bg-[--color-brand-pink]",
  gold: "bg-[--color-brand-gold]",
  purple: "bg-[--brand-purple]",
};

export function LiveActivity({ members }: LiveActivityProps) {
  const [pulsePhase, setPulsePhase] = useState<Record<string, number>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase((prev) => {
        const updated = { ...prev };
        members.forEach((m) => {
          updated[m.id] = ((prev[m.id] || 0) + 0.05) % 1;
        });
        return updated;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [members]);

  return (
    <div className="space-y-3">
      {members.map((member) => {
        const phase = pulsePhase[member.id] || 0;
        const scale = 1 + Math.sin(phase * Math.PI * 2) * 0.15 * member.intensity;
        const opacity = 0.6 + Math.sin(phase * Math.PI * 2) * 0.35 * member.intensity;

        return (
          <div
            key={member.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            {/* Animated presence dot */}
            <div className="relative w-3 h-3">
              <div
                className={`absolute inset-0 rounded-full ${colorMap[member.color]} opacity-60`}
                style={{
                  transform: `scale(${scale})`,
                  opacity: opacity * 0.6,
                  transition: "transform 0.05s linear",
                }}
              />
              <div className={`absolute inset-0 rounded-full ${colorMap[member.color]}`} />
            </div>

            {/* Member info */}
            <div className="flex-1 min-w-0">
              <p className="text-[--foreground] font-semibold text-sm">{member.name}</p>
              <p className="text-[--foreground] opacity-60 text-xs truncate">
                {member.activity}
              </p>
            </div>

            {/* Live indicator */}
            <div className="flex items-center gap-1">
              <div
                className={`w-1.5 h-1.5 rounded-full ${colorMap[member.color]} animate-pulse`}
              />
              <span className="text-xs text-[--foreground] opacity-60">live</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
