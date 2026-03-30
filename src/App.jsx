import React from 'react'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <div className="app-root">
      <header>
        <Navbar />
      </header>
      <main>
        <section className="hero center-hero">
          <h1 className="main-title">
            <span className="big">ARISE</span>
            <span className="small">_osc</span>
          </h1>
        </section>
      </main>
      <footer className="site-footer">© ARISE_osc</footer>
    </div>
  )
}
