import React, { useState } from 'react'
import '../styles/navbar.css'

/**
 * Navbar component — renders the top navigation and profile button.
 * Accepts optional `active` and `onChange` props so parent can control
 * the active tab (controlled vs uncontrolled usage).
 */
const NAV_ITEMS = ['Home', 'Projects', 'Startups', 'Sponsor', 'Learn', 'News']

export default function Navbar({ active: activeProp, onChange }) {
  const [internalActive, setInternalActive] = useState(activeProp || 'Home')
  const [menuOpen, setMenuOpen] = useState(false)
  const active = activeProp ?? internalActive

  function handleClick(item) {
    if (onChange) onChange(item)
    else setInternalActive(item)
    setMenuOpen(false)
  }

  return (
    <header className="nav" role="banner">
      <div className="nav-inner">
        <button
          className="hamburger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>

        <ul className={`nav-list${menuOpen ? ' open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <button
                className={`nav-link ${active === item ? 'active' : ''}`}
                onClick={() => handleClick(item)}
                aria-pressed={active === item}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        <button className="profile" aria-label="Profile">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" fill="currentColor" opacity="0.95"/>
            <path d="M2 22c0-3.866 3.582-7 10-7s10 3.134 10 7v1H2v-1z" fill="currentColor" opacity="0.9"/>
          </svg>
        </button>
      </div>
    </header>
  )
}
