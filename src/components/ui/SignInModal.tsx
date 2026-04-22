"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { signInWithPopup, linkWithCredential, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "@/lib/firebase/config";
import { useAuth } from "@/components/providers/AuthProvider";
import { syncUserProfile } from "@/lib/firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

export function SignInModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [pendingLink, setPendingLink] = useState<{ provider: 'google' | 'github', credential: any } | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    setIsOpen(searchParams.get("login") === "true");
  }, [searchParams]);

  const close = () => {
    setPendingLink(null);
    router.replace(pathname ?? "/", { scroll: false });
  };

  useEffect(() => {
    if (user && isOpen) {
      close();
    }
  }, [user, isOpen]);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await syncUserProfile(result.user.uid, result.user.displayName, result.user.email);
      close();
    } catch (error: any) {
      if (error.code === "auth/account-exists-with-different-credential") {
        const pendingCred = GoogleAuthProvider.credentialFromError(error);
        setPendingLink({ provider: 'github', credential: pendingCred });
      } else {
        console.error("Error signing in with Google", error);
        alert("Google Auth Error: " + error.message);
      }
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      await syncUserProfile(result.user.uid, result.user.displayName, result.user.email);
      close();
    } catch (error: any) {
      if (error.code === "auth/account-exists-with-different-credential") {
        const pendingCred = GithubAuthProvider.credentialFromError(error);
        setPendingLink({ provider: 'google', credential: pendingCred });
      } else {
        console.error("Error signing in with GitHub", error);
        alert("GitHub Auth Error: " + error.message);
      }
    }
  };

  const handleLinkAccount = async () => {
    if (!pendingLink) return;
    try {
      const provider = pendingLink.provider === 'google' ? googleProvider : githubProvider;
      const result = await signInWithPopup(auth, provider);
      if (pendingLink.credential) {
        await linkWithCredential(result.user, pendingLink.credential);
      }
      await syncUserProfile(result.user.uid, result.user.displayName, result.user.email);
      close();
    } catch (err: any) {
      console.error("Link error:", err);
      alert("Failed to link accounts: " + err.message);
      setPendingLink(null);
    }
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
             
             <div className="relative w-14 h-14 mb-6 flex items-center justify-center">
               <Image 
                 src="/logo.png" 
                 alt="ARISE Logo"
                 fill
                 className="object-contain invert dark:invert-0"
               />
             </div>
             <h2 className="text-2xl font-bold mb-2">
               {pendingLink ? "Account Exists" : "Sign In to ARISE"}
             </h2>
             <p className="text-apple-text-muted text-sm mb-8">
               {pendingLink 
                 ? `Your email is already registered. Please verify via ${pendingLink.provider === 'google' ? 'Google' : 'GitHub'} to link them.`
                 : "Seamless authentication to access dashboards, tasks, and contributions."}
             </p>
             
             {pendingLink ? (
               <div className="w-full space-y-4">
                 <button 
                   onClick={handleLinkAccount}
                   className="w-full py-3 bg-apple-accent text-apple-bg rounded-xl font-medium hover:opacity-90 transition-opacity"
                 >
                   Verify with {pendingLink.provider === 'google' ? 'Google' : 'GitHub'}
                 </button>
                 <button 
                   onClick={() => setPendingLink(null)}
                   className="text-xs text-apple-text-muted hover:text-apple-text transition-colors"
                 >
                   Cancel Linking
                 </button>
               </div>
             ) : (
               <div className="w-full space-y-3">
                 <button 
                   onClick={handleGithubSignIn}
                   className="w-full py-3 bg-apple-text text-apple-bg rounded-xl font-medium hover:opacity-90 transition-opacity"
                 >
                   Continue with GitHub
                 </button>
                 <button 
                   onClick={handleGoogleSignIn}
                   className="w-full py-3 border border-apple-border/40 text-apple-text rounded-xl font-medium hover:bg-apple-border/10 transition-colors"
                 >
                   Continue with Google
                 </button>
               </div>
             )}
             
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
