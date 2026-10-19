import { useState } from 'react'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import SanityImage from '../components/SanityImage'
import RichText from '../components/RichText'
import { ContentState, LoadingCards } from '../components/ContentState'
import useSanityQuery from '../hooks/useSanityQuery'
import { ANNOUNCEMENTS_QUERY, ARTICLES_QUERY, PARENT_TIPS_QUERY } from '../lib/queries'
import { formatDate, colorFor, palette } from '../data'

function NewsCard({ item }) {
  const [open, setOpen] = useState(false)
  const color = colorFor(item.category || item.title)
  return (
    <article className="card news-card">
      <div className="news-thumb" style={{ '--c': color }}>
        <SanityImage
          image={item.mainImage}
          aspect={2}
          sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 380px"
          maxWidth={1080}
          alt={item.mainImage?.alt || item.title}
          fallback={<span aria-hidden="true">📰</span>}
        />
      </div>
      <div className="news-body">
        {item.category && <div><span className="tag" style={{ '--c': color, color: 'var(--ink)' }}>{item.category}</span></div>}
        <h3>{item.title}</h3>
        {item.summary && <p>{item.summary}</p>}
        {open && <RichText value={item.body} />}
        {item.body?.length > 0 && (
          <button className="read-more" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? 'Show less ↑' : 'Read more →'}
          </button>
        )}
        <div className="news-meta">🗓️ {formatDate(item.date)}</div>
      </div>
    </article>
  )
}

function Announcement({ a, i }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="card announce" style={{ '--c': palette[(i * 2) % palette.length] }}>
      <span className="ico">📢</span>
      <div>
        <span className="date">ANNOUNCEMENT · {formatDate(a.date)}</span>
        <h3>{a.title}</h3>
        {a.summary && <p>{a.summary}</p>}
        {open && <RichText value={a.body} />}
        {a.body?.length > 0 && (
          <button className="read-more" onClick={() => setOpen((o) => !o)} aria-expanded={open} style={{ marginTop: 8 }}>
            {open ? 'Show less ↑' : 'Read more →'}
          </button>
        )}
      </div>
    </article>
  )
}

export default function News() {
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const ann = useSanityQuery(ANNOUNCEMENTS_QUERY)
  const art = useSanityQuery(ARTICLES_QUERY)
  const { data: tips } = useSanityQuery(PARENT_TIPS_QUERY)
  const announcements = ann.data || []
  const articles = art.data || []
  const parentTips = (tips || []).filter(Boolean)
  const categories = ['All', ...new Set(articles.map((n) => n.category).filter(Boolean))]

  const term = q.trim().toLowerCase()
  const list = articles.filter(
    (n) =>
      (cat === 'All' || n.category === cat) &&
      (!term || `${n.title} ${n.summary || ''}`.toLowerCase().includes(term)),
  )

  return (
    <>
      <PageHero emoji="📰" title="News & Education" subtitle="Announcements, school stories and learning tips for families." color="var(--orange)" />

      <section id="announcements">
        <div className="container" style={{ maxWidth: 900 }}>
          <SectionTitle eyebrow="📢 Announcements" title="What parents need to know" />
          <ContentState
            loading={ann.loading}
            error={ann.error}
            isEmpty={!announcements.length}
            empty="No announcements right now. 🎈"
            skeleton={<LoadingCards count={2} height={110} />}
          >
            {() => (
              <div className="announce-list">
                {announcements.map((a, i) => <Announcement key={a._id} a={a} i={i} />)}
              </div>
            )}
          </ContentState>
        </div>
      </section>

      <section className="bg-white">
        <div className="container">
          <SectionTitle eyebrow="📚 Stories & Learning" title="News and education corner" />
          <ContentState
            loading={art.loading}
            error={art.error}
            isEmpty={!articles.length}
            empty="School stories and learning tips are coming soon! 📚"
          >
            {() => (
              <>
                <input
                  className="search"
                  type="search"
                  placeholder="🔍 Search articles..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  aria-label="Search articles"
                />
                {categories.length > 2 && (
                  <div className="chips" role="group" aria-label="Filter articles">
                    {categories.map((c) => (
                      <button key={c} className={`chip ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>
                    ))}
                  </div>
                )}
                <div className="grid">
                  {list.map((n) => <NewsCard key={n._id} item={n} />)}
                </div>
                {!list.length && <p className="empty">No articles found. Try another word! 🔎</p>}
              </>
            )}
          </ContentState>
        </div>
      </section>

      {parentTips.length > 0 && (
        <section>
          <div className="container" style={{ maxWidth: 900 }}>
            <div className="tips">
              <h2>💡 Quick tips for parents</h2>
              <ol>{parentTips.map((t, i) => <li key={i}>{t}</li>)}</ol>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
