import { AlertTriangle, ArrowUpRight, Loader2, Mail, MailOpen, MapPin, Phone } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { siteConfig, type EventTypeId } from '../../config/siteConfig'
import { emptyContact, loadSchema, getTransport, todayIso, type ContactField, type ContactFormState, type SubmitResult } from '../../lib/contact'
import { cn } from '../../lib/cn'
import { PRESELECT_EVENT } from '../../lib/scroll'
import { buttonClasses } from '../../lib/buttonStyles'
import { DemoBadge } from '../ui/DemoBadge'
import { Field, inputClass } from '../ui/Field'
import { Reveal } from '../ui/Reveal'
import { SocialIcons } from '../ui/SocialIcons'

type Errors = Partial<Record<ContactField, string>>
const order: ContactField[] = ['name', 'email', 'phone', 'eventType', 'date', 'location', 'guests', 'message', 'consent']
const validIds = new Set(siteConfig.eventTypes.map((e) => e.id))

/** Typ wydarzenia z adresu (?typ=wesele) — czytany po hydratacji, by HTML z prerenderu był zgodny. */
function typeFromUrl(): EventTypeId | null {
  const typ = new URLSearchParams(window.location.search).get('typ')
  return typ && validIds.has(typ as EventTypeId) ? (typ as EventTypeId) : null
}

export function Contact() {
  const { contact } = siteConfig
  const transport = getTransport()
  const [values, setValues] = useState<ContactFormState>(emptyContact)
  const [minDate, setMinDate] = useState<string | undefined>(undefined)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle')
  const [result, setResult] = useState<SubmitResult | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  // Preselekcja typu wydarzenia z kart oferty
  useEffect(() => {
    const fromUrl = typeFromUrl()
    // eslint-disable-next-line react-hooks/set-state-in-effect -- jednorazowa synchronizacja z URL po hydratacji
    if (fromUrl) setValues((v) => ({ ...v, eventType: fromUrl }))
    setMinDate(todayIso())
    const onPreselect = (e: Event) => {
      const id = (e as CustomEvent<EventTypeId>).detail
      if (validIds.has(id)) {
        setValues((v) => ({ ...v, eventType: id }))
        setErrors((er) => ({ ...er, eventType: undefined }))
      }
    }
    window.addEventListener(PRESELECT_EVENT, onPreselect)
    return () => window.removeEventListener(PRESELECT_EVENT, onPreselect)
  }, [])

  const set = <K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) => {
    setValues((v) => ({ ...v, [key]: value }))
    if (errors[key as ContactField]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const validateField = async (key: ContactField) => {
    const schema = await loadSchema()
    const parsed = schema.safeParse(values)
    const issue = parsed.success ? undefined : parsed.error.issues.find((i) => i.path[0] === key)
    setErrors((er) => ({ ...er, [key]: issue?.message }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'submitting') return
    setResult(null)
    // Honeypot — boty dostają cichą odmowę, bez fałszywego potwierdzenia
    if (values.website) return
    const schema = await loadSchema()
    const parsed = schema.safeParse(values)
    if (!parsed.success) {
      const next: Errors = {}
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as ContactField
        if (!next[k]) next[k] = issue.message
      }
      setErrors(next)
      const first = order.find((k) => next[k])
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    setErrors({})
    setStatus('submitting')
    const res = await transport.send(parsed.data)
    setStatus('idle')
    setResult(res)
    if (res.status === 'sent') setValues({ ...emptyContact })
    requestAnimationFrame(() => resultRef.current?.focus())
  }

  const tel = contact.phone.value.replace(/\s/g, '')

  return (
    <section id="kontakt" aria-labelledby="kontakt-title" className="relative py-24 lg:py-36">
      <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Lewa kolumna — informacje */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="label-mono mb-6 flex items-center gap-3 text-mute">
              <span className="text-gold">09</span>
              <span aria-hidden className="h-px w-10 bg-paper/25" />
              Kontakt
            </p>
            <h2 id="kontakt-title" className="display-tight text-[length:var(--text-h2)] font-semibold uppercase">
              Zapytaj <span className="text-electric">o termin</span>
            </h2>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-mute">
              Podaj datę, miejsce i kilka słów o wydarzeniu. {contact.responseNote}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 space-y-px overflow-hidden rounded-[var(--radius-card)] border border-paper/10 bg-paper/10">
            <a href={`tel:${tel}`} className="group flex items-center gap-5 bg-ink p-5 transition-colors hover:bg-surface">
              <Phone aria-hidden className="size-5 text-gold" />
              <span className="flex-1">
                <span className="label-mono block text-[0.62rem] text-mute-2">Telefon</span>
                <span className="whitespace-nowrap font-display text-lg">{contact.phone.value}</span>
              </span>
              {contact.phone.placeholder && <DemoBadge />}
              <ArrowUpRight aria-hidden className="size-4 text-mute transition-colors group-hover:text-paper" />
            </a>
            <a href={`mailto:${contact.email.value}`} className="group flex items-center gap-5 bg-ink p-5 transition-colors hover:bg-surface">
              <Mail aria-hidden className="size-5 text-gold" />
              <span className="min-w-0 flex-1">
                <span className="label-mono block text-[0.62rem] text-mute-2">E-mail</span>
                <span className="block break-all font-display text-lg">{contact.email.value}</span>
              </span>
              {contact.email.placeholder && <DemoBadge />}
              <ArrowUpRight aria-hidden className="size-4 text-mute transition-colors group-hover:text-paper" />
            </a>
            <div className="flex items-center gap-5 bg-ink p-5">
              <MapPin aria-hidden className="size-5 text-gold" />
              <span className="flex-1">
                <span className="label-mono block text-[0.62rem] text-mute-2">Obszar działania</span>
                <span className="text-paper/90">{contact.serviceArea.value}</span>
              </span>
              {contact.serviceArea.placeholder && <DemoBadge />}
            </div>
          </Reveal>
          <SocialIcons className="mt-6" />
        </div>

        {/* Prawa kolumna — formularz */}
        <Reveal delay={0.05} className="lg:col-span-7">
          <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby="kontakt-title" className="relative rounded-[var(--radius-card)] border border-paper/10 bg-surface p-6 sm:p-8 lg:p-10">
            {transport.kind === 'mailto' && (
              <div className="mb-8 flex gap-3 rounded-[var(--radius-card)] border border-gold/30 bg-gold/[0.06] p-4 text-sm leading-relaxed text-paper/85">
                <MailOpen aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" />
                <p>
                  <strong className="font-semibold text-gold">Tryb awaryjny e-mail.</strong> Po kliknięciu „Wyślij zapytanie” otworzy się Twój program pocztowy z gotową wiadomością. Zapytanie zostanie wysłane dopiero, gdy klikniesz „Wyślij” w programie pocztowym.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field id="name" label="Imię" error={errors.name}>
                {(a) => <input {...a} name="name" autoComplete="given-name" className={inputClass} value={values.name} onChange={(e) => set('name', e.target.value)} onBlur={() => values.name && validateField('name')} />}
              </Field>
              <Field id="email" label="E-mail" error={errors.email}>
                {(a) => <input {...a} name="email" type="email" inputMode="email" autoComplete="email" className={inputClass} value={values.email} onChange={(e) => set('email', e.target.value)} onBlur={() => values.email && validateField('email')} />}
              </Field>
              <Field id="phone" label="Telefon" optional error={errors.phone}>
                {(a) => <input {...a} name="phone" type="tel" inputMode="tel" autoComplete="tel" className={inputClass} value={values.phone} onChange={(e) => set('phone', e.target.value)} onBlur={() => values.phone && validateField('phone')} />}
              </Field>
              <Field id="eventType" label="Typ wydarzenia" error={errors.eventType}>
                {(a) => (
                  <select {...a} name="eventType" className={cn(inputClass, 'appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10')} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a9abb8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }} value={values.eventType} onChange={(e) => set('eventType', e.target.value as EventTypeId)}>
                    <option value="">Wybierz…</option>
                    {siteConfig.eventTypes.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
              <Field id="date" label="Data wydarzenia" error={errors.date}>
                {(a) => <input {...a} name="date" type="date" min={minDate} className={inputClass} value={values.date} onChange={(e) => set('date', e.target.value)} />}
              </Field>
              <Field id="location" label="Miejscowość" error={errors.location}>
                {(a) => <input {...a} name="location" autoComplete="address-level2" className={inputClass} value={values.location} onChange={(e) => set('location', e.target.value)} onBlur={() => values.location && validateField('location')} />}
              </Field>
              <Field id="guests" label="Liczba gości" optional error={errors.guests}>
                {(a) => <input {...a} name="guests" inputMode="numeric" pattern="[0-9]*" className={inputClass} value={values.guests} onChange={(e) => set('guests', e.target.value)} onBlur={() => values.guests && validateField('guests')} />}
              </Field>
              <Field id="message" label="Wiadomość" error={errors.message} hint="Np. godziny, charakter imprezy, ulubione gatunki." className="sm:col-span-2">
                {(a) => <textarea {...a} name="message" rows={5} className={cn(inputClass, 'resize-y')} value={values.message} onChange={(e) => set('message', e.target.value)} onBlur={() => values.message && validateField('message')} />}
              </Field>
            </div>

            {/* Honeypot — ukryty przed ludźmi i czytnikami ekranu */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="website">Nie wypełniaj tego pola</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set('website', e.target.value)} />
            </div>

            <div className="mt-7">
              <div className="flex gap-3">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={values.consent}
                  onChange={(e) => set('consent', e.target.checked)}
                  aria-invalid={!!errors.consent}
                  aria-describedby={errors.consent ? 'consent-error' : undefined}
                  className="mt-1 size-5 shrink-0 cursor-pointer accent-violet"
                />
                <label htmlFor="consent" className="text-sm leading-relaxed text-paper/80">
                  Wyrażam zgodę na przetwarzanie moich danych osobowych w celu odpowiedzi na zapytanie i przygotowania oferty, zgodnie z{' '}
                  <a href="/polityka-prywatnosci.html" className="text-paper underline decoration-gold/60 underline-offset-4 hover:decoration-gold">
                    polityką prywatności
                  </a>
                  .
                </label>
              </div>
              {errors.consent && (
                <p id="consent-error" className="ml-8 mt-1.5 text-sm text-[#ff9b9b]">
                  {errors.consent}
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" disabled={status === 'submitting'} aria-disabled={status === 'submitting'} className={buttonClasses('primary', 'w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto')}>
                {status === 'submitting' ? (
                  <>
                    <Loader2 aria-hidden className="size-4 animate-spin" /> Wysyłanie…
                  </>
                ) : (
                  <>
                    {transport.kind === 'mailto' ? 'Wyślij zapytanie (e-mail)' : 'Wyślij zapytanie'} <ArrowUpRight aria-hidden className="size-4" />
                  </>
                )}
              </button>
              {Object.values(errors).some(Boolean) && (
                <p role="alert" className="text-sm text-[#ff9b9b]">
                  Popraw zaznaczone pola.
                </p>
              )}
            </div>

            <div ref={resultRef} tabIndex={-1} aria-live="polite" className="outline-none">
              {result?.status === 'handoff' && (
                <div className="mt-6 rounded-[var(--radius-card)] border border-gold/30 bg-gold/[0.06] p-5 text-sm leading-relaxed">
                  <p className="font-semibold text-gold">Wiadomość przygotowana, ale jeszcze nie wysłana.</p>
                  <p className="mt-1 text-paper/85">
                    Dokończ wysyłkę w swoim programie pocztowym. Nic się nie otworzyło?{' '}
                    <a href={result.mailtoUrl} className="underline underline-offset-4">
                      Otwórz wiadomość ponownie
                    </a>{' '}
                    albo napisz bezpośrednio na{' '}
                    <a href={`mailto:${contact.email.value}`} className="underline underline-offset-4">
                      {contact.email.value}
                    </a>
                    .
                  </p>
                </div>
              )}
              {result?.status === 'sent' && (
                <div className="mt-6 rounded-[var(--radius-card)] border border-electric/40 bg-violet/10 p-5 text-sm">
                  <p className="font-semibold text-electric">Dziękuję! Zapytanie dotarło.</p>
                  <p className="mt-1 text-paper/85">Odezwę się na podany adres e-mail.</p>
                </div>
              )}
              {result?.status === 'error' && (
                <div className="mt-6 flex gap-3 rounded-[var(--radius-card)] border border-[#ff9b9b]/40 bg-[#ff9b9b]/[0.06] p-5 text-sm">
                  <AlertTriangle aria-hidden className="size-4 shrink-0 text-[#ff9b9b]" />
                  <p>
                    Nie udało się wysłać zapytania ({result.message}). Zadzwoń:{' '}
                    <a href={`tel:${tel}`} className="underline">
                      {contact.phone.value}
                    </a>{' '}
                    lub napisz:{' '}
                    <a href={`mailto:${contact.email.value}`} className="underline">
                      {contact.email.value}
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
