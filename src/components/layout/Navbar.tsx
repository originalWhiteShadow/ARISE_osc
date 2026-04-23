"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Flashlight, User, Download } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/components/providers/AuthProvider';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[70] apple-nav-glass border-b border-apple-border/30 h-14 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="font-semibold text-lg tracking-tight text-apple-text flex items-center gap-2 z-50">
            {/* Custom ARISE Logo Image */}
            <div className="relative w-7 h-7 flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="ARISE Logo"
                fill
                className="object-contain invert dark:invert-0"
              />
            </div>
            <span className="font-mono tracking-[0.1em] uppercase text-sm">ARISE</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-8 text-[13px] font-mono uppercase tracking-wider text-apple-text-muted">
            <Link href="/projects" className="hover:text-apple-text hover:-translate-y-0.5 transition-all">Projects</Link>
            <Link href="/newsroom" className="hover:text-apple-text hover:-translate-y-0.5 transition-all">Newsroom</Link>
            <Link href="/learn" className="hover:text-apple-text hover:-translate-y-0.5 transition-all">Knowledge</Link>
            <Link href="/#organizations" className="hover:text-apple-text hover:-translate-y-0.5 transition-all">Organizations</Link>
            <Link href="/about" className="hover:text-apple-text hover:-translate-y-0.5 transition-all">About</Link>
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => window.dispatchEvent(new Event('toggle-torch'))}
              className="p-2 text-apple-text hover:bg-apple-border/20 rounded-md transition-colors"
              title="Toggle Torch Mode"
            >
              <Flashlight className="w-4 h-4" />
            </button>
            <ThemeToggle />
            {!loading && user ? (
              <div className="flex items-center gap-4">
                <Link href="/profile" className="flex items-center gap-2 group relative" title="Access System Profile">
                  {user.email === "whiteshadowpoorna@gmail.com" && (
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-apple-bg z-10 animate-pulse" />
                  )}
                  <div className="w-8 h-8 rounded-full border border-apple-border group-hover:border-apple-accent overflow-hidden flex items-center justify-center bg-apple-border/20 transition-colors">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-4 h-4 text-apple-text-muted group-hover:text-apple-accent transition-colors" />
                    )}
                  </div>
                </Link>
              </div>
            ) : (
              <Link 
                href="?login=true" 
                className="px-4 py-1.5 text-[12px] font-mono uppercase tracking-widest rounded-none border border-apple-text text-apple-text hover:bg-apple-text hover:text-apple-bg transition-colors"
              >
                Init_Session
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-1 z-50">
            <button 
              onClick={() => window.dispatchEvent(new Event('toggle-torch'))}
              className="p-1.5 text-apple-text hover:bg-apple-border/20 rounded-md transition-colors"
            >
              <Flashlight className="w-4 h-4" />
            </button>
            <ThemeToggle />
            {!loading ? (
              user ? (
                <Link href="/profile" className="flex items-center justify-center w-8 h-8 mx-1 group relative rounded-full border border-apple-border overflow-hidden bg-apple-border/20" title="Access System Profile">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-4 h-4 text-apple-text-muted" />
                  )}
                </Link>
              ) : (
                <Link href="?login=true" className="flex items-center justify-center w-8 h-8 mx-1 group relative rounded-full border border-apple-border overflow-hidden bg-apple-border/20" title="Login">
                  <User className="w-4 h-4 text-apple-text-muted" />
                </Link>
              )
            ) : null}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-apple-text flex flex-col justify-center items-center w-8 h-8 relative"
            >
              <div className={`w-5 h-0.5 bg-current transition-all absolute ${mobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
              <div className={`w-5 h-0.5 bg-current transition-all absolute ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <div className={`w-5 h-0.5 bg-current transition-all absolute ${mobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-apple-bg/95 backdrop-blur-xl flex flex-col items-center justify-center pt-20"
          >
            <nav className="flex flex-col items-center gap-8 text-xl font-mono uppercase tracking-[0.2em] text-apple-text">
              <Link href="/projects" onClick={() => setMobileMenuOpen(false)} className="hover:text-apple-accent transition-colors">Projects</Link>
              <Link href="/newsroom" onClick={() => setMobileMenuOpen(false)} className="hover:text-apple-accent transition-colors">Newsroom</Link>
              <Link href="/learn" onClick={() => setMobileMenuOpen(false)} className="hover:text-apple-accent transition-colors">Knowledge</Link>
              <Link href="/#organizations" onClick={() => setMobileMenuOpen(false)} className="hover:text-apple-accent transition-colors">Organizations</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-apple-accent transition-colors">About</Link>
              
              <div className="mt-8 pt-8 border-t border-apple-border/50 flex w-48 justify-center">
                {!loading && !user && (
                  <Link 
                    href="?login=true" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-6 py-3 border border-apple-text hover:bg-apple-text hover:text-apple-bg transition-colors"
                  >
                    Init_Auth
                  </Link>
                )}
              </div>
            </nav>
            {/* Background wireframe for mobile menu */}
            <div className="absolute inset-0 pointer-events-none -z-10 opacity-10" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, var(--border) 40px, var(--border) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, var(--border) 40px, var(--border) 41px)'
            }} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
