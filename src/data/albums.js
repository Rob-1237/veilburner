export const albums = [
  {
    slug: "longing-for-triumph-reeking-of-tragedy",
    title: "Longing for Triumph, Reeking of Tragedy",
    year: "2025",
    cover: "/images/album-art-2025.jpg",
    bandcampId: "970185902",
    bandcampLink: "https://veilburnerband.bandcamp.com/album/longing-for-triumph-reeking-of-tragedy",
    description: "[Album description from Bandcamp - to be added]",
    credits: {
      personnel: "Mephisto Deleterio – Music and production | Chrisom Infernium – Vocals and album design",
      production: "[Production credits - to be added]",
      artwork: "[Artwork artist - to be added]",
      label: "Transcending Obscurity Records"
    },
    lyrics: {
      available: false,
      tracks: []
    }
  },
  {
    slug: "the-duality-of-decapitation-and-wisdom",
    title: "The Duality of Decapitation and Wisdom",
    year: "2024",
    cover: "/images/album-art-2024.jpg",
    bandcampId: "999392335",
    bandcampLink: "https://veilburnerband.bandcamp.com/album/the-duality-of-decapitation-and-wisdom",
    description: "[Album description from Bandcamp - to be added]",
    credits: {
      personnel: "Mephisto Deleterio – Music and production | Chrisom Infernium – Vocals and album design",
      production: "[Production credits - to be added]",
      artwork: "[Artwork artist - to be added]",
      label: "Transcending Obscurity Records"
    },
    lyrics: {
      available: false,
      tracks: []
    }
  },
  {
    slug: "vlbrnr",
    title: "VLBRNR",
    year: "2022",
    cover: "/images/album-art-2022.jpg",
    bandcampId: "357912691",
    bandcampLink: "https://veilburnerband.bandcamp.com/album/vlbrnr",
    description: "[Album description from Bandcamp - to be added]",
    credits: {
      personnel: "Mephisto Deleterio – Music and production | Chrisom Infernium – Vocals and album design",
      production: "[Production credits - to be added]",
      artwork: "[Artwork artist - to be added]",
      label: "Transcending Obscurity Records"
    },
    lyrics: {
      available: false,
      tracks: []
    }
  },
  {
    slug: "lurkers-in-the-capsule-of-skull",
    title: "Lurkers in the Capsule of Skull",
    year: "2021",
    cover: "/images/album-art-2021.jpg",
    bandcampId: "3137732114",
    bandcampLink: "https://veilburnerband.bandcamp.com/album/lurkers-in-the-capsule-of-skull",
    description: "[Album description from Bandcamp - to be added]",
    credits: {
      personnel: "Mephisto Deleterio – Music and production | Chrisom Infernium – Vocals and album design",
      production: "[Production credits - to be added]",
      artwork: "[Artwork artist - to be added]",
      label: "Transcending Obscurity Records"
    },
    lyrics: {
      available: false,
      tracks: []
    }
  },
  {
    slug: "a-sire-to-the-ghouls-of-lunacy",
    title: "A Sire to the Ghouls of Lunacy",
    year: "2018",
    cover: "/images/album-art-2018.jpg",
    bandcampId: "2810695557",
    bandcampLink: "https://veilburner.bandcamp.com/album/a-sire-to-the-ghouls-of-lunacy",
    description: "[Album description from Bandcamp - to be added]",
    credits: {
      personnel: "Mephisto Deleterio – Music and production | Chrisom Infernium – Vocals and album design",
      production: "[Production credits - to be added]",
      artwork: "[Artwork artist - to be added]",
      label: "Transcending Obscurity Records"
    },
    lyrics: {
      available: false,
      tracks: []
    }
  },
  {
    slug: "the-obscene-rite",
    title: "The Obscene Rite",
    year: "2016",
    cover: "/images/album-art-2016.jpg",
    bandcampId: "1235378926",
    bandcampLink: "https://veilburner.bandcamp.com/album/the-obscene-rite",
    description: "[Album description from Bandcamp - to be added]",
    credits: {
      personnel: "Mephisto Deleterio – Music and production | Chrisom Infernium – Vocals and album design",
      production: "[Production credits - to be added]",
      artwork: "[Artwork artist - to be added]",
      label: "Transcending Obscurity Records"
    },
    lyrics: {
      available: false,
      tracks: []
    }
  },
  {
    slug: "noumenon",
    title: "Noumenon",
    year: "2015",
    cover: "/images/album-art-2015.jpg",
    bandcampId: "1776981611",
    bandcampLink: "https://veilburner.bandcamp.com/album/noumenon",
    description: "[Album description from Bandcamp - to be added]",
    credits: {
      personnel: "Mephisto Deleterio – Music and production | Chrisom Infernium – Vocals and album design",
      production: "[Production credits - to be added]",
      artwork: "[Artwork artist - to be added]",
      label: "Transcending Obscurity Records"
    },
    lyrics: {
      available: false,
      tracks: []
    }
  },
  {
    slug: "the-three-lightbearers",
    title: "The Three Lightbearers",
    year: "2014",
    cover: "/images/album-art-2014.jpg",
    bandcampId: "118644513",
    bandcampLink: "https://veilburner.bandcamp.com/album/the-three-lightbearers",
    description: "[Album description from Bandcamp - to be added]",
    credits: {
      personnel: "Mephisto Deleterio – Music and production | Chrisom Infernium – Vocals and album design",
      production: "[Production credits - to be added]",
      artwork: "[Artwork artist - to be added]",
      label: "Transcending Obscurity Records"
    },
    lyrics: {
      available: false,
      tracks: []
    }
  }
];

// Helper functions
export function getAlbumBySlug(slug) {
  return albums.find(album => album.slug === slug);
}

export function getNextAlbum(currentSlug) {
  const currentIndex = albums.findIndex(album => album.slug === currentSlug);
  if (currentIndex === -1 || currentIndex === albums.length - 1) return null;
  return albums[currentIndex + 1];
}

export function getPrevAlbum(currentSlug) {
  const currentIndex = albums.findIndex(album => album.slug === currentSlug);
  if (currentIndex === -1 || currentIndex === 0) return null;
  return albums[currentIndex - 1];
}
