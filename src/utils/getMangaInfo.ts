import { ParseConfig } from '../services/Parser'

type RawManga = {
  manga: {
    slug: string,
    // eslint-disable-next-line camelcase
    rus_name: string,
    cover: string,
  },
  chapter: {
    volume: string | number,
    number: string | number,
    name: string
  },
  link: string
}

export type MangaInfo = {
  id: string,
  name: string,
  img: string,
  chapter: string,
  link: string
}

const getMangaInfo = ({ manga, chapter, link }: RawManga, config: ParseConfig): MangaInfo => {
  return {
    id: manga.slug,
    name: manga.rus_name,
    img: `https://${config.id}/uploads/cover/${manga.slug}/cover/${manga.cover}_thumb.jpg`,
    chapter: `Том ${chapter?.volume} Глава ${chapter?.number} ${chapter?.name}`,
    link
  }
}

export default getMangaInfo
