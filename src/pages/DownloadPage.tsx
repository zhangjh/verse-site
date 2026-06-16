import { useEffect, useState } from 'react'
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
import { useGitHubRelease } from '../hooks/useGitHubRelease'

interface ArchLink {
  arch: string
  url: string
}

interface Platform {
  key: string
  icon: typeof Monitor | typeof Apple | typeof Globe
  link: string
  archLinks?: ArchLink[]
  isExternal?: true
}

const RELEASES_URL = 'https://github.com/zhangjh/verse-site/releases'

function findArchAssets(assets: { name: string; url: string }[], ext: string): ArchLink[] {
  const results: ArchLink[] = []
  const archPatterns = [
    { match: /arm64|aarch64|apple[-\s]?silicon/i, arch: 'Apple Silicon' },
    { match: /x64|x86_64|intel|amd64/i, arch: 'Intel' },
  ]
  for (const { match, arch } of archPatterns) {
    const asset = assets.find((a) => a.name.endsWith(ext) && match.test(a.name))
    if (asset) results.push({ arch, url: asset.url })
  }
  if (results.length === 0) {
    const fallback = assets.find((a) => a.name.endsWith(ext))
    if (fallback) results.push({ arch: '', url: fallback.url })
  }
  return results
}

export function DownloadPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language.startsWith('zh') ? 'zh' : 'en'
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.05)
  const { version, assets, loading, error } = useGitHubRelease()
  const [platforms, setPlatforms] = useState<Platform[]>(() => [
    { key: 'windows', icon: Monitor, link: '#' },
    { key: 'macos', icon: Apple, link: '#' },
    { key: 'web', icon: Globe, link: 'https://verse.zhangjh.cn', isExternal: true },
  ])

  useEffect(() => {
    if (loading || error) return
    setPlatforms([
      {
        key: 'windows',
        icon: Monitor,
        link: assets.find((a) => a.name.endsWith('.exe'))?.url ?? RELEASES_URL,
      },
      {
        key: 'macos',
        icon: Apple,
        link: RELEASES_URL,
        archLinks: findArchAssets(assets, '.dmg'),
      },
      {
        key: 'web',
        icon: Globe,
        link: 'https://verse.zhangjh.cn',
        isExternal: true,
      },
    ])
  }, [loading, error, assets])

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
              const archLinks = platform.archLinks
              return (
                <div
                  key={platform.key}
                  className="p-6 rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] text-center hover:border-amber-200 dark:hover:border-amber-800 transition-all hover:-translate-y-0.5 flex flex-col"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                    <Icon size={24} className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">
                    {t(`download.platforms.${platform.key}`)}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-5 flex-1">
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
                  ) : archLinks && archLinks.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {archLinks.map((al) => (
                        <a
                          key={al.arch}
                          href={al.url}
                          className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium transition-colors"
                        >
                          <Download size={14} />
                          {t('download.downloadButton')} ({al.arch})
                        </a>
                      ))}
                    </div>
                  ) : (
                    <a
                      href={platform.link}
                      className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium transition-colors"
                    >
                      <Download size={14} />
                      {loading
                        ? t('download.checking')
                        : platform.link === '#'
                          ? t('download.comingSoon')
                          : t('download.downloadButton')}
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
                  {loading
                    ? t('download.checking')
                    : error
                      ? t('download.currentVersion')
                      : `v${version}`}
                </p>
              </div>
              <a
                href={RELEASES_URL}
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
