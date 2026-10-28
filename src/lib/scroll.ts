import type { EventTypeId } from '../config/siteConfig'

export const PRESELECT_EVENT = 'nova:preselect-event'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Płynne przewinięcie do sekcji + aktualizacja hasha bez przeładowania. */
export function scrollToSection(id: string, opts: { focus?: boolean } = {}) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  const url = new URL(window.location.href)
  url.hash = id === 'start' ? '' : id
  history.replaceState(null, '', url)
  if (opts.focus) {
    el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
  }
}

/**
 * Przejście do formularza z wybranym typem wydarzenia.
 * Ustawia ?typ=… w URL (link działa też po skopiowaniu) i powiadamia formularz.
 */
export function goToContact(eventType?: EventTypeId) {
  const url = new URL(window.location.href)
  if (eventType) url.searchParams.set('typ', eventType)
  url.hash = 'kontakt'
  history.replaceState(null, '', url)
  if (eventType) window.dispatchEvent(new CustomEvent(PRESELECT_EVENT, { detail: eventType }))
  scrollToSection('kontakt')
}

export function contactHref(eventType?: EventTypeId) {
  return eventType ? `?typ=${eventType}#kontakt` : '#kontakt'
}
