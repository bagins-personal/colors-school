import { Link } from 'react-router-dom'
import Logo from './Logo'
import useSanityQuery from '../hooks/useSanityQuery'
import { SETTINGS_QUERY, CONTACT_QUERY } from '../lib/queries'
import { school, socialIcons } from '../data'

export default function Footer() {
  const { data: settings } = useSanityQuery(SETTINGS_QUERY)
  const { data: contact } = useSanityQuery(CONTACT_QUERY)
  const s = settings || {}
  const c = contact || {}
  const socials = (c.socialLinks || []).filter((l) => l?.url)

  return (
    <footer className="site-footer">
      <div className="footer-wave" aria-hidden="true" />
      <div className="container footer-grid">
        <div>
          <Logo size="lg" />
          <p className="footer-tag">{s.footerText || school.tagline}</p>
          {socials.length > 0 && (
            <ul className="socials">
              {socials.map((l) => (
                <li key={l._key}>
                  <a href={l.url} target="_blank" rel="noopener noreferrer" aria-label={l.platform}>
                    <span aria-hidden="true">{socialIcons[l.platform] || '🔗'}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/news">News &amp; Education</Link></li>
          </ul>
        </div>
        <div>
          <h4>Visit Us</h4>
          <ul className="contact-list">
            {c.address && <li>📍 {c.address}</li>}
            {c.phone && <li>📞 <a href={`tel:${c.phone.replace(/[^\d+]/g, '')}`}>{c.phone}</a></li>}
            {c.email && <li>✉️ <a href={`mailto:${c.email}`}>{c.email}</a></li>}
            {c.hours && <li>🕖 {c.hours}</li>}
          </ul>
        </div>
      </div>
      <p className="copyright">© {new Date().getFullYear()} {s.siteTitle || school.fullName}. Made with 💖 and lots of crayons.</p>
    </footer>
  )
}
