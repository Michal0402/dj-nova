/* global document, window */
/**
 * QA (Playwright): zrzuty ekranu, overflow, błędy konsoli, interakcje.
 * Użycie: npm run build && npm run preview  (w drugim terminalu)
 *         node scripts/qa.mjs [url] [katalog-zrzutow]
 */
import { chromium } from 'playwright'

const URL = process.argv[2] ?? 'http://localhost:4173/'
const OUT = process.argv[3] ?? './screenshots'
const exe = process.env.CHROME_PATH
const browser = await chromium.launch(exe ? { executablePath: exe } : {})
const results = []
const ok = (name, pass, info = '') => {
  results.push({ name, pass, info })
  console.log(`${pass ? '✓' : '✗'} ${name}${info ? ` — ${info}` : ''}`)
}

async function revealAll(page) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < h; y += 500) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y)
    await page.waitForTimeout(60)
  }
  await page.waitForTimeout(900)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(400)
}

async function newPage(width, height = 900) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  const errors = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto(URL, { waitUntil: 'networkidle' })
  return { page, ctx, errors }
}

// 1) Overflow na szerokościach
for (const w of [360, 390, 768, 1024, 1440, 1920]) {
  const { page, ctx, errors } = await newPage(w)
  await revealAll(page)
  const sw = await page.evaluate(() => document.documentElement.scrollWidth)
  ok(`brak poziomego overflow @${w}px`, sw <= w, `scrollWidth=${sw}`)
  ok(`brak błędów konsoli @${w}px`, errors.length === 0, errors.join(' | '))
  if (w === 1440 || w === 390) {
    await page.screenshot({ path: `${OUT}/full-${w}.png`, fullPage: true })
  }
  if (w === 390) {
    await page.screenshot({ path: `${OUT}/hero-390.png` })
  }
  if (w === 1440) {
    await page.screenshot({ path: `${OUT}/hero-1440.png` })
  }
  await ctx.close()
}

// 2) Interakcje mobile
{
  const { page, ctx } = await newPage(390, 844)
  await page.getByRole('button', { name: 'Otwórz menu' }).click()
  const dialog = page.getByRole('dialog', { name: 'Menu' })
  ok('menu mobilne otwiera się', await dialog.isVisible())
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${OUT}/mobile-menu-390.png` })
  await page.keyboard.press('Escape')
  await page.waitForTimeout(400)
  ok('menu zamyka się Escape', !(await dialog.isVisible().catch(() => false)))
  await page.getByRole('button', { name: 'Otwórz menu' }).click()
  await page.getByRole('dialog', { name: 'Menu' }).getByRole('link', { name: /FAQ/ }).click()
  await page.waitForTimeout(2500)
  const faqTop = await page.evaluate(() => document.getElementById('faq').getBoundingClientRect().top)
  ok('link w menu przewija do sekcji', Math.abs(faqTop) <= 100, `top=${Math.round(faqTop)}`)
  await ctx.close()
}

// 3) Galeria: filtr + lightbox
{
  const { page, ctx } = await newPage(1440)
  await page.locator('#realizacje').scrollIntoViewIfNeeded()
  const group = page.getByRole('group', { name: 'Filtruj realizacje' })
  await group.getByRole('button', { name: /^Wesela/ }).click()
  await page.waitForTimeout(500)
  const count = await page.locator('#realizacje ul.masonry > li').count()
  ok('filtr galerii „Wesela”', count === 4, `widoczne=${count}`)
  await page.locator('#realizacje ul.masonry > li button').first().click()
  const lb = page.getByRole('dialog', { name: /Podgląd zdjęcia/ })
  ok('lightbox otwiera się', await lb.isVisible())
  const before = await lb.getAttribute('aria-label')
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(300)
  const after = await lb.getAttribute('aria-label')
  ok('lightbox: strzałka → zmienia zdjęcie', before !== after, `${before} → ${after}`)
  await page.keyboard.press('Tab')
  const inside = await page.evaluate(() => !!document.activeElement?.closest('[role="dialog"]'))
  ok('lightbox: fokus uwięziony w dialogu', inside)
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/lightbox-1440.png` })
  await page.keyboard.press('Escape')
  await page.waitForTimeout(400)
  ok('lightbox zamyka się Escape', (await page.getByRole('dialog').count()) === 0)
  await ctx.close()
}

// 4) FAQ (klawiatura)
{
  const { page, ctx } = await newPage(1440)
  const btn = page.locator('#faq-btn-playlista')
  await btn.scrollIntoViewIfNeeded()
  await btn.focus()
  await page.keyboard.press('Enter')
  await page.waitForTimeout(600)
  ok('FAQ: Enter rozwija odpowiedź', (await btn.getAttribute('aria-expanded')) === 'true' && (await page.locator('#faq-panel-playlista').isVisible()))
  await page.keyboard.press('Space')
  await page.waitForTimeout(600)
  ok('FAQ: Spacja zwija odpowiedź', (await btn.getAttribute('aria-expanded')) === 'false')
  await ctx.close()
}

// 5) Formularz: walidacja + preselekcja z oferty
{
  const { page, ctx } = await newPage(1440)
  await page.locator('#oferta a[aria-label^="Imprezy firmowe"]').click()
  await page.waitForTimeout(1200)
  ok('karta oferty preselektuje typ wydarzenia', (await page.locator('#eventType').inputValue()) === 'firmowe', page.url())
  await page.getByRole('button', { name: /Wyślij zapytanie/ }).click()
  await page.waitForTimeout(500)
  const nameInvalid = await page.locator('#name').getAttribute('aria-invalid')
  const describedBy = await page.locator('#name').getAttribute('aria-describedby')
  const errText = describedBy ? await page.locator(`#${describedBy.split(' ').pop()}`).textContent() : ''
  ok('formularz: błędy walidacji + aria-describedby', nameInvalid === 'true' && !!errText, errText ?? '')
  const focused = await page.evaluate(() => document.activeElement?.id)
  ok('formularz: fokus na pierwszym błędnym polu', focused === 'name', focused)
  await page.locator('#email').fill('zly-adres')
  await page.locator('#email').blur()
  await page.waitForTimeout(200)
  ok('formularz: walidacja e-mail', ((await page.locator('#email-error').textContent()) ?? '').includes('poprawny'))
  await page.locator('#kontakt form').screenshot({ path: `${OUT}/form-errors-1440.png` })
  await ctx.close()
}

// 6) Polityka prywatności
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto(new globalThis.URL('/polityka-prywatnosci.html', URL).toString(), { waitUntil: 'networkidle' })
  ok('polityka prywatności renderuje się', (await page.locator('h1').textContent())?.includes('Polityka') ?? false)
  ok('polityka: brak błędów', errors.length === 0, errors.join(' | '))
  await page.screenshot({ path: `${OUT}/privacy-390.png` })
  await ctx.close()
}

// 7) Jedno H1
{
  const { page, ctx } = await newPage(1440)
  const h1 = await page.locator('h1').count()
  ok('dokładnie jedno H1', h1 === 1, `h1=${h1}`)
  await ctx.close()
}

await browser.close()
const failed = results.filter((r) => !r.pass)
console.log(`\n${results.length - failed.length}/${results.length} testów OK`)
process.exit(failed.length ? 1 : 0)
