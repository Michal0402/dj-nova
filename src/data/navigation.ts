import { siteConfig } from '../config/siteConfig'

export type NavItem = { id: string; label: string }

const showTestimonials = siteConfig.testimonials.items.length > 0 || siteConfig.testimonials.whenEmpty === 'empty-state'

export const navItems: NavItem[] = [
  { id: 'start', label: 'Start' },
  { id: 'o-mnie', label: 'O mnie' },
  { id: 'oferta', label: 'Oferta' },
  { id: 'realizacje', label: 'Realizacje' },
  ...(showTestimonials ? [{ id: 'opinie', label: 'Opinie' }] : []),
  { id: 'faq', label: 'FAQ' },
  { id: 'kontakt', label: 'Kontakt' },
]
