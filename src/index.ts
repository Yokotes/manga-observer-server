import { config } from 'dotenv'
import Server from './server'
import store from './store'
import Parser, { ParseConfig } from './services/Parser'
import { parseManga } from './utils'
import { Notifier } from './services'

config()

const server = new Server()
const globalScheduler = store.getState().scheduler.scheduler
const parser = new Parser()
const notifier = new Notifier(server.getSockets())

globalScheduler.addEvent({
  id: 'notifier',
  exec: () => { notifier.watchUpdates() }
})
globalScheduler.addEvent({
  id: 'main',
  exec: (scheduler) => {
    const configs: ParseConfig[] = store.getState().config.configs
    const events = scheduler.getEvents()

    configs.forEach(config => {
      const eventExists = events.find((event) => event.id === config.id)

      if (eventExists) return

      scheduler.addEvent({
        id: config.id,
        exec: async () => await parseManga(config, parser, store)
      })
    })
  }
})

globalScheduler.start()
server.run()
