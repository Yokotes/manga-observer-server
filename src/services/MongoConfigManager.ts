import { Config } from '../models'
import { ParseConfig } from './Parser'

export default class MongoConfigManager {
  async readConfigs (): Promise<ParseConfig[]> {
    const rawData = await Config.find({})
    const configs: ParseConfig[] = []

    rawData.forEach(item => {
      configs.push({
        id: item.id,
        url: item.url,
        cookies: item.cookies
      })
    })

    return configs
  }

  async writeToConfigs (config: ParseConfig) {
    const newConfig = new Config()

    newConfig.id = config.id
    newConfig.url = config.url
    newConfig.cookies = config.cookies

    await newConfig.save()
  }
}
