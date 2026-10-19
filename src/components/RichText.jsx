import { PortableText } from '@portabletext/react'
import SanityImage from './SanityImage'

const components = {
  types: {
    image: ({ value }) => (
      <figure className="rich-image">
        <SanityImage image={value} sizes="(max-width: 900px) 100vw, 860px" maxWidth={1440} />
      </figure>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href || '#'
      const external = /^https?:/.test(href)
      return (
        <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {children}
        </a>
      )
    },
  },
}

export default function RichText({ value, className = '' }) {
  if (!Array.isArray(value) || !value.length) return null
  return (
    <div className={`rich-text ${className}`}>
      <PortableText value={value} components={components} />
    </div>
  )
}
