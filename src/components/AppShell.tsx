"use client";

import { HomeNavbar } from "@/components/HomeNavbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HomeNavbar />
      <main className="relative z-10 flex-1 min-w-0 overflow-x-hidden">
        {children}
      </main>
    </>
  );
}
