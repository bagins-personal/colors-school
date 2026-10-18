export default function PhotoTile({ item, onClick }) {
  return (
    <button className="photo" style={{ '--c1': item.colors[0], '--c2': item.colors[1] }} onClick={onClick}>
      <span className="dots" />
      <span className="emoji" aria-hidden="true">{item.emoji}</span>
      <span className="caption">
        <small>{item.category}</small>
        {item.title}
      </span>
    </button>
  )
}
