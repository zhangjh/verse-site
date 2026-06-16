import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import { LanguageRedirect } from './components/LanguageRedirect'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { FeaturesPage } from './pages/FeaturesPage'
import { PricingPage } from './pages/PricingPage'
import { DownloadPage } from './pages/DownloadPage'
import { FaqPage } from './pages/FaqPage'

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <img src="/logo.png" alt={navigator.language.startsWith('zh') ? '素章' : 'Verse'} className="w-10 h-10 mx-auto mb-3 rounded-lg" />
        <div className="w-32 h-1 mx-auto bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-amber-500 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<LanguageRedirect />} />
          <Route path="/:lang" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="features" element={<FeaturesPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="download" element={<DownloadPage />} />
            <Route path="faq" element={<FaqPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
