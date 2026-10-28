import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { siteConfig } from '../../config/siteConfig'
import { goToContact } from '../../lib/scroll'

/**
 * Przyklejony pasek CTA na telefonach — pojawia się po minięciu hero,
 * znika przy sekcji kontaktu. Uwzględnia safe-area iOS.
 */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const hero = document.getElementById('start')
    const contact = document.getElementById('kontakt')
    const footer = document.querySelector('footer')
    if (!hero || !contact) return
    const state = { pastHero: false, nearContact: false }
    const update = () => setVisible(state.pastHero && !state.nearContact)
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) state.pastHero = !e.isIntersecting
        else state.nearContact = e.isIntersecting
      }
      update()
    })
    io.observe(hero)
    io.observe(contact)
    if (footer) io.observe(footer)
    return () => io.disconnect()
  }, [])

  const tel = siteConfig.contact.phone.value.replace(/\s/g, '')
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-30 border-t border-paper/10 bg-ink/85 px-4 pt-3 backdrop-blur-md pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex gap-2">
            <a
              href="#kontakt"
              onClick={(e) => {
                e.preventDefault()
                goToContact()
              }}
              className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-[var(--radius-card)] bg-violet-deep font-display font-medium text-paper"
            >
              Zapytaj o termin <ArrowUpRight aria-hidden className="size-4" />
            </a>
            <a href={`tel:${tel}`} className="grid min-h-12 w-14 place-items-center rounded-[var(--radius-card)] border border-paper/20" aria-label={`Zadzwoń: ${siteConfig.contact.phone.value}`}>
              <Phone aria-hidden className="size-5" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
