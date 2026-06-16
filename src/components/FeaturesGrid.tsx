import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  FileText,
  Bot,
  Link2,
  Calendar,
  Paperclip,
  Cloud,
  ArrowRight,
} from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const iconMap = [FileText, Bot, Link2, Calendar, Paperclip, Cloud] as const

export function FeaturesGrid() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language.startsWith('zh') ? 'zh' : 'en'
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.05)
  const items = t('features.items', { returnObjects: true }) as Array<{ title: string; desc: string; detail: string }>

  return (
    <section className="py-16 md:py-24" id="features">
      <div className="section-container" ref={ref}>
        <div className={`text-center mb-14 ${visible ? 'reveal visible' : 'reveal'}`}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {t('features.title')}
          </h2>
          <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
            {t('features.desc')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => {
            const Icon = iconMap[i]
            return (
              <div
                key={i}
                className={`group p-6 rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] hover:border-amber-200 dark:hover:border-amber-800 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 ${
                  visible ? 'reveal visible' : 'reveal'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={20} className="text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-3">
                  {item.desc}
                </p>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                  {item.detail}
                </p>
              </div>
            )
          })}
        </div>

        <div className={`text-center mt-10 ${visible ? 'reveal visible reveal-delay-4' : 'reveal reveal-delay-4'}`}>
          <Link
            to={`/${lang}/features`}
            className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium text-sm hover:underline"
          >
            View all features
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
