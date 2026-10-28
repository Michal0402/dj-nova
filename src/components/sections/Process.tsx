import { motion } from 'framer-motion'
import { siteConfig } from '../../config/siteConfig'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Process() {
  const { steps, title } = siteConfig.process
  return (
    <section id="wspolpraca" aria-labelledby="wspolpraca-title" className="relative border-y border-paper/10 bg-surface/40 py-24 lg:py-36">
      <div className="container-x">
        <SectionHeading id="wspolpraca-title" index="05" label="Proces" title={title} lead="Cztery proste kroki od pierwszej wiadomości do ostatniego utworu." />

        <ol className="relative mt-16 grid gap-0 lg:mt-24 lg:grid-cols-4 lg:gap-8">
          {/* linia osi czasu — desktop poziomo */}
          <motion.span
            aria-hidden
            className="absolute left-0 right-0 top-[0.6rem] hidden h-px origin-left bg-gradient-to-r from-gold via-violet to-transparent lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* linia — mobile pionowo */}
          <span aria-hidden className="absolute bottom-4 left-[0.55rem] top-2 w-px bg-gradient-to-b from-gold via-violet/60 to-transparent lg:hidden" />

          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={0.15 * i} className="relative pb-12 pl-12 last:pb-0 lg:pb-0 lg:pl-0">
              <span aria-hidden className="absolute left-0 top-0.5 grid size-5 place-items-center rounded-full border border-gold/60 bg-ink lg:static lg:mb-10">
                <span className="size-1.5 rounded-full bg-gold" />
              </span>
              <span className="block font-display text-6xl font-bold leading-none tracking-tighter text-paper/[0.14] lg:text-8xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-display text-[length:var(--text-h3)] font-semibold leading-tight">{s.title}</h3>
              <p className="mt-3 max-w-xs leading-relaxed text-mute">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
