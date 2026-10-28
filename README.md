# DJ NOVA — strona one-page

Statyczna strona DJ-a (wesela, osiemnastki, eventy firmowe i prywatne, kluby).
React 19 + TypeScript + Vite + Tailwind CSS 4 + Framer Motion + Lucide + Zod.
Bez backendu, bazy danych, CMS-a i płatnych API — wynik `npm run build` to katalog `dist/` (statyczny, prerenderowany HTML + JS), który serwuje Nginx.

> ⚠️ **Wersja demonstracyjna.** Zdjęcia pochodzą ze stocku (Pexels), a telefon, e-mail, adres domeny i dane administratora to placeholdery.
> Dopóki `demoMode: true`, strona ma `noindex` i `robots.txt` blokujący indeksowanie, a elementy przykładowe są oznaczone etykietą „DEMO”.

## Szybki start

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # tsc + vite build → dist/
npm run preview      # podgląd builda: http://localhost:4173
npm run lint         # ESLint
npm run typecheck    # TypeScript
npm run qa           # testy Playwright na działającym preview (opcjonalnie: CHROME_PATH=/usr/bin/google-chrome)
```

Wymagany Node.js 20.19+ (lub 22+).

## Struktura

```
index.html                    strona główna (znacznik <!--SEO--> wypełnia seo.plugin.ts)
polityka-prywatnosci.html     polityka prywatności (osobny entry)
seo.plugin.ts                 meta/OG/Twitter/canonical, JSON-LD, preload hero, sitemap.xml, robots.txt
public/images/                zdjęcia WebP (480/800/1200/1600, hero także 2400)
public/og-image.jpg           obraz Open Graph 1200×630
scripts/optimize-images.mjs   konwersja zdjęć → WebP + manifest
scripts/qa.mjs                testy Playwright (overflow, menu, galeria, lightbox, FAQ, formularz)
scripts/prerender.mjs         prerender (SSG): gotowy HTML wstawiany do dist/*.html, potem hydratacja
src/entry-server.tsx          wejście SSR używane wyłącznie przy buildzie
src/config/siteConfig.ts      ★ CAŁA TREŚĆ: marka, kontakt, oferta, sety, proces, o mnie, opinie, FAQ, SEO
src/data/gallery.ts           ★ zdjęcia galerii + filtry (i opcjonalne wideo)
src/data/faq.ts               ★ pytania i odpowiedzi
src/data/imageCredits.ts      źródła zdjęć demonstracyjnych
src/data/imageManifest.json   wymiary + LQIP (generowane przez `npm run images`)
src/components/sections/      sekcje strony (Hero, Intro, Offer, Gallery, Music, Process, About, Testimonials, Faq, FinalCta, Contact)
src/components/layout/        Navbar, MobileMenu, Footer, MobileCtaBar
src/components/ui/            Picture, Lightbox, Button, Field, SocialIcons, DemoBadge…
src/lib/contact.ts            adapter wysyłki formularza (mailto / przyszłe API)
src/lib/contactSchema.ts      walidacja Zod (ładowana leniwie)
src/pages/PrivacyPage.tsx     szablon polityki prywatności
```

## Edycja treści

Wszystko edytujesz w **`src/config/siteConfig.ts`** oraz w **`src/data/*`** — bez dotykania komponentów.

- **Kontakt:** `contact.phone`, `contact.email`, `contact.city`, `contact.serviceArea`. Każde pole ma `{ value, placeholder }` — po wpisaniu prawdziwej wartości ustaw `placeholder: false`, a etykieta „DEMO” zniknie.
- **Adres strony:** `site.url` (np. `https://www.djnova.pl`, bez końcowego `/`) + `placeholder: false`. Z niego powstają canonical, OG, sitemap i JSON-LD.
- **Social media:** `social.instagram`, `facebook`, `tiktok`, `youtube`. Ikona pokazuje się tylko przy niepustym linku.
- **Oferta:** `services` (5 kart bento). `id` karty to typ wydarzenia, który zostaje automatycznie wybrany w formularzu (link `?typ=wesele#kontakt`).
- **Sety muzyczne:** `music.sets[].url` — wklej adres strony utworu SoundCloud lub miksu Mixcloud. Odtwarzacz (iframe) ładuje się dopiero po kliknięciu „Załaduj odtwarzacz” — bez autoplay i bez ładowania skryptów zewnętrznych wcześniej. Pusty `url` = „Nagrania wkrótce”.
- **Opinie:** `testimonials.items` — dodawaj wyłącznie prawdziwe opinie, za zgodą autorów. Gdy lista jest pusta: `whenEmpty: 'empty-state'` (zachęta do napisania opinii) lub `'hide'` (sekcja i link w menu znikają).
- **O mnie:** `about` — zastąp tekst demonstracyjny swoją historią; `about.experience` to miejsce na prawdziwe doświadczenie (bez wymyślonych liczb i nagród).
- **FAQ:** `src/data/faq.ts` (odpowiedzi korzystają z `facts` w configu).
- **Tryb demo:** `demoMode: false` usuwa oznaczenia „DEMO”, włącza indeksowanie i JSON-LD (o ile `site.url` nie jest placeholderem).

## Formularz kontaktowy

- Walidacja Zod (komunikaty po polsku), błędy powiązane z polami przez `aria-describedby`, fokus przenoszony na pierwsze błędne pole, stan „Wysyłanie…”, honeypot antyspamowy (`website`).
- **Domyślnie (bez backendu):** tryb awaryjny e-mail — po kliknięciu „Wyślij” otwiera się program pocztowy z gotową wiadomością. Strona jasno komunikuje, że zapytanie **nie zostało jeszcze wysłane**, dopóki użytkownik nie kliknie „Wyślij” w programie pocztowym (żadnego fałszywego „Dziękujemy”).
- **Docelowo:** ustaw `contact.form.endpoint` na adres własnego API (np. funkcja serverless, Formspree, n8n). Formularz wyśle `POST` JSON: `{ name, email, phone, eventType, date, location, guests, message, consent }` i pokaże sukces dopiero po odpowiedzi 2xx. Logikę zmienisz w `src/lib/contact.ts` (`createApiTransport`).
- **Nigdy nie umieszczaj kluczy SMTP ani sekretów w kodzie frontendu** — wszystko z `src/` trafia do przeglądarki.

## Zdjęcia

1. Przygotuj zdjęcia (JPG/PNG/WebP, najlepiej ≥ 2400 px dla hero, ≥ 1600 px dla pozostałych) w dowolnym katalogu.
2. Nazwij plik tak jak obraz, który zastępuje (np. `hero.jpg`, `portrait.jpg`, `wedding-disco.jpg`) albo nadaj nową nazwę.
3. Uruchom:
   ```bash
   npm run images -- ./moje-zdjecia
   ```
   Skrypt zapisze `public/images/<nazwa>-<szerokość>.webp`, zaktualizuje `src/data/imageManifest.json` (wymiary + rozmyty podgląd) i — dla `hero` — `public/og-image.jpg`.
4. Nowe nazwy wpisz w `siteConfig.ts` (hero, intro, about, services) lub w `src/data/gallery.ts`. Po podmianie usuń `demo: true` z wpisów galerii i nieużywane pliki WebP.
5. Usuń wpisy z `src/data/imageCredits.ts` i `IMAGE_CREDITS.md`, jeśli zdjęcia demonstracyjne nie są już używane.

Obecne zdjęcia demonstracyjne i ich autorzy: **[IMAGE_CREDITS.md](./IMAGE_CREDITS.md)** (Pexels, licencja Pexels — darmowe użycie komercyjne, bez wymogu atrybucji).

## SEO

- Tytuł, opis, OG, Twitter Card, canonical i `lang="pl-PL"` generowane z `siteConfig` podczas builda (`seo.plugin.ts`).
- JSON-LD (`LocalBusiness`/`EntertainmentBusiness`) dodawany tylko z prawdziwych danych — pomijany w trybie demo i przy placeholderowym adresie strony. Brak ocen/opinii w schema.
- `sitemap.xml` i `robots.txt` generowane do `dist/`. W trybie demo `robots.txt` = `Disallow: /`.
- Treść jest prerenderowana do HTML podczas builda (widoczna dla wyszukiwarek i bez czekania na JS); animacje hero działają w czystym CSS.
- Hero preładowany (`<link rel="preload" as="image" imagesrcset>`), pozostałe obrazy `loading="lazy"`, wymiary podane (brak CLS).
- Fonty Space Grotesk i Inter są self-hostowane (pakiety `@fontsource-variable`), bez Google Fonts.

## Wdrożenie (Nginx)

```bash
npm ci && npm run build
rsync -av --delete dist/ user@serwer:/var/www/djnova/
```

Przykładowy `/etc/nginx/sites-available/djnova.conf`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name djnova.pl www.djnova.pl;
    return 301 https://www.djnova.pl$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name www.djnova.pl;

    ssl_certificate     /etc/letsencrypt/live/www.djnova.pl/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.djnova.pl/privkey.pem;

    root /var/www/djnova;
    index index.html;
    charset utf-8;

    # Nagłówki bezpieczeństwa
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

    # Kompresja
    gzip on;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml application/xml text/xml;

    # Zasoby z hashem w nazwie — cache na rok
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
        try_files $uri =404;
    }

    # Zdjęcia — cache 30 dni (nazwy bez hasha; po podmianie zdjęć zmień nazwę lub skróć cache)
    location /images/ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
        try_files $uri =404;
    }

    # HTML — zawsze świeży
    location ~* \.html$ {
        add_header Cache-Control "no-cache";
    }

    # /polityka-prywatnosci → polityka-prywatnosci.html
    location / {
        try_files $uri $uri.html $uri/ /index.html;
    }

    error_page 404 /index.html;
}
```

Po wdrożeniu: `sudo nginx -t && sudo systemctl reload nginx`, certyfikat np. `sudo certbot --nginx -d www.djnova.pl -d djnova.pl`.

## Lista kontrolna przed publikacją

- [ ] `site.url` = prawdziwa domena, `placeholder: false`
- [ ] Telefon, e-mail, miasto i obszar działania — prawdziwe dane, `placeholder: false`
- [ ] Linki social media (tylko istniejące profile)
- [ ] Własne zdjęcia zamiast demonstracyjnych (hero, intro, portret, oferta, galeria) + aktualizacja `IMAGE_CREDITS.md`
- [ ] Tekst „O mnie” i prawdziwe doświadczenie (`about.experience`)
- [ ] Linki do setów SoundCloud/Mixcloud (lub pozostaw „Nagrania wkrótce”)
- [ ] Opinie — tylko prawdziwe, za zgodą autorów
- [ ] Odpowiedzi FAQ i `facts` (np. sprzęt, obszar, wycena) zgodne z rzeczywistością
- [ ] **Polityka prywatności**: uzupełnij dane administratora w `legal` (siteConfig) i zweryfikuj szablon z prawnikiem (RODO)
- [ ] Formularz: ustaw `contact.form.endpoint` (zalecane) albo świadomie zostaw tryb e-mail
- [ ] `demoMode: false`
- [ ] `npm run lint && npm run build && npm run preview` + `npm run qa`
- [ ] Lighthouse na serwerze produkcyjnym (z gzip/HTTP2)

## Dostępność

Semantyczne sekcje i nagłówki (jedno H1), skip link, widoczny `:focus-visible`, nawigacja klawiaturą (menu mobilne i lightbox z pułapką fokusu, Escape, strzałki; FAQ jako przyciski z `aria-expanded`), `prefers-reduced-motion` (animacje i marquee wyłączone), kontrast kolorów tekstu ≥ 4.5:1 na tle `#08090D`, obsługa safe-area iOS, cele dotykowe ≥ 44 px.
