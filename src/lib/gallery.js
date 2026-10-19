import { galleryCategoryLabels, palette } from '../data'

/** Fallback gradient colors for a gallery tile (shown while the photo loads or if it is missing). */
export const tileColors = (i) => [palette[i % palette.length], palette[(i + 2) % palette.length]]

export function categoryLabel(item) {
  return galleryCategoryLabels[item.category] || item.eventTitle || 'Gallery'
}
