import { useEffect } from 'react'

export default function Lightbox({ items, index, onClose, onMove }) {
  const item = items[index]

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onMove(1)
      if (e.key === 'ArrowLeft') onMove(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onMove])

  if (!item) return null
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}>
      <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-art" style={{ '--c1': item.colors[0], '--c2': item.colors[1] }}>
          <span>{item.emoji}</span>
          <button className="lb-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="lightbox-body">
          <div>
            <span className="tag" style={{ '--c': item.colors[0] }}>{item.category}</span>
            <h3>{item.title}</h3>
            <small>{index + 1} of {items.length}</small>
          </div>
          <div className="lb-nav">
            <button onClick={() => onMove(-1)} aria-label="Previous">‹</button>
            <button onClick={() => onMove(1)} aria-label="Next">›</button>
          </div>
        </div>
      </div>
    </div>
  )
}
