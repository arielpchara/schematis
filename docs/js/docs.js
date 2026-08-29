const tocLinks = [...document.querySelectorAll('[data-toc]')]
const headings = tocLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean)

const setCurrent = (id) => {
  for (const link of tocLinks) {
    const on = link.getAttribute('href') === `#${id}`
    if (on) link.setAttribute('aria-current', 'location')
    else link.removeAttribute('aria-current')
  }
}

if (headings.length) {
  const seen = new Map()
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) seen.set(entry.target.id, entry.isIntersecting)
      const active = headings.find((heading) => seen.get(heading.id))
      if (active) setCurrent(active.id)
    },
    { rootMargin: '-20% 0px -65% 0px', threshold: 0 }
  )
  for (const heading of headings) io.observe(heading)
  setCurrent(headings[0].id)
}

const toggle = document.querySelector('.nav-toggle')
const sidebar = document.querySelector('.sidebar')
const closeNav = () => document.body.classList.remove('nav-open')

toggle?.addEventListener('click', () => {
  document.body.classList.toggle('nav-open')
})

sidebar?.addEventListener('click', (event) => {
  if (event.target === sidebar) closeNav()
})

sidebar?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeNav)
})
