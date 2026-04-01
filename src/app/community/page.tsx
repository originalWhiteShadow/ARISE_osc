"use client";

import { PageWrapper } from "@/components/PageWrapper";
import { LiveActivity } from "@/components/LiveActivity";
import { ActivityFeed } from "@/components/ActivityFeed";

export default function CommunityPage() {
  const activeMembers = [
    {
      id: "1",
      name: "Alex Chen",
      activity: "Reviewing PR #142 in Project Alpha",
      color: "cyan" as const,
      intensity: 0.8,
    },
    {
      id: "2",
      name: "Jordan Smith",
      activity: "Contributing to Project Beta",
      color: "pink" as const,
      intensity: 0.9,
    },
    {
      id: "3",
      name: "Morgan Lee",
      activity: "Advancing Idea Seed: ML Integration",
      color: "gold" as const,
      intensity: 0.7,
    },
    {
      id: "4",
      name: "Casey Rivera",
      activity: "Designing UI for Community Hub",
      color: "purple" as const,
      intensity: 0.6,
    },
  ];

  const recentActivity = [
    {
      id: "1",
      user: "Alex Chen",
      action: "merged",
      target: "authentication-v2 → main",
      timestamp: "2 minutes ago",
      icon: "🔗",
    },
    {
      id: "2",
      user: "Jordan Smith",
      action: "commented on",
      target: "Project Beta roadmap",
      timestamp: "5 minutes ago",
      icon: "💬",
    },
    {
      id: "3",
      user: "Morgan Lee",
      action: "proposed new idea",
      target: "Real-time sync layer",
      timestamp: "8 minutes ago",
      icon: "✨",
    },
    {
      id: "4",
      user: "Casey Rivera",
      action: "joined project",
      target: "Project Gamma",
      timestamp: "12 minutes ago",
      icon: "👋",
    },
    {
      id: "5",
      user: "Alex Chen",
      action: "deployed",
      target: "ecosystem-dashboard v2.1.0",
      timestamp: "15 minutes ago",
      icon: "🚀",
    },
  ];

  const teamClusters = [
    {
      name: "Core Infrastructure",
      members: 8,
      color: "cyan",
      focus: "Foundational systems",
    },
    {
      name: "Community Layer",
      members: 5,
      color: "pink",
      focus: "Engagement & collaboration",
    },
    {
      name: "Knowledge & Docs",
      members: 4,
      color: "gold",
      focus: "Content & learning",
    },
    {
      name: "Visualization",
      members: 6,
      color: "purple",
      focus: "UI & three.js renders",
    },
  ];

  const liveStats = [
    { label: "Active Now", value: "24", color: "text-[--color-brand-cyan]" },
    { label: "This Week", value: "147", color: "text-[--color-brand-pink]" },
    { label: "PRs Open", value: "12", color: "text-[--color-brand-gold]" },
  ];

  return (
    <PageWrapper>
      <div className="relative z-10 min-h-screen w-full overflow-x-hidden px-4 pt-28 pb-10 md:px-8 md:pt-32 md:pb-12">
        <div className="mx-auto w-full max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[--color-brand-pink] to-[--color-brand-cyan] mb-4">
              Presence
            </h1>
            <p className="text-lg text-[--foreground] opacity-70">
              The living heartbeat of ARISE_osc. See who&apos;s building, collaborating, and dreaming together.
            </p>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12 p-6 rounded-xl border border-white/10 bg-linear-to-r from-[--brand-purple]/10 to-[--brand-midnight]/10 backdrop-blur-sm">
            {liveStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                <p className="text-xs text-[--foreground] opacity-60 mt-2 uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Two-column layout */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Active Members - Left */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[--color-brand-cyan] animate-pulse" />
                <h2 className="text-2xl font-bold text-[--foreground]">Active Now</h2>
                <span className="text-sm text-[--foreground] opacity-60">({activeMembers.length})</span>
              </div>
              <div className="rounded-xl p-6 border border-white/10 bg-linear-to-r from-[--brand-purple]/10 to-[--brand-midnight]/10 backdrop-blur-sm">
                <LiveActivity members={activeMembers} />
              </div>
            </div>

            {/* Team Clusters - Right */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[--color-brand-pink] animate-pulse" />
                <h2 className="text-2xl font-bold text-[--foreground]">Collaborating</h2>
              </div>
              <div className="space-y-2">
                {teamClusters.map((cluster) => {
                  const colorMap = {
                    cyan: "border-[--color-brand-cyan]/30 hover:border-[--color-brand-cyan]/60",
                    pink: "border-[--color-brand-pink]/30 hover:border-[--color-brand-pink]/60",
                    gold: "border-[--color-brand-gold]/30 hover:border-[--color-brand-gold]/60",
                    purple: "border-[--brand-purple]/30 hover:border-[--brand-purple]/60",
                  };
                  return (
                    <div
                      key={cluster.name}
                      className={`p-4 rounded-lg border ${colorMap[cluster.color as keyof typeof colorMap]} bg-white/5 hover:bg-white/10 transition-all cursor-pointer`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-[--foreground]">{cluster.name}</h3>
                        <span className="text-sm font-semibold text-[--foreground] opacity-70 px-2 py-1 rounded-full bg-white/10">
                          {cluster.members}
                        </span>
                      </div>
                      <p className="text-xs text-[--foreground] opacity-60">{cluster.focus}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Activity Feed - Full Width */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[--color-brand-gold] animate-pulse" />
              <h2 className="text-2xl font-bold text-[--foreground]">Recent Activity</h2>
            </div>
            <div className="rounded-xl border border-white/10 bg-linear-to-r from-[--brand-purple]/10 to-[--brand-midnight]/10 backdrop-blur-sm p-6">
              <ActivityFeed entries={recentActivity} />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
