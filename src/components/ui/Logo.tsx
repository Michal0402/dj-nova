import { siteConfig } from '../../config/siteConfig'
import { cn } from '../../lib/cn'

/** Sygnet: pierścień (winyl) + złoty środek + fioletowe cięcie „crossfadera”. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn('size-8', className)} aria-hidden>
      <circle cx="20" cy="20" r="13" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="20" cy="20" r="3.2" fill="#D7B77A" />
      <path d="M7 33 33 7" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="flex items-baseline gap-1.5 font-display leading-none">
        <span className="text-[0.62rem] font-medium tracking-[0.3em] text-gold">DJ</span>{' '}
        <span className="text-xl font-bold tracking-[0.14em]">{siteConfig.brand.shortName}</span>
      </span>
    </span>
  )
}
