"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Settings, Settings2, GitMerge, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

export function MorphGear() {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const y1 = useTransform(scrollYProgress, [0, 1], ["0vh", "30vh"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0vh", "-40vh"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0vh", "60vh"]);

  const r1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const r2 = useTransform(scrollYProgress, [0, 1], [360, -180]);
  const r3 = useTransform(scrollYProgress, [0, 1], [0, 540]);

  // Dynamic grid scaling
  const gridScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  // Inline morphs moved up
  const borderRadiusMorph = useTransform(scrollYProgress, [0, 0.5, 1], ["20%", "50%", "20%"]);
  const r4 = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const scaleMorph = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 1]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center -z-10 overflow-hidden">
      
      {/* Maximalist Wireframe Background Grid */}
      <motion.div 
        className="absolute inset-0 opacity-[0.07] dark:opacity-[0.1]"
        style={{
          scale: gridScale,
          backgroundImage: 'radial-gradient(circle at center, var(--border) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Central Abstract Complex Geometry */}
      <motion.div
        style={{
          rotate: r1,
          borderRadius: borderRadiusMorph,
          y: y1,
        }}
        className="absolute w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] border-[1.5px] border-apple-accent/50 dark:border-apple-accent/30 border-dashed opacity-60 dark:opacity-40 mix-blend-multiply dark:mix-blend-screen"
      />
      <motion.div
        style={{
          rotate: r4,
          scale: scaleMorph,
        }}
        className="absolute w-[60vw] h-[60vw] md:w-[45vw] md:h-[45vw] border-[2px] border-apple-text/15 dark:border-apple-text/10"
      />

      {/* Engineering Accent - Cpu / Circuit */}
      <motion.div
        style={{ rotate: r2, y: y2 }}
        className="absolute w-32 h-32 md:w-64 md:h-64 top-1/4 left-[8%] text-apple-border/80 dark:text-apple-border/40 flex items-center justify-center"
      >
        <Settings className="w-full h-full" strokeWidth={0.5} />
        <div className="absolute w-px h-[200vh] bg-apple-border/20 left-1/2 -translate-x-1/2" />
        <div className="absolute h-px w-[200vw] bg-apple-border/20 top-1/2 -translate-y-1/2" />
      </motion.div>

      {/* Engineering Accent - Database / Git Merge */}
      <motion.div
        style={{ rotate: r3, y: y3 }}
        className="absolute w-24 h-24 md:w-48 md:h-48 bottom-1/4 right-[8%] text-apple-accent/20 flex flex-col items-center justify-center"
      >
        <GitMerge className="w-full h-full mb-4" strokeWidth={0.5} />
        <div className="w-[30vw] h-px bg-apple-accent/20 absolute right-0" />
      </motion.div>
      
      {/* HUD Reticle */}
      <div className="absolute w-[30vh] h-[30vh] border border-apple-text/10 rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-apple-accent/50 rounded-full animate-ping" />
        <div className="absolute top-0 bottom-0 w-px bg-apple-text/5" />
        <div className="absolute left-0 right-0 h-px bg-apple-text/5" />
      </div>

    </div>
  );
}
