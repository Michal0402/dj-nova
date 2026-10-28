import type { Plugin } from 'vite'
import { siteConfig } from './src/config/siteConfig.ts'
import { baseUrl, buildJsonLd, esc } from './src/lib/seo.ts'
import manifest from './src/data/imageManifest.json' with { type: 'json' }

type ManifestEntry = { width: number; height: number; widths: number[] }

/**
 * Wstrzykuje meta tagi SEO / Open Graph / Twitter / canonical / JSON-LD
 * i preload obrazu hero do HTML na podstawie siteConfig, a przy buildzie
 * generuje sitemap.xml i robots.txt.
 */
export function seoPlugin(): Plugin {
  const cfg = siteConfig
  const url = baseUrl()
  const pages = [
    { path: '/', file: 'index.html', title: cfg.site.title, description: cfg.site.description, index: true },
    {
      path: '/polityka-prywatnosci.html',
      file: 'polityka-prywatnosci.html',
      title: `Polityka prywatności — ${cfg.brand.name}`,
      description: `Informacje o przetwarzaniu danych osobowych przez ${cfg.brand.name}.`,
      index: true,
    },
  ]

  const hero = (manifest as Record<string, ManifestEntry>)[cfg.hero.image]

  return {
    name: 'dj-nova-seo',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const file = ctx.filename.split('/').pop() ?? 'index.html'
        const page = pages.find((p) => p.file === file) ?? pages[0]
        const canonical = `${url}${page.path}`
        const ogImage = `${url}${cfg.site.ogImage}`
        const tags = [
          `<title>${esc(page.title)}</title>`,
          `<meta name="description" content="${esc(page.description)}" />`,
          `<link rel="canonical" href="${esc(canonical)}" />`,
          `<meta name="theme-color" content="${cfg.site.themeColor}" />`,
          `<meta property="og:type" content="website" />`,
          `<meta property="og:locale" content="${cfg.site.locale}" />`,
          `<meta property="og:site_name" content="${esc(cfg.brand.name)}" />`,
          `<meta property="og:title" content="${esc(page.title)}" />`,
          `<meta property="og:description" content="${esc(page.description)}" />`,
          `<meta property="og:url" content="${esc(canonical)}" />`,
          `<meta property="og:image" content="${esc(ogImage)}" />`,
          `<meta property="og:image:width" content="1200" />`,
          `<meta property="og:image:height" content="630" />`,
          `<meta name="twitter:card" content="summary_large_image" />`,
          `<meta name="twitter:title" content="${esc(page.title)}" />`,
          `<meta name="twitter:description" content="${esc(page.description)}" />`,
          `<meta name="twitter:image" content="${esc(ogImage)}" />`,
        ]
        if (cfg.demoMode) tags.push(`<meta name="robots" content="noindex, nofollow" />`)
        if (file === 'index.html' && hero) {
          const srcset = hero.widths.map((w) => `/images/${cfg.hero.image}-${w}.webp ${w}w`).join(', ')
          tags.push(
            `<link rel="preload" as="image" type="image/webp" imagesrcset="${srcset}" imagesizes="100vw" fetchpriority="high" />`,
          )
        }
        const jsonLd = file === 'index.html' ? buildJsonLd() : null
        if (jsonLd) tags.push(`<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`)
        return html.replace('<!--SEO-->', tags.join('\n    '))
      },
    },
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .filter((p) => p.index)
  .map((p) => `  <url><loc>${url}${p.path}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n')}
</urlset>
`
      const robots = cfg.demoMode
        ? `# Tryb demo — indeksowanie wyłączone (siteConfig.demoMode)\nUser-agent: *\nDisallow: /\n`
        : `User-agent: *\nAllow: /\n\nSitemap: ${url}/sitemap.xml\n`
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
    },
  }
}
