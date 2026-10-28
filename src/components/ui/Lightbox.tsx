import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'
import type { GalleryItem } from '../../data/gallery'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { fallbackSrc, getImage, srcSet } from '../../lib/images'
import { DemoBadge } from './DemoBadge'

type Props = {
  items: GalleryItem[]
  index: number | null
  onClose: () => void
  onIndex: (i: number) => void
}

/** Dostępny lightbox: strzałki ←/→, Escape, pułapka fokusu, swipe na dotyku. */
export function Lightbox({ items, index, onClose, onIndex }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const open = index !== null
  const close = useCallback(() => onClose(), [onClose])
  useFocusTrap(ref, open, close)

  const prev = useCallback(() => index !== null && onIndex((index - 1 + items.length) % items.length), [index, items.length, onIndex])
  const next = useCallback(() => index !== null && onIndex((index + 1) % items.length), [index, items.length, onIndex])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, prev, next])

  const touchX = useRef<number | null>(null)
  const item = index !== null ? items[index] : null
  const img = item ? getImage(item.image) : undefined

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label={`Podgląd zdjęcia: ${item.caption}`}
          className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            if (Math.abs(dx) > 50) (dx > 0 ? prev : next)()
            touchX.current = null
          }}
        >
          <div className="container-x flex items-center justify-between gap-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3">
            <p className="label-mono text-mute" aria-live="polite">
              <span className="text-paper">{String((index ?? 0) + 1).padStart(2, '0')}</span> / {String(items.length).padStart(2, '0')}
              <span className="mx-3 text-gold">•</span>
              {item.caption}
            </p>
            <button type="button" onClick={onClose} className="grid size-11 place-items-center rounded-[var(--radius-card)] border border-paper/20 hover:border-paper/60" aria-label="Zamknij podgląd (Esc)">
              <X aria-hidden className="size-5" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-20">
            <motion.figure
              key={item.image}
              className="relative flex max-h-full flex-col items-center"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {img ? (
                <img
                  src={fallbackSrc(item.image, 1600)}
                  srcSet={srcSet(item.image)}
                  sizes="(min-width: 640px) 85vw, 100vw"
                  width={img.width}
                  height={img.height}
                  alt={item.alt}
                  className="max-h-[calc(100svh-9rem)] w-auto max-w-full rounded-[var(--radius-card)] object-contain"
                />
              ) : (
                <div className="grid aspect-[4/3] w-[min(80vw,900px)] place-items-center bg-surface-2 text-mute">Zdjęcie wkrótce</div>
              )}
              {item.demo && <DemoBadge label="Zdjęcie demonstracyjne" className="absolute left-3 top-3" />}
              <figcaption className="sr-only">{item.alt}</figcaption>
            </motion.figure>

            {items.length > 1 && (
              <>
                <button type="button" onClick={prev} className="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-paper/20 bg-ink/60 hover:border-paper/60 sm:left-6" aria-label="Poprzednie zdjęcie">
                  <ChevronLeft aria-hidden className="size-5" />
                </button>
                <button type="button" onClick={next} className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-paper/20 bg-ink/60 hover:border-paper/60 sm:right-6" aria-label="Następne zdjęcie">
                  <ChevronRight aria-hidden className="size-5" />
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
