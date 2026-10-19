// Static content that has no Sanity field yet. CMS-managed content lives in src/lib/queries.js.

export const school = {
  name: 'COLORS',
  fullName: 'COLORS Preschool & Grade School',
  tagline: 'Where every child shines in their own color!',
}

export const palette = ['#EF476F', '#FF8C42', '#FFD23F', '#06D6A0', '#118AB2', '#8E5CF7']

export const programs = [
  { icon: '🧸', title: 'Toddler Play', ages: 'Ages 2–3', color: '#EF476F', text: 'Gentle first steps into school through songs, sensory play and lots of hugs.' },
  { icon: '🎨', title: 'Nursery', ages: 'Ages 3–4', color: '#FF8C42', text: 'Colors, shapes, stories and friendships — learning through creative discovery.' },
  { icon: '🔤', title: 'Kindergarten', ages: 'Ages 5–6', color: '#FFD23F', text: 'Reading readiness, early math and confident communication for big school.' },
  { icon: '📚', title: 'Primary (Grades 1–3)', ages: 'Ages 6–9', color: '#06D6A0', text: 'Strong foundations in literacy, numeracy, science and values formation.' },
  { icon: '🔬', title: 'Intermediate (Grades 4–6)', ages: 'Ages 9–12', color: '#118AB2', text: 'Hands-on projects, critical thinking, coding basics and leadership.' },
  { icon: '🎵', title: 'Enrichment Clubs', ages: 'All levels', color: '#8E5CF7', text: 'Music, art, dance, sports, robotics and storytelling after class.' },
]

export const stats = [
  { value: 18, suffix: '+', label: 'Years of joyful learning' },
  { value: 450, suffix: '', label: 'Happy students' },
  { value: 12, suffix: ':1', label: 'Student–teacher ratio' },
  { value: 30, suffix: '+', label: 'Clubs & activities' },
]

// Mirrors galleryCategories in the Studio's schemaTypes/galleryImage.ts
export const galleryCategoryLabels = {
  classrooms: 'Classrooms',
  arts: 'Arts',
  celebrations: 'Celebrations',
  sports: 'Sports',
  'field-trips': 'Field Trips',
}

export const socialIcons = {
  facebook: '📘',
  instagram: '📸',
  youtube: '▶️',
  tiktok: '🎵',
  x: '✖️',
  linkedin: '💼',
}

/** Stable palette color for a string (e.g. a category name) so tags stay colorful. */
export function colorFor(text = '', offset = 0) {
  let h = 0
  for (const ch of String(text)) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return palette[(h + offset) % palette.length]
}

/** Formats a Sanity date ("2026-10-24") or datetime ("2026-10-24T01:00:00Z") for display. */
export function formatDate(value, opts = { month: 'long', day: 'numeric', year: 'numeric' }) {
  if (!value) return ''
  const d = new Date(value.length === 10 ? value + 'T00:00:00' : value)
  return d.toLocaleDateString('en-US', opts)
}

export function formatTime(value) {
  if (!value) return ''
  return new Date(value).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

/** Local YYYY-MM-DD key for calendar matching. */
export function dayKey(value) {
  const d = new Date(value)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
