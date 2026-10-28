import { motion, type HTMLMotionProps } from 'framer-motion'

type Props = HTMLMotionProps<'div'> & { delay?: number; y?: number; as?: 'div' | 'li' | 'article' }

/** Oszczędne „reveal on scroll” — jednorazowo, krótko. Respektuje reduced motion (MotionConfig). */
export function Reveal({ delay = 0, y = 24, as = 'div', children, ...rest }: Props) {
  const Component = motion[as] as typeof motion.div
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </Component>
  )
}
