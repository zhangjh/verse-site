import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { AppRoutes } from './App'
import en from './i18n/locales/en.json'
import zhCN from './i18n/locales/zh-CN.json'

if (typeof document === 'undefined') {
  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      resources: {
        en: { translation: en },
        'zh-CN': { translation: zhCN },
      },
      fallbackLng: 'zh-CN',
      supportedLngs: ['en', 'zh-CN'],
      interpolation: { escapeValue: false },
    })
  }
}

export async function prerender({ url }: { url: string }) {
  const lang = url.startsWith('/zh') ? 'zh-CN' : 'en'
  await i18n.changeLanguage(lang)

  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>
  )

  const baseUrl = 'https://verse-site.zhangjh.cn'
  const siteName = i18n.t('siteName')
  const title = i18n.t('site.title')
  const description = i18n.t('site.description')
  const langShort = lang === 'zh-CN' ? 'zh' : 'en'
  const locale = lang === 'zh-CN' ? 'zh_CN' : 'en_US'
  const path = url.replace(/^\/[^/]+/, '') || '/'
  const fullUrl = `${baseUrl}/${langShort}${path}`

  const elements = new Set<string>([
    `<meta name="description" content="${description}" />`,
    `<meta name="author" content="${siteName}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${siteName}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${baseUrl}/logo.png" />`,
    `<meta property="og:url" content="${fullUrl}" />`,
    `<meta property="og:locale" content="${locale}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${baseUrl}/logo.png" />`,
    `<link rel="canonical" href="${fullUrl}" />`,
    `<link rel="alternate" hreflang="en" href="${baseUrl}/en${path}" />`,
    `<link rel="alternate" hreflang="zh" href="${baseUrl}/zh${path}" />`,
    `<link rel="alternate" hreflang="x-default" href="${baseUrl}/en${path}" />`,
  ])

  return {
    html,
    head: {
      lang,
      title,
      elements,
    },
  }
}
