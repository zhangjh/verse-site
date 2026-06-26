import { useTranslation } from 'react-i18next'
import {
  FileText,
  Bot,
  Link2,
  Calendar,
  Paperclip,
  Cloud,
  Sparkles,
} from 'lucide-react'
import { SeoHead } from '../components/SeoHead'
import { CtaSection } from '../components/CtaSection'
import { useScrollReveal } from '../hooks/useScrollReveal'

const iconMap = [FileText, Bot, Link2, Calendar, Paperclip, Cloud] as const

const featureImages = [
  '/document.png',
  '/AI-helper.png',
  '/preview_card.png',
  '/calendar.png',
  '/attachment.png',
  '/share.png',
]

function FeatureBlock({ item, icon: Icon, isReversed, index }: {
  item: { title: string; desc: string; detail: string }
  icon: typeof FileText
  isReversed: boolean
  index: number
}) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.1)

  return (
    <div
      ref={ref}
      className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16 ${
        visible ? 'reveal visible' : 'reveal'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
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
        <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-md">
          <img
            src={featureImages[index]}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export function FeaturesPage() {
  const { t } = useTranslation()
  const items = t('features.items', { returnObjects: true }) as Array<{ title: string; desc: string; detail: string }>

  return (
    <>
      <SeoHead
        title={`${t('featuresPage.title')} - ${t('siteName')}`}
        description={t('featuresPage.desc')}
      />

      <div className="section-container pt-20 pb-10 md:pt-28 md:pb-16">
        <div className="text-center max-w-2xl mx-auto reveal visible">
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
          {items.map((item, i) => (
            <FeatureBlock
              key={i}
              item={item}
              icon={iconMap[i]}
              isReversed={i % 2 === 1}
              index={i}
            />
          ))}
        </div>
      </div>

      <CtaSection />
    </>
  )
}
