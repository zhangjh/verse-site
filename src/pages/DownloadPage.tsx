import { useTranslation } from 'react-i18next'
import {
  Monitor,
  Download,
  ExternalLink,
  Sparkles,
  Apple,
  Globe,
} from 'lucide-react'
import { SeoHead } from '../components/SeoHead'
import { useScrollReveal } from '../hooks/useScrollReveal'

const platforms = [
  {
    key: 'windows' as const,
    icon: Monitor,
    link: '#',
    filename: 'Verse_1.2.1_x64-setup.exe',
  },
  {
    key: 'macos' as const,
    icon: Apple,
    link: '#',
    filename: 'Verse_1.2.1_x64.dmg',
  },
  {
    key: 'web' as const,
    icon: Globe,
    link: 'https://verse.zhangjh.cn',
    isExternal: true,
  },
]

export function DownloadPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language.startsWith('zh') ? 'zh' : 'en'
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.05)

  return (
    <>
      <SeoHead
        title={`${t('download.title')} - ${t('siteName')}`}
        description={t('download.desc')}
      />

      <div className="section-container pt-20 pb-10 md:pt-28 md:pb-16" ref={ref}>
        <div className={`text-center max-w-2xl mx-auto ${visible ? 'reveal visible' : 'reveal'}`}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-medium mb-4">
            <Sparkles size={14} />
            <span>Download</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {t('download.title')}
          </h1>
          <p className="text-lg text-[var(--color-text-muted)]">
            {t('download.desc')}
          </p>
        </div>
      </div>

      <div className="section-container pb-16 md:pb-24">
        <div className={`max-w-4xl mx-auto ${visible ? 'reveal visible' : 'reveal'}`}>
          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {platforms.map((platform, i) => {
              const Icon = platform.icon
              const isWeb = platform.key === 'web'
              return (
                <div
                  key={platform.key}
                  className="p-6 rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] text-center hover:border-amber-200 dark:hover:border-amber-800 transition-all hover:-translate-y-0.5"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                    <Icon size={24} className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">
                    {t(`download.platforms.${platform.key}`)}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-5">
                    {t(`download.${platform.key}Desc`)}
                  </p>
                  {isWeb ? (
                    <a
                      href={platform.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium transition-colors"
                    >
                      {t('download.openWeb')}
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <a
                      href={platform.link}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium transition-colors"
                    >
                      <Download size={14} />
                      {t('download.downloadButton')}
                    </a>
                  )}
                </div>
              )
            })}
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[var(--color-border)]">
              <div>
                <h3 className="font-semibold text-lg">{t('download.version')}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">
                  {t('download.currentVersion')}
                </p>
              </div>
              <a
                href="https://github.com/zhangjh/verse-site/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-amber-600 dark:text-amber-400 hover:underline"
              >
                <ExternalLink size={14} />
                {t('download.releaseNotes')}
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">{t('download.requirements')}</h4>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <li className="flex items-start gap-2">
                  <Monitor size={15} className="mt-0.5 shrink-0" />
                  <span><strong>Windows:</strong> Windows 10/11 (x64), 4GB RAM, 200MB disk</span>
                </li>
                <li className="flex items-start gap-2">
                  <Apple size={15} className="mt-0.5 shrink-0" />
                  <span><strong>macOS:</strong> macOS 15+ (Intel & Apple Silicon), 4GB RAM, 200MB disk</span>
                </li>
                <li className="flex items-start gap-2">
                  <Globe size={15} className="mt-0.5 shrink-0" />
                  <span><strong>Web:</strong> Chrome 90+, Firefox 90+, Safari 15+, Edge 90+</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
