export default function Ideas() {
  return (
    <div style={{ padding: '0 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', fontWeight: 900 }}>Idea Seeds</h1>
        <p style={{ color: 'var(--text-muted)' }}>Incubation chamber for new concepts and proposals.</p>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <article className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ color: 'var(--text-main)', margin: '0 0 8px' }}>Project Atlas UI Module</h3>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>A proposal to separate component architecture.</p>
          </div>
          <button style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--gold)', color: 'var(--gold)' }}>Cultivate</button>
        </article>
      </div>
    </div>
  )
}
