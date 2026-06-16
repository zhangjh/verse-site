import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Feather, ArrowRight } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function CtaSection() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language.startsWith('zh') ? 'zh' : 'en'
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.1)

  return (
    <section className="py-16 md:py-24">
      <div className="section-container" ref={ref}>
        <div
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 px-8 py-14 md:py-20 text-center ${
            visible ? 'reveal visible' : 'reveal'
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/5 rounded-full blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-amber-100 text-lg mb-8 max-w-lg mx-auto">
              {t('cta.desc')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to={`/${lang}/download`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-amber-700 font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                <Feather size={18} />
                {t('cta.button')}
              </Link>
              <Link
                to={`/${lang}/faq`}
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl border border-amber-400/50 text-white font-medium hover:bg-white/10 transition-all"
              >
                {t('nav.faq')}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
