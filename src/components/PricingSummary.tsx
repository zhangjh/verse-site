import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const plans = ['free', 'pro', 'plus'] as const

export function PricingSummary() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language.startsWith('zh') ? 'zh' : 'en'
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.05)

  return (
    <section className="py-16 md:py-24 bg-[var(--color-bg-alt)]">
      <div className="section-container" ref={ref}>
        <div className={`text-center mb-14 ${visible ? 'reveal visible' : 'reveal'}`}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
            {t('pricing.desc')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {plans.map((plan, i) => {
            const p = t(`pricing.${plan}`, { returnObjects: true }) as { name: string; price: string; desc: string; features: string[] }
            const isPro = plan === 'plus'
            return (
              <div
                key={plan}
                className={`relative p-6 rounded-2xl border transition-all ${
                  isPro
                    ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700 shadow-lg shadow-amber-100/50 dark:shadow-amber-900/20 scale-[1.02]'
                    : 'bg-[var(--color-card)] border-[var(--color-border)]'
                } ${visible ? 'reveal visible' : 'reveal'}`}
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
                  {p.features.slice(0, 4).map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                      <Check size={15} className="text-amber-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                  {p.features.length > 4 && (
                    <li className="text-xs text-[var(--color-text-muted)] pt-1">
                      +{p.features.length - 4} more
                    </li>
                  )}
                </ul>
                <Link
                  to={`/${lang}/pricing`}
                  className={`block text-center py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isPro
                      ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm'
                      : 'border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-bg-alt)]'
                  }`}
                >
                  {t('pricing.cta')}
                </Link>
              </div>
            )
          })}
        </div>

        <div className={`text-center mt-10 ${visible ? 'reveal visible reveal-delay-4' : 'reveal reveal-delay-4'}`}>
          <Link
            to={`/${lang}/pricing`}
            className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium text-sm hover:underline"
          >
            {t('pricing.cta')}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
