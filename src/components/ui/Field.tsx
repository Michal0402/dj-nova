import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Props = {
  id: string
  label: string
  optional?: boolean
  error?: string
  hint?: string
  className?: string
  children: (a11y: { id: string; 'aria-invalid': boolean; 'aria-describedby'?: string }) => ReactNode
}

/** Pole formularza: etykieta, opis, błąd powiązany przez aria-describedby. */
export function Field({ id, label, optional, error, hint, className, children }: Props) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
  return (
    <div className={cn('flex flex-col', className)}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-medium text-paper/90">
        {label}
        {optional && <span className="text-xs font-normal text-mute-2">opcjonalnie</span>}
      </label>
      {children({ id, 'aria-invalid': !!error, 'aria-describedby': describedBy })}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-mute-2">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-[#ff9b9b]">
          {error}
        </p>
      )}
    </div>
  )
}

export const inputClass =
  'min-h-12 w-full rounded-[var(--radius-card)] border border-paper/15 bg-ink/60 px-4 py-3 text-base text-paper placeholder:text-paper/35 transition-colors hover:border-paper/30 focus:border-electric focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-electric aria-[invalid=true]:border-[#ff9b9b]/70'
