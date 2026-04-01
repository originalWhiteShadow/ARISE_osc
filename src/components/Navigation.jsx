'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { name: 'Awakening', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Ecosystem', href: '/ecosystem' },
  { name: 'Ideas', href: '/ideas' },
  { name: 'Community', href: '/community' }
]

export default function Navigation() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="nav-header">
      <div className="nav-inner">
        
        {/* Mobile Hamburger Toggle (hidden on desktop) */}
        <button 
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={32} color="var(--cyan)" /> : <Menu size={32} color="var(--text-main)" />}
        </button>

        <nav className={`side-nav ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            {NAV_LINKS.map(link => {
              const isActive = pathname === link.href
              return (
                <li key={link.href} onClick={() => setMenuOpen(false)}>
                  <Link href={link.href} className={`nav-link ${isActive ? 'active' : ''}`}>
                    {link.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* Background clickaway overlay for mobile */}
      {menuOpen && <div className="side-nav-overlay" onClick={() => setMenuOpen(false)} />}
    </header>
  )
}
