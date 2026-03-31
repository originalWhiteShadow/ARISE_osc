'use client'

import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function ParticlesBackground() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const options = {
    fullScreen: { enable: true, zIndex: 0 },
    background: { color: 'transparent' }, // background is handled by body
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse'
        },
        onClick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        repulse: {
          distance: 120,
          duration: 0.4
        },
        push: {
          quantity: 3
        }
      }
    },
    particles: {
      color: {
        value: ['#00f0ff', '#ff66b2', '#ffcc00', '#ffffff']
      },
      links: {
        color: '#00f0ff', // Dreamscape cyan connecting lines
        distance: 130, // Connect vertices that are close
        enable: true,
        opacity: 0.35,
        width: 1.2
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'bounce'
        },
        random: true,
        speed: 0.8, // Slower moving mesh
        straight: false
      },
      number: {
        density: {
          enable: true,
          area: 800
        },
        value: 120 // Highly connected density
      },
      opacity: {
        value: 0.6,
        random: true,
        animation: { enable: true, speed: 1, minimumValue: 0.2 }
      },
      shape: {
        type: 'circle'
      },
      size: {
        value: { min: 1, max: 3 }
      }
    },
    detectRetina: true
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none', overflow: 'hidden' }}>
      
      {/* Interactive Particle Mesh layer */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'auto', zIndex: 0 }}>
        {init && <Particles id="tsparticles" options={options} />}
      </div>

      {/* 2D Space Background Planets (In front of particles, behind UI) */}
      <div className="css-planet planet-1" style={{ zIndex: 1 }}></div>
      <div className="css-planet planet-2" style={{ zIndex: 1 }}></div>
      <div className="css-planet planet-3" style={{ zIndex: 1 }}></div>

    </div>
  )
}
