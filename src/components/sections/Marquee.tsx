import { siteConfig } from '../../config/siteConfig'

/** Pas z typami wydarzeń — czysty CSS, zatrzymany przy prefers-reduced-motion. */
export function Marquee() {
  const words = siteConfig.services.map((s) => s.title)
  const row = [...words, ...words]
  return (
    <div aria-hidden className="relative overflow-hidden border-y border-paper/10 bg-ink py-5 lg:py-7">
      <div className="animate-marquee flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center font-display text-3xl font-semibold uppercase tracking-tight text-paper/[0.85] lg:text-5xl">
                <span className={i % 2 ? 'deco-text text-outline' : 'deco-text'} data-text={w} />
                <span className="deco-text mx-6 text-xl text-gold lg:mx-10 lg:text-2xl" data-text="✦" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
