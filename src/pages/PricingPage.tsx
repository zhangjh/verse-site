import { useTranslation } from 'react-i18next'
import { Check, Sparkles, X } from 'lucide-react'
import { SeoHead } from '../components/SeoHead'
import { useScrollReveal } from '../hooks/useScrollReveal'

const plans = ['free', 'pro', 'plus'] as const

const featureKeys = [
  'featureLocalFirst',
  'featureRichText',
  'featureMarkdown',
  'featureFolder',
  'featureCalendar',
  'featureAttachments',
  'featureExport',
  'featureSync',
  'featureCloudStorage',
  'featureShare',
  'featureLinkPreview',
  'featurePriority',
  'featureAI',
  'featureAILimit',
  'featureAIRewrite',
] as const

type FeatureAvailability = Record<string, boolean[]>

const featureAvailability: FeatureAvailability = {
  featureLocalFirst: [true, true, true],
  featureRichText: [true, true, true],
  featureMarkdown: [true, true, true],
  featureFolder: [true, true, true],
  featureCalendar: [true, true, true],
  featureAttachments: [true, true, true],
  featureExport: [true, true, true],
  featureAI: [false, false, true],
  featureAILimit: [false, false, true],
  featureAIRewrite: [false, false, true],
  featureSync: [false, true, true],
  featureCloudStorage: [false, true, true],
  featureShare: [false, true, true],
  featureLinkPreview: [false, true, true],
  featurePriority: [false, true, true],
}

export function PricingPage() {
  const { t } = useTranslation()
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.05)

  return (
    <>
      <SeoHead
        title={`${t('pricingPage.title')} - ${t('siteName')}`}
        description={t('pricingPage.desc')}
      />

      <div className="section-container pt-20 pb-10 md:pt-28 md:pb-16" ref={ref}>
        <div className={`text-center max-w-2xl mx-auto ${visible ? 'reveal visible' : 'reveal'}`}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-medium mb-4">
            <Sparkles size={14} />
            <span>Pricing</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {t('pricingPage.title')}
          </h1>
          <p className="text-lg text-[var(--color-text-muted)]">
            {t('pricingPage.desc')}
          </p>
        </div>
      </div>

      <div className="section-container pb-16 md:pb-24">
        <div className={`max-w-5xl mx-auto ${visible ? 'reveal visible' : 'reveal'}`}>
          <div className="grid md:grid-cols-3 gap-5 mb-14">
            {plans.map((plan, i) => {
              const p = t(`pricing.${plan}`, { returnObjects: true }) as { name: string; price: string; desc: string; features: string[] }
              const isPro = plan === 'pro'
              return (
                <div
                  key={plan}
                  className={`relative p-6 rounded-2xl border transition-all ${
                    isPro
                      ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700 shadow-lg shadow-amber-100/50 dark:shadow-amber-900/20 scale-[1.02]'
                      : 'bg-[var(--color-card)] border-[var(--color-border)]'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {isPro && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-white text-xs font-semibold shadow-sm">
                      Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-1">{p.name}</h3>
                  <p className="text-2xl font-bold mb-1">{p.price}</p>
                  <p className="text-sm text-[var(--color-text-muted)] mb-5">{p.desc}</p>
                  <ul className="space-y-2.5 mb-6">
                    {p.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-sm">
                        <Check size={15} className="text-amber-500 mt-0.5 shrink-0" />
                        <span className="text-[var(--color-text-muted)]">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`https://verse.zhangjh.cn`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isPro
                        ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm'
                        : 'border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-bg-alt)]'
                    }`}
                  >
                    {t('pricingPage.ctaStart')}
                  </a>
                </div>
              )
            })}
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden">
            <div className="p-6 border-b border-[var(--color-border)]">
              <h3 className="text-lg font-semibold">{t('pricingPage.compareTitle')}</h3>
            </div>
            <div className="divide-y divide-[var(--color-border)]">
              {featureKeys.map((key) => {
                const avails = featureAvailability[key]
                const label = t(`pricingPage.${key}`)
                return (
                  <div key={key} className="grid grid-cols-[1fr_repeat(3,1fr)] gap-2 px-6 py-3.5 text-sm">
                    <span className="text-[var(--color-text-muted)]">{label}</span>
                    {avails.map((avail, pi) => (
                      <div key={pi} className="flex justify-center">
                        {avail ? (
                          <Check size={16} className="text-amber-500" />
                        ) : (
                          <X size={16} className="text-[var(--color-text-muted)]/40" />
                        )}
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
            <div className="grid grid-cols-[1fr_repeat(3,1fr)] gap-2 px-6 py-4 bg-[var(--color-bg-alt)] text-sm font-medium">
              <span />
              {plans.map((plan) => (
                <div key={plan} className="flex justify-center">
                  <a
                    href={`https://verse.zhangjh.cn`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium transition-colors"
                  >
                    {t('pricingPage.ctaStart')}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-bold text-center mb-6">{t('pricing.faq')}</h3>
            <div className="max-w-2xl mx-auto space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)]"
                >
                  <h4 className="font-medium text-sm mb-1">
                    {t(`pricing.faqQ${i}`)}
                  </h4>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {t(`pricing.faqA${i}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
