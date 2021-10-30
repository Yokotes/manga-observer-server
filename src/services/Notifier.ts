import store from '../store'
import { Server } from 'socket.io'
import { MangaInfo } from '../utils/getMangaInfo'

export default class Notifier {
  oldState: MangaInfo[]
  io: Server

  constructor (io: any) {
    this.io = io
    this.oldState = []
  }

  watchUpdates () {
    const state: MangaInfo[] = store.getState().manga.mangaList
    const newManga: MangaInfo[] = []

    state.forEach(manga => {
      const isOld = this.oldState.find(m => m.id === manga.id)

      if (isOld) return

      newManga.push(manga)
    })

    if (newManga.length > 0) {
      this.sendUpdates(newManga)
    }
    this.oldState = state
  }

  sendUpdates (updates: MangaInfo[]) {
    this.io.emit('manga', updates)
  }
}
