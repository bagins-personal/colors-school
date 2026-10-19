import { useState } from 'react'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import SanityImage from '../components/SanityImage'
import RichText from '../components/RichText'
import { ContentState, LoadingCards, ErrorNote } from '../components/ContentState'
import useSanityQuery from '../hooks/useSanityQuery'
import { ABOUT_QUERY, CONTACT_QUERY } from '../lib/queries'
import { palette } from '../data'

const teacherEmojis = ['👩‍🏫', '👨‍🏫', '🧑‍🏫', '👩‍🎨', '🧑‍🔬', '📖']

function Teacher({ t, i }) {
  const [open, setOpen] = useState(false)
  const color = palette[i % palette.length]
  return (
    <article className="card team" style={{ '--c': color }}>
      <div className="avatar">
        <SanityImage
          image={t.photo}
          aspect={1}
          sizes="110px"
          maxWidth={480}
          alt={t.photo?.alt || t.name}
          fallback={<span aria-hidden="true">{teacherEmojis[i % teacherEmojis.length]}</span>}
        />
      </div>
      <h3>{t.name}</h3>
      {t.role && <p>{t.role}</p>}
      {t.subjects?.length > 0 && (
        <div className="subject-tags">
          {t.subjects.map((sub) => <span key={sub} className="tag" style={{ '--c': color }}>{sub}</span>)}
        </div>
      )}
      {t.bio?.length > 0 && (
        <>
          {open && <RichText value={t.bio} className="team-bio" />}
          <button className="read-more" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? 'Hide bio ↑' : 'Read bio →'}
          </button>
        </>
      )}
    </article>
  )
}

function EnrollForm() {
  const [sent, setSent] = useState(false)
  const [name, setName] = useState('')

  if (sent) {
    return (
      <div className="form thanks">
        <div className="big">🎉</div>
        <h3>Thank you{name ? `, ${name}` : ''}!</h3>
        <p>Our admissions team will contact you within 2 school days to schedule your visit.</p>
        <button className="btn btn-sm" onClick={() => setSent(false)}>Send another inquiry</button>
      </div>
    )
  }

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
    >
      <h3 style={{ margin: 0 }}>📝 Enrollment Inquiry</h3>
      <div className="form-row">
        <label>Parent / Guardian name
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Juan Dela Cruz" />
        </label>
        <label>Contact number
          <input required type="tel" placeholder="0917 123 4567" />
        </label>
      </div>
      <label>Email
        <input required type="email" placeholder="you@email.com" />
      </label>
      <div className="form-row">
        <label>Child’s age
          <input required type="number" min="2" max="13" placeholder="5" />
        </label>
        <label>Level applying for
          <select required defaultValue="">
            <option value="" disabled>Choose a level</option>
            <option>Toddler Play</option>
            <option>Nursery</option>
            <option>Kindergarten</option>
            <option>Grades 1–3</option>
            <option>Grades 4–6</option>
          </select>
        </label>
      </div>
      <label>Message (optional)
        <textarea rows="3" placeholder="I'd like to schedule a campus tour..." />
      </label>
      <button className="btn btn-pink" type="submit">Send inquiry 🚀</button>
    </form>
  )
}

export default function About() {
  const about = useSanityQuery(ABOUT_QUERY)
  const contact = useSanityQuery(CONTACT_QUERY)
  const a = about.data || {}
  const milestones = a.milestones || []
  const values = a.coreValues || []
  const team = a.leaders || []
  const c = contact.data || {}
  const checklist = (c.checklist || []).filter(Boolean)

  return (
    <>
      <PageHero emoji="🌈" title={a.title || 'About COLORS'} subtitle="Nurturing curious, kind and confident children." color="var(--purple)" />

      <section>
        <div className="container">
          <SectionTitle eyebrow="💛 Who we are" title="Every child is a different color">
            {about.loading ? 'Loading…' : a.intro}
          </SectionTitle>
          {about.error && !about.data && <ErrorNote error={about.error} />}
          {about.loading ? (
            <LoadingCards count={2} height={200} />
          ) : (a.mission || a.vision) && (
            <div className="mv">
              {a.mission && (
                <article className="card" style={{ background: 'var(--blue)' }}>
                  <h3>🎯 Our Mission</h3>
                  <p>{a.mission}</p>
                </article>
              )}
              {a.vision && (
                <article className="card" style={{ background: 'var(--pink)' }}>
                  <h3>🔭 Our Vision</h3>
                  <p>{a.vision}</p>
                </article>
              )}
            </div>
          )}
        </div>
      </section>

      {(about.loading || values.length > 0) && (
        <section className="bg-white">
          <div className="container">
            <SectionTitle eyebrow="✨ Our Core Values" title="What we believe in" />
            {about.loading ? (
              <LoadingCards count={6} height={150} />
            ) : (
              <div className="values">
                {values.map((v, i) => (
                  <div key={v._key} className="value" style={{ '--c': palette[i % palette.length] }}>
                    <div className="big">{v.title?.trim().charAt(0).toUpperCase()}</div>
                    <h3>{v.title}</h3>
                    {v.description && <p>{v.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section>
        <div className="container">
          <SectionTitle eyebrow="👩‍🏫 Our Leaders" title="Meet the COLORS team" />
          <ContentState
            loading={about.loading}
            error={about.error}
            isEmpty={!team.length}
            empty="Teacher profiles are coming soon! 🍎"
            skeleton={<LoadingCards count={4} height={240} />}
          >
            {() => (
              <div className="grid">
                {team.map((t, i) => <Teacher key={t._key} t={t} i={i} />)}
              </div>
            )}
          </ContentState>
        </div>
      </section>

      {(milestones.length > 0 || a.body?.length > 0 || a.heroImage?.asset) && (
        <section className="bg-white">
          <div className="container">
            <SectionTitle eyebrow="🕰️ Our Story" title="Growing together through the years" />
            {milestones.length > 0 && (
              <div className="timeline">
                {milestones.map((m, i) => (
                  <div key={m._key} className="milestone" style={{ '--c': palette[i % palette.length] }}>
                    <strong>{m.year}</strong>{m.text}
                  </div>
                ))}
              </div>
            )}
            {(a.body?.length > 0 || a.heroImage?.asset) && (
            <div className={`story ${a.heroImage?.asset ? 'has-image' : ''}`} style={milestones.length ? { marginTop: 40 } : undefined}>
              <SanityImage
                image={a.heroImage}
                className="story-image"
                sizes="(max-width: 860px) 100vw, 480px"
                maxWidth={1080}
              />
              <RichText value={a.body} />
            </div>
            )}
          </div>
        </section>
      )}

      <section id="enroll">
        <div className="container">
          <div className="enroll">
            <div>
              <h2>{c.joinTitle || 'Join the COLORS family! 🎒'}</h2>
              {c.joinText && <p>{c.joinText}</p>}
              {checklist.length > 0 && (
                <ul>
                  {checklist.map((item, i) => <li key={i}>✅ {item}</li>)}
                </ul>
              )}
              <ul className="contact-list" style={{ marginTop: 20 }}>
                {c.address && <li>📍 {c.address}</li>}
                {c.phone && <li>📞 {c.phone}</li>}
                {c.email && <li>✉️ {c.email}</li>}
                {c.hours && <li>🕖 {c.hours}</li>}
              </ul>
            </div>
            <EnrollForm />
          </div>
        </div>
      </section>
    </>
  )
}
