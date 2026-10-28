import { siteConfig } from '../config/siteConfig'
import type { contactSchema } from './contactSchema'
import type { z } from 'zod'

/** Schemat Zod ładowany leniwie (mniejszy bundle startowy). */
export const loadSchema = () => import('./contactSchema').then((m) => m.contactSchema)

export const todayIso = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}


export type ContactInput = z.input<typeof contactSchema>
export type ContactData = z.output<typeof contactSchema>
export type ContactField = keyof ContactInput
export type ContactFormState = Omit<ContactInput, 'consent'> & { consent: boolean }

export const emptyContact: ContactFormState = {
  name: '',
  email: '',
  phone: '',
  eventType: '',
  date: '',
  location: '',
  guests: '',
  message: '',
  consent: false,
  website: '',
}

/* ── Adaptery wysyłki ─────────────────────────────────────────────────────── */

/**
 * - `sent`     — serwer potwierdził przyjęcie zapytania,
 * - `handoff`  — otwarto program pocztowy (mailto); wiadomość NIE jest jeszcze wysłana,
 * - `error`    — błąd; pokaż alternatywny kontakt.
 */
export type SubmitResult =
  | { status: 'sent' }
  | { status: 'handoff'; mailtoUrl: string }
  | { status: 'error'; message: string }

export interface ContactTransport {
  readonly kind: 'api' | 'mailto'
  send(data: ContactData): Promise<SubmitResult>
}

const eventLabel = (id: string) => siteConfig.eventTypes.find((e) => e.id === id)?.label ?? id

export function formatMessage(d: ContactData) {
  return [
    `Imię: ${d.name}`,
    `E-mail: ${d.email}`,
    d.phone ? `Telefon: ${d.phone}` : null,
    `Typ wydarzenia: ${eventLabel(d.eventType)}`,
    `Data: ${d.date}`,
    `Miejscowość: ${d.location}`,
    d.guests ? `Liczba gości: ${d.guests}` : null,
    '',
    d.message,
  ]
    .filter((l) => l !== null)
    .join('\n')
}

/** Tryb awaryjny: buduje wiadomość i otwiera program pocztowy użytkownika. */
export const mailtoTransport: ContactTransport = {
  kind: 'mailto',
  async send(d) {
    const subject = `Zapytanie o termin: ${eventLabel(d.eventType)}, ${d.date}`
    const mailtoUrl = `mailto:${siteConfig.contact.email.value}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formatMessage(d))}`
    window.location.href = mailtoUrl
    return { status: 'handoff', mailtoUrl }
  },
}

/**
 * Adapter do przyszłego API (np. własny endpoint / funkcja serverless).
 * Wysyła JSON metodą POST. Sekrety (SMTP, klucze) trzymaj WYŁĄCZNIE po stronie serwera.
 */
export function createApiTransport(endpoint: string): ContactTransport {
  return {
    kind: 'api',
    async send(d) {
      try {
        const { website: _hp, ...payload } = d
        void _hp
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) return { status: 'error', message: `Serwer odpowiedział błędem (${res.status}).` }
        return { status: 'sent' }
      } catch {
        return { status: 'error', message: 'Brak połączenia z serwerem.' }
      }
    },
  }
}

export function getTransport(): ContactTransport {
  const endpoint = siteConfig.contact.form.endpoint.trim()
  return endpoint ? createApiTransport(endpoint) : mailtoTransport
}
