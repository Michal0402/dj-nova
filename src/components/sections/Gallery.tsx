import { motion } from 'framer-motion'
import { ArrowUpRight, Expand, Play } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { siteConfig } from '../../config/siteConfig'
import { galleryFilters, galleryItems, type GalleryCategory } from '../../data/gallery'
import { cn } from '../../lib/cn'
import { DemoBadge } from '../ui/DemoBadge'
import { Lightbox } from '../ui/Lightbox'
import { Picture } from '../ui/Picture'
import { SectionHeading } from '../ui/SectionHeading'

type Filter = GalleryCategory | 'all'

export function Gallery() {
  const [filter, setFilter] = useState<Filter>('all')
  const [open, setOpen] = useState<number | null>(null)
  const items = useMemo(() => (filter === 'all' ? galleryItems : galleryItems.filter((g) => g.category === filter)), [filter])
  const anyDemo = galleryItems.some((g) => g.demo)
  const { videos } = siteConfig.gallery
  const close = useCallback(() => setOpen(null), [])

  return (
    <section id="realizacje" aria-labelledby="realizacje-title" className="relative bg-surface/40 py-24 lg:py-36">
      <div className="container-x">
        <SectionHeading
          id="realizacje-title"
          index="03"
          label="Realizacje"
          title={siteConfig.gallery.title}
          lead={
            <>
              {siteConfig.gallery.lead}
              {anyDemo && siteConfig.demoMode && (
                <span className="mt-3 block text-sm text-gold/90">Zdjęcia demonstracyjne ze stocku (Pexels), do podmiany na własne realizacje.</span>
              )}
            </>
          }
        />

        <div role="group" aria-label="Filtruj realizacje" className="mt-12 flex flex-wrap gap-2 lg:mt-16">
          {galleryFilters.map((f) => {
            const count = f.id === 'all' ? galleryItems.length : galleryItems.filter((g) => g.category === f.id).length
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  'inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-sm transition-colors duration-300',
                  filter === f.id ? 'border-paper bg-paper text-ink' : 'border-paper/20 text-paper/80 hover:border-paper/50 hover:text-paper',
                )}
              >
                {f.label}
                <span className={cn('text-xs tabular-nums', filter === f.id ? 'text-ink/60' : 'text-mute-2')}>{count}</span>
              </button>
            )
          })}
        </div>
        <p className="sr-only" aria-live="polite">
          Wyświetlono {items.length} zdjęć
        </p>

        {items.length === 0 ? (
          <div className="mt-10 grid min-h-64 place-items-center rounded-[var(--radius-card)] border border-dashed border-paper/20 p-10 text-center text-mute">
            <p>
              W tej kategorii nie ma jeszcze zdjęć.
              <br />
              <span className="text-sm">Dodaj je w pliku src/data/gallery.ts.</span>
            </p>
          </div>
        ) : (
          <ul key={filter} className="masonry mt-10">
              {items.map((g, i) => (
                <motion.li
                  key={g.image}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -5% 0px' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.06 }}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    className="group relative block w-full overflow-hidden rounded-[var(--radius-card)] text-left"
                    aria-label={`Powiększ: ${g.caption}`}
                  >
                    <Picture
                      name={g.image}
                      alt={g.alt}
                      sizes="(min-width: 1024px) 31vw, 50vw"
                      imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                    />
                    <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 sm:p-4">
                      <span>
                        <span className="label-mono block text-[0.62rem] text-gold">{galleryFilters.find((f) => f.id === g.category)?.label}</span>
                        <span className="mt-1 block font-display text-sm font-medium sm:text-lg">{g.caption}</span>
                      </span>
                      <span className="hidden size-10 shrink-0 place-items-center rounded-full sm:grid border border-paper/30 bg-ink/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                        <Expand aria-hidden className="size-4" />
                      </span>
                    </span>
                    {g.demo && <DemoBadge className="absolute left-2 top-2 sm:left-3 sm:top-3" />}
                  </button>
                </motion.li>
              ))}
          </ul>
        )}

        {videos.length > 0 && (
          <div className="mt-16">
            <h3 className="label-mono mb-5 text-mute">Filmy z realizacji</h3>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((v) => (
                <li key={v.url}>
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-[var(--radius-card)] border border-paper/10 bg-ink p-5 transition-colors hover:border-paper/30"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-violet/15 text-electric">
                      <Play aria-hidden className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display font-medium">{v.title}</span>
                      <span className="text-sm text-mute">{v.platform === 'youtube' ? 'YouTube' : 'Instagram'} • otwiera się w nowej karcie</span>
                    </span>
                    <ArrowUpRight aria-hidden className="size-4 text-mute group-hover:text-paper" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Lightbox items={items} index={open} onClose={close} onIndex={setOpen} />
    </section>
  )
}
