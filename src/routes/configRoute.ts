import { Router } from 'express'
import { addConfig, removeConfig } from '../slices/configSlice'
import store from '../store'

const configRoute = Router()

configRoute.get('/config', (req, res) => {
  const configs = store.getState().config.configs
  res.send(configs)
})

configRoute.post('/config', async (req, res) => {
  const configManager = store.getState().configManager.configManager
  const config = req.body

  if (!config) {
    res.sendStatus(400)
    return
  }

  await configManager.writeToConfigs(config)
  store.dispatch(addConfig(config))

  res.sendStatus(201)
})

configRoute.put('/config:id', (req, res) => {
  const configId = req.params.id
  const config = req.body

  if (!config) {
    res.sendStatus(400)
    return
  }

  store.dispatch(removeConfig(configId))
  store.dispatch(addConfig(config))

  res.sendStatus(200)
})

configRoute.delete('/config/:id', (req, res) => {
  const configId = req.params.id

  store.dispatch(removeConfig(configId))

  res.sendStatus(200)
})

export default configRoute
