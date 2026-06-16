import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

interface SeoHeadProps {
  title?: string
  description?: string
}

export function SeoHead({ title, description }: SeoHeadProps) {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const lang = i18n.language.startsWith('zh') ? 'zh' : 'en'
  const altLang = lang === 'zh' ? 'en' : 'zh'
  const baseUrl = 'https://verse.zhangjh.cn/site'

  const pageTitle = title || t('site.title')
  const pageDesc = description || t('site.description')

  useEffect(() => {
    document.title = pageTitle

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('name', name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', pageDesc)

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
      }
      el.setAttribute('href', href)
    }

    setLink('canonical', `${baseUrl}/${lang}${location.pathname.replace(/^\/[^/]+/, '')}`)

    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  }, [pageTitle, pageDesc, lang, location.pathname, baseUrl])

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
