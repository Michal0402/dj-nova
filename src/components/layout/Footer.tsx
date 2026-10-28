import { siteConfig } from '../../config/siteConfig'
import { navItems } from '../../data/navigation'
import { scrollToSection } from '../../lib/scroll'
import { Logo } from '../ui/Logo'
import { SocialIcons } from '../ui/SocialIcons'

type Props = { variant?: 'home' | 'subpage' }

export function Footer({ variant = 'home' }: Props) {
  const { brand, contact } = siteConfig
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-paper/10 bg-[#05060a] pb-[max(2rem,calc(env(safe-area-inset-bottom)+5.5rem))] pt-20 lg:pb-10">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm leading-relaxed text-mute">{brand.tagline}</p>
            <SocialIcons className="mt-8" />
          </div>
          <nav aria-label="Szybkie linki" className="lg:col-span-3">
            <h2 className="label-mono mb-5 text-gold">Na skróty</h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-paper/80 lg:grid-cols-1">
              {navItems.map((n) => (
                <li key={n.id}>
                  <a
                    href={variant === 'home' ? `#${n.id}` : `/#${n.id}`}
                    onClick={
                      variant === 'home'
                        ? (e) => {
                            e.preventDefault()
                            scrollToSection(n.id)
                          }
                        : undefined
                    }
                    className="inline-block py-0.5 hover:text-paper"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-4">
            <h2 className="label-mono mb-5 text-gold">Kontakt</h2>
            <ul className="space-y-3 text-paper/85">
              <li>
                <a href={`tel:${contact.phone.value.replace(/\s/g, '')}`} className="hover:text-paper">
                  {contact.phone.value}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email.value}`} className="break-all hover:text-paper">
                  {contact.email.value}
                </a>
              </li>
              <li className="text-mute">{contact.serviceArea.value}</li>
            </ul>
          </div>
        </div>

        <p aria-hidden className="deco-text mt-20 select-none font-display text-[clamp(4rem,19vw,19rem)] font-bold uppercase leading-[0.75] tracking-[-0.06em] text-paper/[0.05]" data-text={brand.name} />

        <div className="mt-10 flex flex-col gap-4 border-t border-paper/10 pt-6 text-sm text-mute-2 md:flex-row md:items-center md:justify-between">
          <p>
            <span suppressHydrationWarning>© {year}</span> {brand.name}. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="/polityka-prywatnosci.html" className="hover:text-paper">
              Polityka prywatności
            </a>
            {siteConfig.demoMode && <span className="text-gold/80">Wersja demonstracyjna: zdjęcia Pexels, dane przykładowe</span>}
          </div>
        </div>
      </div>
    </footer>
  )
}
