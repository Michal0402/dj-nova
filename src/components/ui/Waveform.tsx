import { cn } from '../../lib/cn'

const BARS = [0.35, 0.6, 0.9, 0.5, 0.75, 1, 0.65, 0.4, 0.85, 0.55, 0.95, 0.45, 0.7, 0.3, 0.8, 0.6, 0.9, 0.5, 0.7, 0.4]

/** Dekoracyjny waveform (CSS), bez audio. animated=false → statyczny. */
export function Waveform({ className, animated = true, bars = BARS.length }: { className?: string; animated?: boolean; bars?: number }) {
  return (
    <div aria-hidden className={cn('flex h-8 items-end gap-[3px]', className)}>
      {BARS.slice(0, bars).map((h, i) => (
        <span
          key={i}
          className={cn('w-[3px] rounded-full bg-current', animated && 'animate-wave')}
          style={{ height: `${h * 100}%`, animationDelay: `${(i % 7) * -0.23}s`, animationDuration: `${1.2 + (i % 5) * 0.18}s` }}
        />
      ))}
    </div>
  )
}
