"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { motion } from "framer-motion";
import { useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { LogOut, Mail, User as UserIcon, ShieldAlert, Key, Edit2, Check, Cpu, X as XIcon } from "lucide-react";
import { auth, db } from "@/lib/firebase/config";
import { signOut, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AtSign } from "lucide-react";
import { encryptData, decryptData } from "@/lib/utils/encryption";

const PREDEFINED_AVATARS = [
  "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=arise1",
  "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=arise2",
  "https://api.dicebear.com/9.x/shapes/svg?seed=tech1",
  "https://api.dicebear.com/9.x/shapes/svg?seed=tech2",
  "https://api.dicebear.com/9.x/shapes/svg?seed=tech3",
  "https://api.dicebear.com/9.x/identicon/svg?seed=cyber1"
];

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [isFlipped, setIsFlipped] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [githubUsername, setGithubUsername] = useState<string | null>(null);
  const router = useRouter();

  // New states for Avatar & AI Settings
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isSavingKey, setIsSavingKey] = useState(false);
  const [savedKeyObfuscated, setSavedKeyObfuscated] = useState("");

  useEffect(() => {
    if (user?.uid) {
      getDoc(doc(db, "users", user.uid)).then(async (snap) => {
        if (snap.exists()) {
          setRole(snap.data().role);
          const encryptedKey = snap.data().openAiKey;
          if (encryptedKey) {
            const decrypted = await decryptData(encryptedKey, user.uid);
            if (decrypted) {
              setSavedKeyObfuscated(`AIza...${decrypted.slice(-4)}`);
            }
          }
        }
      });
    }

    // Resolve GitHub Username from numeric UID
    const screenName = (user as any)?.reloadUserInfo?.screenName;
    if (screenName) {
      setGithubUsername(screenName);
      return;
    }

    const githubProvider = user?.providerData.find(p => p.providerId === 'github.com');
    if (githubProvider?.uid) {
      fetch(`https://api.github.com/user/${githubProvider.uid}`)
        .then(res => res.json())
        .then(data => {
          if (data.login) {
            setGithubUsername(data.login);
          } else {
            setGithubUsername(githubProvider.uid);
          }
        })
        .catch(() => setGithubUsername(githubProvider.uid));
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
    return { text: '#MEMBER', color: 'bg-apple-border/20 text-apple-text-muted border border-apple-border/50' };
  };

  const handleUpdateAvatar = async (url: string) => {
    if (user) {
      await updateProfile(user, { photoURL: url });
      setShowAvatarModal(false);
      window.location.reload(); // Refresh to see changes across app
    }
  };

  const handleSaveApiKey = async () => {
    if (!user || !apiKey) return;
    setIsSavingKey(true);
    try {
      const encrypted = await encryptData(apiKey, user.uid);
      await setDoc(doc(db, "users", user.uid), { openAiKey: encrypted }, { merge: true });
      setSavedKeyObfuscated(`AIza...${apiKey.slice(-4)}`);
      setApiKey("");
    } catch (e) {
      console.error(e);
    }
    setIsSavingKey(false);
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
    <div className="min-h-screen pt-32 pb-12 px-4 flex flex-col items-center justify-center transition-colors relative z-10">
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
            
            {/* Edit Avatar Button */}
            <button 
              onClick={() => setShowAvatarModal(true)}
              className="absolute -bottom-2 -right-2 bg-apple-bg border border-apple-border text-apple-text p-2 rounded-full hover:text-apple-accent hover:border-apple-accent transition-colors shadow-xl z-20"
              title="Change Avatar"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center space-y-3 mb-8 w-full">
             <h2 className="text-2xl font-semibold text-apple-text flex items-center justify-center gap-2">
               {user.displayName || "Anonymous Engineer"}
             </h2>

             <div className="flex items-center justify-center gap-2 text-sm font-mono text-apple-text-muted bg-apple-border/10 px-3 py-2 rounded-md border border-apple-border/20 w-full mt-2">
               <Mail className="w-4 h-4 shrink-0" />
               <span className="truncate">{user.email || "No email linked"}</span>
             </div>
             
             {githubUsername && (
               <div className="text-xs font-mono tracking-widest mt-4 flex justify-center">
                 <a 
                   href={`https://github.com/${githubUsername}`} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="break-all text-apple-text hover:underline hover:text-apple-accent transition-colors flex items-center gap-1.5 px-3 py-1.5 bg-apple-border/10 rounded-full border border-apple-border/20"
                 >
                   <AtSign className="w-3.5 h-3.5 text-apple-accent" /> 
                   @{githubUsername}
                 </a>
               </div>
             )}
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

        {/* AI Configuration Section */}
        <div className="w-full max-w-[400px] mt-6 apple-card glass-heavy p-6 md:p-8 flex flex-col items-center border border-apple-border/20 z-10 shadow-2xl">
          <div className="flex items-center gap-2 mb-4 text-apple-text font-semibold">
            <Cpu className="w-5 h-5 text-apple-accent" />
            <h3>AI Configuration</h3>
          </div>
          <p className="text-xs text-apple-text-muted text-center mb-6 leading-relaxed">
            Connect your Gemini API Key to enable the floating AI Assistant. Your key is securely encrypted locally before being saved.
          </p>
          
          <div className="w-full flex flex-col gap-3">
            {savedKeyObfuscated && (
              <div className="flex items-center justify-between px-3 py-2 bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-mono rounded-md mb-2">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5" /> Key Connected
                </div>
                <span>{savedKeyObfuscated}</span>
              </div>
            )}
            <input 
              type="password"
              placeholder="AIza..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-apple-border/10 border border-apple-border/30 rounded-md px-4 py-2.5 text-sm text-apple-text focus:outline-none focus:border-apple-accent focus:bg-apple-border/20 transition-all font-mono"
            />
            <button 
              onClick={handleSaveApiKey}
              disabled={isSavingKey || !apiKey}
              className="w-full py-2.5 bg-apple-text text-apple-bg rounded-md text-sm font-semibold disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
            >
              {isSavingKey ? "Encrypting..." : <><Key className="w-4 h-4" /> Save Encrypted Key</>}
            </button>
          </div>
        </div>

      </div>

      {/* Avatar Selection Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="apple-card glass-heavy max-w-lg w-full p-6 relative flex flex-col">
            <button 
              onClick={() => setShowAvatarModal(false)}
              className="absolute top-4 right-4 p-2 text-apple-text-muted hover:text-apple-text transition-colors"
            >
              <XIcon className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-apple-text mb-2">Select Avatar</h3>
            <p className="text-sm text-apple-text-muted mb-6">Choose an identity protocol for your profile.</p>
            
            <div className="grid grid-cols-3 gap-4">
              {PREDEFINED_AVATARS.map((url, i) => (
                <button 
                  key={i}
                  onClick={() => handleUpdateAvatar(url)}
                  className="relative aspect-square rounded-xl border-2 border-transparent hover:border-apple-accent overflow-hidden bg-black/20 group transition-all"
                >
                  <img src={url} alt={`Avatar ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </button>
              ))}
            </div>

            {user?.providerData.find(p => p.providerId === 'google.com')?.photoURL && (
              <button 
                onClick={() => handleUpdateAvatar(user.providerData.find(p => p.providerId === 'google.com')!.photoURL!)}
                className="mt-6 w-full py-2 border border-apple-border/50 text-apple-text text-sm rounded-md hover:bg-apple-border/20 transition-colors"
              >
                Revert to Google Photo
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
