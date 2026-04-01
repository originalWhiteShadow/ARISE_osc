"use client";

import { useEffect, useState } from "react";

export const Meteors = ({ number = 8 }: { number?: number }) => {
  const [meteors, setMeteors] = useState<
    { id: number; left: string; top: string; delay: string; duration: string }[]
  >([]);

  useEffect(() => {
    // Generate meteors falling from top/right across the screen (Right to Left / Downwards)
    const generatedMeteors = Array.from({ length: number }).map((_, idx) => ({
      id: idx,
      // Start higher/further right so they cross the screen completely
      left: Math.floor(Math.random() * 100) + 20 + "vw", // 20vw to 120vw
      top: Math.floor(Math.random() * 50) - 40 + "vh", // -40vh to 10vh
      delay: (Math.random() * 10).toFixed(2) + "s", // Spread them out more (less dense appearance)
      duration: (Math.random() * 2 + 1.5).toFixed(2) + "s", // Speed: 1.5s to 3.5s
    }));
    setMeteors(generatedMeteors);
  }, [number]);

  if (meteors.length === 0) return null;

  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="pointer-events-none absolute h-[1px] w-[40px] md:w-[80px] bg-gradient-to-r from-transparent via-[rgba(26,229,229,0.3)] to-white animate-meteor opacity-0"
          style={{
            top: meteor.top,
            left: meteor.left,
            animationDelay: meteor.delay,
            animationDuration: meteor.duration,
          }}
        >
          {/* Subtle Glowing Head matching star size */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1.5px] h-[1.5px] rounded-full bg-white shadow-[0_0_4px_1px_rgba(255,255,255,0.7)]" />
        </div>
      ))}
    </div>
  );
};
