"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function SignInModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(searchParams.get("login") === "true");
  }, [searchParams]);

  const close = () => {
    // Determine the current path without the query string
    router.replace(pathname ?? "/", { scroll: false });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-sm glass-heavy p-8 flex flex-col items-center text-center text-apple-text shadow-2xl"
          >
             <button 
               onClick={close}
               className="absolute top-4 right-4 p-2 rounded-full hover:bg-apple-border/20 transition-colors"
             >
               <X className="w-4 h-4" />
             </button>
             
             <div className="w-10 h-10 bg-apple-text rounded-sm rotate-12 mb-6" />
             <h2 className="text-2xl font-bold mb-2">Sign In to ARISE</h2>
             <p className="text-apple-text-muted text-sm mb-8">
               Seamless authentication to access dashboards, tasks, and contributions.
             </p>
             
             <div className="w-full space-y-3">
               <button className="w-full py-3 bg-apple-text text-apple-bg rounded-xl font-medium hover:opacity-90 transition-opacity">
                 Continue with GitHub
               </button>
               <button className="w-full py-3 border border-apple-border/40 text-apple-text rounded-xl font-medium hover:bg-apple-border/10 transition-colors">
                 Continue with Google
               </button>
             </div>
             
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
