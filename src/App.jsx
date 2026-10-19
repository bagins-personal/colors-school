import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import useSanityQuery from './hooks/useSanityQuery'
import { SETTINGS_QUERY } from './lib/queries'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'
import Gallery from './pages/Gallery'
import News from './pages/News'
import NotFound from './pages/NotFound'

export default function App() {
  const { data: settings } = useSanityQuery(SETTINGS_QUERY)

  // Site title and SEO description come from Site Settings when set
  useEffect(() => {
    if (settings?.siteTitle) document.title = settings.siteTitle
    if (settings?.description) document.querySelector('meta[name="description"]')?.setAttribute('content', settings.description)
  }, [settings])

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<News />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
