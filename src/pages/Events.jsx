import { useEffect, useMemo, useState } from 'react'
import PageHero from '../components/PageHero'
import EventItem, { categoryColor } from '../components/EventItem'
import { events, eventCategories, formatDate } from '../data'

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const pad = (n) => String(n).padStart(2, '0')

function Countdown({ event }) {
  const target = new Date(event.date + 'T08:00:00').getTime()
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  const diff = Math.max(0, target - now)
  const parts = [
    ['Days', Math.floor(diff / 864e5)],
    ['Hours', Math.floor(diff / 36e5) % 24],
    ['Mins', Math.floor(diff / 6e4) % 60],
    ['Secs', Math.floor(diff / 1e3) % 60],
  ]
  return (
    <div className="countdown">
      <h3>⏰ Next up: {event.icon} {event.title}</h3>
      <div className="count-boxes">
        {parts.map(([label, v]) => (
          <div key={label}><strong>{v}</strong><span>{label}</span></div>
        ))}
      </div>
    </div>
  )
}

function Calendar({ list }) {
  const first = list[0] ? new Date(list[0].date + 'T00:00:00') : new Date()
  const [month, setMonth] = useState(new Date(first.getFullYear(), first.getMonth(), 1))
  const y = month.getFullYear()
  const m = month.getMonth()
  const days = new Date(y, m + 1, 0).getDate()
  const offset = new Date(y, m, 1).getDay()
  const todayIso = new Date().toISOString().slice(0, 10)
  const cells = [...Array(offset).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)]

  return (
    <div className="calendar">
      <div className="cal-head">
        <button onClick={() => setMonth(new Date(y, m - 1, 1))} aria-label="Previous month">‹</button>
        <h3>{month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
        <button onClick={() => setMonth(new Date(y, m + 1, 1))} aria-label="Next month">›</button>
      </div>
      <div className="cal-grid">
        {DOW.map((d) => <div key={d} className="cal-dow">{d}</div>)}
        {cells.map((d, i) => {
          if (!d) return <div key={i} className="cal-day empty" />
          const iso = `${y}-${pad(m + 1)}-${pad(d)}`
          const evs = list.filter((e) => e.date === iso)
          return (
            <div key={i} className={`cal-day ${iso === todayIso ? 'today' : ''}`}>
              {d}
              {evs.map((e) => (
                <span key={e.id} className="cal-ev" style={{ '--c': categoryColor[e.category] }} title={e.title}>
                  {e.icon} {e.title}
                </span>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Events() {
  const [cat, setCat] = useState('All')
  const [view, setView] = useState('list')
  const today = new Date().toISOString().slice(0, 10)

  const filtered = useMemo(
    () => events.filter((e) => cat === 'All' || e.category === cat),
    [cat],
  )
  const upcoming = filtered.filter((e) => e.date >= today)
  const past = filtered.filter((e) => e.date < today)
  const next = events.find((e) => e.date >= today)

  // Group upcoming events by month for the list view
  const byMonth = upcoming.reduce((acc, e) => {
    const key = formatDate(e.date, { month: 'long', year: 'numeric' })
    ;(acc[key] ||= []).push(e)
    return acc
  }, {})

  return (
    <>
      <PageHero emoji="📅" title="School Events" subtitle="Fun runs, fairs, parades and celebrations — mark your family calendar!" color="var(--pink)" />
      <section>
        <div className="container" style={{ maxWidth: 900 }}>
          {next && <Countdown event={next} />}

          <div className="chips" role="group" aria-label="Filter by category">
            {eventCategories.map((c) => (
              <button key={c} className={`chip ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
          <div className="view-toggle">
            <button className={`btn btn-sm ${view === 'list' ? '' : 'btn-white'}`} onClick={() => setView('list')}>📋 List</button>
            <button className={`btn btn-sm ${view === 'calendar' ? '' : 'btn-white'}`} onClick={() => setView('calendar')}>🗓️ Calendar</button>
          </div>

          {view === 'calendar' ? (
            <Calendar list={upcoming.length ? upcoming : filtered} />
          ) : (
            <>
              {Object.entries(byMonth).map(([month, list]) => (
                <div key={month} style={{ marginBottom: 34 }}>
                  <h2>{month}</h2>
                  {list.map((e) => <EventItem key={e.id} event={e} />)}
                </div>
              ))}
              {!upcoming.length && <p className="empty">No upcoming {cat.toLowerCase()} events yet — check back soon! 🌟</p>}
              {past.length > 0 && (
                <>
                  <h2>Past events</h2>
                  {past.map((e) => <EventItem key={e.id} event={e} past />)}
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
