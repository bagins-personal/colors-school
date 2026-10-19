// GROQ queries matching the schemas in colors-cms/client-website-cms/schemaTypes.

// Image fields: keep hotspot/crop for the URL builder and pull blur placeholder + dimensions.
const image = `{ alt, hotspot, crop, asset->{ _id, metadata { lqip, dimensions { aspectRatio } } } }`

// Portable Text arrays that may contain inline images.
const richText = `[]{ ..., _type == "image" => ${image} }`

export const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteTitle, description, footerText, logo ${image}
}`

export const CONTACT_QUERY = `*[_type == "contactPage"][0]{
  joinTitle, joinText, checklist, address, phone, email, hours,
  socialLinks[]{ _key, platform, url }
}`

export const ABOUT_QUERY = `*[_type == "aboutPage"][0]{
  title, intro, mission, vision,
  coreValues[]{ _key, title, description },
  leaders[]{ _key, name, role, subjects, email, bio, photo ${image} },
  "milestones": milestones[defined(year) && defined(text)] | order(year asc){ _key, year, text },
  heroImage ${image}, body ${richText}
}`

// Posts scheduled for the future (publishedAt > now) stay hidden until that time.
const post = `_id, _type, title, "slug": slug.current, summary,
  "date": coalesce(publishedAt, _createdAt),
  mainImage ${image}, body ${richText}`

export const ANNOUNCEMENTS_QUERY = `*[_type == "announcement" && (!defined(publishedAt) || publishedAt <= now())]
  | order(coalesce(publishedAt, _createdAt) desc){ ${post} }`

export const ARTICLES_QUERY = `*[_type == "article" && (!defined(publishedAt) || publishedAt <= now())]
  | order(coalesce(publishedAt, _createdAt) desc){ ${post}, category }`

export const PARENT_TIPS_QUERY = `*[_type == "newsEducationPage"][0].parentTips`

export const EVENTS_QUERY = `*[_type == "event" && defined(startDateTime)] | order(startDateTime asc){
  _id, title, "slug": slug.current, description, startDateTime, endDateTime, location, status,
  coverImage ${image}
}`

export const GALLERY_QUERY = `*[_type == "galleryImage" && defined(image.asset)]
  | order(coalesce(featured, false) desc, coalesce(dateTaken, _createdAt) desc){
  _id, title, caption, category, featured, dateTaken,
  "eventTitle": event->title,
  image ${image}
}`
