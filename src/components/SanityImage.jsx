import { imageProps } from '../lib/sanity'

/** Responsive, lazy-loaded Sanity image with a blurred placeholder. Renders `fallback` when no image. */
export default function SanityImage({ image, sizes, aspect, maxWidth, className, alt, eager = false, fallback = null }) {
  const props = imageProps(image, { sizes, aspect, maxWidth })
  if (!props) return fallback
  const lqip = image.asset?.metadata?.lqip
  return (
    <img
      {...props}
      alt={alt ?? props.alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      style={lqip ? { backgroundImage: `url(${lqip})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    />
  )
}
