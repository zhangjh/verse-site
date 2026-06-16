import { useTranslation } from 'react-i18next'
import {
  FileText,
  Bot,
  Link2,
  Calendar,
  Paperclip,
  Cloud,
  Image,
  Sparkles,
} from 'lucide-react'
import { SeoHead } from '../components/SeoHead'
import { CtaSection } from '../components/CtaSection'
import { useScrollReveal } from '../hooks/useScrollReveal'

const iconMap = [FileText, Bot, Link2, Calendar, Paperclip, Cloud] as const

const placeholderImages = [
  { icon: Image, label: 'Document workspace UI' },
  { icon: Bot, label: 'AI writing panel' },
  { icon: Image, label: 'Link preview cards' },
  { icon: Calendar, label: 'Calendar notes' },
  { icon: Image, label: 'Attachment preview' },
  { icon: Cloud, label: 'Sync & share' },
]

export function FeaturesPage() {
  const { t } = useTranslation()
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.05)
  const items = t('features.items', { returnObjects: true }) as Array<{ title: string; desc: string; detail: string }>

  return (
    <>
      <SeoHead
        title={`${t('featuresPage.title')} - ${t('siteName')}`}
        description={t('featuresPage.desc')}
      />

      <div className="section-container pt-20 pb-10 md:pt-28 md:pb-16" ref={ref}>
        <div className={`text-center max-w-2xl mx-auto ${visible ? 'reveal visible' : 'reveal'}`}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-medium mb-4">
            <Sparkles size={14} />
            <span>Features</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {t('featuresPage.title')}
          </h1>
          <p className="text-lg text-[var(--color-text-muted)]">
            {t('featuresPage.desc')}
          </p>
        </div>
      </div>

      <div className="section-container pb-16 md:pb-24">
        <div className="space-y-20 md:space-y-28">
          {items.map((item, i) => {
            const Icon = iconMap[i]
            const img = placeholderImages[i]
            const isReversed = i % 2 === 1
            return (
              <div
                key={i}
                className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16 ${
                  visible ? 'reveal visible' : 'reveal'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center mb-4">
                    <Icon size={24} className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                    {item.title}
                  </h2>
                  <p className="text-base text-[var(--color-text-muted)] leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                    {item.detail}
                  </p>
                </div>
                <div className="flex-1 w-full">
                  <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-800 dark:to-stone-700 flex items-center justify-center border border-[var(--color-border)] shadow-md">
                    <div className="text-center">
                      <img.icon size={36} className="mx-auto mb-2 text-[var(--color-text-muted)]/50" />
                      <p className="text-xs text-[var(--color-text-muted)]">{img.label}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <CtaSection />
    </>
  )
}
