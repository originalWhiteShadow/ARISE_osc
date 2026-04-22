"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, AnimatePresence } from "framer-motion";
import { MorphGear } from "./MorphGear";
import { useEffect, useState } from "react";

export function GlobalDecorations() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  // Scroll Parallax Elements
  const fgRotate1 = useTransform(smoothProgress, [0, 1], [-45, 180]);
  const fgY1 = useTransform(smoothProgress, [0, 1], [0, -600]);
  
  // Fast Fidget Spinner Rotation
  const spinnerRotate = useTransform(smoothProgress, [0, 1], [0, 1440]);
  const fgY2 = useTransform(smoothProgress, [0, 1], [0, -500]);

  // Cursor Parallax Engine
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });
  
  const mouseShiftX = useTransform(springX, [0, 2500], [50, -50]);
  const mouseShiftY = useTransform(springY, [0, 1500], [50, -50]);

  // Inverted shift for contrast
  const invertShiftX = useTransform(springX, [0, 2500], [-30, 30]);
  const invertShiftY = useTransform(springY, [0, 1500], [-30, 30]);

  // Torch Mode State
  const [torchActive, setTorchActive] = useState(false);
  const torchGradient = useMotionTemplate`radial-gradient(circle 300px at ${mouseX}px ${mouseY}px, transparent 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.98) 100%)`;

  useEffect(() => {
    const handleToggle = () => setTorchActive(prev => !prev);
    window.addEventListener('toggle-torch', handleToggle);
    return () => window.removeEventListener('toggle-torch', handleToggle);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <AnimatePresence>
        {torchActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ background: torchGradient }}
            className="fixed inset-0 z-[65] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <MorphGear />

      {/* Extreme Center ARISE_osc Text */}
      <motion.div 
        style={{ x: mouseShiftX, y: mouseShiftY }}
        className="fixed inset-0 flex items-center justify-center pointer-events-none -z-20"
      >
        <h1 className="text-[15vw] font-bold text-apple-text/15 dark:text-apple-text/5 select-none tracking-tighter mix-blend-multiply dark:mix-blend-overlay">
          ARISE_osc
        </h1>
      </motion.div>

      {/* Cursor Tracking Aura Layer */}
      <motion.div 
        style={{ x: springX, y: springY }}
        className="fixed top-0 left-0 w-[400px] h-[400px] -ml-[200px] -mt-[200px] rounded-full bg-apple-accent/5 dark:bg-apple-accent/10 blur-3xl pointer-events-none -z-10"
      />

      {/* Foreground Right Floating Geometric Cube Removed */}
      <motion.div 
        style={{ rotate: spinnerRotate, y: fgY2, x: mouseShiftX }}
        className="fixed top-[60vh] left-[15vw] -z-10 opacity-40 dark:opacity-20 pointer-events-none w-48 h-48 flex items-center justify-center scale-150 mix-blend-multiply dark:mix-blend-screen"
      >
        {/* Core Bearing */}
        <div className="absolute w-12 h-12 rounded-full border-2 border-apple-accent bg-apple-bg z-10 box-border" />
        <div className="absolute w-4 h-4 rounded-full bg-apple-text/40 z-20" />
        
        {/* Arm 1 */}
        <div className="absolute top-0 w-12 h-16 border-[1.5px] border-apple-text/40 dark:border-apple-text/20 bg-apple-text/5 dark:bg-apple-bg/10 rounded-t-full flex items-start justify-center pt-2">
           <div className="w-6 h-6 rounded-full border border-apple-text/20 dark:border-apple-text/10"></div>
        </div>
        {/* Arm 2 */}
        <div className="absolute bottom-2 right-1 w-12 h-16 border-[1.5px] border-apple-text/40 dark:border-apple-text/20 bg-apple-text/5 dark:bg-apple-bg/10 rounded-t-full flex items-start justify-center pt-2 origin-top rotate-[120deg]">
           <div className="w-6 h-6 rounded-full border border-apple-text/20 dark:border-apple-text/10"></div>
        </div>
        {/* Arm 3 */}
        <div className="absolute bottom-2 left-1 w-12 h-16 border-[1.5px] border-apple-text/40 dark:border-apple-text/20 bg-apple-text/5 dark:bg-apple-bg/10 rounded-t-full flex items-start justify-center pt-2 origin-top -rotate-[120deg]">
           <div className="w-6 h-6 rounded-full border border-apple-text/20 dark:border-apple-text/10"></div>
        </div>
      </motion.div>
    </>
  );
}
