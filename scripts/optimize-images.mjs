/**
 * Optymalizacja zdjęć → WebP w kilku szerokościach (srcset) + manifest.
 *
 * Użycie:
 *   npm run images -- <katalog-ze-zrodlowymi-zdjeciami>
 *
 * Każdy plik źródłowy (jpg/jpeg/png/webp) zostanie zapisany jako
 *   public/images/<nazwa>-<szerokość>.webp
 * a wymiary trafią do src/data/imageManifest.json.
 * Nazwa = nazwa pliku bez rozszerzenia (np. hero.jpg → "hero").
 * Istniejące wpisy manifestu są zachowywane (skrypt dopisuje / nadpisuje).
 */
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const srcDir = process.argv[2]
if (!srcDir) {
  console.error('Podaj katalog ze zdjęciami: npm run images -- ./moje-zdjecia')
  process.exit(1)
}
const root = path.resolve(import.meta.dirname, '..')
const outDir = path.join(root, 'public/images')
const manifestPath = path.join(root, 'src/data/imageManifest.json')
const WIDTHS = [480, 800, 1200, 1600, 2400]
const QUALITY = 72

await fs.mkdir(outDir, { recursive: true })
let manifest = {}
try {
  manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'))
} catch {
  /* nowy manifest */
}

const files = (await fs.readdir(srcDir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
for (const file of files) {
  const name = path.parse(file).name
  const input = sharp(path.join(srcDir, file)).rotate()
  const meta = await input.metadata()
  const maxW = name === 'hero' ? 2400 : 1600
  const widths = WIDTHS.filter((w) => w <= Math.min(meta.width, maxW))
  for (const w of widths) {
    await sharp(path.join(srcDir, file))
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(path.join(outDir, `${name}-${w}.webp`))
  }
  // Mały, rozmyty podgląd (LQIP) jako tło podczas ładowania
  const lqip = await sharp(path.join(srcDir, file)).rotate().resize(16).blur().webp({ quality: 40 }).toBuffer()
  manifest[name] = {
    width: meta.width,
    height: meta.height,
    widths,
    lqip: `data:image/webp;base64,${lqip.toString('base64')}`,
  }
  console.log(`✓ ${name} (${widths.join(', ')})`)
}

// Obraz Open Graph 1200×630 z hero, jeśli istnieje
const heroSrc = files.find((f) => path.parse(f).name === 'hero')
if (heroSrc) {
  await sharp(path.join(srcDir, heroSrc))
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .modulate({ brightness: 0.85 })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(path.join(root, 'public/og-image.jpg'))
  console.log('✓ og-image.jpg')
}

await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
console.log(`Manifest: ${path.relative(root, manifestPath)}`)
