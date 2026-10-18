import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

export default function NotFound() {
  return (
    <>
      <PageHero emoji="🙈" title="Oops! Page not found" subtitle="This page went out to play. Let’s get you back to class." color="var(--orange)" />
      <p className="center"><Link to="/" className="btn">🏠 Back to Home</Link></p>
    </>
  )
}
