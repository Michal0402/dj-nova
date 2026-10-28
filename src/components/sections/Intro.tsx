import { siteConfig } from '../../config/siteConfig'
import { Picture } from '../ui/Picture'
import { Reveal } from '../ui/Reveal'
import { DemoBadge } from '../ui/DemoBadge'

export function Intro() {
  const { intro } = siteConfig
  return (
    <section id="intro" aria-labelledby="intro-title" className="relative py-24 lg:py-40">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="relative lg:col-span-5 lg:pt-24">
          <div className="relative">
            <Picture
              name={intro.image}
              alt={intro.imageAlt}
              sizes="(min-width: 1024px) 38vw, 100vw"
              aspect="4 / 5"
              className="rounded-[var(--radius-card)]"
              imgClassName="transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] hover:scale-[1.03]"
            />
            <DemoBadge className="absolute left-3 top-3" />
            <div aria-hidden className="absolute -bottom-6 -right-4 hidden h-28 w-28 border-b border-r border-gold/50 lg:block" />
          </div>
        </Reveal>

        <div className="lg:col-span-7 lg:pl-10">
          <Reveal>
            <p className="label-mono mb-6 flex items-center gap-3 text-mute">
              <span className="text-gold">01</span>
              <span aria-hidden className="h-px w-10 bg-paper/25" />
              {intro.label}
            </p>
            <h2 id="intro-title" className="display-tight text-[length:var(--text-h2)] font-semibold">
              {intro.title[0]} <span className="text-mute-2">{intro.title[1]}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 grid gap-8 md:grid-cols-2 md:gap-10">
            <p className="font-display text-xl leading-snug text-paper md:col-span-2 lg:text-2xl">{intro.lead}</p>
            {intro.paragraphs.map((p) => (
              <p key={p.slice(0, 20)} className="leading-relaxed text-mute">
                {p}
              </p>
            ))}
          </Reveal>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-paper/10 bg-paper/10 sm:grid-cols-3">
            {intro.highlights.map((h, i) => (
              <Reveal as="li" key={h.title} delay={0.08 * i} className="bg-ink p-6">
                  <span className="label-mono text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-4 font-display text-lg font-semibold leading-tight">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mute">{h.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
