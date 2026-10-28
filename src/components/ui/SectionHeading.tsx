import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Reveal } from './Reveal'

type Props = {
  index: string
  label: string
  title: ReactNode
  lead?: ReactNode
  id?: string
  className?: string
  align?: 'left' | 'split'
}

/** Nagłówek sekcji w stylu editorial: numer, etykieta, duży tytuł, opcjonalny lead. */
export function SectionHeading({ index, label, title, lead, id, className, align = 'split' }: Props) {
  return (
    <header className={cn('grid gap-8', align === 'split' && 'lg:grid-cols-12 lg:items-end', className)}>
      <Reveal className={cn(align === 'split' && 'lg:col-span-8')}>
        <p className="label-mono mb-5 flex items-center gap-3 text-mute">
          <span className="text-gold">{index}</span>
          <span aria-hidden className="h-px w-10 bg-paper/25" />
          {label}
        </p>
        <h2 id={id} className="display-tight text-[length:var(--text-h2)] font-semibold uppercase">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.1} className={cn('max-w-md text-base leading-relaxed text-mute lg:text-lg', align === 'split' && 'lg:col-span-4 lg:justify-self-end')}>
          {lead}
        </Reveal>
      )}
    </header>
  )
}
