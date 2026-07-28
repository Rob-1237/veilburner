// Canonical band facts + structured data, shared across pages.
export const SITE_URL = 'https://veilburner.band';
export const GENRE = 'Avant-garde black metal';

// MusicGroup schema for Home / About (helps search understand the subject).
export const bandJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  name: 'Veilburner',
  genre: GENRE,
  foundingLocation: 'Pennsylvania, USA',
  foundingDate: '2014',
  member: [
    { '@type': 'Person', name: 'Mephisto Deleterio' },
    { '@type': 'Person', name: 'Chrisom Infernium' },
  ],
  sameAs: [
    'https://veilburnerband.bandcamp.com/',
    'https://www.facebook.com/veilburner',
    'https://www.instagram.com/veilburner_official/',
    'https://tometal.com/?s=veilburner',
  ],
};

// MusicAlbum schema for an individual album detail page.
export function albumJsonLd(album) {
  const tracks = album.lyrics?.tracks ?? [];
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicAlbum',
    name: album.title,
    byArtist: { '@type': 'MusicGroup', name: 'Veilburner' },
    genre: GENRE,
    datePublished: album.releaseDate || String(album.year),
    image: `${SITE_URL}${album.cover}`,
    ...(tracks.length
      ? {
          numTracks: tracks.length,
          track: tracks.map((name) => ({ '@type': 'MusicRecording', name })),
        }
      : {}),
  };
}
