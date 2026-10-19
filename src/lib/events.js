// Event status helpers. The Studio's `status` field is set by editors; an "upcoming" event
// whose end (or start) time has passed is treated as completed so the site never shows stale events.

export function eventState(e, now = Date.now()) {
  if (e.status === 'cancelled') return 'cancelled'
  if (e.status === 'completed') return 'completed'
  const end = new Date(e.endDateTime || e.startDateTime).getTime()
  return end < now ? 'completed' : 'upcoming'
}

export function isFuture(e, now = Date.now()) {
  return new Date(e.endDateTime || e.startDateTime).getTime() >= now && e.status !== 'completed'
}

export const stateColor = {
  upcoming: 'var(--blue)',
  completed: 'var(--muted)',
  cancelled: 'var(--pink)',
}
