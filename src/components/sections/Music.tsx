import { Headphones, Play } from 'lucide-react'
import { useState } from 'react'
import { siteConfig, type MusicSet } from '../../config/siteConfig'
import { cn } from '../../lib/cn'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Waveform } from '../ui/Waveform'

/** Zamienia link SoundCloud / Mixcloud na adres oficjalnego widgetu (bez autoplay). */
function embedUrl(url: string): { src: string; provider: 'SoundCloud' | 'Mixcloud'; height: number } | null {
  try {
    const u = new URL(url)
    if (u.hostname.endsWith('soundcloud.com')) {
      const params = new URLSearchParams({ url, auto_play: 'false', color: '#8b5cf6', hide_related: 'true', show_comments: 'false', visual: 'false' })
      return { src: `https://w.soundcloud.com/player/?${params}`, provider: 'SoundCloud', height: 166 }
    }
    if (u.hostname.endsWith('mixcloud.com')) {
      const feed = encodeURIComponent(u.pathname)
      return { src: `https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&light=0&autoplay=0&feed=${feed}`, provider: 'Mixcloud', height: 120 }
    }
  } catch {
    /* nieprawidłowy URL → traktuj jak brak nagrania */
  }
  return null
}

const accents = ['from-violet/25', 'from-gold/20', 'from-electric/25']

function SetCard({ set, i }: { set: MusicSet; i: number }) {
  const embed = set.url ? embedUrl(set.url) : null
  const [loaded, setLoaded] = useState(false)
  return (
    <Reveal as="li" delay={0.08 * i} className="relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-paper/10 bg-surface">
      <div aria-hidden className={cn('pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent to-60% opacity-70', accents[i % accents.length])} />
      <div className="relative flex flex-1 flex-col p-7 lg:p-9">
        <div className="flex items-center justify-between">
          <span className="label-mono text-gold">Set {String(i + 1).padStart(2, '0')}</span>
          <Headphones aria-hidden className="size-5 text-paper/50" />
        </div>
        <h3 className="mt-10 font-display text-4xl font-semibold uppercase leading-none tracking-tight lg:text-5xl">{set.title}</h3>
        <p className="label-mono mt-4 text-paper/70">{set.mood}</p>
        <p className="mt-5 leading-relaxed text-mute">{set.description}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Gatunki">
          {set.tags.map((t) => (
            <li key={t} className="rounded-full border border-paper/15 px-3 py-1 text-xs text-paper/75">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-10">
          {embed ? (
            loaded ? (
              <iframe
                title={`${set.title} — odtwarzacz ${embed.provider}`}
                src={embed.src}
                height={embed.height}
                loading="lazy"
                allow="encrypted-media"
                className="w-full rounded-[var(--radius-card)] border-0"
              />
            ) : (
              <button
                type="button"
                onClick={() => setLoaded(true)}
                className="flex w-full items-center gap-4 rounded-[var(--radius-card)] border border-paper/15 bg-ink/60 p-4 text-left transition-colors hover:border-paper/40"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-paper text-ink">
                  <Play aria-hidden className="ml-0.5 size-4" />
                </span>
                <span>
                  <span className="block font-medium">Załaduj odtwarzacz</span>
                  <span className="text-xs text-mute">{embed.provider} • muzyka nie startuje automatycznie</span>
                </span>
              </button>
            )
          ) : (
            <div className="flex items-center justify-between gap-4 border-t border-paper/10 pt-5">
              <div>
                <p className="font-display font-medium">Nagrania wkrótce</p>
                <p className="text-xs text-mute">Set w przygotowaniu</p>
              </div>
              <Waveform animated={false} bars={16} className="h-7 text-paper/20" />
            </div>
          )}
        </div>
      </div>
    </Reveal>
  )
}

export function Music() {
  const { music } = siteConfig
  return (
    <section id="muzyka" aria-labelledby="muzyka-title" className="relative overflow-hidden py-24 lg:py-36">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 size-[38rem] rounded-full bg-violet/10 blur-[120px]" />
      <div className="container-x relative">
        <SectionHeading id="muzyka-title" index="04" label="Music experience" title={music.title} lead={music.lead} />
        <ul className="mt-14 grid gap-3 md:grid-cols-3 lg:mt-20 lg:gap-4">
          {music.sets.map((s, i) => (
            <SetCard key={s.id} set={s} i={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
