import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function LanguageRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    const lang = navigator.language.startsWith('zh') ? 'zh' : 'en'
    navigate(`/${lang}`, { replace: true })
  }, [navigate])

  const siteName = typeof navigator !== 'undefined' && navigator.language.startsWith('zh') ? '素章' : 'Verse'

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <img src="/logo.png" alt={siteName} className="w-10 h-10 mx-auto mb-3 rounded-lg" />
        <div className="w-32 h-1 mx-auto bg-[var(--color-border)] rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-amber-500 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  )
}
