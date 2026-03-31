export default function Ecosystem() {
  return (
    <div style={{ padding: '0 24px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
      <header style={{ padding: '4rem 0' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', fontWeight: 900 }}>The Universe</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Network visualization of all clusters, roles, and connections within the dream ecosystem.
        </p>
      </header>
      
      <div className="glass-panel" style={{ width: '100%', height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--cyan)', opacity: 0.6, fontSize: '1.2rem', letterSpacing: '2px' }}>NODE MAP SYNCHRONIZING...</p>
      </div>
    </div>
  )
}
