import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './i18n'
import './index.css'
import { AppRoutes } from './App'

function ClientApp() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClientApp />
  </StrictMode>
)
