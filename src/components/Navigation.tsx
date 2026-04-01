"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useLucidity } from "@/store/lucidity";
import { LucidityIndicator } from "./LucidityIndicator";
import { 
  IoSparkles, 
  IoGlobeOutline, 
  IoRocketOutline, 
  IoBulbOutline,
  IoPeople, 
  IoLogIn, 
  IoLibrary,
  IoMenu,
  IoCloseOutline 
} from "react-icons/io5";

const navItems = [
  { label: "Awakening", href: "/", icon: IoSparkles, color: "text-[--color-brand-cyan]" },
  { label: "Ecosystem", href: "/ecosystem", icon: IoGlobeOutline, color: "text-[--color-brand-pink]" },
  { label: "Projects", href: "/projects", icon: IoRocketOutline, color: "text-[--color-brand-gold]" },
  { label: "Ideas", href: "/ideas", icon: IoBulbOutline, color: "text-[--color-brand-violet]" },
  { label: "Community", href: "/community", icon: IoPeople, color: "text-[--color-brand-cyan]" },
  { label: "Portal", href: "/auth", icon: IoLogIn, color: "text-[--color-brand-pink]" },
  { label: "Knowledge", href: "/blog", icon: IoLibrary, color: "text-[--color-brand-gold]" },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { addPageVisit, incrementInteraction } = useLucidity();

  // Track page visits
  useEffect(() => {
    addPageVisit();
  }, [pathname, addPageVisit]);

  // Hide nav on landing page
  const isHome = pathname === "/";

  if (isHome) {
    return null;
  }

  const handleNavClick = () => {
    incrementInteraction();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 md:hidden btn btn-primary rounded-full w-14 h-14 flex items-center justify-center"
      >
        {isOpen ? <IoCloseOutline size={24} /> : <IoMenu size={24} />}
      </button>

      {/* Navigation Sidebar - Polished Glass Design */}
      <nav
        data-app-sidebar="true"
        className={`fixed left-0 top-0 h-screen w-64 z-40 transform transition-transform duration-300 md:translate-x-0 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{
          background: "linear-gradient(180deg, rgba(42, 15, 74, 0.3) 0%, rgba(2, 2, 4, 0.5) 100%)",
          backdropFilter: "blur(12px)",
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Logo Section - Premium */}
        <div className="p-6 border-b border-white/10">
          <Link
            href="/"
            className="flex items-baseline gap-1 group"
          >
            <span className="heading-3 text-transparent bg-clip-text bg-linear-to-r from-[--color-brand-cyan] to-[--color-brand-pink] group-hover:opacity-80 transition-opacity">
              ARISE
            </span>
            <span className="text-lg font-bold text-[--color-brand-gold]">_osc</span>
          </Link>
          <p className="caption mt-2">Conscious Collective</p>
        </div>

        {/* Navigation Items - Icon + Label */}
        <div className="flex-1 p-4 space-y-1 overflow-y-auto pb-24">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  setIsOpen(false);
                  handleNavClick();
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                  isActive
                    ? "bg-white/10 border border-[--color-brand-cyan]/30"
                    : "hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon className={`text-xl ${item.color} ${isActive ? "drop-shadow-lg" : "group-hover:scale-110 transition-transform"}`} />
                <span className={`body-sm font-semibold ${isActive ? "text-[--text-primary]" : "text-[--text-secondary]"}`}>
                  {item.label}
                </span>
                {isActive && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-[--color-brand-cyan] animate-pulse-subtle" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Lucidity Indicator - Premium Card */}
        <div className="mx-4 mb-6 p-4 glass rounded-lg">
          <LucidityIndicator />
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
