import manifest from '../data/imageManifest.json'

export type ImageEntry = { width: number; height: number; widths: number[]; lqip?: string }

const images = manifest as Record<string, ImageEntry>

export function getImage(name: string): ImageEntry | undefined {
  return images[name]
}

export function imageSrc(name: string, width: number) {
  return `/images/${name}-${width}.webp`
}

export function srcSet(name: string) {
  const entry = images[name]
  if (!entry) return undefined
  return entry.widths.map((w) => `${imageSrc(name, w)} ${w}w`).join(', ')
}

/** Najbliższy rozmiar ≥ preferowanej szerokości (fallback dla `src`). */
export function fallbackSrc(name: string, preferred = 1200) {
  const entry = images[name]
  if (!entry) return undefined
  const w = entry.widths.find((x) => x >= preferred) ?? entry.widths[entry.widths.length - 1]
  return imageSrc(name, w)
}
