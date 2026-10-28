/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  DJ NOVA — centralna konfiguracja strony
 * ─────────────────────────────────────────────────────────────────────────────
 *  Tu zmieniasz nazwę marki, dane kontaktowe, teksty, usługi, FAQ, sety
 *  muzyczne, opinie i linki social media. Zdjęcia galerii są w
 *  src/data/gallery.ts, a manifest zdjęć generuje `npm run images`.
 *
 *  ZASADA: wartości oznaczone `placeholder: true` są DEMONSTRACYJNE.
 *  Przed publikacją podmień je na prawdziwe i ustaw `placeholder: false`.
 *  Pola-placeholdery nie trafiają do danych strukturalnych (JSON-LD).
 *
 *  Plik jest importowany również przez vite.config.ts (SEO, sitemap),
 *  dlatego nie importuj tutaj niczego z przeglądarki ani komponentów.
 */

export type Placeholderable<T = string> = { value: T; placeholder: boolean }

export type EventTypeId = 'wesele' | 'urodziny' | 'firmowe' | 'prywatne' | 'klub' | 'inne'

export type SocialPlatform = 'instagram' | 'facebook' | 'tiktok' | 'youtube'

export type MusicSet = {
  id: string
  title: string
  mood: string
  description: string
  tags: string[]
  /**
   * Link do embedu SoundCloud lub Mixcloud (adres strony utworu/miksu).
   * Puste = elegancka karta „Nagrania wkrótce”.
   * Przykłady:
   *   https://soundcloud.com/uzytkownik/nazwa-miksu
   *   https://www.mixcloud.com/uzytkownik/nazwa-miksu/
   */
  url: string
}

export type Testimonial = {
  /** Treść opinii — wyłącznie prawdziwa, za zgodą autora. */
  quote: string
  author: string
  /** np. „Wesele, maj 2026” */
  event: string
}

export type VideoLink = {
  platform: 'youtube' | 'instagram'
  /** Pełny, prawdziwy link do filmu/rolki. */
  url: string
  title: string
}

export const siteConfig = {
  /** Pokazuje pasek „wersja demonstracyjna” i znaczniki DEMO. Ustaw false przed publikacją. */
  demoMode: true,

  brand: {
    name: 'DJ NOVA',
    /** Krótka nazwa do logo (wyświetlana dużymi literami). */
    shortName: 'NOVA',
    tagline: 'Muzyka, energia i emocje, które zostają na dłużej.',
    eyebrow: 'DJ • EVENT EXPERIENCE',
  },

  site: {
    /** Docelowy adres strony — używany w canonical, Open Graph i sitemap. */
    url: { value: 'https://www.example.com', placeholder: true } as Placeholderable,
    locale: 'pl_PL',
    lang: 'pl-PL',
    title: 'DJ NOVA — DJ na wesela, osiemnastki i eventy firmowe',
    description:
      'DJ na wesela, imprezy prywatne i eventy firmowe. Repertuar dopasowany do gości, prowadzenie imprezy i oprawa muzyczna, którą zapamiętasz. Zapytaj o wolny termin.',
    ogImage: '/og-image.jpg',
    themeColor: '#08090D',
  },

  contact: {
    phone: { value: '+48 000 000 000', placeholder: true } as Placeholderable,
    email: { value: 'kontakt@example.com', placeholder: true } as Placeholderable,
    city: { value: 'Warszawa', placeholder: true } as Placeholderable,
    /** Obszar działania — wyświetlany w stopce, FAQ i sekcji kontakt. */
    serviceArea: { value: 'Warszawa i województwo mazowieckie, dalsze wyjazdy po ustaleniu', placeholder: true } as Placeholderable,
    /** Opcjonalny czas odpowiedzi — zostaw pusty, jeśli nie chcesz niczego obiecywać. */
    responseNote: 'Odpowiadam na każde zapytanie osobiście.',
    form: {
      /**
       * Adres przyszłego API formularza (np. własny endpoint, Formspree, funkcja serverless).
       * Pusty = tryb awaryjny mailto (otwiera program pocztowy użytkownika).
       * NIGDY nie wpisuj tu kluczy SMTP ani sekretów.
       */
      endpoint: '',
    },
  },

  /** Linki social media — ikonka pojawi się tylko przy uzupełnionym adresie. */
  social: {
    instagram: '',
    facebook: '',
    tiktok: '',
    youtube: '',
  } satisfies Record<SocialPlatform, string>,

  /** Dane administratora do polityki prywatności (RODO). */
  legal: {
    controllerName: { value: '[Imię i nazwisko / nazwa firmy]', placeholder: true } as Placeholderable,
    controllerAddress: { value: '[Adres siedziby]', placeholder: true } as Placeholderable,
    taxId: { value: '[NIP]', placeholder: true } as Placeholderable,
    lastUpdated: '2026-10-28',
  },

  hero: {
    titleLines: ['Tworzę', 'atmosferę,', 'którą', 'zapamiętasz.'],
    /** Indeks linii wyróżnionej kolorem. */
    accentLine: 1,
    subtitle: 'DJ na wesela, imprezy prywatne i eventy firmowe. Muzyka, energia i niezapomniane emocje.',
    primaryCta: 'Zapytaj o wolny termin',
    secondaryCta: 'Zobacz realizacje',
    image: 'hero',
    imageAlt: 'DJ miksuje muzykę na podświetlonej konsoli w ciemnym klubie',
  },

  intro: {
    label: 'Podejście',
    title: ['Nie puszczam tylko muzyki.', 'Tworzę wspomnienia.'],
    lead: 'Dobra impreza nie dzieje się przypadkiem. To wyczucie sali, właściwy utwór w odpowiednim momencie i prowadzenie, które nie przytłacza, tylko porywa.',
    paragraphs: [
      'Zanim zagram pierwszy utwór, poznaję Was, Waszych gości i charakter wydarzenia. Repertuar układam tak, żeby łączył pokolenia: od klasyków, które znają wszyscy, po aktualne hity i klubowe brzmienia na późniejsze godziny.',
      'Na sali obserwuję parkiet i reaguję na bieżąco. Mikrofon traktuję z umiarem: zapowiadam kluczowe momenty, pomagam w harmonogramie, ale to muzyka ma grać główną rolę.',
    ],
    image: 'intro-dj',
    imageAlt: 'DJ przy konsoli w czerwonym świetle klubowym',
    /** Wyróżniki jakościowe — bez liczb. Uzupełnij o prawdziwe doświadczenie. */
    highlights: [
      { title: 'Repertuar szyty na miarę', text: 'Playlista budowana wspólnie, z listą utworów obowiązkowych i zakazanych.' },
      { title: 'Czytanie parkietu', text: 'Tempo i gatunki dobierane na żywo do energii gości.' },
      { title: 'Spokój organizacyjny', text: 'Harmonogram, zapowiedzi i współpraca z salą lub wedding plannerem.' },
    ],
  },

  services: [
    {
      id: 'wesele' as EventTypeId,
      title: 'Wesela',
      kicker: 'Najważniejszy dzień',
      description: 'Pierwszy taniec, oczepiny, parkiet do białego rana. Muzyka, która łączy babcie i świadków na jednym parkiecie.',
      image: 'wedding-disco',
      imageAlt: 'Para młoda tańczy pod kulami disco na weselu',
    },
    {
      id: 'urodziny' as EventTypeId,
      title: 'Osiemnastki i urodziny',
      kicker: 'Wejście w dorosłość',
      description: 'Aktualne hity, energia od pierwszego utworu i set dopasowany do Twojej ekipy.',
      image: 'birthday-party',
      imageAlt: 'Grupa przyjaciół bawi się na imprezie urodzinowej z konfetti',
    },
    {
      id: 'firmowe' as EventTypeId,
      title: 'Imprezy firmowe',
      kicker: 'Gala, jubileusz, integracja',
      description: 'Elegancka oprawa kolacji i płynne przejście w imprezę. Punktualnie, dyskretnie, zgodnie ze scenariuszem.',
      image: 'corporate-evening',
      imageAlt: 'Wieczorne wydarzenie plenerowe pod girlandami świateł',
    },
    {
      id: 'prywatne' as EventTypeId,
      title: 'Eventy prywatne',
      kicker: 'Rocznice, garden party',
      description: 'Kameralne przyjęcia i domówki z charakterem. Muzyka tła, która w odpowiedniej chwili zamienia się w parkiet.',
      image: 'private-garden-party',
      imageAlt: 'Goście tańczą na przyjęciu w ogrodzie pod lampkami',
    },
    {
      id: 'klub' as EventTypeId,
      title: 'Kluby i wydarzenia muzyczne',
      kicker: 'Noc należy do parkietu',
      description: 'Klubowe sety, gościnne występy i wydarzenia tematyczne. House, dance, open format.',
      image: 'club-crowd',
      imageAlt: 'Tłum z uniesionymi rękami w fioletowym świetle klubu',
    },
  ],

  /** Typy wydarzeń w formularzu (id musi odpowiadać usługom powyżej). */
  eventTypes: [
    { id: 'wesele', label: 'Wesele' },
    { id: 'urodziny', label: 'Osiemnastka / urodziny' },
    { id: 'firmowe', label: 'Impreza firmowa' },
    { id: 'prywatne', label: 'Event prywatny' },
    { id: 'klub', label: 'Klub / wydarzenie muzyczne' },
    { id: 'inne', label: 'Inne' },
  ] satisfies { id: EventTypeId; label: string }[],

  gallery: {
    title: 'Zobacz tę energię',
    lead: 'Wybrane kadry z parkietów. Wesela, eventy i prywatne imprezy.',
    /** Linki do prawdziwych filmów (YouTube / Instagram). Puste = sekcja filmów ukryta. */
    videos: [] as VideoLink[],
  },

  music: {
    title: 'Posłuchaj klimatu',
    lead: 'Trzy nastroje, jedna zasada: muzyka dobrana do ludzi, a nie odwrotnie. Odtwarzacz uruchamia się dopiero po Twoim kliknięciu.',
    sets: [
      {
        id: 'party',
        title: 'Party Mix',
        mood: 'Osiemnastki • domówki • after',
        description: 'Aktualne hity, polskie i zagraniczne przeboje, mash-upy i szybkie przejścia.',
        tags: ['Pop', 'Dance', 'Hip-hop', 'Hity 2020+'],
        url: '',
      },
      {
        id: 'wedding',
        title: 'Wedding Vibes',
        mood: 'Wesela • rocznice • przyjęcia',
        description: 'Od klasyków disco i polskich evergreenów po nowoczesne remiksy, które ożywiają parkiet.',
        tags: ['Evergreeny', 'Disco', 'Funk', 'Polskie hity'],
        url: '',
      },
      {
        id: 'club',
        title: 'Club Energy',
        mood: 'Kluby • eventy • późne godziny',
        description: 'House, tech house i melodyjne brzmienia na noc, która nie chce się kończyć.',
        tags: ['House', 'Tech house', 'Melodic', 'Open format'],
        url: '',
      },
    ] as MusicSet[],
  },

  process: {
    title: 'Jak wygląda współpraca',
    steps: [
      { title: 'Kontakt i termin', text: 'Wysyłasz zapytanie z datą i miejscem. Sprawdzam dostępność i odpisuję z informacją o terminie.' },
      { title: 'Rozmowa o wydarzeniu', text: 'Poznaję Was, gości, salę i harmonogram. Ustalamy zakres oprawy i przygotowuję wycenę.' },
      { title: 'Dopasowanie repertuaru i oprawy', text: 'Wspólnie tworzymy listę utworów, momenty specjalne i plan techniczny.' },
      { title: 'Realizacja imprezy', text: 'Przyjeżdżam z wyprzedzeniem, rozstawiam sprzęt i prowadzę imprezę zgodnie z planem.' },
    ],
  },

  about: {
    label: 'O mnie',
    title: 'Muzyka to język, którym rozmawiam z salą.',
    image: 'portrait',
    imageAlt: 'Portret DJ-a w skórzanej kurtce przy konsoli w scenicznym świetle',
    /** Opis — DEMO. Podmień na prawdziwą historię. */
    paragraphs: [
      'Cześć, tu NOVA. Gram, bo kocham moment, w którym pusty parkiet w kilka minut zamienia się w miejsce, z którego nikt nie chce zejść.',
      'Moja filozofia jest prosta: słucham, zanim zagram. Każde wydarzenie ma swój rytm, inny dla wesela w dworku, inny dla firmowej gali i jeszcze inny dla klubowej nocy. Szanuję Wasz gust, a jednocześnie wiem, kiedy zaproponować coś, co poderwie całą salę.',
    ],
    eventTypes: ['Wesela i poprawiny', 'Osiemnastki i urodziny', 'Gale i imprezy firmowe', 'Przyjęcia prywatne', 'Kluby i wydarzenia muzyczne'],
    workStyle: ['Indywidualna rozmowa przed każdym wydarzeniem', 'Playlista ustalana wspólnie', 'Elastyczność i reagowanie na parkiet', 'Dyskretne prowadzenie mikrofonu'],
    /**
     * Prawdziwe doświadczenie (np. „Rezydent klubu X od 2021”).
     * Puste = blok się nie wyświetla. Bez wymyślonych nagród i liczb!
     */
    experience: [] as string[],
  },

  testimonials: {
    title: 'Opinie klientów',
    /** Maks. 6 prawdziwych opinii. Pusta lista = stan pusty lub ukrycie sekcji. */
    items: [] as Testimonial[],
    /** 'empty-state' = elegancki komunikat, 'hide' = sekcja i link w menu znikają. */
    whenEmpty: 'empty-state' as 'empty-state' | 'hide',
  },

  /** Dane, na których opierają się odpowiedzi FAQ. */
  facts: {
    /** Czy zapewniasz nagłośnienie / oświetlenie — wpisz prawdę. */
    soundSystem: { value: 'Tak, zapewniam profesjonalne nagłośnienie dopasowane do wielkości sali.', placeholder: true } as Placeholderable,
    lighting: { value: 'Podstawowe oświetlenie parkietu jest w standardzie, rozszerzone efekty świetlne do ustalenia.', placeholder: true } as Placeholderable,
    bookingAdvice:
      'Popularne terminy, zwłaszcza soboty w sezonie weselnym, rezerwowane są często z dużym wyprzedzeniem. Najlepiej napisać od razu po ustaleniu daty i miejsca. Termin potwierdzam po podpisaniu umowy.',
    pricingAdvice:
      'Każda wycena jest indywidualna i zależy od daty, miejsca, czasu trwania, liczby gości oraz zakresu sprzętu. Po krótkiej rozmowie przygotowuję konkretną ofertę, bez ukrytych kosztów.',
    playlistAdvice:
      'Tak. Przed wydarzeniem ustalamy listę utworów obowiązkowych, mile widzianych i takich, których ma nie być. Na miejscu dopasowuję resztę do reakcji parkietu.',
  },

  finalCta: {
    title: ['Twoja impreza.', 'Nasza energia.'],
    text: 'Opowiedz mi o swoim wydarzeniu. Przygotuję ofertę dopasowaną do Twoich potrzeb.',
    primary: 'Sprawdź termin',
    secondary: 'Zadzwoń',
  },
}

export type SiteConfig = typeof siteConfig

/** Wartość pola, jeśli nie jest placeholderem — w przeciwnym razie undefined. */
export function realValue(field: Placeholderable): string | undefined {
  return field.placeholder || !field.value.trim() ? undefined : field.value
}
