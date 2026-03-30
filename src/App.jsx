import React from 'react'
import Navbar from './components/Navbar'
import Background from './components/Background'
import Hero from './components/Hero'

export default function App() {
  return (
    <div className="app-root">
      <Background />
      <Navbar />
      <main>
        <Hero />
      </main>
      <footer className="site-footer">© ARISE_osc</footer>
    </div>
  )
}
