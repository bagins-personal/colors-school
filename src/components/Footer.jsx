import { Link } from 'react-router-dom'
import Logo from './Logo'
import { school } from '../data'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-wave" aria-hidden="true" />
      <div className="container footer-grid">
        <div>
          <Logo size="lg" />
          <p className="footer-tag">{school.tagline}</p>
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
          <ul>
            <li>📍 {school.address}</li>
            <li>📞 {school.phone}</li>
            <li>✉️ {school.email}</li>
            <li>🕖 {school.hours}</li>
          </ul>
        </div>
      </div>
      <p className="copyright">© {new Date().getFullYear()} {school.fullName}. Made with 💖 and lots of crayons.</p>
    </footer>
  )
}
