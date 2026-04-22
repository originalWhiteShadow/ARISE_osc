"use client";

import { useEffect, useState } from "react";

export function GlobalHUD() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden mix-blend-multiply dark:mix-blend-screen opacity-50 transition-opacity duration-700">
       {/* Corner Crosshairs */}
       <div className="absolute top-4 left-4 w-6 h-6 border-l-[1.5px] border-t-[1.5px] border-apple-text"></div>
       <div className="absolute top-4 right-4 w-6 h-6 border-r-[1.5px] border-t-[1.5px] border-apple-text"></div>
       <div className="absolute bottom-4 left-4 w-6 h-6 border-l-[1.5px] border-b-[1.5px] border-apple-text"></div>
       <div className="absolute bottom-4 right-4 w-6 h-6 border-r-[1.5px] border-b-[1.5px] border-apple-text"></div>

       {/* Vertical Grid Framing */}
       <div className="absolute left-[3%] top-0 bottom-0 w-px bg-apple-text/20 hidden md:block"></div>
       <div className="absolute right-[3%] top-0 bottom-0 w-px bg-apple-text/20 hidden md:block"></div>

       {/* Data streams */}
       <div className="absolute left-[-80px] top-1/2 -translate-y-1/2 -rotate-90 origin-center font-mono text-[10px] tracking-[0.2em] text-apple-text whitespace-nowrap hidden lg:block opacity-50">
          SYS_OSC // INITIALIZATION // ONLINE // [ACTIVE]
       </div>
       <div className="absolute right-[-80px] top-1/2 -translate-y-1/2 rotate-90 origin-center font-mono text-[10px] tracking-[0.2em] text-apple-text whitespace-nowrap hidden lg:block opacity-50">
          DATA_STREAM // NET_ID: 10294 // RENDERING_GLASS_UI
       </div>
    </div>
  );
}
