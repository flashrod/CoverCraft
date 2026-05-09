import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TooltipProvider } from './components/ui/tooltip'
import { AuthProvider } from './context/AuthContext'
import { inject } from '@vercel/analytics'
import './index.css'
import App from './App.jsx'

inject()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <TooltipProvider delayDuration={300}>
        <App />
      </TooltipProvider>
    </AuthProvider>
  </StrictMode>,
)
