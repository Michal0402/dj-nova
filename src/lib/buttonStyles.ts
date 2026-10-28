import { cn } from './cn'

export type Variant = 'primary' | 'ghost' | 'light'

export const base =
  'group/btn relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden px-6 font-display text-[0.95rem] font-medium tracking-tight transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.98] rounded-[var(--radius-card)] select-none'

export const variants: Record<Variant, string> = {
  primary: 'bg-violet-deep text-paper hover:bg-[#6b3fdb] shadow-[0_10px_40px_-12px_rgb(139_92_246/0.65)]',
  ghost: 'border border-paper/25 text-paper hover:border-paper/60 hover:bg-paper/5',
  light: 'bg-paper text-ink hover:bg-gold',
}

export const buttonClasses = (variant: Variant = 'primary', className?: string) => cn(base, variants[variant], className)
