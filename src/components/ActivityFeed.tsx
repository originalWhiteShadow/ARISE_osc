"use client";

export interface ActivityEntry {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  icon: string;
}

interface ActivityFeedProps {
  entries: ActivityEntry[];
}

export function ActivityFeed({ entries }: ActivityFeedProps) {
  return (
    <div className="space-y-3">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="flex gap-3 p-4 rounded-lg border border-white/10 bg-linear-to-r from-[--brand-purple]/10 to-[--brand-midnight]/10 backdrop-blur-sm hover:border-white/20 transition-colors"
        >
          {/* Icon */}
          <div className="text-xl flex-shrink-0">{entry.icon}</div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[--foreground]">
              <span className="font-semibold text-[--color-brand-cyan]">{entry.user}</span>
              <span className="text-[--foreground] opacity-70"> {entry.action} </span>
              <span className="font-semibold text-[--color-brand-pink]">{entry.target}</span>
            </p>
            <p className="text-xs text-[--foreground] opacity-60 mt-1">{entry.timestamp}</p>
          </div>

          {/* Pulse indicator */}
          <div className="flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[--color-brand-cyan] animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
