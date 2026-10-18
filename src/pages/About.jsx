import { useState } from 'react'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import { school, values, teachers, milestones, palette } from '../data'

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
  return (
    <>
      <PageHero emoji="🌈" title="About COLORS" subtitle={`Nurturing curious, kind and confident children since ${school.founded}.`} color="var(--purple)" />

      <section>
        <div className="container">
          <SectionTitle eyebrow="💛 Who we are" title="Every child is a different color">
            At COLORS, we believe every child brings a unique color to the world. Our preschool and grade school
            blend play, discovery and strong academics so children learn with joy — and grow up to be good people.
          </SectionTitle>
          <div className="mv">
            <article className="card" style={{ background: 'var(--blue)' }}>
              <h3>🎯 Our Mission</h3>
              <p>To provide a safe, loving and stimulating environment where young learners develop strong foundations in
                academics, character and creativity through play-based and hands-on learning.</p>
            </article>
            <article className="card" style={{ background: 'var(--pink)' }}>
              <h3>🔭 Our Vision</h3>
              <p>A community of happy, curious and compassionate children who are ready to color the world with their
                talents, kindness and love of learning.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container">
          <SectionTitle eyebrow="✨ Our Core Values" title="What C-O-L-O-R-S stands for" />
          <div className="values">
            {values.map((v, i) => (
              <div key={i} className="value" style={{ '--c': v.color }}>
                <div className="big">{v.letter}</div>
                <h3>{v.word}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle eyebrow="👩‍🏫 Our Leaders" title="Meet the COLORS team" />
          <div className="grid">
            {teachers.map((t) => (
              <article key={t.name} className="card team" style={{ '--c': t.color }}>
                <div className="avatar">{t.emoji}</div>
                <h3>{t.name}</h3>
                <p>{t.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container">
          <SectionTitle eyebrow="🕰️ Our Story" title="Growing together through the years" />
          <div className="timeline">
            {milestones.map((m, i) => (
              <div key={m.year} className="milestone" style={{ '--c': palette[i % palette.length] }}>
                <strong>{m.year}</strong>{m.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="enroll">
        <div className="container">
          <div className="enroll">
            <div>
              <h2>Join the COLORS family! 🎒</h2>
              <p>Enrollment for School Year 2027–2028 is now open for Toddler Play to Grade 6.</p>
              <ul>
                <li>✅ Small classes with caring teachers</li>
                <li>✅ Safe, secure and child-friendly campus</li>
                <li>✅ Clubs in arts, music, sports and coding</li>
                <li>✅ Early-bird discount until December 15</li>
              </ul>
              <p style={{ marginTop: 20 }}>
                📍 {school.address}<br />📞 {school.phone}<br />✉️ {school.email}<br />🕖 {school.hours}
              </p>
            </div>
            <EnrollForm />
          </div>
        </div>
      </section>
    </>
  )
}
