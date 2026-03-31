import React, { useState, useEffect, Suspense, lazy } from 'react'
import data from './data/content.json'
import './styles/projects.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import NewsHighlights from './components/NewsHighlights'

/**
 * App root — keeps a small `active` state to switch between tabs.
 * The Navbar is rendered as a controlled component (passes `active` and `onChange`).
 */
export default function App() {
  const [active, setActive] = useState('Home')
  const [showBackground, setShowBackground] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Lazy-load the Background component after initial paint to reduce bundle impact
  const Background = lazy(() => import('./components/Background'))

  useEffect(() => {
    const t = setTimeout(() => setShowBackground(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="app-root">
      {showBackground && (
        <Suspense fallback={null}>
          <Background />
        </Suspense>
      )}
      <Navbar active={active} onChange={setActive} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className={menuOpen ? 'menu-open' : ''}>
        {active === 'Home' ? (
          <>
            <Hero />
            <NewsHighlights />
          </>
        ) : (
          <section className="tab-content">
            {active === 'Projects' && (
              <div className="tab-placeholder">
                <h2>Projects</h2>
                <div className="projects-grid">
                  {data.projects.map((p, idx) => (
                    <article className="project-card" key={idx}>
                      <div className="project-info">
                        <strong className="project-title">{p.title}</strong>
                        <p className="project-desc muted">{p.summary}</p>
                      </div>
                      <div className="project-actions">
                        <a className="project-cta" href={p.link} target="_blank" rel="noopener noreferrer">View</a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
            {active === 'Startups' && (
              <div className="tab-placeholder">
                <h2>Startups</h2>
                <p>Some projects from our open source community are being converted to startups — this section will highlight teams, roadmaps, and ways to get involved.</p>
              </div>
            )}
            {active === 'Sponsor' && (
              <div className="tab-placeholder">
                <h2>Sponsor</h2>
                <p className="muted">Information for sponsors and partners.</p>
              </div>
            )}
            {active === 'Learn' && (
              <div className="tab-placeholder">
                <h2>Learn</h2>
                <p className="muted">Guides, tutorials, and onboarding resources for new contributors.</p>
              </div>
            )}
            {active === 'News' && (
              <div className="tab-placeholder">
                <h2>News</h2>
                <p className="muted">Latest announcements and changelogs.</p>
              </div>
            )}
          </section>
        )}
      </main>
      <footer className="site-footer">© ARISE_osc</footer>
    </div>
  )
}
