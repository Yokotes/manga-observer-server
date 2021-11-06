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
    const newManga: MangaInfo[] = []
    const oldMangaArr = await Manga.find({})

    state.forEach(async (manga) => {
      const isOld = oldMangaArr.find(m => m.id === manga.id)

      if (isOld) return

      newManga.push(manga)
    })
    if (newManga.length > 0) {
      this.sendUpdates(newManga)
      await Manga.insertMany(newManga)
    }
  }

  sendUpdates (updates: MangaInfo[]) {
    this.io.emit('manga', updates)
  }
}
