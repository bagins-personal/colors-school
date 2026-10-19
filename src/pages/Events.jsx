import { useEffect, useState } from 'react'
import PageHero from '../components/PageHero'
import EventItem from '../components/EventItem'
import { ContentState, LoadingCards } from '../components/ContentState'
import useSanityQuery from '../hooks/useSanityQuery'
import { EVENTS_QUERY } from '../lib/queries'
import { eventState, isFuture, stateColor } from '../lib/events'
import { formatDate, dayKey, palette } from '../data'

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
]
const pad = (n) => String(n).padStart(2, '0')

function Countdown({ event }) {
  const target = new Date(event.startDateTime).getTime()
  const [now, setNow] = useState(Date.now)
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
      <h3>⏰ Next up: {event.title}</h3>
      <div className="count-boxes">
        {parts.map(([label, v]) => (
          <div key={label}><strong>{v}</strong><span>{label}</span></div>
        ))}
      </div>
    </div>
  )
}

function Calendar({ list }) {
  const [month, setMonth] = useState(() => {
    const first = new Date(list[0]?.startDateTime ?? Date.now())
    return new Date(first.getFullYear(), first.getMonth(), 1)
  })
  const [todayKey] = useState(() => dayKey(Date.now()))
  const y = month.getFullYear()
  const m = month.getMonth()
  const days = new Date(y, m + 1, 0).getDate()
  const offset = new Date(y, m, 1).getDay()
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
          const key = `${y}-${pad(m + 1)}-${pad(d)}`
          const evs = list.filter((e) => dayKey(e.startDateTime) === key)
          return (
            <div key={i} className={`cal-day ${key === todayKey ? 'today' : ''}`}>
              {d}
              {evs.map((e) => {
                const state = eventState(e)
                return (
                  <span
                    key={e._id}
                    className={`cal-ev ${state}`}
                    style={{ '--c': state === 'upcoming' ? palette[list.indexOf(e) % palette.length] : stateColor[state] }}
                    title={`${e.title}${state !== 'upcoming' ? ` (${state})` : ''}`}
                  >
                    {e.title}
                  </span>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Events() {
  const [filter, setFilter] = useState('all')
  const [view, setView] = useState('list')
  const [now] = useState(Date.now)
  const { data, loading, error } = useSanityQuery(EVENTS_QUERY)
  const all = data || []

  const filtered = all.filter((e) => filter === 'all' || eventState(e) === filter)
  // Future events first (soonest first), then past/completed events (most recent first)
  const future = filtered.filter((e) => isFuture(e))
  const past = filtered.filter((e) => !isFuture(e)).reverse()
  const next = all.find((e) => eventState(e) === 'upcoming' && new Date(e.startDateTime) > now)
  const colorIndex = (e) => all.indexOf(e)

  const byMonth = future.reduce((acc, e) => {
    const key = formatDate(e.startDateTime, { month: 'long', year: 'numeric' })
    ;(acc[key] ||= []).push(e)
    return acc
  }, {})

  return (
    <>
      <PageHero emoji="📅" title="School Events" subtitle="Fun runs, fairs, parades and celebrations — mark your family calendar!" color="var(--pink)" />
      <section>
        <div className="container" style={{ maxWidth: 900 }}>
          {next && <Countdown event={next} />}

          <div className="chips" role="group" aria-label="Filter by status">
            {FILTERS.map((f) => (
              <button key={f.key} className={`chip ${filter === f.key ? 'active' : ''}`} onClick={() => setFilter(f.key)}>{f.label}</button>
            ))}
          </div>
          <div className="view-toggle">
            <button className={`btn btn-sm ${view === 'list' ? '' : 'btn-white'}`} onClick={() => setView('list')}>📋 List</button>
            <button className={`btn btn-sm ${view === 'calendar' ? '' : 'btn-white'}`} onClick={() => setView('calendar')}>🗓️ Calendar</button>
          </div>

          <ContentState
            loading={loading}
            error={error}
            isEmpty={!all.length}
            empty="No events have been posted yet — check back soon! 🌟"
            skeleton={<LoadingCards count={3} height={130} />}
          >
            {() =>
              view === 'calendar' ? (
                <Calendar list={future.length ? future : filtered} />
              ) : (
                <>
                  {Object.entries(byMonth).map(([month, list]) => (
                    <div key={month} style={{ marginBottom: 34 }}>
                      <h2>{month}</h2>
                      {list.map((e) => <EventItem key={e._id} event={e} index={colorIndex(e)} />)}
                    </div>
                  ))}
                  {!future.length && !past.length && <p className="empty">No {filter} events right now. 🌟</p>}
                  {!future.length && past.length > 0 && filter === 'all' && (
                    <p className="empty">No upcoming events yet — check back soon! 🌟</p>
                  )}
                  {past.length > 0 && (
                    <>
                      <h2>{filter === 'cancelled' ? 'Cancelled events' : 'Past events'}</h2>
                      {past.map((e) => <EventItem key={e._id} event={e} index={colorIndex(e)} />)}
                    </>
                  )}
                </>
              )
            }
          </ContentState>
        </div>
      </section>
    </>
  )
}
