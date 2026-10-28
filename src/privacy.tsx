import '@fontsource-variable/space-grotesk/wght.css'
import '@fontsource-variable/inter/wght.css'
import './styles/index.css'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { PrivacyPage } from './pages/PrivacyPage'

const root = document.getElementById('root')!
const tree = (
  <StrictMode>
    <PrivacyPage />
  </StrictMode>
)
// HTML jest prerenderowany w buildzie → hydratacja; w `npm run dev` zwykły render.
if (root.hasChildNodes()) hydrateRoot(root, tree)
else createRoot(root).render(tree)
