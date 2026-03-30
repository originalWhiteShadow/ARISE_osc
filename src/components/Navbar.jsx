import React, { useState } from 'react'

const NAV_ITEMS = ['Home', 'Projects', 'Startups', 'Sponsor']

export default function Navbar() {
  const [active, setActive] = useState('Home')

  return (
    <aside className="sidebar" aria-label="Main navigation">
      <div className="sidebar-inner">
        <div className="sidebar-top">
          <div className="sidebar-brand">ARISE_osc</div>
        </div>

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

        <div className="sidebar-bottom" />
      </div>
    </aside>
  )
}
