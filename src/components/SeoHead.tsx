import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

interface SeoHeadProps {
  title?: string
  description?: string
  image?: string
}

export function SeoHead({ title, description, image }: SeoHeadProps) {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const lang = i18n.language.startsWith('zh') ? 'zh' : 'en'
  const baseUrl = 'https://verse-site.zhangjh.cn'

  const pageTitle = title || t('site.title')
  const pageDesc = description || t('site.description')
  const pageImage = image || `${baseUrl}/logo.png`
  const fullUrl = `${baseUrl}/${lang}${location.pathname.replace(/^\/[^/]+/, '') || '/'}`

  useEffect(() => {
    document.title = pageTitle

    const setOrCreateMeta = (attr: string, value: string, isProperty = false) => {
      const key = isProperty ? 'property' : 'name'
      const selector = isProperty ? `meta[property="${attr}"]` : `meta[name="${attr}"]`
      let el = document.querySelector(selector) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(key, attr)
        document.head.appendChild(el)
      }
      el.setAttribute('content', value)
    }


    setOrCreateMeta('description', pageDesc)

    setOrCreateMeta('og:title', pageTitle, true)
    setOrCreateMeta('og:description', pageDesc, true)
    setOrCreateMeta('og:image', pageImage, true)
    setOrCreateMeta('og:url', fullUrl, true)
    setOrCreateMeta('og:locale', lang === 'zh' ? 'zh_CN' : 'en_US', true)

    setOrCreateMeta('twitter:card', 'summary_large_image')
    setOrCreateMeta('twitter:title', pageTitle)
    setOrCreateMeta('twitter:description', pageDesc)
    setOrCreateMeta('twitter:image', pageImage)

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
      }
      el.setAttribute('href', href)
    }

    setLink('canonical', fullUrl)

    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  }, [pageTitle, pageDesc, pageImage, fullUrl, lang])

  useEffect(() => {
    const removeOld = document.querySelectorAll('link[hreflang]')
    removeOld.forEach(el => el.remove())

    const path = location.pathname.replace(/^\/[^/]+/, '')

    const addHreflang = (hreflang: string, href: string) => {
      const link = document.createElement('link')
      link.setAttribute('rel', 'alternate')
      link.setAttribute('hreflang', hreflang)
      link.setAttribute('href', href)
      document.head.appendChild(link)
    }

    addHreflang('en', `${baseUrl}/en${path}`)
    addHreflang('zh', `${baseUrl}/zh${path}`)
    addHreflang('x-default', `${baseUrl}/en${path}`)
  }, [location.pathname, baseUrl])

  return null
}
