import { createServer, Server as HttpServer } from 'http'
import express, { Express } from 'express'
import { Server as SocketServer } from 'socket.io'
import { configRoute, mangaRoute, timerRoute } from './routes'
import { json } from 'body-parser'

export default class Server {
  private app: Express;
  private server: HttpServer;
  private io: SocketServer;

  constructor () {
    this.app = express()
    this.server = createServer(this.app)
    this.io = new SocketServer(this.server)

    this.setup()
  }

  private setup () {
    this.app.get('/', (_, res) => {
      res.send('Manga Observer')
    })
    this.app.use(json())
    this.app.use('/api', [mangaRoute, configRoute, timerRoute])

    this.io.on('connection', () => console.log('connected'))
  }

  run () {
    this.server.listen(process.env.PORT, () => console.log('Server is running on PORT', process.env.PORT))
  }

  getSockets () {
    return this.io
  }
}
