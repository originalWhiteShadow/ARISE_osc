"use client";

import Link from 'next/link';
import { PageWrapper } from "@/components/PageWrapper";
import { IoPersonOutline, IoSettingsOutline, IoTimeOutline, IoCodeSlashOutline, IoRocketOutline } from "react-icons/io5";

export default function ProfilePage() {
  return (
    <PageWrapper>
      <div className="relative z-10 min-h-screen w-full overflow-x-hidden px-4 pt-28 pb-10 md:px-8 md:pt-32 md:pb-12">
        <div className="mx-auto w-full max-w-5xl">

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Sidebar - Profile Overview */}
            <div className="w-full md:w-1/3 flex flex-col gap-6">
              
              {/* Primary Identity Glass Card */}
              <div className="rounded-2xl glass border border-white/10 p-8 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-[24px] text-center">
                <div className="w-32 h-32 rounded-full bg-linear-to-br from-[--color-brand-cyan] to-[--color-brand-pink] mx-auto mb-6 flex items-center justify-center border-4 border-white/20 shadow-[0_0_30px_rgba(26,229,229,0.3)]">
                  <span className="text-4xl font-black text-white drop-shadow-md">GN</span>
                </div>
                <h1 className="text-3xl font-black text-white mb-1 tracking-tight">Guest Node</h1>
                <p className="text-[--color-brand-cyan] font-bold text-sm tracking-widest uppercase mb-6">Tier: Observer</p>
                
                <div className="flex flex-col gap-3">
                  <button className="w-full py-3 rounded-xl glass border border-[--color-brand-cyan]/50 text-[--color-brand-cyan] font-bold shadow-[0_0_15px_rgba(26,229,229,0.2)] hover:bg-[--color-brand-cyan]/10 transition-colors tracking-wide">
                    Sync Connection
                  </button>
                  <button className="w-full py-3 rounded-xl glass border border-white/10 text-white/80 hover:text-white font-bold hover:bg-white/5 transition-colors tracking-wide flex items-center justify-center gap-2">
                    <IoSettingsOutline className="text-lg" /> Options
                  </button>
                </div>
              </div>

              {/* Status & Diagnostics */}
              <div className="rounded-2xl glass border border-white/10 p-6 shadow-xl backdrop-blur-[12px]">
                <h3 className="text-sm font-bold text-white/50 tracking-widest uppercase mb-4">Diagnostics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 font-medium text-sm">Uptime Sync</span>
                    <span className="text-[--color-brand-cyan] font-bold text-sm">99.9%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 font-medium text-sm">Data Integrity</span>
                    <span className="text-emerald-400 font-bold text-sm">Optimal</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 font-medium text-sm">Last Ping</span>
                    <span className="text-white/50 font-medium text-sm">Just now</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Main Column - Activity & Stats */}
            <div className="w-full md:w-2/3 flex flex-col gap-6">
              
              {/* Highlight Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="rounded-2xl glass border border-white/10 p-6 shadow-xl backdrop-blur-[12px] flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors">
                  <IoCodeSlashOutline className="text-3xl text-[--color-brand-cyan] mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl font-black text-white mb-1">214</div>
                  <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Commits</p>
                </div>
                <div className="rounded-2xl glass border border-white/10 p-6 shadow-xl backdrop-blur-[12px] flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors">
                  <IoRocketOutline className="text-3xl text-[--color-brand-pink] mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl font-black text-white mb-1">12</div>
                  <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Projects</p>
                </div>
                <div className="rounded-2xl glass border border-white/10 p-6 shadow-xl backdrop-blur-[12px] flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors">
                  <IoTimeOutline className="text-3xl text-[--color-brand-gold] mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl font-black text-white mb-1">45</div>
                  <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Days Active</p>
                </div>
              </div>

              {/* Core Competencies (Nodes) */}
              <div className="rounded-2xl glass border border-white/10 p-8 shadow-xl backdrop-blur-[12px]">
                <h2 className="text-lg font-bold text-white mb-5 tracking-wide">Consciousness Nodes</h2>
                <div className="flex flex-wrap gap-3">
                  {['React', 'TypeScript', 'Next.js', 'Three.js', 'Tailwind CSS', 'GraphQL', 'System Architecture'].map((skill) => (
                    <span key={skill} className="px-4 py-2 rounded-xl glass border border-white/20 text-white text-sm font-semibold shadow-md hover:bg-white/10 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="rounded-2xl glass border border-white/10 p-8 shadow-xl backdrop-blur-[12px]">
                <h2 className="text-lg font-bold text-white mb-6 tracking-wide">Telemetry Log</h2>
                <div className="space-y-6">
                  <div className="relative pl-6 border-l-2 border-white/10">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[--color-brand-cyan] shadow-[0_0_10px_rgba(26,229,229,0.8)]" />
                    <p className="text-white font-bold text-md mb-1">Deployed Smart Contract Interface</p>
                    <p className="text-white/60 text-sm font-medium">Contributed to Project Alpha core repository.</p>
                    <p className="text-white/40 text-xs font-bold mt-2 uppercase tracking-widest">2 Days Ago</p>
                  </div>
                  <div className="relative pl-6 border-l-2 border-white/10">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[--color-brand-pink] shadow-[0_0_10px_rgba(217,79,214,0.8)]" />
                    <p className="text-white font-bold text-md mb-1">Proposed Network Optimization</p>
                    <p className="text-white/60 text-sm font-medium">Submitted Idea Seed regarding WebGL render loops.</p>
                    <p className="text-white/40 text-xs font-bold mt-2 uppercase tracking-widest">1 Week Ago</p>
                  </div>
                  <div className="relative pl-6 border-l-2 border-transparent">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white/20" />
                    <p className="text-white font-bold text-md mb-1">Node Initialization</p>
                    <p className="text-white/60 text-sm font-medium">Guest Node successfully synchronized with ARISE_osc.</p>
                    <p className="text-white/40 text-xs font-bold mt-2 uppercase tracking-widest">45 Days Ago</p>
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
