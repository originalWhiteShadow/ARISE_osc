import data from '../data/content.json'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="home-container" style={{ padding: '0 24px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Hero Section */}
      <section style={{ height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 900, letterSpacing: '4px', textShadow: '0 0 20px rgba(0,240,255,0.4)', color: 'var(--text-main)', margin: '0' }}>
          ARISE<span style={{ color: 'var(--cyan)' }}>_osc</span>
        </h1>
        <p style={{ marginTop: '20px', fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', backdropFilter: 'blur(4px)' }}>
          A living dream ecosystem where projects, ideas, people, and knowledge evolve together.
        </p>
        <Link href="/ecosystem" style={{ marginTop: '40px', padding: '12px 32px', background: 'rgba(0, 240, 255, 0.1)', border: '1px solid var(--cyan)', borderRadius: '30px', color: 'var(--cyan)', fontWeight: 'bold', textShadow: '0 0 8px var(--cyan)', transition: 'all 0.3s ease', boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)' }}>
          Enter the Dream
        </Link>
      </section>

      {/* News Highlights */}
      <section style={{ padding: '4rem 0' }}>
        <h2 style={{ color: 'var(--cyan)', textShadow: '0 0 10px rgba(0,240,255,0.3)', marginBottom: '2rem' }}>Transmissions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {data.news.map((item, idx) => (
            <article key={idx} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-main)' }}>{item.title}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--pink)' }}>{item.date}</span>
              </div>
              <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: '1.6', flex: 1 }}>{item.summary}</p>
              <button style={{ alignSelf: 'flex-start', color: 'var(--gold)', fontSize: '0.9rem', borderBottom: '1px solid var(--gold)', paddingBottom: '2px' }}>
                Decrypt Node &rarr;
              </button>
            </article>
          ))}
        </div>
      </section>

    </div>
  )
}
