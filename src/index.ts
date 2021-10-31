import { config } from 'dotenv'
import Server from './server'
import store from './store'
import Parser, { ParseConfig } from './services/Parser'
import { parseManga } from './utils'
import { Notifier } from './services'
import { addConfig } from './slices/configSlice'
import { connect } from 'mongoose'

config()

connect(process.env.MONGO_URL)

const globalScheduler = store.getState().scheduler.scheduler
const configManager = store.getState().configManager.configManager

const server = new Server()
const parser = new Parser()
const notifier = new Notifier(server.getSockets())

configManager.readConfigs().then(configs => {
  configs.forEach(config => {
    store.dispatch(addConfig(config))
  })
})

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
