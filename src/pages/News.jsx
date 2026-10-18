import { useState } from 'react'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import { news, newsCategories, announcements, formatDate } from '../data'

const parentTips = [
  'Read together for 15 minutes every night 📖',
  'Ask “What made you smile today?” instead of “How was school?” 😊',
  'Let your child help with simple chores — it builds confidence 🧺',
  'Keep a regular sleep schedule: 10–12 hours for young kids 😴',
  'Celebrate effort, not just results 🌟',
]

function NewsCard({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="card news-card">
      <div className="news-thumb" style={{ '--c': item.color }}><span>{item.icon}</span></div>
      <div className="news-body">
        <div><span className="tag" style={{ '--c': item.color, color: 'var(--ink)' }}>{item.category}</span></div>
        <h3>{item.title}</h3>
        <p>{item.excerpt}</p>
        {open && (
          <p>
            We’re so proud of our COLORS community! Families can learn more by visiting the school office or
            asking their class adviser. Stay tuned to this page for photos and follow-up stories.
          </p>
        )}
        <button className="read-more" onClick={() => setOpen((o) => !o)}>
          {open ? 'Show less ↑' : 'Read more →'}
        </button>
        <div className="news-meta">🗓️ {formatDate(item.date)} · ✍️ {item.author}</div>
      </div>
    </article>
  )
}

export default function News() {
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const term = q.trim().toLowerCase()
  const list = news.filter(
    (n) =>
      (cat === 'All' || n.category === cat) &&
      (!term || (n.title + n.excerpt).toLowerCase().includes(term)),
  )

  return (
    <>
      <PageHero emoji="📰" title="News & Education" subtitle="Announcements, school stories and learning tips for families." color="var(--orange)" />

      <section id="announcements">
        <div className="container" style={{ maxWidth: 900 }}>
          <SectionTitle eyebrow="📢 Announcements" title="What parents need to know" />
          <div className="announce-list">
            {announcements.map((a) => (
              <article key={a.id} className={`card announce ${a.level}`}>
                <span className="ico">{a.icon}</span>
                <div>
                  <span className="date">{a.level.toUpperCase()} · {formatDate(a.date)}</span>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container">
          <SectionTitle eyebrow="📚 Stories & Learning" title="News and education corner" />
          <input
            className="search"
            type="search"
            placeholder="🔍 Search articles..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search articles"
          />
          <div className="chips" role="group" aria-label="Filter articles">
            {newsCategories.map((c) => (
              <button key={c} className={`chip ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
          <div className="grid">
            {list.map((n) => <NewsCard key={n.id} item={n} />)}
          </div>
          {!list.length && <p className="empty">No articles found. Try another word! 🔎</p>}
        </div>
      </section>

      <section>
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="tips">
            <h2>💡 Quick tips for parents</h2>
            <ol>{parentTips.map((t) => <li key={t}>{t}</li>)}</ol>
          </div>
        </div>
      </section>
    </>
  )
}
