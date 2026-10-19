import { useEffect } from 'react'
import SanityImage from './SanityImage'
import { categoryLabel, tileColors } from '../lib/gallery'
import { formatDate } from '../data'

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
  const [c1, c2] = tileColors(index)
  const meta = [item.eventTitle && item.category ? item.eventTitle : null, item.dateTaken && formatDate(item.dateTaken)]
    .filter(Boolean)
    .join(' · ')

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}>
      <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-art" style={{ '--c1': c1, '--c2': c2 }}>
          <SanityImage
            key={item._id}
            image={item.image}
            className="lightbox-img"
            sizes="(max-width: 680px) 100vw, 640px"
            maxWidth={1440}
            alt={item.image?.alt || item.title}
            eager
          />
          <button className="lb-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="lightbox-body">
          <div>
            <span className="tag" style={{ '--c': c1 }}>{categoryLabel(item)}</span>
            <h3>{item.title}</h3>
            {item.caption && <p className="lb-caption">{item.caption}</p>}
            <small>{meta ? `${meta} · ` : ''}{index + 1} of {items.length}</small>
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
