import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../hooks/useScrollReveal'

const caseIcons = ['💼', '🎯', '🎓', '✍️']

export function UseCases() {
  const { t } = useTranslation()
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.05)
  const items = t('useCases.items', { returnObjects: true }) as Array<{ title: string; desc: string }>

  return (
    <section className="py-16 md:py-24">
      <div className="section-container" ref={ref}>
        <div className={`text-center mb-14 ${visible ? 'reveal visible' : 'reveal'}`}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {t('useCases.title')}
          </h2>
          <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
            {t('useCases.desc')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] hover:border-amber-200 dark:hover:border-amber-800 transition-all hover:-translate-y-0.5 ${
                visible ? 'reveal visible' : 'reveal'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-3xl mb-4">{caseIcons[i]}</div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
