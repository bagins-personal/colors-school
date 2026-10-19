import SanityImage from './SanityImage'
import { categoryLabel, tileColors } from '../lib/gallery'

export default function PhotoTile({ item, index = 0, onClick }) {
  const [c1, c2] = tileColors(index)
  return (
    <button className="photo" style={{ '--c1': c1, '--c2': c2 }} onClick={onClick} aria-label={`Open photo: ${item.title}`}>
      <SanityImage
        image={item.image}
        className="photo-img"
        aspect={index % 5 === 0 ? 0.5 : 1}
        sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 290px"
        maxWidth={1080}
        alt={item.image?.alt || item.title}
        fallback={<span className="dots" />}
      />
      <span className="caption">
        <small>{categoryLabel(item)}</small>
        {item.title}
      </span>
    </button>
  )
}
