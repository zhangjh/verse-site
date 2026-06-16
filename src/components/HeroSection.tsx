import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowDown, ChevronRight, Sparkles, Shield, Feather } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function HeroSection() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language.startsWith('zh') ? 'zh' : 'en'
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.1)

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 via-transparent to-transparent dark:from-amber-950/10 dark:via-transparent pointer-events-none" />

      <div className="section-container pt-20 pb-16 md:pt-28 md:pb-24" ref={ref}>
        <div className={`text-center max-w-3xl mx-auto ${visible ? 'reveal visible' : 'reveal'}`}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-medium mb-6">
            <Sparkles size={14} />
            <span>Local-first · AI-native</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 whitespace-pre-line">
            {t('hero.title')}
          </h1>

          <p className="text-lg sm:text-xl text-[var(--color-text-muted)] font-medium mb-3">
            {t('hero.subtitle')}
          </p>

          <p className="text-base text-[var(--color-text-muted)]/80 max-w-xl mx-auto mb-10 whitespace-pre-line leading-relaxed">
            {t('hero.desc')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to={`/${lang}/download`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-base shadow-lg shadow-amber-200/50 dark:shadow-amber-900/30 transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              <Feather size={18} />
              {t('hero.ctaDownload')}
            </Link>
            <Link
              to={`/${lang}/features`}
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl border border-[var(--color-border)] text-[var(--color-text)] font-medium text-base hover:bg-[var(--color-bg-alt)] transition-all"
            >
              {t('hero.ctaLearnMore')}
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        <div className={`mt-16 md:mt-20 ${visible ? 'reveal visible reveal-delay-3' : 'reveal reveal-delay-3'}`}>
          <div className="relative mx-auto max-w-4xl">
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-800 dark:to-stone-700 flex items-center justify-center border border-[var(--color-border)] shadow-xl">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                  <Shield size={32} className="text-amber-500" />
                </div>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Product preview — screenshot / video placeholder
                </p>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 -left-3 h-6 bg-amber-500/10 dark:bg-amber-500/5 blur-2xl rounded-full" />
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <ArrowDown size={20} className="text-[var(--color-text-muted)] animate-bounce" />
        </div>
      </div>
    </section>
  )
}
