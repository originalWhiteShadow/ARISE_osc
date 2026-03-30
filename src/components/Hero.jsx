import React, { useRef, useEffect, useState } from 'react'

export default function Hero() {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0) // 0..1

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let ticking = false

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect()
          const height = rect.height || window.innerHeight
          // when top goes negative, progress grows from 0 -> 1
          const raw = Math.min(Math.max(-rect.top / (height * 0.6), 0), 1)
          setProgress(raw)
          ticking = false
        })
        ticking = true
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const titleStyle = {
    opacity: Math.max(1 - progress * 1.2, 0),
    transform: `translateY(${progress * -30}px) scale(${1 - progress * 0.05})`,
  }

  const descStyle = {
    opacity: Math.min(progress * 1.25, 1),
    transform: `translateY(${Math.max(20 - progress * 20, 0)}px)`,
    pointerEvents: progress > 0.05 ? 'auto' : 'none'
  }

  return (
    <section className="hero center-hero" ref={ref}>
      <div className="main-title" style={titleStyle}>
        <span className="big">ARISE</span>
        <span className="small">_osc</span>
      </div>

      <div className="description" style={descStyle}>
        <p>
          ARISE is an open source community where builders, designers and
          founders collaborate on projects and startups — share ideas, ship
          prototypes, and grow together.
        </p>
      </div>
    </section>
  )
}
