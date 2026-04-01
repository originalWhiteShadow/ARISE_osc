"use client";

import { InteractiveAurora } from "@/components/world/InteractiveAurora";
import { Meteors } from "@/components/world/Meteors";

export function SceneLayer() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      <InteractiveAurora />
      <Meteors />
    </div>
  );
}
