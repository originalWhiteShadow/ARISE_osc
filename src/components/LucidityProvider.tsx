"use client";

import { ReactNode, useEffect, useState } from "react";
import { useLucidityTracking } from "@/hooks/useLucidityTracking";
import { trackWebVitals } from "@/lib/webVitals";

interface LucidityProviderProps {
  children: ReactNode;
}

export function LucidityProvider({ children }: LucidityProviderProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate Zustand store and initialize tracking
  useEffect(() => {
    setIsHydrated(true);
    // Initialize Web Vitals monitoring
    trackWebVitals();
  }, []);

  // Track lucidity on this page
  useLucidityTracking();

  if (!isHydrated) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
