import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Sun, Moon, ExternalLink } from 'lucide-react'

const navLinks = [
  { key: 'features', href: '/features' },
  { key: 'pricing', href: '/pricing' },
  { key: 'download', href: '/download' },
  { key: 'faq', href: '/faq' },
] as const

export function Header() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState<'light' | 'dark'>('light')

  const lang = i18n.language.startsWith('zh') ? 'zh' : 'en'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem('verse-site-theme') as 'light' | 'dark' | null
    if (stored === 'light' || stored === 'dark') {
      setDarkMode(stored)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDarkMode(prefersDark ? 'dark' : 'light')
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode === 'dark')
  }, [darkMode])

  const toggleTheme = () => {
    const next = darkMode === 'light' ? 'dark' : 'light'
    setDarkMode(next)
    localStorage.setItem('verse-site-theme', next)
  }

  const ThemeIcon = darkMode === 'light' ? Moon : Sun

  const switchLang = () => {
    const target = lang === 'zh' ? 'en' : 'zh'
    i18n.changeLanguage(target === 'zh' ? 'zh-CN' : 'en')
    let path = location.pathname.replace(/^\/[a-z]{2}/, '')
    if (!path) path = '/'
    navigate(`/${target}${path}`, { replace: true })
  }

  const isActive = (href: string) => {
    const path = location.pathname.replace(/^\/[^/]+/, '')
    return path === href || (href === '/features' && path.startsWith('/features'))
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-bg)]/80 backdrop-blur-xl shadow-sm border-b border-[var(--color-border)]'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          <Link to={`/${lang}`} className="flex items-center gap-2.5 group">
            <img src="/logo.png" alt={t('siteName')} className="w-8 h-8 rounded-lg transition-transform group-hover:scale-105" />
            <span className="font-semibold text-lg tracking-tight">{t('siteName')}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ key, href }) => (
              <Link
                key={key}
                to={`/${lang}${href}`}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(href)
                    ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-alt)]'
                }`}
              >
                {t(`nav.${key}`)}
              </Link>
            ))}
            <div className="w-px h-5 bg-[var(--color-border)] mx-2" />
            <button
              onClick={switchLang}
              className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-alt)] transition-colors"
            >
              {t('nav.language')}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-alt)] transition-colors"
              aria-label={darkMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              <ThemeIcon size={18} />
            </button>
            <a
              href="https://verse.zhangjh.cn"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium transition-colors"
            >
              {t('nav.openWeb')}
              <ExternalLink size={14} />
            </a>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg-alt)]"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg)] animate-fade-in">
          <div className="section-container py-4 space-y-1">
            {navLinks.map(({ key, href }) => (
              <Link
                key={key}
                to={`/${lang}${href}`}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(href)
                    ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-alt)]'
                }`}
              >
                {t(`nav.${key}`)}
              </Link>
            ))}
            <div className="h-px bg-[var(--color-border)] my-2" />
            <button
              onClick={switchLang}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-alt)]"
            >
              {t('nav.language')}
            </button>
            <button
              onClick={toggleTheme}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-alt)]"
            >
              {darkMode === 'light' ? 'Light' : 'Dark'} Mode
            </button>
            <a
              href="https://verse.zhangjh.cn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30"
            >
              {t('nav.openWeb')}
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
