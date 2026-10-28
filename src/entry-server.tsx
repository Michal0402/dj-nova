/**
 * Prerender (SSG) — używany tylko podczas `npm run build` przez scripts/prerender.mjs.
 * Gotowy HTML trafia do dist/*.html, a przeglądarka go hydratuje (main.tsx / privacy.tsx).
 */
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { PrivacyPage } from './pages/PrivacyPage'

export const pages: Record<string, () => string> = {
  'index.html': () =>
    renderToString(
      <StrictMode>
        <App />
      </StrictMode>,
    ),
  'polityka-prywatnosci.html': () =>
    renderToString(
      <StrictMode>
        <PrivacyPage />
      </StrictMode>,
    ),
}
