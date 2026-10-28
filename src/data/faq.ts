import { siteConfig } from '../config/siteConfig'

/** Odpowiedzi FAQ budowane z danych w siteConfig.facts / contact — edytuj tam. */
const { facts, contact } = siteConfig

export type FaqItem = { id: string; question: string; answer: string }

export const faqItems: FaqItem[] = [
  { id: 'rezerwacja', question: 'Jak wcześnie najlepiej rezerwować termin?', answer: facts.bookingAdvice },
  { id: 'playlista', question: 'Czy można ustalić własną playlistę?', answer: facts.playlistAdvice },
  {
    id: 'sprzet',
    question: 'Czy DJ zapewnia nagłośnienie i oświetlenie?',
    answer: `${facts.soundSystem.value} ${facts.lighting.value}`,
  },
  {
    id: 'obszar',
    question: 'Na jakim obszarze obsługiwane są imprezy?',
    answer: `Obszar działania: ${contact.serviceArea.value}. Koszt ewentualnego dojazdu uwzględniam w wycenie.`,
  },
  { id: 'wycena', question: 'Jak wygląda wycena wydarzenia?', answer: facts.pricingAdvice },
]
