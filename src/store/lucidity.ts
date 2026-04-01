import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface LucidityState {
  level: number; // 0-100
  totalInteractions: number;
  pagesVisited: number;
  pageTime: number; // seconds
  lastInteractionTime: number; // timestamp

  // Actions
  incrementInteraction: () => void;
  addPageVisit: () => void;
  addPageTime: (seconds: number) => void;
  setLevel: (level: number) => void;
  resetLucidity: () => void;

  // Derived state
  tier: "dreaming" | "waking" | "aware" | "lucid" | "fully_lucid";
}

const calculateTier = (
  level: number
): "dreaming" | "waking" | "aware" | "lucid" | "fully_lucid" => {
  if (level < 20) return "dreaming";
  if (level < 40) return "waking";
  if (level < 60) return "aware";
  if (level < 80) return "lucid";
  return "fully_lucid";
};

const calculateLevel = (
  interactions: number,
  pagesVisited: number,
  pageTime: number
): number => {
  // Interaction points (max 40)
  const interactionScore = Math.min(interactions * 2, 40);
  // Pages visited (max 30)
  const pageScore = Math.min(pagesVisited * 3, 30);
  // Time on site (max 30, 1 point per 60 seconds)
  const timeScore = Math.min(Math.floor(pageTime / 60), 30);

  const total = interactionScore + pageScore + timeScore;
  return Math.min(total, 100);
};

export const useLucidity = create<LucidityState>()(
  persist(
    (set, get) => ({
      level: 0,
      totalInteractions: 0,
      pagesVisited: 1,
      pageTime: 0,
      lastInteractionTime: Date.now(),
      tier: "dreaming",

      incrementInteraction: () => {
        const state = get();
        const newInteractions = state.totalInteractions + 1;
        const newLevel = calculateLevel(
          newInteractions,
          state.pagesVisited,
          state.pageTime
        );

        set({
          totalInteractions: newInteractions,
          level: newLevel,
          lastInteractionTime: Date.now(),
          tier: calculateTier(newLevel),
        });
      },

      addPageVisit: () => {
        const state = get();
        const newPagesVisited = state.pagesVisited + 1;
        const newLevel = calculateLevel(
          state.totalInteractions,
          newPagesVisited,
          state.pageTime
        );

        set({
          pagesVisited: newPagesVisited,
          level: newLevel,
          tier: calculateTier(newLevel),
        });
      },

      addPageTime: (seconds: number) => {
        const state = get();
        const newPageTime = state.pageTime + seconds;
        const newLevel = calculateLevel(
          state.totalInteractions,
          state.pagesVisited,
          newPageTime
        );

        set({
          pageTime: newPageTime,
          level: newLevel,
          tier: calculateTier(newLevel),
        });
      },

      setLevel: (level: number) => {
        const clamped = Math.max(0, Math.min(100, level));
        set({
          level: clamped,
          tier: calculateTier(clamped),
        });
      },

      resetLucidity: () => {
        set({
          level: 0,
          totalInteractions: 0,
          pagesVisited: 1,
          pageTime: 0,
          lastInteractionTime: Date.now(),
          tier: "dreaming",
        });
      },
    }),
    {
      name: "lucidity-storage",
      version: 1,
    }
  )
);
