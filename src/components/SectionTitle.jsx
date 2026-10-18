export default function SectionTitle({ eyebrow, title, children }) {
  return (
    <div className="section-title">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      <span className="squiggle" aria-hidden="true" />
      {children && <p style={{ marginTop: 14 }}>{children}</p>}
    </div>
  )
}
