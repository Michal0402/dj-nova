import { ImageOff } from 'lucide-react'
import { fallbackSrc, getImage, srcSet } from '../../lib/images'
import { cn } from '../../lib/cn'

type Props = {
  name: string
  alt: string
  sizes: string
  className?: string
  imgClassName?: string
  priority?: boolean
  /** Wymuszenie proporcji kontenera (np. „4 / 5”). Bez = naturalne proporcje zdjęcia. */
  aspect?: string
}

/**
 * Responsywny obraz WebP z srcset, wymiarami (brak CLS), lazy loading
 * i rozmytym podglądem LQIP. Gdy zdjęcia brak — elegancki placeholder.
 */
export function Picture({ name, alt, sizes, className, imgClassName, priority, aspect }: Props) {
  const img = getImage(name)
  if (!img) {
    return (
      <div
        className={cn('flex flex-col items-center justify-center gap-3 bg-surface-2 text-mute', className)}
        style={{ aspectRatio: aspect ?? '4 / 3' }}
        role="img"
        aria-label={`${alt} (zdjęcie wkrótce)`}
      >
        <ImageOff aria-hidden className="size-6" />
        <span className="label-mono">Zdjęcie wkrótce • demo</span>
      </div>
    )
  }
  return (
    <div
      className={cn(/\b(absolute|fixed)\b/.test(className ?? '') ? '' : 'relative', 'overflow-hidden bg-surface', className)}
      style={{
        aspectRatio: aspect === 'auto' ? undefined : (aspect ?? `${img.width} / ${img.height}`),
        backgroundImage: img.lqip ? `url(${img.lqip})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <img
        src={fallbackSrc(name)}
        srcSet={srcSet(name)}
        sizes={sizes}
        width={img.width}
        height={img.height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={cn('absolute inset-0 size-full object-cover', imgClassName)}
      />
    </div>
  )
}
