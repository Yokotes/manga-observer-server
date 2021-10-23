import { getMangaInfo } from '.'
import Parser, { ParseConfig } from '../services/Parser'
import { addManga } from '../slices/mangaSlice'

const parseManga = async (config: ParseConfig, parser: Parser, store: any) => {
  const content = await parser.parse(config)
  if (content.status !== 'success') {
    console.log(content.configId, content.data)
    return
  }

  const data: Array<any> = content.data
  const mangaList = store.getState().manga.mangaList

  if (!data) return
  try {
    data.forEach(item => {
      const mangaExists = mangaList.filter(m => m.id === item.data.manga.slug)

      if (mangaExists.length > 0) return

      const mangaInfo = getMangaInfo(item.data, config)

      store.dispatch(addManga(mangaInfo))
    })
  } catch (err) {
    console.log('error', err)
  }
}

export default parseManga
