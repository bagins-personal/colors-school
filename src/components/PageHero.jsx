export default function PageHero({ emoji, title, subtitle, color = 'var(--blue)' }) {
  return (
    <section className="page-hero" style={{ '--hero': color }}>
      <div className="bubbles" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => <span key={i} />)}
      </div>
      <div className="container">
        <div className="page-hero-emoji" aria-hidden="true">{emoji}</div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  )
}
