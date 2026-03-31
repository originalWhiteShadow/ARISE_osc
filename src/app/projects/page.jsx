import data from '../../data/content.json'

export default function Projects() {
  return (
    <div style={{ padding: '0 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', fontWeight: 900 }}>Dream Entities</h1>
        <p style={{ color: 'var(--text-muted)' }}>Explore the projects forged within the ARISE_osc ecosystem.</p>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {data.projects.map((p, idx) => (
          <article key={idx} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', minHeight: '200px' }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--text-main)', margin: '0 0 12px' }}>{p.title}</h2>
            <p style={{ color: 'var(--text-muted)', flex: 1, lineHeight: '1.6' }}>{p.summary}</p>
            <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ alignSelf: 'flex-start', color: 'var(--cyan)', borderBottom: '1px solid var(--cyan)', paddingBottom: '2px', fontWeight: 600, marginTop: '20px' }}>
              Inspect Source &rarr;
            </a>
          </article>
        ))}
      </div>
    </div>
  )
}
