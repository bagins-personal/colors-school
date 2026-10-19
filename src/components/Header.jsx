import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import SanityImage from './SanityImage'
import useSanityQuery from '../hooks/useSanityQuery'
import { SETTINGS_QUERY } from '../lib/queries'

const links = [
  { to: '/', label: 'Home', emoji: '🏠' },
  { to: '/about', label: 'About Us', emoji: '🌈' },
  { to: '/events', label: 'Events', emoji: '📅' },
  { to: '/gallery', label: 'Gallery', emoji: '📸' },
  { to: '/news', label: 'News & Education', emoji: '📰' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()
  const { data: settings } = useSanityQuery(SETTINGS_QUERY)

  useEffect(() => {
    setOpen(false)
    const target = hash && document.getElementById(hash.slice(1))
    if (target) target.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo({ top: 0 })
  }, [pathname, hash])

  return (
    <header className="site-header">
      <nav className="nav container">
        <Link to="/" className="brand">
          <SanityImage
            image={settings?.logo}
            className="brand-logo"
            sizes="180px"
            maxWidth={480}
            alt={settings?.logo?.alt || settings?.siteTitle || 'COLORS'}
            eager
            fallback={<Logo />}
          />
          <small>Preschool &amp; Grade School</small>
        </Link>
        <button
          className="menu-btn"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? '✕' : '☰'}
        </button>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.to === '/'}>
                <span aria-hidden="true">{l.emoji}</span> {l.label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link to="/about#enroll" className="btn btn-pink btn-sm">Enroll Now</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
