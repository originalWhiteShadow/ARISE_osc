import React, { useCallback, useEffect, useRef, useState } from 'react'
import '../styles/background.css'

/**
 * Lazy-loaded Background particle layer.
 * This component dynamically imports `react-tsparticles` and `tsparticles` at runtime
 * to avoid bundling them into the initial application chunk.
 */
export default function Background() {
  const [ParticlesComp, setParticlesComp] = useState(null)
  const loadFullRef = useRef(null)

  useEffect(() => {
    let mounted = true
    // Dynamically import the runtime-heavy modules. These will be split into separate chunks.
    const load = async () => {
      try {
        const [{ default: Particles }, tsp] = await Promise.all([
          import('react-tsparticles'),
          import('tsparticles')
        ])
        if (!mounted) return
        setParticlesComp(() => Particles)
        // store loadFull so the `init` callback can call it when engine is available
        loadFullRef.current = tsp.loadFull || (tsp.default && tsp.default.loadFull)
      } catch (err) {
        // If import fails (e.g., package removed), silently fail and skip background
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [])

  const particlesInit = useCallback(async (engine) => {
    if (loadFullRef.current) {
      await loadFullRef.current(engine)
    }
  }, [])

  // Simplified options kept small to reduce runtime work inside the particle engine.
  const options = {
    fullScreen: { enable: true, zIndex: 35 },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'repulse' },
        onClick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: { repulse: { distance: 120 }, push: { quantity: 4 } }
    },
    particles: {
      number: { value: 36, density: { enable: true, area: 900 } },
      color: { value: ['#ECC232', '#FFE900', '#BDBCB8'] },
      shape: { type: 'circle' },
      opacity: { value: 0.8, random: { enable: true, minimumValue: 0.25 } },
      size: { value: { min: 0.8, max: 3.0 } },
      links: { enable: true, distance: 110, color: '#ECC232', opacity: 0.04, width: 1 },
      move: { enable: true, speed: 0.5, random: true, outModes: { default: 'out' } }
    },
    detectRetina: true
  }

  if (!ParticlesComp) {
    // Render nothing while the heavy modules are loading — keeps initial paint small.
    return null
  }

  return (
    <div className="particles-wrap" aria-hidden>
      <ParticlesComp id="tsparticles" init={particlesInit} options={options} />
    </div>
  )
}
