"use client";

import Link from "next/link";
import { useState } from "react";
import { IoMenu, IoCloseOutline } from "react-icons/io5";

export function HomeNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Awakening", href: "/" },
    { label: "Ecosystem", href: "/ecosystem" },
    { label: "Projects", href: "/projects" },
    { label: "Community", href: "/community" },
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

          {/* Mobile Menu Toggle - Anchored to Right */}
          <button 
            className="md:hidden absolute right-4 sm:right-6 p-2 text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <IoMenu size={28} />
          </button>
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
