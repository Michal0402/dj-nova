import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { siteConfig } from '../../config/siteConfig'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { goToContact, scrollToSection } from '../../lib/scroll'
import { ButtonLink } from '../ui/Button'
import { DemoBadge } from '../ui/DemoBadge'
import { Picture } from '../ui/Picture'
import { Waveform } from '../ui/Waveform'


export function Hero() {
  const { hero, brand, services } = siteConfig
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const desktop = useMediaQuery('(min-width: 1024px)')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // Delikatny parallax tylko na desktopie i bez reduced motion
  const y = useTransform(scrollYProgress, [0, 1], ['0%', desktop && !reduce ? '12%' : '0%'])

  return (
    <section id="start" ref={ref} aria-labelledby="hero-title" className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* Zdjęcie */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y }}
>
        <div className="hero-zoom size-full">
        <Picture name={hero.image} alt={hero.imageAlt} sizes="100vw" priority className="size-full" imgClassName="object-[62%_center]" aspect="auto" />
        </div>
      </motion.div>
      {/* Overlaye dla czytelności */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/75 to-ink/25" />
      <div aria-hidden className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-ink/90 via-ink/40 to-transparent lg:block" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_85%_20%,rgb(139_92_246/0.22),transparent_70%)]" />

      <div className="container-x relative flex flex-1 flex-col justify-end pb-10 pt-28 lg:pb-14 lg:pt-36">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-9">
            <p className="hero-fade label-mono mb-6 flex items-center gap-3 text-paper/80" style={{ animationDelay: '0.2s' }}>
              <span aria-hidden className="size-1.5 rounded-full bg-gold" />
              {brand.eyebrow}
            </p>

            <h1 id="hero-title" className="display-tight font-display text-[length:var(--text-display)] font-bold uppercase">
              {hero.titleLines.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.04em]">
                  <span className={i === hero.accentLine ? 'hero-rise block text-electric' : 'hero-rise block'} style={{ animationDelay: `${0.15 + i * 0.08}s` }}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          <div className="hero-slide lg:col-span-3 lg:pb-3" style={{ animationDelay: '0.5s' }}>
            <p className="max-w-sm text-base leading-relaxed text-paper/85 sm:text-lg">{hero.subtitle}</p>
          </div>
        </div>

        <div className="hero-fade mt-9 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-12" style={{ animationDelay: '0.6s' }}>
          <ButtonLink
            href="#kontakt"
            onClick={(e) => {
              e.preventDefault()
              goToContact()
            }}
            icon={<ArrowUpRight className="size-4" />}
            className="w-full sm:w-auto"
          >
            {hero.primaryCta}
          </ButtonLink>
          <ButtonLink
            href="#realizacje"
            variant="ghost"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('realizacje')
            }}
            icon={<ArrowDownRight className="size-4" />}
            className="w-full backdrop-blur-[2px] sm:w-auto"
          >
            {hero.secondaryCta}
          </ButtonLink>
        </div>

        {/* Dolny pasek: typy wydarzeń, waveform, scroll indicator */}
        <div className="hero-fade mt-12 flex items-end justify-between gap-6 border-t border-paper/15 pt-5 lg:mt-16" style={{ animationDelay: '0.85s' }}>
          <ul className="label-mono hidden flex-wrap gap-x-6 gap-y-2 text-paper/60 md:flex" aria-label="Rodzaje wydarzeń">
            {services.map((s) => (
              <li key={s.id}>{s.title}</li>
            ))}
          </ul>
          <div className="flex items-center gap-4 text-violet/90 md:hidden">
            <Waveform className="h-6" bars={14} />
          </div>
          <div className="flex items-center gap-6">
            <Waveform className="hidden h-7 text-electric/80 md:flex" />
            <a
              href="#intro"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('intro')
              }}
              className="group flex items-center gap-3 text-paper/70 hover:text-paper"
              aria-label="Przewiń do kolejnej sekcji"
            >
              <span aria-hidden className="label-mono hidden sm:inline">Przewiń</span>
              <span className="relative flex h-10 w-6 justify-center rounded-full border border-paper/35 pt-2">
                <span className="animate-scroll-dot block h-2 w-0.5 rounded-full bg-paper" />
              </span>
            </a>
          </div>
        </div>
      </div>
      <DemoBadge label="Wersja demo • zdjęcia przykładowe" className="absolute right-[max(1.25rem,4vw)] top-24 lg:top-28" />
    </section>
  )
}
