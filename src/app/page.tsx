"use client";

import Link from "next/link";
import { ArrowRight, LayoutDashboard, Terminal, CheckCircle2, CircleDashed, Users, Code, Cpu, Rocket } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();

  // Scroll animations for foreground text and components
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  const cardScale = useTransform(scrollYProgress, [0.1, 0.5], [0.9, 1]);
  
  const boxMorphRadius = useTransform(scrollYProgress, [0.2, 0.8], ["12px", "150px"]);
  const boxRotate = useTransform(scrollYProgress, [0.2, 0.8], [0, 15]);

  const organizations = [
    { name: "Google Developer Student Clubs", acronym: "GDSC", icon: Code, desc: "Building solutions for local businesses and communities." },
    { name: "Open Source Cell", acronym: "OSC", icon: Terminal, desc: "Fostering open-source contributions and development." },
    { name: "IEEE Computer Society", acronym: "IEEE CS", icon: Cpu, desc: "Advancing technology for the benefit of humanity." },
    { name: "Aerospace & Robotics", acronym: "ARC", icon: Rocket, desc: "Exploring the frontiers of automation and space tech." }
  ];

  return (
    <div className="flex flex-col items-center w-full pb-24 transition-colors duration-300 relative overflow-hidden">
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
             className="w-[90%] h-[90%] border border-apple-border/50 bg-apple-bg shadow-2xl flex flex-col translate-y-12 transition-all duration-300 ease-linear overflow-hidden relative"
           >
              {/* Fake Window Header */}
              <div className="w-full h-12 border-b border-apple-border/30 flex items-center px-4 shrink-0 bg-apple-bg/50 backdrop-blur-md z-10 transition-colors">
                 <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-apple-border hover:bg-red-400 transition-colors"></div>
                    <div className="w-3 h-3 rounded-full bg-apple-border hover:bg-yellow-400 transition-colors"></div>
                    <div className="w-3 h-3 rounded-full bg-apple-border hover:bg-green-400 transition-colors"></div>
                 </div>
                 <div className="mx-auto w-1/3 h-6 rounded-md bg-apple-border/10 flex items-center px-3 border border-apple-border/20">
                   <div className="w-3 h-3 rounded-full bg-apple-text-muted/40 mr-2" />
                   <div className="w-16 h-1.5 rounded-full bg-apple-text-muted/30" />
                 </div>
              </div>

              {/* Dashboard Body */}
              <div className="flex-1 w-full flex bg-apple-border/5">
                {/* Sidebar */}
                <div className="w-16 md:w-56 h-full border-r border-apple-border/30 p-4 flex flex-col gap-4">
                  <div className="w-full h-9 rounded-md bg-apple-accent/10 flex items-center px-3 text-apple-accent gap-3">
                    <LayoutDashboard className="w-4 h-4 shrink-0" />
                    <div className="hidden md:block w-20 h-2 rounded-full bg-apple-accent/50" />
                  </div>
                  <div className="w-full h-9 rounded-md hover:bg-apple-border/15 flex items-center px-3 text-apple-text-muted gap-3 transition-colors">
                    <Terminal className="w-4 h-4 shrink-0" />
                    <div className="hidden md:block w-24 h-2 rounded-full bg-apple-text-muted/40" />
                  </div>
                  <div className="w-full h-3 border-b border-apple-border/30 my-2" />
                  <div className="w-full h-9 rounded-md hover:bg-apple-border/15 flex items-center px-3 text-apple-text-muted gap-3 transition-colors">
                    <div className="w-4 h-4 rounded-full border-2 border-apple-text-muted/50 shrink-0" />
                    <div className="hidden md:block w-16 h-2 rounded-full bg-apple-text-muted/40" />
                  </div>
                </div>

                {/* Main Content Pane */}
                <div className="flex-1 p-6 md:p-8 flex flex-col gap-6 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="w-32 md:w-48 h-5 rounded-full bg-apple-text/80 mb-3" />
                      <div className="w-48 md:w-64 h-2.5 rounded-full bg-apple-text-muted/40" />
                    </div>
                    <div className="w-10 h-10 rounded-full border border-apple-border/50 bg-apple-bg flex items-center justify-center">
                       <div className="w-6 h-6 rounded-full bg-apple-border/50" />
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-28 rounded-xl border border-apple-border/30 bg-apple-bg p-5 flex flex-col justify-between shadow-sm">
                      <div className="w-20 h-2.5 rounded-full bg-apple-text-muted/50" />
                      <div className="w-16 h-8 rounded-full bg-apple-text/90" />
                    </div>
                    <div className="h-28 rounded-xl border border-apple-border/30 bg-apple-bg p-5 flex flex-col justify-between shadow-sm">
                      <div className="w-24 h-2.5 rounded-full bg-apple-text-muted/50" />
                      <div className="w-10 h-8 rounded-full bg-apple-accent" />
                    </div>
                  </div>

                  {/* Tasks List */}
                  <div className="flex-1 rounded-xl border border-apple-border/30 bg-apple-bg p-5 flex flex-col gap-3 shadow-sm overflow-hidden">
                    <div className="w-24 h-2.5 rounded-full bg-apple-text-muted/50 mb-3" />
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-full h-12 rounded-lg bg-apple-border/5 flex items-center px-4 gap-4 hover:bg-apple-border/10 transition-colors">
                         {i === 1 ? <CheckCircle2 className="w-5 h-5 text-green-500/70 shrink-0" /> : <CircleDashed className="w-5 h-5 text-apple-text-muted/50 shrink-0" />}
                         <div className="flex-1 h-2.5 rounded-full bg-apple-text-muted/30" />
                         <div className="hidden md:block w-16 h-2.5 rounded-full bg-apple-border/60" />
                      </div>
                    ))}
                  </div>
                </div>
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

      {/* Organizations Section */}
      <section id="organizations" className="w-full max-w-7xl px-6 mt-24 relative z-10 pt-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-apple-text mb-4">Technical Organizations</h2>
          <p className="text-lg text-apple-text-muted font-medium max-w-2xl mx-auto">
            Discover and collaborate with premier student-led technical communities and engineering cells.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {organizations.map((org, idx) => (
            <div 
              key={idx} 
              className="apple-card glass-heavy p-8 flex flex-col items-center text-center transition-all duration-500 transform-gpu hover:-translate-y-2 hover:shadow-2xl group"
            >
              <div className="w-16 h-16 rounded-2xl bg-apple-border/20 border border-apple-border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-apple-accent/10 transition-all duration-300">
                <org.icon className="w-8 h-8 text-apple-text-muted group-hover:text-apple-accent transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-apple-text mb-2 group-hover:text-apple-accent transition-colors">{org.name}</h4>
              <div className="text-xs font-mono tracking-widest text-apple-text-muted/60 mb-4 px-3 py-1 bg-apple-bg rounded-full border border-apple-border/50">
                {org.acronym}
              </div>
              <p className="text-sm text-apple-text-muted leading-relaxed">
                {org.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
