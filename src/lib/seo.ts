import { realValue, siteConfig, type SiteConfig } from '../config/siteConfig.ts'

/** Bezpieczne escapowanie wartości w atrybutach HTML. */
export const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export const baseUrl = (cfg: SiteConfig = siteConfig) => cfg.site.url.value.replace(/\/$/, '')

/**
 * JSON-LD (schema.org ProfessionalService) — wyłącznie z prawdziwych danych.
 * Pola oznaczone jako placeholder są pomijane. Gdy adres strony jest
 * placeholderem, dane strukturalne nie są generowane wcale.
 */
export function buildJsonLd(cfg: SiteConfig = siteConfig): Record<string, unknown> | null {
  const url = realValue(cfg.site.url)
  if (!url || cfg.demoMode) return null
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: cfg.brand.name,
    description: cfg.site.description,
    url,
    image: new URL(cfg.site.ogImage, url).toString(),
  }
  const phone = realValue(cfg.contact.phone)
  const email = realValue(cfg.contact.email)
  const city = realValue(cfg.contact.city)
  const area = realValue(cfg.contact.serviceArea)
  if (phone) data.telephone = phone
  if (email) data.email = email
  if (city) data.address = { '@type': 'PostalAddress', addressLocality: city, addressCountry: 'PL' }
  if (area) data.areaServed = area
  const sameAs = Object.values(cfg.social).filter(Boolean)
  if (sameAs.length) data.sameAs = sameAs
  return data
}
