import './globals.css'
import Navigation from '../components/Navigation'
import ParticlesBackground from '../components/ParticlesBackground'

export const metadata = {
  title: 'ARISE_osc - Lucid Community',
  description: 'Open Source Community Website inside a Dreamscape',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ParticlesBackground />
        
        {/* Navigation Portal */}
        <Navigation />
        
        {/* Main Content Pages */}
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  )
}
