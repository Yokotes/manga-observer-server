import { ParseConfig } from '../services/Parser'

type RawManga = {
  manga: {
    slug: string,
    // eslint-disable-next-line camelcase
    rus_name: string,
    cover: string,
  },
  chapter?: {
    volume: string | number,
    number: string | number,
    name: string
  },
  link: string,
  chaptersCount?: number
}

export type MangaInfo = {
  id: string,
  name: string,
  img: string,
  chapter?: string,
  link: string,

}

const getMangaInfo = ({ manga, chapter: ch, link, chaptersCount }: RawManga, config: ParseConfig): MangaInfo => {
  const chapter = chaptersCount ? `${chaptersCount} главы` : `Том ${ch?.volume} Глава ${ch?.number} ${ch?.name}`
  return {
    id: manga.slug,
    name: manga.rus_name,
    img: `https://${config.id}/uploads/cover/${manga.slug}/cover/${manga.cover}_thumb.jpg`,
    chapter,
    link
  }
}

export default getMangaInfo
