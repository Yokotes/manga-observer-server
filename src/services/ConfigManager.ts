import { resolve } from 'path'
import * as fs from 'fs'
import { ParseConfig } from './Parser'

export default class ConfigManager {
  private path: string

  constructor () {
    this.path = resolve(__dirname, '..', '..', 'data', 'configs.json')
  }

  readConfigs (): ParseConfig[] {
    const rawData = fs.readFileSync(this.path).toString()
    const configs = JSON.parse(rawData)

    return configs
  }

  writeToConfigs (config: ParseConfig) {
    const configs = this.readConfigs()

    configs.push(config)

    fs.writeFileSync(this.path, JSON.stringify(configs))
  }
}
