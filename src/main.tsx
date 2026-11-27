// language: TypeScript, file: src/main.tsx, target: Página Prumo
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// A fonte é carregada do Google Fonts com preconnect no HTML. Manrope é a única
// família do site (B1: uma typeface por site).
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Elemento #root não encontrado em index.html.')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
