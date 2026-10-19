import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import SectionTitle from '../components/SectionTitle'
import EventItem from '../components/EventItem'
import PhotoTile from '../components/PhotoTile'
import Lightbox from '../components/Lightbox'
import CountUp from '../components/CountUp'
import SanityImage from '../components/SanityImage'
import { LoadingCards, ErrorNote, EmptyNote } from '../components/ContentState'
import useSanityQuery from '../hooks/useSanityQuery'
import { EVENTS_QUERY, ANNOUNCEMENTS_QUERY, ARTICLES_QUERY, GALLERY_QUERY, CONTACT_QUERY } from '../lib/queries'
import { isFuture, eventState } from '../lib/events'
import { school, programs, stats, formatDate, colorFor } from '../data'

const floaties = [
  { e: '🖍️', s: { left: '6%', top: '14%' } },
  { e: '⭐', s: { right: '8%', top: '10%', animationDelay: '-2s' } },
  { e: '🎈', s: { left: '12%', bottom: '18%', animationDelay: '-4s' } },
  { e: '🧩', s: { right: '12%', bottom: '22%', animationDelay: '-1s' } },
  { e: '🌈', s: { left: '44%', top: '4%', animationDelay: '-3s' } },
]

export default function Home() {
  const [lb, setLb] = useState(null)
  const events = useSanityQuery(EVENTS_QUERY)
  const ann = useSanityQuery(ANNOUNCEMENTS_QUERY)
  const art = useSanityQuery(ARTICLES_QUERY)
  const gallery = useSanityQuery(GALLERY_QUERY)
  const { data: contact } = useSanityQuery(CONTACT_QUERY)
  const allEvents = events.data || []
  const upcoming = allEvents.filter((e) => isFuture(e) && eventState(e) !== 'cancelled').slice(0, 3)
  const isAnnouncement = (n) => n._type === 'announcement'
  // Latest News mixes announcements and articles, newest first
  const latest = [...(ann.data || []), ...(art.data || [])].sort((x, y) => (y.date > x.date ? 1 : -1)).slice(0, 3)
  const updates = { loading: ann.loading || art.loading, error: ann.error || art.error }
  const preview = (gallery.data || []).slice(0, 4)
  const topAnnouncement = ann.data?.[0]
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

      {topAnnouncement && (
        <div className="container">
          <article className="card announce urgent" style={{ marginTop: -40 }}>
            <span className="ico">📢</span>
            <div>
              <span className="date">Announcement · {formatDate(topAnnouncement.date)}</span>
              <h3>{topAnnouncement.title}</h3>
              <p>{topAnnouncement.summary} <Link to="/news#announcements" style={{ color: 'var(--blue)', fontWeight: 800 }}>See all announcements →</Link></p>
            </div>
          </article>
        </div>
      )}

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
            {events.loading ? (
              <LoadingCards count={2} height={130} />
            ) : upcoming.length ? (
              upcoming.map((e) => <EventItem key={e._id} event={e} index={allEvents.indexOf(e)} />)
            ) : events.error ? (
              <ErrorNote error={events.error} />
            ) : (
              <EmptyNote>No upcoming events yet — check back soon! 🌟</EmptyNote>
            )}
          </div>
          <div>
            <div className="row-head">
              <h2>📰 Latest News</h2>
              <Link to="/news">More →</Link>
            </div>
            {updates.loading ? (
              <LoadingCards count={2} height={100} />
            ) : latest.length ? (
              latest.map((n) => (
                <Link
                  to={isAnnouncement(n) ? '/news#announcements' : '/news'}
                  key={n._id}
                  className="card announce"
                  style={{ '--c': colorFor(n.category || n.title), marginBottom: 16 }}
                >
                  <SanityImage
                    image={n.mainImage}
                    className="news-mini"
                    aspect={1}
                    sizes="64px"
                    maxWidth={320}
                    fallback={<span className="ico">{isAnnouncement(n) ? '📢' : '📰'}</span>}
                  />
                  <div>
                    <span className="date" style={{ color: 'var(--muted)' }}>{[isAnnouncement(n) ? 'Announcement' : n.category, formatDate(n.date)].filter(Boolean).join(' · ')}</span>
                    <h3>{n.title}</h3>
                  </div>
                </Link>
              ))
            ) : updates.error ? (
              <ErrorNote error={updates.error} />
            ) : (
              <EmptyNote>News is coming soon! 📰</EmptyNote>
            )}
          </div>
        </div>
      </section>

      {(gallery.loading || preview.length > 0) && (
      <section className="bg-white">
        <div className="container">
          <SectionTitle eyebrow="📸 Gallery" title="Snapshots of happy days" />
          <div className="gallery-grid">
            {gallery.loading
              ? <LoadingCards count={4} height={240} />
              : preview.map((g, i) => <PhotoTile key={g._id} item={g} index={i} onClick={() => setLb(i)} />)}
          </div>
          <p className="center" style={{ marginTop: 30 }}>
            <Link to="/gallery" className="btn btn-green">See the full gallery →</Link>
          </p>
        </div>
      </section>
      )}

      <section>
        <div className="container">
          <div className="cta-band">
            <h2>Come visit us — kids welcome! 🧒👧</h2>
            <p>Book a campus tour and see our classrooms, playground and library in action.</p>
            <div className="btns">
              <Link to="/about#enroll" className="btn btn-pink">Book a tour</Link>
              {contact?.phone && (
                <a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`} className="btn">📞 {contact.phone}</a>
              )}
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
