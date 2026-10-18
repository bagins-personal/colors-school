import { palette } from '../data'

export default function Logo({ size = 'md' }) {
  return (
    <span className={`logo logo-${size}`} aria-label="COLORS">
      {'COLORS'.split('').map((ch, i) => (
        <span key={i} style={{ color: palette[i], '--i': i }} className="logo-letter">
          {ch}
        </span>
      ))}
    </span>
  )
}
