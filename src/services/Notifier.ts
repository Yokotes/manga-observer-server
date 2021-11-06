import store from '../store'
import { Server } from 'socket.io'
import { MangaInfo } from '../utils/getMangaInfo'
import { Manga } from '../models'

export default class Notifier {
  oldState: MangaInfo[]
  io: Server

  constructor (io: any) {
    this.io = io
  }

  async watchUpdates () {
    const state: MangaInfo[] = store.getState().manga.mangaList
    const isParsed = store.getState().manga.isParsed
    const newManga: MangaInfo[] = []
    const oldMangaArr = await Manga.find({})

    if (!isParsed) return

    // Get new manga from db
    state.forEach(async (manga) => {
      const isOld = oldMangaArr.find(m => m.id === manga.id)

      if (isOld) return

      newManga.push(manga)
    })

    // Clear manga from db
    oldMangaArr.forEach(async (manga) => {
      const isExist = state.find(m => m.id === manga.id)

      if (isExist) return

      await Manga.findOneAndDelete({ id: manga.id })
    })

    // Send notification and add manga in db
    if (newManga.length > 0) {
      this.sendUpdates(newManga)
      await Manga.insertMany(newManga)
    }
  }

  sendUpdates (updates: MangaInfo[]) {
    this.io.emit('manga', updates)
  }
}
