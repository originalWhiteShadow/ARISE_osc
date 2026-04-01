"use client";

import Link from "next/link";
import { useState } from "react";
import { IoMenu, IoCloseOutline, IoPersonOutline } from "react-icons/io5";

export function HomeNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Awakening", href: "/" },
    { label: "Ecosystem", href: "/ecosystem" },
    { label: "Projects", href: "/projects" },
    { label: "Community", href: "/community" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-xl border-b border-white/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-center relative z-10 w-full">
          
          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center justify-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                className="text-sm font-bold tracking-wide text-white/70 hover:text-white hover:scale-105 transition-all duration-300 uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="absolute right-4 sm:right-6 flex items-center gap-2 sm:gap-4">
            {/* Account Profile Icon with Hover Dropdown */}
            <div className="relative group">
              <Link 
                href="/profile" 
                className="p-2 text-white/70 hover:text-white hover:scale-110 transition-all rounded-full glass border border-white/10 flex items-center justify-center cursor-pointer"
                aria-label="Account"
              >
                <IoPersonOutline size={20} />
              </Link>
              
              {/* Dropdown Popup */}
              <div className="absolute right-0 top-full mt-3 w-64 rounded-2xl glass border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 p-5 backdrop-blur-[24px]">
                 <div className="flex items-center gap-4 mb-4">
                     <div className="w-12 h-12 rounded-full bg-linear-to-br from-[--color-brand-cyan] to-[--color-brand-pink] shrink-0 border-2 border-white/20 shadow-inner flex items-center justify-center text-white font-bold opacity-90">
                       GN
                     </div>
                     <div>
                        <p className="text-sm font-bold text-white tracking-wide">Guest Node</p>
                        <p className="text-xs text-[--color-brand-cyan] mt-0.5 font-medium tracking-wider">TIER: OBSERVER</p>
                     </div>
                 </div>
                 <hr className="border-white/10 mb-5" />
                 <Link href="/profile" className="flex items-center justify-center w-full text-sm font-bold text-black bg-white rounded-xl py-2.5 hover:bg-gray-200 transition-colors shadow-md">
                    View Full Profile
                 </Link>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <IoMenu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col md:hidden animate-fade-in">
          <div className="flex items-center justify-end p-6">
            <button 
              className="p-2 text-white/80 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <IoCloseOutline size={32} />
            </button>
          </div>
          
          <nav className="flex flex-col flex-1 items-center justify-center gap-8 pb-20">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-black text-white/80 hover:text-white tracking-tight"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
