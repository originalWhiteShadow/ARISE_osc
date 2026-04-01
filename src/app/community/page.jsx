export default function Community() {
  return (
    <div style={{ padding: '0 24px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
      <header style={{ padding: '4rem 0' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', fontWeight: 900 }}>Presence</h1>
        <p style={{ color: 'var(--text-muted)' }}>Live activity and connection graph for active members.</p>
      </header>
      
      <div className="glass-panel" style={{ padding: '40px' }}>
        <h2 style={{ color: 'var(--pink)' }}>Global Resonance</h2>
        <p style={{ color: 'var(--text-muted)' }}>Monitoring live community signals...</p>
      </div>
    </div>
  )
}
