import React from 'react'
import data from '../data/content.json'
import '../styles/news.css'

/**
 * Small list of news highlights. Kept local/static for now — can be
 * replaced with dynamic content fetched from an API later.
 */
export default function NewsHighlights() {
  const items = data.news

  return (
    <section className="news-section">
      <div className="news-inner">
        <h2 className="news-title">News & Highlights</h2>
        <div className="news-grid">
          {items.map((it, idx) => (
            <article className="news-card" key={idx}>
              <div className="news-meta">
                <strong className="news-card-title">{it.title}</strong>
                <span className="news-date">{it.date}</span>
              </div>
              <p className="news-summary">{it.summary}</p>
              <button className="news-cta" aria-label={`Read more about ${it.title}`}>Read</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
