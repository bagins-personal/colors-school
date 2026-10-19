import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET

export const sanityConfigured = Boolean(projectId && dataset)

// Read-only, token-less client: only published documents from a public dataset are fetched.
export const client = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2025-02-19',
      useCdn: true,
      perspective: 'published',
      maxRetries: 2,
    })
  : null

const builder = sanityConfigured ? createImageUrlBuilder({ projectId, dataset }) : null

const WIDTHS = [320, 480, 640, 800, 1080, 1440, 1920]

export function urlFor(source) {
  return builder.image(source).auto('format')
}

/**
 * Responsive <img> props for a Sanity image field. Respects the editor's hotspot/crop
 * when an aspect ratio is given; otherwise keeps the original proportions.
 */
export function imageProps(image, { sizes = '100vw', aspect, maxWidth = 1920, quality = 80 } = {}) {
  if (!builder || !image?.asset) return null
  const widths = WIDTHS.filter((w) => w <= maxWidth)
  const build = (w) => {
    let b = urlFor(image).width(w).quality(quality)
    if (aspect) b = b.height(Math.round(w / aspect)).fit('crop')
    return b.url()
  }
  const ratio = aspect || image.asset.metadata?.dimensions?.aspectRatio
  const base = widths[Math.min(2, widths.length - 1)]
  return {
    src: build(base),
    srcSet: widths.map((w) => `${build(w)} ${w}w`).join(', '),
    sizes,
    width: base,
    height: ratio ? Math.round(base / ratio) : undefined,
    alt: image.alt || '',
  }
}
