import React, { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

export default function Background() {
  const particlesInit = useCallback(async engine => {
    await loadFull(engine)
  }, [])

  const options = {
    fullScreen: { enable: true, zIndex: 35 },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'repulse' },
        onClick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        repulse: { distance: 120 },
        push: { quantity: 4 }
      }
    },
    particles: {
      number: { value: 80, density: { enable: true, area: 900 } },
      color: { value: ['#ECC232', '#FFE900', '#BDBCB8'] },
      shape: { type: 'circle' },
      opacity: { value: 0.9, random: { enable: true, minimumValue: 0.35 } },
      size: { value: { min: 1, max: 5 } },
      links: { enable: true, distance: 140, color: 'random', opacity: 0.06, width: 1 },
      move: {
        enable: true,
        speed: 1.2,
        direction: 'none',
        random: false,
        straight: false,
        outModes: { default: 'out' }
      }
    },
    detectRetina: true
  }

  return (
    <div className="particles-wrap" aria-hidden>
      <Particles id="tsparticles" init={particlesInit} options={options} />
    </div>
  )
}
