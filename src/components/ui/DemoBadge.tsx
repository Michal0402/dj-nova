import { siteConfig } from '../../config/siteConfig'
import { cn } from '../../lib/cn'

/** Znacznik treści demonstracyjnej. Znika, gdy demoMode = false (chyba że force). */
export function DemoBadge({ className, label = 'Demo', force }: { className?: string; label?: string; force?: boolean }) {
  if (!siteConfig.demoMode && !force) return null
  return (
    <span
      className={cn(
        'label-mono inline-flex items-center gap-1.5 rounded-[2px] border border-gold/40 bg-ink/70 px-2 py-1 text-[0.6rem] tracking-[0.18em] text-gold backdrop-blur-sm',
        className,
      )}
    >
      <span aria-hidden className="size-1 rounded-full bg-gold" />
      {label}
    </span>
  )
}
