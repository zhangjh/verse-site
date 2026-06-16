import { useTranslation } from 'react-i18next'
import { SeoHead } from '../components/SeoHead'
import { HeroSection } from '../components/HeroSection'
import { FeaturesGrid } from '../components/FeaturesGrid'
import { HowItWorks } from '../components/HowItWorks'
import { UseCases } from '../components/UseCases'
import { PricingSummary } from '../components/PricingSummary'
import { CtaSection } from '../components/CtaSection'

export function HomePage() {
  const { t } = useTranslation()

  return (
    <>
      <SeoHead />
      <HeroSection />
      <FeaturesGrid />
      <HowItWorks />
      <UseCases />
      <PricingSummary />
      <CtaSection />
    </>
  )
}
