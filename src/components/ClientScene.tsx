"use client";

import { useState, useEffect } from "react";
import { SceneLayer } from "@/components/SceneLayer";

export function ClientScene() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <SceneLayer />;
}
