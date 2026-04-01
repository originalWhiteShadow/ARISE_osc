"use client";

import dynamic from "next/dynamic";

// Lazy-load Three.js SceneManager only on client to reduce initial bundle
const SceneManager = dynamic(() => import("./world/SceneManager").then(m => ({ default: m.SceneManager })), {
  ssr: false,
  loading: () => null, // No fallback, seamless load
});

export function SceneLayer() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <SceneManager />
    </div>
  );
}
