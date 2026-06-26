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

  return {
    html,
    head: {
      lang: lang === 'zh-CN' ? 'zh-CN' : 'en',
      title: '',
      elements: new Set<string>(),
    },
  }
}
