import { motion } from 'framer-motion'
import { ArrowUpRight, Menu } from 'lucide-react'
import { useState } from 'react'
import { navItems } from '../../data/navigation'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { cn } from '../../lib/cn'
import { goToContact, scrollToSection } from '../../lib/scroll'
import { buttonClasses } from '../../lib/buttonStyles'
import { Logo } from '../ui/Logo'
import { MobileMenu } from './MobileMenu'

const ids = navItems.map((n) => n.id)

export function Navbar() {
  const scrolled = useScrolled(32)
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)

  const onNav = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    scrollToSection(id)
  }

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)] transition-[background-color,border-color,backdrop-filter] duration-500',
          scrolled ? 'border-b border-paper/[0.07] bg-ink/80 backdrop-blur-md' : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="container-x flex h-16 items-center justify-between gap-6 lg:h-20">
          <a href="#start" onClick={(e) => onNav(e, 'start')} className="shrink-0 rounded-sm">
            <Logo />
            <span className="sr-only"> — strona główna</span>
          </a>

          <nav aria-label="Główna nawigacja" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => onNav(e, item.id)}
                    aria-current={active === item.id ? 'location' : undefined}
                    className={cn(
                      'relative block px-3.5 py-2 text-sm transition-colors duration-300',
                      active === item.id ? 'text-paper' : 'text-paper/65 hover:text-paper',
                    )}
                  >
                    {item.label}
                    {active === item.id && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3.5 -bottom-0.5 h-px bg-gold"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#kontakt"
              onClick={(e) => {
                e.preventDefault()
                goToContact()
              }}
              className={buttonClasses('primary', 'whitespace-nowrap')}
            >
              <span className="sm:hidden">Zapytaj</span>
              <span className="hidden sm:inline">Zapytaj o termin</span>
              <ArrowUpRight aria-hidden className="size-4" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid size-11 place-items-center rounded-[var(--radius-card)] border border-paper/15 text-paper transition-colors hover:border-paper/40 lg:hidden"
              aria-label="Otwórz menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu aria-hidden className="size-5" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} active={active} />
    </>
  )
}
