import { useCallback, useState } from 'react'
import PageHero from '../components/PageHero'
import PhotoTile from '../components/PhotoTile'
import Lightbox from '../components/Lightbox'
import { ContentState, LoadingCards } from '../components/ContentState'
import useSanityQuery from '../hooks/useSanityQuery'
import { GALLERY_QUERY } from '../lib/queries'
import { galleryCategoryLabels } from '../data'

export default function Gallery() {
  const [cat, setCat] = useState('all')
  const [lb, setLb] = useState(null)
  const { data, loading, error } = useSanityQuery(GALLERY_QUERY)
  const photos = data || []
  const items = photos.filter((g) => cat === 'all' || g.category === cat)
  const count = (key) => photos.filter((g) => g.category === key).length
  // Only show category chips that have photos
  const categories = Object.entries(galleryCategoryLabels).filter(([key]) => count(key) > 0)

  const close = useCallback(() => setLb(null), [])
  const move = useCallback((d) => setLb((i) => (i + d + items.length) % items.length), [items.length])

  return (
    <>
      <PageHero emoji="📸" title="Photo Gallery" subtitle="Smiles, crafts, games and adventures from around campus." color="var(--green)" />
      <section>
        <div className="container">
          <ContentState
            loading={loading}
            error={error}
            isEmpty={!photos.length}
            empty="Photos are on their way — check back soon! 📷"
            skeleton={<LoadingCards count={6} height={260} />}
          >
            {() => (
              <>
                {categories.length > 0 && (
                  <div className="chips" role="group" aria-label="Filter by album">
                    <button className={`chip ${cat === 'all' ? 'active' : ''}`} onClick={() => setCat('all')}>
                      All <small>({photos.length})</small>
                    </button>
                    {categories.map(([key, label]) => (
                      <button key={key} className={`chip ${cat === key ? 'active' : ''}`} onClick={() => setCat(key)}>
                        {label} <small>({count(key)})</small>
                      </button>
                    ))}
                  </div>
                )}
                <div className="gallery-grid">
                  {items.map((g, i) => <PhotoTile key={g._id} item={g} index={i} onClick={() => setLb(i)} />)}
                </div>
              </>
            )}
          </ContentState>
        </div>
      </section>
      {lb !== null && <Lightbox items={items} index={lb} onClose={close} onMove={move} />}
    </>
  )
}
