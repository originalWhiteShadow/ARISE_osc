import React, { useRef, useEffect, useState } from 'react'
import '../styles/hero.css'

/**
 * Hero component — shows the main `ARISE_osc` title.
 * As the user scrolls the title zooms/fades away; the description used to reveal
 * but it was removed per user request. We calculate a `progress` (0..1)
 * based on the hero's position in the viewport to drive the animation.
 */
export default function Hero() {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0) // 0..1

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let ticking = false

    function onScroll() {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const height = rect.height || window.innerHeight
        // progress grows as the hero scrolls up; clamp between 0 and 1
        const raw = Math.min(Math.max(-rect.top / (height * 0.8), 0), 1)
        setProgress(raw)
        ticking = false
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Title animation: fade, move upward and scale up (zoom-away effect)
  const titleStyle = {
    opacity: Math.max(1 - progress * 1.5, 0),
    transform: `translateY(${progress * -140}px) scale(${1 + progress * 0.7})`,
    filter: `blur(${progress * 6}px)`,
    transformOrigin: 'center center',
    zIndex: 45,
    transition: 'none'
  }

  return (
    <section className="hero center-hero" ref={ref}>
      <div className="main-title" style={titleStyle}>
        <span className="big">ARISE</span>
        <span className="small">_osc</span>
      </div>
    </section>
  )
}
