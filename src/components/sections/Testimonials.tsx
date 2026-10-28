import { Quote } from 'lucide-react'
import { siteConfig } from '../../config/siteConfig'
import { goToContact } from '../../lib/scroll'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

/** Wyłącznie prawdziwe opinie z konfiguracji (maks. 6). Brak opinii → stan pusty lub ukrycie. */
export function Testimonials() {
  const { items, whenEmpty, title } = siteConfig.testimonials
  const list = items.slice(0, 6)
  if (!list.length && whenEmpty === 'hide') return null

  return (
    <section id="opinie" aria-labelledby="opinie-title" className="relative py-24 lg:py-36">
      <div className="container-x">
        <SectionHeading id="opinie-title" index="07" label="Opinie" title={title} />
        {list.length ? (
          <ul className="mt-14 grid gap-3 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-4">
            {list.map((t, i) => (
              <Reveal as="li" key={t.author + i} delay={0.06 * i} className="flex flex-col rounded-[var(--radius-card)] border border-paper/10 bg-surface p-8">
                <Quote aria-hidden className="size-6 text-gold" />
                <blockquote className="mt-6 flex-1 font-display text-lg leading-relaxed text-paper/90">„{t.quote}”</blockquote>
                <footer className="mt-8 border-t border-paper/10 pt-5">
                  <p className="font-medium">{t.author}</p>
                  <p className="text-sm text-mute">{t.event}</p>
                </footer>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal className="mt-14 grid gap-8 rounded-[var(--radius-card)] border border-dashed border-paper/20 p-8 md:grid-cols-12 md:items-center lg:mt-20 lg:p-14">
            <Quote aria-hidden className="size-10 text-gold/70 md:col-span-1" />
            <div className="md:col-span-8">
              <p className="font-display text-2xl leading-snug lg:text-3xl">Tu pojawią się opinie par i klientów.</p>
              <p className="mt-3 max-w-2xl leading-relaxed text-mute">
                Publikuję wyłącznie prawdziwe recenzje, za zgodą ich autorów. Bez kupionych gwiazdek i anonimowych zachwytów. Byłeś na imprezie z moją muzyką? Napisz kilka słów.
              </p>
            </div>
            <div className="md:col-span-3 md:justify-self-end">
              <a
                href="#kontakt"
                onClick={(e) => {
                  e.preventDefault()
                  goToContact()
                }}
                className="inline-flex min-h-11 items-center border-b border-paper/40 text-sm font-medium hover:border-gold hover:text-gold"
              >
                Napisz do mnie
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
