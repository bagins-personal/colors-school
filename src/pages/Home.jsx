import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import SectionTitle from '../components/SectionTitle'
import EventItem from '../components/EventItem'
import PhotoTile from '../components/PhotoTile'
import Lightbox from '../components/Lightbox'
import CountUp from '../components/CountUp'
import { school, programs, stats, events, news, gallery, announcements, formatDate } from '../data'

const floaties = [
  { e: '🖍️', s: { left: '6%', top: '14%' } },
  { e: '⭐', s: { right: '8%', top: '10%', animationDelay: '-2s' } },
  { e: '🎈', s: { left: '12%', bottom: '18%', animationDelay: '-4s' } },
  { e: '🧩', s: { right: '12%', bottom: '22%', animationDelay: '-1s' } },
  { e: '🌈', s: { left: '44%', top: '4%', animationDelay: '-3s' } },
]

export default function Home() {
  const [lb, setLb] = useState(null)
  const today = new Date().toISOString().slice(0, 10)
  const upcoming = events.filter((e) => e.date >= today).slice(0, 3)
  const preview = gallery.slice(0, 4)
  const topAnnouncement = announcements[0]
  const close = useCallback(() => setLb(null), [])
  const move = useCallback((d) => setLb((i) => (i + d + preview.length) % preview.length), [preview.length])

  return (
    <>
      <section className="hero">
        <div className="floaties" aria-hidden="true">
          {floaties.map((f, i) => <span key={i} style={f.s}>{f.e}</span>)}
        </div>
        <div className="container">
          <h1><Logo size="xl" /></h1>
          <div className="sub">Preschool &amp; Grade School</div>
          <p className="lead">{school.tagline} A happy, safe and playful place where little minds grow big dreams — from first crayons to Grade 6 graduation.</p>
          <div className="hero-cta">
            <Link to="/about#enroll" className="btn btn-pink">🎒 Enroll for SY 2027–2028</Link>
            <Link to="/about" className="btn btn-white">🌈 Discover COLORS</Link>
          </div>
        </div>
      </section>

      <div className="container">
        <article className="card announce urgent" style={{ marginTop: -40 }}>
          <span className="ico">{topAnnouncement.icon}</span>
          <div>
            <span className="date">Announcement · {formatDate(topAnnouncement.date)}</span>
            <h3>{topAnnouncement.title}</h3>
            <p>{topAnnouncement.text} <Link to="/news#announcements" style={{ color: 'var(--blue)', fontWeight: 800 }}>See all announcements →</Link></p>
          </div>
        </article>
      </div>

      <section>
        <div className="container">
          <SectionTitle eyebrow="🎒 Our Programs" title="Learning in every color">
            From playful preschool days to confident grade schoolers, every program is designed around how children learn best.
          </SectionTitle>
          <div className="grid">
            {programs.map((p) => (
              <article key={p.title} className="card program" style={{ '--c': p.color }}>
                <div className="icon">{p.icon}</div>
                <div className="ages">{p.ages}</div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="stats-band">
        <div className="container stats">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <strong><CountUp to={s.value} />{s.suffix}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <section>
        <div className="container split">
          <div>
            <div className="row-head">
              <h2>📅 Upcoming Events</h2>
              <Link to="/events">All events →</Link>
            </div>
            {upcoming.map((e) => <EventItem key={e.id} event={e} />)}
          </div>
          <div>
            <div className="row-head">
              <h2>📰 Latest News</h2>
              <Link to="/news">More →</Link>
            </div>
            {news.slice(0, 3).map((n) => (
              <Link to="/news" key={n.id} className="card announce" style={{ '--c': n.color, marginBottom: 16 }}>
                <span className="ico">{n.icon}</span>
                <div>
                  <span className="date" style={{ color: 'var(--muted)' }}>{n.category} · {formatDate(n.date)}</span>
                  <h3>{n.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container">
          <SectionTitle eyebrow="📸 Gallery" title="Snapshots of happy days" />
          <div className="gallery-grid">
            {preview.map((g, i) => <PhotoTile key={g.id} item={g} onClick={() => setLb(i)} />)}
          </div>
          <p className="center" style={{ marginTop: 30 }}>
            <Link to="/gallery" className="btn btn-green">See the full gallery →</Link>
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="cta-band">
            <h2>Come visit us — kids welcome! 🧒👧</h2>
            <p>Book a campus tour and see our classrooms, playground and library in action.</p>
            <div className="btns">
              <Link to="/about#enroll" className="btn btn-pink">Book a tour</Link>
              <a href={`tel:${school.phone}`} className="btn">📞 {school.phone}</a>
            </div>
          </div>
        </div>
      </section>

      {lb !== null && (
        <Lightbox items={preview} index={lb} onClose={close} onMove={move} />
      )}
    </>
  )
}
