import { useEffect } from 'react'
import { Outlet, useParams, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout() {
  const { i18n } = useTranslation()
  const { lang } = useParams()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    if (lang) {
      const target = lang === 'zh' ? 'zh-CN' : 'en'
      if (i18n.language !== target) {
        i18n.changeLanguage(target)
      }
    }
  }, [lang, i18n])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
