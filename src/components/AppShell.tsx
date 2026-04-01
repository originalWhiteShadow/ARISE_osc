"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "@/components/Navigation";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <Navigation />
      <main
        className={`relative z-10 flex-1 min-w-0 overflow-x-hidden ${
          isHome ? "" : "md:pl-64"
        }`}
      >
        {children}
      </main>
    </>
  );
}
