import { ArrowUpRight } from 'lucide-react'
import { siteConfig } from '../../config/siteConfig'
import { cn } from '../../lib/cn'
import { contactHref, goToContact } from '../../lib/scroll'
import { DemoBadge } from '../ui/DemoBadge'
import { Picture } from '../ui/Picture'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

/**
 * Asymetryczny bento (12 kolumn na desktopie):
 *  ┌──────────── 7 ───────────┬──── 5 ────┐
 *  │  Wesela (2 rzędy)        │ Osiemnastki│
 *  │                          ├────────────┤
 *  │                          │ Firmowe    │
 *  ├────── 5 ──────┬──────────┴── 7 ───────┤
 *  │ Prywatne      │ Kluby                 │
 *  └───────────────┴───────────────────────┘
 */
const layout = [
  { cell: 'md:col-span-2 lg:col-span-7 lg:row-span-2', min: 'min-h-[30rem] lg:min-h-[44rem]', size: 'lg' },
  { cell: 'lg:col-span-5', min: 'min-h-[22rem] lg:min-h-0', size: 'md' },
  { cell: 'lg:col-span-5', min: 'min-h-[22rem] lg:min-h-0', size: 'md' },
  { cell: 'lg:col-span-5', min: 'min-h-[24rem] lg:min-h-[26rem]', size: 'md' },
  { cell: 'lg:col-span-7', min: 'min-h-[24rem] lg:min-h-[26rem]', size: 'lg' },
] as const

export function Offer() {
  const { services } = siteConfig
  return (
    <section id="oferta" aria-labelledby="oferta-title" className="relative py-24 lg:py-36">
      <div className="container-x">
        <SectionHeading
          id="oferta-title"
          index="02"
          label="Oferta"
          title={
            <>
              Muzyka na <span className="text-electric">każdą</span> okazję
            </>
          }
          lead="Każde wydarzenie ma inną dynamikę. Wybierz swoje, a ja dopasuję repertuar, prowadzenie i oprawę."
        />

        <ul className="mt-14 grid gap-3 md:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:gap-4">
          {services.map((s, i) => {
            const l = layout[i % layout.length]
            return (
              <Reveal as="li" key={s.id} delay={0.05 * i} className={cn('group relative', l.cell, l.min)}>
                <a
                  href={contactHref(s.id)}
                  onClick={(e) => {
                    e.preventDefault()
                    goToContact(s.id)
                  }}
                  className="absolute inset-0 flex flex-col justify-end overflow-hidden rounded-[var(--radius-card)] bg-surface transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 focus-visible:-translate-y-1.5"
                  aria-label={`${s.title} — zapytaj o termin`}
                >
                  <Picture
                    name={s.image}
                    alt=""
                    sizes={l.size === 'lg' ? '(min-width: 1024px) 58vw, 100vw' : '(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw'}
                    aspect="auto"
                    className="absolute inset-0"
                    imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/5" />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-violet/0 via-violet/0 to-violet/25 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                  <div className="relative flex items-start justify-between p-6 lg:p-8">
                    <span className="label-mono text-paper/70">
                      {String(i + 1).padStart(2, '0')} <span className="text-gold">/</span> {String(services.length).padStart(2, '0')}
                    </span>
                    <DemoBadge />
                  </div>

                  <div className="relative mt-auto p-6 lg:p-8">
                    <p className="label-mono mb-3 text-gold">{s.kicker}</p>
                    <h3 className={cn('font-display font-semibold uppercase leading-[0.95] tracking-tight', l.size === 'lg' ? 'text-4xl lg:text-6xl' : 'text-3xl lg:text-4xl')}>
                      {s.title}
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/80 lg:text-base">{s.description}</p>
                    <span className="mt-6 inline-flex items-center gap-2 border-b border-paper/30 pb-1 text-sm font-medium transition-colors group-hover:border-gold group-hover:text-gold">
                      Zapytaj o termin
                      <ArrowUpRight aria-hidden className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </a>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
