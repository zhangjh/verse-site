import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, Sparkles } from 'lucide-react'
import { SeoHead } from '../components/SeoHead'
import { CtaSection } from '../components/CtaSection'
import { useScrollReveal } from '../hooks/useScrollReveal'

function FaqItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-5 py-4 text-left text-sm font-medium hover:bg-[var(--color-bg-alt)] transition-colors"
      >
        <span>{q}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 ml-2 text-[var(--color-text-muted)] transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-[var(--color-text-muted)] leading-relaxed animate-fade-in">
          {a}
        </div>
      )}
    </div>
  )
}

export function FaqPage() {
  const { t } = useTranslation()
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.05)
  const items = t('faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>

  return (
    <>
      <SeoHead
        title={`${t('faq.title')} - ${t('siteName')}`}
        description={t('faq.desc')}
      />

      <div className="section-container pt-20 pb-10 md:pt-28 md:pb-16" ref={ref}>
        <div className={`text-center max-w-2xl mx-auto ${visible ? 'reveal visible' : 'reveal'}`}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-medium mb-4">
            <Sparkles size={14} />
            <span>FAQ</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {t('faq.title')}
          </h1>
          <p className="text-lg text-[var(--color-text-muted)]">
            {t('faq.desc')}
          </p>
        </div>
      </div>

      <div className="section-container pb-16 md:pb-24">
        <div className={`max-w-2xl mx-auto space-y-3 ${visible ? 'reveal visible reveal-delay-2' : 'reveal reveal-delay-2'}`}>
          {items.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} defaultOpen={i === 0} />
          ))}
        </div>
      </div>

      <CtaSection />
    </>
  )
}
