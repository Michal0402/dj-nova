import { ArrowUpRight, Phone } from 'lucide-react'
import { siteConfig } from '../../config/siteConfig'
import { goToContact } from '../../lib/scroll'
import { ButtonLink } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { Waveform } from '../ui/Waveform'

export function FinalCta() {
  const { finalCta, contact } = siteConfig
  return (
    <section aria-labelledby="cta-title" className="grain relative isolate overflow-hidden bg-[#05060a] py-28 lg:py-44">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_120%,rgb(139_92_246/0.35),transparent_70%)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="container-x text-center">
        <Reveal>
          <Waveform className="mx-auto mb-10 h-10 justify-center text-electric/70" />
          <h2 id="cta-title" className="display-tight font-display text-[length:var(--text-mega)] font-bold uppercase">
            <span className="block">{finalCta.title[0]}</span>
            <span className="block text-electric">{finalCta.title[1]}</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-paper/80">{finalCta.text}</p>
          <div className="mt-11 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <ButtonLink
              href="#kontakt"
              variant="light"
              onClick={(e) => {
                e.preventDefault()
                goToContact()
              }}
              icon={<ArrowUpRight className="size-4" />}
            >
              {finalCta.primary}
            </ButtonLink>
            <ButtonLink href={`tel:${contact.phone.value.replace(/\s/g, '')}`} variant="ghost" icon={<Phone className="size-4" />}>
              {finalCta.secondary}
              <span className="sr-only">: {contact.phone.value}</span>
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
