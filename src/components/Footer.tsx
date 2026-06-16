import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { QrCode } from 'lucide-react'

export function Footer() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language.startsWith('zh') ? 'zh' : 'en'

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-alt)]">
      <div className="section-container py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to={`/${lang}`} className="flex items-center gap-2.5 mb-3">
              <img src="/site/logo.png" alt={t('siteName')} className="w-7 h-7 rounded-md" />
              <span className="font-semibold text-lg">{t('siteName')}</span>
            </Link>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-xs">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">{t('footer.product')}</h3>
            <ul className="space-y-2">
              {(['features', 'pricing', 'download', 'faq'] as const).map((key) => (
                <li key={key}>
                  <Link
                    to={`/${lang}/${key === 'faq' ? 'faq' : key === 'features' ? 'features' : key}`}
                    className="text-sm text-[var(--color-text-muted)] hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  >
                    {t(`footer.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">{t('footer.social')}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/zhangjh/verse-site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"/></svg>
                  GitHub
                </a>
              </li>
              <li className="group relative flex items-center gap-2">
                <QrCode size={14} className="text-[var(--color-text-muted)] shrink-0" />
                <span className="text-sm text-[var(--color-text-muted)]">{t('footer.wechat')}</span>
                <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block z-10">
                  <img src="/site/wechat-qr.jpg" alt="WeChat QR" className="w-28 h-28 rounded-xl border border-[var(--color-border)] shadow-lg object-cover" />
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">{t('footer.contact')}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:support@zhangjh.cn"
                  className="text-sm text-[var(--color-text-muted)] hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  support@zhangjh.cn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--color-border)]">
          <p className="text-xs text-[var(--color-text-muted)] text-center">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
