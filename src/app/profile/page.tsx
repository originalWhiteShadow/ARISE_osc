"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { motion } from "framer-motion";
import { useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { LogOut, Mail, User as UserIcon, ShieldAlert } from "lucide-react";
import { auth, db } from "@/lib/firebase/config";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Github } from "lucide-react";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [isFlipped, setIsFlipped] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (user?.uid) {
      getDoc(doc(db, "users", user.uid)).then(snap => {
        if (snap.exists()) {
          setRole(snap.data().role);
        }
      });
    }
  }, [user]);

  const getRoleTag = () => {
    if (role === 'super_admin' || user?.email === 'whiteshadowpoorna@gmail.com') {
      return { text: '#SUPERADMIN', color: 'bg-apple-accent text-apple-bg' };
    }
    if (role === 'admin') {
      return { text: '#ADMIN', color: 'bg-blue-500 text-white' };
    }
    if (role === 'maintainer') {
      return { text: '#MAINTAINER', color: 'bg-emerald-500 text-white' };
    }
    if (role === 'contributor') {
      return { text: '#CONTRIBUTOR', color: 'bg-purple-500 text-white' };
    }
    return { text: '#MEMBER', color: 'bg-zinc-600 text-white' };
  };

  const roleTag = getRoleTag();

  if (loading) {
    return <div className="min-h-screen pt-24 px-4 flex justify-center text-apple-text-muted">Authenticating...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-24 px-4 flex flex-col items-center justify-center text-apple-text">
        <h1 className="text-2xl font-mono uppercase tracking-widest mb-4 text-apple-accent">Access Denied</h1>
        <p className="text-apple-text-muted mb-8">Please initialize session to view your profile.</p>
        <button 
          onClick={() => router.push("?login=true")}
          className="px-6 py-2 border border-apple-border hover:bg-apple-border/20 rounded-md font-mono text-sm tracking-widest transition-colors"
        >
          Init_Session
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 flex items-center justify-center transition-colors relative z-10">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-apple-text mb-8 text-center tracking-tight">System_Profile</h1>
        
        <div className="glass-heavy p-8 relative flex flex-col items-center">
          
          {/* 3D Flipping Avatar Box */}
          <div 
            className="w-48 h-48 mb-8 cursor-pointer [perspective:1000px] relative"
            onClick={() => setIsFlipped(!isFlipped)}
            title="Click to reveal Identity Hash"
          >
            <div className={`absolute -top-2 -right-4 z-30 transform rotate-12 ${roleTag.color} px-4 py-1.5 text-xs font-bold font-mono tracking-widest shadow-2xl border-2 border-apple-bg`}>
              {roleTag.text}
            </div>
            <motion.div
              className="w-full h-full relative [transform-style:preserve-3d]"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              {/* FRONT FACE: Profile Photo */}
              <div 
                className="absolute inset-0 w-full h-full rounded-full border-4 border-apple-border overflow-hidden shadow-2xl bg-apple-bg flex items-center justify-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User Avatar" className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-20 h-20 text-apple-text-muted opacity-50" />
                )}
              </div>

              {/* BACK FACE: QR Code */}
              <div 
                className="absolute inset-0 w-full h-full rounded-full border-4 border-apple-accent overflow-hidden shadow-2xl bg-white flex items-center justify-center"
                style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
              >
                 <div className="p-3 bg-white rounded-2xl shadow-inner border border-zinc-100">
                   <QRCode 
                     value={`arise-user-${user.email || user.uid}`} 
                     size={130}
                     bgColor="#ffffff"
                     fgColor="#27272a" // zinc-800 for dots
                     qrStyle="dots"
                     ecLevel="Q" // Higher error correction for logo
                     eyeRadius={12} // Fully rounded corners
                     eyeColor="#0ea5e9" // tech blue eyes
                     logoImage="/logo.png"
                     logoWidth={35}
                     logoHeight={35}
                     logoPadding={2}
                     logoPaddingStyle="circle"
                   />
                 </div>
              </div>
            </motion.div>
          </div>

          <div className="text-center space-y-3 mb-8 w-full">
             <h2 className="text-2xl font-semibold text-apple-text flex items-center justify-center gap-2">
               {user.displayName || "Anonymous Engineer"}
             </h2>

             <div className="flex items-center justify-center gap-2 text-sm font-mono text-apple-text-muted bg-apple-border/10 px-3 py-2 rounded-md border border-apple-border/20 w-full mt-2">
               <Mail className="w-4 h-4 shrink-0" />
               <span className="truncate">{user.email || "No email linked"}</span>
             </div>
             
             <div className="text-xs font-mono text-apple-accent tracking-widest mt-4 flex flex-col gap-1">
               <span className="opacity-50">SYSTEM UID</span>
               <span className="break-all">{user.uid}</span>
             </div>

             {(() => {
               const githubScreenName = (user as any)?.reloadUserInfo?.screenName;
               const githubId = user?.providerData.find(p => p.providerId === 'github.com')?.uid;
               
               if (!githubScreenName && !githubId) return null;

               return (
                 <div className="text-xs font-mono text-apple-accent tracking-widest mt-4 flex flex-col gap-1">
                   <span className="opacity-50 flex justify-center items-center gap-1"><Github className="w-3 h-3" /> GIT USER</span>
                   {githubScreenName ? (
                     <a href={`https://github.com/${githubScreenName}`} target="_blank" rel="noopener noreferrer" className="break-all text-apple-text hover:underline hover:text-apple-accent transition-colors">
                       @{githubScreenName}
                     </a>
                   ) : (
                     <span className="break-all text-apple-text">{githubId}</span>
                   )}
                 </div>
               );
             })()}
          </div>

          <button 
             onClick={() => {
               signOut(auth);
               router.push("/");
             }}
             className="flex items-center justify-center gap-2 w-full py-3 border border-red-500/30 text-red-500 rounded-xl hover:bg-red-500/10 transition-colors"
          >
             <LogOut className="w-4 h-4" />
             <span className="font-mono text-sm tracking-widest">End_Session</span>
          </button>
        </div>
      </div>
    </div>
  );
}
