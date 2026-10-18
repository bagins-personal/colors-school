import { formatDate } from '../data'

export const categoryColor = {
  Celebration: 'var(--pink)',
  Academic: 'var(--blue)',
  Sports: 'var(--green)',
  Arts: 'var(--purple)',
  Parents: 'var(--orange)',
}

export default function EventItem({ event, past = false }) {
  const c = categoryColor[event.category] || 'var(--blue)'
  return (
    <article className={`card event ${past ? 'past' : ''}`} style={{ '--c': c }}>
      <div className="date-badge">
        <span className="m">{formatDate(event.date, { month: 'short' })}</span>
        <span className="d">{formatDate(event.date, { day: 'numeric' })}</span>
        <span className="w">{formatDate(event.date, { weekday: 'short' })}</span>
      </div>
      <div>
        <span className="tag" style={{ '--c': c }}>{event.category}</span>
        <h3>{event.icon} {event.title}</h3>
        <div className="meta">
          <span>🕒 {event.time}</span>
          <span>📍 {event.place}</span>
        </div>
        <p>{event.text}</p>
      </div>
    </article>
  )
}
