import { Router } from 'express'
import { removeManga } from '../slices/mangaSlice'
import store from '../store'

const mangaRoute = Router()

mangaRoute.get('/manga', (req, res) => {
  const manga = store.getState().manga.mangaList

  res.send(manga)
})

mangaRoute.delete('/manga/:id', (req, res) => {
  const mangaId = req.params.id

  store.dispatch(removeManga(mangaId))

  res.sendStatus(200)
})

export default mangaRoute
