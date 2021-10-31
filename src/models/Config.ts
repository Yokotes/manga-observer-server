import { model, Schema } from 'mongoose'

const configSchema = new Schema({
  id: String,
  url: String,
  cookies: Array
})

export default model('Config', configSchema)
