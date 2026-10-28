export function SkipLink({ target = 'main' }: { target?: string }) {
  return (
    <a
      href={`#${target}`}
      className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-[var(--radius-card)] bg-paper px-4 py-3 font-medium text-ink transition-transform focus:translate-y-0"
    >
      Przejdź do treści
    </a>
  )
}
