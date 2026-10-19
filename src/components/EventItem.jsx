import SanityImage from './SanityImage'
import { formatDate, formatTime, palette } from '../data'
import { eventState } from '../lib/events'

const stateLabel = { upcoming: 'Upcoming', completed: 'Completed', cancelled: 'Cancelled' }

export default function EventItem({ event, index = 0 }) {
  const state = eventState(event)
  const c = state === 'cancelled' ? 'var(--pink)' : palette[index % palette.length]
  const start = event.startDateTime
  const end = event.endDateTime
  const sameDay = end && formatDate(start) === formatDate(end)
  const time = end
    ? sameDay
      ? `${formatTime(start)} – ${formatTime(end)}`
      : `${formatTime(start)} – ${formatDate(end, { month: 'short', day: 'numeric' })}, ${formatTime(end)}`
    : formatTime(start)

  return (
    <article className={`card event ${state !== 'upcoming' ? 'past' : ''} ${state}`} style={{ '--c': c }}>
      <div className="date-badge">
        <span className="m">{formatDate(start, { month: 'short' })}</span>
        <span className="d">{formatDate(start, { day: 'numeric' })}</span>
        <span className="w">{formatDate(start, { weekday: 'short' })}</span>
      </div>
      <div className="event-body">
        <span className="tag" style={{ '--c': state === 'upcoming' ? c : undefined }}>{stateLabel[state]}</span>
        <h3>{event.title}</h3>
        <div className="meta">
          <span>🕒 {time}</span>
          {event.location && <span>📍 {event.location}</span>}
        </div>
        {event.description && <p>{event.description}</p>}
      </div>
      <SanityImage
        image={event.coverImage}
        className="event-cover"
        aspect={1}
        sizes="(max-width: 640px) 84px, 130px"
        maxWidth={320}
      />
    </article>
  )
}
