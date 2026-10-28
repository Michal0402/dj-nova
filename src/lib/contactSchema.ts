import { z } from 'zod'
import { siteConfig, type EventTypeId } from '../config/siteConfig'
import { todayIso } from './contact'

/* ── Walidacja (Zod) ──────────────────────────────────────────────────────── */

const eventIds = siteConfig.eventTypes.map((e) => e.id) as [EventTypeId, ...EventTypeId[]]


export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Podaj imię (min. 2 znaki).').max(80, 'Imię jest za długie.'),
  email: z.string().trim().min(1, 'Podaj adres e-mail.').pipe(z.email('Podaj poprawny adres e-mail, np. jan@domena.pl.')),
  phone: z
    .string()
    .trim()
    .refine((v) => v === '' || /^[+()\d\s-]{7,20}$/.test(v), 'Podaj poprawny numer telefonu lub zostaw pole puste.'),
  eventType: z.union([z.enum(eventIds), z.literal('')]).refine((v) => v !== '', 'Wybierz typ wydarzenia.'),
  date: z
    .string()
    .min(1, 'Wybierz datę wydarzenia.')
    .refine((v) => v >= todayIso(), 'Data wydarzenia nie może być w przeszłości.'),
  location: z.string().trim().min(2, 'Podaj miejscowość.').max(80, 'Nazwa miejscowości jest za długa.'),
  guests: z
    .string()
    .trim()
    .refine((v) => v === '' || (/^\d+$/.test(v) && Number(v) > 0 && Number(v) <= 5000), 'Podaj liczbę gości (1–5000) lub zostaw puste.'),
  message: z.string().trim().min(10, 'Napisz kilka słów o wydarzeniu (min. 10 znaków).').max(2000, 'Wiadomość jest za długa (maks. 2000 znaków).'),
  consent: z.literal(true, { error: 'Zgoda jest wymagana, abym mógł odpowiedzieć na zapytanie.' }),
  /** Honeypot — prawdziwy użytkownik go nie widzi i nie wypełnia. */
  website: z.string().max(0),
})
