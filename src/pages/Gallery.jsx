import { useCallback, useState } from 'react'
import PageHero from '../components/PageHero'
import PhotoTile from '../components/PhotoTile'
import Lightbox from '../components/Lightbox'
import { gallery, galleryCategories } from '../data'

export default function Gallery() {
  const [cat, setCat] = useState('All')
  const [lb, setLb] = useState(null)
  const items = gallery.filter((g) => cat === 'All' || g.category === cat)

  const close = useCallback(() => setLb(null), [])
  const move = useCallback((d) => setLb((i) => (i + d + items.length) % items.length), [items.length])

  return (
    <>
      <PageHero emoji="📸" title="Photo Gallery" subtitle="Smiles, crafts, games and adventures from around campus." color="var(--green)" />
      <section>
        <div className="container">
          <div className="chips" role="group" aria-label="Filter by album">
            {galleryCategories.map((c) => (
              <button key={c} className={`chip ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>
                {c} <small>({c === 'All' ? gallery.length : gallery.filter((g) => g.category === c).length})</small>
              </button>
            ))}
          </div>
          <div className="gallery-grid">
            {items.map((g, i) => <PhotoTile key={g.id} item={g} onClick={() => setLb(i)} />)}
          </div>
        </div>
      </section>
      {lb !== null && <Lightbox items={items} index={lb} onClose={close} onMove={move} />}
    </>
  )
}
