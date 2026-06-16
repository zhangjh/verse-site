import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../hooks/useScrollReveal'

const stepIcons = ['📝', '🤖', '📄']

export function HowItWorks() {
  const { t } = useTranslation()
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.05)
  const steps = t('howItWorks.steps', { returnObjects: true }) as Array<{ title: string; desc: string }>

  return (
    <section className="py-16 md:py-24 bg-[var(--color-bg-alt)]">
      <div className="section-container" ref={ref}>
        <div className={`text-center mb-14 ${visible ? 'reveal visible' : 'reveal'}`}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
            {t('howItWorks.desc')}
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-24 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-0.5 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 dark:from-amber-800 dark:via-amber-500 dark:to-amber-800" />

          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`relative flex flex-col items-center text-center ${
                  visible ? 'reveal visible' : 'reveal'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-2xl mb-5 shadow-sm">
                  {stepIcons[i]}
                </div>
                <div className="absolute -top-1 -right-1 md:static md:mb-3 w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center shadow-sm md:hidden">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-xs">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
