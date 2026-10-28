import { ArrowLeft } from 'lucide-react'
import { siteConfig } from '../config/siteConfig'
import { Footer } from '../components/layout/Footer'
import { Logo } from '../components/ui/Logo'
import { SkipLink } from '../components/ui/SkipLink'

/**
 * Polityka prywatności — SZABLON. Fragmenty w nawiasach kwadratowych
 * i dane administratora (siteConfig.legal) trzeba uzupełnić przed publikacją.
 * Treść nie stanowi porady prawnej — warto ją skonsultować.
 */
export function PrivacyPage() {
  const { legal, contact, brand } = siteConfig
  const anyPlaceholder = Object.values(legal).some((v) => typeof v === 'object' && v.placeholder)
  return (
    <>
      <SkipLink />
      <header className="border-b border-paper/10 pt-[env(safe-area-inset-top)]">
        <div className="container-x flex h-16 items-center justify-between lg:h-20">
          <a href="/">
            <Logo />
            <span className="sr-only"> — strona główna</span>
          </a>
          <a href="/" className="inline-flex min-h-11 items-center gap-2 text-sm text-paper/80 hover:text-paper">
            <ArrowLeft aria-hidden className="size-4" /> Wróć na stronę
          </a>
        </div>
      </header>
      <main id="main" className="container-x py-16 lg:py-24">
        <article className="mx-auto max-w-3xl">
          <p className="label-mono text-gold">Dokument</p>
          <h1 className="display-tight mt-5 text-[length:var(--text-h2)] font-semibold uppercase">Polityka prywatności</h1>
          <p className="mt-4 text-sm text-mute-2">Ostatnia aktualizacja: {legal.lastUpdated}</p>

          {anyPlaceholder && (
            <div role="note" className="mt-8 rounded-[var(--radius-card)] border border-gold/40 bg-gold/[0.06] p-5 text-sm leading-relaxed">
              <strong className="text-gold">Szablon do uzupełnienia.</strong> Ten dokument zawiera dane przykładowe w nawiasach kwadratowych. Przed publikacją strony uzupełnij dane administratora w <code>siteConfig.legal</code>, zweryfikuj treść (najlepiej z prawnikiem) i dopasuj ją do faktycznie używanych narzędzi.
            </div>
          )}

          <div className="mt-12 space-y-10 leading-relaxed text-paper/85 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-paper [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1.5">
            <section>
              <h2>1. Administrator danych</h2>
              <p>
                Administratorem Twoich danych osobowych jest {legal.controllerName.value}, {legal.controllerAddress.value}, NIP: {legal.taxId.value}, działający pod marką {brand.name}. Kontakt w sprawach danych osobowych:{' '}
                <a className="underline underline-offset-4" href={`mailto:${contact.email.value}`}>
                  {contact.email.value}
                </a>
                , tel.{' '}
                <a className="underline underline-offset-4" href={`tel:${contact.phone.value.replace(/\s/g, '')}`}>
                  {contact.phone.value}
                </a>
                .
              </p>
            </section>
            <section>
              <h2>2. Jakie dane przetwarzam</h2>
              <p>Dane podane w formularzu kontaktowym lub w wiadomości e-mail: imię, adres e-mail, numer telefonu (opcjonalnie), typ i data wydarzenia, miejscowość, liczba gości (opcjonalnie) oraz treść wiadomości.</p>
            </section>
            <section>
              <h2>3. Cel i podstawa prawna</h2>
              <ul>
                <li>odpowiedź na zapytanie i przygotowanie oferty: art. 6 ust. 1 lit. b RODO (działania przed zawarciem umowy) oraz art. 6 ust. 1 lit. a RODO (zgoda),</li>
                <li>realizacja umowy, jeśli do niej dojdzie: art. 6 ust. 1 lit. b RODO,</li>
                <li>obowiązki księgowe i podatkowe: art. 6 ust. 1 lit. c RODO,</li>
                <li>ustalenie lub dochodzenie roszczeń: art. 6 ust. 1 lit. f RODO.</li>
              </ul>
            </section>
            <section>
              <h2>4. Jak działa formularz</h2>
              <p>
                {siteConfig.contact.form.endpoint
                  ? '[Opisz dostawcę, który odbiera dane z formularza, np. nazwa usługi i jej siedziba.]'
                  : 'Formularz na tej stronie nie wysyła danych na serwer. Po kliknięciu „Wyślij zapytanie” otwiera się Twój program pocztowy z przygotowaną wiadomością, a dane trafiają do mnie dopiero po jej wysłaniu z Twojej skrzynki.'}
              </p>
            </section>
            <section>
              <h2>5. Odbiorcy danych</h2>
              <p>Dane mogą być przekazywane podmiotom wspierającym mnie technicznie: [dostawca poczty e-mail], [dostawca hostingu], [biuro rachunkowe]. Nie sprzedaję danych i nie przekazuję ich w celach marketingowych.</p>
            </section>
            <section>
              <h2>6. Okres przechowywania</h2>
              <p>Dane z zapytań, które nie zakończyły się umową, przechowuję przez [np. 12 miesięcy]. Dane związane z umową przechowuję przez okres wymagany przepisami prawa podatkowego oraz do upływu terminu przedawnienia roszczeń.</p>
            </section>
            <section>
              <h2>7. Twoje prawa</h2>
              <p>Masz prawo do dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia, wniesienia sprzeciwu oraz cofnięcia zgody w dowolnym momencie (bez wpływu na zgodność z prawem wcześniejszego przetwarzania). Przysługuje Ci też skarga do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).</p>
            </section>
            <section>
              <h2>8. Pliki cookies i narzędzia zewnętrzne</h2>
              <p>
                Strona nie używa cookies analitycznych ani marketingowych. Odtwarzacze SoundCloud/Mixcloud ładują się dopiero po kliknięciu i mogą wtedy zapisywać własne pliki cookies zgodnie z polityką tych serwisów. [Jeśli dodasz analitykę, np. Google Analytics, opisz ją tutaj i dodaj baner zgód.]
              </p>
            </section>
            <section>
              <h2>9. Dobrowolność</h2>
              <p>Podanie danych jest dobrowolne, ale bez imienia, adresu e-mail i informacji o wydarzeniu nie mogę odpowiedzieć na zapytanie.</p>
            </section>
          </div>
        </article>
      </main>
      <Footer variant="subpage" />
    </>
  )
}
