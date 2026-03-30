import React, { useState } from 'react'

const NAV_ITEMS = ['Home', 'Projects', 'Startups', 'Sponsor']

export default function Navbar() {
  const [active, setActive] = useState('Home')

  return (
    <aside className="sidebar" aria-label="Main navigation">
      <div className="sidebar-inner">
        <nav className="sidebar-nav">
          <ul>
            {NAV_ITEMS.map(item => (
              <li key={item}>
                <button
                  className={`sidebar-link ${active === item ? 'active' : ''}`}
                  onClick={() => setActive(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="sidebar-bottom">
          <button className="profile" aria-label="Profile">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" fill="currentColor" opacity="0.95"/>
              <path d="M2 22c0-3.866 3.582-7 10-7s10 3.134 10 7v1H2v-1z" fill="currentColor" opacity="0.9"/>
            </svg>
          </button>
        </div>
      </div>
    </aside>
  )
}
