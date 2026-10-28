import { siteConfig, type SocialPlatform } from '../../config/siteConfig'
import { cn } from '../../lib/cn'

const paths: Record<SocialPlatform, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  tiktok: <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.3 2.6 2.2 4.6 5 4.9" />,
  youtube: (
    <>
      <path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </>
  ),
}

const labels: Record<SocialPlatform, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  youtube: 'YouTube',
}

const configuredSocials = () =>
  (Object.entries(siteConfig.social) as [SocialPlatform, string][]).filter(([, url]) => url.trim() !== '')

/** Ikony pojawiają się wyłącznie dla skonfigurowanych linków. */
export function SocialIcons({ className }: { className?: string }) {
  const items = configuredSocials()
  if (!items.length) return null
  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {items.map(([platform, url]) => (
        <li key={platform}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${labels[platform]} (otwiera się w nowej karcie)`}
            className="grid size-11 place-items-center rounded-full border border-paper/15 text-paper/80 transition-colors hover:border-paper/50 hover:text-paper"
          >
            <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              {paths[platform]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  )
}
