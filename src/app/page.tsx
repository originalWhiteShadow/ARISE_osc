"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MorphGear } from "@/components/ui/MorphGear";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();

  // Scroll animations for foreground text and components
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  const cardScale = useTransform(scrollYProgress, [0.1, 0.5], [0.9, 1]);
  
  const boxMorphRadius = useTransform(scrollYProgress, [0.2, 0.8], ["12px", "150px"]);
  const boxRotate = useTransform(scrollYProgress, [0.2, 0.8], [0, 15]);

  // Foreground floating geometry
  const fgRotate1 = useTransform(scrollYProgress, [0, 1], [-45, 180]);
  const fgY1 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  
  const fgRotate2 = useTransform(scrollYProgress, [0, 1], [45, -90]);
  const fgY2 = useTransform(scrollYProgress, [0, 1], [0, -400]);

  return (
    <div className="flex flex-col items-center w-full pb-24 transition-colors duration-300 relative overflow-hidden">
      <MorphGear />

      {/* Extreme Center ARISE_osc Text */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none -z-20">
        <h1 className="text-[15vw] font-bold text-apple-text/15 dark:text-apple-text/5 select-none tracking-tighter mix-blend-multiply dark:mix-blend-overlay">
          ARISE_osc
        </h1>
      </div>

      {/* Foreground Geometric Elements */}
      <motion.div 
        style={{ rotate: fgRotate1, y: fgY1 }}
        className="absolute top-[60vh] right-[10vw] w-12 h-12 border-2 border-apple-accent z-40 pointer-events-none backdrop-blur-md bg-apple-bg/10"
      />
      <motion.div 
        style={{ rotate: fgRotate2, y: fgY2 }}
        className="absolute top-[90vh] left-[8vw] w-20 h-20 border border-apple-text/30 rounded-xl z-40 pointer-events-none backdrop-blur-sm shadow-xl"
      />

      {/* Hero Section */}
      <motion.section 
        style={{ y: heroY, opacity: heroOpacity }}
        className="w-full pt-[25vh] pb-24 px-6 flex flex-col items-center text-center relative z-10"
      >
        <div className="max-w-[800px] flex flex-col items-center">
          <h1 className="hero-title text-apple-text tracking-tight mb-4">
            ARISE_osc
          </h1>
          <p className="hero-subtitle text-apple-text-muted mb-10 max-w-[600px]">
            Build. Launch. Scale.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link 
              href="/projects" 
              className="px-6 py-3 bg-apple-text text-apple-bg rounded-full font-medium text-[17px] hover:opacity-80 transition-opacity"
            >
              Explore Projects
            </Link>
            <Link 
              href="/about" 
              className="text-apple-accent text-[17px] font-medium hover:underline flex items-center gap-1"
            >
              Learn more <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Heavy Image/Video abstraction placeholder */}
      <section className="w-full max-w-[1200px] px-6 mb-32 relative z-30">
        <motion.div 
          style={{ scale: cardScale }}
          className="w-full h-[400px] md:h-[600px] apple-card glass-heavy flex items-center justify-center relative overflow-hidden transition-colors duration-300"
        >
           {/* Abstract "Clean App Graphic" morphing */}
           <motion.div 
             style={{ borderRadius: boxMorphRadius, rotate: boxRotate }}
             className="w-3/4 h-3/4 border border-apple-border/50 bg-apple-bg shadow-2xl flex items-center justify-center translate-y-12 transition-all duration-300 ease-linear"
           >
              <span className="text-apple-text-muted text-sm font-medium">Community Dashboard Preview</span>
              <div className="absolute top-4 left-4 flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-apple-border/40"></div>
                 <div className="w-3 h-3 rounded-full bg-apple-border/40"></div>
                 <div className="w-3 h-3 rounded-full bg-apple-border/40"></div>
              </div>
           </motion.div>
        </motion.div>
      </section>

      {/* Features Outline */}
      <section className="w-full max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="apple-card glass-heavy text-apple-text p-10 md:p-14 flex flex-col justify-between h-[450px] transition-colors duration-300 transform-gpu hover:-translate-y-2 hover:shadow-2xl duration-500">
           <div>
             <h3 className="text-[28px] font-semibold mb-3">Structured Collaboration.</h3>
             <p className="text-[17px] opacity-80 font-medium">Assign, track, and close issues seamlessly.</p>
           </div>
           <Link href="/projects" className="w-12 h-12 rounded-full border border-apple-bg/30 flex items-center justify-center self-end hover:bg-apple-bg hover:text-apple-text transition-colors cursor-pointer">
             <ArrowRight className="w-5 h-5 -rotate-45" />
           </Link>
        </div>

        <div className="apple-card glass-heavy p-10 md:p-14 flex flex-col justify-between h-[450px] transition-colors duration-300 transform-gpu hover:-translate-y-2 hover:shadow-2xl duration-500">
           <div>
             <h3 className="text-[28px] font-semibold mb-3 text-apple-text">Knowledge Base.</h3>
             <p className="text-[17px] text-apple-text-muted font-medium">Curated systems and web architecture tutorials.</p>
           </div>
           <Link href="/learn" className="w-12 h-12 rounded-full border border-apple-border flex items-center justify-center self-end hover:bg-apple-text hover:text-apple-bg transition-colors cursor-pointer text-apple-text">
             <ArrowRight className="w-5 h-5 -rotate-45" />
           </Link>
        </div>
      </section>
    </div>
  );
}
