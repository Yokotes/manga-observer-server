import { model, Schema } from 'mongoose'

const mangaConfig = new Schema({
  id: String,
  name: String,
  img: String,
  chapter: String,
  link: String
})

export default model('Manga', mangaConfig)
