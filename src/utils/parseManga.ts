import { getMangaInfo } from '.'
import { Manga } from '../models'
import Parser, { ParseConfig } from '../services/Parser'
import { addManga, clearMangaList } from '../slices/mangaSlice'

const parseManga = async (config: ParseConfig, parser: Parser, store: any) => {
  const content = await parser.parse(config)
  if (content.status !== 'success') {
    console.log(content.configId, content.data)
    return
  }

  const data: Array<any> = content.data

  if (!data) return
  try {
    const mangaArr = data.map(item => getMangaInfo(item.data, config))

    store.dispatch(clearMangaList())
    mangaArr.forEach(async (manga) => {
      store.dispatch(addManga(manga))

      await Manga.findOneAndDelete({ id: manga.id })
      const newManga = new Manga(manga)
      await newManga.save()
    })
  } catch (err) {
    console.log('error', err)
  }
}

export default parseManga
