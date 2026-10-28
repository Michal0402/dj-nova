import { Check } from 'lucide-react'
import { siteConfig } from '../../config/siteConfig'
import { DemoBadge } from '../ui/DemoBadge'
import { Picture } from '../ui/Picture'
import { Reveal } from '../ui/Reveal'

export function About() {
  const { about, brand } = siteConfig
  return (
    <section id="o-mnie" aria-labelledby="o-mnie-title" className="relative py-24 lg:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="relative lg:col-span-6 xl:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Picture
              name={about.image}
              alt={about.imageAlt}
              sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 48vw, 100vw"
              aspect="4 / 5"
              className="rounded-[var(--radius-card)]"
              imgClassName="object-[50%_30%]"
            />
            <DemoBadge label="Zdjęcie demo, podmień na swój portret" className="absolute left-3 top-3" />
            <p aria-hidden className="pointer-events-none absolute -bottom-5 right-4 font-display text-[clamp(4rem,12vw,9rem)] font-bold uppercase leading-none tracking-tighter text-paper/[0.06] lg:-right-10">
              {brand.shortName}
            </p>
          </div>
        </Reveal>

        <div className="lg:col-span-6 xl:col-span-7 xl:pl-8">
          <Reveal>
            <p className="label-mono mb-6 flex items-center gap-3 text-mute">
              <span className="text-gold">06</span>
              <span aria-hidden className="h-px w-10 bg-paper/25" />
              {about.label}
            </p>
            <h2 id="o-mnie-title" className="display-tight text-[length:var(--text-h2)] font-semibold">
              {about.title}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 space-y-5 text-lg leading-relaxed text-paper/85">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            {siteConfig.demoMode && <p className="text-sm text-gold/90">Tekst demonstracyjny. Zastąp go prawdziwą historią w siteConfig.ts.</p>}
          </Reveal>

          <div className="mt-14 grid gap-10 border-t border-paper/10 pt-10 sm:grid-cols-2">
            <Reveal>
              <h3 className="label-mono mb-5 text-gold">Gram na</h3>
              <ul className="space-y-3">
                {about.eventTypes.map((t) => (
                  <li key={t} className="flex items-baseline gap-3 font-display text-lg">
                    <span aria-hidden className="h-px w-4 translate-y-[-0.3em] bg-paper/40" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="label-mono mb-5 text-gold">Styl pracy</h3>
              <ul className="space-y-3">
                {about.workStyle.map((t) => (
                  <li key={t} className="flex gap-3 text-paper/85">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-electric" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {about.experience.length > 0 ? (
            <Reveal className="mt-12 border-t border-paper/10 pt-10">
              <h3 className="label-mono mb-5 text-gold">Doświadczenie</h3>
              <ul className="space-y-3">
                {about.experience.map((e) => (
                  <li key={e} className="text-paper/85">
                    {e}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : (
            siteConfig.demoMode && (
              <div className="mt-12 rounded-[var(--radius-card)] border border-dashed border-paper/20 p-6 text-sm text-mute">
                <p className="label-mono mb-2 text-gold">Do uzupełnienia</p>
                Miejsce na prawdziwe doświadczenie: kluby, w których grasz, lata działalności, ważne realizacje. Uzupełnij{' '}
                <code className="text-paper/80">about.experience</code> w siteConfig.ts. Bez wymyślonych liczb i nagród.
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
