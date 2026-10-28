import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { faqItems } from '../../data/faq'
import { cn } from '../../lib/cn'
import { SectionHeading } from '../ui/SectionHeading'

/** Akordeon wg wzorca WAI-ARIA: przyciski w nagłówkach, aria-expanded, aria-controls, region. */
export function Faq() {
  const [open, setOpen] = useState<string | null>(faqItems[0]?.id ?? null)
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative border-t border-paper/10 py-24 lg:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="faq-title" index="08" label="FAQ" title="Częste pytania" align="left" lead="Nie znalazłeś odpowiedzi? Napisz, chętnie doprecyzuję szczegóły." />
        </div>
        <div className="lg:col-span-7">
          <ul className="border-t border-paper/15">
            {faqItems.map((item) => {
              const expanded = open === item.id
              return (
                <li key={item.id} className="border-b border-paper/15">
                  <h3>
                    <button
                      type="button"
                      id={`faq-btn-${item.id}`}
                      aria-expanded={expanded}
                      aria-controls={`faq-panel-${item.id}`}
                      onClick={() => setOpen(expanded ? null : item.id)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-lg font-medium leading-snug transition-colors hover:text-electric lg:py-7 lg:text-2xl"
                    >
                      {item.question}
                      <span className={cn('grid size-10 shrink-0 place-items-center rounded-full border transition-[transform,border-color,background-color] duration-500', expanded ? 'rotate-45 border-gold bg-gold text-ink' : 'border-paper/25')}>
                        <Plus aria-hidden className="size-4" />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        id={`faq-panel-${item.id}`}
                        role="region"
                        aria-labelledby={`faq-btn-${item.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 pr-14 leading-relaxed text-mute">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
