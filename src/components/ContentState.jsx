// Shared loading / error / empty states for CMS-driven sections.

export function LoadingCards({ count = 3, height = 160 }) {
  return (
    <div className="grid" aria-busy="true" aria-label="Loading">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card skeleton" style={{ height }} />
      ))}
    </div>
  )
}

export function ErrorNote({ error }) {
  if (!error) return null
  return (
    <p className="empty error-note" role="alert">
      😕 We couldn’t load this section right now. Please refresh the page or try again later.
      {import.meta.env.DEV && <small><br />{error.message}</small>}
    </p>
  )
}

export function EmptyNote({ children }) {
  return <p className="empty">{children}</p>
}

/** Renders loading, error or empty state; otherwise calls children(). */
export function ContentState({ loading, error, isEmpty, empty, skeleton, children }) {
  if (loading) return skeleton ?? <LoadingCards />
  if (error && isEmpty) return <ErrorNote error={error} />
  if (isEmpty) return <EmptyNote>{empty}</EmptyNote>
  return children()
}
