import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Mail, Phone, X } from 'lucide-react'
import { useCallback, useRef } from 'react'
import { siteConfig } from '../../config/siteConfig'
import { navItems } from '../../data/navigation'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { cn } from '../../lib/cn'
import { goToContact, scrollToSection } from '../../lib/scroll'
import { buttonClasses } from '../../lib/buttonStyles'
import { Logo } from '../ui/Logo'
import { SocialIcons } from '../ui/SocialIcons'

type Props = { open: boolean; onClose: () => void; active: string }

export function MobileMenu({ open, onClose, active }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const close = useCallback(() => onClose(), [onClose])
  useFocusTrap(ref, open, close)

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    onClose()
    // poczekaj na odblokowanie scrolla
    requestAnimationFrame(() => scrollToSection(id))
  }
  const { phone, email } = siteConfig.contact

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-ink lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_100%_0%,rgb(139_92_246/0.18),transparent_70%)]" />
          <div className="container-x relative flex h-16 items-center justify-between pt-[env(safe-area-inset-top)]">
            <Logo />
            <button
              type="button"
              onClick={onClose}
              className="grid size-11 place-items-center rounded-[var(--radius-card)] border border-paper/15"
              aria-label="Zamknij menu"
            >
              <X aria-hidden className="size-5" />
            </button>
          </div>

          <nav aria-label="Menu mobilne" className="container-x relative flex-1 overflow-y-auto pt-6">
            <ul className="border-t border-paper/10">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-paper/10"
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => go(e, item.id)}
                    aria-current={active === item.id ? 'location' : undefined}
                    className="flex items-baseline gap-4 py-3.5"
                  >
                    <span className="label-mono w-6 text-gold/80">{String(i + 1).padStart(2, '0')}</span>
                    <span className={cn('font-display text-[2rem] font-semibold uppercase leading-none tracking-tight', active === item.id ? 'text-paper' : 'text-paper/70')}>
                      {item.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="container-x relative space-y-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6">
            <a
              href="#kontakt"
              onClick={(e) => {
                e.preventDefault()
                onClose()
                requestAnimationFrame(() => goToContact())
              }}
              className={buttonClasses('primary', 'w-full')}
            >
              Zapytaj o termin <ArrowUpRight aria-hidden className="size-4" />
            </a>
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-mute">
              <div className="flex flex-col gap-2">
                <a href={`tel:${phone.value.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 hover:text-paper">
                  <Phone aria-hidden className="size-4" /> {phone.value}
                </a>
                <a href={`mailto:${email.value}`} className="inline-flex items-center gap-2 hover:text-paper">
                  <Mail aria-hidden className="size-4" /> {email.value}
                </a>
              </div>
              <SocialIcons />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
