import { memo, useEffect } from 'react'

const SITE_NAME = 'LocalServices'
const BASE_URL = import.meta.env.VITE_SITE_URL || window.location.origin
const DEFAULT_DESC = 'Find trusted local service providers for home cleaning, plumbing, electrical, painting, and more.'

function SEO({
  title,
  description = DEFAULT_DESC,
  keywords = 'local services, home services, cleaning, plumbing, electrical',
  ogImage,
  ogType = 'website',
  canonicalUrl,
  noIndex = false,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const url = canonicalUrl || (BASE_URL + window.location.pathname)

  useEffect(() => {
    document.title = fullTitle

    const setMeta = (name, content, prop = 'name') => {
      const key = prop === 'property' ? 'property' : 'name'
      let el = document.querySelector(`meta[${key}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(key, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    const removeMeta = (name, prop = 'name') => {
      const key = prop === 'property' ? 'property' : 'name'
      const el = document.querySelector(`meta[${key}="${name}"]`)
      if (el) el.remove()
    }

    setMeta('description', description)
    setMeta('keywords', keywords)

    setMeta('og:title', fullTitle, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:type', ogType, 'property')
    setMeta('og:url', url, 'property')
    setMeta('og:site_name', SITE_NAME, 'property')
    if (ogImage) setMeta('og:image', ogImage, 'property')

    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
    if (ogImage) setMeta('twitter:image', ogImage)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)

    if (noIndex) {
      setMeta('robots', 'noindex, nofollow')
    } else {
      removeMeta('robots')
    }

    return () => {
      document.title = SITE_NAME
    }
  }, [fullTitle, description, keywords, ogImage, ogType, url, noIndex])

  return null
}

export default memo(SEO)
