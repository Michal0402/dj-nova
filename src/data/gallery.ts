/**
 * Galeria realizacji.
 * `image` = nazwa zdjęcia z src/data/imageManifest.json (generuje `npm run images`).
 * `demo: true` = zdjęcie przykładowe ze stocku (Pexels) — NIE jest realizacją DJ NOVA.
 * Podmień na własne zdjęcia z imprez i ustaw `demo: false`.
 */
export type GalleryCategory = 'wesela' | 'eventy' | 'prywatne'

export type GalleryItem = {
  image: string
  alt: string
  category: GalleryCategory
  caption: string
  demo: boolean
}

export const galleryFilters: { id: GalleryCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Wszystkie' },
  { id: 'wesela', label: 'Wesela' },
  { id: 'eventy', label: 'Eventy' },
  { id: 'prywatne', label: 'Imprezy prywatne' },
]

export const galleryItems: GalleryItem[] = [
  { image: 'wedding-guests', alt: 'Goście weselni bawią się z napojami w dłoniach', category: 'wesela', caption: 'Parkiet weselny', demo: true },
  { image: 'concert-hands', alt: 'Tłum z uniesionymi rękami w niebieskim świetle sceny', category: 'eventy', caption: 'Event muzyczny', demo: true },
  { image: 'confetti-night', alt: 'Nocna impreza z kolorowym konfetti w powietrzu', category: 'prywatne', caption: 'Nocna impreza', demo: true },
  { image: 'gala-dance', alt: 'Elegancka para tańczy pod żyrandolami', category: 'wesela', caption: 'Pierwszy taniec', demo: true },
  { image: 'mixer-closeup', alt: 'Zbliżenie na mikser DJ-a w klubie', category: 'eventy', caption: 'Za konsoletą', demo: true },
  { image: 'friends-confetti', alt: 'Przyjaciele świętują wśród konfetti', category: 'prywatne', caption: 'Urodziny', demo: true },
  { image: 'wedding-fireworks', alt: 'Wesele w plenerze z pokazem fajerwerków', category: 'wesela', caption: 'Wesele w plenerze', demo: true },
  { image: 'stage-silhouettes', alt: 'Sylwetki tłumu na tle kolorowych świateł scenicznych', category: 'eventy', caption: 'Światło i dźwięk', demo: true },
  { image: 'dj-controller', alt: 'DJ w okularach przeciwsłonecznych gra na kontrolerze', category: 'eventy', caption: 'Set na żywo', demo: true },
  { image: 'birthday-party', alt: 'Grupa przyjaciół tańczy na przyjęciu', category: 'prywatne', caption: 'Osiemnastka', demo: true },
  { image: 'dj-headphones', alt: 'DJ-ka w słuchawkach podczas klubowego setu', category: 'eventy', caption: 'Klubowa noc', demo: true },
  { image: 'wedding-disco', alt: 'Para młoda tańczy pod kulami disco', category: 'wesela', caption: 'Disco na weselu', demo: true },
]
