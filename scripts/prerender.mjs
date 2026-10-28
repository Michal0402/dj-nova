/**
 * Wstawia wyrenderowany HTML do dist/*.html (statyczny prerender, bez serwera Node).
 * Uruchamiany automatycznie w `npm run build`.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = path.resolve(import.meta.dirname, '..')
const ssrDir = path.join(root, '.ssr')
const { pages } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

for (const [file, render] of Object.entries(pages)) {
  const target = path.join(root, 'dist', file)
  const html = await fs.readFile(target, 'utf8')
  if (!html.includes('<div id="root"></div>')) throw new Error(`Brak <div id="root"></div> w ${file}`)
  const out = html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
  await fs.writeFile(target, out)
  console.log(`prerender: ${file} (${Math.round(out.length / 1024)} kB)`)
}
await fs.rm(ssrDir, { recursive: true, force: true })
